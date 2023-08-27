import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useStateContext } from '../context/ContextProvider';
import axiocClient from '../axios-client';

const Login = () => {
    const { setToken,setUser } = useStateContext()
    const  emailRef  = useRef();
    const  passwordRef  = useRef();
    const [errors,setErrors] = useState(null);
    const [message,setmessage] = useState(null);


    const onsubmit = (ev) => {
        ev.preventDefault();
        setErrors(null);
        setmessage(null);

        const payload = {
            email: emailRef.current.value,
            password: passwordRef.current.value
        }

        axiocClient.post('/login',payload).then(({data})=>{
            setToken(data.token);
            setUser(data.user);
            setmessage(data.message);
        }).catch(err=>{
            const response = err.response;

            if(response && response.status==422)
            {
                console.log(response)
                setErrors(response.data.errors);
            }
        })
    }
    return (
        <div className="login-signup-form animated fadeInDown">
            <div className="form">
                <form onSubmit={onsubmit}>
                    <h1 className="title">Login into your account</h1>

                    {errors &&
            <div className="alert">
              {Object.keys(errors).map(key => (
                <p key={key}>{errors[key][0]}</p>
              ))}
            </div>
          }
              {message &&
              <div className="alert">
                <p>{message}</p>
              </div>
            }
                    <input ref={emailRef} type="email" placeholder="Email" />
                    <input ref={passwordRef} type="password" placeholder="Password" />
                    <button className="btn btn-block">Login</button>
                    <p className="message">Not registered? <Link to="/signup">Create an account</Link></p>
                </form>
            </div>
        </div>
    );
}

export default Login;
