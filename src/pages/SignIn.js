import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { SignInUser } from '../services/Auth'
import { Link } from 'react-router-dom'

const SignIn = (props) => {
  const [formValues, setFormValues] = useState({ email: '', password: '' })
  const [adminForm, setAdminForm] = useState({ email: '', password: '' })

  let navigate = useNavigate()

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }

  const adminChange = (e) => {
    setAdminForm({ ...adminForm, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const payload = await SignInUser(formValues)
    setFormValues({ email: '', password: '' })
    props.setUser(payload)
    props.toggleAuthenticated(true)
    navigate(`/profile/${payload.id}`)
  }

  const adminSubmit = async (e) => {
    e.preventDefault()
    const payload = await SignInUser(adminForm)
    setAdminForm({ email: '', password: '' })
    props.setUser(payload)
    props.toggleAuthenticated(true)
    navigate(`/admin/${payload.id}`)
  }

  return (
    <div className="body">
      <div className="main">
        <input className="inputs" type="checkbox" id="chk" aria-hidden="true" />
        <div className="signup">
          <form className="col" onSubmit={handleSubmit}>
            <label htmlFor="chk" aria-hidden="true" className="labelSign">
              Sign in
            </label>
            <Link className="link" to="/Register">
              Or create an account
            </Link>
            <input
              className="inputs"
              onChange={handleChange}
              name="email"
              type="email"
              placeholder="example@example.com"
              value={formValues.email}
              required
            />
            <input
              className="inputs"
              onChange={handleChange}
              type="password"
              name="password"
              placeholder="Password"
              value={formValues.password}
              required
            />
            <button
              className="loginB"
              disabled={!formValues.email || !formValues.password}
            >
              Sign In
            </button>
          </form>
        </div>
        <div className="admin">
          <form onSubmit={adminSubmit}>
            <label className="labelSign" htmlFor="chk" aria-hidden="true">
              Admin Login
            </label>
            <div className="input-wrapper">
              <input
                className="inputs"
                onChange={adminChange}
                name="email"
                type="email"
                placeholder="example@example.com"
                value={adminForm.email}
                required
              />
            </div>
            <div className="input-wrapper">
              <input
                className="inputs"
                onChange={adminChange}
                type="password"
                name="password"
                placeholder="Password"
                value={adminForm.password}
                required
              />
            </div>
            <div className="button1">
              <button
                className="loginB"
                disabled={!adminForm.email || !adminForm.password}
              >
                Sign In
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SignIn
