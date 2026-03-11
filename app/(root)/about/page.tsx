import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "About",
};

export default function AboutPage() {
	return (
		<div>
			{/* ================================== */}
			{/* HEADER SECTION */}
			{/* ================================== */}
			<div className="bg-[#f9fdf5] py-12 text-center border-b border-gray-100">
				<h1 className="text-4xl md:text-5xl font-bold text-black mb-3">About</h1>
				<div className="text-[14px] text-[#68b800] font-medium flex items-center justify-center gap-2">
					<Link href="/" className="hover:text-[#5b9f03] transition">
						Home
					</Link>
					<span className="text-gray-400">/</span>
					<span className="text-black">About</span>
				</div>
			</div>

			{/* ================================== */}
			{/* MAIN CONTENT CONTAINER */}
			{/* ================================== */}
			<div className="container mx-auto max-w-6xl px-4 lg:px-0 py-8 pb-16 space-y-16">
				{/* SECTION 1: About Us */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
					{/* Left Text Content */}
					<div className="flex flex-col order-last md:order-first">
						<h2 className="text-[24px] md:text-[32px] lg:text-[40px] font-bold text-black mb-6 leading-tight">
							About us
						</h2>

						<div className="text-gray-600 text-[15px] leading-relaxed space-y-4">
							<p>
								<strong className="text-gray-800 font-bold">Mehezabin Mehedi House</strong> is a trusted
								name in the world of henna artistry and natural beauty products in Bangladesh. With
								years of experience and a passion for traditional elegance, we have grown into one of
								the most sought-after henna brands in the country.
							</p>
							<p>
								Founded with a deep love for natural beauty, our mission is to deliver premium,{" "}
								<strong className="text-gray-800 font-bold">100% organic</strong>, and{" "}
								<strong className="text-gray-800 font-bold">halal-certified</strong> henna products that
								are safe, skin-friendly, and beautifully effective. We take pride in offering everything
								from <strong className="text-gray-800 font-bold">organic henna cones</strong> and{" "}
								<strong className="text-gray-800 font-bold">nail cones</strong> to{" "}
								<strong className="text-gray-800 font-bold">herbal hair oils</strong> and{" "}
								<strong className="text-gray-800 font-bold">custom bridal packages</strong>.
							</p>
							<p>
								At our studio in <strong className="text-gray-800 font-bold">Dhanmondi, Dhaka</strong>,
								we not only serve clients for bridal and special occasion henna, but also train aspiring
								henna artists through our{" "}
								<strong className="text-gray-800 font-bold">professional courses and workshops</strong>.
							</p>
							<p className="text-[13px] text-gray-500 pt-2">Trade License – LTRAD/DSCC/003806/2021</p>
						</div>

						<div className="mt-8">
							<Link
								href="/contact"
								className="inline-flex items-center gap-2 bg-[#68b800] hover:bg-[#5b9f03] text-white font-medium text-[15px] px-6 py-2.5 rounded-full transition-colors shadow-sm"
							>
								<span>→</span> Contact with us
							</Link>
						</div>
					</div>

					{/* Right Image */}
					<div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden shadow-sm order-first md:order-last">
						<Image
							src="/about-1.jpg"
							alt="Bridal hands with beautiful organic henna"
							fill
							className="object-cover"
						/>
					</div>
				</div>

				{/* SECTION 2: Why Choose Us? */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
					{/* Left Image */}
					<div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden shadow-sm order-last md:order-first">
						<Image
							src="/about-2.webp"
							alt="Intricate portrait henna design on bride's hands"
							fill
							className="object-cover"
						/>
					</div>

					{/* Right Text Content */}
					<div className="flex flex-col md:pl-8 order-first md:order-last">
						<h2 className="text-[24px] md:text-[32px] lg:text-[40px] font-bold text-black mb-8 leading-tight">
							Why Choose Us?
						</h2>

						<ul className="space-y-4 text-[15px] text-gray-700">
							<li className="flex items-start gap-3">
								<span className="text-[18px] leading-none">✅</span>
								<span>100% Organic & Halal Products</span>
							</li>
							<li className="flex items-start gap-3">
								<span className="text-[18px] leading-none">👩‍🎨</span>
								<span>Certified Henna Artist with years of experience</span>
							</li>
							<li className="flex items-start gap-3">
								<span className="text-[18px] leading-none">👰</span>
								<span>Trusted by hundreds of brides nationwide</span>
							</li>
							<li className="flex items-start gap-3">
								<span className="text-[18px] leading-none">🏆</span>
								<span>Top-rated for quality, safety, and professionalism</span>
							</li>
							<li className="flex items-start gap-3">
								<span className="text-[18px] leading-none">🏢</span>
								<span>Studio & training center based in Dhaka</span>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
}
