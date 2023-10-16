import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import Swal from "sweetalert2";
import "../css/Form.css";
import "../css/Form.css";

const Form = () => {
  const [file, setFile] = useState(null);
  const [serverResponse, setServerResponse] = useState("");
  const [txhashInput, setTxhashInput] = useState("");

  const onDrop = useCallback((acceptedFiles) => {
    const selectedFile = acceptedFiles[0];
    setFile(selectedFile);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: ".pdf, .jpg, .jpeg, .png",
  });

  const uploadFile = async () => {
    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await fetch("http://localhost:3001/upload", {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          const data = await response.json();

          Swal.fire({
            icon: "success",
            title: "File uploaded successfully!",
            showConfirmButton: false,
            timer: 1500,
          });

          setServerResponse(data.scriptOutput);
        } else {
          console.error("File upload failed");
          setServerResponse("File upload failed");
        }
      } catch (error) {
        console.error("Error uploading the file:", error);
        setServerResponse("Error uploading the file");
      }
    }
  };

  const openTxHashPage = () => {
    if (txhashInput) {
      const url = `https://testnet.greenfieldscan.com/tx/${txhashInput}`;
      window.open(url, "_blank");
    }
  };

  return (
    <div className="form-container">
      <div {...getRootProps()} className="dropzone">
        <input {...getInputProps()} />
        <p>Drag & drop a file here, or click to select a file</p>
      </div>
      {file && (
        <div>
          <p>Selected file: {file.name}</p>
        </div>
      )}
      <button onClick={uploadFile}>Upload File</button>
      {serverResponse && (
        <div className="server-response">
          <div className="server-response-text">
            <p>Server Response</p>
          </div>
          <div className="terminal-content">{serverResponse}</div>
        </div>
      )}
      <div className="separator"></div>
      <div className="txhash-input-container">
        <input
          type="text"
          placeholder="Enter Transaction Hash"
          value={txhashInput}
          onChange={(e) => setTxhashInput(e.target.value)}
          className="txhash-input"
        />
        <button onClick={openTxHashPage} className="open-tx-button">
          Open TX Page
        </button>
      </div>
    </div>
  );
};

export default Form;
