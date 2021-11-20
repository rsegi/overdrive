import { ICartItem } from "./cartItem";

export interface IOrder {
  items: ICartItem[];
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
}