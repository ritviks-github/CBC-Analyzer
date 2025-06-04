import React from 'react';
import {Microscope} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const token = localStorage.getItem("google_token");
  const navigate = useNavigate();
  return (
    <nav className="navbar navbar-expand-md bg-light px-3 shadow-sm" style={{ borderBottom: '1px solid grey',height:'8vh' }}>
      <div className="container-fluid d-flex justify-content-between">
        <div style={{display: 'flex', alignItems: 'center'}}>
            <Microscope style={{marginRight:'10px'}} />
            <h3 className="navbar-brand mb-0">CBC Analyzer</h3>
        </div>

        {/* Toggler Button */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#buttonCollapse"
          aria-controls="buttonCollapse"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        {/* Collapsible Buttons */}
        <div className="collapse navbar-collapse justify-content-end" id="buttonCollapse">
          <div className="d-flex flex-column flex-md-row gap-2 mt-2 mt-md-0 ms-md-auto">
            <Link to='/about' className="btn btn-light">About</Link>
            <Link to='/working' className="btn btn-light">How it Works</Link>
            <Link to='/contact' className="btn btn-light">Contact</Link>
            {token ? (
              <button onClick={() => {
                localStorage.removeItem("google_token");
                navigate("/");
              }} className="btn btn-light">Logout</button>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}