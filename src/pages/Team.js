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
    <div className="view-team">
      <section>
        <div key={selectedClub?.id}>
          <h1>{selectedClub?.name}</h1>
          <h2>Next Game against: {selectedClub?.schedule}</h2>
          <img src={selectedClub?.image} alt="logo"></img>
          <h3>Last Game results: {selectedClub?.scores}</h3>
          <h3>Current Points: {selectedClub?.points}</h3>
        </div>
        {selectedClub?.owns.map((player) => (
          <div key={player.name}>
            <img src={player.image}></img>
            <h2>{player.name}</h2>
            <h2>{player.position}</h2>
          </div>
        ))}
      </section>
    </div>
  )
}

export default GetTeam
