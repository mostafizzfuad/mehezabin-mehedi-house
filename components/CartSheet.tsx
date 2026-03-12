"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { IoCloseOutline } from "react-icons/io5";
import { FiShoppingCart } from "react-icons/fi";
import useCartStore from "@/store/cartStore";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from "@/components/ui/sheet";

export default function CartSheet() {
	const { cart, removeFromCart } = useCartStore();
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) return null;

	// Calculate totals
	const cartCount = cart.reduce((acc, item) => acc + (item.quantity || 1), 0);
	const subtotal = cart.reduce((acc, item) => acc + item.price * (item.quantity || 1), 0);

	return (
		<Sheet>
			<SheetTrigger asChild>
				{/* Cart Icon with Badge */}
				<button className="relative p-2 hover:text-[#68b800] transition cursor-pointer">
					<FiShoppingCart size={24} className="text-gray-800" />
					{cartCount > 0 && (
						<span className="absolute top-0 right-0 bg-[#d9534f] text-white text-[11px] font-bold w-[20px] h-[20px] flex items-center justify-center rounded-full border-2 border-white">
							{cartCount}
						</span>
					)}
				</button>
			</SheetTrigger>

			<SheetContent side="right" className="w-full sm:max-w-[400px] flex flex-col p-0 bg-white">
				<SheetHeader className="px-6 py-4 border-b border-gray-100">
					<SheetTitle className="text-left text-[18px] font-bold text-gray-800">Shopping Cart</SheetTitle>
				</SheetHeader>

				{/* Cart Items (Scrollable Area) */}
				<div className="flex-1 overflow-y-auto px-6 py-2">
					{cart.length === 0 ? (
						<div className="flex flex-col items-center justify-center h-full text-gray-500 gap-3">
							<FiShoppingCart size={48} className="text-gray-300" />
							<p>Your cart is empty.</p>
						</div>
					) : (
						<div className="flex flex-col">
							{cart.map((item) => (
								<div
									key={item.id}
									className="flex items-center justify-between py-5 border-b border-dashed border-gray-200"
								>
									<div className="flex items-center gap-4">
										{/* Item Image */}
										<div className="relative w-16 h-16 bg-[#EAF2E2] rounded border border-gray-100 flex-shrink-0">
											<Image
												src={item.images[0]}
												alt={item.name}
												fill
												className="object-cover p-1 rounded"
											/>
										</div>

										{/* Item Details */}
										<div className="flex flex-col max-w-[160px] sm:max-w-[200px]">
											<span className="text-[14px] text-gray-800 font-medium line-clamp-2 mb-1">
												{item.name}
											</span>
											<span className="text-[14px] text-black font-semibold">
												{item.quantity || 1} &times; ৳ {item.price.toFixed(2)}
											</span>
										</div>
									</div>

									{/* Remove Button */}
									<button
										onClick={() => removeFromCart(item)}
										className="text-gray-400 hover:text-red-500 border border-gray-300 rounded-full p-1 transition-colors cursor-pointer"
										title="Remove"
									>
										<IoCloseOutline size={16} />
									</button>
								</div>
							))}
						</div>
					)}
				</div>

				{/* Bottom Section: Totals & Buttons */}
				{cart.length > 0 && (
					<div className="p-6 bg-white shadow-[0_-4px_15px_-3px_rgba(0,0,0,0.05)] border-t border-gray-100 mt-auto">
						{/* Subtotal */}
						<div className="text-center text-[20px] font-bold text-black mb-6">
							Subtotal: ৳ {subtotal.toFixed(2)}
						</div>

						{/* Buttons */}
						<div className="flex flex-col gap-3">
							<SheetClose asChild>
								<Link
									href="/cart"
									className="flex items-center justify-center w-full bg-[#b5a200] hover:bg-[#9c8c00] text-white text-[16px] font-medium h-[52px] rounded-full transition-colors cursor-pointer"
								>
									View cart
								</Link>
							</SheetClose>

							<SheetClose asChild>
								<Link
									href="/checkout"
									className="flex items-center justify-center w-full bg-[#68b800] hover:bg-[#5b9f03] text-white text-[16px] font-medium h-[52px] rounded-full transition-colors shadow-sm cursor-pointer"
								>
									Checkout
								</Link>
							</SheetClose>
						</div>
					</div>
				)}
			</SheetContent>
		</Sheet>
	);
}
