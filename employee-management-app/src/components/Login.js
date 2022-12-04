import React from "react";
import {Link} from "react-router-dom";

function Login() {
    return (
        <div style={{"maxWidth": "600px"}} className="ms-auto me-auto">
            <h1 className="pt-4 pb-1">Login</h1>
            <p>Login with your username and password to access the employee directory.</p>
            <form className="text-start mt-3">
                <div className="form-group mb-3">
                    <label htmlFor="usernameInput">Username</label>
                    <input type="text" className="form-control" id="usernameInput" aria-describedby="emailHelp"
                           placeholder="Username"/>
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="inputPassword">Password</label>
                    <input type="password" className="form-control" id="inputPassword" placeholder="Password"/>
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