import { Button } from '@chakra-ui/react';
import { DownloadSimple, Link as LinkIcon } from 'phosphor-react';
import { useState } from 'react';
import { Link as LinkType } from '../interfaces/Link';
import { Link } from "./Link";

import styles from './MyLinks.module.css';

export function MyLinks() {
    const [linksList, setLinksList] = useState<LinkType[]>([]);

    return (
        <main className={styles.container}>
            <header>
                <h1>Meus links</h1>
                <Button className={styles.downloadButton} disabled={linksList.length === 0}>
                    <DownloadSimple className={styles.downloadIcon}/> Baixar CSV
                </Button>
            </header>
            {
                linksList.length === 0 ?
                (
                    <div className={styles.notfoundContent}>
                        <LinkIcon className={styles.linkIcon} />
                        <p>Ainda não existem links cadastrados</p>
                    </div>
                )
                :
                (
                    <div className={styles.content}>
                        {
                            linksList.map(link => {
                                return <Link 
                                            originalUrl={link.originalUrl}
                                            shortenedUrl={link.shortenedUrl}
                                            accessCount={link.accessCount}
                                        />
                            })
                        }
                    </div>
                )
            }
        </main>
    )
}