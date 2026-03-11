"use client";
import { useState } from "react";
import { ProductType } from "@/lib/types";
import { FiMinus, FiPlus } from "react-icons/fi";
import useCartStore from "@/store/cartStore";
import { useRouter } from "next/navigation";

export default function ProductInteraction({ product }: { product: ProductType }) {
	const [quantity, setQuantity] = useState(1);
	const router = useRouter();
	const isOutOfStock = product.inStock === false;

	const handleQuantityChange = (type: "increment" | "decrement") => {
		if (type === "increment") {
			setQuantity((prev) => prev + 1);
		} else {
			if (quantity > 1) {
				setQuantity((prev) => prev - 1);
			}
		}
	};

	const { addToCart } = useCartStore();
	const handleAddToCart = () => {
		addToCart({
			...product,
			quantity,
		});
		router.push(`/cart?added=true&name=${encodeURIComponent(product.name)}`);
	};

	if (isOutOfStock) {
		return (
			<div className="mb-6 border-b border-gray-200 pb-6">
				<p className="text-red-500 font-medium text-[15px]">Out of stock</p>
			</div>
		);
	}

	return (
		<div className="flex flex-row gap-2 sm:gap-4 mb-2 border-b border-gray-200 pb-8 w-full">
			{/* Quantity Selector */}
			<div className="flex items-center border border-gray-200 rounded shrink-0 h-[46px]">
				<button
					onClick={() => handleQuantityChange("decrement")}
					className="px-2 sm:px-4 text-gray-500 hover:text-[#68b800] transition h-full flex items-center justify-center cursor-pointer"
				>
					<FiMinus size={16} />
				</button>
				<span className="w-6 sm:w-10 text-center text-[16px] font-medium text-black">{quantity}</span>
				<button
					onClick={() => handleQuantityChange("increment")}
					className="px-2 sm:px-4 text-[#68b800] hover:text-[#5b9f03] transition h-full flex items-center justify-center cursor-pointer"
				>
					<FiPlus size={16} />
				</button>
			</div>

			{/* Buttons */}
			<button
				onClick={() => router.push("/checkout")}
				className="flex-1 bg-[#68b800] hover:bg-[#b8a200] text-white font-medium text-[13px] sm:text-[15px] h-[46px] rounded-full transition-colors shadow-sm cursor-pointer whitespace-nowrap"
			>
				Buy Now
			</button>

			<button
				onClick={handleAddToCart}
				className="flex-1 bg-[#68b800] hover:bg-[#b8a200] text-white font-medium text-[13px] sm:text-[15px] h-[46px] rounded-full transition-colors shadow-sm cursor-pointer whitespace-nowrap"
			>
				Add to cart
			</button>
		</div>
	);
}
