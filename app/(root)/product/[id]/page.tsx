import Link from "next/link";
import { FaStar, FaTruck, FaCreditCard, FaFacebookF, FaWhatsapp, FaEnvelope, FaLink } from "react-icons/fa";
import { popularProducts, bestSellerProducts, randomProducts, featuredProducts } from "@/db/data";
import { ProductType } from "@/lib/types";
import SectionLayout from "@/components/SectionLayout";
import ProductCard from "@/components/ProductCard";
import ProductInteraction from "@/components/ProductInteraction";
import ProductTabs from "@/components/ProductTabs";
import ProductImageGallery from "@/components/ProductImageGallery";

const getAllProducts = () => [...popularProducts, ...bestSellerProducts, ...randomProducts, ...featuredProducts];

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
	const { id } = await params;
	const product: ProductType | undefined = getAllProducts().find((p) => p.id.toString() === id);

	if (!product) {
		return (
			<div className="min-h-[50vh] flex items-center justify-center">
				<h2 className="text-2xl font-bold">Product not found!</h2>
			</div>
		);
	}

	const galleryImages = product?.images || [];

	// RELATED PRODUCTS LOGIC: Find products in the same category, excluding the current one
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
				<ProductImageGallery galleryImages={galleryImages} productName={product.name} />

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
			<ProductTabs product={product} />

			{/* RELATED PRODUCTS SECTION */}
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
