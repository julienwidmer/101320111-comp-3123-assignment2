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
                    <th scope="row" className="px-3">{rowIndex + 1}</th>
                    <td className="px-3 text-nowrap">{employee.first_name} {employee.last_name}</td>
                    <td className="px-3">{employee.email}</td>
                    <td className="px-3">{employee.gender}</td>
                    <td className="px-3">{employee.salary}</td>
                    <td className="px-3">
                        <div className="text-nowrap">
                            {/* --- CRUD - READ --- */}
                            {/* CRUD - READ - Button trigger modal */}
                            <a href="#" className="btn btn-primary m-1">
                                View
                            </a>

                            {/* CRUD - READ - Modal */}
                            <a href="#" className="btn btn-secondary m-1">
                                Edit
                            </a>

                            {/* CRUD - REMOVE - Button trigger modal */}
                            <button data-bs-toggle="modal" data-bs-target={"#deleteEmployeeModal" + (rowIndex + 1)}
                                    className="btn btn-outline-danger m-1">
                                Delete
                            </button>
                            {/* CRUD - REMOVE - Modal */}
                            <div className="modal fade" id={"deleteEmployeeModal" + (rowIndex + 1)} tabIndex="-1"
                                 aria-labelledby={"deleteEmployeeModalLabel" + (rowIndex + 1)} aria-hidden="true">
                                <div className="modal-dialog modal-dialog-centered">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h1 className="modal-title fs-5"
                                                id={"deleteEmployeeModalLabel" + (rowIndex + 1)}>
                                                Delete from the Employee Directory?
                                            </h1>
                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"/>
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
                        </div>
                    </td>
                </tr>
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
                    <h1 className="pb-2 pt-4">Employee Directory</h1>
                    <div className="table-responsive">
                        <table className="table table-bordered table-fit">
                            <thead className="text-start">
                            <tr>
                                <th scope="col" className="px-3">#</th>
                                <th scope="col" className="px-3">Full Name</th>
                                <th scope="col" className="px-3">Email</th>
                                <th scope="col" className="px-3">Gender</th>
                                <th scope="col" className="px-3">Salary</th>
                                <th scope="col" className="px-3">Actions</th>
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