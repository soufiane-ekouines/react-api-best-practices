import { createContext, useContext, useState } from "react";

const StateContext = createContext({
    user: null,
    token: null,
    notification: null,
    setUser: () => { },
    setUser: () => { },
    setUserNotification: () => { },

})
// 
export const ContextProvider = ({ children }) => {
    const [user, setUser] = useState({});
    const [notification, _setUserNotification] = useState('');

    const [token, _setToken] = useState(localStorage.getItem('ACCESS_TOKEN'));
    // const [token, _setToken] = useState(555);


    const setToken = (token) => {
        _setToken(token);
        if (token) {
            localStorage.setItem('ACCESS_TOKEN', token);
        } else {
            localStorage.removeItem('ACCESS_TOKEN');

        }
    }

    const setUserNotification = (message) => {
        _setUserNotification(message);
        setTimeout(() => {
            _setUserNotification('');
        }, 3000)
    }

    return (
        <StateContext.Provider value={{
            user,
            token,
            notification,
            setUser,
            setToken,
            setUserNotification
        }}>
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext)