import ProductDto, { getProductDto } from "./productDto";

export default interface CategoryDto {
  id: string;
  name: string;
  image: string;
  products: ProductDto[];
}

export const getCategoryDto = (c: any) => {
  const { id, image, name, Products } = c.dataValues;

  const products: ProductDto[] = Products.map((p: any) => {
    const product = getProductDto(p);

    return product;
  });

  const category: CategoryDto = {
    id: id,
    image: image,
    name: name,
    products: products,
  };
  return category;
};
