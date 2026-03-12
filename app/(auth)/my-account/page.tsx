"use client";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

// Zod Validation Schema
const loginSchema = z.object({
	email: z.string().min(1, "Username or email address is required"),
	password: z.string().min(1, "Password is required"),
	rememberMe: z.boolean(),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function MyAccountPage() {
	// React Hook Form Setup
	const form = useForm<LoginFormValues>({
		resolver: zodResolver(loginSchema),
		mode: "onTouched",
		defaultValues: {
			email: "",
			password: "",
			rememberMe: false,
		},
	});

	const onSubmit = (data: LoginFormValues) => {
		console.log("Login Data:", data);
		alert("Logged in successfully!");
	};

	return (
		<div className="w-full">
			{/* Page Header */}
			<div className="bg-[#f9fdf5] py-10 md:py-16 text-center border-b border-gray-100">
				<h1 className="text-4xl md:text-[50px] font-bold text-black mb-3">My account</h1>
				<div className="text-[14px] font-medium flex items-center justify-center gap-2">
					<Link href="/" className="text-[#68b800] hover:text-[#5b9f03] transition cursor-pointer">
						Home
					</Link>
					<span className="text-gray-500">/</span>
					<span className="text-black">My account</span>
				</div>
			</div>

			{/* Main Content Area */}
			<div className="container mx-auto max-w-6xl px-4 lg:px-0 py-10 md:py-12 md:pb-16">
				<div className="w-full">
					<h2 className="text-[28px] font-bold text-black mb-6">Login</h2>

					{/* Login Form Box */}
					<div className="border border-gray-200 rounded p-6 md:p-8 bg-white">
						<Form {...form}>
							<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
								{/* Username or email address */}
								<FormField
									control={form.control}
									name="email"
									render={({ field, fieldState }) => (
										<FormItem className="space-y-1">
											<FormLabel
												className={`text-[14px] font-medium transition-colors ${fieldState.error ? "text-[#e22b2b]" : "text-gray-800"}`}
											>
												Username or email address <span className="text-[#e22b2b]">*</span>
											</FormLabel>
											<FormControl>
												<Input
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

								{/* Password */}
								<FormField
									control={form.control}
									name="password"
									render={({ field, fieldState }) => (
										<FormItem className="space-y-1">
											<FormLabel
												className={`text-[14px] font-medium transition-colors ${fieldState.error ? "text-[#e22b2b]" : "text-gray-800"}`}
											>
												Password <span className="text-[#e22b2b]">*</span>
											</FormLabel>
											<FormControl>
												<Input
													type="password"
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

								{/* Remember me Checkbox */}
								<FormField
									control={form.control}
									name="rememberMe"
									render={({ field }) => (
										<FormItem className="flex flex-row items-center space-x-2 space-y-0 pt-2">
											<FormControl>
												<Checkbox
													checked={field.value}
													onCheckedChange={field.onChange}
													className="w-4 h-4 rounded-sm border-gray-300 data-[state=checked]:bg-[#68b800] data-[state=checked]:text-white data-[state=checked]:border-[#68b800] focus:ring-[#68b800]"
												/>
											</FormControl>
											<FormLabel className="text-[14px] font-bold text-gray-800 cursor-pointer select-none">
												Remember me
											</FormLabel>
										</FormItem>
									)}
								/>

								{/* Log In Button */}
								<div className="pt-3">
									<button
										type="submit"
										className="bg-[#68b800] hover:bg-[#b8a200] active:scale-[0.98] text-white px-8 py-2.5 rounded-full text-[15px] font-medium transition-all cursor-pointer shadow-sm"
									>
										Log in
									</button>
								</div>

								{/* Lost Password Link */}
								<div className="pt-3">
									<Link
										href="/lost-password"
										className="text-[14px] text-[#68b800] hover:text-[#5b9f03] transition-colors cursor-pointer"
									>
										Lost your password?
									</Link>
								</div>
							</form>
						</Form>
					</div>
				</div>
			</div>
		</div>
	);
}
