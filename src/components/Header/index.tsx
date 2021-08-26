import Link from 'next/link';
import { useRouter } from 'next/router'
import styles from './styles.module.scss';
import SideBar from '../SideBar';
import { useState } from "react"

export function Header(){

    const [query, setQuery] = useState("")
    function pesquisar(){
        const pesquisa = query.replaceAll(' ', '+').toLowerCase()
        const pesquisar = `https://youtoba.vercel.app/pesquisar/${pesquisa}`
        window.location.href = pesquisar
        
    }
    return(
        <>
        <header className={styles.header}>
            <SideBar/>
            <Link href="https://youtoba.vercel.app">
                <img src='/youtoba.png' alt='logo' className={styles.logo}/>
            </Link>
            <input type='text' value={query} onChange={(e)=>{setQuery(e.target.value)}}></input>
            <button className={styles.query} onClick={()=>{pesquisar()}}><img src='/lupa.svg'/></button>
        </header>
        </>
    )
}

