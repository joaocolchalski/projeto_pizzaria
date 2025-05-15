import Orders from './components/Orders';
import { api } from '@/services/api';
import { getCookieServer } from '@/lib/cookieServer';
import { OrderProps } from '@/lib/order.type';

async function getOrders() {
    try {
        const token = await getCookieServer();

        const response = await api.get<OrderProps[]>('/order', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data || [];
    } catch (err) {
        return [];
    }
}

export default async function Dashboard() {
    const listOrders = await getOrders();

    return (
        <>
            <Orders listOrders={listOrders} />
        </>
    );
}
