"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
const sliderImages = ["/slider-1.jpg", "/slider-2.jpg", "/slider-3.jpg"];

export default function Hero() {
	const [currentSlide, setCurrentSlide] = useState(0);

	const prevSlide = () => {
		setCurrentSlide((prev) => (prev === 0 ? sliderImages.length - 1 : prev - 1));
	};

	const nextSlide = () => {
		setCurrentSlide((prev) => (prev === sliderImages.length - 1 ? 0 : prev + 1));
	};

	useEffect(() => {
		const slideInterval = setInterval(nextSlide, 5000);
		return () => clearInterval(slideInterval);
	}, []);

	return (
		<section className="container mx-auto max-w-6xl px-0 lg:px-0 py-4 md:py-6">
			<div className="flex flex-col md:flex-row gap-4 md:gap-6 h-auto md:h-[280px] lg:h-[380px]">
				{/* ======================================= */}
				{/* LEFT SIDE: IMAGE SLIDER (68% Width) */}
				{/* ======================================= */}
				<div className="w-full md:w-[68%] relative aspect-[16/9] sm:aspect-auto sm:h-[350px] md:h-full rounded-2xl overflow-hidden group">
					{/* Images */}
					<div
						className="flex h-full transition-transform ease-out duration-500"
						style={{ transform: `translateX(-${currentSlide * 100}%)` }}
					>
						{sliderImages.map((imgSrc, index) => (
							<Link
								key={index}
								href="/shop"
								className="relative min-w-full h-full shrink-0 block cursor-pointer"
							>
								<Image
									src={imgSrc}
									alt={`Slider Image ${index + 1}`}
									fill
									className="object-cover md:object-fill lg:object-cover"
									priority={index === 0}
								/>
							</Link>
						))}
					</div>

					{/* Left Arrow */}
					<button
						onClick={prevSlide}
						className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors z-10 cursor-pointer"
					>
						<ChevronLeft className="w-8 h-8 md:w-10 md:h-10 drop-shadow-md" strokeWidth={1.5} />
					</button>

					{/* Right Arrow */}
					<button
						onClick={nextSlide}
						className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors z-10 cursor-pointer"
					>
						<ChevronRight className="w-8 h-8 md:w-10 md:h-10 drop-shadow-md" strokeWidth={1.5} />
					</button>

					{/* Pagination Dots */}
					<div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2.5 z-10">
						{sliderImages.map((_, index) => (
							<button
								key={index}
								onClick={() => setCurrentSlide(index)}
								className={`cursor-pointer transition-all duration-300 rounded-full ${
									currentSlide === index
										? "w-3 h-3 bg-[#68b800]"
										: "w-2.5 h-2.5 bg-white/80 hover:bg-white"
								}`}
								aria-label={`Go to slide ${index + 1}`}
							/>
						))}
					</div>
				</div>

				{/* ======================================= */}
				{/* RIGHT SIDE: STATIC BANNER (32% Width) */}
				{/* ======================================= */}
				<div className="hidden md:block w-[32%] h-full relative rounded-2xl overflow-hidden">
					<Image src="/right-banner.jpg" alt="Oil Category Promo" fill className="object-cover" />
				</div>
			</div>
		</section>
	);
}
