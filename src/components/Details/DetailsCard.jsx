import axios from "axios"
import { IKImage } from "imagekitio-react"
import { useEffect, useState } from "react"
import url from '../../url'
const DetailsCard = ({ id }) => {
    const [car, setCar] = useState({ images: [] })
    useEffect(() => {
        axios.get(`${url}/cars/${id}`).then(res => setCar(res.data))
        console.log(car)
    })
    return <div className="">
        <div className=" ">
            <h3>Model - {car.model}</h3>
            <h4 className="text-muted">Brand: Chevrolet</h4>
            <p>Category: {car.category}</p>
            <h5>Rent Price: {car.pricePerDay}/Day $</h5>
            <div className="cart-img-top">
                <div className="d-flex flex-wrap">
                    {car.images.length > 0 && car.images.map(i =>
                        <IKImage key={i.id}
                            className='w-100 my-3'
                            path={i.name}

                        />
                    )}
                </div>

            </div>
        </div>
    </div>
}
export default DetailsCard