import { Navigate, createBrowserRouter } from "react-router-dom";
import Login from "./views/Login";
import Signup from "./views/Signup";
import Users from "./views/Users";
import NotFound from "./views/NotFound";
import DefaultLayout from "./components/DefaultLayout";
import GuestLayouts from "./components/GuestLayouts";
import { Children } from "react";
import Formuser from "./views/formuser";

const router = createBrowserRouter([
    {
        path: '/',
        element: <DefaultLayout />,     
        children: [
            {
                path:'/',
                element:<Navigate to={'/users'}/>
            },
            {
                path: '/users',
                element: <Users />
            },
            {
                path: '/user/:id',
                element: <Formuser />
            },
            {
                path: '/new',
                element: <Formuser />
            },
        ]
    },
    {
        path: '/',
        element: <GuestLayouts />,
        children: [
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/signup',
                element: <Signup />
            },
        ]
    },
    {
        path: '*',
        element: <NotFound />
    },

])


export default router;