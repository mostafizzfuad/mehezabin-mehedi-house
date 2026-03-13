"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Search, X } from "lucide-react";
import { popularProducts, bestSellerProducts, randomProducts, featuredProducts } from "@/db/data";

const allProductsRaw = [...popularProducts, ...bestSellerProducts, ...randomProducts, ...featuredProducts];
const allProducts = Array.from(new Map(allProductsRaw.map((item) => [item.id, item])).values());
const getCategorySlug = (name: string) => name.toLowerCase().replace(/ /g, "-");

interface SearchBarProps {
	categories: { name: string; subItems?: string[] }[];
	isMobile?: boolean;
	onCloseMobileMenu?: () => void;
}

export default function SearchBar({ categories, isMobile = false, onCloseMobileMenu }: SearchBarProps) {
	const router = useRouter();
	const [searchQuery, setSearchQuery] = useState("");
	const [isSearchOpen, setIsSearchOpen] = useState(false);
	const searchRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
				setIsSearchOpen(false);
			}
		}
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchQuery(e.target.value);
		setIsSearchOpen(true);
	};

	const handleSearchSubmit = (e?: React.FormEvent) => {
		if (e) e.preventDefault();
		if (searchQuery.trim()) {
			router.push(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
			setSearchQuery("");
			setIsSearchOpen(false);
			if (onCloseMobileMenu) onCloseMobileMenu();
		}
	};

	const navigateTo = (path: string) => {
		router.push(path);
		setIsSearchOpen(false);
		setSearchQuery("");
		if (onCloseMobileMenu) onCloseMobileMenu();
	};

	const searchLower = searchQuery.toLowerCase();
	const filteredCategories = categories.filter((cat) => cat.name.toLowerCase().includes(searchLower));
	const filteredProducts = allProducts
		.filter((prod) => catSearchMatch(prod) || prod.name.toLowerCase().includes(searchLower))
		.slice(0, 5);

	function catSearchMatch(prod: any) {
		return prod.categories?.some((c: string) => c.toLowerCase().includes(searchLower));
	}

	// Dynamic classes based on whether it's mobile or desktop
	const containerClass = isMobile
		? "flex md:hidden w-full pb-4 relative z-40"
		: "hidden md:block relative lg:w-[280px] xl:w-[350px] mx-4 lg:mx-0";

	const formClass = isMobile
		? "flex w-full items-center border border-gray-300 rounded overflow-hidden bg-white focus-within:border-[#68b800] transition"
		: "flex items-center border border-gray-300 rounded overflow-hidden bg-white focus-within:border-[#68b800] transition";

	const buttonClass = isMobile
		? "bg-[#68b800] hover:bg-[#5fa51d] px-4 py-2 text-white transition cursor-pointer"
		: "bg-[#68b800] hover:bg-[#5fa51d] p-2.5 text-white transition cursor-pointer";

	const dropdownMaxHeight = isMobile ? "max-h-[350px]" : "max-h-[400px]";

	return (
		<div ref={searchRef} className={containerClass}>
			<form onSubmit={handleSearchSubmit} className={formClass}>
				<input
					type="text"
					placeholder="Search on products"
					value={searchQuery}
					onChange={handleSearchInput}
					onFocus={() => setIsSearchOpen(true)}
					className="w-full px-4 py-2 text-sm outline-none text-gray-700 relative"
				/>
				{searchQuery && (
					<button
						type="button"
						onClick={() => {
							setSearchQuery("");
							setIsSearchOpen(false);
						}}
						className="text-gray-400 hover:text-gray-600 p-1 mr-1 cursor-pointer"
					>
						<X className="h-4 w-4" />
					</button>
				)}
				<button type="submit" className={buttonClass}>
					<Search className="h-5 w-5" />
				</button>
			</form>

			{/* Live Search Dropdown */}
			{isSearchOpen && searchQuery && (
				<div
					className={`absolute top-full mt-1 left-0 w-full bg-white border border-gray-200 shadow-xl rounded-sm z-[999] overflow-y-auto ${dropdownMaxHeight}`}
				>
					{/* Category Results */}
					{filteredCategories.length > 0 && (
						<div className="border-b border-gray-100 last:border-0">
							{filteredCategories.map((cat, idx) => (
								<div
									key={idx}
									onMouseDown={(e) => {
										e.preventDefault();
										navigateTo(`/category/${getCategorySlug(cat.name)}`);
									}}
									className="block px-4 py-3 hover:bg-gray-50 text-[14px] text-gray-800 transition cursor-pointer"
								>
									{cat.name}
									<span className="text-gray-400 text-[13px] ml-1">
										({allProducts.filter((p) => p.categories.includes(cat.name)).length})
									</span>
								</div>
							))}
						</div>
					)}

					{/* Product Results */}
					{filteredProducts.length > 0 ? (
						<div className="py-2 border-t border-gray-100">
							{filteredProducts.map((prod) => (
								<div
									key={prod.id}
									onMouseDown={(e) => {
										e.preventDefault();
										navigateTo(`/product/${prod.id}`);
									}}
									className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition cursor-pointer"
								>
									<div className="relative w-10 h-10 bg-gray-100 rounded overflow-hidden flex-shrink-0 border border-gray-200">
										<Image
											src={prod.images[0]}
											alt={prod.name}
											fill
											className="object-cover p-0.5"
										/>
									</div>
									<div className="flex flex-col">
										<span className="text-[14px] font-medium text-black line-clamp-1">
											{prod.name}
										</span>
										<span className="text-[13px] text-gray-600">৳ {prod.price.toFixed(2)}</span>
									</div>
								</div>
							))}
						</div>
					) : (
						filteredCategories.length === 0 && (
							<div className="p-4 text-center text-sm text-gray-500">No results found</div>
						)
					)}
				</div>
			)}
		</div>
	);
}
