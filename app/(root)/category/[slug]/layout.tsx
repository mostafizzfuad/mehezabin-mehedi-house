import { Metadata } from "next";

type Props = {
	params: Promise<{ slug: string }>;
	children: React.ReactNode;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const resolvedParams = await params;
	const slug = resolvedParams.slug;

	const categoryName = slug
		.split("-")
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(" ");

	return {
		title: `${categoryName}`,
	};
}

export default function CategoryLayout({ children }: { children: React.ReactNode }) {
	return <>{children}</>;
}
