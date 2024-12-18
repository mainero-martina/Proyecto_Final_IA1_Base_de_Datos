
const express = require('express');
const session = require('express-session');
const db = require('./database/db.js');
const path = require('path');
const app = express();
const registerRoute = require('./routes/register.js');
const loginRoute = require('./routes/login.js');
const create_profileRoute = require('./routes/create_profile.js');
const dashboardRouter = require('./routes/dashboard');
const projectRouter = require('./routes/project');
const aboutRouter = require('./routes/about');  
const contactRouter = require('./routes/contact');
const profileRoute = require('./routes/profile');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

app.use(session({
  secret: 'cocacola', 
  resave: false,
  saveUninitialized: true
}));
app.use((req, res, next) => {
  res.locals.isLoggedIn = req.session && req.session.userId ? true : false;
  res.locals.username = req.session && req.session.username ? req.session.username : null;
  next();
});

app.get('/', (req, res) => {
  res.render('index',);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
});

app.use(registerRoute);
app.use(loginRoute);
app.use(create_profileRoute);
app.use('/dashboard', dashboardRouter);
app.use('/', aboutRouter);
app.use('/', contactRouter);
app.use('/project', projectRouter);
app.use(profileRoute);