import Hero from "@/components/Hero";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Home",
};

const HomePage = () => {
	return (
		<div>
			<Hero />
		</div>
	);
};

export default HomePage;
