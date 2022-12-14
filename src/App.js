import { useState, useEffect } from 'react'
import { Route, Routes } from 'react-router'
import Nav from './components/Nav'
import './App.css'
import Home from './pages/Home'
import SignIn from './pages/SignIn'
import Register from './pages/Register'
import AllClubs from './pages/AllClubs'
import GetTeam from './pages/Team'
import Profile from './pages/Profile'
import AllPlayers from './pages/AllPlayers'
import PickTeam from './pages/PickTeam'
import Admin from './pages/Admin'
import AdminTeam from './pages/AdminTeam'
import Transfer from './pages/Transfer'
import AdminPlayer from './pages/AdminPlayer'
import { CheckSession } from './services/Auth'

function App() {
  const [authenticated, toggleAuthenticated] = useState(false)
  const [user, setUser] = useState(null)

  const handleLogOut = () => {
    setUser(null)
    toggleAuthenticated(false)
    localStorage.clear()
  }

  const checkToken = async () => {
    const user = await CheckSession()
    setUser(user)
    toggleAuthenticated(true)
  }

  useEffect(() => {
    const token = localStorage.getItem('token')

    if (token) {
      checkToken()
    }
  }, [])

  return (
    <div>
      <Nav
        authenticated={authenticated}
        user={user}
        handleLogout={handleLogOut}
      />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/teams" element={<AllClubs />} />
          <Route path="/teams/:id" element={<GetTeam />} />
          <Route path="/players" element={<AllPlayers />} />
          <Route path="/pickteam/:id" element={<PickTeam />} />
          <Route path="/transfers/:id" element={<Transfer />} />
          <Route
            path="/signin"
            element={
              <SignIn
                setUser={setUser}
                toggleAuthenticated={toggleAuthenticated}
              />
            }
          />
          <Route path="/register" element={<Register />} />
          <Route
            path="/profile/:id"
            element={<Profile user={user} authenticated={authenticated} />}
          />
          <Route
            path="/admin/:id"
            element={<Admin user={user} authenticated={authenticated} />}
          />
          <Route
            path="/admin/:id/team/:id"
            element={<AdminTeam user={user} authenticated={authenticated} />}
          />
          <Route
            path="/admin/:id/player/:id"
            element={<AdminPlayer user={user} authenticated={authenticated} />}
          />
        </Routes>
      </main>
    </div>
  )
}

export default App
