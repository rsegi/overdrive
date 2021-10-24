import { v4 as uuidv4 } from "uuid";
import db from "../models";

const users = [
  {
    id: uuidv4(),
    name: "Raul",
    lastname: "Segui",
    email: "r@segui.com",
    hashed_password: "ab123",
  },
  {
    id: uuidv4(),
    name: "Jorge",
    lastname: "Peña",
    email: "j@peña.com",
    hashed_password: "ab321",
  },
];

const createUsers = () => {
  users.map((user) => {
    db.User.create(user);
  });
};

export default createUsers;
