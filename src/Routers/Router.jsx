import { createBrowserRouter } from "react-router";
import Mainlayout from "../Layout/Mainlayout";
import Home from "../pages/Home/Home/Home";
import Coverage from "../pages/Coverage/Coverage";
import Authlayout from "../Layout/Authlayout";
import Login from "../pages/Authentication/Login";
import Register from "../pages/Authentication/Register";
import PrivateRoute from "./PrivateRoute";
import Rider from "../pages/Rider/Rider";
import SendParcel from "../pages/SendParcel/SendParcel";
import DashBoard from "../Layout/DashBoard";
import MyParcels from "../pages/Dashboard/MyParcels/MyParcels";
import Payment from "../pages/Dashboard/Payment/Payment";
import PaymentSuccess from "../pages/Dashboard/Payment/PaymentSuccess";
import PaymentCancelled from "../pages/Dashboard/Payment/PaymentCancelled";
import PaymentHistory from "../pages/Dashboard/Payment/PaymentHistory";
import ApproveRiders from "../pages/Dashboard/ApproveRiders/ApproveRiders";
import UserManagement from "../pages/Dashboard/UserManagement/UserManagement";
import AdminRoute from "./AdminRoute";
import AssignRiders from "../pages/Dashboard/AssignRiders/AssignRiders";
import AssignedDelivery from "../pages/Dashboard/AssignDelivery/AssignedDelivery";
import RiderRoute from "./RiderRoute";
import CompletedDeliveres from "../pages/Dashboard/CompletedDeliveres/CompletedDeliveres";
import ParcelTrack from "../pages/Dashboard/ParcelTrack/ParcelTrack";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Mainlayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/rider",
        element: (
          <PrivateRoute>
            <Rider />
          </PrivateRoute>
        ),
        loader: () => fetch("/warehouses.json").then((res) => res.json()),
      },
      {
        path: "/sendparcel",
        element: (
          <PrivateRoute>
            <SendParcel />
          </PrivateRoute>
        ),
        loader: () => fetch("/warehouses.json").then((res) => res.json()),
      },
      {
        path: '/parceltrack/:trackingId',
        element: <ParcelTrack/>
      },
      {
        path: "/coverage",
        element: <Coverage />,
        loader: () => fetch("/warehouses.json").then((res) => res.json()),
      },
    ],
  },
  {
    path: "/",
    element: <Authlayout />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashBoard />
      </PrivateRoute>
    ),
    children: [
      {
        path: "/dashboard/myparcels",
        element: <MyParcels />,
      },
      {
        path:'/dashboard/user-management',
        element: <AdminRoute><UserManagement/></AdminRoute> 
      },
      {
        path: "/dashboard/payment-history",
        element: <PaymentHistory />,
      },
      {
        path: '/dashboard/approve-riders',
        element: <AdminRoute><ApproveRiders/></AdminRoute> 
      },
      {
        path: '/dashboard/assign-riders',
        element: <AdminRoute><AssignRiders/></AdminRoute> 
      },
      {
        path: '/dashboard/assigned-deliveres',
        element: <RiderRoute><AssignedDelivery/></RiderRoute> 
      },
      {
        path: '/dashboard/completed-deliveres',
        element: <RiderRoute><CompletedDeliveres/></RiderRoute> 
      },
      {
        path: "/dashboard/payment/:parcelid",
        element: <Payment />,
      },
      {
        path: "/dashboard/payment-success",
        element: <PaymentSuccess />,
      },
      {
        path: "/dashboard/payment-cancelled",
        element: <PaymentCancelled />,
      },
    ],
  },
]);

export default router;
