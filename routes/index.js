
const user = require("./user");
// const employee = require("./employee");
// const employer = require("./employer");

const constructorMethod = (app) => {
  //middleware functions
  app.use("/user", user);
  //   app.use("/employee", progress);
  //   app.use("/employer", exerciseLog);

  app.use("*", (req, res) => {
    res.sendStatus(404);
  });
};

module.exports = constructorMethod;
