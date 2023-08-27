import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useStateContext } from '../context/ContextProvider';

const GuestLayouts = () => {
    const {token} = useStateContext()
    // debugger;
    if(token)
    {
        return <Navigate to={'/users'}/>
    }

    return (
        <div>
            
            <Outlet/>
            
        </div>
    );
}

export default GuestLayouts;
