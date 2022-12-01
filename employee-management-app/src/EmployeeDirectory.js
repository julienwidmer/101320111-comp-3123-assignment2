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
                console.log( "Delete Employee: " + res.data);
                // Reload page
                window.location.reload();
            });
    }

    getEmployeeRow(employee, rowIndex) {
        return (
            <>
                <tr className="align-middle" key={rowIndex}>
                    <th scope="row">{rowIndex + 1}</th>
                    <td>{employee.first_name} {employee.last_name}</td>
                    <td>{employee.email}</td>
                    <td>{employee.salary}</td>
                    <td>
                        <div className="">
                            <a href="#" className="btn btn-primary m-1">
                                View
                            </a>
                            <a href="#" className="btn btn-secondary m-1">
                                Edit
                            </a>
                            {/* Button trigger modal */}
                            <button data-bs-toggle="modal" data-bs-target={"#deleteEmployeeModal" + (rowIndex + 1)}
                                    className="btn btn-outline-danger m-1">
                                Delete
                            </button>
                            {/* Modal */}
                            <div class="modal fade" id={"deleteEmployeeModal" + (rowIndex + 1)} tabindex="-1"
                                 aria-labelledby={"deleteEmployeeModalLabel" + (rowIndex + 1)} aria-hidden="true">
                                <div class="modal-dialog">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h1 class="modal-title fs-5" id={"deleteEmployeeModalLabel" + (rowIndex + 1)}>Delete from the Employee
                                                Directory?</h1>
                                            <button type="button" class="btn-close" data-bs-dismiss="modal"
                                                    aria-label="Close"></button>
                                        </div>
                                        <div class="modal-body">
                                            <p>Do you really want to delete <span
                                                className="fw-bold">"{employee.first_name} {employee.last_name}"</span> from
                                                the Employee Directory?</p>
                                        </div>
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-secondary"
                                                    data-bs-dismiss="modal">Cancel
                                            </button>
                                            <button type="button" onClick={() => { this.deleteEmployee(employee._id) }}
                                                    class="btn btn-danger">Delete
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
        if (this.state.employees.length == 0) {
            return (
                <>
                    <h1 className="pb-2 pt-4">Employee Directory</h1>
                    <p className="text-muted">There are no employees stored in the the Employee Directory.</p>
                </>
            )
        } else {
            return (
                <>
                    <h1 className="pb-2 pt-4">Employee Directory</h1>
                    <div className="table-responsive">
                        <table className="table table-bordered">
                            <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Full Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Salary</th>
                                <th scope="col">Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.state.employees.map((employee, index) => {
                                return this.getEmployeeRow(employee, index)
                            })}
                            </tbody>
                        </table>
                    </div>
                    <p className="text-muted">There { this.state.employees.length > 1 ? "are " + this.state.employees.length + "employees" : "is 1 employee" } stored in the the Employee Directory.</p>
                </>
            )
        }
    }
}