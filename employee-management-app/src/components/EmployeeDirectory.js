import React, {useState} from "react";
import EmployeeRow from "./EmployeeRow";
import { Navigate } from 'react-router-dom';

function EmployeeDirectory(props) {
    // TODO: Implement login
    const userIsLogged = false;

    if (!userIsLogged) {
        // Redirect guest to login page
        return <Navigate to="/login" />
    }

    if (props.employees.length === 0) {
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
                        {props.employees.map((employee, index) => {
                            return <EmployeeRow employee={employee} rowIndex={index} key={employee._id}/>
                        })}
                        </tbody>
                    </table>
                </div>
                <p className="text-muted p-3">There {props.employees.length > 1 ? "are " + props.employees.length + " employees" : "is 1 employee"} stored
                    in the the Employee Directory.</p>
            </>
        )
    }

}

export default EmployeeDirectory;