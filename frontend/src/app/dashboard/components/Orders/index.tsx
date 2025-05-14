import styles from './styles.module.scss';
import { TfiReload } from 'react-icons/tfi';

export default function Orders() {
    return (
        <main className={styles.ordersContainer}>
            <section className={styles.headerContainer}>
                <h1>Últimos Pedidos</h1>
                <button>
                    <TfiReload size={22} color="#3fffa3" />
                </button>
            </section>

            <section className={styles.listOrders}>
                <button className={styles.orderItem}>
                    <div className={styles.tag}></div>
                    <span>Mesa 10</span>
                </button>

                <button className={styles.orderItem}>
                    <div className={styles.tag}></div>
                    <span>Mesa 13</span>
                </button>
            </section>
        </main>
    );
}
