import * as express from "express";
import HttpException from "../exceptions/httpException";
import authMiddleware from "../middleware/authenticationMiddleware";
import { CategoryAttributes } from "../models/category";
import Controller from "./controller";
import db from "../models";
import CategoryDto, { getCategoryDto } from "../dtos/categoryDto";

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
      include: [{ model: db.Product }],
      where: { id: categoryId },
    });

    if (!existingCateogry) {
      next(new HttpException(404, `Category with id ${categoryId} not found`));
    }

    const categoryDto: CategoryDto = getCategoryDto(existingCateogry);
    res.send(categoryDto);
  };

  private getAll = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    let categoriesItems = await this.category.findAll();
    res.header("Access-Control-Allow-Origin", "*");
    const categoriesDto: CategoryDto[] = categoriesItems.map((c: any) => {
      const category: CategoryDto = getCategoryDto(c);

      return category;
    });

    res.send(categoriesDto);
  };
}

export default CategoriesController;
