const user = require("./user");
const post = require("./post");

const constructorMethod = (app) => {
  //middleware functions

  app.use("/", user);
  app.use("/post", post);
  app.use("*", (req, res) => {
    res.sendStatus(404);
  });
};

module.exports = constructorMethod;
