"use client";
import { useState } from "react";
import { ProductType } from "@/lib/types";

export default function ProductTabs({ product }: { product: ProductType }) {
	const [activeTab, setActiveTab] = useState("description");

	return (
		<div className="mt-16 border-t border-gray-200 pt-8">
			<div className="flex gap-6 md:gap-10 border-b border-gray-200">
				<button
					onClick={() => setActiveTab("description")}
					className={`pb-3 text-[16px] md:text-[18px] font-medium transition-colors cursor-pointer relative ${
						activeTab === "description" ? "text-black" : "text-gray-500 hover:text-black"
					}`}
				>
					Description
					{activeTab === "description" && (
						<span className="absolute bottom-0 left-0 w-full h-[3px] bg-[#68b800]"></span>
					)}
				</button>

				<button
					onClick={() => setActiveTab("reviews")}
					className={`pb-3 text-[16px] md:text-[18px] font-medium transition-colors cursor-pointer relative ${
						activeTab === "reviews" ? "text-black" : "text-gray-500 hover:text-black"
					}`}
				>
					Reviews ({product.reviewsCount || 0})
					{activeTab === "reviews" && (
						<span className="absolute bottom-0 left-0 w-full h-[3px] bg-[#68b800]"></span>
					)}
				</button>
			</div>

			{/* Tab Content */}
			<div className="mt-6 md:mt-8 min-h-[200px]">
				{activeTab === "description" ? (
					<div className="text-[14.5px] md:text-[15px] text-gray-700 leading-relaxed max-w-4xl">
						{product.longDescription}
					</div>
				) : (
					<div className="text-[15px] text-gray-600">
						There are no reviews yet. Be the first to review "{product.name}".
					</div>
				)}
			</div>
		</div>
	);
}
