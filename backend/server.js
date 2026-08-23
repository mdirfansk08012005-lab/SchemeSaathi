const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Serve the existing frontend
app.use(express.static(path.join(__dirname, "..")));

// Backend status test
app.get("/api/status", (req, res) => {
    res.json({
        success: true,
        message: "SchemeSaathi backend is running successfully."
    });
});

// Read schemes from database
app.get("/api/schemes", (req, res) => {
    const databasePath = path.join(
        __dirname,
        "..",
        "database",
        "schemes.json"
    );

    fs.readFile(databasePath, "utf8", (error, data) => {
        if (error) {
            console.error("Database error:", error);

            return res.status(500).json({
                success: false,
                message: "Unable to read scheme database."
            });
        }

        try {
            const schemes = JSON.parse(data);

            res.json({
                success: true,
                count: schemes.length,
                schemes: schemes
            });
        } catch (error) {
            console.error("JSON error:", error);

            res.status(500).json({
                success: false,
                message: "Scheme database contains invalid JSON."
            });
        }
    });
});

// Start backend server
app.listen(PORT, () => {
    console.log(
        `SchemeSaathi backend running at http://localhost:${PORT}`
    );
});