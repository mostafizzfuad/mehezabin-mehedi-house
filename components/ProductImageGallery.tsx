"use client";
import { useState } from "react";
import Image from "next/image";
import { FaSearch } from "react-icons/fa";

interface ProductImageGalleryProps {
	galleryImages: string[];
	productName: string;
}

export default function ProductImageGallery({ galleryImages, productName }: ProductImageGalleryProps) {
	const [activeImage, setActiveImage] = useState(galleryImages[0]);
	const [zoomStyle, setZoomStyle] = useState({});

	// Mouse move handler for image zoom effect
	const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
		const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
		const x = ((e.pageX - left) / width) * 100;
		const y = ((e.pageY - top) / height) * 100;

		setZoomStyle({
			backgroundImage: `url(${activeImage})`,
			backgroundPosition: `${x}% ${y}%`,
			backgroundSize: "200%",
		});
	};

	// Mouse leave handler to reset zoom
	const handleMouseLeave = () => {
		setZoomStyle({});
	};

	return (
		<div className="flex flex-col gap-4">
			{/* Main Image (With Hover Zoom Effect) */}
			<div
				className="relative aspect-square rounded-lg overflow-hidden border border-gray-100 group cursor-crosshair"
				onMouseMove={handleMouseMove}
				onMouseLeave={handleMouseLeave}
			>
				<Image
					src={activeImage}
					alt={productName}
					fill
					className={`object-cover transition-opacity duration-300 ${Object.keys(zoomStyle).length > 0 ? "opacity-0" : "opacity-100"}`}
				/>

				{/* invisible div to show the zoomed image, becomes visible on hover */}
				<div className="absolute inset-0 bg-no-repeat transition-all duration-75" style={zoomStyle} />

				{/* Zoom Icon */}
				<button className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md text-gray-600 group-hover:opacity-0 transition-opacity duration-300">
					<FaSearch size={18} />
				</button>
			</div>

			{/* Thumbnails (Only show if there's more than 1 image) */}
			{galleryImages.length > 1 && (
				<div className="grid grid-cols-4 gap-3 md:gap-4">
					{galleryImages.map((img, idx) => (
						<div
							key={idx}
							onClick={() => setActiveImage(img)}
							className={`relative aspect-square rounded-md overflow-hidden cursor-pointer border-2 transition-all ${
								activeImage === img
									? "border-[#68b800] opacity-100"
									: "border-transparent opacity-60 hover:opacity-100"
							}`}
						>
							<Image src={img} alt={`Thumbnail ${idx + 1}`} fill className="object-cover" />
						</div>
					))}
				</div>
			)}
		</div>
	);
}
