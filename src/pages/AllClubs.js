import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { BASE_URL } from '../services/api'

const AllClubs = () => {
  let navigate = useNavigate()
  const [teams, setTeams] = useState([])

  useEffect(() => {
    const apiCall = async () => {
      let response = await axios.get(`${BASE_URL}teams`)
      setTeams(response.data)
    }
    apiCall()
  }, [])

  const viewTeam = (id) => {
    navigate(`${id}`)
  }

  return (
    <div>
      <section className="teams">
        {teams.map((team) => (
          <div key={team.id}>
            <h2>{team.name}</h2>
            <img
              src={team.image}
              alt="Team"
              onClick={() => {
                viewTeam(team.id)
              }}
            ></img>
          </div>
        ))}
      </section>
    </div>
  )
}

export default AllClubs
