import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function Analyze() {


  const handleGenerateShlok = async () => {
  setLoading(true);

  const hasValidResults = results?.rawAnalysis?.toLowerCase().includes("abnormal");

  const shlokPrompt = hasValidResults
    ? `
You are a Sanskrit scholar. Based on this CBC analysis, generate a Sanskrit shlok (2-4 lines) that offers wisdom or healing sentiments related to the detected abnormalities or health conditions. Translate it into English afterward.

CBC Analysis:
${results.rawAnalysis}
`
    : `
You are a Sanskrit scholar. Generate a general Sanskrit shlok (2-4 lines) promoting health, wellness, or balance. Then provide its English translation.
`;

  try {
    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyAr9djBWUaFBgxsc7HVJVVUofyAQZrDlMY",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ role: "user", parts: [{ text: shlokPrompt }] }],
          generationConfig: {
            temperature: 0.9,
            topK: 1,
            topP: 1,
            maxOutputTokens: 512,
          },
        }),
      }
    );

    const data = await response.json();
    const shlokText =
      data?.candidates?.[0]?.content?.parts?.[0]?.text || "No shlok returned.";

    alert("📜 Sanskrit Shlok:\n\n" + shlokText);
  } catch (error) {
    console.error("Shlok generation error:", error);
    alert("Failed to generate Sanskrit shlok. Please try again.");
  } finally {
    setLoading(false);
  }
};


  const [cbcData, setCbcData] = useState({
    wbc: "",
    rbc: "",
    hemoglobin: "",
    hematocrit: "",
    mcv: "",
    mch: "",
    mchc: "",
    rdw: "",
    platelets: "",
    neutrophils: "",
    lymphocytes: "",
    monocytes: "",
    eosinophils: "",
    basophils: "",
  });

  const [results, setResults] = useState(null);
  const [activeTab, setActiveTab] = useState("input");
  const [loading, setLoading] = useState(false); // loader state

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCbcData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAnalyze = async () => {
    setLoading(true);

    const numericData = Object.entries(cbcData).reduce((acc, [key, value]) => {
      acc[key] = value === "" ? null : parseFloat(value);
      return acc;
    }, {});

    const prompt = `
You are a medical assistant. Analyze this CBC report and return:
1. A list of abnormal values, with status (high/low), unit, and normal range.
2. Possible health conditions related to those abnormalities (name, description, and which values relate).
3. Add a medical disclaimer.

CBC Report:
${Object.entries(numericData)
  .map(([k, v]) => `${k.toUpperCase()}: ${v ?? "N/A"}`)
  .join("\n")}
`;

    try {
      const response = await fetch(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyAr9djBWUaFBgxsc7HVJVVUofyAQZrDlMY",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ role: "user", parts: [{ text: prompt }] }],
            generationConfig: {
              temperature: 0.7,
              topK: 1,
              topP: 1,
              maxOutputTokens: 1024,
            },
          }),
        }
      );

      const data = await response.json();
      const geminiText =
        data?.candidates?.[0]?.content?.parts?.[0]?.text || "No analysis returned.";
      setResults({ rawAnalysis: geminiText });
      setActiveTab("results");
    } catch (error) {
      console.error("Gemini error:", error);
      alert("Failed to analyze CBC. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-4">
      <div className="mb-4">
        <Link
          to="/analyze"
          style={{ color: "#008080" }}
          className="d-flex align-items-center text-decoration-none"
        >
          <ArrowLeft size={16} className="me-2" />
          Back to Selection
        </Link>
      </div>

      <ul className="nav nav-tabs mb-3">
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "input" ? "active" : ""}`}
            onClick={() => setActiveTab("input")}
            style={{ color: "#008080" }}
            disabled={activeTab === "input"}
          >
            Input CBC Values
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "results" ? "active" : ""}`}
            disabled={!results}
            onClick={() => setActiveTab("results")}
            style={{ color: "#008080" }}
          >
            Analysis Results
          </button>
        </li>
      </ul>

      {activeTab === "input" && (
        <div className="card">
          <div className="card-header">
            <h5>Enter Your CBC Report Values</h5>
            <p className="text-muted">Input values from your CBC report for analysis.</p>
          </div>
          <div className="card-body">
            <div className="alert alert-warning">
              <i className="bi bi-exclamation-circle-fill me-2"></i>
              <strong>Important:</strong> This tool is for educational purposes only and not a substitute for medical advice.
            </div>

            <div className="row g-3">
              {Object.entries(cbcData).map(([key, value]) => (
                <div className="col-md-6" key={key}>
                  <label className="form-label text-capitalize" htmlFor={key}>
                    {key.replace(/_/g, " ")}
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    className="form-control"
                    id={key}
                    name={key}
                    placeholder="Enter value"
                    value={value}
                    onChange={handleInputChange}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="card-footer text-end">
            {loading ? (
              <div className="text-center py-2">
                <div className="spinner-border text-info" role="status">
                  <span className="visually-hidden">Analyzing...</span>
                </div>
                <div className="mt-2 small text-muted">Analyzing your report, please wait...</div>
              </div>
            ) : (
              <button
                style={{ backgroundColor: "#008080" }}
                className="btn btn-dark w-100"
                onClick={handleAnalyze}
              >
                Analyze CBC Report
              </button>
            )}
          </div>
        </div>
      )}

      {activeTab === "results" && results && (
        <div className="card">
          <div className="card-header">
            <h5>CBC Analysis Results</h5>
            <p className="text-muted">Discuss these insights with your healthcare provider.</p>
          </div>
          <div className="card-body">
            <div className="alert alert-warning">
              <i className="bi bi-exclamation-triangle-fill me-2"></i>
              <strong>Medical Disclaimer:</strong> This analysis is informational only and not for diagnosis.
            </div>

            <div className="alert alert-info mt-4">
              <strong>AI Summary:</strong>
              <pre className="mb-0 text-muted small" style={{ whiteSpace: "pre-wrap" }}>
                {results.rawAnalysis}
              </pre>
            </div>

            <div className="bg-light p-3 rounded mt-4">
              <h6>Next Steps</h6>
              <ul>
                <li>Discuss these results with your healthcare provider</li>
                <li>Bring a copy of your complete CBC report</li>
                <li>Consider additional testing if recommended</li>
                <li>Do not change medications based on this alone</li>
              </ul>
            </div>
          </div>
          <div className="card-footer d-flex justify-content-between">
            <button
              style={{ backgroundColor: "#008080" }}
              className="btn btn-outline-light"
              onClick={() => setActiveTab("input")}
            >
              Edit Values
            </button>
            <button
              style={{ backgroundColor: "#008080" }}
              className="btn btn-dark"
              onClick={handleGenerateShlok}
              disabled={loading}
            >
              {loading ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Generating Shlok...
                </>
              ) : (
                "Generate Sanskrit Shlok"
              )}
            </button>
            <button
              style={{ backgroundColor: "#008080" }}
              className="btn btn-dark"
              onClick={() => window.print()}
            >
              Print Results
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
