import React from 'react'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { BASE_URL } from '../services/api'
import axios from 'axios'

const GetTeam = () => {
  let { id } = useParams()

  const [selectedClub, setSelectedClub] = useState()

  useEffect(() => {
    const apiCall = async () => {
      const response = await axios.get(`${BASE_URL}teams/${id}`)
      setSelectedClub(response.data)
    }
    apiCall()
  }, [id])

  return (
    <div className="view-teamMain">
      <div className="view-team">
        <section className="team-details">
          <div key={selectedClub?.id}>
            <img src={selectedClub?.image} alt="logo"></img>
            <h1>{selectedClub?.name}</h1>
            <h1>Last Game results: {selectedClub?.scores}</h1>
            <h1>Current Points: {selectedClub?.points}</h1>
            <h1>Next Game: {selectedClub?.schedule}</h1>
          </div>
        </section>
        <section className="team-player">
          {selectedClub?.owns.map((player) => (
            <div key={player.name}>
              <h2>{player.name}</h2>
              <h2>{player.position}</h2>
              <img src={player.image}></img>
            </div>
          ))}
        </section>
      </div>
    </div>
  )
}

export default GetTeam
