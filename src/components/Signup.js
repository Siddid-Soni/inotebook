import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";

const Signup = (props) => {

    const[credentials, setCredentials]=useState({name: '', email: "", password: ""})

    let history = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const {name, email, password} = credentials
        const response = await fetch("http://localhost:5000/api/auth/createuser/",{
            method: 'POST',
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({name, email, password})
        })

        const json = await response.json()

        if (json.success) {
            //redirect
            localStorage.setItem("_inoihb@%$21", json.authtoken)
            history("/")
            props.setAlert("Account Created successfully!", "success")

        }
        else {
            if (json.error === "emailexists") {
                document.getElementById("email").className = "form-control is-invalid"
            }
        }

    }

    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]:e.target.value})
    }

    return (
        <div className="mt-4 container">
            <div className="mb-3 row justify-content-center">
                <div className="col-5 fs-2" style={{width: "32rem"}}>Join today</div>
            </div>
            <div className="row justify-content-center"><hr className="col-5" style={{width: "32rem"}} /></div>
            <div className="row justify-content-center">
                <form className="col-5 mb-4" style={{width: "32rem"}} onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">User Name*</label>
                        <input onChange={onChange} type="text" className="form-control" name="name" id="name" aria-describedby="nameHelp" autoComplete="username" required/>
                        <div id="nameHelp" className="form-text">minimum 5 characters</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address*</label>
                        <input onChange={onChange} type="email" className="form-control" id="email" placeholder="name@example.com" aria-describedby="emailHelp validationServerUsernameFeedback" name="email" autoComplete="username" required/>
                        <div id="validationServerUsernameFeedback" className="invalid-feedback">
                            Email already exits please login!
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input onChange={onChange} className="form-control" name="password" type="password" id="password" aria-describedby="passwordHelp" autoComplete="current-password" required/>
                        <div id="passwordHelp" className="form-text">
                            <ul>
                                <li>Your password can’t be too similar to your other personal information.</li>
                                <li>Your password must contain at least 8 characters.</li>
                                <li>Your password can’t be a commonly used password.</li>
                                <li>Your password can’t be entirely numeric.</li>
                                <li>Your password should have one alphaNumeric, numeric and one Uppercase and lowercase</li>
                            </ul>
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                        <input onChange={onChange} className="form-control" name="cpassword" type="password" id="cpassword" aria-describedby="cpasswordHelp" autoComplete="current-password" required/>
                        <div id="cpasswordHelp" className="form-text">Enter the same password as before, for verification.</div>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default Signup;