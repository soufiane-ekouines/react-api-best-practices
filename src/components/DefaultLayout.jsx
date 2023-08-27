
import { Link, Navigate, Outlet } from 'react-router-dom';
import { useStateContext } from '../context/ContextProvider';

const DefaultLayout = () => {

    const {user,token,setToken} = useStateContext()

    if(!token)
    {
        return <Navigate to={'/login'}/> 
    }
    const onLogout =(ev)=>{
        ev.preventDefault();
        setToken();
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
            <Outlet/>
          </main>
          {/* {notification &&
            <div className="notification">
              {notification}
            </div>
          } */}
        </div>
      </div>
    );
}

export default DefaultLayout;
