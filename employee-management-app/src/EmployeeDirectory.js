import React from "react";
import axios from "axios";

export default class EmployeeDirectory extends React.Component {
    state = {
        employees: []
    }

    componentDidMount() {
        axios.get("https://101320111-comp-3123-assignment1-5pmhna0lt-julienwidmer.vercel.app/api/emp/employees")
            .then(res => {
                const employees = res.data;
                this.setState({employees});
            }, (error) => {
                console.log("Error: " + error);
            });
    }

    getEmployeeRow(employee, rowIndex) {
        return (
            <>
                <tr className="align-middle" key={rowIndex}>
                    <th scope="row">{ rowIndex + 1 }</th>
                    <td>{ employee.first_name } { employee.last_name }</td>
                    <td>{ employee.email }</td>
                    <td>{ employee.salary }</td>
                    <td>
                       <div className="row align-items-center px-2 flex-nowrap">
                           <a href="#" className="btn btn-primary col m-1">
                               View
                           </a>
                           <a href="#" className="btn btn-secondary col m-1">
                               Edit
                           </a>
                           <a href="#" className="btn btn-outline-danger col m-1">
                               Delete
                           </a>
                       </div>
                    </td>
                </tr>
            </>
        );
    }

    render() {
        return <>
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
                { this.state.employees.map((employee, index) => {
                    return this.getEmployeeRow(employee, index)
                })}
                </tbody>
            </table>
            </div>
        </>
    };
}