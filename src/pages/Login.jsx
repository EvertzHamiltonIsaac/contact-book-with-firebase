import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
const Login = () => {

    const [dataUser, setDataUser] = useState({
        email: '',
        password: ''
    });

    const { signin, signinwithgoogle, resetPassword } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState() //Para gestionar los errores y ponerlos mas visibles

    const handleChange = ({ target: { name, value } }) => {
        setDataUser({ ...dataUser, [name]: value })
    }

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            await signin(dataUser.email, dataUser.password)
            navigate('/')
        } catch (error) {
            console.log(error);
            setError(error.message)
        }
    }

    const handleSignInWithGoogle = async () => {
        await signinwithgoogle()
        navigate('/')
    }

    const handleResetPassword = async () => {
        if (!dataUser.email) return setError('Please enter your email in the field "Email"');
        console.log('reset');
        try {
            await resetPassword(user.email)
        } catch (error) {
            
        }
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="form__email">
                    <label htmlFor="email">Email</label>
                    <input type="email" name='email' id='Idemail' placeholder='example@example.com' onChange={handleChange} />
                </div>
                <div className="form__password">
                    <label htmlFor="password">Password</label>
                    <input type="password" name='password' id='Idpassword' placeholder='enter your password' onChange={handleChange} />
                </div>
                <div className="form__btn">
                    <button>Sign In</button>
                    <a href="#" onClick={handleResetPassword}>Forgot Password?</a>
                </div>
            </form>
            <div>
                <button onClick={handleSignInWithGoogle}>Sign In with Google</button>
            </div>
        </div>
    )
}

export default Login