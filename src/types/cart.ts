export interface cartItemPayload {
  id: number;
  title: string;
  price: number;
  quantity: number;
  image: string;
}

export interface cartState {
  numberOfItem: number;
  itemArray: itemProps[];
}

export interface productProps {
  id: number;
  quantity: number;
}

export interface productState {
  product: itemProps[];
}

export interface stateProps {
  product: productState;
  cart: cartState;
}

export interface itemProps {
  id: number;
  title: string;
  price: number;
  category: string;
  discountPercentage: number;
  rating: number;
  stock: number;
  thumbnail: string;
  quantity: number;
}
