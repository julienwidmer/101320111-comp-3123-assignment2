import logo from './logo.svg';
import './App.css';
import Navbar from "./Navbar";

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
            <div className="container py-3 text-start">
                <h1>Hello World</h1>
            </div>
        </div>
    </div>
  );
}

export default App;
