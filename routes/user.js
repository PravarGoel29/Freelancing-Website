//require express and express router
const express = require("express");
const router = express.Router();

//require data file
const data = require("../data");
const userData = data.users;
const postData = data.posts;

//require path
const path = require("path");

//require validations file
const errorHandling = require("../validations");
const validations = errorHandling.userValidations;
router.route("/").get(async (req, res) => {
  //code for GET (index route)
  
  //checks if the session is active
  if (req.session.user) {
    //redirect to /protected if active
    res.redirect("/protected");
  } else {
    //renders login page if not active
    res.status(200).render("../views/login");
  }
});

router
  .route("/signup")
  .get(async (req, res) => {
    //code for GET signup

    //checks if the session is active
    if (req.session.user) {
      //redirect to /protected if active
      res.redirect("/protected");
    } else {
      //renders signup page if not active
      res.status(200).render("../views/signup");
    }
  })
  .post(async (req, res) => {
    //code for POST signup

    //getting the post body
    const UserInfo = req.body;

    try {
      const {
        userName,
        firstName,
        lastName,
        email,
        password,
        contactNumber,
        gender,
        dob,
        preferences,
      } = UserInfo;

      //Validating the contents of UserInfo obj
      try {
        validations.UserValidation(userName,firstName,lastName,email,password,contactNumber,gender,dob,preferences)
      } catch (e) {
        return res.status(400).json({ error: e });
      }

      //calling the createUser function with post body contents as it's arguments
      const newUser = await userData.createUser(
        userName,
        firstName,
        lastName,
        email,
        password,
        contactNumber,
        gender,
        dob,
        preferences
      );

      //redirecting to index route
      res.redirect("/");
    } catch (e) {
      //in case of error, rendering signup page again with error message
      res.status(400).render("../views/signup", { error: e });
    }
  });

router.route("/login").post(async (req, res) => {
  //code here for POST login

  //getting the post body
  const userInfo = req.body;

  try {
    const { usernameInput, passwordInput } = userInfo;

    try {
      validations.userNameValidation(username);
      validations.passwordValidation(password);
    } catch (error) {}

    //calling the checUser function to check if the username and password match with the ones in db
    const thisUser = await userData.checkUser(usernameInput, passwordInput);

    //storing the user session
    req.session.user = usernameInput;

    //redirecting to /protected
    res.redirect("/protected");
  } catch (e) {
    //in case of error, rendering login page again with error message
    res.status(400).render("../views/login", { error: e });
  }
});

router.route("/protected").get(async (req, res) => {
  //code here for GET /protected

  const user = req.session.user;

  // if authenticated user, renders landing page
  if (user) {
    res.status(200).render("../views/landing", {});
  }
});

router.route("/logout").get(async (req, res) => {
  //code here for GET /logout

  //destroying the session
  req.session.destroy();

  //redirecting to index route which renders login page
  res.redirect("/");
  return;
});

module.exports = router;
