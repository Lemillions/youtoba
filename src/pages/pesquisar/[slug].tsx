import { GetStaticProps, GetStaticPaths  } from "next";
import styles from './styles.module.scss'
import axios from "axios";
import Link from "next/link";

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
  
  type Filmes = {
    filmes: Filme[];
  }

  export default function pesquisar(props: Filmes) {

    const filmes = props.filmes;
    
    filmes.sort(function (a, b) {
      if (a.lancamento < b.lancamento) {
        return 1;
      }
      if (a.lancamento > b.lancamento) {
        return -1;
      }
      return 0;
    });
    
    return (
      <div className={styles.pesquisa}>
        <h1>Resultados da pesquisa : </h1>
        <div className={styles.listaPesquisa}>
          {
            filmes.map(filme => {
              return (
                <li key={filme.id} className={styles.containerFilme} >
                <Link href={'https://youtoba.vercel.app/filmes/'+filme.id}>
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

export const getStaticPaths: GetStaticPaths = async () => {
      const paths = []
      return {
          paths,
          fallback: 'blocking'
      }
  }

  
export const getStaticProps: GetStaticProps = async (ctx) => {
    const { slug } = ctx.params;
    const { data } = await axios.get(`https://filmes.mvsantos2003.repl.co/Filmes/${slug}`)
    const filmes = data

    return{
        props: {
            filmes
        },
        revalidate: 60
    }
}