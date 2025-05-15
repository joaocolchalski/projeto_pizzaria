'use client';
import { ChangeEvent, useState } from 'react';
import styles from './styles.module.scss';
import { FaCloudUploadAlt } from 'react-icons/fa';
import Image from 'next/image';
import { Button } from '@/app/dashboard/components/Button';
import { api } from '@/services/api';
import { getCookieClient } from '@/lib/cookieClient';
import { toast } from 'sonner';
import { CategoryProps } from '@/lib/category.type';

export function Form({ listCategories }: { listCategories: CategoryProps[] }) {
    const [image, setImage] = useState<File | null>(null);
    const [previewImage, setPreviewImage] = useState<string | null>(null);

    function handleFile(event: ChangeEvent<HTMLInputElement>) {
        if (event.target.files && event.target.files[0]) {
            const image = event.target.files[0];

            if (
                image.type !== 'image/jpeg' &&
                image.type !== 'image/jpg' &&
                image.type !== 'image/png'
            ) {
                toast.warning('Formato de imagem inválido!');
                return;
            }

            setImage(image);
            setPreviewImage(URL.createObjectURL(image));
        }
    }

    async function handleRegisterProduct(formData: FormData) {
        const categoryIndex = formData.get('category');
        const name = formData.get('name') as string;
        const price = formData.get('price') as string;
        const description = formData.get('description') as string;

        if (
            !image ||
            !categoryIndex ||
            name.trim().length === 0 ||
            price.trim().length === 0 ||
            description.trim().length === 0
        ) {
            toast.warning('Preencha todos os campos!');
            return;
        }

        const token = await getCookieClient();
        const data = new FormData();

        data.append('name', name);
        data.append('price', price);
        data.append('description', description);
        data.append('category_id', listCategories[Number(categoryIndex)].id);
        data.append('file', image);

        try {
            await api.post('/product', data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setPreviewImage(null);
            toast.success('Cadastrado com sucesso!');
        } catch (error) {
            toast.error('Erro ao cadastrar o produto!');
        }
    }

    return (
        <main className={styles.formContainer}>
            <h1>Novo Prouto</h1>

            <form action={handleRegisterProduct} className={styles.form}>
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
                    {listCategories.map((category, index) => (
                        <option key={category.id} value={index}>
                            {category.name}
                        </option>
                    ))}
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
