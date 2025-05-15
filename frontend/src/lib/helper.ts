import { OrderItemProps } from './orderItem.type';

export function calculateTotalOrder(orders: OrderItemProps[]) {
    return orders.reduce((total, item) => {
        const itemTotal = Number(item.product.price) * item.amount;

        return total + itemTotal;
    }, 0);
}
