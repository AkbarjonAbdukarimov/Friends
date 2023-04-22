import { IKImage, IKUpload } from 'imagekitio-react'
import { useState } from 'react';
import Loading from '../Loading/Loading';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import url from '../../url'
const Form = () => {
    const [car, setCar] = useState({ brand: '', model: '', price: 0, category: '', images: [] })
    const [imgs, setImgs] = useState([])
    const [isLoading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const navigate = useNavigate()
    const handleChange = (e) => {
        setCar({ ...car, [e.target.name]: e.target.value })
    }
    const onError = (err) => {
        console.log(err)
        setError(err.message)
    };

    const onSuccess = (res) => {
        setImgs([...imgs, { name: res.name, id: res.fileId }])
        setLoading(false)
    };


    const onUploadStart = evt => {
        if (!error) {
            setLoading(true)

        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!isLoading) {
            try {
                await axios.post(`${url}/cars/new`, { ...car, images: imgs }, { withCredentials: true })
                navigate('/')
            } catch (err) {

                setError(err.response.data)
            }
        }


    }
    return <div className='container row justify-content-center align-items-center mt-5'>

        <div className="col-6">
            <h1>New Car</h1>
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
                    <input onChange={handleChange} value={car.price} name='price' type="text" className="form-control" aria-label="Dollar amount (with dot and two decimal places)" />
                    <span className="input-group-text">$</span>
                    <span className="input-group-text">0.00</span>
                </div>
                <div className="input-group my-3">
                    <button type='submit' className="btn btn-success">Submit</button>
                </div>
            </form>
            <div className="input-group mb-3">
                <IKUpload className="form-control" id="inputGroupFile01"
                    onError={onError}
                    onSuccess={onSuccess}
                    useUniqueFileName={true}
                    //onUploadProgress={onUploadProgress}
                    onUploadStart={onUploadStart}
                />
                <label className="input-group-text" htmlFor="inputGroupFile01">Upload</label>

            </div>


        </div>
        <div className="row justify-content-center align-items-center" >
            <div className="col-6">
                <h2>Uploaded Images</h2>
                <div className='d-flex flex-column align-items-center justify-content-center'>
                    {!isLoading ? imgs.map(i =>
                        < IKImage key={i.id}
                            className='w-100 my-3'
                            path={i.name}
                        />
                    ) : <Loading className='align-self-center'></Loading>}</div>


            </div>
        </div>




    </div>
}
export default Form;