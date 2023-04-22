import { IKContext } from 'imagekitio-react'
import './App.css';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Form from './components/Form/Form';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Details from './components/Details/Details';
import Edit from './components/Edit/Edit';
import url from './url';
function ErrorBoundary({ text }) {

  return <>
    <div className="container">

      <h1 style={{ color: '#842029' }}>
        {text}
      </h1>
    </div>

  </>;
}
function App() {
  const [admin, setAdmin] = useState()
  useEffect(() => {
    axios.get(`${url}/admin/user`, { withCredentials: true })
      .then(res => setAdmin(res.data.admin))
  }, [])

  return (
    <div className="container">

      <IKContext
        publicKey="public_ezsqfPMMvU+6dKNB1MHpZQbjEiY="
        urlEndpoint="https://ik.imagekit.io/z6k3ktb71/"
        authenticationEndpoint={`${url}/auth`}>
        <BrowserRouter >
          <Navbar setAdmin={setAdmin} admin={admin} />
          <Routes>
            <Route path='/' element={<Home admin={admin} />} />
            <Route path='/car/:id' element={<Details />} />
            <Route path='/admin/login' element={<Login setAdmin={setAdmin} />} />
            <Route path='/admin/create' element={admin ? <Form /> : <ErrorBoundary text='Page Not Found' />} />
            <Route path='/car/edit/:id' element={admin ? <Edit /> : <ErrorBoundary text='Access Denied' />} />
          </Routes>

        </BrowserRouter>
      </IKContext>
    </div>

  );
}

export default App;
