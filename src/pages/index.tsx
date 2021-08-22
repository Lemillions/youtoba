import { GetStaticProps } from 'next'
import Link  from 'next/link'
import axios from 'axios'
import styles from './home.module.scss'

type Filme = {
  id: string;
  titulo: string;
  genero: string;
  lancamento: string;
  capa: string;
  descricao: string;
  viewers: number;
  url: string;
  duracao: number;
}

type HomeProps = {
  filmes: Filme[];
}

export default function Home(props: HomeProps) {
  const filmes = props.filmes;

  return (
    <div className={styles.Home}>
      <h1>Ultimos lançamentos</h1>
      <div className={styles.ultimosLancamentos}>
        
        {
          filmes.map(filme => {
            return (
              <li key={filme.id} className={styles.containerFilme} >
              <Link href={'filmes/'+filme.id}>
                <img src={filme.capa} alt={filme.titulo} />
              </Link>
                  <a>{filme.titulo}</a>
              </li>
            )
          })
        }
      </div>
      <h1>Lançamentos Populares</h1>
      <div className={styles.lancamentosPopulares}>
        {
          filmes.map(filme => {
            return (
              <li key={filme.id} className={styles.containerFilme} >
              <Link href={'filmes/'+filme.id}>
                <img src={filme.capa} alt={filme.titulo} />
              </Link>
                  <a>{filme.titulo}</a>
              </li>
            )
          })
        }
      </div>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await axios.get('https://filmes.mvsantos2003.repl.co')


  const filmes = data.map(filme =>{
    return {
      id: filme.id,
      titulo: filme.titulo,
      genero: filme.genero,
      lancamento: filme.lancamento,
      capa: filme.capa,
      descricao: filme.descricao,
      viewers: filme.viewers,
      url: filme.file.url,
      duracao: filme.file.duracao
    }  
  })


  


  return {
    props: {
      filmes
    },
    revalidate: 60
  }
}