import styles from '@/app/page.module.scss';
import logoImg from '/public/logo.svg';
import Image from 'next/image';
import Link from 'next/link';

export default function Signup() {
    async function handleRegister(formData: FormData) {
        'user server';

        const name = formData.get('name');
        const email = formData.get('email');
        const password = formData.get('password');

        console.log(name);
    }

    return (
        <>
            <div className={styles.containerCenter}>
                <Image
                    className={styles.logo}
                    src={logoImg}
                    alt="Logo da Pizzaria"
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
