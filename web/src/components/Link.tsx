import { Button } from '@chakra-ui/react';
import { Copy, Trash } from 'phosphor-react';
import { deleteLink } from '../http/services/deleteLink';
import { toaster } from './ui/toaster';
import { useLinksStore } from '../store/linksStore';

import styles from './Link.module.css';

interface LinkProps {
    id: string;
    originalUrl: string;
    shortenedUrl: string;
    accessCount: number;
}

export function Link({ originalUrl, shortenedUrl, accessCount }: LinkProps) {
    const { removeLink } = useLinksStore();

    const handleClickOnShortenedLink = async () => {
        window.open(`${window.location.href}${shortenedUrl}`, '_blank')
    }

    const handleCopyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(`${window.location.href}${shortenedUrl}`);
            toaster.success({
                title: "Link copiado para a área de transferência!",
                type: 'success',
            });
          } catch (err: any) {
            toaster.error({
                title: "Erro ao copiar o link para a área de transferência",
                type: 'error',
            });
          }
    }

    const handleDeleteLink = async () => {
        try {
            await deleteLink(shortenedUrl);
            removeLink(shortenedUrl);
            toaster.success({
                title: "Link deletado com sucesso!",
                type: 'success',
            });
        } catch(error: any){
            toaster.error({
                title: error.message,
                type: 'error',
            });
        }
    }

    return (
        <main className={styles.container}>
            <div className={styles.title}>
                <h1 onClick={handleClickOnShortenedLink}>brev.ly/{shortenedUrl}</h1>
                <h2>{originalUrl}</h2>
            </div>
            <div className={styles.actions}>
                <p>{accessCount} {accessCount === 1 ? "acesso" : "acessos"}</p>
                <div className={styles.buttonsContainer}>
                    <Button className={styles.actionButton} onClick={handleCopyToClipboard}>
                        <Copy className={styles.buttonIcon}/>
                    </Button>
                    <Button className={styles.actionButton} onClick={handleDeleteLink}>
                        <Trash className={styles.buttonIcon}/>
                    </Button>
                </div>
            </div>
        </main>
    )
}