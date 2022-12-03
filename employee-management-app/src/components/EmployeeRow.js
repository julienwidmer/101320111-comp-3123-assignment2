import React, {useState} from "react";
import EmployeeForm from "./EmployeeForm";
import axios from "axios";

function EmployeeRow(props) {
    const [employee, setEmployee] = useState(props.employee);
    const rowIndex = props.rowIndex + 1;

    function updateEmployee(newValue) {
        setEmployee(newValue);
    }

    function deleteEmployee(id) {
        axios.delete("https://101320111-comp-3123-assignment1.vercel.app/api/emp/employees?eid=" + id)
            .then(res => {
                console.log("Delete Employee: " + res.data);
                // Reload page
                window.location.reload();
            });
    }

    return (
        <>
            <tr className="align-middle">
                <th scope="row" className="px-4 py-3">{rowIndex}</th>
                <td className="px-4 py-3 text-nowrap">{employee.first_name} {employee.last_name}</td>
                <td className="px-4 py-3">{employee.email}</td>
                <td className="px-4 py-3">{employee.gender}</td>
                <td className="px-4 py-3 text-nowrap">C$ {employee.salary.toLocaleString('en-CA')}</td>
                <td className="px-4 py-3">
                    {/* --- CRUD - Buttons --- */}
                    <div className="text-nowrap">
                        {/* CRUD - READ - Button trigger modal */}
                        <button data-bs-toggle="modal" data-bs-target={"#viewEmployeeModal" + (rowIndex)}
                                className="btn btn-primary">
                            View
                        </button>

                        {/* CRUD - UPDATE - Button trigger modal */}
                        <button data-bs-toggle="modal" data-bs-target={"#editEmployeeModal" + (rowIndex)}
                                className="btn btn-secondary mx-2">
                            Edit
                        </button>

                        {/* CRUD - REMOVE - Button trigger modal */}
                        <button data-bs-toggle="modal" data-bs-target={"#deleteEmployeeModal" + (rowIndex)}
                                className="btn btn-danger">
                            Delete
                        </button>
                    </div>

                    {/* --- CRUD - Modals --- */}
                    {/* CRUD - READ - Modal */}
                    <div className="modal fade" id={"viewEmployeeModal" + (rowIndex)} tabIndex="-1"
                         aria-labelledby={"viewEmployeeModalLabel" + (rowIndex)} aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h1 className="modal-title fs-5"
                                        id={"viewEmployeeModalLabel" + (rowIndex)}>
                                        View Employee
                                    </h1>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal"
                                            aria-label="Close"/>
                                </div>
                                {<EmployeeForm employee={employee} editMode={false}/>}
                            </div>
                        </div>
                    </div>

                    {/* CRUD - UPDATE - Modal */}
                    <div className="modal fade" id={"editEmployeeModal" + (rowIndex)} tabIndex="-1"
                         aria-labelledby={"editEmployeeModalLabel" + (rowIndex)} aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h1 className="modal-title fs-5"
                                        id={"editEmployeeModalLabel" + (rowIndex)}>
                                        Edit Employee
                                    </h1>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal"
                                            aria-label="Close"/>
                                </div>
                                {<EmployeeForm employee={employee} updateEmployee={updateEmployee} editMode={true}/>}
                            </div>
                        </div>
                    </div>

                    {/* CRUD - DELETE - Modal */}
                    <div className="modal fade" id={"deleteEmployeeModal" + (rowIndex)} tabIndex="-1"
                         aria-labelledby={"deleteEmployeeModalLabel" + (rowIndex)} aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h1 className="modal-title fs-5"
                                        id={"deleteEmployeeModalLabel" + (rowIndex)}>
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
                                    <button type="button" onClick={() => { deleteEmployee(employee._id) }}
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

export default EmployeeRow;