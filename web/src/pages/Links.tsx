import styles from './Links.module.css';
import logo from '../assets/Logo.svg';

import { NewLink } from '../components/NewLink';
import { MyLinks } from '../components/MyLinks';

export function Links() {
  return (
    <main className={styles.container}>
      <div className={styles.header}>
        <img src={logo} alt="Logo do Brev.ly" />
      </div>
      <div className={styles.content}>
        <NewLink />
        <MyLinks />
      </div>
    </main>
  )
}