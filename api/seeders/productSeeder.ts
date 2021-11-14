import { v4 as uuidv4 } from "uuid";
import db from "../models";
import { ProductAttributes } from "../models/product";

const products: ProductAttributes[] = [
  {
    id: uuidv4(),
    amount: 5,
    description: "Description Guitar 1",
    image: "img/guitar1.png",
    name: "Guitar 1",
    price: 300,
    CategoryId: "bf8cd36d-9892-493b-8b91-308d0eaabcc6",
  },
  {
    id: uuidv4(),
    amount: 5,
    description: "Description Guitar 2",
    image: "img/guitar2.png",
    name: "Guitar 2",
    price: 700,
    CategoryId: "bf8cd36d-9892-493b-8b91-308d0eaabcc6",
  },
  {
    id: uuidv4(),
    amount: 5,
    description: "Description Guitar 3",
    image: "img/guitar3.png",
    name: "Guitar 3",
    price: 199,
    CategoryId: "bf8cd36d-9892-493b-8b91-308d0eaabcc6",
  },
  {
    id: uuidv4(),
    amount: 5,
    description: "Description Piano 1",
    image: "img/piano1.png",
    name: "Piano 1",
    price: 550,
    CategoryId: "9191c817-1319-4f36-893e-188ac7a7550d",
  },
  {
    id: uuidv4(),
    amount: 5,
    description: "Description Piano 2",
    image: "img/piano2.png",
    name: "Piano 2",
    price: 850,
    CategoryId: "9191c817-1319-4f36-893e-188ac7a7550d",
  },
  {
    id: uuidv4(),
    amount: 5,
    description: "Description Piano 3",
    image: "img/piano3.png",
    name: "Piano 3",
    price: 1550,
    CategoryId: "9191c817-1319-4f36-893e-188ac7a7550d",
  },
  {
    id: uuidv4(),
    amount: 5,
    description: "Description Drum 1",
    image: "img/drum1.png",
    name: "Drum 1",
    price: 1200,
    CategoryId: "ee1da353-352f-48d1-9549-2d615ac6cb7e",
  },
  {
    id: uuidv4(),
    amount: 5,
    description: "Description Drum 2",
    image: "img/drum2.png",
    name: "Drum 2",
    price: 2299,
    CategoryId: "ee1da353-352f-48d1-9549-2d615ac6cb7e",
  },
  {
    id: uuidv4(),
    amount: 5,
    description: "Description Drum 3",
    image: "img/drum3.png",
    name: "Drum 3",
    price: 699,
    CategoryId: "ee1da353-352f-48d1-9549-2d615ac6cb7e",
  },
];

const createProducts = () => {
  products.map((product) => {
    db.Product.create(product);
  });
};

export default createProducts;
