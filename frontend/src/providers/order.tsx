'use client';

import { createContext, ReactNode, useState } from 'react';
import { api } from '@/services/api';
import { getCookieClient } from '@/lib/cookieClient';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { OrderItemProps } from '@/lib/orderItem.type';

type OrderContextData = {
    isOpen: boolean;
    onRequestOpen: (order_id: string) => Promise<void>;
    onRequestClose: () => void;
    order: OrderItemProps[];
    finishOrder: (order_id: string) => Promise<void>;
};

type OrderProviderProps = {
    children: ReactNode;
};

export const OrderContext = createContext({} as OrderContextData);

export function OrderProvider({ children }: OrderProviderProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [order, setOrder] = useState<OrderItemProps[]>([]);

    const router = useRouter();

    async function onRequestOpen(order_id: string) {
        try {
            const token = await getCookieClient();

            const response = await api.get<OrderItemProps[]>('/order/detail', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                params: {
                    order_id,
                },
            });

            setOrder(response.data);
            setIsOpen(true);
        } catch (error) {
            setIsOpen(false);
        }
    }

    function onRequestClose() {
        setIsOpen(false);
    }

    async function finishOrder(order_id: string) {
        try {
            const token = await getCookieClient();

            const data = {
                order_id,
            };

            await api.put('/order/finish', data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setIsOpen(false);
            router.refresh(); //Atualiza a página
            toast.success('Pedido concluído com sucesso!');
        } catch (error) {
            setIsOpen(true);
            toast.error('Erro ao concluir o pedido!');
        }
    }

    return (
        <OrderContext.Provider
            value={{
                isOpen,
                onRequestOpen,
                onRequestClose,
                order,
                finishOrder,
            }}
        >
            {children}
        </OrderContext.Provider>
    );
}
