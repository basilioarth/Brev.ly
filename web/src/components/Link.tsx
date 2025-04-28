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

export function Link({ id, originalUrl, shortenedUrl, accessCount }: LinkProps) {
    const { removeLink } = useLinksStore();

    const handleDeleteLink = async () => {
        try {
            await deleteLink(id);
            removeLink(id);
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
                <h1>brev.ly/{shortenedUrl}</h1>
                <h2>{originalUrl}</h2>
            </div>
            <div className={styles.actions}>
                <p>{accessCount} {accessCount === 1 ? "acesso" : "acessos"}</p>
                <div className={styles.buttonsContainer}>
                    <Button className={styles.actionButton}>
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