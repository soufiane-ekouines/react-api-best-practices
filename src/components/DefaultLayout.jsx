
import { Link, Navigate, Outlet } from 'react-router-dom';
import { useStateContext } from '../context/ContextProvider';
import axiocClient from '../axios-client';
import { useEffect } from 'react';

const DefaultLayout = () => {

    const { notification,user, token, setToken, setUser } = useStateContext()
    if (!token) {
        return <Navigate to={'/login'} />
    }

    useEffect(() => {
        axiocClient.get('/user').then(({ data }) => {
            setUser(data);
        })
    }, [])

    const onLogout = (ev) => {
        ev.preventDefault();

        axiocClient.post('/logout').then(() => {
            setUser({});
            setToken(null);
        })
    }
    return (
        <div id="defaultLayout">
            <aside>
                <Link to="/users">Dashboard</Link>
                <Link to="/users">Users</Link>
            </aside>
            <div className="content">
                <header>
                    <div>
                        Header
                    </div>

                    <div>
                        {user.name} &nbsp; &nbsp;
                        <a onClick={onLogout} className="btn-logout" href="#">Logout</a>
                    </div>
                </header>
                <main>
                    <Outlet />
                </main>
                {notification &&
            <div className="notification">
              {notification}
            </div>
          }
            </div>
        </div>
    );
}

export default DefaultLayout;
