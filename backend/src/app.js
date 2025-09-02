const express = require("express");
const app = express();
const projectRoutes = require("./routes/projectRoutes");

app.use(express.json());

// Uso delle rotte
app.use("/api/projects", projectRoutes);

module.exports = app;
