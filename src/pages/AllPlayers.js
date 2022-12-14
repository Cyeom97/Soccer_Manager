import { useEffect, useState } from 'react'
import axios from 'axios'
import { BASE_URL } from '../services/api'

const AllPlayers = () => {
  const [players, setPlayers] = useState([])

  useEffect(() => {
    const apiCall = async () => {
      let response = await axios.get(`${BASE_URL}players`)
      setPlayers(response.data)
    }
    apiCall()
  }, [])

  return (
    <div className="homepage">
      <section className="teams">
        {players.map((player) => (
          <div key={player.id}>
            <h2>{player.name}</h2>
            <img src={player.image} alt="player"></img>
          </div>
        ))}
      </section>
    </div>
  )
}

export default AllPlayers
