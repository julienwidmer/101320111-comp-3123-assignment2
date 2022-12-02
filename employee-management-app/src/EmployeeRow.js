import React from "react";
import EmployeeForm from "./EmployeeForm";

export default class EmployeeRow extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            employee: {
                _id: props.employee._id ? props.employee._id : undefined,
                first_name: props.employee.first_name ? props.employee.first_name : "",
                last_name: props.employee.last_name ? props.employee.last_name : "",
                email: props.employee.email ? props.employee.email : "",
                gender: props.employee.gender ? props.employee.gender : "",
                salary: props.employee.salary ? props.employee.salary : 0
            },
            rowIndex: props.rowIndex + 1
        };
    }

    render() {
        return (
            <>
                <tr className="align-middle">
                    <th scope="row" className="px-4 py-3">{this.state.rowIndex}</th>
                    <td className="px-4 py-3 text-nowrap">{this.state.employee.first_name} {this.state.employee.last_name}</td>
                    <td className="px-4 py-3">{this.state.employee.email}</td>
                    <td className="px-4 py-3">{this.state.employee.gender}</td>
                    <td className="px-4 py-3">C$ {this.state.employee.salary.toLocaleString('en-CA')}</td>
                    <td className="px-4 py-3">
                        {/* --- CRUD - Buttons --- */}
                        <div className="text-nowrap">
                            {/* CRUD - READ - Button trigger modal */}
                            <button data-bs-toggle="modal" data-bs-target={"#viewEmployeeModal" + (this.state.rowIndex)}
                                    className="btn btn-primary">
                                View
                            </button>

                            {/* CRUD - UPDATE - Button trigger modal */}
                            <button data-bs-toggle="modal" data-bs-target={"#editEmployeeModal" + (this.state.rowIndex)}
                                    className="btn btn-secondary mx-2">
                                Edit
                            </button>

                            {/* CRUD - REMOVE - Button trigger modal */}
                            <button data-bs-toggle="modal" data-bs-target={"#deleteEmployeeModal" + (this.state.rowIndex)}
                                    className="btn btn-danger">
                                Delete
                            </button>
                        </div>

                        {/* --- CRUD - Modals --- */}
                        {/* CRUD - READ - Modal */}
                        <div className="modal fade" id={"viewEmployeeModal" + (this.state.rowIndex)} tabIndex="-1"
                             aria-labelledby={"viewEmployeeModalLabel" + (this.state.rowIndex)} aria-hidden="true">
                            <div className="modal-dialog modal-dialog-centered">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h1 className="modal-title fs-5"
                                            id={"viewEmployeeModalLabel" + (this.state.rowIndex)}>
                                            View Employee
                                        </h1>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal"
                                                aria-label="Close"/>
                                    </div>
                                    { <EmployeeForm employee={this.state.employee} editMode={false}/> }
                                </div>
                            </div>
                        </div>

                        {/* CRUD - Edit - Modal */}
                        <div className="modal fade" id={"editEmployeeModal" + (this.state.rowIndex)} tabIndex="-1"
                             aria-labelledby={"editEmployeeModalLabel" + (this.state.rowIndex)} aria-hidden="true">
                            <div className="modal-dialog modal-dialog-centered">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h1 className="modal-title fs-5"
                                            id={"editEmployeeModalLabel" + (this.state.rowIndex)}>
                                            Edit Employee
                                        </h1>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal"
                                                aria-label="Close"/>
                                    </div>
                                    { <EmployeeForm employee={this.state.employee} editMode={true}/> }
                                </div>
                            </div>
                        </div>

                        {/* CRUD - REMOVE - Modal */}
                        <div className="modal fade" id={"deleteEmployeeModal" + (this.state.rowIndex)} tabIndex="-1"
                             aria-labelledby={"deleteEmployeeModalLabel" + (this.state.rowIndex)} aria-hidden="true">
                            <div className="modal-dialog modal-dialog-centered">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h1 className="modal-title fs-5"
                                            id={"deleteEmployeeModalLabel" + (this.state.rowIndex)}>
                                            Delete Employee
                                        </h1>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal"
                                                aria-label="Close"/>
                                    </div>
                                    <div className="modal-body">
                                        <p>Do you really want to delete <span
                                            className="fw-bold">"{this.state.employee.first_name} {this.state.employee.last_name}"</span> from
                                            the Employee Directory?</p>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary"
                                                data-bs-dismiss="modal">Cancel
                                        </button>
                                        <button type="button" onClick={() => {
                                            this.deleteEmployee(this.state.employee._id)
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
}