"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// Zod Validation Schema
const addressSchema = z.object({
	district: z.string().min(1, "District is required"),
	city: z.string().min(1, "Town / City is required"),
	postcode: z.string().optional(),
});

type AddressFormValues = z.infer<typeof addressSchema>;

interface ChangeAddressProps {
	currentAddress: {
		district: string;
		city: string;
		postcode: string;
	};
	onUpdateAddress: (address: { district: string; city: string; postcode: string }) => void;
	showAddressForm: boolean;
	setShowAddressForm: (show: boolean) => void;
}

export default function ChangeAddress({
	currentAddress,
	onUpdateAddress,
	showAddressForm,
	setShowAddressForm,
}: ChangeAddressProps) {
	// React Hook Form setup
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<AddressFormValues>({
		resolver: zodResolver(addressSchema),
		defaultValues: {
			district: currentAddress.district || "Dhaka",
			city: currentAddress.city || "",
			postcode: currentAddress.postcode || "",
		},
	});

	const onSubmit = (data: AddressFormValues) => {
		const formattedData = {
			district: data.district,
			city: data.city,
			postcode: data.postcode || "",
		};

		onUpdateAddress(formattedData);
		localStorage.setItem("shippingAddress", JSON.stringify(formattedData));
		setShowAddressForm(false);
	};

	const displayAddress = [currentAddress.city, currentAddress.district].filter(Boolean).join(", ");
	const finalDisplay = currentAddress.postcode ? `${displayAddress} (${currentAddress.postcode})` : displayAddress;

	return (
		<div className="text-right mt-1 w-full">
			<p className="text-[13px] text-gray-500 mb-1">
				Shipping to <strong className="text-gray-700">{finalDisplay}</strong>.
			</p>

			{/* Toggle Button */}
			<button
				onClick={() => setShowAddressForm(!showAddressForm)}
				className="text-[13px] text-[#68b800] border-b border-dotted border-[#68b800] hover:text-[#5b9f03] hover:border-[#5b9f03] transition cursor-pointer"
			>
				Change address
			</button>

			{/* Change Address Form Dropdown */}
			{showAddressForm && (
				<form
					onSubmit={handleSubmit(onSubmit)}
					className="mt-4 text-left w-full flex flex-col gap-3 animate-in fade-in slide-in-from-top-2 duration-300"
				>
					<div>
						<label className="block text-[13px] font-bold text-gray-800 mb-1">Country / region</label>
						<select
							disabled
							className="w-full border border-gray-300 rounded px-3 py-2 text-[14px] text-gray-500 outline-none bg-gray-50 cursor-not-allowed"
						>
							<option>Bangladesh</option>
						</select>
					</div>

					<div>
						<label
							className={`block text-[13px] font-bold mb-1 ${errors.district ? "text-red-500" : "text-gray-800"}`}
						>
							District <span className="text-red-500">*</span>
						</label>
						<select
							{...register("district")}
							className={`w-full border rounded px-3 py-2 text-[14px] text-gray-700 outline-none transition bg-white ${
								errors.district
									? "border-red-500 focus:border-red-500"
									: "border-gray-300 focus:border-[#68b800]"
							}`}
						>
							<option value="Dhaka">Dhaka</option>
							<option value="Chittagong">Chittagong</option>
							<option value="Sylhet">Sylhet</option>
							<option value="Rajshahi">Rajshahi</option>
							<option value="Khulna">Khulna</option>
							<option value="Barisal">Barisal</option>
							<option value="Rangpur">Rangpur</option>
							<option value="Mymensingh">Mymensingh</option>
						</select>
						{errors.district && <p className="text-red-500 text-[12px] mt-1">{errors.district.message}</p>}
					</div>

					<div>
						<label
							className={`block text-[13px] font-bold mb-1 ${errors.city ? "text-red-500" : "text-gray-800"}`}
						>
							Town / City <span className="text-red-500">*</span>
						</label>
						<input
							type="text"
							{...register("city")}
							placeholder="e.g. Mirpur, Gulshan"
							className={`w-full border rounded px-3 py-2 text-[14px] text-gray-700 outline-none transition ${
								errors.city
									? "border-red-500 focus:border-red-500 bg-red-50/10"
									: "border-gray-300 focus:border-[#68b800]"
							}`}
						/>
						{errors.city && <p className="text-red-500 text-[12px] mt-1">{errors.city.message}</p>}
					</div>

					<div>
						<label className="block text-[13px] font-bold text-gray-800 mb-1">
							Postcode / ZIP (optional)
						</label>
						<input
							type="text"
							{...register("postcode")}
							className="w-full border border-gray-300 rounded px-3 py-2 text-[14px] text-gray-700 outline-none focus:border-[#68b800]"
						/>
					</div>

					<button
						type="submit"
						className="bg-[#68b800] text-white px-5 py-2 rounded-full text-[14px] font-medium w-fit mt-1 hover:bg-[#b8a200] transition cursor-pointer"
					>
						Update
					</button>
				</form>
			)}
		</div>
	);
}
