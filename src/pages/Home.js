import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { BASE_URL } from '../services/api'

const Home = () => {
  let navigate = useNavigate()

  const [teams, setTeams] = useState([])
  const [players, setPlayers] = useState([])

  useEffect(() => {
    const apiCall = async () => {
      let response = await axios.get(`${BASE_URL}teams`)
      let getPlayers = await axios.get(`${BASE_URL}players`)
      setTeams(response.data)
      setPlayers(getPlayers.data)
    }
    apiCall()
  }, [])

  const viewTeam = (id) => {
    navigate(`teams/${id}`)
  }

  return (
    <div className="homepage">
      <h1 className="homepage-title"> Welcome to Soccer Manager</h1>
      <h2 className="homepage-sub">
        {' '}
        Click on a team to view details and its players
      </h2>
      <h2 className="homepage-sub">
        {' '}
        Click register to create a team or sign in!
      </h2>
      <section className="teams">
        {teams.map((team) => (
          <div key={team.id}>
            <h2 className="homepage-team">{team.name}</h2>
            <img
              src={team.image}
              className="teamImage teamImage-shrink"
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

export default Home
