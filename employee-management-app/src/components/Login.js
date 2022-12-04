import React from "react";

function Login() {
    return (
        <div style={{"max-width": "600px"}} className="ms-auto me-auto">
            <h1 className="pt-4 pb-1">Login</h1>
            <p>Please login with your username to access the employee directory.</p>
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
                    <button className="btn btn-outline-primary m-2">Create an account?</button>
                    <button type="submit" className="btn btn-primary">Login</button>
                </div>
            </form>
        </div>
    );
}

export default Login;