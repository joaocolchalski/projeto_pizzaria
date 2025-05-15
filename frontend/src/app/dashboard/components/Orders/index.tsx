'use client';
import styles from './styles.module.scss';
import { TfiReload } from 'react-icons/tfi';
import { OrderProps } from '@/lib/order.type';
import Modal from '../Modal';
import { use } from 'react';
import { OrderContext } from '@/providers/order';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

interface Props {
    listOrders: OrderProps[];
}

export default function Orders({ listOrders }: Props) {
    const router = useRouter();

    const { isOpen, onRequestOpen } = use(OrderContext);

    async function handleDetailOrder(order_id: string) {
        await onRequestOpen(order_id);
    }

    function handleRefreshList() {
        router.refresh();
        toast.success('Pedidos atualizados com sucesso!');
    }

    return (
        <>
            <main className={styles.ordersContainer}>
                <section className={styles.headerContainer}>
                    <h1>Últimos Pedidos</h1>
                    <button onClick={handleRefreshList}>
                        <TfiReload size={22} color="#3fffa3" />
                    </button>
                </section>

                <section className={styles.listOrders}>
                    {listOrders.length > 0 ? (
                        listOrders.map((order) => (
                            <button
                                onClick={() => handleDetailOrder(order.id)}
                                key={order.id}
                                className={styles.orderItem}
                            >
                                <div className={styles.tag}></div>
                                <span>Mesa {order.table}</span>
                            </button>
                        ))
                    ) : (
                        <span className={styles.emptyListMessage}>
                            Não há pedidos em aberto!
                        </span>
                    )}
                </section>
            </main>
            {isOpen && <Modal />}
        </>
    );
}
