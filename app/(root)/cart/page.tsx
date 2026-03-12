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
		address: "",
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
						className="inline-block bg-[#68b800] text-white px-8 py-3 rounded-full font-medium hover:bg-[#b8a200] transition"
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
								className="bg-[#68b800] text-white text-[13px] px-5 py-2 rounded-full font-medium hover:bg-[#b8a200] transition whitespace-nowrap"
							>
								Continue Shopping
							</Link>
						</div>
					)}

					<div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
						{/* LEFT: Cart Table Component */}
						<CartTable cart={cart} removeFromCart={removeFromCart} updateQuantity={updateQuantity} />

						{/* RIGHT: Cart Totals */}
						<div className="w-full lg:w-[400px] border border-gray-200 p-6 md:p-8 bg-[#fafafa] rounded-lg shadow-sm">
							<h2 className="text-2xl font-bold text-black mb-6">Cart totals</h2>

							<div className="flex justify-between items-center border-b border-gray-200 pb-4 mb-6">
								<span className="text-[15px] font-semibold text-gray-800">Subtotal</span>
								<span className="text-[15px] font-semibold text-gray-800">৳ {subtotal.toFixed(2)}</span>
							</div>

							<div className="flex flex-col border-b border-gray-200 pb-4 mb-6">
								<span className="text-[15px] font-semibold text-gray-800 mb-4">Shipping</span>

								<div className="flex flex-col gap-3 w-full">
									<div className="border border-gray-200 rounded-md bg-white">
										<label className="flex items-center justify-between p-4 border-b border-gray-200 cursor-pointer group hover:bg-gray-50 transition rounded-t-md">
											<div className="flex items-center gap-3">
												<input
													type="radio"
													name="cartShipping"
													value="60"
													checked={shippingCost === 60}
													onChange={() => setShippingCost(60)}
													className="accent-[#68b800] w-4 h-4 cursor-pointer"
												/>
												<span className="text-[14px] text-gray-700 font-medium">
													Inside Dhaka:
												</span>
											</div>
											<span className="text-[14px] font-medium text-black">৳ 60.00</span>
										</label>

										<label className="flex items-center justify-between p-4 cursor-pointer group hover:bg-gray-50 transition rounded-b-md">
											<div className="flex items-center gap-3">
												<input
													type="radio"
													name="cartShipping"
													value="120"
													checked={shippingCost === 120}
													onChange={() => setShippingCost(120)}
													className="accent-[#68b800] w-4 h-4 cursor-pointer"
												/>
												<span className="text-[14px] text-gray-700 font-medium">
													Outside Dhaka:
												</span>
											</div>
											<span className="text-[14px] font-medium text-black">৳ 120.00</span>
										</label>
									</div>

									{/* Change Address Component */}
									<div className="mt-2 w-full">
										<ChangeAddress
											currentAddress={shippingAddress}
											onUpdateAddress={(newAddress) => setShippingAddress(newAddress)}
											showAddressForm={showAddressForm}
											setShowAddressForm={setShowAddressForm}
										/>
									</div>
								</div>
							</div>

							<div className="flex justify-between items-center mb-8">
								<span className="text-[16px] text-black font-bold">Total</span>
								<span className="text-[20px] text-black font-bold">৳ {total.toFixed(2)}</span>
							</div>

							<Link
								href="/checkout"
								className="flex items-center justify-center w-full bg-[#68b800] hover:bg-[#b8a200] active:scale-[0.98] text-white font-medium text-[16px] h-[56px] rounded-full transition-all shadow-md cursor-pointer"
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
