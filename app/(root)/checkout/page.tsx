"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import useCartStore from "@/store/cartStore";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form } from "@/components/ui/form";
import BillingDetails from "@/components/BillingDetails";

// Zod Validation Schema
const checkoutSchema = z.object({
	fullName: z.string().min(1, "Full Name is required"),
	mobile: z.string().min(11, "Valid mobile number is required"),
	district: z.string().min(1, "District is required"),
	address: z.string().min(1, "Address is required"),
	orderNotes: z.string().optional(),
});

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

export default function CheckoutPage() {
	const router = useRouter();
	const { cart, removeFromCart } = useCartStore();
	const [mounted, setMounted] = useState(false);
	const [shippingCost, setShippingCost] = useState<number>(60);

	// React Hook Form Setup
	const form = useForm<CheckoutFormValues>({
		resolver: zodResolver(checkoutSchema),
		mode: "onTouched",
		defaultValues: {
			fullName: "",
			mobile: "",
			district: "Dhaka", // Default
			address: "",
			orderNotes: "",
		},
	});

	const selectedDistrict = form.watch("district");

	useEffect(() => {
		setMounted(true);

		if (cart.length === 0) {
			router.push("/cart");
			return;
		}

		// Fetching address from local storage and auto-filling the form
		const savedAddress = localStorage.getItem("shippingAddress");
		if (savedAddress) {
			const parsed = JSON.parse(savedAddress);
			const fullAddress = [parsed.city, parsed.postcode].filter(Boolean).join(", ");

			if (parsed.district) form.setValue("district", parsed.district);
			if (fullAddress) form.setValue("address", fullAddress);
		}
	}, [cart.length, router, form]);

	// Shipping Cost Auto-Update based on District
	useEffect(() => {
		if (selectedDistrict === "Dhaka") {
			setShippingCost(60);
		} else {
			setShippingCost(120);
		}
	}, [selectedDistrict]);

	if (!mounted) return null;
	if (cart.length === 0) return null;

	// Calculate Totals
	const subtotal = cart.reduce((acc, item) => acc + item.price * (item.quantity || 1), 0);
	const total = subtotal + shippingCost;

	// Form Submit Handler
	const onSubmit = (data: CheckoutFormValues) => {
		alert("Order placed successfully!");
		console.log("Order Data:", {
			cartItems: cart,
			customerInfo: data,
			shippingCost,
			total,
		});
	};

	return (
		<div className="container mx-auto max-w-6xl px-4 lg:px-0 py-10 md:py-16">
			{/* Page Header */}
			<div className="text-center mb-10 md:mb-16">
				<h1 className="text-4xl md:text-5xl font-bold text-black mb-3">Checkout</h1>
				<div className="text-[14px] text-gray-500 font-medium flex items-center justify-center gap-2">
					<Link href="/" className="hover:text-[#68b800] transition">
						Home
					</Link>
					<span>/</span>
					<span className="text-black">Checkout</span>
				</div>
			</div>

			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start"
				>
					{/* Billing Details (Left Side) */}
					<BillingDetails
						control={form.control}
						shippingCost={shippingCost}
						setShippingCost={setShippingCost}
						selectedDistrict={selectedDistrict}
					/>
				</form>
			</Form>
		</div>
	);
}
