"use client";
import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ProductCard from "@/components/ProductCard";
import { popularProducts, bestSellerProducts, randomProducts, featuredProducts } from "@/db/data";

// Combine all unique products for the shop page
const allProductsRaw = [...popularProducts, ...bestSellerProducts, ...randomProducts, ...featuredProducts];
const allProducts = Array.from(new Map(allProductsRaw.map((item) => [item.id, item])).values());

const ITEMS_PER_PAGE = 12;

function ShopContent() {
	const router = useRouter();
	const searchParams = useSearchParams();

	const [mounted, setMounted] = useState(false);

	// Get URL Params
	const orderBy = searchParams.get("orderby") || "menu_order";
	const currentPage = parseInt(searchParams.get("page") || "1", 10);
	const searchQuery = searchParams.get("search") || ""; // Search query from URL

	useEffect(() => {
		setMounted(true);
	}, []);

	// Search Filter Logic
	let filteredProducts = [...allProducts];
	if (searchQuery) {
		const query = searchQuery.toLowerCase();
		filteredProducts = filteredProducts.filter(
			(product) =>
				product.name.toLowerCase().includes(query) ||
				product.categories.some((cat) => cat.toLowerCase().includes(query)),
		);
	}

	// Sorting Logic
	let sortedProducts = [...filteredProducts]; // Sort the filtered products
	switch (orderBy) {
		case "popularity":
			sortedProducts.sort((a, b) => (b.reviewsCount || 0) - (a.reviewsCount || 0));
			break;
		case "rating":
			sortedProducts.sort((a, b) => (b.rating || 0) - (a.rating || 0));
			break;
		case "date":
			sortedProducts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
			break;
		case "price":
			sortedProducts.sort((a, b) => a.price - b.price);
			break;
		case "price-desc":
			sortedProducts.sort((a, b) => b.price - a.price);
			break;
		default:
			break; // original order
	}

	// Pagination Logic
	const totalItems = sortedProducts.length;
	const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

	const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
	const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, totalItems);
	const currentProducts = sortedProducts.slice(startIndex, endIndex);

	// Handlers
	const handleSortChange = (value: string) => {
		const params = new URLSearchParams(searchParams.toString());

		// Set or remove orderby
		if (value === "menu_order") {
			params.delete("orderby");
		} else {
			params.set("orderby", value);
		}

		// Always reset to page 1 on sort by deleting the page param
		params.delete("page");

		const query = params.toString();
		router.push(`/shop${query ? `?${query}` : ""}`);
	};

	const handlePageChange = (page: number) => {
		const params = new URLSearchParams(searchParams.toString());

		if (page === 1) {
			params.delete("page");
		} else {
			params.set("page", page.toString());
		}

		const query = params.toString();
		router.push(`/shop${query ? `?${query}` : ""}`);
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	// If user clears the search query but leaves the page param, etc.
	const clearSearch = () => {
		const params = new URLSearchParams(searchParams.toString());
		params.delete("search");
		params.delete("page"); // Reset to page 1
		router.push(`/shop${params.toString() ? `?${params.toString()}` : ""}`);
	};

	if (!mounted) return null;

	return (
		<div className="w-full pb-16 md:pb-24">
			{/* Page Header */}
			<div className="bg-[#f9fdf5] py-14 md:py-16 text-center border-b border-gray-100 mb-10 md:mb-16">
				<h1 className="text-4xl md:text-[50px] font-bold text-black mb-4">
					{searchQuery ? `Search Results for "${searchQuery}"` : "Shop"}
				</h1>
				<div className="text-[14px] font-medium flex items-center justify-center gap-2">
					<Link href="/" className="text-[#68b800] hover:text-[#5b9f03] transition cursor-pointer">
						Home
					</Link>
					<span className="text-gray-500">/</span>
					<span className="text-black">{searchQuery ? "Search" : "Shop"}</span>
				</div>
			</div>

			<div className="container mx-auto max-w-6xl px-4 lg:px-0">
				{/* Search clear alert if searching */}
				{searchQuery && (
					<div className="flex items-center justify-between bg-blue-50 text-blue-800 p-4 rounded-md mb-8 border border-blue-100">
						<p>
							Found {totalItems} result(s) matching <strong>"{searchQuery}"</strong>
						</p>
						<button
							onClick={clearSearch}
							className="text-sm font-semibold underline hover:text-blue-900 cursor-pointer"
						>
							Clear Search
						</button>
					</div>
				)}

				{/* Toolbar: Results Count & Sorting */}
				<div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
					<p className="text-gray-600 text-[14px] md:text-[15px]">
						Showing {totalItems > 0 ? startIndex + 1 : 0}–{endIndex} of {totalItems} results
					</p>

					<div className="w-full sm:w-[220px]">
						<Select value={orderBy} onValueChange={handleSortChange}>
							<SelectTrigger className="w-full border-none shadow-none text-gray-600 text-[14px] md:text-[15px] focus:ring-0 focus:ring-offset-0 bg-transparent h-auto p-0 justify-end gap-2 hover:text-black cursor-pointer">
								<SelectValue placeholder="Default sorting" />
							</SelectTrigger>
							<SelectContent
								position="popper"
								align="end"
								className="bg-white border border-gray-200 shadow-md w-[220px] rounded-none z-[100]"
							>
								<SelectItem
									value="menu_order"
									className="text-[14px] cursor-pointer rounded-none focus:bg-[#0088cc] focus:text-white data-[state=checked]:bg-[#0088cc] data-[state=checked]:text-white py-2"
								>
									Default sorting
								</SelectItem>
								<SelectItem
									value="popularity"
									className="text-[14px] cursor-pointer rounded-none focus:bg-[#0088cc] focus:text-white data-[state=checked]:bg-[#0088cc] data-[state=checked]:text-white py-2"
								>
									Sort by popularity
								</SelectItem>
								<SelectItem
									value="rating"
									className="text-[14px] cursor-pointer rounded-none focus:bg-[#0088cc] focus:text-white data-[state=checked]:bg-[#0088cc] data-[state=checked]:text-white py-2"
								>
									Sort by average rating
								</SelectItem>
								<SelectItem
									value="date"
									className="text-[14px] cursor-pointer rounded-none focus:bg-[#0088cc] focus:text-white data-[state=checked]:bg-[#0088cc] data-[state=checked]:text-white py-2"
								>
									Sort by latest
								</SelectItem>
								<SelectItem
									value="price"
									className="text-[14px] cursor-pointer rounded-none focus:bg-[#0088cc] focus:text-white data-[state=checked]:bg-[#0088cc] data-[state=checked]:text-white py-2"
								>
									Sort by price: low to high
								</SelectItem>
								<SelectItem
									value="price-desc"
									className="text-[14px] cursor-pointer rounded-none focus:bg-[#0088cc] focus:text-white data-[state=checked]:bg-[#0088cc] data-[state=checked]:text-white py-2"
								>
									Sort by price: high to low
								</SelectItem>
							</SelectContent>
						</Select>
					</div>
				</div>

				{/* Products Grid */}
				<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5 mb-12">
					{currentProducts.length > 0 ? (
						currentProducts.map((product) => <ProductCard key={product.id} product={product} />)
					) : (
						<div className="col-span-full py-20 text-center text-gray-500 text-lg">
							No products found matching your search.
						</div>
					)}
				</div>

				{/* Pagination */}
				{totalPages > 1 && (
					<div className="flex items-center gap-2">
						{Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
							<button
								key={page}
								onClick={() => handlePageChange(page)}
								className={`w-9 h-9 flex items-center justify-center border font-medium text-[14px] transition-colors cursor-pointer
                  ${
						currentPage === page
							? "bg-[#68b800] border-[#68b800] text-white"
							: "bg-white border-[#68b800] text-[#68b800] hover:bg-[#68b800] hover:text-white"
					}
                `}
							>
								{page}
							</button>
						))}

						{/* Next Arrow */}
						{currentPage < totalPages && (
							<button
								onClick={() => handlePageChange(currentPage + 1)}
								className="w-9 h-9 flex items-center justify-center border border-[#68b800] text-[#68b800] bg-white hover:bg-[#68b800] hover:text-white font-medium text-[16px] transition-colors cursor-pointer"
							>
								→
							</button>
						)}
					</div>
				)}
			</div>
		</div>
	);
}

// Wrapper with Suspense for using useSearchParams
export default function ShopPage() {
	return (
		<Suspense fallback={<div className="h-screen flex items-center justify-center">Loading shop...</div>}>
			<ShopContent />
		</Suspense>
	);
}
