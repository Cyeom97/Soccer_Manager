import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { BASE_URL } from '../services/api'

const Transfer = () => {
  let { id } = useParams()
  const [myPlayers, setMyPlayers] = useState([])
  const [allPlayers, setAllPlayers] = useState([])
  const [form, setForm] = useState({
    userId: parseInt(id),
    playerId: 0,
    newPlayerId: 0
  })
  let playerBudget = 0
  let ownerPlayers = []

  useEffect(() => {
    const apiCall = async () => {
      let response = await axios.get(`${BASE_URL}users/${id}`)
      setMyPlayers(response.data)
    }
    apiCall()
    const playerList = async () => {
      let playerResponse = await axios.get(`${BASE_URL}players`)
      setAllPlayers(playerResponse.data)
    }
    playerList()
  }, [form])

  const playerChange = (e) => {
    setForm({ ...form, [e.target.id]: parseInt(e.target.value) })
  }

  const playerTransfer = async (e) => {
    e.preventDefault()
    let trade = await axios.put(`${BASE_URL}userplayers`, form)
    console.log(trade)
    setForm({ userId: id, playerId: 0, newPlayerId: 0 })
  }

  const getPlayerBudget = () => {
    myPlayers.owner?.map((cash) => {
      playerBudget += parseInt(cash.price)
    })
  }
  getPlayerBudget()

  const pushPlayers = () => {
    myPlayers.owner?.map((grab) => {
      ownerPlayers.push(grab.name)
    })
  }
  pushPlayers()

  let spending = myPlayers.money - playerBudget

  return (
    <div className="profilePage">
      <h1 className="transfer-title">Transfers</h1>
      <h2 className="transfer-title">
        Budget: $
        {myPlayers?.money === null ? (myPlayers.money += 70) : spending}M Left
      </h2>
      <div className="pitch">
        {/* <!-- the grass is green here --> */}
        <div className="lines">
          {/* <!-- the outside lines of the pitch --> */}
          <span className="corner corner-top-left">
            {/* <!-- the top left corner --> */}
          </span>
          <span className="corner corner-top-right">
            {/* <!-- the top right corner --> */}
          </span>
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
                  <h2 className="goal">{player.name}</h2>
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
                  <img
                    className="playerImage"
                    src={player.image}
                    alt="playerimg"
                  ></img>
                  <h2 className="def">{player.name}</h2>
                </div>
              ) : null
            )}
          </section>
          <section className="midfielders">
            {myPlayers.owner?.map((player) =>
              player.position === 'Midfielder' ? (
                <div key={player.id}>
                  <img
                    className="playerImage"
                    src={player.image}
                    alt="player img"
                  ></img>
                  <h2 className="mid">{player.name}</h2>
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
                  <h2 className="for">{player.name}</h2>
                </div>
              ) : null
            )}
          </section>

          <div className="half">
            {/* <!-- the half way point of the pitch is here --> */}
          </div>
        </div>
      </div>
      <form className="box">
        <label htmlFor="currentPlayer"> Transfer Out: </label>
        <select id="playerId" onChange={playerChange}>
          <option>Select Player</option>
          {myPlayers.owner?.map((footy) => (
            <option key={footy.id} value={footy.id}>
              {footy.name} {footy.position}
            </option>
          ))}
        </select>
        <label htmlFor="newPlayer"> Transfer In: </label>
        <select id="newPlayerId" onChange={playerChange}>
          <option>Select Player</option>
          {allPlayers?.map((player) =>
            player.price <= spending && player.name !== ownerPlayers ? (
              <option key={player.id} value={player.id}>
                {player.name} {player.position} ${player.price}{' '}
                {player.selected}% {player.totalPoints}pts
              </option>
            ) : null
          )}
        </select>
        <button className="button" onClick={playerTransfer}>
          Transfer
        </button>
      </form>
    </div>
  )
}

export default Transfer
