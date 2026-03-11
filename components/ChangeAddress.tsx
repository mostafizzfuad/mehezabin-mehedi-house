"use client";
import { useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const addressSchema = z.object({
	district: z.string().min(1, "District is required"),
	city: z.string().min(1, "Town / City is required"),
	postcode: z.string().optional(),
});

type AddressFormValues = z.infer<typeof addressSchema>;

interface ChangeAddressProps {
	currentAddress: { district: string; city: string; postcode: string };
	onUpdateAddress: (address: { district: string; city: string; postcode: string }) => void;
	showAddressForm: boolean;
	setShowAddressForm: (show: boolean) => void;
}

const districts = [
	"Bagerhat",
	"Bandarban",
	"Barguna",
	"Barisal",
	"Bhola",
	"Bogra",
	"Brahmanbaria",
	"Chandpur",
	"Chapainawabganj",
	"Chattogram",
	"Chuadanga",
	"Cumilla",
	"Cox's Bazar",
	"Dhaka",
	"Dinajpur",
	"Faridpur",
	"Feni",
	"Gaibandha",
	"Gazipur",
	"Gopalganj",
	"Habiganj",
	"Jamalpur",
	"Jashore",
	"Jhalokati",
	"Jhenaidah",
	"Joypurhat",
	"Khagrachari",
	"Khulna",
	"Kishoreganj",
	"Kurigram",
	"Kushtia",
	"Lakshmipur",
	"Lalmonirhat",
	"Madaripur",
	"Magura",
	"Manikganj",
	"Meherpur",
	"Moulvibazar",
	"Munshiganj",
	"Mymensingh",
	"Naogaon",
	"Narail",
	"Narayanganj",
	"Narsingdi",
	"Natore",
	"Netrokona",
	"Nilphamari",
	"Noakhali",
	"Pabna",
	"Panchagarh",
	"Patuakhali",
	"Pirojpur",
	"Rajbari",
	"Rajshahi",
	"Rangamati",
	"Rangpur",
	"Satkhira",
	"Shariatpur",
	"Sherpur",
	"Sirajganj",
	"Sunamganj",
	"Sylhet",
	"Tangail",
	"Thakurgaon",
];

export default function ChangeAddress({
	currentAddress,
	onUpdateAddress,
	showAddressForm,
	setShowAddressForm,
}: ChangeAddressProps) {
	const [searchTerm, setSearchTerm] = useState("");

	const form = useForm<AddressFormValues>({
		resolver: zodResolver(addressSchema),
		defaultValues: {
			district: currentAddress.district || "Dhaka",
			city: currentAddress.city || "",
			postcode: currentAddress.postcode || "",
		},
	});

	const selectedDistrict = form.watch("district");

	const filteredDistricts = useMemo(() => {
		const matches = districts.filter(
			(d) => d.toLowerCase().includes(searchTerm.toLowerCase()) && d !== selectedDistrict,
		);
		return matches;
	}, [searchTerm, selectedDistrict]);

	const onSubmit = (data: AddressFormValues) => {
		const formattedData = { district: data.district, city: data.city, postcode: data.postcode || "" };
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
			<button
				onClick={() => setShowAddressForm(!showAddressForm)}
				className="text-[13px] text-[#68b800] border-b border-dotted border-[#68b800] hover:text-[#5b9f03] transition cursor-pointer"
			>
				Change address
			</button>

			{showAddressForm && (
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="mt-4 text-left w-full flex flex-col gap-3 animate-in fade-in slide-in-from-top-2 duration-300"
					>
						{/* Country/Region */}
						<div className="space-y-2">
							<label className="text-[13px] font-bold text-gray-800">Country / region</label>
							<Select defaultValue="Bangladesh">
								<SelectTrigger className="text-[14px] border border-[#68b800] text-gray-700 focus:ring-1 focus:ring-offset-0 focus:ring-[#68b800] cursor-pointer bg-white h-10">
									<SelectValue placeholder="Bangladesh" />
								</SelectTrigger>
								<SelectContent
									position="popper"
									side="bottom"
									className="bg-white z-[99] shadow-md border-gray-200"
								>
									<SelectItem value="Bangladesh" className="cursor-pointer">
										Bangladesh
									</SelectItem>
								</SelectContent>
							</Select>
						</div>

						{/* District with Sticky Selection & Search */}
						<FormField
							control={form.control}
							name="district"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="text-[13px] font-bold text-gray-800">
										District <span className="text-red-500">*</span>
									</FormLabel>
									<Select
										onValueChange={field.onChange}
										value={field.value}
										onOpenChange={(open) => !open && setSearchTerm("")}
									>
										<FormControl>
											<SelectTrigger className="border border-[#68b800] focus:ring-1 focus:ring-offset-0 focus:ring-[#68b800] cursor-pointer bg-white h-10">
												<SelectValue placeholder="Select District" />
											</SelectTrigger>
										</FormControl>
										<SelectContent
											position="popper"
											side="bottom"
											className="bg-white z-[99] shadow-md border-gray-200 p-0 overflow-hidden min-w-[var(--radix-select-trigger-width)]"
										>
											{/* Search Box */}
											<div
												className="p-2 border-b-2 border-gray-200"
												onPointerDown={(e) => e.stopPropagation()}
											>
												<Input
													autoFocus
													placeholder="Search district..."
													className="h-9 border-none focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none bg-gray-50/50 text-[14px] px-2"
													value={searchTerm}
													onChange={(e) => setSearchTerm(e.target.value)}
													onKeyDown={(e) => e.stopPropagation()}
												/>
											</div>

											<div className="max-h-[250px] min-h-[120px] overflow-y-auto">
												{selectedDistrict && (
													<div className="bg-gray-50/50 border-b border-gray-100">
														<SelectItem
															value={selectedDistrict}
															className="cursor-pointer font-bold text-[#68b800]"
														>
															{selectedDistrict}
														</SelectItem>
													</div>
												)}

												{filteredDistricts.length > 0
													? filteredDistricts.map((d) => (
															<SelectItem
																key={d}
																value={d}
																className="cursor-pointer py-2"
															>
																{d}
															</SelectItem>
														))
													: searchTerm !== "" && (
															<div className="py-8 text-center text-[13px] text-gray-400">
																No matching districts found.
															</div>
														)}
											</div>
										</SelectContent>
									</Select>
									<FormMessage className="text-red-500 text-[12px]" />
								</FormItem>
							)}
						/>

						{/* Town / City */}
						<FormField
							control={form.control}
							name="city"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="text-[13px] font-bold text-gray-800">
										Town / City <span className="text-red-500">*</span>
									</FormLabel>
									<FormControl>
										<Input
											placeholder="e.g. Mirpur 2, Rainkhola"
											{...field}
											className="border border-[#68b800] focus-visible:ring-1 focus-visible:ring-offset-0 focus-visible:ring-[#68b800] bg-white h-10"
										/>
									</FormControl>
									<FormMessage className="text-red-500 text-[12px]" />
								</FormItem>
							)}
						/>

						{/* Postcode */}
						<FormField
							control={form.control}
							name="postcode"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="text-[13px] font-bold text-gray-800">
										Postcode / ZIP (optional)
									</FormLabel>
									<FormControl>
										<Input
											{...field}
											className="border border-[#68b800] focus-visible:ring-1 focus-visible:ring-offset-0 focus-visible:ring-[#68b800] bg-white h-10"
										/>
									</FormControl>
									<FormMessage className="text-red-500 text-[12px]" />
								</FormItem>
							)}
						/>

						<button
							type="submit"
							className="bg-[#68b800] text-white px-5 py-2.5 rounded-full text-[14px] font-medium w-fit mt-2 hover:bg-[#b8a200] transition cursor-pointer shadow-sm active:scale-95"
						>
							Update
						</button>
					</form>
				</Form>
			)}
		</div>
	);
}
