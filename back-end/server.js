const express = require("express");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const path = require("path");
const { exec } = require("child_process");
const app = express();
const port = 3001;

app.use(cors());
app.use(fileUpload());
const fileKeeperDirectory = path.join(__dirname, "../fileKeeper");

app.post("/upload", (req, res) => {
  if (!req.files || !req.files.file) {
    return res.status(400).send("No file uploaded.");
  }

  const uploadedFile = req.files.file;
  console.log("Receive file", req.files.file.name);
  const filePath = path.join(fileKeeperDirectory, uploadedFile.name);

  const scriptPath = path.join(fileKeeperDirectory, "upload.sh"); // Adjust the path to upload.sh

  uploadedFile.mv(filePath, (err) => {
    if (err) {
      return res.status(500).send("Error uploading file.");
    }

    exec(scriptPath, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${error}`);
        return res.status(500).send("Error running the script.");
      }
      console.log("Sending Transaction...");
      console.log(`stdout: ${stdout}`);

      res.json({
        message: "File uploaded and script executed successfully!",
        scriptOutput: stdout,
      });
    });
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
