import React, { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axiocClient from '../axios-client';
import { useStateContext } from '../context/ContextProvider';

const Formuser = () => {

    const navigate = useNavigate();

    const [user, setUser] = useState({
        id: null,
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
    })
    const [loading, setLanding] = useState(false);
    const [errors, setErrors] = useState(null);
    const { setUserNotification } = useStateContext();
    let { id } = useParams();

    if (id) {
        useEffect(() => {
            setLanding(true);

            axiocClient.get('/user/' + id).then(({ data }) => {
                setUser(data);
                setLanding(false);
            }).catch((err) => {
                response = err.response;
                setErrors(response.data)
                console.log(response);
                setLanding(false);

            })
        }, [])

    }
    const onSubmit = (ev) => {
        ev.preventDefault()

        if (user.id) {
            axiocClient.put('/user/' + user.id, user).then(({ data }) => {
                setUserNotification('user is updateted')
                navigate('/users')
            }).catch((err) => {
                response = err.response;
                if (response && response.status === 422) {
                    setErrors(response.data.errors)
                }
            })
        } else {
            axiocClient.post('/user', user).then(({ data }) => {
                setUserNotification('user is created')
                navigate('/users')

            }).catch((err) => {
                response = err.response;
                if (response && response.status === 422) {
                    setErrors(response.data.errors)
                }
            })
        }
    }

    return (
        <div>
            {user.id && <h1>Update User: {user.name}</h1>}
            {!user.id && <h1>New User</h1>}
            <div className="card animated fadeInDown">
                {loading && (
                    <div className="text-center">
                        Loading...
                    </div>
                )}
                {errors &&
                    <div className="alert">
                        {Object.keys(errors).map(key => (
                            <p key={key}>{errors[key][0]}</p>
                        ))}
                    </div>
                }
                {!loading && (
                    <form onSubmit={onSubmit}>
                        <input value={user.name} onChange={ev => setUser({ ...user, name: ev.target.value })} placeholder="Name" />
                        <input value={user.email} onChange={ev => setUser({ ...user, email: ev.target.value })} placeholder="Email" />
                        <input type="password" onChange={ev => setUser({ ...user, password: ev.target.value })} placeholder="Password" />
                        <input type="password" onChange={ev => setUser({ ...user, password_confirmation: ev.target.value })} placeholder="Password Confirmation" />
                        <button className="btn">Save</button>
                    </form>
                )}
            </div>
        </div>
    );
}

export default Formuser;
