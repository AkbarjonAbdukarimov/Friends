
import axios from "axios"
import { Link, useNavigate } from "react-router-dom"

const Navbar = ({ admin, setAdmin }) => {
    const navigate = useNavigate();
    return <>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/" >Rent</Link>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        {admin && <>
                            <Link className="nav-link " to="/admin/create" >New Car</Link>
                            <span style={{ cursor: "pointer" }} className="nav-link " onClick={() => {
                                axios.get('http://localhost:9000/admin/logout', { withCredentials: true })
                                    .then(res => { setAdmin(null); alert("Logged Out"); navigate('/') })
                            }} >Log Out</span>
                        </>}

                    </div>
                </div>
            </div>
        </nav></>
}
export default Navbar