import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import url from "../url"

const Login = ({ setAdmin }) => {
    const [user, setUser] = useState({ email: '', password: '' })
    const [error, setError] = useState(null)
    const navigate = useNavigate();
    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${url}/admin/login`, user, { withCredentials: true })
            setAdmin(res.data)

            return navigate("/");
        } catch (err) {
            setError(err.response.data)
        }

    }
    return <>
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-6">
                    <h1 className="mb-3">Login as Administrator</h1>
                    {error && <div className="alert alert-warning alert-dismissible fade show" role="alert">
                        {error}
                        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>}
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                            <input name='email' value={user.email} onChange={handleChange} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />

                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                            <input name="password" value={user.password} onChange={handleChange} type="password" className="form-control" id="exampleInputPassword1" />
                        </div>

                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    </>
}
export default Login