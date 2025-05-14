import Image from 'next/image';
import styles from './page.module.scss';
import logoImg from '/public/logo.svg';
import Link from 'next/link';
import { api } from '@/services/api';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

interface LoginProps {
    id: string;
    name: string;
    email: string;
    token: string;
}

export default function Home() {
    async function handleLogin(formData: FormData) {
        'use server';

        const email = formData.get('email') as string;
        const password = formData.get('password') as string;

        if (email.trim().length === 0 || password.trim().length === 0) {
            console.log('Preencha todos os campos!');
            return;
        }

        try {
            const response = await api.post<LoginProps>('/session', {
                email,
                password,
            });

            if (!response.data.token) {
                return;
            }

            console.log(response.data);

            const quantidadeDias = 30;
            const expressTime = 60 * 60 * 24 * quantidadeDias;
            const cookieStore = await cookies();

            cookieStore.set('session', response.data.token, {
                maxAge: expressTime,
                path: '/',
                httpOnly: false,
                secure: process.env.NODE_ENV === 'production',
            });
        } catch (err) {
            console.log(err);
        }

        redirect('/dashboard');
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
                    <form action={handleLogin}>
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

                        <button type="submit">Acessar</button>
                    </form>

                    <Link href="/signup" className={styles.text}>
                        Não possui uma conta? Cadastre-se
                    </Link>
                </section>
            </div>
        </>
    );
}
