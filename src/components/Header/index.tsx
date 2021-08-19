import Link from 'next/link';
import styles from './styles.module.scss';
import SideBar from '../SideBar';

export function Header(){
    return(
        <>
        <header className={styles.header}>
            <SideBar/>
            <Link href="https://youtoba.vercel.app">
                <img src='/youtoba.png' alt='logo' className={styles.logo}/>
            </Link>
        </header>
        </>
    )
}

