Chasha. I – AI-Enhanced Agricultural Ecosystem

An intelligent, AI-powered agricultural platform designed to support modern farmers with tools for crop disease diagnosis, smart marketplace, weather forecasting, and community learning.

🚀 Objective

To build an advanced digital agriculture ecosystem where farmers can:

Buy & sell agricultural goods

Diagnose plant diseases using AI

Receive automated treatment suggestions

Access farming tutorials & blogs

Get real-time weather forecasts

📌 Abstract

Planta is an AI-driven agriculture assistant that combines essential farming features into one user-friendly system.
It integrates:

Computer vision–based disease detection

Personalized learning content

Weather forecasting

AI chatbot support

Marketplace & community features

This unified platform empowers farmers to make informed decisions and improve productivity.

🌟 Key Features
1 User Authentication

Secure login & registration

Session-based access control

Separate privileges for Farmers and Admin

2. User Dashboard

A personalized farmer dashboard:

Manage profile

View order history

Monitor purchase/sale status

Track AI plant diagnosis history

3. Smart Marketplace

A fully functional agri-focused e-commerce system:

Sellers can upload products (price, quantity, image)

Buyers can filter by:

Product type

Location

Availability

Search and sorting options

MongoDB-backed transaction system

4. Tutorial Section

A community-driven knowledge platform:

Farmers can post tutorials (disease treatment, yield improvement, tips)

Explore by:

Crop type

Disease name

Topic

Smart search included

5. Blog Section

A dedicated agricultural discussion area:

Users can ask questions

Share farming success stories

Comment and help others

Advanced search using keywords & tags

6. Weather Insight & Smart Crop Suggestions

Real-time weather features:

Temperature, humidity, rainfall, wind

5–7 day forecast

AI-generated crop suggestions based on weather conditions

Powered by OpenWeatherMap API

7. AgriDoctor (AI Plant Disease Detection)

AI-powered plant diagnosis:

Upload plant leaf images

CNN-based ML model identifies diseases

Confidence score included

Automated treatment suggestions generated using AI

Model Source: Hugging Face Plant Disease Detection Model

🛠 Tech Stack
Frontend

HTML

CSS

EJS

Backend

Node.js

Express.js

MongoDB

APIs & AI

OpenAI API

OpenWeatherMap API

Hugging Face ML Model

👨‍💻 Team Citation
Name	Registration No
Ali Ashraf Tanvir	2021331001
Rafid Bin Nasim	2021331027
Pranta Das	2021331043


<code>
📂 Project Structure 
CHASHA.I/
├── public/
│ ├── css/
│ │ ├── agridoc.css
│ │ ├── blog.css
│ │ ├── dash.css
│ │ ├── home.css
│ │ ├── logIn.css
│ │ ├── marketPlace.css
│ │ ├── signUp.css
│ │ ├── tutorial.css
│ │ └── weather.css
│ └── js/
│ ├── agridoc.js
│ ├── blog.js
│ ├── blogAdd.js
│ ├── blogDetail.js
│ ├── marketPlace.js
│ ├── myCart.js
│ ├── myProduct.js
│ ├── tutorial.js
│ ├── tutorialsAdd.js
│ └── weather.js
└── server/
├── config/
│ ├── cloudinary.js
│ └── db.js
├── middleware/
│ ├── auth.js
│ ├── ensureNotLogedIn.js
│ └── upload.js
├── models/
│ ├── Blog.js
│ ├── Product.js
│ ├── Tutorial.js
│ └── User.js
└── routes/
    ├── account.js
    ├── auth.js
    ├── blog.js
    ├── product.js
    ├── static.js
    ├── tutorial.js
    └── UserRoute.js
├── views/
│ ├── layout/
│ │ ├── footer.ejs
│ │ └── loginOutUser.ejs
│ ├── aboutUs.ejs
│ ├── agridoc.ejs
│ ├── blog.ejs
│ ├── blogAdd.ejs
│ ├── blogDetail.ejs
│ ├── contactUs.ejs
│ ├── dash.ejs
│ ├── home.ejs
│ ├── logIn.ejs
│ ├── marketPlace.ejs
│ ├── marketPlaceProductAdd.ejs
│ ├── messagePage.ejs
│ ├── myCart.ejs
│ ├── myProduct.ejs
│ ├── privacyPolicy.ejs
│ ├── signUp.ejs
│ ├── tutorials.ejs
│ ├── tutorialsAdd.ejs
│ └── weather.ejs
├── package.json
├── .env
├── server.js

</code>

📸 AI Plant Disease Detection Workflow

User uploads plant image

Image sent to ML model API

Model predicts disease

App returns:

Disease name

Confidence %


🧪 How to Run Locally
1. Clone the repository
<code>
git clone https://github.com/pranta4p/Chasha.i.git
cd chasha
</code>
2. Install dependencies
<code>
npm install
</code>
3. Create .env file


4. Run the server
<code>
npm start
</code>

