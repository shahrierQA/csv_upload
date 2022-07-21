import { Navigate } from "react-router-dom"
import CSVSinglePage from "./pages/csvSingle"
import HomePage from "./pages/home"

const routers = () => {
  return [
    {
      path: "/",
      element: <Navigate to={"/csv"} />,
    },
    {
      path: "/csv",
      element: <HomePage />,
    },
    {
      path: "/csv/:id",
      element: <CSVSinglePage></CSVSinglePage>,
    },
  ]
}

export default routers
