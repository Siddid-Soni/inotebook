import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom'

const Login = (props) => {

    const[credentials, setCredentials]=useState({email: "", password: ""})
    let history = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const response = await fetch("http://localhost:5000/api/auth/login/",{
            method: 'POST',
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email: credentials.email, password: credentials.password})
        })

        const json = await response.json()

        if (json.success) {
            //redirect
            localStorage.setItem("_inoihb@%$21", json.authtoken)
            history("/")
            props.showAlert("Logged in Successfully!", "success")

        }
        else {
            props.showAlert(`${json.error}`,"danger")
        }

    }

    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]:e.target.value})
    }

    return (
        <div className='mt-3 container'>
            <div className="row justify-content-center">
                <div className="mb-2 fs-3 col-5" style={{width: "32rem"}}>Login</div>
            </div>
            <div className="row justify-content-center">
                <hr className="col-5" style={{width: "32rem"}}/>
            </div>
            <div className="row justify-content-center">
                <form onSubmit={handleSubmit} style={{width: "32rem"}} className="col-5">
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input type="email" className="form-control" onChange={onChange} value={credentials.email} id="email" name="email" aria-describedby="email" autoComplete="username" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" onChange={onChange} value={credentials.password} id="password" name="password" autoComplete="current-password" />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default Login;