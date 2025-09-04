import React, { useState, useEffect } from "react";
import "./ResumeUploader.css";

const ResumeUploader = () => {
  const [file, setFile] = useState(null);
  const [userId, setUserId] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const randomId = "user-" + Math.random().toString(36).substring(2, 10);
    setUserId(randomId);
  }, []);

  useEffect(() => {
    if (file) handleUpload();
  }, [file]);

  const handleUpload = async () => {
    if (!file || !userId) return;

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

        <div className="form">
          <input
            type="file"
            accept=".pdf,.docx"
            onChange={(e) => setFile(e.target.files[0])}
          />
          {loading && <p>Uploading...</p>}
        </div>

        {result && (
          <div className="results">
            {/* Sections */}
            <div className="section">
              <h2>Extracted Sections</h2>
              {result.sections && Object.keys(result.sections).length > 0 ? (
                Object.entries(result.sections).map(([section, content]) => (
                  <div key={section} className="text-box-section">
                    <h3>{section}</h3>
                    {content ? (
                      content.split('.').map((sentence, index) => {
                        const trimmed = sentence.trim();
                        return trimmed ? <p key={index}>{trimmed}.</p> : null;
                      })
                    ) : (
                      <p>No content</p>
                    )}
                  </div>
                ))
              ) : (
                <p>No sections extracted</p>
              )}
            </div>

            {/* Match Score */}
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

            {/* Suggested Roles */}
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
