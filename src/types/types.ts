export type MenuType = {
  id: number;
  slug: string;
  title: string;
  desc?: string;
  img?: string;
  color: string;
}[];

export type ProductType = {
  id: string;
  title: string;
  desc?: string;
  img?: string;
  price: number;
  catSlug: string;
  options?: { title: string; additionalPrice: number }[];
};

export type OrderType = {
  id: number;
  createAt: number;
  date: number;
  price: number;
  products: CartItemType[];
  status: string;
};

export type CartItemType = Pick<ProductType, "title" | "price" | "img"> & {
  id: string;
  quantity: number;
  optionTitle?: string;
};

export type CartType = {
  products: CartItemType[];
  totalItems: number;
  totalPrice: number;
};

export type ActionTypes = {
  addToCart: (item: CartItemType) => void;
  removeFromCart: (item: CartItemType) => void;
  removeAllFromCart: () => void;
};

export type Products = ProductType[];
