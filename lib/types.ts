export type ProductType = {
	id: string | number;
	name: string;
	price: number;
	images: string[];
	categories: string[];
	inStock: boolean;

	badge?: string;
	sku?: string;
	rating?: number;
	reviewsCount?: number;

	shortDescription: string;
	longDescription?: string;
};

export type ProductsType = ProductType[];
