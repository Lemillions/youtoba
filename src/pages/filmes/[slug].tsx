import { GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link"
import { api } from "../../services/api";
import styles from "./styles.module.scss"

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

type FilmeProps = {
    filme: Filme;
    listaFilmes: Filme[];
}

export default function filme(props: FilmeProps) {
    const filme = props.filme;
    const listaFilmes = props.listaFilmes;
    return (
        <>
        <div className={styles.videoContainer}>
            <video src={filme.url}  autoPlay controls >
            </video>
            <h1>{filme.titulo}</h1>
            <span> {filme.viewers.toLocaleString("ru")} visualizações - </span>
            <span> {filme.lancamento} </span>
        </div>
        <div className={styles.containerFilmes}>
        {
       listaFilmes.map(filme => {
            return (
            
              <li key={filme.id} className={styles.filmeLista} >
              <Link href={filme.id}>
                <img src={filme.capa} alt={filme.titulo} />
              </Link>
                  <a href={filme.id}>{filme.titulo}</a><br/>
                  <span>{filme.viewers.toLocaleString("ru")} visualizações - </span>
                  <span> {filme.lancamento} </span>
              </li>
            )
          })
        }
        </div>
        </>
    )
}

export const getStaticPaths: GetStaticPaths = async () => {
    const { data } = await api.get('/', {
        params: {
          _sort: 'lancamento',
          _order: 'desc'
        }
    })

    const paths = data.map( filme => {
        return {
            params : {
                slug: filme.id
            }
        }
    })
    return {
        paths,
        fallback: 'blocking'
    }
}

export const getStaticProps: GetStaticProps = async (ctx) => {
    const { slug } = ctx.params;
    const { data } = await api.get('/', {
      params: {
        _sort: 'lancamento',
        _order: 'desc'
      }
    })

      const selecionado = data.find( filme => filme.id === slug );
      const resultado = data.splice(data.indexOf(selecionado), 1)[0];

    const filme = {
    id: resultado.id,
    titulo: resultado.titulo,
    genero: resultado.genero,
    lancamento: resultado.lancamento,
    capa: resultado.capa,
    descricao: resultado.descricao,
    viewers: resultado.viewers,
    url: resultado.file.url,
    duracao: resultado.file.duracao
    }

    const listaFilmes = data.map(filme =>{
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


    return{
        props: {
            filme,
            listaFilmes
        },
        revalidate: 60
    }
}