const express = require("express");
const hbs = require("hbs");
const fs = require("fs");
const app = express();

const port = process.env.PORT || 3000;

hbs.registerPartials(`${__dirname}/views/partials`);
hbs.registerHelper("currentYear", () => {
  return new Date().getFullYear();
});
hbs.registerHelper("myMsg", text => {
  return text;
});

app.set("view engine", "hbs");

app.use((req, res, next) => {
  let now = new Date().toString();
  let log = `Time and date: ${now} | Request method: ${req.method} | Path: ${
    req.url
  }`;

  fs.appendFile("server.log", log + "\n", err => {
    if (err) {
      console.log("Unable to append log");
    }
  });

  next();
});

// app.use((req, res, next) => {
//   res.render("maintenance.hbs", {
//     pageTitle: "Maintenance",
//     msg: "Well be back sooon"
//   });
// });

app.use(express.static(`${__dirname}/public`));

app.get("/", (req, res) => {
  res.render("home.hbs", {
    pageTitle: "Home",
    welcomeMsg: "Welcome to my website"
  });
});

app.get("/help", (req, res) => {
  res.sendFile(`help.html`);
});

app.get("/about", (req, res) => {
  res.render("about.hbs", {
    pageTitle: "About Us"
  });
});

app.get("/bad", (req, res) => {
  res.send({
    errorMessage: "Unable to connect"
  });
});

app.listen(port, () => {
  console.log("Running is port " + port);
});
