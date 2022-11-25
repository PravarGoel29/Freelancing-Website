//Here is where you'll set up your server as shown in lecture code
const people = require("./data/user");

const express = require("express");
const app = express();
const static = express.static(__dirname + "/public");

const configRoutes = require("./routes");
const exphbs = require("express-handlebars");

app.use("/public", static);
app.use("/static", express.static(__dirname + "/static"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine("handlebars", exphbs.engine({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

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
