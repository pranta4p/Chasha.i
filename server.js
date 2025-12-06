require('dotenv').config();
const express = require('express');
const app = express();
const connectDB = require('./server/config/db');
const port = process.env.PORT || 3000;
const path =require('path')


app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.urlencoded({extended : true}));
app.use(express.json());
app.use(express.static("public"));
app.set("view engine", "ejs");
//db connection
connectDB();

app.use('/', require('./server/routes/UserRoute'));


app.listen(port, () => {
    console.log(`app listening on port http://localhost:${port}`);
})
