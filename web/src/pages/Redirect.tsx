import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getOriginalLinkByShortenedLink } from "../http/services/getOriginalLinkByShortenedLink";
import { InfoCard } from "../components/InfoCard";
import { Logo } from "../interfaces/Logo";
import { incrementLinkAccessCount as incrementLinkAccessCountService } from "../http/services/incrementLinkAccessCount";
import { useLinksStore } from "../store/linksStore";
import styles from "./Redirect.module.css";
import logoPath from "../assets/Logo_Icon.svg";

export function Redirect() {
    const [isLoading, setIsLoading] = useState(true);
    const [originalLink, setOriginalLink] = useState('');
    const { incrementLinkAccessCount } = useLinksStore();

    const location = useLocation();
    const navigate = useNavigate();
    const shortenedUrl = location.pathname.split("/")[1] || "";
    const logo: Logo = {
        path: logoPath,
        alt: "Logo do Brev.ly",
        width: '48px',
        height: '48px'
    }

    useEffect(() => {
        async function loadOriginalLink() {
            setIsLoading(true);

            try {
                const response = await getOriginalLinkByShortenedLink(shortenedUrl);

                await incrementLinkAccessCountService(shortenedUrl);

                incrementLinkAccessCount(shortenedUrl);

                setOriginalLink(response.originalUrl);
            } catch (error: any) {
                navigate('/not-found');
            }

            setIsLoading(false);
        }

        loadOriginalLink();
    }, []);

    useEffect(() => {
        if (originalLink) {
            const timer = setTimeout(() => {
                window.location.replace(originalLink);
            }, 1000);

            return () => clearTimeout(timer);
        }
    }, [originalLink]);

    return (
        <main className={styles.container}>
            <InfoCard
                logo={logo}
                title="Redirecionando..."
            >
                <p>O link será aberto automaticamente em alguns instantes.</p>
                {!isLoading && <p>Não foi redirecionado? <a href={originalLink} target="_self">Acesse aqui</a></p>}
            </InfoCard>
        </main>
    )
}