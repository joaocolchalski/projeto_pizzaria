import type { Metadata } from 'next';
import './globals.scss';
import { Toaster } from 'sonner';

export const metadata: Metadata = {
    title: 'Sujeito Pizza - A Melhor Pizzaria',
    description: 'A melhor pizzaria do Brasil!',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="pt-BR">
            <body>
                <Toaster position="top-right" richColors />
                {children}
            </body>
        </html>
    );
}
