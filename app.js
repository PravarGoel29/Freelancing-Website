// Setup server, session and middleware here.
//Update by Pravar after revert
const express = require("express");
var exphbs = require("express-handlebars");
const app = express();
const static = express.static(__dirname + "/public");
const session = require("express-session");
const configRoutes = require("./routes");
const a = 10;
// import exphbs;

app.use;
app.use("/public", static);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.engine("handlebars", require("exphbs"));
app.set("view engine", "handlebars");

app.use(
  session({
    name: "AuthCookie",
    secret: "some secret string!",
    saveUninitialized: true,
    resave: false,
  })
);

app.use("/protected", (req, res, next) => {
  //console.log(req.session.user);
  if (req.session.user) {
    res.status(200).render("../views/landing", {});
  } else {
    msg = "Please log in with valid credentials.";
    res.status(403).render("../views/forbiddenAccess", { error: msg });
    next();
  }
});

app.use("/login", (req, res, next) => {
  if (req.session.user) {
    return res.redirect("/protected");
  } else {
    next();
  }
});

// app.use((req, res, next) => {
//   //console.log(req.session.user);
//   if (req.session.user) {
//     const log =
//       "[" +
//       new Date().toUTCString() +
//       "]: " +
//       req.method +
//       " " +
//       req.originalUrl +
//       " (Authenticated User)";
//     console.log(log);
//     //res.redirect("/logout");
//   } else {
//     const log =
//       "[" +
//       new Date().toUTCString() +
//       "]: " +
//       req.method +
//       " " +
//       req.originalUrl +
//       " (Non-Authenticated User)";
//     console.log(log);
//   }
//   next();
// });

configRoutes(app);

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log("Your routes will be running on http://localhost:3000");
});

// async function main() {
//   try {
//     const peopledata = await people.getAllPeople();
//     //console.log(peopledata);
//   } catch (e) {
//     console.log(e);
//   }
//   try {
//     const peopledata1 = await people.searchPeopleByName("rob");
//     console.log(peopledata1);
//   } catch (e) {
//     console.log(e);
//   }
//   try {
//     const peopledata2 = await people.searchPeopleByID(27888);
//     console.log(typeof peopledata2);
//   } catch (e) {
//     console.log(e);
//   }
// }

// main();
