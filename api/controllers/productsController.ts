import * as express from "express";
import Controller from "./controller";
import db from "../models";
import HttpException from "../exceptions/httpException";
import ProductDto, { getProductDto } from "../dtos/productDto";

class ProductsController implements Controller {
  public path = "/products";
  public router = express.Router();
  private product = db.Product;

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/:id`, this.getProductById);
    //this.router.put(`${this.path}/:id`, this.updateProduct);
    //this.router.delete(`${this.path}/:id`, this.deleteProduct);
  }

  private getProductById = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    const productId = req.params.id;
    let existingProduct = await this.product.findOne({
      where: { id: productId },
    });

    if (!existingProduct) {
      next(new HttpException(404, `Product with id ${productId} not found`));
    }

    const productDto: ProductDto = getProductDto(existingProduct);
    res.send(productDto);
  };
}

export default ProductsController;
