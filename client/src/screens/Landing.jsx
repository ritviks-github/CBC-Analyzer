import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function CBCAnalyzerPage() {
  const navigate = useNavigate();

  const token = localStorage.getItem("google_token");
  useEffect(() => {
    // If token exists, redirect to /landing
    if (token) {
      navigate("/landing");
    }
  }, [token, navigate]);
  useEffect(() => {

    /* global google */
    if (window.google) {
      window.google.accounts.id.initialize({
        client_id:
          "444341127125-r66lok7m12rts9kin66c1v6t2acb7h6g.apps.googleusercontent.com",
        callback: handleCredentialResponse,
      });

      window.google.accounts.id.renderButton(
        document.getElementById("googleSignInDiv"),
        {
          theme: "outline",
          size: "large",
          width: 300,
        }
      );
    }
  }, []);

  const handleCredentialResponse = (response) => {
    console.log("Encoded JWT ID token: " + response.credential);
    // Store token in localStorage
    localStorage.setItem("google_token", response.credential);
    // Redirect to /landing
    navigate("/landing");
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="py-5 bg-light text-center">
        <div className="container">
          <h1 className="display-5 fw-bold">AI-powered CBC Analyzer</h1>
          <p className="lead text-muted mt-3">
            Analyze your Complete Blood Count reports using AI and get
            personalized insights instantly.
          </p>
          <div
            id="googleSignInDiv"
            className="d-flex justify-content-center mt-4"
          ></div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-5">
        <div className="container">
          <h2 className="text-center fw-bold mb-5">Features</h2>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="card h-100 shadow-sm">
                <div className="card-body text-center">
                  <i className="bi bi-robot fs-1 text-primary mb-3"></i>
                  <h5 className="card-title">AI Interpretation</h5>
                  <p className="card-text">
                    Get AI-powered interpretations based on your CBC parameters.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 shadow-sm">
                <div className="card-body text-center">
                  <i className="bi bi-upload fs-1 text-success mb-3"></i>
                  <h5 className="card-title">Upload & Analyze</h5>
                  <p className="card-text">
                    Upload reports manually or paste values for instant analysis.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 shadow-sm">
                <div className="card-body text-center">
                  <i className="bi bi-shield-check fs-1 text-danger mb-3"></i>
                  <h5 className="card-title">Privacy First</h5>
                  <p className="card-text">
                    No data is stored. Your reports remain private and secure.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
