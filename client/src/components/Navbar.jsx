import { Link } from "react-router-dom"

const Navbar = () => {
  return (
    <header className="py-3 bg-brand">
      <div className="px-6">
        <h3 className="text-3xl font-semibold text-white">
          <Link to={"/csv"}>CSV Upload</Link>
        </h3>
      </div>
    </header>
  )
}

export default Navbar
