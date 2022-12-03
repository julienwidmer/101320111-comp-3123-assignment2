import React from "react";
import axios from "axios";

function EmployeeForm(props) {
    const [error, setError] = React.useState(null);
    const [success, setSuccess] = React.useState(null);

    function handleSubmit(event) {
        // Prevent page refresh
        event.preventDefault();

        // Create Employee JSON
        const newEmployeeInfo = {
            first_name: event.target.elements.firstName.value,
            last_name: event.target.elements.lastName.value,
            email: event.target.elements.email.value,
            gender: event.target.elements.gender.value,
            salary: parseFloat(event.target.elements.salary.value)
        }

        if (JSON.stringify(props.employee) == "{}") {
            // Create Employee
            axios.post("https://101320111-comp-3123-assignment1.vercel.app/api/emp/employees", newEmployeeInfo)
                .then(res => {
                    // Success -> Display confirmation message
                    setSuccess("Employee created with success!");
                    setError(null);

                    //TODO: Implement React Hook to update Employee List
                }).catch(error => {
                // Error -> Display error message
                setSuccess(null);
                setError(error.response.data.message);
            });
        } else {
            console.log("UPDATE");
            console.log(newEmployeeInfo);
            // Update Employee
            axios.put("https://101320111-comp-3123-assignment1.vercel.app/api/emp/employees/" + props.employee._id, newEmployeeInfo)
                .then(res => {
                    // Success -> Display confirmation message
                    setSuccess("Employee updated with success!");
                    setError(null);

                    // Update Employee state from parent component
                    props.updateEmployee(res.data);
                }).catch(error => {
                // Error -> Display error message
                setSuccess(null);
                setError(error.response.data.message);
            });
        }
    }

    return (
        <>
            <form onSubmit={event => (handleSubmit(event))}>
                <div className="modal-body">
                    {/* First Name */}
                    <div className="mb-3">
                        <label htmlFor="inputFirstName" className="form-label">First Name</label>
                        <input type="text" className="form-control"
                               placeholder="First Name" id="inputFirstName" disabled={!props.editMode}
                               name="firstName" required={true}
                               defaultValue={props.employee.first_name}/>
                    </div>

                    {/* Last Name */}
                    <div className="mb-3">
                        <label htmlFor="inputLastName" className="form-label">Last Name</label>
                        <input type="text" className="form-control"
                               placeholder="Last Name" id="inputLastName" disabled={!props.editMode}
                               name="lastName" required={true}
                               defaultValue={props.employee.last_name}/>
                    </div>

                    {/* Email */}
                    <div className="mb-3">
                        <label htmlFor="inputEmail" className="form-label">Email</label>
                        <input type="email" className="form-control"
                               placeholder="Email" id="inputEmail" disabled={!props.editMode}
                               name="email"
                               defaultValue={props.employee.email}/>
                    </div>

                    {/* Gender */}
                    <div className="mb-3">
                        <label htmlFor="inputGender" className="form-label">Gender</label>
                        <select className="form-select"
                                aria-label="Gender" id="inputGender" disabled={!props.editMode} name="gender"
                                defaultValue={ !(JSON.stringify(props.employee) == "{}") ? props.employee.gender : "default" } required={true}>
                            <option value="default" disabled>- Select an option -</option>
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
                                   aria-describedby="inputSalary" disabled={!props.editMode}
                                   defaultValue={props.employee.salary} required={true}/>
                        </div>
                    </div>

                    <div className="mb-3 alert alert-danger" role="alert" hidden={!error}>
                        <span className="fw-bold">Error:</span> {error}
                    </div>
                    <div className="mb-3 alert alert-success" role="alert" hidden={!success}>
                        {success}
                    </div>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal"
                            hidden={!props.editMode}>Cancel
                    </button>
                    <button type="submit" className="btn btn-primary"
                            hidden={!props.editMode || (JSON.stringify(props.employee) == "{}")}>Save Changes
                    </button>
                    <button type="submit" className="btn btn-primary"
                            hidden={!(JSON.stringify(props.employee) == "{}")}>Create Employee
                    </button>
                    <button type="button" className="btn btn-primary" data-bs-dismiss="modal"
                            hidden={props.editMode}>Close
                    </button>
                </div>
            </form>
        </>
    );
}

export default EmployeeForm;