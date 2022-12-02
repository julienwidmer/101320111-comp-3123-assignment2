import React from "react";
import axios from "axios";

export default class EmployeeForm extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            employee: props.employee,
            editMode: props.editMode,
            error: false
        };
    }

    handleSubmit(event) {
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

        // PUT Request
        axios.put("https://101320111-comp-3123-assignment1-kywgwqq8m-julienwidmer.vercel.app/api/emp/employees/" + this.state.employee._id, newEmployeeInfo)
            .then(() => {
                // Success -> Reload page to display updated rows
                window.location.reload();
            }).catch(error => {
                // Error -> Display error message
                this.setState({
                    employee: this.props.employee,
                    editMode: this.props.editMode,
                    error: true
                });

                console.log("Error: " + JSON.stringify(error.response.data));
                this.forceUpdate();

                console.log(this.state);
        });
    }

    render() {
        return (
            <>
                <form onSubmit={event => (this.handleSubmit(event, this.state.employee._id))}>
                    <div className="modal-body">
                        {/* First Name */}
                        <div className="mb-3">
                            <label htmlFor="inputFirstName" className="form-label">First Name</label>
                            <input type="text" className="form-control"
                                   placeholder="First Name" id="inputFirstName" disabled={ !this.state.editMode }
                                   name="firstName"
                                   defaultValue={ this.state.employee.first_name }/>
                        </div>

                        {/* Last Name */}
                        <div className="mb-3">
                            <label htmlFor="inputLastName" className="form-label">Last Name</label>
                            <input type="text" className="form-control"
                                   placeholder="Last Name" id="inputLastName" disabled={ !this.state.editMode }
                                   name="lastName"
                                   defaultValue={ this.state.employee.last_name }/>
                        </div>

                        {/* Email */}
                        <div className="mb-3">
                            <label htmlFor="inputEmail" className="form-label">Email</label>
                            <input type="email" className="form-control"
                                   placeholder="Email" id="inputEmail" disabled={ !this.state.editMode }
                                   name="email"
                                   defaultValue={ this.state.employee.email }/>
                        </div>

                        {/* Gender */}
                        <div className="mb-3">
                            <label htmlFor="inputGender" className="form-label">Gender</label>
                            <select className="form-select"
                                    aria-label="Gender" id="inputGender" disabled={ !this.state.editMode } name="gender"
                                    defaultValue={ this.state.employee.gender }>
                                <option disabled>- Select an option -</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
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
                                       aria-describedby="inputSalary" disabled={ !this.state.editMode }
                                       defaultValue={ this.state.employee.salary } />
                            </div>
                        </div>

                        <div className="mb-3 alert alert-danger" role="alert" hidden={!this.state.error}>
                            <span className="fw-bold">Error:</span> Changes could not be saved. Please verify that the email address is not assigned to another employee or try again later.
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal"
                                hidden={ !this.state.editMode } onClick={this.closeModal}>Cancel</button>
                        <button type="submit" className="btn btn-primary"
                                hidden={ !this.state.editMode }>Save Changes</button>
                        <button type="button" className="btn btn-primary" data-bs-dismiss="modal"
                                hidden={ this.state.editMode }>Close</button>
                    </div>
                </form>
            </>
        );
    }
}