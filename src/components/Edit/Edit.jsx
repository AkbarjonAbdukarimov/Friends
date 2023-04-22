
import { useParams } from "react-router-dom";
import EditForm from "./EditForm";

const Edit = () => {
    let { id } = useParams();
    return <>
        <EditForm id={id} />
    </>
}

export default Edit