const express = require('express');
const app = express();
const port = 3000;
const connectDB = require('./server/config/db');
app.use(express.static("public"));
app.set("view engine", "ejs");

connectDB();
app.get('/', (req, res) => {
    res.render('home', {});
});
app.get('/home', (req, res) => {
    res.render('home', {});
});

app.get('/marketplace', (req, res) => {
    res.render('marketPlace',{}); 
});

app.get('/tutorial', (req, res) => {
    res.render('tutorials',{}); 
});

//for  signup


app.get('/signUp', (req, res) => {
    res.render("signUp", {});
})
app.post('/signUp', async(req, res) => {
    //  console.log(req.body);
    try {
    const {email, password,name } = req.body;
      
    //if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
       return res.status(401).render("messagePage", {
       message: 'User already exists,login please',
       redirectUrl: "/login"
       }); 
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      image:imagePath
    });

    await newUser.save();

    res.redirect('/logIn');

  } catch (err) {
    console.error('Error saving user:', err.message);
    res.status(500).send('Server Error');
  }
})


app.listen(port, () => {
    console.log(`App listening on http://localhost:${port}`);
});
// run this by : npm start