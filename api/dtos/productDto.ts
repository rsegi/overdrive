export default interface ProductDto {
  id: string;
  name: string;
  image: string;
  price: number;
  description: string;
  isSoldOut: boolean;
}

export const getProductDto = (p: any) => {
  const { id, image, name, price, description, amount } = p.dataValues;
  const product: ProductDto = {
    id: id,
    image: image,
    name: name,
    price: price,
    description: description,
    isSoldOut: amount > 0 ? false : true,
  };
  return product;
};
