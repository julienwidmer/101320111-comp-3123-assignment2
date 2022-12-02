import React from "react";
import axios from "axios";

export default class EmployeeForm extends React.Component {
    constructor(props){
        super(props);
        this.setState(props.employee);
    }

    handleSubmit(event, id) {
        // Prevent page refresh
        event.preventDefault();

        // Create Employee JSON
        const newEmployeeInfo = {
            first_name: event.target.elements.firstName.value,
            last_name: event.target.elements.lastName.value,
            email: event.target.elements.email.value,
            gender: event.target.elements.gender.value,
            salary: event.target.elements.salary.value
        }

        // TODO: On cancel button reset props? from state? YESY???
        //TODO: Display validation error message
        // Update Employee
        axios.put("https://101320111-comp-3123-assignment1-kywgwqq8m-julienwidmer.vercel.app/api/emp/employees/" + this.props.employee._id, newEmployeeInfo)
            .then(res => {
                // Reload page
                window.location.reload();
            });
    }

    render() {
        return (
            <>
                <form onSubmit={event => (this.handleSubmit(event, this.props.employee._id))}>
                    <div className="modal-body">
                        {/* First Name */}
                        <div className="mb-3">
                            <label htmlFor="inputFirstName" className="form-label">First Name</label>
                            <input type="text" className="form-control"
                                   placeholder="First Name" id="inputFirstName" disabled={ !this.props.editMode }
                                   name="firstName"
                                   defaultValue={ this.props.employee.first_name }/>
                        </div>

                        {/* Last Name */}
                        <div className="mb-3">
                            <label htmlFor="inputLastName" className="form-label">Last Name</label>
                            <input type="text" className="form-control"
                                   placeholder="Last Name" id="inputLastName" disabled={ !this.props.editMode }
                                   name="lastName"
                                   defaultValue={ this.props.employee.last_name }/>
                        </div>

                        {/* Email */}
                        <div className="mb-3">
                            <label htmlFor="inputEmail" className="form-label">Email</label>
                            <input type="email" className="form-control"
                                   placeholder="Email" id="inputEmail" disabled={ !this.props.editMode }
                                   name="email"
                                   defaultValue={ this.props.employee.email }/>
                        </div>

                        {/* Gender */}
                        <div className="mb-3">
                            <label htmlFor="inputGender" className="form-label">Gender</label>
                            <select className="form-select" aria-label="Gender"
                                    id="inputGender" disabled={ !this.props.editMode } name="gender">
                                <option disabled>- Select an option -</option>
                                <option value="Male" selected={ this.props.employee.gender === "Male" }>Male</option>
                                <option value="Female" selected={ this.props.employee.gender === "Female" }>Female</option>
                                <option value="Other" selected={ this.props.employee.gender === "Other" }>Other</option>
                            </select>
                        </div>

                        {/* Salary */}
                        <div className="mb-3">
                            <label htmlFor="inputSalary" className="form-label">Salary</label>
                            <div className="input-group w-100">
                                <span className="input-group-text" id="inputSalary">C$</span>
                                <input type="number" step=".01" className="form-control" name="salary"
                                       placeholder="Enter an amount"
                                       aria-label="Enter an amount"
                                       aria-describedby="inputSalary" disabled={ !this.props.editMode }
                                       defaultValue={ this.props.employee.salary } />
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal"
                                hidden={ !this.props.editMode }>Cancel</button>
                        <button type="submit" className="btn btn-primary"
                                hidden={ !this.props.editMode }>Save Changes</button>
                        <button type="button" className="btn btn-primary" data-bs-dismiss="modal"
                                hidden={ this.props.editMode }>Close</button>
                    </div>
                </form>
            </>
        );
    }
}