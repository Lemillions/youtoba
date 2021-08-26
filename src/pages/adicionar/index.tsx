import axios from "axios";
import React, { useState } from "react"
import styles from './styles.module.scss'
import {Helmet} from "react-helmet"

export default function adicionar(){
    interface Filme {
        id: string
        titulo: string
        genero: string
        lancamento: string
        capa: string
        descricao: string
        viewers: number
        url: string
        tipo: string 
        duracao: number           
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
    const [formPreenchido, setFormPreenchido] = useState(true)
    const handleForm = (e) =>{
            setNovoFilme({
                ...novoFilme,
                [e.target.name]: e.target.value
            });
    }

    const adicionarNovoFilme = (novoFilme:Filme) =>{
        const data = {
            id:novoFilme.id,
            titulo:novoFilme.titulo,
            genero:novoFilme.genero,
            lancamento:novoFilme.lancamento,
            capa:novoFilme.capa,
            descricao:novoFilme.descricao,
            viewers:novoFilme.viewers,
            file:{
                url: novoFilme.url,
                tipo:novoFilme.tipo,
                duracao: novoFilme.duracao
        }
        }
        if(data.id == '' || data.titulo == '' || data.genero == '' || data.lancamento == '' || data.capa == '' || data.descricao == '' || data.file.url == '' || data.file.tipo == '' || data.file.duracao == 0){
            setFormPreenchido(false)
        }else {
            setFormPreenchido(true)
            axios.post('https://filmes.mvsantos2003.repl.co', data)
            .then(function (response) {
            console.log(response)
          })
          .catch(function (error) {
            console.log(error)
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
        }
    }
    return (
    <div className={styles.adicionarContainer}>
        <Helmet>
            <title>Adicionar - YouToba</title>
        </Helmet>
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
        <button onClick={()=>adicionarNovoFilme(novoFilme)}>ADICIONAR</button><br/>
        {!formPreenchido? <div className={styles.avisoForm}>Não foi possivel adicionar o filme, verifique se todos os dados estao preenchido corretamente</div> : ''}
    </div>
    )
}