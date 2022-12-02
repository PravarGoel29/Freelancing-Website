const user = require("./user");
//const login = require("./login");
const createPost = require("./createPost");
// const employee = require("./employee");
// const employer = require("./employer");

const constructorMethod = (app) => {
  //middleware functions

  app.use("/", user);
  app.use("*", (req, res) => {
    res.sendStatus(404);
  });
};

module.exports = constructorMethod;
