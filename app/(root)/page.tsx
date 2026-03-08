import { Metadata } from "next";
import Hero from "@/components/Hero";
import Features from "@/components/Features";

export const metadata: Metadata = {
	title: "Home",
};

const HomePage = () => {
	return (
		<div>
			<Hero />
			<Features />
		</div>
	);
};

export default HomePage;
