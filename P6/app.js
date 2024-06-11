const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

app.get('/style.css', function(req, res) {
  res.sendFile(__dirname + "/" + "style.css");
});

app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'page','index.html',));
    res.sendFile(path.join(__dirname, 'page','style.css',));
});

app.get('/contact', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
