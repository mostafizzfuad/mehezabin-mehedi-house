"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { FaStar, FaTruck, FaCreditCard, FaFacebookF, FaWhatsapp, FaEnvelope, FaLink, FaSearch } from "react-icons/fa";
import { popularProducts, bestSellerProducts, randomProducts, featuredProducts } from "@/db/data";
import { ProductType } from "@/lib/types";
import SectionLayout from "@/components/SectionLayout";
import ProductCard from "@/components/ProductCard";
import ProductInteraction from "@/components/ProductInteraction";

const getAllProducts = () => [...popularProducts, ...bestSellerProducts, ...randomProducts, ...featuredProducts];

export default function ProductPage() {
	const params = useParams();
	const productId = params.id;
	const product: ProductType | undefined = getAllProducts().find((p) => p.id.toString() === productId);

	const [activeTab, setActiveTab] = useState("description");

	const galleryImages = product?.images || [];
	const [activeImage, setActiveImage] = useState(galleryImages[0]);

	// Image Zoom State
	const [zoomStyle, setZoomStyle] = useState({});

	if (!product) {
		return (
			<div className="min-h-[50vh] flex items-center justify-center">
				<h2 className="text-2xl font-bold">Product not found!</h2>
			</div>
		);
	}

	// Mouse move handler for image zoom effect
	const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
		const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
		const x = ((e.pageX - left) / width) * 100;
		const y = ((e.pageY - top) / height) * 100;

		setZoomStyle({
			backgroundImage: `url(${activeImage})`,
			backgroundPosition: `${x}% ${y}%`,
			backgroundSize: "200%",
		});
	};

	// Mouse leave handler to reset zoom
	const handleMouseLeave = () => {
		setZoomStyle({});
	};

	// ==========================================
	// RELATED PRODUCTS LOGIC
	// ==========================================
	// Find products in the same category, excluding the current one
	const relatedProducts = getAllProducts()
		.filter((p) => p.id !== product.id && p.categories.some((cat) => product.categories.includes(cat)))
		.slice(0, 4);

	return (
		<div className="container mx-auto max-w-6xl px-4 lg:px-0 py-8 md:py-12">
			{/* ========================================== */}
			{/* TOP SECTION: Gallery & Details */}
			{/* ========================================== */}
			<div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
				{/* LEFT: Image Gallery */}
				<div className="flex flex-col gap-4">
					{/* Main Image (With Hover Zoom Effect) */}
					<div
						className="relative aspect-square rounded-lg overflow-hidden border border-gray-100 group cursor-crosshair"
						onMouseMove={handleMouseMove}
						onMouseLeave={handleMouseLeave}
					>
						<Image
							src={activeImage}
							alt={product.name}
							fill
							className={`object-cover transition-opacity duration-300 ${Object.keys(zoomStyle).length > 0 ? "opacity-0" : "opacity-100"}`}
						/>

						{/* invisible div to show the zoomed image, becomes visible on hover */}
						<div className="absolute inset-0 bg-no-repeat transition-all duration-75" style={zoomStyle} />

						{/* Zoom Icon */}
						<button className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md text-gray-600 group-hover:opacity-0 transition-opacity duration-300">
							<FaSearch size={18} />
						</button>
					</div>

					{/* Thumbnails (Only show if there's more than 1 image) */}
					{galleryImages.length > 1 && (
						<div className="grid grid-cols-4 gap-3 md:gap-4">
							{galleryImages.map((img, idx) => (
								<div
									key={idx}
									onClick={() => setActiveImage(img)}
									className={`relative aspect-square rounded-md overflow-hidden cursor-pointer border-2 transition-all ${
										activeImage === img
											? "border-[#68b800] opacity-100"
											: "border-transparent opacity-60 hover:opacity-100"
									}`}
								>
									<Image src={img} alt={`Thumbnail ${idx + 1}`} fill className="object-cover" />
								</div>
							))}
						</div>
					)}
				</div>

				{/* RIGHT: Product Information */}
				<div className="flex flex-col">
					{/* Breadcrumb */}
					<div className="text-[13px] text-gray-500 mb-3 font-medium">
						<Link href="/" className="hover:text-[#68b800]">
							Home
						</Link>
						<span className="mx-1.5">/</span>
						<Link href="/shop" className="hover:text-[#68b800]">
							{product.categories[0] || "Shop"}
						</Link>
						<span className="mx-1.5">/</span>
						<span className="text-gray-400">{product.name}</span>
					</div>

					{/* Title */}
					<h1 className="text-2xl md:text-3xl font-bold text-black mb-2 leading-tight">{product.name}</h1>

					{/* Rating */}
					<div className="flex items-center gap-1 text-yellow-500 mb-4">
						{product.rating ? (
							<>
								{Array.from({ length: 5 }, (_, i) => (
									<FaStar
										key={i}
										size={14}
										className={
											i < Math.round(product.rating || 0) ? "text-yellow-500" : "text-gray-300"
										}
									/>
								))}
								<span className="text-gray-500 text-[13px] ml-2">
									({product.reviewsCount || 0} reviews)
								</span>
							</>
						) : (
							<span className="text-gray-500 text-[13px]">No ratings yet</span>
						)}
					</div>

					{/* Price */}
					<div className="text-[22px] md:text-[26px] font-bold text-black mb-4">
						৳ {product.price.toFixed(2)}
					</div>

					{/* Short Description */}
					<p className="text-[15px] text-gray-700 mb-6">{product.shortDescription}</p>

					{/* Info Cards (Shipping & Payment) */}
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
						<div className="flex items-start gap-3">
							<div className="bg-[#cca829] p-2 rounded-full shrink-0">
								<FaTruck size={18} className="text-white" />
							</div>
							<div>
								<h4 className="font-semibold text-[14px] text-black">Shipping:</h4>
								<p className="text-[13px] text-gray-600">Standard (24 hrs-48 hrs)</p>
							</div>
						</div>
						<div className="flex items-start gap-3">
							<div className="bg-[#cca829] p-2 rounded-full shrink-0">
								<FaCreditCard size={18} className="text-white" />
							</div>
							<div>
								<h4 className="font-semibold text-[14px] text-black">Payment:</h4>
								<p className="text-[13px] text-gray-600">Cash on Delivery, SSLCOMMERZ</p>
							</div>
						</div>
					</div>

					{/* Action Buttons (Quantity, Buy Now, Add to Cart) */}
					<ProductInteraction product={product} />

					{/* Meta Information (SKU, Categories, Socials) */}
					<div className="flex flex-col gap-3 text-[13px]">
						<div className="flex gap-4">
							<div>
								<span className="text-gray-500">SKU:</span>{" "}
								<span className="text-gray-800">{product.sku || product.id}</span>
							</div>
							<div>
								<span className="text-gray-500">Categories:</span>{" "}
								<span className="text-[#68b800]">{product.categories?.join(", ")}</span>
							</div>
						</div>
						<div className="flex gap-2 mt-1">
							<button className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition cursor-pointer">
								<FaFacebookF size={14} />
							</button>
							<button className="bg-green-500 text-white p-2 rounded-full hover:bg-green-600 transition cursor-pointer">
								<FaWhatsapp size={14} />
							</button>
							<button className="bg-gray-500 text-white p-2 rounded-full hover:bg-gray-600 transition cursor-pointer">
								<FaEnvelope size={14} />
							</button>
							<button className="bg-gray-600 text-white p-2 rounded-full hover:bg-gray-700 transition cursor-pointer">
								<FaLink size={14} />
							</button>
						</div>
					</div>
				</div>
			</div>

			{/* ============================================ */}
			{/* BOTTOM SECTION: Tabs (Description & Reviews) */}
			{/* ============================================ */}
			<div className="mt-16 border-t border-gray-200 pt-8">
				<div className="flex gap-6 md:gap-10 border-b border-gray-200">
					<button
						onClick={() => setActiveTab("description")}
						className={`pb-3 text-[16px] md:text-[18px] font-medium transition-colors cursor-pointer relative ${
							activeTab === "description" ? "text-black" : "text-gray-500 hover:text-black"
						}`}
					>
						Description
						{activeTab === "description" && (
							<span className="absolute bottom-0 left-0 w-full h-[3px] bg-[#68b800]"></span>
						)}
					</button>

					<button
						onClick={() => setActiveTab("reviews")}
						className={`pb-3 text-[16px] md:text-[18px] font-medium transition-colors cursor-pointer relative ${
							activeTab === "reviews" ? "text-black" : "text-gray-500 hover:text-black"
						}`}
					>
						Reviews ({product.reviewsCount || 0})
						{activeTab === "reviews" && (
							<span className="absolute bottom-0 left-0 w-full h-[3px] bg-[#68b800]"></span>
						)}
					</button>
				</div>

				{/* Tab Content */}
				<div className="mt-6 md:mt-8 min-h-[200px]">
					{activeTab === "description" ? (
						<div className="text-[14.5px] md:text-[15px] text-gray-700 leading-relaxed max-w-4xl">
							{product.longDescription}
						</div>
					) : (
						<div className="text-[15px] text-gray-600">
							There are no reviews yet. Be the first to review "{product.name}".
						</div>
					)}
				</div>
			</div>

			{/* ============================================ */}
			{/* RELATED PRODUCTS SECTION */}
			{/* ============================================ */}
			{relatedProducts.length > 0 && (
				<div className="mt-8 border-t border-gray-200 pt-4">
					<SectionLayout title="Related products">
						{relatedProducts.map((relProduct) => (
							<ProductCard key={relProduct.id} product={relProduct} />
						))}
					</SectionLayout>
				</div>
			)}
		</div>
	);
}
