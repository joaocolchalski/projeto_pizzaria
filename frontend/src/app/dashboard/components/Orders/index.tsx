import styles from './styles.module.scss';
import { TfiReload } from 'react-icons/tfi';
import { OrderProps } from '@/lib/order.type';

interface Props {
    listOrders: OrderProps[];
}

export default function Orders({ listOrders }: Props) {
    return (
        <main className={styles.ordersContainer}>
            <section className={styles.headerContainer}>
                <h1>Últimos Pedidos</h1>
                <button>
                    <TfiReload size={22} color="#3fffa3" />
                </button>
            </section>

            <section className={styles.listOrders}>
                {listOrders.length > 0 ? (
                    listOrders.map((order) => (
                        <button key={order.id} className={styles.orderItem}>
                            <div className={styles.tag}></div>
                            <span>Mesa {order.table}</span>
                        </button>
                    ))
                ) : (
                    <span className={styles.message}>
                        Não há pedidos em aberto!
                    </span>
                )}
            </section>
        </main>
    );
}
