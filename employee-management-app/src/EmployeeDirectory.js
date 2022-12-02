import React from "react";
import axios from "axios";

export default class EmployeeDirectory extends React.Component {
    state = {
        employees: []
    }

    componentDidMount() {
        axios.get("https://101320111-comp-3123-assignment1-kywgwqq8m-julienwidmer.vercel.app/api/emp/employees")
            .then(res => {
                const employees = res.data;
                this.setState({employees});
            }, (error) => {
                console.log("Error: " + error);
            });
    }

    deleteEmployee(id) {
        axios.delete("https://101320111-comp-3123-assignment1-kywgwqq8m-julienwidmer.vercel.app/api/emp/employees?eid=" + id)
            .then(res => {
                console.log("Delete Employee: " + res.data);
                // Reload page
                window.location.reload();
            });
    }

    getEmployeeRow(employee, rowIndex) {
        employee._id = employee._id ? employee._id : undefined;
        employee.first_name = employee.first_name ? employee.first_name : "Unknown";
        employee.last_name = employee.last_name ? employee.last_name : "Unknown";
        employee.email = employee.email ? employee.email : "Unknown";
        employee.gender = employee.gender ? employee.gender : "Unknown";
        employee.salary = employee.salary ? employee.salary : 0;

        return (
            <>
                <tr className="align-middle" key={rowIndex}>
                    <th scope="row" className="px-4 py-3">{rowIndex + 1}</th>
                    <td className="px-4 py-3 text-nowrap">{employee.first_name} {employee.last_name}</td>
                    <td className="px-4 py-3">{employee.email}</td>
                    <td className="px-4 py-3">{employee.gender}</td>
                    <td className="px-4 py-3">C$ {employee.salary.toLocaleString('en-CA')}</td>
                    <td className="px-4 py-3">
                        {/* --- CRUD - Buttons --- */}
                        <div className="text-nowrap">
                            {/* CRUD - READ - Button trigger modal */}
                            <button data-bs-toggle="modal" data-bs-target={"#viewEmployeeModal" + (rowIndex + 1)}
                                    className="btn btn-primary">
                                View
                            </button>

                            {/* CRUD - UPDATE - Button trigger modal */}
                            <button data-bs-toggle="modal" data-bs-target={"#editEmployeeModal" + (rowIndex + 1)}
                                    className="btn btn-secondary mx-2">
                                Edit
                            </button>

                            {/* CRUD - REMOVE - Button trigger modal */}
                            <button data-bs-toggle="modal" data-bs-target={"#deleteEmployeeModal" + (rowIndex + 1)}
                                    className="btn btn-danger">
                                Delete
                            </button>
                        </div>

                        {/* --- CRUD - Modals --- */}
                        {/* CRUD - READ - Modal */}
                        <div className="modal fade" id={"viewEmployeeModal" + (rowIndex + 1)} tabIndex="-1"
                             aria-labelledby={"viewEmployeeModalLabel" + (rowIndex + 1)} aria-hidden="true">
                            <div className="modal-dialog modal-dialog-centered">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h1 className="modal-title fs-5"
                                            id={"viewEmployeeModalLabel" + (rowIndex + 1)}>
                                            View Employee
                                        </h1>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal"
                                                aria-label="Close"/>
                                    </div>
                                    { this.getEmployeeForm(employee, false) }
                                </div>
                            </div>
                        </div>

                        {/* CRUD - Edit - Modal */}
                        <div className="modal fade" id={"editEmployeeModal" + (rowIndex + 1)} tabIndex="-1"
                             aria-labelledby={"editEmployeeModalLabel" + (rowIndex + 1)} aria-hidden="true">
                            <div className="modal-dialog modal-dialog-centered">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h1 className="modal-title fs-5"
                                            id={"editEmployeeModalLabel" + (rowIndex + 1)}>
                                            Edit Employee
                                        </h1>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal"
                                                aria-label="Close"/>
                                    </div>
                                    { this.getEmployeeForm(employee, true) }
                                </div>
                            </div>
                        </div>

                        {/* CRUD - REMOVE - Modal */}
                        <div className="modal fade" id={"deleteEmployeeModal" + (rowIndex + 1)} tabIndex="-1"
                             aria-labelledby={"deleteEmployeeModalLabel" + (rowIndex + 1)} aria-hidden="true">
                            <div className="modal-dialog modal-dialog-centered">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h1 className="modal-title fs-5"
                                            id={"deleteEmployeeModalLabel" + (rowIndex + 1)}>
                                            Delete Employee
                                        </h1>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal"
                                                aria-label="Close"/>
                                    </div>
                                    <div className="modal-body">
                                        <p>Do you really want to delete <span
                                            className="fw-bold">"{employee.first_name} {employee.last_name}"</span> from
                                            the Employee Directory?</p>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary"
                                                data-bs-dismiss="modal">Cancel
                                        </button>
                                        <button type="button" onClick={() => {
                                            this.deleteEmployee(employee._id)
                                        }}
                                                className="btn btn-danger">Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </td>
                </tr>
            </>
        );
    }

    getEmployeeForm(employee, editMode) {
        return (
            <>
                <form>
                    <div className="modal-body">
                        {/* First Name */}
                        <div className="mb-3">
                            <label htmlFor="inputFirstName" className="form-label">First Name</label>
                            <input type="text" className="form-control"
                                   placeholder="First Name" id="inputFirstName" disabled={ !editMode }
                                   value={ employee.first_name }/>
                        </div>

                        {/* Last Name */}
                        <div className="mb-3">
                            <label htmlFor="inputLastName" className="form-label">Last Name</label>
                            <input type="text" className="form-control"
                                   placeholder="Last Name" id="inputLastName" disabled={ !editMode }
                                   value={ employee.last_name }/>
                        </div>

                        {/* Email */}
                        <div className="mb-3">
                            <label htmlFor="inputEmail" className="form-label">Email</label>
                            <input type="email" className="form-control"
                                   placeholder="Email" id="inputEmail" disabled={ !editMode } value={ employee.email }/>
                        </div>

                        {/* Gender */}
                        <div className="mb-3">
                            <label htmlFor="inputGender" className="form-label">Gender</label>
                            <select className="form-select" aria-label="Gender"
                                    id="inputGender" disabled={ !editMode }>
                                <option>- Select an option -</option>
                                <option value="1" selected={ employee.gender === "Male" }>Male</option>
                                <option value="2" selected={ employee.gender === "Female" }>Female</option>
                                <option value="3" selected={ employee.gender === "Other" }>Other</option>
                            </select>
                        </div>

                        {/* Salary */}
                        <div className="mb-3">
                            <label htmlFor="inputSalary" className="form-label">Salary</label>
                            <div className="input-group w-100">
                                <span className="input-group-text" id="inputSalary">C$</span>
                                <input type="number" className="form-control"
                                       placeholder="Enter an amount"
                                       aria-label="Enter an amount"
                                       aria-describedby="inputSalary" disabled={ !editMode } value={ employee.salary }/>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" hidden={ !editMode }>Cancel</button>
                        <button type="submit" className="btn btn-primary" hidden={ !editMode }>Save Changes</button>
                        <button type="button" className="btn btn-primary" data-bs-dismiss="modal" hidden={ editMode } >Close</button>
                    </div>
                </form>
            </>
        );
    }

    render() {
        if (this.state.employees.length === 0) {
            return (
                <>
                    <h1 className="pb-2 pt-4">Employee Directory</h1>
                    <p className="text-muted p-3">There are no employees stored in the the Employee Directory.</p>
                </>
            )
        } else {
            return (
                <>
                    <h1 className="pt-4 pb-3">Employee Directory</h1>
                    <div className="table-responsive">
                        <table className="table table-striped table-fit border">
                            <thead className="text-start">
                            <tr>
                                <th scope="col" className="px-4 py-2">#</th>
                                <th scope="col" className="px-4 py-2">Full Name</th>
                                <th scope="col" className="px-4 py-2">Email</th>
                                <th scope="col" className="px-4 py-2">Gender</th>
                                <th scope="col" className="px-4 py-2">Salary</th>
                                <th scope="col" className="px-4 py-2">Actions</th>
                            </tr>
                            </thead>
                            <tbody className="text-start">
                            {this.state.employees.map((employee, index) => {
                                return this.getEmployeeRow(employee, index)
                            })}
                            </tbody>
                        </table>
                    </div>
                    <p className="text-muted p-3">There {this.state.employees.length > 1 ? "are " + this.state.employees.length + " employees" : "is 1 employee"} stored
                        in the the Employee Directory.</p>
                </>
            )
        }
    }
}