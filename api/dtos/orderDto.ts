import ProductDto, { getProductDto } from "./productDto";

export default interface OrderDto {
  id: number;
  orderDate: Date;
  orderStatus: string;
  orderItems: ProductDto[];
}

export const getOrderDto = (order: any): OrderDto => {
  const { id, orderDate, orderStatus, orderItems } = order.dataValues;

  const orderProducts: ProductDto[] = orderItems.map((item: any) => {
    const product = getProductDto(item);

    return product;
  });

  const orderDto: OrderDto = {
    id,
    orderDate,
    orderStatus,
    orderItems: orderProducts,
  };

  return orderDto;
};
