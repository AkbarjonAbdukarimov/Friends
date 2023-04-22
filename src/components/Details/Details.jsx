
import { useParams } from "react-router-dom"
import DetailsCard from "./DetailsCard"

const Details = () => {

    let { id } = useParams();

    return <>
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-6">
                    <DetailsCard id={id} />
                </div>
            </div>
        </div>
    </>
}
export default Details