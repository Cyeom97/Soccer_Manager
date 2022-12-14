import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { BASE_URL } from '../services/api'

const Admin = ({ user, authenticated }) => {
  let navigate = useNavigate()
  const [players, setPlayers] = useState([])
  const [teams, setTeam] = useState([])
  const [teamForm, setTeamForm] = useState({
    name: '',
    schedule: '',
    scores: '',
    points: '',
    image: ''
  })
  const [playerForm, setPlayerForm] = useState({
    name: '',
    position: '',
    currentGoals: '',
    currentAssists: '',
    currentCleansheet: '',
    statGoals: '',
    statAssists: '',
    totalCleansheets: '',
    clubId: '',
    image: '',
    price: '',
    selected: '',
    totalPoints: ''
  })

  useEffect(() => {
    const handleAdmin = async () => {
      let allPlayers = await axios.get(`${BASE_URL}players`)
      let allTeams = await axios.get(`${BASE_URL}teams`)
      setPlayers(allPlayers.data)
      setTeam(allTeams.data)
    }
    handleAdmin()
  }, [])

  const teamChange = (e) => {
    setTeamForm({ ...teamForm, [e.target.id]: e.target.value })
  }

  const playerChange = (e) => {
    setPlayerForm({ ...playerForm, [e.target.id]: e.target.value })
  }

  const teamSubmit = async (e) => {
    e.preventDefault()
    let newTeam = await axios.post(`${BASE_URL}teams`, teamForm)
    setTeam([...teams, newTeam.data])
    setTeamForm({ name: '', schedule: '', scores: '', points: '', image: '' })
  }

  const playerSubmit = async (e) => {
    e.preventDefault()
    let newPlayer = await axios.post(`${BASE_URL}players`, playerForm)
    setPlayerForm([...players, newPlayer.data])
    setPlayerForm({
      name: '',
      position: '',
      currentGoals: '',
      currentAssists: '',
      currentCleansheet: '',
      statGoals: '',
      statAssists: '',
      totalCleansheets: '',
      clubId: '',
      image: '',
      price: '',
      selected: '',
      totalPoints: ''
    })
  }

  const viewTeam = (id) => {
    navigate(`team/${id}`)
  }

  const viewPlayer = (id) => {
    navigate(`player/${id}`)
  }

  return user.email === 'chrisyeom@gmail.com' && authenticated ? (
    <div>
      <h1>All Teams</h1>
      <h2>Add new team:</h2>
      <form onSubmit={teamSubmit}>
        <label htmlFor="name">Name: </label>
        <input id="name" value={teamForm.name} onChange={teamChange}></input>
        <label htmlFor="schedule">Schedule: </label>
        <input
          id="schedule"
          value={teamForm.schedule}
          onChange={teamChange}
        ></input>
        <label htmlFor="scores">Scores: </label>
        <input
          id="scores"
          value={teamForm.scores}
          onChange={teamChange}
        ></input>
        <label htmlFor="points">points: </label>
        <input
          id="points"
          type="number"
          value={teamForm.points}
          onChange={teamChange}
        ></input>
        <label htmlFor="image">image: </label>
        <input id="image" value={teamForm.image} onChange={teamChange}></input>
        <button type="submit">Add Team</button>
      </form>
      <section className="teamList">
        {teams?.map((team) => (
          <div key={team.id}>
            <div>{team.name}</div>
            <img
              src={team.image}
              alt="Team"
              onClick={() => {
                viewTeam(team.id)
              }}
            ></img>
            <div>Next Game: {team.schedule}</div>
            <div>Last Game: {team.scores}</div>
            <div>Current Points: {team.points}</div>
          </div>
        ))}
      </section>
      <form onSubmit={playerSubmit}>
        <label htmlFor="name"> Name: </label>
        <input
          id="name"
          value={playerForm.name}
          onChange={playerChange}
        ></input>
        <label htmlFor="position"> Position: </label>
        <input
          id="position"
          value={playerForm.position}
          onChange={playerChange}
        ></input>
        <label htmlFor="currentGoals"> currentGoals: </label>
        <input
          id="currentGoals"
          type="number"
          value={playerForm.currentGoals}
          onChange={playerChange}
        ></input>
        <label htmlFor="currentAssists"> currentAssists: </label>
        <input
          id="currentAssists"
          type="number"
          value={playerForm.currentAssists}
          onChange={playerChange}
        ></input>
        <label htmlFor="currentCleansheet"> currentCleansheet: </label>
        <input
          id="currentCleansheet"
          type="number"
          value={playerForm.currentCleansheet}
          onChange={playerChange}
        ></input>
        <label htmlFor="statGoals"> statGoals: </label>
        <input
          id="statGoals"
          type="number"
          value={playerForm.statGoals}
          onChange={playerChange}
        ></input>
        <label htmlFor="statAssists"> statAssists: </label>
        <input
          id="statAssists"
          type="number"
          value={playerForm.statAssists}
          onChange={playerChange}
        ></input>
        <label htmlFor="totalCleansheets"> totalCleansheets: </label>
        <input
          id="totalCleansheets"
          type="number"
          value={playerForm.totalCleansheets}
          onChange={playerChange}
        ></input>
        <label htmlFor="clubId"> clubId: </label>
        <input
          id="clubId"
          type="number"
          value={playerForm.clubId}
          onChange={playerChange}
        ></input>
        <label htmlFor="price"> price: </label>
        <input
          id="price"
          value={playerForm.price}
          onChange={playerChange}
        ></input>
        <label htmlFor="selected"> Selected: </label>
        <input
          id="selected"
          value={playerForm.selected}
          onChange={playerChange}
        ></input>
        <label htmlFor="totalPoints"> totalPoints: </label>
        <input
          id="totalPoints"
          value={playerForm.totalPoints}
          onChange={playerChange}
        ></input>
        <label htmlFor="image"> image: </label>
        <input
          id="image"
          value={playerForm.image}
          onChange={playerChange}
        ></input>
        <button type="submit">Add Player</button>
      </form>
      <h2>All Players</h2>
      <section className="playerList">
        {players?.map((player) =>
          player.position === 'Defender' || player.position === 'Goalie' ? (
            <div key={player.id}>
              <h3>{player.name}</h3>
              <div>Position: {player.position}</div>
              <div>Goals: {player.currentGoals}</div>
              <div>Assists: {player.currentAssists}</div>
              <div>Cleansheets: {player.currentCleansheet}</div>
              <div>Total Goals Last Season: {player.statGoals}</div>
              <div>Total Assists Last Season: {player.statAssists}</div>
              <div>
                Total Cleansheets Last Season: {player.totalCleansheets}
              </div>
              <div>Club ID: {player.clubId}</div>
              <div>Price: ${player.price}</div>
              <div>Selected: {player.selected}%</div>
              <div>Total Points: {player.totalPoints}</div>
              <img
                src={player.image}
                alt="player"
                onClick={() => {
                  viewPlayer(player.id)
                }}
              ></img>
            </div>
          ) : (
            <div>
              <h3>{player.name}</h3>
              <div>Position: {player.position}</div>
              <div>Goals: {player.currentGoals}</div>
              <div>Assists: {player.currentAssists}</div>
              <div>Total Goals Last Season: {player.statGoals}</div>
              <div>Total Assists Last Season: {player.name}</div>
              <div>Club ID: {player.clubId}</div>
              <div>Price: ${player.price}</div>
              <div>Selected: {player.selected}%</div>
              <div>Total Points: {player.totalPoints}</div>
              <img
                src={player.image}
                alt="player"
                onClick={() => {
                  viewPlayer(player.id)
                }}
              ></img>
            </div>
          )
        )}
      </section>
    </div>
  ) : (
    <div></div>
  )
}

export default Admin
