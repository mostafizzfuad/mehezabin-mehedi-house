import Link from "next/link";

interface SectionLayoutProps {
	title: string;
	subtitle?: string;
	seeMoreLink?: string;
	children: React.ReactNode;
}

export default function SectionLayout({ title, subtitle, seeMoreLink, children }: SectionLayoutProps) {
	return (
		<section className="py-8 md:py-10">
			{/* Header Row: Title & See More Button */}
			<div
				className={`flex flex-col md:flex-row justify-between mb-4 gap-4 ${subtitle ? "items-center text-center md:text-left" : "items-center"}`}
			>
				<div className="flex flex-col">
					<h2 className="text-2xl md:text-[28px] font-bold text-black">{title}</h2>
					{subtitle && <p className="text-gray-600 mt-1 text-[14px] md:text-[15px]">{subtitle}</p>}
				</div>

				{/* Desktop Button (Hidden on Mobile, Visible on md and up) */}
				{seeMoreLink && (
					<div className={`hidden md:flex justify-end ${subtitle ? "md:self-start mt-2 md:mt-0" : ""}`}>
						<Link
							href={seeMoreLink}
							className="inline-flex items-center gap-1.5 border border-[#68b800] text-[#68b800] hover:bg-[#68b800] hover:text-white px-4 md:px-5 py-1.5 rounded-full transition-colors text-[13px] md:text-[14px] font-medium"
						>
							See More <span className="text-lg leading-none">→</span>
						</Link>
					</div>
				)}
			</div>

			{/* Product Grid: Mobile=2, Desktop=4 */}
			<div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">{children}</div>

			{/* Mobile Button (Visible on Mobile, Hidden on md and up) */}
			{seeMoreLink && (
				<div className="flex md:hidden justify-center mt-6">
					<Link
						href={seeMoreLink}
						className="inline-flex items-center gap-1.5 border border-[#68b800] text-[#68b800] hover:bg-[#68b800] hover:text-white px-6 py-2 rounded-full transition-colors text-[14px] font-medium"
					>
						See More <span className="text-lg leading-none">→</span>
					</Link>
				</div>
			)}
		</section>
	);
}
