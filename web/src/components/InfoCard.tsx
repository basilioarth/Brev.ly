import styles from "./InfoCard.module.css";
import { Logo } from "../interfaces/Logo";

interface InfoCardProps {
    logo: Logo;
    title: string;
    children?: React.ReactNode;
}

export function InfoCard({ logo, title, children }: InfoCardProps) {
    return (
        <main className={styles.container}>
            <div className={styles.content}>
                <img src={logo.path} alt={logo.alt} width={logo.width} height={logo.height}/>
                <h1>{title}</h1>
                <div className={styles.text}>
                    {children}
                </div>
            </div>
        </main>
    )
}