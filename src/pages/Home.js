import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { BASE_URL } from '../services/api'

const Home = () => {
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
    navigate(`teams/${id}`)
  }

  teams?.sort((a, b) => b.points - a.points)

  return (
    <div className="homepage">
      <h1 className="homepage-title"> Welcome to Soccer Manager</h1>
      <section className="standings">
        <div className="pointsLabel">
          <h3 className="standingLabel">Team</h3>
          <h3 className="standingLabel">Standings</h3>
          <h3 className="standingLabel">Points</h3>
        </div>
        {teams.map((team) => (
          <div key={team.id} className="teams">
            <img
              src={team.image}
              className="teamImage teamImage-shrink"
              alt="Team"
              onClick={() => {
                viewTeam(team.id)
              }}
            ></img>
            <h2 className="homepage-team">{team.name}</h2>
            <h2 className="homepage-team">{team.points}</h2>
          </div>
        ))}
      </section>
    </div>
  )
}

export default Home
