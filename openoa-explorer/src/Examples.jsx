import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { fetchFolderContents, fetchFileContent } from "./api/github";
import "./Examples.css";

export default function Examples() {
  const [files, setFiles] = useState([]);
  const [cells, setCells] = useState([]);
  const [active, setActive] = useState(null);

  useEffect(() => {
    fetchFolderContents("examples").then((data) => {
      setFiles(data.filter((f) => f.name.endsWith(".ipynb")));
    });
  }, []);

  const openFile = async (file) => {
    setActive(file.name);

    const data = await fetchFileContent(file.download_url);

    // ✅ FIX: GitHub already returns JSON for ipynb
    const notebook =
      typeof data === "string" ? JSON.parse(data) : data;

    setCells(notebook.cells || []);
  };

  return (
    <div className="examples-layout">
      {/* LEFT SIDEBAR */}
      <aside className="examples-sidebar">
        <h2>Examples</h2>
        {files.map((f) => (
          <button
            key={f.path}
            className={`file-btn ${active === f.name ? "active" : ""}`}
            onClick={() => openFile(f)}
          >
            📘 {f.name}
          </button>
        ))}
      </aside>

      {/* RIGHT CONTENT */}
      <main className="examples-content">
        {cells.length === 0 && (
          <div className="empty-state">
            <h3>Select a notebook</h3>
            <p>Click a file on the left</p>
          </div>
        )}

        {cells.map((cell, idx) => (
          <div key={idx} className="cell">
            {/* MARKDOWN */}
            {cell.cell_type === "markdown" && (
              <div className="md-cell">
                <ReactMarkdown>
                  {cell.source.join("")}
                </ReactMarkdown>
              </div>
            )}

            {/* CODE */}
            {cell.cell_type === "code" && (
              <div className="code-cell">
                <pre>
                  <code>{cell.source.join("")}</code>
                </pre>

                <div className="run-hint">
                  ℹ️ Python runs locally (browser preview only)
                </div>

                {/* OUTPUTS */}
                {cell.outputs?.map((out, i) => (
                  <pre key={i} className="output">
                    {out.text?.join("")}
                  </pre>
                ))}
              </div>
            )}
          </div>
        ))}
      </main>
    </div>
  );
}
