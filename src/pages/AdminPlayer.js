import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { BASE_URL } from '../services/api'

const AdminPlayer = () => {
  let { id } = useParams()
  const [allPlayers, setAllPlayers] = useState([])

  const [updateForm, setUpdateForm] = useState({
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
    const apiCall = async () => {
      let response = await axios.get(`${BASE_URL}players/${id}`)
      setAllPlayers(response.data)
    }
    apiCall()
  }, [])

  const playerUpdate = (e) => {
    setUpdateForm({ ...updateForm, [e.target.id]: e.target.value })
  }

  const handleUpdate = async (e) => {
    e.preventDefault()
    let updatePlayer = await axios.put(`${BASE_URL}players/${id}`, updateForm)
    setAllPlayers([allPlayers, updatePlayer.data])
    setUpdateForm({
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

  return (
    <div>
      <section>
        <h2>{allPlayers?.name}</h2>
        <h2>{allPlayers?.position}</h2>
        <h2>currentGoals: {allPlayers?.currentGoals}</h2>
        <h2>currentAssists: {allPlayers?.currentAssists}</h2>
        <h2>currentCleansheet:{allPlayers?.currentCleansheet}</h2>
        <h2>statGoals: {allPlayers?.statGoals}</h2>
        <h2>statAssists: {allPlayers?.statAssists}</h2>
        <h2>totalCleansheets: {allPlayers?.totalCleansheets}</h2>
        <h2>clubId: {allPlayers?.clubId}</h2>
        <h2>price: {allPlayers?.price}</h2>
        <h2>selected: {allPlayers?.selected}%</h2>
        <h2>totalPoints: {allPlayers?.totalPoints}</h2>
        <img src={allPlayers?.image} alt="player" className="playerImage"></img>
      </section>
      <form onSubmit={handleUpdate}>
        <label htmlFor="name"> Name: </label>
        <input
          id="name"
          value={updateForm.name}
          onChange={playerUpdate}
        ></input>
        <label htmlFor="position"> Position: </label>
        <input
          id="position"
          value={updateForm.position}
          onChange={playerUpdate}
        ></input>
        <label htmlFor="currentGoals"> currentGoals: </label>
        <input
          id="currentGoals"
          type="number"
          value={updateForm.currentGoals}
          onChange={playerUpdate}
        ></input>
        <label htmlFor="currentAssists"> currentAssists: </label>
        <input
          id="currentAssists"
          type="number"
          value={updateForm.currentAssists}
          onChange={playerUpdate}
        ></input>
        <label htmlFor="currentCleansheet"> currentCleansheet: </label>
        <input
          id="currentCleansheet"
          type="number"
          value={updateForm.currentCleansheet}
          onChange={playerUpdate}
        ></input>
        <label htmlFor="statGoals"> statGoals: </label>
        <input
          id="statGoals"
          type="number"
          value={updateForm.statGoals}
          onChange={playerUpdate}
        ></input>
        <label htmlFor="statAssists"> statAssists: </label>
        <input
          id="statAssists"
          type="number"
          value={updateForm.statAssists}
          onChange={playerUpdate}
        ></input>
        <label htmlFor="totalCleansheets"> totalCleansheets: </label>
        <input
          id="totalCleansheets"
          type="number"
          value={updateForm.totalCleansheets}
          onChange={playerUpdate}
        ></input>
        <label htmlFor="clubId"> clubId: </label>
        <input
          id="clubId"
          type="number"
          value={updateForm.clubId}
          onChange={playerUpdate}
        ></input>
        <label htmlFor="price"> price: </label>
        <input
          id="price"
          value={updateForm.price}
          onChange={playerUpdate}
        ></input>
        <label htmlFor="selected"> Selected: </label>
        <input
          id="selected"
          value={updateForm.selected}
          onChange={playerUpdate}
        ></input>
        <label htmlFor="totalPoints"> totalPoints: </label>
        <input
          id="totalPoints"
          value={updateForm.totalPoints}
          onChange={playerUpdate}
        ></input>
        <label htmlFor="image"> image: </label>
        <input
          id="image"
          value={updateForm.image}
          onChange={playerUpdate}
        ></input>
        <button type="submit">Update Player</button>
      </form>
    </div>
  )
}

export default AdminPlayer
