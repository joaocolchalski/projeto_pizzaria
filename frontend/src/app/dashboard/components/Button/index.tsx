'use client';

import styles from './styles.module.scss';
import { useFormStatus } from 'react-dom';
import { Loader } from '@/app/components/Loader';

interface ButtonProps {
    name: string;
}

export function Button({ name }: ButtonProps) {
    const { pending } = useFormStatus();

    return (
        <button type="submit" className={styles.button}>
            {pending ? <Loader /> : name}
        </button>
    );
}
