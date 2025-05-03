import styles from './NotFound.module.css';
import logoPath from "../assets/404.svg";
import { Logo } from '../interfaces/Logo';
import { InfoCard } from '../components/InfoCard';

export function NotFound() {
    const logo: Logo = {
        path: logoPath,
        alt: "NotFound",
        width: '194px',
        height: '85px'
    }

    return (
        <main className={styles.container}>
            <InfoCard
                logo={logo}
                title="Link não encontrado"
            >
                <p>O link que você está tentando acessar não existe, foi removido ou é uma URL inválida. Saiba mais em <a href="/">brev.ly</a>.</p>
            </InfoCard>
        </main>
    );
}