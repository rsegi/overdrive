import * as express from "express";
import HttpException from "../exceptions/httpException";
import authMiddleware from "../middleware/authenticationMiddleware";
import { CategoryAttributes } from "../models/category";
import Controller from "./controller";
import db from "../models";
import CategoryDto from "../dtos/categoryDto";

class CategoriesController implements Controller {
  public path = "/categories";
  public router = express.Router();
  private category = db.Category;

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/:id`, /* authMiddleware, */ this.getOne);
    this.router.get(`${this.path}`, /* authMiddleware, */ this.getAll);
  }

  private getOne = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    const categoryId: string = req.params.id;
    let existingCateogry = await this.category.findOne({
      where: { id: categoryId },
    });

    if (existingCateogry) {
      const categoryDto: CategoryDto = this.getCategoryDto(existingCateogry);
      res.send(categoryDto);
    } else {
      next(new HttpException(404, `Category with id ${categoryId} not found`));
    }
  };

  private getAll = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    let categoriesItems = await this.category.findAll();

    const categoriesDto: CategoryDto[] = categoriesItems.map((c: any) => {
      console.log(c.dataValues);
      const category: CategoryDto = this.getCategoryDto(c);

      return category;
    });

    res.send(categoriesDto);
  };

  private getCategoryDto(c: any) {
    const { id, image, name } = c.dataValues;
    const category: CategoryDto = {
      id: id,
      image: image,
      name: name,
    };
    return category;
  }
}

export default CategoriesController;
