import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { BASE_URL } from '../services/api'

const PickTeam = () => {
  const [myPlayers, setMyPlayers] = useState([])
  let { id } = useParams()

  useEffect(() => {
    const apiCall = async () => {
      let response = await axios.get(`${BASE_URL}users/${id}`)
      setMyPlayers(response.data)
    }
    apiCall()
  }, [])

  return (
    <div>
      <h1>Pick Team</h1>
      <div className="pitch">
        <div className="lines">
          <span className="corner corner-top-left"></span>
          <span className="corner corner-top-right"></span>
          <div className="goalBox"></div>
          <section className="goalie">
            {myPlayers.owner?.map((player) =>
              player.position === 'Goalie' ? (
                <div key={player.id}>
                  <h4 className="goal">{player.name}</h4>
                </div>
              ) : (
                <div></div>
              )
            )}
          </section>
          <section className="defenders">
            {myPlayers.owner?.map((player) =>
              player.position === 'Defender' ? (
                <div key={player.id}>
                  <h4 className="def">{player.name}</h4>
                </div>
              ) : null
            )}
          </section>
          <section className="midfielders">
            {myPlayers.owner?.map((player) =>
              player.position === 'Midfielder' ? (
                <div key={player.id}>
                  <h4 className="mid">{player.name}</h4>
                </div>
              ) : null
            )}
          </section>
          <section className="forwards">
            {myPlayers.owner?.map((player) =>
              player.position === 'Forward' ? (
                <div key={player.id}>
                  <h4 className="for">{player.name}</h4>
                </div>
              ) : null
            )}
          </section>

          <div className="half">
            {/* <!-- the half way point of the pitch is here --> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PickTeam
