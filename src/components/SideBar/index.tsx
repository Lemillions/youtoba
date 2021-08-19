import styles from './styles.module.scss';
import { useState } from "react"


export default function sideBar(){
    const [showMenu, setShowMenu] = useState(false)

    const toogleSideBar = () => {
        setShowMenu(!showMenu)
    }
    return(
        <div>
        <button className={styles.botao} onClick={()=>{toogleSideBar()}}>
            <img src='/menu.svg'/>
        </button>
        <div className={showMenu? styles.nav : styles.none}>
        <ul className={styles.SideBar}>
            <li>
                <button className={styles.botao} onClick={()=>{toogleSideBar()}}>
                <img src='/iconExcluir.png'/>
            </button></li>

            <li><a href="https://youtoba.vercel.app/adicionar" className={styles.menuItem}>
                ADICIONAR
            </a></li>

            <li><a href="https://github.com/Lemillions" target="_blank" className={styles.menuItem}>
                PORTFOLIOS
            </a></li>  
        </ul>
        </div>
        <div className={showMenu ? styles.corpoSideBar : styles.none} onClick={()=>{toogleSideBar()}}>
        </div>
        </div>
    )
}

function abrirSideBar() {
    throw new Error('Function not implemented.');
}
function fecharSideBar() {
    throw new Error('Function not implemented.');
}

