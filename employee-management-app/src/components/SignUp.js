import React from "react";
import {Link} from "react-router-dom";

function SignUp() {
    return (
        <div style={{"max-width": "600px"}} className="ms-auto me-auto">
            <h1 className="pt-4 pb-1">Sign Up</h1>
            <p>Create an account to access the employee directory.</p>
            <form className="text-start mt-3">
                <div className="form-group mb-3">
                    <label htmlFor="emailInput">Email</label>
                    <input type="email" className="form-control" id="emailInput" aria-describedby="emailHelp"
                           placeholder="Email"/>
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="usernameInput">Username</label>
                    <input type="text" className="form-control" id="usernameInput" placeholder="Username"/>
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="inputPassword">Password</label>
                    <input type="password" className="form-control" id="inputPassword" placeholder="Password"/>
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="inputConfirmPassword">Confirm Password</label>
                    <input type="password" className="form-control" id="inputConfirmPassword" placeholder="Confirm Password"/>
                </div>
                <div className="text-end">
                    <Link className="btn btn-outline-primary mt-2 me-2" to={"/login"}>Already have an account?</Link>
                    <button type="submit" className="btn btn-primary mt-2">Sign Up</button>
                </div>
            </form>
        </div>
    );
}

export default SignUp;