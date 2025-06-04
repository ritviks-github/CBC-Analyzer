import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Tesseract from "tesseract.js";

export default function AnalyzeImage() {
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
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [results, setResults] = useState(null);
  const [activeTab, setActiveTab] = useState("input");
  const [loading, setLoading] = useState(false);
  const [ocrProgress, setOcrProgress] = useState(0);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
      setResults(null); // reset previous results
      setActiveTab("input");
    }
  };

  const handleAnalyzeImage = async () => {
    if (!image) return alert("Please upload a CBC report image first.");

    setLoading(true);
    setOcrProgress(0);
    setResults(null);

    try {
      // Step 1: OCR extract text from image using Tesseract.js
      const { data } = await Tesseract.recognize(image, "eng", {
        logger: (m) => {
          if (m.status === "recognizing text") {
            setOcrProgress(m.progress);
          }
        },
      });

      const extractedText = data.text.trim();
      if (!extractedText) {
        alert("No readable text found in image. Please upload a clearer image.");
        setLoading(false);
        return;
      }

      // Step 2: Build prompt with extracted text
      const prompt = `
You are a medical assistant. Analyze this CBC report text and return:
1. A list of abnormal values, with status (high/low), unit, and normal range.
2. Possible health conditions related to those abnormalities (name, description, and which values relate).
3. Add a medical disclaimer.

CBC Report:
${extractedText}
`;

      // Step 3: Call Gemini API with the prompt (replace API_KEY with your actual key)
      const response = await fetch(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyAr9djBWUaFBgxsc7HVJVVUofyAQZrDlMY",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: {
              temperature: 0.7,
              topK: 1,
              topP: 1,
              maxOutputTokens: 1024,
            },
          }),
        }
      );

      const dataResponse = await response.json();
      const geminiText =
        dataResponse?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "No analysis returned.";

      setResults({ rawAnalysis: geminiText, extractedText });
      setActiveTab("results");
    } catch (error) {
      console.error("Error during OCR or Gemini analysis:", error);
      alert("Failed to analyze image. Please try again.");
    } finally {
      setLoading(false);
      setOcrProgress(0);
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
        <div className="card-body text-center">
              
              <h5 className="card-title" style={{ color: "#008080" }}>
                Image-Based Analysis
              </h5>
              <p className="card-text text-muted">
                Upload a photo or scanned copy of your CBC report. Our system uses local OCR (Optical Character Recognition) to extract the text from the image.
              </p>
              <p className="card-text text-muted">
                Once the values are extracted, we analyze them using predefined medical thresholds and patterns to flag potential abnormalities and suggest common interpretations.
              </p>
              <p className="card-text text-muted">
                This method is ideal if you have a printed or handwritten report.
              </p>
              
        </div>
      <ul className="nav nav-tabs mb-3">
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "input" ? "active" : ""}`}
            onClick={() => setActiveTab("input")}
            style={{ color: "#008080" }}
            disabled={activeTab === "input"}
          >
            Upload CBC Image
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
            <h5>Upload CBC Report Image</h5>
            <p className="text-muted">
              Upload a photo or scanned copy of your CBC report for AI analysis.
            </p>
          </div>
          <div className="card-body">
            <div className="alert alert-warning">
              <strong>Note:</strong> Make sure the image is clear and readable.
            </div>

            <input
              type="file"
              accept="image/*"
              className="form-control mb-3"
              onChange={handleImageChange}
            />

            {imagePreview && (
              <div className="text-center">
                <img
                  src={imagePreview}
                  alt="CBC Preview"
                  className="img-thumbnail"
                  style={{ maxHeight: 300 }}
                />
              </div>
            )}
          </div>
          <div className="card-footer text-end">
            {loading ? (
              <>
                <div className="text-center py-2">
                  <div className="spinner-border text-info" role="status">
                    <span className="visually-hidden">Analyzing...</span>
                  </div>
                  <div className="mt-2 small text-muted">
                    {ocrProgress > 0
                      ? `Extracting text: ${(ocrProgress * 100).toFixed(0)}%`
                      : "Analyzing your report, please wait..."}
                  </div>
                </div>
              </>
            ) : (
              <button
                style={{ backgroundColor: "#008080" }}
                className="btn btn-dark w-100"
                onClick={handleAnalyzeImage}
              >
                Analyze CBC Report Image
              </button>
            )}
          </div>
        </div>
      )}

      {activeTab === "results" && results && (
        <div className="card">
          <div className="card-header">
            <h5>CBC Analysis Results</h5>
            <p className="text-muted">AI-generated insights based on uploaded image.</p>
          </div>
          <div className="card-body">
            <div className="alert alert-warning">
              <strong>Medical Disclaimer:</strong> This analysis is informational only and not for diagnosis.
            </div>

            <div className="mb-3">
              <h6>Extracted Text from Image:</h6>
              <pre
                style={{
                  whiteSpace: "pre-wrap",
                  backgroundColor: "#f8f9fa",
                  padding: "1rem",
                  borderRadius: "0.25rem",
                  maxHeight: 200,
                  overflowY: "auto",
                }}
              >
                {results.extractedText}
              </pre>
            </div>

            <div className="alert alert-info mt-4">
              <strong>AI Summary:</strong>
              <pre
                className="mb-0 text-muted small"
                style={{ whiteSpace: "pre-wrap" }}
              >
                {results.rawAnalysis}
              </pre>
            </div>

            <div className="bg-light p-3 rounded mt-4">
              <h6>Next Steps</h6>
              <ul>
                <li>Share results with your doctor</li>
                <li>Ensure a complete and legible CBC scan</li>
                <li>Repeat test if necessary for clarity</li>
              </ul>
            </div>
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
          </div>
        </div>
      )}
    </div>
  );
}
