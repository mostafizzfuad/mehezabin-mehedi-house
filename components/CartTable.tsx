"use client";
import Image from "next/image";
import Link from "next/link";
import { FiMinus, FiPlus } from "react-icons/fi";
import { IoCloseOutline } from "react-icons/io5";
import { CartStoreStateType, CartStoreActionsType } from "@/lib/types";

interface CartTableProps {
	cart: CartStoreStateType["cart"];
	removeFromCart: CartStoreActionsType["removeFromCart"];
	updateQuantity: CartStoreActionsType["updateQuantity"];
}

export default function CartTable({ cart, removeFromCart, updateQuantity }: CartTableProps) {
	return (
		<div className="w-full lg:flex-1 overflow-x-auto">
			<table className="w-full text-left border border-gray-200 min-w-[700px]">
				<thead className="bg-white border-b border-gray-200">
					<tr>
						<th className="py-4 px-4 font-semibold text-gray-800 w-12"></th>
						<th className="py-4 px-4 font-semibold text-gray-800">Product</th>
						<th className="py-4 px-4 font-semibold text-gray-800 text-center">Price</th>
						<th className="py-4 px-4 font-semibold text-gray-800 text-center">Quantity</th>
						<th className="py-4 px-4 font-semibold text-gray-800 text-right">Subtotal</th>
					</tr>
				</thead>
				<tbody>
					{cart.map((item) => (
						<tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50/50 transition">
							{/* Remove Button */}
							<td className="py-4 px-4 text-center">
								<button
									onClick={() => removeFromCart(item)}
									className="text-[#68b800] hover:text-red-500 transition border border-gray-300 hover:border-red-500 rounded-full p-0.5 cursor-pointer"
									title="Remove item"
								>
									<IoCloseOutline size={18} />
								</button>
							</td>

							{/* Product Info */}
							<td className="py-4 px-4">
								<div className="flex items-center gap-4">
									<div className="relative w-16 h-16 bg-[#EAF2E2] rounded overflow-hidden shrink-0 border border-gray-100">
										<Image src={item.images[0]} alt={item.name} fill className="object-cover p-1" />
									</div>
									<Link
										href={`/product/${item.id}`}
										className="text-[#68b800] font-medium text-[15px] hover:underline line-clamp-2"
									>
										{item.name}
									</Link>
								</div>
							</td>

							{/* Price */}
							<td className="py-4 px-4 text-center text-[15px] text-gray-700">
								৳ {item.price.toFixed(2)}
							</td>

							{/* Quantity */}
							<td className="py-4 px-4">
								<div className="flex items-center justify-center">
									<div className="flex items-center border border-gray-200 rounded shrink-0 h-[40px] bg-white">
										<button
											onClick={() => updateQuantity(item.id, (item.quantity || 1) - 1)}
											className="px-3 text-gray-500 hover:text-[#68b800] transition h-full flex items-center justify-center cursor-pointer"
										>
											<FiMinus size={14} />
										</button>
										<span className="w-10 text-center text-[14px] font-medium text-black">
											{item.quantity || 1}
										</span>
										<button
											onClick={() => updateQuantity(item.id, (item.quantity || 1) + 1)}
											className="px-3 text-[#68b800] hover:text-[#5b9f03] transition h-full flex items-center justify-center cursor-pointer"
										>
											<FiPlus size={14} />
										</button>
									</div>
								</div>
							</td>

							{/* Subtotal */}
							<td className="py-4 px-4 text-right text-[15px] text-gray-700 font-medium">
								৳ {(item.price * (item.quantity || 1)).toFixed(2)}
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
