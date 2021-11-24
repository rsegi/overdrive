export interface OrderWithProducts {
  firstname: string;
  lastname: string;
  address: string;
  email: string;
  city: string;
  postalcode: string;
  country: string;
  user_id: string;
  products: ProductOrder[];
}

export interface ProductOrder {
  product_id: string;
  quantity: number;
}
