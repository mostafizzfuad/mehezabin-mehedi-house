"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { FaCheckCircle } from "react-icons/fa";
import useCartStore from "@/store/cartStore";
import ChangeAddress from "@/components/ChangeAddress";
import CartTable from "@/components/CartTable";

export default function CartPage() {
	const { cart, removeFromCart, updateQuantity } = useCartStore();
	const [shippingCost, setShippingCost] = useState(60);
	const [showSuccessBanner, setShowSuccessBanner] = useState(false);
	const [addedProductName, setAddedProductName] = useState("");

	const [showAddressForm, setShowAddressForm] = useState(false);
	const [shippingAddress, setShippingAddress] = useState({
		district: "Dhaka",
		city: "",
		postcode: "",
	});

	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);

		const savedAddress = localStorage.getItem("shippingAddress");
		if (savedAddress) {
			setShippingAddress(JSON.parse(savedAddress));
		}

		if (typeof window !== "undefined") {
			const urlParams = new URLSearchParams(window.location.search);
			if (urlParams.get("added") === "true") {
				setShowSuccessBanner(true);

				const name = urlParams.get("name");
				if (name) {
					setAddedProductName(decodeURIComponent(name));
				}

				window.history.replaceState(null, "", "/cart");
			}
		}
	}, []);

	if (!mounted) return null;

	// Calculate totals
	const subtotal = cart.reduce((acc, item) => acc + item.price * (item.quantity || 1), 0);
	const total = subtotal + shippingCost;

	return (
		<div className="container mx-auto max-w-6xl px-4 lg:px-0 py-10 md:py-16">
			{/* Page Header */}
			<div className="text-center mb-10">
				<h1 className="text-4xl md:text-5xl font-bold text-black mb-3">Cart</h1>
				<div className="text-[14px] text-gray-500 font-medium flex items-center justify-center gap-2">
					<Link href="/" className="hover:text-[#68b800] transition">
						Home
					</Link>
					<span>/</span>
					<span className="text-black">Cart</span>
				</div>
			</div>

			{cart.length === 0 ? (
				<div className="text-center py-20">
					<h2 className="text-2xl font-semibold text-gray-700 mb-6">Your cart is currently empty.</h2>
					<Link
						href="/shop"
						className="inline-block bg-[#68b800] text-white px-8 py-3 rounded-full font-medium hover:bg-[#5b9f03] transition"
					>
						Return to shop
					</Link>
				</div>
			) : (
				<>
					{/* Notification Banner */}
					{showSuccessBanner && (
						<div className="bg-[#f9fdf5] border-t-2 border-[#68b800] p-4 flex flex-col sm:flex-row justify-between items-center mb-8 gap-4 shadow-sm animate-in fade-in slide-in-from-top-4 duration-500">
							<div className="flex items-center gap-2 text-gray-700 text-[14px]">
								<FaCheckCircle className="text-[#68b800]" size={16} />
								<span>
									{addedProductName
										? `“${addedProductName}” has been added to your cart.`
										: "Cart items have been updated successfully."}
								</span>
							</div>
							<Link
								href="/shop"
								className="bg-[#68b800] text-white text-[13px] px-5 py-2 rounded-full font-medium hover:bg-[#5b9f03] transition whitespace-nowrap"
							>
								Continue Shopping
							</Link>
						</div>
					)}

					<div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
						{/* LEFT: Cart Table Component */}
						<CartTable cart={cart} removeFromCart={removeFromCart} updateQuantity={updateQuantity} />

						{/* RIGHT: Cart Totals */}
						<div className="w-full lg:w-[400px] border border-gray-200 p-6 md:p-8 bg-[#fafafa]">
							<h2 className="text-2xl font-bold text-black mb-6">Cart totals</h2>

							<div className="flex justify-between items-center border-b border-gray-200 pb-4 mb-4">
								<span className="text-[15px] text-gray-600">Subtotal</span>
								<span className="text-[15px] text-gray-800 font-medium">৳ {subtotal.toFixed(2)}</span>
							</div>

							<div className="flex justify-between items-start border-b border-gray-200 pb-4 mb-6">
								<span className="text-[15px] text-gray-600 mt-1">Shipping</span>

								<div className="flex flex-col items-end gap-3 w-full max-w-[220px]">
									{/* Inside Dhaka Radio */}
									<label className="flex items-center gap-2 cursor-pointer group">
										<input
											type="radio"
											name="shipping"
											value="60"
											checked={shippingCost === 60}
											onChange={() => setShippingCost(60)}
											className="accent-[#68b800] w-3.5 h-3.5 cursor-pointer"
										/>
										<span className="text-[14px] text-gray-700 group-hover:text-black transition">
											Inside Dhaka: <span className="font-semibold">৳ 60.00</span>
										</span>
									</label>

									{/* Outside Dhaka Radio */}
									<label className="flex items-center gap-2 cursor-pointer group">
										<input
											type="radio"
											name="shipping"
											value="120"
											checked={shippingCost === 120}
											onChange={() => setShippingCost(120)}
											className="accent-[#68b800] w-3.5 h-3.5 cursor-pointer"
										/>
										<span className="text-[14px] text-gray-700 group-hover:text-black transition">
											Outside Dhaka: <span className="font-semibold">৳ 120.00</span>
										</span>
									</label>

									{/* Change Address Component */}
									<ChangeAddress
										currentAddress={shippingAddress}
										onUpdateAddress={(newAddress) => setShippingAddress(newAddress)}
										showAddressForm={showAddressForm}
										setShowAddressForm={setShowAddressForm}
									/>
								</div>
							</div>

							<div className="flex justify-between items-center mb-8">
								<span className="text-[16px] text-gray-800 font-medium">Total</span>
								<span className="text-[18px] text-black font-bold">৳ {total.toFixed(2)}</span>
							</div>

							<Link
								href="/checkout"
								className="flex items-center justify-center w-full bg-[#68b800] hover:bg-[#b8a200] text-white font-medium text-[16px] h-[40px] sm:h-[48px] rounded-full transition-colors shadow-sm cursor-pointer"
							>
								Proceed To Checkout
							</Link>
						</div>
					</div>
				</>
			)}
		</div>
	);
}
