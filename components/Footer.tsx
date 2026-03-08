"use client";
import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, ChevronDown } from "lucide-react";

export default function Footer() {
	return (
		<footer className="bg-[#132200] text-white pt-12 md:pt-16">
			<div className="container mx-auto max-w-6xl px-4 lg:px-0">
				<div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
					{/* ======================================= */}
					{/* COLUMN 1: About & Contact Info */}
					{/* ======================================= */}
					<div className="lg:col-span-5 flex flex-col gap-6">
						{/* Logo */}
						<Link href="/" className="inline-block w-[220px]">
							<Image
								src="/logo-white.png"
								alt="Mehezabin Mehedi House Logo"
								width={500}
								height={150}
								className="w-full h-auto object-contain"
							/>
						</Link>

						{/* Description */}
						<p className="text-[15px] leading-relaxed text-gray-200 pr-0 lg:pr-6">
							Mehezabin Mehedi House is a top henna brand in Bangladesh, offering 100% organic products
							and expert bridal henna services with a reputation for quality and trust.
						</p>

						{/* Contact Info List */}
						<div className="flex flex-col gap-4 mt-2 text-[14px]">
							{/* Phone */}
							<div className="flex items-start gap-4">
								<div className="border border-white p-2 rounded-full shrink-0">
									<Phone className="w-4 h-4 text-white" />
								</div>
								<div>
									<h4 className="font-bold text-white mb-0.5">Phone Number:</h4>
									<a
										href="tel:01679-345505"
										className="text-gray-300 hover:text-[#b8a200] transition-colors"
									>
										01679-345505
									</a>
								</div>
							</div>

							{/* Email */}
							<div className="flex items-start gap-4">
								<div className="border border-white p-2 rounded-full shrink-0">
									<Mail className="w-4 h-4 text-white" />
								</div>
								<div>
									<h4 className="font-bold text-white mb-0.5">Mail us</h4>
									<a
										href="mailto:mehezabinmehedi2010@gmail.com"
										className="text-gray-300 hover:text-[#b8a200] transition-colors"
									>
										mehezabinmehedi2010@gmail.com
									</a>
								</div>
							</div>

							{/* Address */}
							<div className="flex items-start gap-4">
								<div className="border border-white p-2 rounded-full shrink-0 mt-1">
									<MapPin className="w-4 h-4 text-white" />
								</div>
								<div>
									<h4 className="font-bold text-white mb-0.5">Address:</h4>
									<p className="text-gray-300 leading-relaxed">
										Level 9, Rupayan Z R Plaza, Satmasjid Road,
										<br />
										Road-9/A New (old-19), Dhanmondi, Dhaka, Bangladesh
									</p>
								</div>
							</div>
						</div>

						{/* Social Icons */}
						<div className="flex items-center gap-3 mt-4">
							{/* Facebook */}
							<Link
								href="#"
								className="bg-[#68b800] p-2.5 rounded-full hover:bg-[#5b9f03] transition-colors group duration-300"
							>
								<svg className="w-4 h-4 fill-white duration-300 transition-colors" viewBox="0 0 24 24">
									<path d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.407.593 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.323-.593 1.323-1.325V1.325C24 .593 23.407 0 22.675 0z" />
								</svg>
							</Link>
							{/* YouTube */}
							<Link
								href="#"
								className="bg-[#68b800] p-2.5 rounded-full hover:bg-[#5b9f03] transition-colors group duration-300"
							>
								<svg className="w-4 h-4 fill-white duration-300 transition-colors" viewBox="0 0 24 24">
									<path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
								</svg>
							</Link>
							{/* Instagram */}
							<Link
								href="#"
								className="bg-[#68b800] p-2.5 rounded-full hover:bg-[#5b9f03] transition-colors group duration-300"
							>
								<svg className="w-4 h-4 fill-white duration-300 transition-colors" viewBox="0 0 24 24">
									<path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
								</svg>
							</Link>
							{/* TikTok */}
							<Link
								href="#"
								className="bg-[#68b800] p-2.5 rounded-full hover:bg-[#5b9f03] transition-colors group duration-300"
							>
								<svg className="w-4 h-4 fill-white transition-colors duration-300" viewBox="0 0 24 24">
									<path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
								</svg>
							</Link>
						</div>
					</div>

					{/* ======================================= */}
					{/* COLUMN 2: Important Links */}
					{/* ======================================= */}
					<div className="lg:col-span-3 lg:ml-8 mt-6 lg:mt-0">
						<h3 className="text-xl font-bold mb-6 text-white">Important Links</h3>
						<ul className="flex flex-col gap-2 text-[15px]">
							<li>
								<Link href="/" className="text-[#68b800] hover:text-[#5fa51d] transition-colors">
									Home
								</Link>
							</li>
							<li>
								<button className="flex items-center gap-1 hover:text-[#68b800] transition-colors text-white">
									All Categories <ChevronDown className="w-4 h-4" />
								</button>
							</li>
							<li>
								<Link href="/shop" className="hover:text-[#68b800] transition-colors text-white">
									Shop
								</Link>
							</li>
							<li>
								<Link href="/about" className="hover:text-[#68b800] transition-colors text-white">
									About
								</Link>
							</li>
						</ul>
					</div>

					{/* ======================================= */}
					{/* COLUMN 3: Policy & Payments */}
					{/* ======================================= */}
					<div className="lg:col-span-4 mt-6 lg:mt-0">
						<h3 className="text-xl font-bold mb-6 text-white">Policy</h3>
						<ul className="flex flex-col gap-2 text-[15px]">
							<li>
								<Link href="/" className="text-[#68b800] hover:text-[#5fa51d] transition-colors">
									Home
								</Link>
							</li>
							<li>
								<button className="flex items-center gap-1 hover:text-[#68b800] transition-colors text-white">
									All Categories <ChevronDown className="w-4 h-4" />
								</button>
							</li>
							<li>
								<Link href="/shop" className="hover:text-[#68b800] transition-colors text-white">
									Shop
								</Link>
							</li>
							<li>
								<Link href="/about" className="hover:text-[#68b800] transition-colors text-white">
									About
								</Link>
							</li>
						</ul>

						{/* Payment Gateway Image */}
						<div className="mt-8">
							<Image
								src="/ssl-secure-connection.webp"
								alt="SSL Commerz Secure Payment"
								width={300}
								height={120}
								className="w-[240px] h-auto object-contain"
							/>
						</div>
						<div className="mt-8">
							<Image
								src="/ssl-pay.png"
								alt="SSL Commerz Secure Payment"
								width={300}
								height={120}
								className="w-[280px] h-auto object-contain"
							/>
						</div>
					</div>
				</div>
			</div>

			{/* ======================================= */}
			{/* COPYRIGHT BOTTOM BAR */}
			{/* ======================================= */}
			<div className="border-t border-white/10 mt-12 py-5 text-center text-[13px] md:text-[14px] text-gray-200">
				<div className="container mx-auto max-w-6xl px-4 lg:px-0">
					Copyright &copy;{new Date().getFullYear()} Mehezabin Mehedi House. All Rights Reserved
				</div>
			</div>
		</footer>
	);
}
