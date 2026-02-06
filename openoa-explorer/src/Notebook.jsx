import React, { useEffect, useState } from 'react';
import { fetchFileContent } from './api/github';

function Notebook({ notebookPath }) {
  const [notebookContent, setNotebookContent] = useState('');

  useEffect(() => {
    const fetchNotebook = async () => {
      const content = await fetchFileContent(notebookPath);
      setNotebookContent(content);
    };

    fetchNotebook();
  }, [notebookPath]);

  return (
    <div>
      <h2>Notebook</h2>
      <pre>{notebookContent}</pre>
    </div>
  );
}

export default Notebook;
