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

// Cart
export type CartItemType = ProductType & {
	quantity: number;
};

export type CartItemsType = CartItemType[];

// State Type
export type CartStoreStateType = {
	cart: CartItemsType;
};

// Actions Type
export type CartStoreActionsType = {
	addToCart: (product: CartItemType) => void;
	removeFromCart: (product: CartItemType) => void;
	updateQuantity: (id: string | number, quantity: number) => void;
	clearCart: () => void;
};
