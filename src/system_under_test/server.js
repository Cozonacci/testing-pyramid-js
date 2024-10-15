require("dotenv").config(); // Load environment variables

const express = require("express");
const employeeRoutes = require("./routes/employeeRoutes");

const app = express();

// Use the employee routes
app.use("/api", employeeRoutes);

// Start the server on port 3000
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
