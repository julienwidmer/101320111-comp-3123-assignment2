import './App.css';
import Navbar from "./components/Navbar";
import EmployeeDirectory from "./components/EmployeeDirectory";
import React, {useState} from "react";
import axios from "axios";

function App() {
    const [employees, setEmployees] = useState([]);

    function addNewEmployee(newValue) {
        employees.push(newValue);
        setEmployees(employees);
    }

    // Fetch data
    axios.get("https://101320111-comp-3123-assignment1.vercel.app/api/emp/employees")
        .then(res => {
            const employees = res.data;
            setEmployees(employees);
        }, (error) => {
            console.log("Error: " + error);
        });

    return (
        <div className="App">
            {/* Navigation */}
            <div className="container-fluid bg-dark">
                <div className="container">
                    <Navbar name="Employee Manager Ltd." addNewEmployee={addNewEmployee}/>
                </div>
            </div>
            {/* Page Content */}
            <div className="container-fluid">
                <div className="container py-3 text-center">
                    <EmployeeDirectory employees={employees}/>
                </div>
            </div>
        </div>
    );
}

export default App;
