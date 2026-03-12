"use client";
import { useState, useMemo } from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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

interface BillingDetailsProps {
	control: any;
	shippingCost: number;
	setShippingCost: (cost: number) => void;
	selectedDistrict: string;
}

export default function BillingDetails({
	control,
	shippingCost,
	setShippingCost,
	selectedDistrict,
}: BillingDetailsProps) {
	const [searchTerm, setSearchTerm] = useState("");

	const filteredDistricts = useMemo(() => {
		return districts.filter((d) => d.toLowerCase().includes(searchTerm.toLowerCase()) && d !== selectedDistrict);
	}, [searchTerm, selectedDistrict]);

	return (
		<div className="lg:col-span-7">
			<h2 className="text-2xl font-bold text-black mb-6">Billing details</h2>

			<div className="space-y-4">
				{/* Full Name */}
				<FormField
					control={control}
					name="fullName"
					render={({ field, fieldState }) => (
						<FormItem className="space-y-1">
							<FormLabel
								className={`text-[14px] font-medium transition-colors ${fieldState.error ? "text-[#e22b2b]" : "text-gray-800"}`}
							>
								Full Name <span className="text-[#e22b2b]">*</span>
							</FormLabel>
							<FormControl>
								<Input
									placeholder="e.g. John Doe"
									{...field}
									className={`h-[48px] w-full px-4 text-[14px] bg-white rounded-md transition-colors !outline-none !ring-0 !ring-offset-0 !shadow-none border ${
										fieldState.error
											? "border-[#e22b2b] focus:border-[#e22b2b] focus-visible:border-[#e22b2b]"
											: "border-gray-200 focus:border-[#68b800] focus-visible:border-[#68b800]"
									}`}
								/>
							</FormControl>
							<FormMessage className="text-[#e22b2b] text-[12px] font-normal mt-1" />
						</FormItem>
					)}
				/>

				{/* Mobile */}
				<FormField
					control={control}
					name="mobile"
					render={({ field, fieldState }) => (
						<FormItem className="space-y-1">
							<FormLabel
								className={`text-[14px] font-medium transition-colors ${fieldState.error ? "text-[#e22b2b]" : "text-gray-800"}`}
							>
								Mobile <span className="text-[#e22b2b]">*</span>
							</FormLabel>
							<FormControl>
								<Input
									placeholder="e.g. 017xxxxxxxx"
									{...field}
									className={`h-[48px] w-full px-4 text-[14px] bg-white rounded-md transition-colors !outline-none !ring-0 !ring-offset-0 !shadow-none border ${
										fieldState.error
											? "border-[#e22b2b] focus:border-[#e22b2b] focus-visible:border-[#e22b2b]"
											: "border-gray-200 focus:border-[#68b800] focus-visible:border-[#68b800]"
									}`}
								/>
							</FormControl>
							<FormMessage className="text-[#e22b2b] text-[12px] font-normal mt-1" />
						</FormItem>
					)}
				/>

				{/* District with Search */}
				<FormField
					control={control}
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
										className={`h-[48px] min-h-[48px] w-full px-4 text-[14px] bg-white border rounded outline-none shadow-none focus:outline-none focus:ring-0 focus:ring-transparent focus:ring-offset-0 cursor-pointer transition-colors ${
											fieldState.error
												? "border-[#e22b2b] focus:border-[#e22b2b]"
												: "border-gray-300 focus:border-[#68b800]"
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
					control={control}
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
									className={`h-[48px] w-full px-4 text-[14px] bg-white rounded-md transition-colors !outline-none !ring-0 !ring-offset-0 !shadow-none border ${
										fieldState.error
											? "border-[#e22b2b] focus:border-[#e22b2b] focus-visible:border-[#e22b2b]"
											: "border-gray-200 focus:border-[#68b800] focus-visible:border-[#68b800]"
									}`}
								/>
							</FormControl>
							<FormMessage className="text-[#e22b2b] text-[12px] font-normal mt-1" />
						</FormItem>
					)}
				/>

				{/* Order Notes */}
				<FormField
					control={control}
					name="orderNotes"
					render={({ field, fieldState }) => (
						<FormItem className="pt-2 space-y-1">
							<FormLabel
								className={`text-[14px] font-medium transition-colors ${fieldState.error ? "text-[#e22b2b]" : "text-gray-800"}`}
							>
								Order notes (optional)
							</FormLabel>
							<FormControl>
								<Textarea
									placeholder="Notes about your order, e.g. special notes for delivery."
									className={`resize-none min-h-[100px] w-full px-4 py-3 text-[14px] bg-white rounded-md transition-colors !outline-none !ring-0 !ring-offset-0 !shadow-none border ${
										fieldState.error
											? "border-[#e22b2b] focus:border-[#e22b2b] focus-visible:border-[#e22b2b]"
											: "border-gray-200 focus:border-[#68b800] focus-visible:border-[#68b800]"
									}`}
									{...field}
								/>
							</FormControl>
							<FormMessage className="text-[#e22b2b] text-[12px] font-normal mt-1" />
						</FormItem>
					)}
				/>
			</div>

			{/* Shipping Methods Section */}
			<div className="mt-8 md:mt-12">
				<h2 className="text-2xl font-bold text-black mb-4">Shipping</h2>
				<div className="border border-gray-200 rounded">
					<label className="flex items-center justify-between p-4 border-b border-gray-200 cursor-pointer group hover:bg-gray-50 transition">
						<div className="flex items-center gap-3">
							<input
								type="radio"
								name="checkoutShipping"
								value="60"
								checked={shippingCost === 60}
								onChange={() => setShippingCost(60)}
								className="accent-[#68b800] w-4 h-4 cursor-pointer"
							/>
							<span className="text-[14px] text-gray-700 font-medium">Inside Dhaka:</span>
						</div>
						<span className="text-[14px] font-medium text-black">৳ 60.00</span>
					</label>

					<label className="flex items-center justify-between p-4 cursor-pointer group hover:bg-gray-50 transition">
						<div className="flex items-center gap-3">
							<input
								type="radio"
								name="checkoutShipping"
								value="120"
								checked={shippingCost === 120}
								onChange={() => setShippingCost(120)}
								className="accent-[#68b800] w-4 h-4 cursor-pointer"
							/>
							<span className="text-[14px] text-gray-700 font-medium">Outside Dhaka:</span>
						</div>
						<span className="text-[14px] font-medium text-black">৳ 120.00</span>
					</label>
				</div>
			</div>
		</div>
	);
}
