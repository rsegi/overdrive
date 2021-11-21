export default interface ProductDto {
  id: string;
  name: string;
  image: string;
  price: number;
  description: string;
}

export const getProductDto = (p: any) => {
  const { id, image, name, price, description } = p.dataValues;
  const product: ProductDto = {
    id: id,
    image: image,
    name: name,
    price: price,
    description: description,
  };
  return product;
};
