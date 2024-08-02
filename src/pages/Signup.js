import { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const registerForm = useRef(null);
  const { user, registerUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/login/home');
    }
  }, [user, navigate]);

  const [showPassword, setShowPassword] = useState(false);
  const [passwordInputType, setPasswordInputType] = useState('password');
  const [passwordStatus, setPasswordStatus] = useState('');
  const [registrationStatus, setRegistrationStatus] = useState(''); // Added registration status state

  const handlePasswordToggle = () => {
    setShowPassword(!showPassword);
    setPasswordInputType(showPassword ? 'password' : 'text');
  };

  const handlePasswordChange = (e) => {
    const passwordValue = e.target.value;
    setPasswordStatus(passwordValue === '' ? '' : 'right-password');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = registerForm.current.name.value;
    const email = registerForm.current.email.value;
    const password1 = registerForm.current.password1.value;
    const password2 = registerForm.current.password2.value;

    if (password1 !== password2) {
      setPasswordStatus('wrong-password');
      setRegistrationStatus(''); // Clear any previous registration status
      return;
    }

    const userInfo = { name, email, password1, password2 };

    try {
      // Attempt to register the user
      await registerUser(userInfo);
      setRegistrationStatus('success'); // Registration was successful
    } catch (error) {
      console.error('Error registering user:', error);
      alert('Error registering user')
      setRegistrationStatus('error'); // Registration failed
    }
  };

  return (
    <div className="container">
      <div className="login-register-container">
        {registrationStatus === 'success' && (
          <p className="success-message" style={{ color: 'green', fontWeight: 'bold', marginBottom: '10px' }}>
          Successfully registered!
        </p>
        )}
        {registrationStatus === 'error' && (
          <p className="error-message" style={{ color: 'red', fontWeight: 'bold', marginBottom: '10px' }}>
          Registration failed. Please try again.
        </p>
        )}
        <p className="login-register-heading">Get Started Free!</p>

        <form ref={registerForm} onSubmit={handleSubmit}>

          <div className="form-field-wrapper">
                <label className='formlabel'>Your Name</label>
                <input 
                className='input-field'
                  required
                  type="text" 
                  name="name"
                  placeholder="@yourname"
                  />
            </div>

            <div className="form-field-wrapper">
                <label className='formlabel'>Email Address</label>
                <input 
                className='input-field'
                  required
                  type="email" 
                  name="email"
                  placeholder="yourname@gmail.com"
                  />
            </div>

            <div className={`form-field-wrapper ${passwordStatus}`}>
          <label className="formlabel">Password</label>
          <div className="input-field-password">
            <input
              type={passwordInputType}
              name="password1"
              className={`input-field ${passwordStatus}`}
              placeholder="••••••••"
              onChange={handlePasswordChange}
            />
            <span
              className="password-toggle-btn"
              onClick={handlePasswordToggle}
            >
              <i className={`fa ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`} />
            </span>
          </div>
        </div>
            <div className="form-field-wrapper">
                <label className='formlabel'>Confirm Password</label>
                <input 
                className='input-field'
                  type="password"
                  name="password2" 
                  placeholder="••••••••"
                  />
            </div>


            <div className="form-field-wrapper">

                <input 
                  type="submit" 
                  value="Register"
                  className="btn"
                  />

            </div>

        </form>
        <p>Already have an account? <Link to="/login" className='authLink'><span className="gradient-text">Login</span></Link></p>

      </div>

      
      
  </div>
  )
}

export default Register

