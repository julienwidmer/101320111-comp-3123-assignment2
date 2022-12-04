import React from "react";
import {Link, Navigate} from "react-router-dom";
import {useState} from "react";
import axios from "axios";

function Login(props) {
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    function handleSubmit(event) {
        // Prevent page refresh
        event.preventDefault();

        // Create Employee JSON
        const userCredentials = {
            username: event.target.elements.username.value,
            password: event.target.elements.password.value
        }

        // Verify user credentials
        axios.post("https://101320111-comp-3123-assignment1.vercel.app/api/user/login", userCredentials)
            .then(res => {
                // Success -> Redirect to homepage
                props.loginUser();
                setSuccess("You have been successfully logged in!");
            }).catch(error => {
                // Error -> Display error message
                setError(error.response.data.message);
        });

    }

    return (
        <div style={{"maxWidth": "600px"}} className="ms-auto me-auto">
            <h1 className="pt-4 pb-1">Login</h1>
            <p>Login with your username and password to access the employee directory.</p>
            <form className="text-start mt-3" onSubmit={event => (handleSubmit(event))}>
                <div className="form-group mb-3">
                    <label htmlFor="usernameInput">Username</label>
                    <input type="text" className="form-control" id="usernameInput" aria-describedby="emailHelp"
                           placeholder="Username" name="username"/>
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="inputPassword">Password</label>
                    <input type="password" className="form-control" id="inputPassword" placeholder="Password"
                           name="password"/>
                </div>
                <div className="mb-3 alert alert-danger" role="alert" hidden={!error}>
                    <span className="fw-bold">Error:</span> {error}
                </div>
                <div className="mb-3 alert alert-success" role="alert" hidden={!success}>
                    {success}<br/>
                    <Link className="alert-link mt-2" to={"/"}>Browse the Employee Directory</Link>
                </div>
                <div className="text-end">
                    <Link className="btn btn-outline-primary mt-2 me-2" to={"/signup"}>Create an account?</Link>
                    <button type="submit" className="btn btn-primary mt-2">Login</button>
                </div>
            </form>
        </div>
    );
}

export default Login;