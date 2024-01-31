const express = require("express");
const fs = require("fs");

const app = express();

app.use((req, res, next) => {
    const log = `${Date.now()}: ${req.url} \n`;
    fs.appendFile("log.txt", log, (err, data) => {
        next();
    });
    console.log("URL Parameters:", req.params);
    console.log(req.headers);
});

app.get('/', (req, res) => {
    res.end("HomePage");
});

app.get('/about/:param1/:param2', (req, res) => {
    // Access URL parameters using req.params
    const param1 = req.params.param1;
    const param2 = req.params.param2;
    
    // Print parameters to console
    console.log("Parameter 1:", param1);
    console.log("Parameter 2:", param2);

    res.end("Smart Tracking device");
});

app.use((req, res) => {
    res.status(404).end("404 not found tracking server");
});

const PORT = 8000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
