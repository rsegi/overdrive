import { v4 as uuidv4 } from "uuid";
import { CategoryAttributes } from "../models/category";
import db from "../models";

const categories: CategoryAttributes[] = [
  {
    id: "bf8cd36d-9892-493b-8b91-308d0eaabcc6",
    name: "Guitars",
    image: "img/some.svg",
  },
  {
    id: "9191c817-1319-4f36-893e-188ac7a7550d",
    name: "Pianos",
    image: "img/some2.svg",
  },
  {
    id: "ee1da353-352f-48d1-9549-2d615ac6cb7e",
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
