import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { BASE_URL } from '../services/api'

const Profile = ({ user, authenticated }) => {
  let { id } = useParams()
  const [players, setPlayers] = useState([])
  const [myPlayers, setMyPlayers] = useState([])
  const [form, setForm] = useState({
    userId: parseInt(id),
    playerId: 0
  })

  let myPoints = 0

  useEffect(() => {
    const handleUser = async () => {
      let getPlayers = await axios.get(`${BASE_URL}players`)
      setPlayers(getPlayers.data)
    }
    handleUser()
    const getUserPlayer = async () => {
      let user = await axios.get(`${BASE_URL}users/${id}`)
      setMyPlayers(user.data)
    }
    getUserPlayer()
  }, [form])

  const playerChange = (e) => {
    setForm({ ...form, [e.target.id]: parseInt(e.target.value) })
  }

  const playerAdd = async (e) => {
    e.preventDefault()
    let newPlayer = await axios.post(`${BASE_URL}users`, form)
    setForm({ userId: id, playerId: 0 })
  }

  const addPoints = () => {
    myPlayers.owner?.map((points) => {
      myPoints += parseInt(points.totalPoints)
    })
  }
  addPoints()

  return user && authenticated ? (
    <div className="profilePage">
      <div className="pitch">
        <div className="lines">
          <span className="corner corner-top-left"></span>
          <span className="corner corner-top-right"></span>
          <div className="goalBox"></div>
          <section className="goalie">
            {myPlayers.owner?.map((player) =>
              player.position === 'Goalie' ? (
                <div key={player.id}>
                  <img
                    className="playerImage"
                    src={player.image}
                    alt="player img"
                  ></img>
                  <h4 className="goal">{player.name}</h4>
                </div>
              ) : null
            )}
          </section>
          <section className="defenders">
            {myPlayers.owner?.map((player) =>
              player.position === 'Defender' ? (
                <div key={player.id} className="playerCard">
                  <img
                    className="playerImage"
                    src={player.image}
                    alt="plyer img"
                  ></img>
                  <h4 className="def">{player.name}</h4>
                </div>
              ) : null
            )}
          </section>
          <section className="midfielders">
            {myPlayers.owner?.map((player) =>
              player.position === 'Midfielder' ? (
                <div key={player.id} className="playerCard">
                  <img
                    className="playerImage"
                    src={player.image}
                    alt="player img"
                  ></img>
                  <h4 className="mid">{player.name}</h4>
                </div>
              ) : null
            )}
          </section>
          <section className="forwards">
            {myPlayers.owner?.map((player) =>
              player.position === 'Forward' ? (
                <div key={player.id}>
                  <img
                    className="playerImage"
                    src={player.image}
                    alt="player img"
                  ></img>
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
      {myPlayers.owner?.length < 11 ? (
        <div className="createTeam">
          <h1>Create team</h1>
          <form>
            <label htmlFor="playerId">Player ID: </label>
            <select id="playerId" onChange={playerChange}>
              <option>Select Player</option>
              {players?.map((player) => (
                <option value={player.id}>
                  {player.name} {player.position}
                </option>
              ))}
            </select>
            <button onClick={playerAdd}>Add Player</button>
          </form>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  ) : (
    <div>
      <h3>Please Sign In</h3>
    </div>
  )
}

export default Profile
