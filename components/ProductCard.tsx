"use client";
import Image from "next/image";
import Link from "next/link";
import { ProductType } from "@/lib/types";
import useCartStore from "@/store/cartStore";
import { useRouter } from "next/navigation";

export default function ProductCard({ product }: { product: ProductType }) {
	const { addToCart } = useCartStore();
	const router = useRouter();

	// Add to cart click handler
	const handleAddToCart = () => {
		addToCart({
			...product,
			quantity: 1,
		});
		router.push(`/cart?added=true&name=${encodeURIComponent(product.name)}`);
	};

	return (
		<div className="flex flex-col bg-white rounded-lg overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow duration-300 group ring-1 ring-gray-200">
			{/* Image Container */}
			<div className="relative aspect-square overflow-hidden">
				<Link href={`/product/${product.id}`} className="block w-full h-full">
					<Image
						src={product.images[0]}
						alt={product.name}
						fill
						className="object-cover transition-transform duration-500 p-2"
					/>
				</Link>

				{/* OUT OF STOCK Overlay */}
				{!product.inStock && (
					<div className="absolute bottom-4 left-0 w-full px-4">
						<div className="bg-white/90 backdrop-blur-sm text-[#68b800] text-center font-bold py-2 text-sm uppercase tracking-wider shadow-sm">
							OUT OF STOCK
						</div>
					</div>
				)}
			</div>

			{/* Details Container */}
			<div className="p-4 pt-1 flex flex-col items-center text-center flex-1">
				{/* Category */}
				<p className="text-gray-400 text-[12px] md:text-[13px] mb-1.5">
					{product.categories?.[0] || "Uncategorized"}
				</p>

				{/* Product Title */}
				<Link href={`/product/${product.id}`} className="hover:text-[#68b800] transition-colors">
					<h3 className="text-[14px] md:text-[15px] text-gray-800 mb-2 line-clamp-2 leading-tight">
						{product.name}
					</h3>
				</Link>

				{/* Price */}
				<div className="text-[15px] md:text-[16px] font-bold text-black mb-4">৳ {product.price.toFixed(2)}</div>

				{/* Buttons Section */}
				<div className="w-full flex flex-col lg:flex-row gap-2 justify-center">
					{product.inStock ? (
						<>
							<button
								onClick={() => router.push("/checkout")}
								className="flex-1 bg-[#68b800] hover:bg-[#b8a200] text-white text-[12px] md:text-[13px] font-medium py-2 px-2 rounded-full transition-colors cursor-pointer"
							>
								Buy Now
							</button>
							<button
								onClick={handleAddToCart}
								className="flex-1 bg-[#68b800] hover:bg-[#b8a200] text-white text-[12px] md:text-[13px] font-medium py-2 px-2 rounded-full transition-colors cursor-pointer"
							>
								Add to cart
							</button>
						</>
					) : (
						<Link
							href={`/product/${product.id}`}
							className="inline-block bg-[#68b800] hover:bg-[#b8a200] text-white text-[12px] md:text-[13px] font-medium py-2 px-6 rounded-full transition-colors"
						>
							Read more
						</Link>
					)}
				</div>
			</div>
		</div>
	);
}
