import { IOrderProduct } from "./orderProduct";

export interface IOrder {
  products: IOrderProduct[];
  firstname: string;
  lastname: string;
  email: string;
  address: string;
  city: string;
  postalcode: string;
  country: string;
  user_id: string;
}
