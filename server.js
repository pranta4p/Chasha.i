const express = require('express');
const app = express();
const port = 3000;

app.use(express.static("public"));
app.set("view engine", "ejs");

app.get('/', (req, res) => {
    res.render('home', {});
});

app.get('/marketplace', (req, res) => {
    res.render('marketplace'); 
});

app.get('/tutorial', (req, res) => {
    res.render('tutorial'); 
});

app.listen(port, () => {
    console.log(`App listening on http://localhost:${port}`);
});