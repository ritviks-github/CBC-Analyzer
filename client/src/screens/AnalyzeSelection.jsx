import { useNavigate } from "react-router-dom";
import { Image, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function AnalyzeSelection() {
  const navigate = useNavigate();

  return (
    <div className="container py-5">
      <div className="mb-4">
        <Link
          to="/"
          style={{ color: "#008080" }}
          className="d-flex align-items-center text-decoration-none"
        >
          <ArrowLeft size={16} className="me-2" />
          Back to Home
        </Link>
      </div>
      
      <h2 className="text-center mb-4" style={{ color: "#008080" }}>
        Choose CBC Analysis Method
      </h2>
      <p className="text-center text-muted mb-5">
        You can analyze your CBC (Complete Blood Count) report using one of the methods below.
        If you have a scanned or photographed image of your report, choose <strong>Image-Based Analysis</strong>.
        If you have the values available in text format (like from a PDF or email), go with <strong>Text-Based Analysis</strong>.
      </p>

      <div className="row justify-content-center">
        {/* Image Analysis Card */}
        <div className="col-md-5 mb-4">
          <div
            className="card shadow-sm h-100 hover-shadow border-0"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/analyze-image")}
          >
            <div className="card-body text-center">
              <Image size={48} className="mb-3 text-info" />
              <h5 className="card-title" style={{ color: "#008080" }}>
                Image-Based Analysis
              </h5>
              <p className="card-text text-muted">
                Upload a photo or scanned CBC report. AI will extract text and provide analysis.
              </p>
              <button className="btn btn-outline-info mt-2">Start with Image</button>
            </div>
          </div>
        </div>

        {/* Text Analysis Card */}
        <div className="col-md-5 mb-4">
          <div
            className="card shadow-sm h-100 hover-shadow border-0"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/analyze-text")}
          >
            <div className="card-body text-center">
              <FileText size={48} className="mb-3 text-info" />
              <h5 className="card-title" style={{ color: "#008080" }}>
                Text-Based Analysis
              </h5>
              <p className="card-text text-muted">
                Paste CBC report values directly as text and get AI-powered insights.
              </p>
              <button className="btn btn-outline-info mt-2">Start with Text</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
