export interface OrderItemProps {
    id: string;
    amount: number;
    created_at: string;
    order_id: string;
    product_id: string;
    product: {
        id: string;
        name: string;
        price: string;
        description: string;
        banner: string;
        category_id: string;
    };
    order: {
        id: string;
        table: number;
        name: string | null;
        draft: boolean;
        status: boolean;
    };
}
