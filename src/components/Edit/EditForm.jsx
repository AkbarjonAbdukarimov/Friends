import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import url from '../../url'
const EditForm = ({ id }) => {
    const [car, setCar] = useState({ brand: '', category: '', model: '', price: '', images: [] })
    const [error, setError] = useState(null)
    const navigate = useNavigate()
    useEffect(() => {
        axios.get(`${url}/cars/${id}`).then(res => setCar(res.data))
    }, [])

    const handleChange = (e) => {
        setCar({ ...car, [e.target.name]: e.target.value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.put(`${url}/cars/${car._id}`,
                car,
                { withCredentials: true });

            navigate('/')
        } catch (err) {

            setError(err.response.data)
        }

    }
    return <div className="container">
        <div className="row justify-content-center">
            <div className="col-6">
                <h1 className="mb-3">Edit page</h1>
                {error && <div className="alert alert-warning alert-dismissible fade show" role="alert">
                    {error}
                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>}
                <form onSubmit={handleSubmit}>

                    <div className="input-group mb-3">
                        <span className="input-group-text" id="brand">Brand</span>
                        <input onChange={handleChange} value={car.brand} name='brand' type="text" className="form-control" aria-label="Sizing example input"
                            aria-describedby="brand" />
                    </div>
                    <div className="input-group mb-3">
                        <span className="input-group-text" id="model">Model</span>
                        <input onChange={handleChange} value={car.model} name='model' type="text" className="form-control" aria-label="Sizing example input"
                            aria-describedby="model" />
                    </div>
                    <div className="input-group mb-3">
                        <span className="input-group-text" id="category">Category</span>
                        <input onChange={handleChange} value={car.category} name='category' type="text" className="form-control" aria-label="Sizing example input"
                            aria-describedby="category" />
                    </div>
                    <div className="input-group my-3">
                        <input onChange={handleChange} value={car.pricePerDay} name='pricePerDay' type="text" className="form-control" aria-label="Dollar amount (with dot and two decimal places)" />
                        <span className="input-group-text">$</span>
                        <span className="input-group-text">0.00</span>
                    </div>
                    <div className="input-group my-3">
                        <button type='submit' className="btn btn-success">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
}
export default EditForm