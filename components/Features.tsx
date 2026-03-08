import Image from "next/image";

const featuresData = [
	{
		id: 1,
		title: "Flat Shipping",
		subtitle: "Flat Rate on Multiple Product",
		icon: "/icons/shipping.svg",
	},
	{
		id: 2,
		title: "Original product guarantee",
		subtitle: "100% Original product guarantee",
		icon: "/icons/guarantee.svg",
	},
	{
		id: 3,
		title: "24 hours support",
		subtitle: "24 / 7 from Saturday to Friday",
		icon: "/icons/support.svg",
	},
];

export default function Features() {
	return (
		<section className="container mx-auto max-w-6xl px-2 lg:px-0">
			<div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
				{featuresData.map((feature) => (
					<div
						key={feature.id}
						className="bg-[#F5F7EC] p-3 lg:p-4 rounded-xl flex flex-row md:flex-col lg:flex-row items-center md:items-start lg:items-center gap-4 lg:gap-5"
					>
						{/* Icon Container */}
						<div className="relative w-14 h-14 md:w-12 md:h-12 lg:w-14 lg:h-14 shrink-0">
							<Image src={feature.icon} alt={feature.title} fill className="object-contain" />
						</div>

						{/* Text Container */}
						<div className="flex flex-col">
							<h3 className="font-bold text-black text-[16px] md:text-[15px] lg:text-[17px] leading-tight mb-1">
								{feature.title}
							</h3>
							<p className="text-gray-600 text-[14px] md:text-[13px] lg:text-[14px] leading-snug">
								{feature.subtitle}
							</p>
						</div>
					</div>
				))}
			</div>
		</section>
	);
}
