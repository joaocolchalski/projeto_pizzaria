import styles from '@/app/page.module.scss';
import logoImg from '/public/logo.svg';
import Image from 'next/image';
import Link from 'next/link';
import { api } from '@/services/api';
import { redirect } from 'next/navigation';

export default function Signup() {
    async function handleRegister(formData: FormData) {
        'use server'; //Faz com que essa função se torna um server action

        const name = formData.get('name') as string;
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;

        if (
            name.trim().length === 0 ||
            email.trim().length === 0 ||
            password.trim().length === 0
        ) {
            console.log('Preencha todos os campos!');
            return;
        }

        try {
            await api.post('/users', {
                name,
                email,
                password,
            });
        } catch (err) {
            console.log(err);
        }

        redirect('/');
    }

    return (
        <>
            <div className={styles.containerCenter}>
                <Image
                    className={styles.logo}
                    src={logoImg}
                    alt="Logo da Pizzaria"
                    priority={true}
                    quality={100}
                />

                <section className={styles.login}>
                    <form action={handleRegister}>
                        <input
                            type="text"
                            name="name"
                            required
                            placeholder="Digite seu nome..."
                            className={styles.input}
                        />

                        <input
                            type="email"
                            name="email"
                            required
                            placeholder="Digite seu email..."
                            className={styles.input}
                        />

                        <input
                            type="password"
                            name="password"
                            required
                            placeholder="Digite sua senha..."
                            className={styles.input}
                        />

                        <button type="submit">Cadastrar</button>
                    </form>

                    <Link href="/" className={styles.text}>
                        Já possui uma conta? Faça Login
                    </Link>
                </section>
            </div>
        </>
    );
}
