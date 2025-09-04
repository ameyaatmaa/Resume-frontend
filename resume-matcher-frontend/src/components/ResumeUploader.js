import React, { useState } from "react";
import "./ResumeUploader.css";

const ResumeUploader = () => {
  const [file, setFile] = useState(null);
  const [userId, setUserId] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file || !userId) {
      alert("Please enter User ID and select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("userId", userId);

    setLoading(true);
    try {
      const response = await fetch("http://localhost:8084/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      setResult(data);
    } catch (err) {
      console.error(err);
      alert("Upload failed. Please check backend.");
    }
    setLoading(false);
  };

  return (
    <div className="container">
      <div className="card">
        <h1 className="title">Resume Matcher</h1>

        {/* Upload form */}
        <div className="form">
          <input
            type="text"
            placeholder="Enter User ID"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
          <input
            type="file"
            accept=".pdf,.docx"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <button onClick={handleUpload} disabled={loading}>
            {loading ? "Uploading..." : "Upload"}
          </button>
        </div>

        
       {/* Results */}
{result && (
  <div className="results">
    <div className="section">
      <h2>Extracted Text</h2>
      <div className="text-box">
        <pre>{result.extractedText || "No text extracted"}</pre>
      </div>
    </div>

    <div className="section">
      <h2>Match Score</h2>
      <div className="score-bar">
        <div
          className="score-fill"
          style={{ width: `${result.matchScore}%` }}
        >
          {result.matchScore}%
        </div>
      </div>
    </div>

    <div className="section">
      <h2>Suggested Roles</h2>
      <div className="roles">
        {result.suggestions && result.suggestions.length > 0 ? (
          result.suggestions.map((s, i) => (
            <span className="role-badge" key={i}>
              {s}
            </span>
          ))
        ) : (
          <p>No suggestions available</p>
        )}
      </div>
    </div>
  </div>
)}

      </div>
    </div>
  );
};

export default ResumeUploader;
