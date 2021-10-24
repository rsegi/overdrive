import { v4 as uuidv4 } from "uuid";
import { CategoryAttributes } from "../models/category";
import db from "../models";

const categories: CategoryAttributes[] = [
  {
    id: uuidv4(),
    name: "Guitars",
    image: "img/some.svg",
  },
  {
    id: uuidv4(),
    name: "Pianos",
    image: "img/some2.svg",
  },
  {
    id: uuidv4(),
    name: "Drums",
    image: "img/some3.svg",
  },
];

const createCategories = () => {
  categories.map((category) => {
    db.Category.create(category);
  });
};

export default createCategories;
