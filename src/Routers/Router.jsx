import { createBrowserRouter } from "react-router"
import Mainlayout from "../Layout/Mainlayout"
import Home from "../pages/Home/Home/Home"

const router = createBrowserRouter([
    {
        path: "/",
        element: <Mainlayout/>,
        children:[
            {
                index: true,
                element: <Home/>
            }
        ]
    }
])

export default router