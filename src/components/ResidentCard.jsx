import axios from "axios"
import {useEffect, useState} from "react"

const ResidentCard = ({url}) => {

    const [character, setCharacter] = useState()

    useEffect(() => {
    axios.get(url)
   .then(res => setCharacter(res.data))
   .catch(err => console.log(err))
    }, [url])

  return (
    <article>
    <header>
        <img src={character?.image} alt="" />
        <div>
        <div className="circle"></div>
        <span>{character?.status}</span>
        </div>
    </header>
    <section>
     <h3>{character?.name}</h3>
     <hr />
     <ul>
        <li><span>Specie</span><span>{character?.species}</span></li>
        <li><span>Origin</span><span>{character?.origin.name}</span></li>
        <li><span>Eppisodes where appear</span><span>{character?.episode.length}</span></li>
     </ul>
    </section>
    </article>
  )
}

export default ResidentCard
