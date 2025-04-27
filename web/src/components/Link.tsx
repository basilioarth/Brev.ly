import { Button } from '@chakra-ui/react';
import { Copy, Trash } from 'phosphor-react';

import styles from './Link.module.css';

interface LinkProps {
    originalUrl: string;
    shortenedUrl: string;
    accessCount: number;
}

export function Link({ originalUrl, shortenedUrl, accessCount }: LinkProps) {
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
                    <Button className={styles.actionButton}>
                        <Trash className={styles.buttonIcon}/>
                    </Button>
                </div>
            </div>
        </main>
    )
}