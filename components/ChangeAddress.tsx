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
	address: z.string().min(1, "Address is required"),
	postcode: z.string().optional(),
});

type AddressFormValues = z.infer<typeof addressSchema>;

interface ChangeAddressProps {
	currentAddress: { district: string; address: string; postcode: string };
	onUpdateAddress: (address: { district: string; address: string; postcode: string }) => void;
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
		mode: "onTouched",
		defaultValues: {
			district: currentAddress.district || "Dhaka",
			address: currentAddress.address || "",
			postcode: currentAddress.postcode || "",
		},
	});

	const selectedDistrict = form.watch("district");

	const filteredDistricts = useMemo(() => {
		return districts.filter((d) => d.toLowerCase().includes(searchTerm.toLowerCase()) && d !== selectedDistrict);
	}, [searchTerm, selectedDistrict]);

	const onSubmit = (data: AddressFormValues) => {
		const formattedData = { district: data.district, address: data.address, postcode: data.postcode || "" };
		onUpdateAddress(formattedData);
		localStorage.setItem("shippingAddress", JSON.stringify({ ...formattedData, city: formattedData.address }));
		setShowAddressForm(false);
	};

	const displayAddress = [currentAddress.address, currentAddress.district].filter(Boolean).join(", ");
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
						<div className="space-y-1">
							<label className="text-[14px] font-medium text-gray-800">Country / region</label>
							<Select defaultValue="Bangladesh">
								<SelectTrigger className="h-[46px] min-h-[46px] w-full px-4 text-[14px] bg-white border border-gray-200 rounded cursor-pointer transition-colors !outline-none !ring-0 !ring-offset-0 !shadow-none focus:border-[#68b800]">
									<SelectValue placeholder="Bangladesh" />
								</SelectTrigger>
								<SelectContent
									position="popper"
									side="bottom"
									className="bg-white z-[99] border border-gray-200 shadow-md rounded-md"
								>
									<SelectItem
										value="Bangladesh"
										className="cursor-pointer text-[13px] text-gray-800 py-1.5 px-3 rounded-none focus:bg-[#0088cc] focus:text-white data-[state=checked]:bg-gray-200 data-[state=checked]:text-black"
									>
										Bangladesh
									</SelectItem>
								</SelectContent>
							</Select>
						</div>

						{/* District */}
						<FormField
							control={form.control}
							name="district"
							render={({ field, fieldState }) => (
								<FormItem className="space-y-1 flex flex-col justify-end">
									<FormLabel
										className={`text-[14px] font-medium transition-colors ${fieldState.error ? "text-[#e22b2b]" : "text-gray-800"}`}
									>
										District <span className="text-[#e22b2b]">*</span>
									</FormLabel>
									<Select
										onValueChange={field.onChange}
										value={field.value}
										onOpenChange={(open) => !open && setSearchTerm("")}
									>
										<FormControl>
											<SelectTrigger
												className={`h-[46px] min-h-[46px] w-full px-4 text-[14px] bg-white border rounded cursor-pointer transition-colors !outline-none !ring-0 !ring-offset-0 !shadow-none ${
													fieldState.error
														? "border-[#e22b2b] focus:border-[#e22b2b]"
														: "border-gray-200 focus:border-[#68b800]"
												}`}
											>
												<SelectValue placeholder="Select District" />
											</SelectTrigger>
										</FormControl>
										<SelectContent
											position="popper"
											side="bottom"
											className="bg-white z-[99] border border-gray-200 shadow-md p-0 overflow-hidden min-w-[var(--radix-select-trigger-width)] !outline-none !ring-0 rounded-md"
										>
											{/* Search Box */}
											<div
												className="p-1.5 border-b border-gray-200"
												onPointerDown={(e) => e.stopPropagation()}
											>
												<Input
													autoFocus
													placeholder="Search district..."
													className="h-10 w-full border border-gray-300 rounded-sm !ring-0 !outline-none !ring-offset-0 !shadow-none bg-white text-[13px] px-2.5 placeholder:text-gray-400 focus-visible:border-[#0088cc]"
													value={searchTerm}
													onChange={(e) => setSearchTerm(e.target.value)}
													onKeyDown={(e) => {
														e.stopPropagation();
														if (e.key === "Enter") e.preventDefault();
													}}
												/>
											</div>

											<div className="max-h-[250px] min-h-[120px] overflow-y-auto py-1">
												{/* Sticky Selected Item */}
												{selectedDistrict && (
													<SelectItem
														value={selectedDistrict}
														className="cursor-pointer text-[13px] text-gray-800 py-1.5 px-3 rounded-none focus:bg-[#0088cc] focus:text-white data-[state=checked]:bg-gray-200 data-[state=checked]:text-black"
													>
														{selectedDistrict}
													</SelectItem>
												)}

												{/* Filtered Results */}
												{filteredDistricts.length > 0
													? filteredDistricts.map((d) => (
															<SelectItem
																key={d}
																value={d}
																className="cursor-pointer text-[13px] text-gray-800 py-1.5 px-3 rounded-none focus:bg-[#0088cc] focus:text-white data-[state=checked]:bg-[#0088cc] data-[state=checked]:text-white"
															>
																{d}
															</SelectItem>
														))
													: searchTerm !== "" && (
															<div className="py-4 text-center text-[13px] text-gray-400">
																No matching districts found.
															</div>
														)}
											</div>
										</SelectContent>
									</Select>
									<FormMessage className="text-[#e22b2b] text-[12px] font-normal mt-1" />
								</FormItem>
							)}
						/>

						{/* Address */}
						<FormField
							control={form.control}
							name="address"
							render={({ field, fieldState }) => (
								<FormItem className="space-y-1">
									<FormLabel
										className={`text-[14px] font-medium transition-colors ${fieldState.error ? "text-[#e22b2b]" : "text-gray-800"}`}
									>
										Address <span className="text-[#e22b2b]">*</span>
									</FormLabel>
									<FormControl>
										<Input
											placeholder="House/Road, Area, City"
											{...field}
											className={`h-[46px] w-full px-4 text-[14px] bg-white border rounded transition-colors !outline-none !ring-0 !ring-offset-0 !shadow-none ${
												fieldState.error
													? "border-[#e22b2b] focus-visible:border-[#e22b2b]"
													: "border-gray-200 focus-visible:border-[#68b800]"
											}`}
										/>
									</FormControl>
									<FormMessage className="text-[#e22b2b] text-[12px] font-normal mt-1" />
								</FormItem>
							)}
						/>

						{/* Postcode */}
						<FormField
							control={form.control}
							name="postcode"
							render={({ field }) => (
								<FormItem className="space-y-1">
									<FormLabel className="text-[14px] font-medium text-gray-800">
										Postcode / ZIP (optional)
									</FormLabel>
									<FormControl>
										<Input
											{...field}
											className="h-[46px] w-full px-4 text-[14px] bg-white border border-gray-200 rounded transition-colors !outline-none !ring-0 !ring-offset-0 !shadow-none focus-visible:border-[#68b800]"
										/>
									</FormControl>
									<FormMessage className="text-[#e22b2b] text-[12px] font-normal mt-1" />
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
