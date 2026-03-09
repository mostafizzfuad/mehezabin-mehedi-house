"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Search, ShoppingCart, Menu, ChevronDown, ChevronRight, X, CircleUser } from "lucide-react";
import useCartStore from "@/store/cartStore";

const categories = [
	{ name: "Cellophane Paper" },
	{
		name: "Hair Care",
		subItems: ["Hair Serum", "Hair Pack", "Hair Oil"],
	},
	{ name: "Henna Powder" },
	{ name: "Nail Cone" },
	{ name: "Oil" },
	{
		name: "Organic Mehedi",
		subItems: ["Organic Henna Cone"],
	},
	{ name: "Perfume" },
	{ name: "Special Combo" },
	{ name: "Tape Dispenser" },
];

export default function Navbar() {
	const pathname = usePathname();
	const router = useRouter();
	const [mobileMenuOpen, setMobileMenuOpen] = useState("");
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isAllCategoriesOpen, setIsAllCategoriesOpen] = useState(false);
	const { cart } = useCartStore();
	const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);

	const isActive = (path: string) => pathname === path;

	return (
		<header className="w-full border-b border-gray-200 bg-white relative z-50">
			<div className="container mx-auto max-w-6xl px-4 lg:px-0">
				{/* ========================================= */}
				{/* MAIN HEADER ROW (Visible on md and above) */}
				{/* ========================================= */}
				<div className="hidden md:flex items-center justify-between py-3">
					<div className="flex items-center gap-4 lg:gap-12 xl:gap-16">
						<button
							onClick={() => setIsMenuOpen(!isMenuOpen)}
							className="text-black p-1 transition-transform cursor-pointer lg:hidden"
						>
							{isMenuOpen ? <X className="h-8 w-8" /> : <Menu className="h-8 w-8" />}
						</button>

						{/* Logo */}
						<Link href="/" className="w-[140px] sm:w-[160px] lg:w-[180px] block cursor-pointer shrink-0">
							<Image
								src="/logo.png"
								alt="Mehezabin Mehedi House Logo"
								width={2048}
								height={597}
								className="w-full h-auto aspect-[2048/597] object-contain"
								priority
							/>
						</Link>

						{/* Desktop Menu: Visible only on lg and above */}
						<nav className="hidden lg:flex items-center gap-6 font-medium text-[15px]">
							<Link
								href="/"
								className={`${isActive("/") ? "text-[#68b800]" : "text-black"} hover:text-[#5fa51d] transition cursor-pointer`}
							>
								Home
							</Link>

							{/* All Categories Dropdown */}
							<div className="relative group/main">
								<button className="flex items-center gap-1 hover:text-[#68b800] transition py-3 cursor-pointer text-black group-hover/main:text-[#68b800]">
									All Categories <ChevronDown className="h-4 w-4" />
								</button>

								<ul className="absolute left-0 top-[100%] w-60 bg-gray-50 border border-gray-100 hidden group-hover/main:block z-50 transition-all cursor-pointer shadow-lg py-2">
									{categories.map((cat, idx) => (
										<li
											key={idx}
											className="relative group/sub border-b border-gray-100 last:border-0 cursor-pointer"
										>
											<Link
												href={`/category/${cat.name.toLowerCase().replace(/ /g, "-")}`}
												className="flex items-center justify-between px-5 py-3 text-[14px] text-black hover:bg-[#404248] hover:text-[#D4AF37] transition-colors cursor-pointer"
											>
												{cat.name}
												{cat.subItems && <ChevronRight className="h-4 w-4" />}
											</Link>

											{/* Second Level Dropdown */}
											{cat.subItems && (
												<ul className="absolute left-full top-0 w-48 bg-gray-50 shadow-lg border border-gray-100 hidden group-hover/sub:block z-50 cursor-pointer py-2">
													{cat.subItems.map((sub, sIdx) => (
														<li
															key={sIdx}
															className="border-b border-gray-100 last:border-0 cursor-pointer"
														>
															<Link
																href="#"
																className="block px-5 py-3 text-[14px] text-black hover:bg-[#404248] hover:text-[#D4AF37] transition-colors cursor-pointer"
															>
																{sub}
															</Link>
														</li>
													))}
												</ul>
											)}
										</li>
									))}
								</ul>
							</div>

							<Link
								href="/shop"
								className={`${isActive("/shop") ? "text-[#68b800]" : "text-black"} hover:text-[#5fa51d] transition cursor-pointer`}
							>
								Shop
							</Link>
							<Link
								href="/about"
								className={`${isActive("/about") ? "text-[#68b800]" : "text-black"} hover:text-[#5fa51d] transition cursor-pointer`}
							>
								About
							</Link>
						</nav>
					</div>

					{/* Right Section: Search Bar & Icons */}
					<div className="flex items-center gap-4 xl:gap-6 px-0 md:px-3 flex-1 justify-end lg:flex-none">
						{/* Search Bar: 
                - lg: Fixed width right aligned
                - md: Full width flexible between logo and icons
                - sm: rendered below
            */}
						<div className="hidden md:flex flex-1 lg:flex-none lg:w-[280px] xl:w-[350px] items-center border border-gray-300 rounded overflow-hidden bg-white focus-within:border-[#68b800] transition mx-4 lg:mx-0">
							<input
								type="text"
								placeholder="Search on products"
								className="w-full px-4 py-2 text-sm outline-none text-gray-700"
							/>
							<button className="bg-[#68b800] hover:bg-[#5fa51d] p-2.5 text-white transition cursor-pointer">
								<Search className="h-5 w-5" />
							</button>
						</div>

						{/* Icons (User & Cart) */}
						<div className="flex items-center gap-4 shrink-0">
							<Link href="/profile" className="cursor-pointer">
								<CircleUser
									strokeWidth={2}
									className="h-7 w-7 text-black hover:text-[#68b800] transition"
								/>
							</Link>
							<Link href="/cart" className="relative cursor-pointer">
								<ShoppingCart
									strokeWidth={2}
									className="h-7 w-7 text-black hover:text-[#68b800] transition"
								/>
								<span className="absolute -top-1.5 md:-top-2 -right-1.5 md:-right-2 bg-[#d9534f] text-white text-[10px] font-medium w-4 h-4 md:w-5 md:h-5 flex items-center justify-center rounded-full md:border-2 md:border-white">
									{totalQuantity}
								</span>
							</Link>
						</div>
					</div>
				</div>

				{/* ======================================= */}
				{/* MOBILE ONLY VIEW (Below md) */}
				{/* ======================================= */}
				{/* Hamburger left, Logo center, Icons right */}
				<div className="flex md:hidden items-center justify-between py-3 relative bg-white z-50">
					{/* Hamburger (Left) */}
					<div className="flex-1 flex justify-start">
						<button
							onClick={() => setIsMenuOpen(!isMenuOpen)}
							className="text-black p-1 transition-transform cursor-pointer"
						>
							{isMenuOpen ? <X className="h-8 w-8" /> : <Menu className="h-8 w-8" />}
						</button>
					</div>

					{/* Logo (Center) */}
					<div className="flex flex-1 justify-center">
						<Link href="/" className="w-[140px] block cursor-pointer text-center">
							<Image
								src="/logo.png"
								alt="Mehezabin Mehedi House Logo"
								width={2048}
								height={597}
								className="w-full h-auto aspect-[2048/597] object-contain"
								priority
							/>
						</Link>
					</div>

					{/* Icons (Right) */}
					<div className="flex-1 flex justify-end items-center gap-4">
						<Link href="/profile" className="cursor-pointer">
							<CircleUser strokeWidth={2} className="h-7 w-7 text-black" />
						</Link>
						<Link href="/cart" className="relative cursor-pointer">
							<ShoppingCart strokeWidth={2} className="h-7 w-7 text-black" />
							<span className="absolute -top-1.5 -right-1.5 bg-[#d9534f] text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
								{totalQuantity}
							</span>
						</Link>
					</div>
				</div>

				{/* ========================================== */}
				{/* BOTTOM SEARCH BAR (Visible on sm or below) */}
				{/* ========================================== */}
				<div className="flex md:hidden w-full pb-4">
					<div className="flex w-full items-center border border-gray-300 rounded overflow-hidden bg-white focus-within:border-[#68b800] transition">
						<input
							type="text"
							placeholder="Search on products"
							className="w-full px-4 py-2 text-sm outline-none text-gray-700"
						/>
						<button className="bg-[#68b800] hover:bg-[#5fa51d] px-4 py-2 text-white transition cursor-pointer">
							<Search className="h-5 w-5" />
						</button>
					</div>
				</div>

				{/* =========================================== */}
				{/* MOBILE & TABLET DROPDOWN MENU (Slides Down) */}
				{/* =========================================== */}
				<div
					className={`lg:hidden absolute left-0 top-[100%] w-full bg-white shadow-xl transition-all duration-300 ease-in-out origin-top overflow-hidden z-40 border-t border-gray-100
            ${isMenuOpen ? "max-h-[100vh] opacity-100" : "max-h-0 opacity-0"}
          `}
				>
					<div className="flex flex-col h-auto pb-6">
						<ul className="flex flex-col">
							<li>
								<Link
									href="/"
									onClick={() => setIsMenuOpen(false)}
									className={`block w-full p-3 px-4 font-medium text-[15px] border-b border-gray-200 transition-colors cursor-pointer
                    ${isActive("/") ? "bg-[#68b800] text-white" : "bg-white text-black hover:bg-[#68b800] hover:text-white"}
                  `}
								>
									Home
								</Link>
							</li>

							<li>
								<button
									onClick={() => setIsAllCategoriesOpen(!isAllCategoriesOpen)}
									className={`w-full flex justify-between items-center p-3 px-4 font-medium text-[15px] border-b border-gray-200 transition-colors cursor-pointer
                    ${isAllCategoriesOpen ? "bg-[#68b800] text-white" : "bg-white text-black hover:bg-[#68b800] hover:text-white"}
                  `}
								>
									All Categories
									<ChevronDown
										className={`h-5 w-5 transition-transform duration-300 ${isAllCategoriesOpen ? "rotate-180" : ""}`}
									/>
								</button>

								<div
									className={`overflow-hidden transition-all duration-300 ease-in-out bg-white
                    ${isAllCategoriesOpen ? "max-h-[2000px] border-b border-gray-200" : "max-h-0"}
                  `}
								>
									<ul className="flex flex-col">
										{categories.map((cat, idx) => (
											<li key={idx} className="border-b border-gray-200 last:border-b-0">
												{cat.subItems ? (
													<button
														onClick={() => {
															if (mobileMenuOpen === cat.name) {
																setIsMenuOpen(false);
																router.push(
																	`/category/${cat.name.toLowerCase().replace(/ /g, "-")}`,
																);
															} else {
																setMobileMenuOpen(cat.name);
															}
														}}
														className={`w-full flex items-center justify-between px-6 py-3 text-left text-[14px] transition-colors cursor-pointer
                              ${mobileMenuOpen === cat.name ? "bg-[#68b800] text-white" : "bg-white text-black hover:bg-[#68b800] hover:text-white"}
                            `}
													>
														{cat.name}
														<ChevronDown
															className={`h-4 w-4 transition-transform ${mobileMenuOpen === cat.name ? "rotate-180 text-white" : ""}`}
														/>
													</button>
												) : (
													<Link
														href={`/category/${cat.name.toLowerCase().replace(/ /g, "-")}`}
														className="w-full block px-6 py-3 text-left text-black hover:bg-[#68b800] hover:text-white bg-white text-[14px] transition-colors cursor-pointer"
														onClick={() => setIsMenuOpen(false)}
													>
														{cat.name}
													</Link>
												)}

												{cat.subItems && (
													<div
														className={`overflow-hidden transition-all duration-300 ease-in-out bg-white ${
															mobileMenuOpen === cat.name
																? "max-h-[500px] border-t border-gray-100"
																: "max-h-0"
														}`}
													>
														<ul>
															{cat.subItems.map((sub, sIdx) => (
																<li
																	key={sIdx}
																	className="border-b border-gray-100 last:border-0 cursor-pointer"
																>
																	<Link
																		href="#"
																		className="block px-10 py-3 text-[13px] text-gray-600 hover:bg-[#68b800] hover:text-white transition-colors cursor-pointer"
																		onClick={() => setIsMenuOpen(false)}
																	>
																		{sub}
																	</Link>
																</li>
															))}
														</ul>
													</div>
												)}
											</li>
										))}
									</ul>
								</div>
							</li>

							<li>
								<Link
									href="/shop"
									className={`block w-full p-3 px-4 font-medium text-[15px] border-b border-gray-200 transition-colors cursor-pointer
                    ${isActive("/shop") ? "bg-[#68b800] text-white" : "bg-white text-black hover:bg-[#68b800] hover:text-white"}
                  `}
									onClick={() => setIsMenuOpen(false)}
								>
									Shop
								</Link>
							</li>

							<li>
								<Link
									href="/about"
									className={`block w-full p-3 px-4 font-medium text-[15px] border-b border-gray-200 transition-colors cursor-pointer
                    ${isActive("/about") ? "bg-[#68b800] text-white" : "bg-white text-black hover:bg-[#68b800] hover:text-white"}
                  `}
									onClick={() => setIsMenuOpen(false)}
								>
									About
								</Link>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</header>
	);
}
