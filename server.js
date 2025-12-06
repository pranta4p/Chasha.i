require('dotenv').config();
const express = require('express');
const app = express();
const connectDB = require('./server/config/db');
const port = process.env.PORT || 3000;
const path = require('path')


app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.set("view engine", "ejs");
//db connection
connectDB();

const mongoose=require('mongoose')
app.use('/', require('./server/routes/UserRoute'));
// app.get("/reset-db", async (req, res) => {
//   try {
//     await mongoose.connection.dropDatabase();
//     res.send("Database cleared!");
//   } catch (err) {
//     res.send(err.message);
//   }
// });

app.listen(port, () => {
    console.log(`app listening on port http://localhost:${port}`);
})

// Force restart for env update 2
