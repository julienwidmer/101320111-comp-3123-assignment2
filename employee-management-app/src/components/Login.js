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
                setSuccess("You have been successfully authenticated!");
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
                <div className="mb-3 alert alert-success text-center" role="alert" hidden={!success}>
                    {success}<br/>
                    <Link className="btn btn-success mt-2 btn-lg" to={"/"}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                             className="bi bi-search me-2 mb-1" viewBox="0 0 16 16">
                            <path
                                d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                        </svg>
                        Browse Employee Directory
                    </Link>
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