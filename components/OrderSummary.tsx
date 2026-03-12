"use client";
import Image from "next/image";
import { IoCloseOutline } from "react-icons/io5";
import { FaLock } from "react-icons/fa";

interface OrderSummaryProps {
	cart: any[];
	removeFromCart: (item: any) => void;
	subtotal: number;
	shippingCost: number;
	total: number;
}

export default function OrderSummary({ cart, removeFromCart, subtotal, shippingCost, total }: OrderSummaryProps) {
	return (
		<div className="lg:col-span-5">
			<h2 className="text-2xl font-bold text-black mb-6">Your order</h2>

			<div className="w-full">
				{/* Table Header */}
				<div className="flex justify-between items-center border-b border-gray-200 pb-3 mb-4">
					<span className="text-[15px] font-semibold text-gray-800">Product</span>
					<span className="text-[15px] font-semibold text-gray-800">Subtotal</span>
				</div>

				{/* Cart Items List */}
				<div className="space-y-6 mb-6">
					{cart.map((item) => (
						<div
							key={item.id}
							className="flex items-center justify-between border-b border-gray-100 border-dashed pb-6"
						>
							<div className="flex items-center gap-4">
								<div className="relative">
									<button
										type="button"
										onClick={() => removeFromCart(item)}
										className="absolute -top-2 -left-2 bg-white rounded-full border border-gray-200 text-gray-400 p-0.5 z-10 hover:text-red-500 hover:border-red-500 transition shadow-sm cursor-pointer"
										title="Remove"
									>
										<IoCloseOutline size={14} />
									</button>

									<div className="relative w-14 h-14 bg-[#EAF2E2] rounded border border-gray-100">
										<Image src={item.images[0]} alt={item.name} fill className="object-cover p-1" />
									</div>
									<span className="text-[12px] text-gray-600 absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap">
										× {item.quantity || 1}
									</span>
								</div>

								<span className="text-[13px] sm:text-[14px] text-gray-800 font-medium ml-2 max-w-[150px] sm:max-w-[200px] line-clamp-2">
									{item.name}
								</span>
							</div>

							<span className="text-[14px] font-medium text-gray-700 shrink-0">
								৳ {(item.price * (item.quantity || 1)).toFixed(2)}
							</span>
						</div>
					))}
				</div>

				{/* Totals Section */}
				<div className="flex justify-between items-center border-b border-gray-200 border-dashed pb-4 mb-4">
					<span className="text-[14px] text-gray-600">Subtotal</span>
					<span className="text-[14px] text-gray-800 font-medium">৳ {subtotal.toFixed(2)}</span>
				</div>

				<div className="flex justify-between items-center border-b border-gray-200 border-dashed pb-4 mb-6">
					<span className="text-[14px] text-gray-600">Shipping</span>
					<span className="text-[14px] text-gray-800 font-medium">
						{shippingCost === 60 ? "Inside Dhaka" : "Outside Dhaka"}: ৳ {shippingCost.toFixed(2)}
					</span>
				</div>

				<div className="flex justify-between items-center mb-8">
					<span className="text-[16px] text-black font-bold">Total</span>
					<span className="text-[18px] text-black font-bold">৳ {total.toFixed(2)}</span>
				</div>

				{/* Cash on Delivery Box */}
				<div className="bg-[#f9fdf5] rounded p-5 mb-6 border border-gray-100">
					<div className="text-[15px] text-gray-800 font-medium mb-3">Cash on delivery</div>
					<div className="bg-gray-100/70 p-4 rounded text-[13px] text-gray-600">
						Pay with cash upon delivery.
					</div>
				</div>

				{/* Place Order Button */}
				<button
					type="submit"
					className="flex items-center justify-center gap-2 w-full bg-[#68b800] hover:bg-[#b8a200] text-white font-medium text-[16px] h-[52px] rounded-full transition-colors shadow-sm cursor-pointer"
				>
					<FaLock size={14} /> Place Order ৳ {total.toFixed(2)}
				</button>
			</div>
		</div>
	);
}
