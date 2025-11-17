import { createBrowserRouter } from "react-router"
import Mainlayout from "../Layout/Mainlayout"
import Home from "../pages/Home/Home/Home"
import Coverage from "../pages/Coverage/Coverage"

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
    }
])

export default router