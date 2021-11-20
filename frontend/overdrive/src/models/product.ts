export interface IProduct {
    id: string;
    name: string;
    quantity: number; //TODO: it is called 'amount' in the backend
    price: number;
    image: string;
    description: string;
}