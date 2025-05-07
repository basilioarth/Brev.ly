import { Button } from '@chakra-ui/react';
import { DownloadSimple, Link as LinkIcon, Spinner } from 'phosphor-react';
import { useEffect, useState } from 'react';
import { Link } from './Link';
import { getAllLinks } from '../http/services/getAllLinks';
import { exportLinks } from '../http/services/exportLinks';
import { toaster } from './ui/toaster';
import { useLinksStore } from '../store/linksStore';

import styles from './MyLinks.module.css';

export function MyLinks() {
    const { linksList, setLinksList } = useLinksStore();
    const [isLoading, setIsLoading] = useState(true);
    const [isDownloading, setIsDownloading] = useState(false);

    async function handleDownloadCSV() {
        setIsDownloading(true);

        const loadingToast = toaster.create({
            title: 'Exportando arquivo CSV...',
            type: 'loading',
        });

        try {
            const response = await exportLinks();

            const link = document.createElement('a');

            link.href = response.reportUrl;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            await new Promise((resolve) => setTimeout(resolve, 1000));
            toaster.dismiss(loadingToast);

            toaster.success({
                title: 'Arquivo exportado com sucesso!',
                type: 'succes',
            });
        } catch (error: any) {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            toaster.dismiss(loadingToast);

            toaster.error({
                title: error.message,
                type: 'error',
            });
        } finally {
            setIsDownloading(false);
        }
    }

    useEffect(() => {
        async function loadAllLinks() {
            setIsLoading(true);

            try {
                const response = await getAllLinks();
                setLinksList(response);
            } catch (error: any) {
                toaster.error({
                    title: error.message,
                    type: 'error',
                });
            }

            setIsLoading(false);
        }

        loadAllLinks();
    }, []);

    return (
        <main className={styles.container}>
            <header>
                <h1>Meus links</h1>
                <Button 
                    className={styles.downloadButton} 
                    disabled={linksList?.length === 0 || isLoading || isDownloading}
                    onClick={handleDownloadCSV}
                >
                    <DownloadSimple className={styles.downloadIcon} /> Baixar CSV
                </Button>
            </header>
            {isLoading ? (
                <div className={styles.notfoundContent}>
                    <Spinner className={styles.linkIcon} />
                    <p>Carregando...</p>
                </div>
            ) : linksList.length === 0 ? (
                <div className={styles.notfoundContent}>
                    <LinkIcon className={styles.linkIcon} />
                    <p>Ainda não existem links cadastrados</p>
                </div>
            ) : (
                <div className={styles.content}>
                    {linksList.map((link) => (
                        <Link
                            key={link.id}
                            id={link.id}
                            originalUrl={link.originalUrl}
                            shortenedUrl={link.shortenedUrl}
                            accessCount={link.accessCount}
                        />
                    ))}
                </div>
            )}
        </main>
    );
}