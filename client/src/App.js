import { useRoutes } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import routers from "./routes"
import { QueryClientProvider, QueryClient } from "@tanstack/react-query"
import Navbar from "./components/Navbar"

const client = new QueryClient()

function App() {
  // mount routers
  const mountRoutes = useRoutes(routers())

  return (
    <QueryClientProvider client={client}>
      <ToastContainer theme="colored" position="top-center" autoClose="1500" />
      <Navbar />
      <div>{mountRoutes}</div>
    </QueryClientProvider>
  )
}

export default App
