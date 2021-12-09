import './filme-info.css'
import { useParams, useHistory } from 'react-router'
import api from '../../services/api'
import { useEffect, useState } from 'react'
import { toast } from "react-toastify"

export default function Filme(){
    const {id} = useParams()
    const history = useHistory()
    const [filme, setFilme] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(()=>{

      async function loadFilme(){
          const response = await api.get(`r-api/?api=filmes/${id}`)
          if(response.data.length === 0){
            //id nao existe, voltar para a home
            history.replace('/')
            return
          }
          

        setFilme(response.data)  
        setLoading(false)

      }  
      loadFilme()
      return ()=>{
          console.log("desmontado")
      }
    },[history, id])

    function salvaFilme(){
        const minhaLista = localStorage.getItem('filmes')
        let filmesSalvos = JSON.parse(minhaLista) || []
        // se tiver filme salvo com mesmo id, ignorar
        // metodo "some" pecorre o array passado e verifica se
        // existe algum ja salvo 
        const hasFilme = filmesSalvos.some((filmeSalvo)=> filmeSalvo.id === filme.id )
        if(hasFilme){
           toast.error('Você já possui esse filme salvo')
            return
        }
        filmesSalvos.push(filme)
        localStorage.setItem('filmes', JSON.stringify(filmesSalvos))
        toast.success("Filme salvo com sucesso ...")
    }

    if(loading){
        return(
            <div className="filme-info" >
                <h1>carregando seu Filme ...</h1>
            </div>
        )
    }
    return(
        <div className="filme-info">
            <h1>{filme.nome}</h1>
            <img src={filme.foto} alt={filme.nome}/>
            <h3>Sinopse</h3>
            <p>{filme.sinopse}</p>
            

            <div className="botoes">
                <button onClick={salvaFilme} >Salvar</button>
                <button onClick={()=>{}} >
                    <a target="blank" href={`https://www.youtube.com/results?search_query=${filme.nome} Trailer`}>
                        Trailer

                    </a>
                </button>
            </div>
        </div>
    )
}