import React, { useEffect } from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function Home() {
    const navigate = useNavigate();
    

    const token = localStorage.getItem("google_token");
    useEffect(()=>{
        if(!token){
            navigate("/");
        }
    }, [token, navigate]);

    
  return (
    <div>
      <div style={{backgroundColor:'#F0F8F8',height:'92vh',display:'flex',flexDirection:'column',justifyContent:'center'}} className="flex-grow">
        <section className="py-5 py-md-6 py-lg-7 bg-teal-50">
            <div className="container px-4 px-md-5">
            <div className="text-center d-flex flex-column align-items-center justify-content-center gap-3">
                <div>
                <h1 className="fw-bold display-5">
                    CBC Report Analysis Tool
                </h1>
                <p className="text-muted fs-5 mx-auto" style={{ maxWidth: '700px' }}>
                    Upload your CBC report data and get instant analysis of possible health conditions based on your results.
                </p>
                </div>
                <div className="d-flex flex-wrap gap-3 justify-content-center">
                <Link to="/analyze" className="btn btn-dark">
                    Analyze Your CBC Report
                </Link>
                <a href="#sectionB" className="btn btn-outline-dark">
                    Learn More
                </a>
                </div>
            </div>
            </div>
        </section>
        
      </div>

      <div id = "sectionB" style={{display:'flex',flexDirection:'column',justifyContent:'center'}}>
      <section className="py-5 py-md-6" style={{ backgroundColor: '#fff' }}>
            <div className="container px-4 px-md-5">
                <div className="row g-4">
                {/* Feature 1 */}
                <div className="col-12 col-sm-6 col-md-4">
                    <div className="border p-4 rounded text-center h-100 d-flex flex-column align-items-center">
                    <div className="p-3 rounded-circle mb-3" style={{ backgroundColor: '#ccfbf1' }}>
                        <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-teal-600"
                        >
                        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                        </svg>
                    </div>
                    <h3 className="h5 fw-bold">Accurate Analysis</h3>
                    <p className="text-muted">
                        Our algorithm compares your CBC values with established medical ranges to identify potential issues.
                    </p>
                    </div>
                </div>

                {/* Feature 2 */}
                <div className="col-12 col-sm-6 col-md-4">
                    <div className="border p-4 rounded text-center h-100 d-flex flex-column align-items-center">
                    <div className="p-3 rounded-circle mb-3" style={{ backgroundColor: '#ccfbf1' }}>
                        <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-teal-600"
                        >
                        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                        </svg>
                    </div>
                    <h3 className="h5 fw-bold">Educational Resources</h3>
                    <p className="text-muted">
                        Learn about what your CBC results mean and how they relate to various health conditions.
                    </p>
                    </div>
                </div>

                {/* Feature 3 */}
                <div className="col-12 col-sm-6 col-md-4">
                    <div className="border p-4 rounded text-center h-100 d-flex flex-column align-items-center">
                    <div className="p-3 rounded-circle mb-3" style={{ backgroundColor: '#ccfbf1' }}>
                        <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-teal-600"
                        >
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                        </svg>
                    </div>
                    <h3 className="h5 fw-bold">Privacy First</h3>
                    <p className="text-muted">
                        Your health data never leaves your device. All analysis is performed locally for maximum privacy.
                    </p>
                    </div>
                </div>
                </div>
            </div>
        </section>
        <section className="py-5 py-md-6 py-lg-7" style={{ backgroundColor: '#f3f4f6' }}>
            <div className="container px-4 px-md-5">
                <div className="text-center d-flex flex-column align-items-center gap-3">
                <div>
                    <h2 className="fw-bold display-5">
                    Ready to analyze your CBC report?
                    </h2>
                    <p className="text-muted fs-5 mx-auto" style={{ maxWidth: '700px' }}>
                    Get insights into your health based on your blood work in just a few minutes.
                    </p>
                </div>
                <div>
                    <Link to='/analyze' className="btn btn-dark btn-lg">
                    Start Analysis Now
                    </Link>
                </div>
                </div>
            </div>
        </section>
        
        </div>
    </div>
  )
}
