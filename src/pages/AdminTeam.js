import React from 'react'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { BASE_URL } from '../services/api'
import axios from 'axios'

const AdminTeam = () => {
  let { id } = useParams()
  const [selectedClub, setSelectedClub] = useState()
  const [form, setForm] = useState({
    schedule: '',
    scores: '',
    points: ''
  })

  useEffect(() => {
    const apiCall = async () => {
      const response = await axios.get(`${BASE_URL}teams/${id}`)
      setSelectedClub(response.data)
    }
    apiCall()
  }, [id])

  const handleChange = (event) => {
    setForm({ ...form, [event.target.id]: event.target.value })
  }

  const handleUpdate = async (event) => {
    event.preventDefault()
    let updatedTeam = await axios.put(`${BASE_URL}teams/${id}`, form)
    setForm({ schedule: '', scores: '', points: '' })
  }

  return selectedClub ? (
    <div className="view-team">
      <form onSubmit={handleUpdate}>
        <label htmlFor="schedule">Next Game: </label>
        <input
          id="schedule"
          value={form.schedule}
          onChange={handleChange}
        ></input>
        <label htmlFor="scores">Last Game results: </label>
        <input id="scores" value={form.scores} onChange={handleChange}></input>
        <label htmlFor="points">Points: </label>
        <input
          id="points"
          type="number"
          value={form.points}
          onChange={handleChange}
        ></input>
        <button type="submit">Update Team</button>
      </form>
      <section>
        <div key={selectedClub.id}>
          <h1>{selectedClub.name}</h1>
          <h2>Next Game against: {selectedClub.schedule}</h2>
          <img src={selectedClub.image} alt="logo" className="teamImage"></img>
          <h3>Last Game results: {selectedClub.scores}</h3>
          <h3>Current Points: {selectedClub.points}</h3>
        </div>
        {selectedClub.owns.map((player) => (
          <div key={player.name}>
            <h2>{player.name}</h2>
            <h2>{player.position}</h2>
          </div>
        ))}
      </section>
    </div>
  ) : (
    <div></div>
  )
}

export default AdminTeam
