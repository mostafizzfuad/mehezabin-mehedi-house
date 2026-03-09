import { Metadata } from "next";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import SectionLayout from "@/components/SectionLayout";
import ProductCard from "@/components/ProductCard";
import { popularProducts, bestSellerProducts, randomProducts, featuredProducts } from "@/db/data";
import Brands from "@/components/Brands";

export const metadata: Metadata = {
	title: "Home",
};

const HomePage = () => {
	return (
		<div>
			<Hero />
			<Features />

			{/* Popular Products Section */}
			<SectionLayout title="Popular products" seeMoreLink="/shop">
				{popularProducts.slice(0, 4).map((product) => (
					<ProductCard key={product.id} product={product} />
				))}
			</SectionLayout>

			{/* Best Seller Products Section */}
			<SectionLayout title="Best Seller Products" seeMoreLink="/shop">
				{bestSellerProducts.slice(0, 4).map((product) => (
					<ProductCard key={product.id} product={product} />
				))}
			</SectionLayout>

			{/* Random Products Section */}
			<SectionLayout title="Random Products" seeMoreLink="/shop">
				{randomProducts.slice(0, 4).map((product) => (
					<ProductCard key={product.id} product={product} />
				))}
			</SectionLayout>

			{/* Featured Products Section (With Subtitle) */}
			<SectionLayout
				title="Featured Products"
				subtitle="Handpicked just for you - our spotlight items"
				seeMoreLink="/shop"
			>
				{featuredProducts.slice(0, 4).map((product) => (
					<ProductCard key={product.id} product={product} />
				))}
			</SectionLayout>

			<Brands />
		</div>
	);
};

export default HomePage;
