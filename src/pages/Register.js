import { useState } from 'react'
import { RegisterUser } from '../services/Auth'
import { useNavigate } from 'react-router-dom'

const Register = () => {
  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    money: '70'
  })
  let navigate = useNavigate()

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await RegisterUser({
      email: formValues.email,
      password: formValues.password
    })
    setFormValues({
      email: '',
      password: '',
      confirmPassword: '',
      money: '70'
    })
    navigate('/signin')
  }

  return (
    <div className="body">
      <div className="main">
        <form onSubmit={handleSubmit}>
          <label className="labelReg" htmlFor="chk" aria-hidden="true">
            Create your Soccer Managet Account below
          </label>
          <div className="input-wrapper">
            <input
              className="inputs"
              onChange={handleChange}
              name="email"
              type="email"
              placeholder="Email"
              value={formValues.email}
              required
            />
          </div>
          <div className="input-wrapper">
            <input
              className="inputs"
              onChange={handleChange}
              type="password"
              name="password"
              placeholder="Password"
              value={formValues.password}
              required
            />
          </div>
          <div className="input-wrapper Password">
            <input
              className="inputs"
              onChange={handleChange}
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formValues.confirmPassword}
              required
            />
          </div>
          <div className="button1">
            <button
              className="loginB"
              disabled={
                !formValues.email ||
                (!formValues.password &&
                  formValues.confirmPassword === formValues.password)
              }
            >
              Create Account
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Register
