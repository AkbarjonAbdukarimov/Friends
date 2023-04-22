import axios from "axios"
import { useEffect, useState } from "react"
import Card from "./Card/Card"
import url from "../url"

const Home = ({ admin }) => {
    const [cars, setCars] = useState([])
    const fetchCars = () => { axios.get(`${url}/cars`).then(res => setCars(res.data)) }
    useEffect(() => { fetchCars() }, [])
    return <>
        <div className="container">
            <h1>Available Cars</h1>
            <div className="row justify-content-center">
                <div className="col-6">


                    {cars.map(car => <Card key={car._id} fetchCars={fetchCars} admin={admin} car={car} />)}

                </div>
            </div>
        </div>
    </>
}
export default Home