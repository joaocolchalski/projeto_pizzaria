import styles from './styles.module.scss';
import { Button } from '../components/Button';
import { api } from '@/services/api';
import { getCookieServer } from '@/lib/cookieServer';

export default function Category() {
    async function handleRegisterCategory(formData: FormData) {
        'use server';

        const name = formData.get('name') as string;

        if (name.trim().length === 0) {
            return;
        }

        try {
            const token = await getCookieServer();
            const data = {
                name,
            };

            await api.post('/category', data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
        } catch (err) {
            return;
        }
    }

    return (
        <main className={styles.categoryContainer}>
            <h1>Nova Categoria</h1>

            <form action={handleRegisterCategory} className={styles.form}>
                <input
                    type="text"
                    name="name"
                    placeholder="Digite o nome da categoria, EX: Pizzas"
                    required
                    className={styles.input}
                />

                <Button name="Cadastrar" />
            </form>
        </main>
    );
}
