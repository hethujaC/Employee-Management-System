const express = require("express");
const cors = require("cors");
const path = require("path");
const employeeRoutes = require("./routes/employeeRoutes");

const app = express();
const PORT = process.env.PORT || 5000;
const clientBuildPath = path.join(__dirname, "..", "Client", "dist");

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/employees", employeeRoutes);
app.use("/employees", employeeRoutes);

app.use(express.static(clientBuildPath));

app.get(/.*/, (req, res) => {
  res.sendFile(path.join(clientBuildPath, "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
