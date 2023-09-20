
import {useEffect, useRef} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../utils/AuthContext'

const Login = () => {
  const navigate = useNavigate()
  const {user, loginUser} = useAuth()

  const loginForm = useRef(null)

  useEffect(()=> {
    if(user){
      navigate('/login/home')
    }
})


  const handleSubmit = (e) => {
    e.preventDefault()
    const email = loginForm.current.email.value
    const password = loginForm.current.password.value

    const userInfo = {email, password}
    loginUser(userInfo)
  }

  return (
    <div className="container">

        <div className="login-register-container">
          <p className='login-register-heading'>Welcome Back!</p>
          <form ref={loginForm} onSubmit={handleSubmit}>

            <div className="form-field-wrapper">
                <label className='formlabel'>Username</label>
                <input 
                className='input-field'
                  required
                  type="email" 
                  name="email"
                  placeholder="Username"
                  />
            </div>

            <div className="form-field-wrapper">
                <label className='formlabel'>Password</label>
                <input 
                className='input-field'
                  type="password" 
                  name="password"
                  placeholder="••••••••"
                  />
            </div>


            <div className="form-field-wrapper">
    
                <input 
                  type="submit" 
                  value="Login"
                  className="btn"
                  />

            </div>

          </form>          
          <p>Don't have an account? <Link to="/signup" className='authLink'><span className="gradient-text">Register</span></Link></p>
        </div>
        

    </div>
    
  )
}

export default Login
