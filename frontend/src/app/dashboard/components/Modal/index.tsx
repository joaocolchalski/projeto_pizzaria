'use client';
import styles from './styles.module.scss';
import { IoMdClose } from 'react-icons/io';
import { use } from 'react';
import { OrderContext } from '@/providers/order';
import { calculateTotalOrder } from '@/lib/helper';

export default function Modal() {
    const { onRequestClose, order, finishOrder } = use(OrderContext);

    const total = calculateTotalOrder(order);

    function handleFinishOrder() {
        finishOrder(order[0].order_id);
    }

    return (
        <dialog className={styles.modalContainer}>
            <section className={styles.modalContent}>
                <button onClick={onRequestClose} className={styles.closeModal}>
                    <IoMdClose size={40} color="#ff3f4b" />
                </button>

                <article className={styles.container}>
                    <h2>Detalhes do Pedido</h2>

                    <span className={styles.table}>
                        Mesa: <b>{order[0].order.table}</b>
                    </span>

                    {order.map((order) => (
                        <section key={order.id} className={styles.product}>
                            <span className={styles.nameProduct}>
                                <span className={styles.amount}>
                                    {order.amount} -
                                </span>
                                <span className={styles.name}>
                                    {order.product.name}
                                </span>
                                <span className={styles.valor}>
                                    - R$
                                    {(
                                        order.amount *
                                        Number(order.product.price)
                                    ).toFixed(2)}
                                </span>
                            </span>
                            <span className={styles.descriptionProduct}>
                                {order.product.description}
                            </span>
                        </section>
                    ))}

                    <span className={styles.total}>
                        Valor total: R${total.toFixed(2)}
                    </span>

                    <button
                        className={styles.buttonOrder}
                        onClick={handleFinishOrder}
                    >
                        Concluir Pedido
                    </button>
                </article>
            </section>
        </dialog>
    );
}
