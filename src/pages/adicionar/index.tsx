import axios from "axios";
import { useState } from "react"
import styles from './styles.module.scss';

export default function adicionar(){
    interface Filme {
        id: string
        titulo: String
        genero: String
        lancamento: String
        capa: String
        descricao: String
        viewers: Number
        url: String
        tipo: String 
        duracao: Number           
    }
    const [novoFilme, setNovoFilme] = useState({
        id:"",
        titulo:"",
        genero:"",
        lancamento:"",
        capa:"",
        descricao:"",
        viewers:0,
        url: '',
        tipo: '',
        duracao: 0,
    })

    const handleForm = (e) =>{
            setNovoFilme({
                ...novoFilme,
                [e.target.name]: e.target.value
            });
    }

    const adicionarNovoFilme = (novoFilme: Filme) =>{
        const data = {
            id:novoFilme.id,
            titulo:novoFilme.titulo,
            genero:novoFilme.genero,
            lancamento:novoFilme.lancamento,
            capa:novoFilme.capa,
            descricao:novoFilme.descricao,
            viewers:novoFilme.viewers,
            file:{
                url:novoFilme.url,
                tipo:novoFilme.tipo,
                duracao:novoFilme.duracao
        }
        }
        axios.post('https://filmes.mvsantos2003.repl.co', data)
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });

          setNovoFilme({
            id:"",
            titulo:"",
            genero:"",
            lancamento:"",
            capa:"",
            descricao:"",
            viewers:0,
            url: '',
            tipo: '',
            duracao: 0,
        })
        window.alert('Filme Adicionado com Sucesso. ps: esta aparecendo aqui por que to com preguiça de fazer um alerta :P')
    }
    return (
    <div  className={styles.adicionarContainer}>
        <h1>YOUTUBA</h1>
        <input type="text" value={novoFilme.id} onChange={(e)=>{handleForm(e)}} name="id" placeholder="ID" /><br/>
        <input type="text" value={novoFilme.titulo}  onChange={(e)=>{handleForm(e)}} name="titulo" placeholder="Titulo do Filme"/><br/>
        <input type="text" value={novoFilme.genero}  onChange={(e)=>{handleForm(e)}} name="genero" placeholder="Genero/Genero"/><br/>
        <input type="date" value={novoFilme.lancamento} onChange={(e)=>{handleForm(e)}} name="lancamento"/><br/>
        <input type="text" value={novoFilme.capa} onChange={(e)=>{handleForm(e)}} name="capa" placeholder="Link da Capa"/><br/>
        <input type="text" value={novoFilme.descricao} onChange={(e)=>{handleForm(e)}} name="descricao" placeholder="Descrição do Filme"/><br/>
        <input type="text" value={novoFilme.viewers} pattern="[0-9]" onChange={(e)=>{handleForm(e)}} name="viewers" placeholder="Visualizações"/><br/>
        <input type="text" value={novoFilme.url}  onChange={(e)=>{handleForm(e)}} name="url" placeholder="URL do Video"/><br/>
        <input type="text" value={novoFilme.tipo} onChange={(e)=>{handleForm(e)}} name="tipo" placeholder="video/Tipo"/><br/>
        <input type="text" value={novoFilme.duracao} pattern="[0-9]" onChange={(e)=>{handleForm(e)}} name="duracao" placeholder="Duração do Filme em Segundos"/><br/>
        <button onClick={()=>adicionarNovoFilme(novoFilme)}>ADICIONAR</button>
    </div>
    )
}