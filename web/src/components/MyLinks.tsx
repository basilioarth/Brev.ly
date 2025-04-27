import { Button } from '@chakra-ui/react';
import { DownloadSimple, Link as LinkIcon } from 'phosphor-react';
import { useState } from 'react';
import { Link } from "./Link";

import styles from './MyLinks.module.css';

interface Link {
    originalUrl: string;
    shortenedUrl: string;
    accessCount: number;
}

export function MyLinks() {
    const [linksList, setLinksList] = useState<Link[]>([
        {
            originalUrl: "https://google.com",
            shortenedUrl: "Google",
            accessCount: 0,
        },
        {
            originalUrl: "https://rocketseat.com.br",
            shortenedUrl: "Rocketseat",
            accessCount: 3,
        },
        {
            originalUrl: "https://www.linkedin.com/in/basilioarth/",
            shortenedUrl: "LinkedIn",
            accessCount: 2,
        },
        {
            originalUrl: "https://google.com",
            shortenedUrl: "Google",
            accessCount: 0,
        },
        {
            originalUrl: "https://rocketseat.com.br",
            shortenedUrl: "Rocketseat",
            accessCount: 3,
        },
        {
            originalUrl: "https://www.linkedin.com/in/basilioarth/",
            shortenedUrl: "LinkedIn",
            accessCount: 2,
        },
        {
            originalUrl: "https://google.com",
            shortenedUrl: "Google",
            accessCount: 0,
        },
        {
            originalUrl: "https://rocketseat.com.br",
            shortenedUrl: "Rocketseat",
            accessCount: 3,
        },
        {
            originalUrl: "https://www.linkedin.com/in/basilioarth/",
            shortenedUrl: "LinkedIn",
            accessCount: 2,
        },
        {
            originalUrl: "https://google.com",
            shortenedUrl: "Google",
            accessCount: 0,
        },
        {
            originalUrl: "https://rocketseat.com.br",
            shortenedUrl: "Rocketseat",
            accessCount: 3,
        },
        {
            originalUrl: "https://www.linkedin.com/in/basilioarth/",
            shortenedUrl: "LinkedIn",
            accessCount: 2,
        },
    ]);

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