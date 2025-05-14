'use client';
import { ChangeEvent, useState } from 'react';
import styles from './styles.module.scss';
import { FaCloudUploadAlt } from 'react-icons/fa';
import Image from 'next/image';
import { Button } from '@/app/dashboard/components/Button';

export function Form() {
    const [image, setImage] = useState<File>();
    const [previewImage, setPreviewImage] = useState<string | null>(null);

    function handleFile(event: ChangeEvent<HTMLInputElement>) {
        if (event.target.files && event.target.files[0]) {
            const image = event.target.files[0];

            if (
                image.type !== 'image/jpeg' &&
                image.type !== 'image/jpg' &&
                image.type !== 'image/png'
            ) {
                console.log('Formato de imagem inválido!');
                return;
            }

            setImage(image);
            setPreviewImage(URL.createObjectURL(image));
        }
    }

    return (
        <main className={styles.formContainer}>
            <h1>Novo Prouto</h1>

            <form action="" className={styles.form}>
                <label className={styles.labelImage}>
                    <span>
                        <FaCloudUploadAlt size={30} color="#8a8a8a" />
                    </span>

                    <input
                        type="file"
                        accept="image/png, image/jpeg, image/jpg"
                        required
                        onChange={handleFile}
                    />

                    {previewImage && (
                        <Image
                            alt="Imagem de Preview do Produto"
                            src={previewImage}
                            className={styles.imagePreview}
                            fill={true}
                            quality={100}
                            priority={true}
                        />
                    )}
                </label>

                <select name="category">
                    <option key={1} value={1}>
                        Pizzas
                    </option>
                    <option key={2} value={2}>
                        Massas
                    </option>
                </select>

                <input
                    type="text"
                    name="name"
                    placeholder="Nome do produto"
                    required
                    className={styles.input}
                />

                <input
                    type="text"
                    name="price"
                    placeholder="Valor"
                    required
                    className={styles.input}
                />

                <textarea
                    name="description"
                    className={styles.input}
                    placeholder="Descrição do Produto"
                    required
                ></textarea>

                <Button name="Cadastrar" />
            </form>
        </main>
    );
}
