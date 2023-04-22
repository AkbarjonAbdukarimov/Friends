import axios from "axios"
import { IKImage } from "imagekitio-react"
import { Link, useNavigate } from "react-router-dom"
import url from '../../url'
const Card = ({ car, admin, fetchCars }) => {
    const navigate = useNavigate()
    const handleDelete = async () => {
        try {
            await axios.delete(`${url}/cars/${car._id}`, { withCredentials: true })
            fetchCars()
            navigate('/')
        } catch (err) {
            console.log(err)
        }
    }
    return <>
        <div className="card my-3" >
            {
                car.images.length > 0 &&
                <>
                    <IKImage className="card-img-top d-block w-100" path={car.images[0].name} />
                </>


            }
            <div className="card-body">
                <h5 className="card-title">Model: {car.model}</h5>
                <p className="card-text">Brand: {car.brand}</p>
            </div>
            <ul className="list-group list-group-flush">
                <li className="list-group-item">Category: {car.category}</li>
                <li className="list-group-item">Price {car.pricePerDay}$/Day</li>
                <li className="list-group-item"><Link to={`/car/${car._id}`} className="text-muted">More</Link></li>

            </ul>
            {admin && <>
                <div className="card-body">
                    <span onClick={handleDelete} style={{ cursor: "pointer", textDecoration: "underline", color: "Highlight" }} className="card-link">Delete</span>
                    <Link to={`/car/edit/${car._id}`} style={{ cursor: "pointer", textDecoration: "underline", color: "Highlight" }} className="card-link">Edit</Link>
                </div></>}
        </div>
    </>
}
export default Card