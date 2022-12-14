import { Link, useNavigate } from 'react-router-dom'
import logo from '../logo/logo-transparent-png.png'



const Nav = ({ authenticated, user, handleLogout }) => {
    let navigate = useNavigate()
    let authenticatedOptions
  if (user) {
    authenticatedOptions = (
      <nav className="links">
        <img className='logo' src={logo} alt="logo"/>
        <Link to="/">Home</Link>
        <Link to="/players">Players</Link>
        <Link to={`/transfers/${user.id}`}>Transfers</Link>
        <p className="back" onClick={() => navigate(-1)}>Back</p>
        <Link onClick={handleLogout} to="/">Sign Out</Link>
      </nav>
    )
  }

  const publicOptions = (
    <nav className="links">
      <img className='logo' src={logo} alt="logo"/>
      <Link to="/">Home</Link>
      <Link to="teams">Teams</Link>
      <Link to="/players">Players</Link>
      <p className="back" onClick={() => navigate(-1)}>Back</p>
      <Link to="/Register">Register</Link>
      <Link to="/Signin">Sign In</Link>
    </nav>
  )
  
  return (
    <header className='sticky-header'>
      
      {authenticated && user ? authenticatedOptions : publicOptions}
    </header>
  )
  }
  
  export default Nav