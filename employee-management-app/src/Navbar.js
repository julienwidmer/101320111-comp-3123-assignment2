import React from "react";

function Navbar(props) {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <a className="navbar-brand" href="#">{props.name}</a>
            <button type="button" className="navbar-toggler collapsed" data-bs-toggle="collapse"
                    data-bs-target="#navbarAdvanced" aria-controls="navbarAdvanced" aria-expanded="false"
                    aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="navbar-collapse collapse" id="navbarAdvanced">
                <ul className="navbar-nav mb-2 mb-lg-0 me-auto">
                    <li className="nav-item">
                        <a className="nav-link" href="#">Employee Directory</a>
                    </li>
                </ul>
                <a href="#" className="btn btn-primary ms-auto">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                         className="bi bi-person-fill-add me-2" viewBox="0 0 16 16">
                        <path
                            d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0Zm-2-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"></path>
                        <path
                            d="M2 13c0 1 1 1 1 1h5.256A4.493 4.493 0 0 1 8 12.5a4.49 4.49 0 0 1 1.544-3.393C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4Z"></path>
                    </svg>
                    Add a New Employee
                </a>
            </div>
        </nav>
    );
}

export default Navbar;