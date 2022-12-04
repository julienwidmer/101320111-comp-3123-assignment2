import React from "react";
import {Link, Navigate} from "react-router-dom";
import {useState} from "react";
import axios from "axios";

function SignUp(props) {
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    function handleSubmit(event) {
        // Prevent page refresh
        event.preventDefault();

        // Create Employee JSON
        const newUserInfo = {
            username: event.target.elements.username.value,
            email: event.target.elements.email.value,
            password: event.target.elements.password.value
        }


        console.log(newUserInfo.username);
        console.log(/\s/g.test(newUserInfo.username));
        // Password requirements
        // (?=(.*\d){2}) --> 2 digits minimum
        // (?=(.*[a-z]){2}) --> 2 lowercase characters minimum
        // (?=(.*[A-Z]){2}) --> 2 uppercase characters minimum
        // (?=(.*[!@#$%*]){2}) --> 2 special symbols minimum !, @, #, $, %, *
        const passwordPattern = /(?=(.*\d){2})(?=(.*[a-z]){2})(?=(.*[A-Z]){2})(?=(.*[!@#$%*]){2})/;
        const confirmPassword = event.target.elements.confirmPassword.value;

        console.log(confirmPassword.match(passwordPattern));
        console.log(confirmPassword.length);
        // Validate input
        if (/\s/g.test(newUserInfo.username) || /\s/g.test(newUserInfo.password)) {
            setError("Username and password can't contain spaces.");
        } else if (newUserInfo.username === "") {
            setError("Username can't be empty.");
        } else if (newUserInfo.password === "") {
            setError("Password can't be empty.");
        } else if (confirmPassword !== newUserInfo.password) {
            // Error -> Display error message
            setError("Passwords are not matching.");
        } else if (confirmPassword.match(passwordPattern) && confirmPassword.length >= 12) {
            // Username contains a value and passwords are matching -> create user
            //Todo: check for email duplicate error
            //s://101320111-comp-3123-assignment1.vercel.app
            axios.post("http://localhost:8081/api/user/signup", newUserInfo)
                .then(res => {
                    // Success -> Redirect to homepage
                    props.loginUser();
                    setError(null);
                    setSuccess("Your account has been created!");
                }).catch(error => {
                // Error -> Display error message
                setError(error.response.data.message);
            });
        } else {
            // Error -> Display error message
            setError("Password is not meeting the requirements! At least 2 lowercase and 2 uppercase letters, " +
                "2 symbols (!, @, #, $, %, *), 2 digits, no spaces and at least 12 characters.");
        }
    }

    return (
        <div style={{"maxWidth": "600px"}} className="ms-auto me-auto">
            <h1 className="pt-4 pb-1">Sign Up</h1>
            <p>Create an account to access the employee directory.</p>
            <form className="text-start mt-3" onSubmit={event => (handleSubmit(event))}>
                <div className="form-group mb-3">
                    <label htmlFor="usernameInput">Username</label>
                    <input type="text" className="form-control" id="usernameInput" placeholder="Username"
                           name="username"/>
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="emailInput">Email</label>
                    <input type="email" className="form-control" id="emailInput" aria-describedby="emailHelp"
                           placeholder="Email" name="email"/>
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="inputPassword">Password</label>
                    <input type="password" className="form-control" id="inputPassword" placeholder="Password"
                           name="password"/>
                    <small id="passwordHelp" className="form-text text-muted">At least 2 lowercase and 2 uppercase
                        letters, 2 symbols (!, @, #, $, %, *), 2 digits, no spaces and at least 12 characters.</small>
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="inputConfirmPassword">Confirm Password</label>
                    <input type="password" className="form-control" id="inputConfirmPassword"
                           placeholder="Confirm Password"
                           name="confirmPassword"/>
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
                    <Link className="btn btn-outline-primary mt-2 me-2" to={"/login"}>Already have an account?</Link>
                    <button type="submit" className="btn btn-primary mt-2">Sign Up</button>
                </div>
            </form>
        </div>
    );
}

export default SignUp;