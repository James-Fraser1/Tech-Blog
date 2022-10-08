// const path = require('path');
// const express = require('express');
// const session = require('express-session');
// const exphbs = require('express-handlebars');

// const app = express();
// const PORT = process.env.PORT || 3001;

// const sequelize = require("./config/connection");
// const SequelizeStore = require('connect-session-sequelize')(session.Store);

// const sess = {
//   secret: 'I will take this secret to my grave',
//   cookie: {},
//   resave: false,
//   saveUninitialized: true,
//   store: new SequelizeStore({
//     db: sequelize,
//   }),
// };

// app.use(session(sess));

// // Linking any helpers from our auth.js file
// const helpers = require('./utils/helpers');

// // Creating handlebars as a view engine for express
// const hbs = exphbs.create({ helpers });

// hbs.registerHelper("inc", function (value, options) {
//   return parseInt(value) + 1;
// });

// // setting our view engine as handlebars
// app.engine('handlebars', hbs.engine);

// // Allows view engine to use handlebars as html
// app.set('view engine', 'handlebars');

// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(express.static(path.join(__dirname, 'public')));

// app.use(require('./controllers/'));

// sequelize.sync({ force: true }).then(() => {
//   app.listen(PORT, () => console.log('Time to start...'))
// });

const path = require("path");
const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");

const app = express();
const PORT = process.env.PORT || 3001;

const sequelize = require("./config/connection");
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sess = {
  secret: "Super secret secret",
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

var date = new Date('December 25, 1995 23:15:30');

function current_date() {
  console.log(date)
  return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
}

current_date();

app.use(session(sess));

const hbs = exphbs.create({ current_date });

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(require('./controllers/'));

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
  sequelize.sync({ force: false });
});