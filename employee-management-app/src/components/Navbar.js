import React from "react";
import EmployeeForm from "./EmployeeForm";

function Navbar(props) {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="d-flex flex-nowrap" id="mobileNavbar">
                <a className="navbar-brand fw-bold my-0 d-inline-block text-truncate" href="#">
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor"
                         className="bi bi-buildings me-2 mb-1" viewBox="0 0 16 16">
                        <path
                            d="M14.763.075A.5.5 0 0 1 15 .5v15a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5V14h-1v1.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V10a.5.5 0 0 1 .342-.474L6 7.64V4.5a.5.5 0 0 1 .276-.447l8-4a.5.5 0 0 1 .487.022ZM6 8.694 1 10.36V15h5V8.694ZM7 15h2v-1.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5V15h2V1.309l-7 3.5V15Z"/>
                        <path
                            d="M2 11h1v1H2v-1Zm2 0h1v1H4v-1Zm-2 2h1v1H2v-1Zm2 0h1v1H4v-1Zm4-4h1v1H8V9Zm2 0h1v1h-1V9Zm-2 2h1v1H8v-1Zm2 0h1v1h-1v-1Zm2-2h1v1h-1V9Zm0 2h1v1h-1v-1ZM8 7h1v1H8V7Zm2 0h1v1h-1V7Zm2 0h1v1h-1V7ZM8 5h1v1H8V5Zm2 0h1v1h-1V5Zm2 0h1v1h-1V5Zm0-2h1v1h-1V3Z"/>
                    </svg>
                    {props.name}
                </a>
                <button type="button" className="navbar-toggler collapsed ms-auto me-0" data-bs-toggle="collapse"
                        data-bs-target="#navbarAdvanced" aria-controls="navbarAdvanced" aria-expanded="false"
                        aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
            </div>
            <div className="navbar-collapse collapse" id="navbarAdvanced">
                <ul className="navbar-nav mb-2 mb-lg-0 me-auto">
                    <li className="nav-item">
                        <a className="nav-link" href="#">Employee Directory</a>
                    </li>
                </ul>
                {/* CRUD - CREATE - Button trigger modal */}
                <button data-bs-toggle="modal" data-bs-target="#createEmployeeModal" className="btn btn-primary ms-auto">
                    New Employee
                </button>
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
                            { <EmployeeForm employee={{}} editMode={true} addNewEmployee={props.addNewEmployee}/> }
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;