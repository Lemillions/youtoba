import Link from 'next/link';
import styles from './styles.module.scss';

export function Header(){
    return(
        <header className={styles.header}>
            <Link href="../">
            <img src='/youtoba.png' alt='logo'/>
            </Link>
            <Link href="../adicionar">
            <a>ADICIONAR</a>
            </Link>
        </header>
    )
}