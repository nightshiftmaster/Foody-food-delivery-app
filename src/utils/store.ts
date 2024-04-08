import { CartType, ActionTypes } from "@/types/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const INITIAL_STATE = {
  products: [],
  totalItems: 0,
  totalPrice: 0,
};

export const useCartStore = create(
  persist<CartType & ActionTypes>(
    (set, get) => ({
      products: INITIAL_STATE.products,
      totalItems: INITIAL_STATE.totalItems,
      totalPrice: INITIAL_STATE.totalPrice,

      addToCart(item) {
        const products = get().products;
        const productInState = products.find(
          (product) =>
            product.id === item.id && product.optionTitle === item.optionTitle
        );

        if (productInState) {
          const updatedProducts = products.map((product) =>
            product.id === productInState.id &&
            product.optionTitle === item.optionTitle
              ? {
                  ...item,
                  quantity: item.quantity + product.quantity,
                  price: item.price + product.price,
                }
              : product
          );
          set((state) => ({
            products: updatedProducts,
            totalItems: state.totalItems + item.quantity,
            totalPrice: state.totalPrice + item.price,
          }));
        } else {
          set((state) => ({
            products: [...state.products, item],
            totalItems: state.totalItems + item.quantity,
            totalPrice: state.totalPrice + item.price,
          }));
        }
      },

      removeFromCart(item) {
        set((state) => ({
          products: state.products.filter(
            (product) =>
              item.optionTitle !== product.optionTitle || item.id !== product.id
          ),
          totalItems: state.totalItems - item.quantity,
          totalPrice: state.totalPrice - item.price,
        }));
      },
      removeAllFromCart() {
        set((state) => ({
          products: (state.products = []),
          totalItems: (state.totalItems = 0),
          totalPrice: (state.totalPrice = 0),
        }));
      },
    }),
    { name: "cart", skipHydration: true }
  )
);
