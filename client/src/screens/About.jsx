import React from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function About() {
  const token = localStorage.getItem("google_token");
  return (
    <div className="container py-5">
      {/* Back to Home */}
      <div className="mb-4">
        {token ? <Link to="/landing" style={{color:'#008080'}} className="text-teal text-decoration-none d-flex align-items-center">
                      <ArrowLeft size={16} className="me-2" />
                      Back to Home
                    </Link> :  <Link to="/" style={{color:'#008080'}} className="text-teal text-decoration-none d-flex align-items-center">
                      <ArrowLeft size={16} className="me-2" />
                      Back
                    </Link>}
      </div>

      {/* About Section */}
      <div className="mb-5">
        <h1 className="display-5 fw-bold mb-3">About CBC Analyzer</h1>
        <p className="lead text-muted">
          CBC Analyzer was created to empower individuals with a better understanding of their health through
          blood test analysis.
        </p>
      </div>

      {/* Mission and Image Section */}
      <div className="row align-items-center mb-5">
        <div className="col-md-6">
          <h2 className="h4 fw-bold mb-3">Our Mission</h2>
          <p className="text-muted">
            Our mission is to make medical information more accessible and understandable to everyone. We believe
            that by providing tools that help people interpret their medical data, we can encourage proactive
            health management and better conversations with healthcare providers.
          </p>
          <p className="text-muted">
            While we emphasize that our tool is not a replacement for professional medical advice, we aim to
            bridge the gap between raw medical data and meaningful insights that can guide your health journey.
          </p>
        </div>
        <div className="col-md-6">
          <div className="text-center">
  <img
    src="https://imageio.forbes.com/specials-images/imageserve/651bbeb1c78cc403f92a6abd/The-10-Biggest-Trends-Revolutionizing-Healthcare-In-2024/0x0.jpg?crop=2500,1405,x0,y0,safe&height=399&width=711&fit=bounds"
    alt="Medical professionals"
    className="img-fluid rounded-4 shadow"
    style={{
      maxWidth: "100%",
      height: "auto",
      border: "4px solid #e0f7f7",
      boxShadow: "0 4px 20px rgba(0, 128, 128, 0.2)"
    }}
  />
</div>

        </div>
      </div>

      {/* Team Section */}
      {/* <div className="mb-5">
        <h2 className="h4 fw-bold mb-3">The Team Behind CBC Analyzer</h2>
        <p className="text-muted mb-4">
          Our team consists of healthcare professionals, data scientists, and software engineers who are
          passionate about making healthcare more accessible through technology.
        </p>

        
      </div> */}

      {/* Approach Section */}
      <div className="mb-5">
        <h2 className="h4 fw-bold mb-3">Our Approach</h2>
        <p className="text-muted">
          CBC Analyzer uses evidence-based medical knowledge to analyze Complete Blood Count (CBC) reports. Our
          algorithm compares your values against established normal ranges and identifies patterns that may
          indicate specific health conditions.
        </p>
        <p className="text-muted">
          We continuously update our database with the latest medical research to ensure our analysis remains
          accurate and relevant. However, we always emphasize that our tool should be used as a complement to, not
          a replacement for, professional medical care.
        </p>
      </div>

      {/* Privacy Section */}
      <div className="bg-light p-4 rounded">
        <h2 className="h4 fw-bold mb-3">Our Commitment to Privacy</h2>
        <p className="text-muted">
          We understand the sensitive nature of health data. That's why CBC Analyzer processes all data locally in
          your browser. Your CBC values are never sent to our servers or stored anywhere outside your device,
          ensuring complete privacy and security.
        </p>
      </div>
    </div>
  );
}
