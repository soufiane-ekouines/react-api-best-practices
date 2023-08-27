import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import axiocClient from '../axios-client';
import { useStateContext } from '../context/ContextProvider';

const Signup = () => {

const nameRef = useRef();
const emailRef = useRef();
const passwordRef = useRef();
const password2Ref = useRef();
const {setUser,setToken} = useStateContext();

    const onsubmit = (ev) =>{
        ev.preventDefault();
        const payload = {
          name:nameRef.current.value,
        email:emailRef.current.value,
        password:passwordRef.current.value,
        password_confirmation:password2Ref.current.value
        }
        console.log(payload);
        axiocClient.post('/signup',payload)
                  .then(({data})=>{
                    setToken(data.token)
                    setUser(data.user)
                  })
                  .catch(err=>{
                    
                  })
    }
    
    return (
        <div className="login-signup-form animated fadeInDown">
      <div className="form">
        <form onSubmit={onsubmit}>
          <h1 className="title">Signup for Free</h1>
          {/* {errors &&
            <div className="alert">
              {Object.keys(errors).map(key => (
                <p key={key}>{errors[key][0]}</p>
              ))}
            </div>
          } */}
          <input ref={nameRef} type="text" placeholder="Full Name"/>
          <input ref={emailRef} type="email" placeholder="Email Address"/>
          <input ref={passwordRef}  type="password" placeholder="Password"/>
          <input ref={password2Ref}  type="password" placeholder="Repeat Password"/>
          <button className="btn btn-block">Signup</button>
          <p className="message">Already registered? <Link to="/login">Sign In</Link></p>
        </form>
      </div>
    </div>
    );
}

export default Signup;
