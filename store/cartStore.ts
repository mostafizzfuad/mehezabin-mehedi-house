import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { CartStoreActionsType, CartStoreStateType } from "@/lib/types";

const useCartStore = create<CartStoreStateType & CartStoreActionsType>()(
	persist(
		(set) => ({
			cart: [],

			addToCart: (product) =>
				set((state) => {
					const existingIndex = state.cart.findIndex((item) => item.id === product.id);

					if (existingIndex !== -1) {
						const updatedCart = [...state.cart];
						updatedCart[existingIndex].quantity += product.quantity || 1;
						return { cart: updatedCart };
					}

					return {
						cart: [...state.cart, { ...product }],
					};
				}),

			removeFromCart: (product) =>
				set((state) => ({
					cart: state.cart.filter((cartProduct) => cartProduct.id !== product.id),
				})),

			updateQuantity: (id, quantity) =>
				set((state) => ({
					cart: state.cart.map((item) =>
						item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item,
					),
				})),

			clearCart: () => set({ cart: [] }),
		}),
		{
			name: "cart",
			storage: createJSONStorage(() => localStorage),
		},
	),
);

export default useCartStore;
