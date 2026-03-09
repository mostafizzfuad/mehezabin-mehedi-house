import Image from "next/image";

const brands = [
	{ id: 1, name: "EdgeKart", src: "/brand1.png" },
	{ id: 2, name: "Pastel & Co", src: "/brand2.png" },
	{ id: 3, name: "Infinity Parker", src: "/brand3.png" },
	{ id: 4, name: "Omega Million", src: "/brand4.png" },
];

const displayBrands = [...brands, ...brands, ...brands];

export default function Brands() {
	return (
		<section className="py-6 md:py-8 bg-white overflow-hidden">
			<div className="container mx-auto max-w-6xl px-4 lg:px-0 mb-2 md:mb-4 text-center">
				<h2 className="text-2xl md:text-[28px] font-bold text-black">Our Brands</h2>
			</div>

			{/* Marquee Container */}
			<div className="relative flex overflow-x-hidden group bg-white">
				{/* Custom CSS Animation for Infinite Marquee */}
				<style>{`
          @keyframes marquee {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-100%); }
          }
          .animate-marquee {
            animation: marquee 25s linear infinite; 
          }
          .group:hover .animate-marquee {
            animation-play-state: paused;
          }
        `}</style>

				{/* First Set of Brands */}
				<div className="flex animate-marquee whitespace-nowrap shrink-0 items-center">
					{displayBrands.map((brand, index) => (
						<div
							key={index}
							className="relative w-[130px] md:w-[180px] h-10 md:h-14 mx-4 md:mx-8 shrink-0 grayscale hover:grayscale-0 transition-all duration-300"
						>
							<Image src={brand.src} alt={brand.name} fill className="object-contain" />
						</div>
					))}
				</div>

				{/* Second Set of Brands (For seamless infinite loop) */}
				<div className="flex animate-marquee whitespace-nowrap shrink-0 items-center" aria-hidden="true">
					{displayBrands.map((brand, index) => (
						<div
							key={index}
							className="relative w-[130px] md:w-[180px] h-10 md:h-14 mx-4 md:mx-8 shrink-0 grayscale hover:grayscale-0 transition-all duration-300"
						>
							<Image src={brand.src} alt={brand.name} fill className="object-contain" />
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
