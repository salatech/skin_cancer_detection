import React, { useState } from "react";
import axios from "axios";
import Dropzone from "react-dropzone";
import "./App.css";

function App() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);

  const handleDrop = (acceptedFiles) => {
    setFile(acceptedFiles[0]);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("file", file);
    const response = await axios.post("https://skincancerapp.azurewebsites.net/", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    setResult(response.data.result);
  };

  return (
    <div className="App">
      <Dropzone
        onDrop={handleDrop} 
        className={`Dropzone ${file ? "active" : ""}`}
        activeClassName="active"
        acceptClassName="accept"
      >
        {({ getRootProps, getInputProps }) => (
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            {file ? (
              <p>{file.name}</p>
            ) : (
              <p>Drag and drop an image here, or click to select a file</p>
            )}
          </div>
        )}
      </Dropzone>
      <button className="Button" onClick={handleSubmit}>
        Detect
      </button>
      {result && <p className="Result">{result}</p>}
    </div>
  );
}

export default App;
