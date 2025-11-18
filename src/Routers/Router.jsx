import { createBrowserRouter } from "react-router"
import Mainlayout from "../Layout/Mainlayout"
import Home from "../pages/Home/Home/Home"
import Coverage from "../pages/Coverage/Coverage"
import Authlayout from "../Layout/Authlayout"
import Login from "../pages/Authentication/Login"
import Register from "../pages/Authentication/Register"

const router = createBrowserRouter([
    {
        path: "/",
        element: <Mainlayout/>,
        children:[
            {
                index: true,
                element: <Home/>
            },
            {
                path: '/coverage',
                element: <Coverage/>,
                loader: () => fetch('/warehouses.json').then(res => res.json())
            }
        ]
    },
    {
        path:'/',
        element: <Authlayout/>,
        children: [
            {
                path: '/login',
                element: <Login/>
            },
            {
                path: '/register',
                element: <Register/>
            }
        ]
    }
])

export default router