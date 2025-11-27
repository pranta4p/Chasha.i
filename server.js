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

// login 
app.get('/logIn', (req, res) => {
    res.render("logIn", {});
})
app.post('/logIn',  async (req, res) => {
  try {
    const { email, password } = req.body;
    // console.log(req.body);
    //  Check if user exists
    const user = await  User.findOne({ email });;
    if (!user) {
      return res.status(401).render("messagePage", {
       message: 'Invalid email or password',
     redirectUrl: "/login"
     });
    }


    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
       return res.status(401).render("messagePage", {
       message: 'Invalid password',
       redirectUrl: "/login"
       });
    }


    const token = jwt.sign({ userId: user._id, name: user.name }, jwtSecret, { expiresIn: '1h' });

 
    res.cookie('token', token, {
      httpOnly: true,         //  for Preventing JS access
      maxAge: 3600000, 
      sameSite: 'lax', 
    });

    f=1;
    res.redirect('/home'); 

  } catch (err) {
    console.error('Login error:', err.message);
    res.status(500).send('Server Error');
  }
});



app.listen(port, () => {
    console.log(`App listening on http://localhost:${port}`);
});
// run this by : npm start