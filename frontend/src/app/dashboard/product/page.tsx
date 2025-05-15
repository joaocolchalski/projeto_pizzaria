import { Form } from './components/Form';
import { api } from '@/services/api';
import { getCookieServer } from '@/lib/cookieServer';
import { CategoryProps } from '@/lib/category.type';

export default async function Product() {
    const token = await getCookieServer();

    const response = await api.get<CategoryProps[]>('/category', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return <Form listCategories={response.data} />;
}
