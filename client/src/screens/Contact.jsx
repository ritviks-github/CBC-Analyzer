import React, { useState } from "react";
import { Link } from "react-router-dom"; 
import { CheckCircle, ArrowLeft, Microscope } from "lucide-react";

export default function Contact() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formState);
    setTimeout(() => {
      setIsSubmitted(true);
      setFormState({ name: "", email: "", subject: "", message: "" });
    }, 1000);
  };
  const token = localStorage.getItem("google_token");
  return (
    <div className="d-flex flex-column min-vh-100">
      
      <main className="flex-grow-1">
        <div className="container py-5">
          <div className="mb-4">
            {token ? <Link to="/landing" style={{color:'#008080'}} className="text-teal text-decoration-none d-flex align-items-center">
              <ArrowLeft size={16} className="me-2" />
              Back to Home
            </Link> :  <Link to="/" style={{color:'#008080'}} className="text-teal text-decoration-none d-flex align-items-center">
              <ArrowLeft size={16} className="me-2" />
              Back
            </Link>}
            
          </div>

          <h1 className="display-5 fw-bold mb-3">Contact Us</h1>
          <p className="lead text-muted mb-5">
            Have questions or feedback about CBC Analyzer? We'd love to hear from you.
          </p>

          <div className="row g-5">
            <div className="col-md-6">
              <div className="card shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">Send Us a Message</h5>
                  <p className="card-text mb-4">Fill out the form below and we'll get back to you.</p>

                  {isSubmitted ? (
                    <div className="text-center">
                      <CheckCircle size={48} className="text-success mb-3" />
                      <h4>Message Sent!</h4>
                      <p className="text-muted">Thank you for reaching out. We'll get back to you soon.</p>
                      <button className="btn btn-outline-primary mt-3" onClick={() => setIsSubmitted(false)}>
                        Send Another Message
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit}>
                      <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input
                          type="text"
                          className="form-control"
                          id="name"
                          name="name"
                          value={formState.name}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input
                          type="email"
                          className="form-control"
                          id="email"
                          name="email"
                          value={formState.email}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="subject" className="form-label">Subject</label>
                        <input
                          type="text"
                          className="form-control"
                          id="subject"
                          name="subject"
                          value={formState.subject}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="message" className="form-label">Message</label>
                        <textarea
                          className="form-control"
                          id="message"
                          name="message"
                          rows="5"
                          value={formState.message}
                          onChange={handleChange}
                          required
                        ></textarea>
                      </div>
                      <button type="submit" disabled={true} style={{backgroundColor:'#008080'}} className="btn btn-dark w-100">(currently sending messages is not supported, you may reach out via mail)</button>
                    </form>
                  )}
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <h5 className="mb-4 fw-bold">Other Ways to Reach Us</h5>
              <ul className="list-unstyled">
                <li className="mb-4 d-flex">
                  <div className="bg-light rounded-circle p-2 me-3 text-teal">
                    <i className="bi bi-envelope-fill"></i>
                  </div>
                  <div>
                    <h6>Email</h6>
                    <p className="text-muted">info@ayuh.com</p>
                  </div>
                </li>
                
                <li className="d-flex">
                  <div className="bg-light rounded-circle p-2 me-3 text-teal">
                    <i className="bi bi-geo-alt-fill"></i>
                  </div>
                  <div>
                    <h6>Address</h6>
                    <p className="text-muted mb-0">Ayuh Research Innovative Labs, New Delhi</p>
                    <p className="text-muted">India</p>
                  </div>
                </li>
              </ul>

              <h5 className="mt-5 mb-3 fw-bold">Frequently Asked Questions</h5>
              <div className="accordion" id="faqAccordion">
                {[
                  {
                    q: "Is CBC Analyzer a substitute for medical advice?",
                    a: "No, CBC Analyzer is an educational tool. Always consult with a qualified healthcare provider.",
                  },
                  {
                    q: "How accurate is the analysis?",
                    a: "It identifies patterns based on known guidelines. A proper diagnosis requires more clinical context.",
                  },
                  {
                    q: "Is my data secure?",
                    a: "Yes, we never store your CBC values. All processing is done locally in your browser.",
                  },
                  {
                    q: "Can I save my results for future reference?",
                    a: "Currently, you can print or screenshot results. Save features are in progress.",
                  },
                  {
                    q: "What if I don't have all the CBC values?",
                    a: "You can still use it with partial data. The analysis will be based on what’s available.",
                  },
                ].map((item, index) => (
                  <div className="accordion-item" key={index}>
                    <h2 className="accordion-header" id={`heading${index}`}>
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target={`#collapse${index}`}
                      >
                        {item.q}
                      </button>
                    </h2>
                    <div
                      id={`collapse${index}`}
                      className="accordion-collapse collapse"
                      data-bs-parent="#faqAccordion"
                    >
                      <div className="accordion-body">{item.a}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      
    </div>
  );
}
