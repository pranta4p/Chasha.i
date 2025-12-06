
#  Chasha. I – AI-Enhanced Agricultural Ecosystem

An intelligent, AI-powered agricultural platform that helps farmers with **crop disease detection**, **smart marketplace**, **weather forecasting**, and **community learning**.

---

##  Objective

The goal of **Chasha.I** is to build a digital ecosystem for farmers where they can:

* Buy & sell agricultural goods
* Diagnose plant diseases using AI
* Get treatment suggestions
* Access tutorials & blogs
* See real-time weather forecasts

---

##  Abstract

**Planta** is an AI-driven agriculture assistant that brings together:

* Computer vision–based plant disease detection
* Personalized tutorial & blog content
* Weather analysis
* AI chatbot support
* Marketplace features

This unified system helps farmers make better decisions and increase productivity.

---

##  Key Features

### 1. User Authentication

* Secure login & registration
* Session-based access
* user roles

### 2. User Dashboard
* Order history
* Purchase/sale status


### 3. Smart Marketplace

* Sellers upload product listings
* Buyers filter by type, location, availability
* Search & sorting

### 4. Tutorial Section

* Users post tutorials
* Search by crop, disease, topic
* Community learning

### 5. Blog Section

* Post questions
* Share success stories
* Keyword & tag search

### 6. Weather Insight & Crop Suggestions

* Real-time weather
* Powered by OpenWeatherMap API

### 7. AgriDoctor – AI Plant Disease Detection

* Upload plant leaf images
* CNN model detects disease
* Confidence score
* HuggingFace ML model

---

## 🛠 Tech Stack

**Frontend:**
HTML, CSS, EJS

**Backend:**
Node.js, Express.js, MongoDB

**APIs & AI:**
OpenAI, OpenWeatherMap, HuggingFace Model

---

## 👨‍💻 Team: Citation

| Name              | Registration No |
| ----------------- | --------------- |
| Ali Ashraf Tanvir | 2021331001      |
| Rafid Bin Nasim   | 2021331027      |
| Pranta Das        | 2021331043      |

---

## 📁 Project Structure

```
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
```

---

## 📸 AI Plant Disease Detection Flow

1. User uploads a leaf image
2. Image is sent to ML model
3. Model returns disease + confidence
4. App generates treatment suggestions

---

## 🧪 Run Locally

### 1. Clone repository

```bash
git clone https://github.com/pranta4p/Chasha.i.git
cd Chasha.i
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create `.env` file

```
MONGO_URI=your_mongo_uri
JWT_SECRET=xxxxxx
CLOUDINARY_API_SECRET=xxxxxx
CLOUDINARY_API_KEY=xxxxxx
CLOUDINARY_NAME=xxxxxxx
HF_TOKEN=xxxxxxxx
OPENWEATHER_API_KEY=xxxxxxxxxx
```

### 4. Start the server

```bash
npm start
```

---

## 📜 License

This project was developed for academic and research purposes.

---
