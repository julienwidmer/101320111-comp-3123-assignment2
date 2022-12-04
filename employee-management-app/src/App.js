import './App.css';
import EmployeeDirectory from "./components/EmployeeDirectory";
import Login from "./components/Login";
import React, {useState} from "react";
import axios from "axios";
import {BrowserRouter as Router, Routes, Route, Link, Navigate} from "react-router-dom";
import EmployeeForm from "./components/EmployeeForm";
import SignUp from "./components/SignUp";

function App() {
    const [employees, setEmployees] = useState([]);
    const [user, setUser] = useState([]);

    function addNewEmployee(newValue) {
        employees.push(newValue);
        setEmployees(employees);
    }

    function signOut() {
        // Logout
        setUser([]);

        // Redirect guest to login page
        return <Navigate to="/login"/>
    }

    // Fetch data
    axios.get("https://101320111-comp-3123-assignment1.vercel.app/api/emp/employees")
        .then(res => {
            const employees = res.data;
            setEmployees(employees);
        }, (error) => {
            console.log("Error: " + error);
        });

    return (
        <Router>
            {/* Navigation */}
            <div className="container-fluid bg-dark">
                <div className="container">
                    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                        <div className="d-flex flex-nowrap" id="mobileNavbar">
                            <Link className="navbar-brand fw-bold my-0 d-inline-block text-truncate" to="/">
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor"
                                     className="bi bi-buildings me-2 mb-1" viewBox="0 0 16 16">
                                    <path
                                        d="M14.763.075A.5.5 0 0 1 15 .5v15a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5V14h-1v1.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V10a.5.5 0 0 1 .342-.474L6 7.64V4.5a.5.5 0 0 1 .276-.447l8-4a.5.5 0 0 1 .487.022ZM6 8.694 1 10.36V15h5V8.694ZM7 15h2v-1.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5V15h2V1.309l-7 3.5V15Z"/>
                                    <path
                                        d="M2 11h1v1H2v-1Zm2 0h1v1H4v-1Zm-2 2h1v1H2v-1Zm2 0h1v1H4v-1Zm4-4h1v1H8V9Zm2 0h1v1h-1V9Zm-2 2h1v1H8v-1Zm2 0h1v1h-1v-1Zm2-2h1v1h-1V9Zm0 2h1v1h-1v-1ZM8 7h1v1H8V7Zm2 0h1v1h-1V7Zm2 0h1v1h-1V7ZM8 5h1v1H8V5Zm2 0h1v1h-1V5Zm2 0h1v1h-1V5Zm0-2h1v1h-1V3Z"/>
                                </svg>
                                Employee Manager Ltd.
                            </Link>
                            <button type="button" className="navbar-toggler collapsed ms-auto me-0"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#navbarAdvanced" aria-controls="navbarAdvanced"
                                    aria-expanded="false"
                                    aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                        </div>
                        <div className="navbar-collapse collapse text-center" id="navbarAdvanced">
                            <ul className="navbar-nav mb-2 mb-lg-0 me-auto">
                                <li className="nav-item">
                                    <Link className="nav-link" to="/">Employee Directory</Link>
                                </li>
                            </ul>
                            {() => {
                                /* CRUD - CREATE - Button trigger modal */
                                // TODO: Implement login
                                const userIsLogged = false;

                                if (userIsLogged) {
                                    <>
                                        <button data-bs-toggle="modal" onClick={() => signOut()}
                                                className="btn btn-secondary me-3">
                                            Logout
                                        </button>
                                        <button data-bs-toggle="modal" data-bs-target="#createEmployeeModal"
                                                className="btn btn-primary ms-auto">
                                            New Employee
                                        </button>
                                    </>
                                }
                            }}
                            {/* CRUD - CREATE - Modal */}
                            <div className="modal fade text-start" id="createEmployeeModal" tabIndex="-1"
                                 aria-labelledby="createEmployeeModalLabel" aria-hidden="true">
                                <div className="modal-dialog modal-dialog-centered">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h1 className="modal-title fs-5"
                                                id="createEmployeeModalLabel">
                                                Create Employee
                                            </h1>
                                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                                    aria-label="Close"/>
                                        </div>
                                        {<EmployeeForm employee={{}} editMode={true} addNewEmployee={addNewEmployee}/>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
            {/* Page Content */}
            <div className="container-fluid">
                <div className="container py-3 text-center">
                    {/* Switch */}
                    <Routes>
                        <Route path="/" element={<EmployeeDirectory employees={employees}/>}/>
                        <Route path="/login" element={<Login/>}/>
                        <Route path="/signup" element={<SignUp/>}/>
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;
