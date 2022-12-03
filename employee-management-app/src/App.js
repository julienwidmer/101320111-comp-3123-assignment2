import logo from './logo.svg';
import './App.css';
import Navbar from "./components/Navbar";
import EmployeeDirectory from "./components/EmployeeDirectory";

function App() {
  return (
    <div className="App">
        {/* Navigation */}
        <div className="container-fluid bg-dark">
            <div className="container">
                <Navbar name="Employee Manager Ltd."/>
            </div>
        </div>
        {/* Page Content */}
        <div className="container-fluid">
            <div className="container py-3 text-center">
                <EmployeeDirectory/>
            </div>
        </div>
    </div>
  );
}

export default App;
