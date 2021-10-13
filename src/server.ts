import express, { Request, Response } from "express";
import db from "../models";
import { users } from "../seeders/users";

const app = express();
const port = process.env.PORT || 9000;

const createUsers = () => {
  users.map((user) => {
    db.User.create(user);
  });
};

createUsers();

db.sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`server is running on port ${port}`);
  });
});

app.get("/", (req: Request, res: Response) => {
  return res.send("hello world");
});
