import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/login.css'
const Login = () => {

    const [dataUser, setDataUser] = useState({
        email: '',
        password: ''
    });

    const { signin, signinwithgoogle, resetPassword } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState(null) //Para gestionar los errores y ponerlos mas visibles

    const handleChange = ({ target: { name, value } }) => {
        setDataUser({ ...dataUser, [name]: value })
    }
    const handleSubmit = async e => {
        e.preventDefault();
        try {
            setError(null)
            await signin(dataUser.email, dataUser.password)
            navigate('/')
        } catch (error) {
            console.log(error);
            setError(error.message)
        }
    }
    const handleSignInWithGoogle = async () => {
        try {
            setError(null)
            await signinwithgoogle()
            navigate('/')
        } catch (error) {
            setError(error.message)
        }
    }
    const handleResetPassword = async () => {
        if (!dataUser.email) return setError('Please enter your email in the field "Email"');
        try {
            setError(null)
            await resetPassword(dataUser.email)
        } catch (error) {
            setError(error.message)
        }
    }
    const handleSendToRegister = () => {
        navigate('/SignUp')
    }

    return (
        <div className='Login__container z-depth-3'>
            <h2>Sign In</h2>
            <form onSubmit={handleSubmit}>
                <div className="form__email">
                    <label htmlFor="email">Email</label>
                    <input type="email" name='email' id='Idemail' placeholder='example@example.com' onChange={handleChange} />
                </div>
                <div className="form__password">
                    <label htmlFor="password">Password</label>
                    <input type="password" name='password' id='Idpassword' placeholder='enter your password' onChange={handleChange} />
                </div>
                <a onClick={handleResetPassword}>Forgot Password?</a>
                <div className="form__btn">
                    <button className='btn waves-effect waves-light z-depth-2'>Sign In</button>
                    <a onClick={handleSendToRegister}>Create Account</a>
                </div>
                <div className="divider divider_personal"></div>
            </form>
            <div className='form__btn__google'>
                <button onClick={handleSignInWithGoogle} className="btn waves-effect waves-light z-depth-2">
                    <i className='bx bxl-google'></i>
                    Sign In with Google
                </button>
            </div>
            {
                error 
                ?
                <div className="#c62828 red darken-3 error-panel z-depth-1">{error}</div>
                : 
                <div></div>
            }
        </div>
    )
}

export default Login