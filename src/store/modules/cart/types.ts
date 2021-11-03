export interface IProduct {
  id: number;
  title: string;
  price: number;
}

export interface IcartItems {
  product: IProduct;
  quantity: number;
}

export interface ICartState {
  items: IcartItems[];
}
