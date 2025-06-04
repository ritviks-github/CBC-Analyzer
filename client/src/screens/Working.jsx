import React from 'react'
import { ArrowLeft, Microscope } from "lucide-react";
import { Link } from "react-router-dom";

export default function Working() {
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

          <div className="mb-5">
            <h1 className="display-5 fw-bold mb-3">How CBC Analyzer Works</h1>
            <p className="lead text-muted">
              Understanding how we analyze your CBC report to provide meaningful insights about your health.
            </p>
          </div>

          <div className="mb-5">
            <h2 className="h4 fw-bold mb-4">The Analysis Process</h2>
            {[
              {
                step: 1,
                title: "Input Your CBC Values",
                desc: "Enter the values from your CBC report into our form. More complete data yields more accurate analysis."
              },
              {
                step: 2,
                title: "Comparison with Normal Ranges",
                desc: "We compare your values with established medical ranges, which may vary slightly between labs."
              },
              {
                step: 3,
                title: "Pattern Recognition",
                desc: "Our system detects patterns suggesting possible conditions, like anemia or infection."
              },
              {
                step: 4,
                title: "Results Generation",
                desc: "A report is generated showing abnormal values and potential health insights."
              }
            ].map(({ step, title, desc }) => (
              <div key={step} className="d-flex mb-4">
                <div className="rounded-circle text-white d-flex justify-content-center align-items-center" style={{ width: 48, height: 48,backgroundColor: '#008080' }}>
                  {step}
                </div>
                <div className="ms-3">
                  <h5 className="fw-semibold">{title}</h5>
                  <p className="text-muted mb-0">{desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mb-5">
            <h2 className="h4 fw-bold mb-3">Understanding CBC Parameters</h2>
            <p className="text-muted">
              A Complete Blood Count (CBC) measures various components of your blood. Here's what each parameter means:
            </p>

            <div className="row gy-4 mt-3">
              <div className="col-md-6">
                <div className="card h-100">
                  <div className="card-body">
                    <h5 className="card-title fw-bold">Red Blood Cell Parameters</h5>
                    <ul className="list-unstyled mt-3">
                      {[
                        ["RBC", "Measures total red blood cells carrying oxygen."],
                        ["Hemoglobin", "Protein that carries oxygen in red blood cells."],
                        ["Hematocrit", "Percentage of blood composed of red cells."],
                        ["MCV", "Average size of red blood cells."],
                        ["MCH", "Average amount of hemoglobin per red cell."],
                        ["MCHC", "Hemoglobin concentration in red cells."],
                        ["RDW", "Variation in red cell size."]
                      ].map(([param, desc]) => (
                        <li key={param} className="mb-2">
                          <strong>{param}:</strong> <span className="text-muted">{desc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="card h-100">
                  <div className="card-body">
                    <h5 className="card-title fw-bold">White Blood Cell Parameters</h5>
                    <ul className="list-unstyled mt-3">
                      {[
                        ["WBC", "Total number of white blood cells fighting infection."],
                        ["Neutrophils", "First responders to infection."],
                        ["Lymphocytes", "Involved in immune response (B & T cells)."],
                        ["Monocytes", "Become macrophages in tissues."],
                        ["Eosinophils", "Combat parasites, involved in allergies."],
                        ["Basophils", "Least common, involved in inflammation."]
                      ].map(([param, desc]) => (
                        <li key={param} className="mb-2">
                          <strong>{param}:</strong> <span className="text-muted">{desc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="col-12">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title fw-bold">Platelet Parameters</h5>
                    <ul className="list-unstyled mt-3">
                      <li>
                        <strong>Platelets:</strong>{" "}
                        <span className="text-muted">Cell fragments that help stop bleeding by forming clots.</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-5">
            <h2 className="h4 fw-bold mb-3">Limitations of Our Analysis</h2>
            <div className="border rounded bg-warning-subtle text-warning p-4">
              <h6 className="fw-semibold mb-3">Important Considerations</h6>
              <ul className="mb-0 ps-3">
                <li>Generalized patterns; doesn’t include personal medical history.</li>
                <li>Doesn't replace professional diagnosis or lab results.</li>
                <li>Similar CBC patterns can result from different conditions.</li>
                <li>Lab ranges vary by age, gender, and location.</li>
                <li>Educational tool only — not a substitute for medical advice.</li>
              </ul>
            </div>
          </div>

          <div className="bg-light p-4 rounded">
            <h2 className="h4 fw-bold mb-3">How to Use Your Results</h2>
            <ul className="ps-3 text-muted">
              <li>Save or print your results to share with a doctor.</li>
              <li>Use the insights to prepare questions for appointments.</li>
              <li>Treat conditions as possibilities, not diagnoses.</li>
              <li>Consult healthcare professionals for further evaluation.</li>
              <li>Track CBC trends over time for better monitoring.</li>
            </ul>
          </div>
        </div>
      </main>

      
    </div>
  )
}
