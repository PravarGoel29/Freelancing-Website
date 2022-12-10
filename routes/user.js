//require express and express router
const express = require("express");
const router = express.Router();
const data = require("../data");
const userData = data.users;
const postData = data.posts;
const validations = require("../validations/dataValidations");
const xss = require("xss");

router.route("/").get(async (req, res) => {
  //checks if the session is active
  if (req.session.user) {
    //redirect to /protected if active
    res.redirect("/home");
    return;
  } else {
    //renders login page if not active
    res.status(200).render("../views/pages/login");
    return;
  }
});

router.route("/signup").get(async (req, res) => {
  //checks if the session is active
  if (req.session.user) {
    res.redirect("/");
    return;
  } else {
    //renders signup page if not active
    res.status(200).render("../views/pages/signup");
    return;
  }
});

router.route("/signup").post(async (req, res) => {
  //getting the post body
  const UserInfo = req.body;
  try {
    const { userName, firstName, lastName, email, password, contactNumber, gender, dob, preferences } = UserInfo;
    //Validating the contents of UserInfo obj
    try {
      //validations.UserValidation(userName,firstName,lastName,email,password,contactNumber,gender,dob,preferences)
      validations.validateEmail(email);
      validations.validateUsername(userName);
      validations.validateName(firstName);
      validations.validateName(lastName);
      validations.validateDOB(dob);
      validations.validatePassword(password);
      validations.validatePhoneNumber(contactNumber);
    } catch (e) {
      console.log(e);
      res.status(400).json({ error: e });
      return;
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
    res.redirect("/");
    return;
  } catch (e) {
    console.log(e);
    res.status(400).render("../views/pages/signup", { error: e });
    return;
  }
});

router.route("/login").post(async (req, res) => {
  //getting the post body
  const userInfo = req.body;

  try {
    const { usernameInput, passwordInput } = userInfo;

    validations.validateUsername(usernameInput);
    validations.validatePassword(passwordInput);

    //calling the checUser function to check if the username and password match with the ones in db
    const thisUser = await userData.checkUser(usernameInput, passwordInput);
    const thisUserPosts = await postData.getAllPostsbyUserName(thisUser.user.userName);
    const allUsersPosts = await postData.getAllPosts();

    //storing the user session
    req.session.user = thisUser.user;
    req.session.posts = thisUserPosts;
    req.session.allPosts = allUsersPosts;

    const allPosts = req.session.allPosts;

    res.status(200).render("../views/pages/landing", { user: thisUser.user, allPosts: allPosts });
    return;
  } catch (e) {
    //in case of error, rendering login page again with error message
    res.status(400).render("../views/pages/login", { error: e });
    return;
  }
});

router.route("/home").get(async (req, res) => {
  const user = req.session.user;
  const allUsersPosts = await postData.getAllPosts();
  req.session.allPosts = allUsersPosts;
  const allPosts = req.session.allPosts;

  // if authenticated user, renders landing page
  if (user) {
    res.status(200).render("../views/pages/landing", { user: user, allPosts: allPosts });
    return;
  } else {
    res.status(400).render("../views/pages/forbiddenAccess");
    return;
  }
});

router.route("/user").get(async (req, res) => {
  const user = req.session.user;
  const thisUserPosts = await postData.getAllPostsbyUserName(user.userName);
  req.session.posts = thisUserPosts;
  const posts = req.session.posts;
  // if authenticated user, renders landing page
  if (user) {
    //console.log("user passed to user page", req.session.user);
    res.status(200).render("../views/pages/user", { user: user, posts: posts });
    return;
  } else {
    res.status(400).render("../views/pages/forbiddenAccess");
    return;
  }
});

router.route("/user/:userName/addPost").get(async (req, res) => {
  const user = req.session.user;
  // if authenticated user, renders landing page
  if (user) {
    res.status(200).render("../views/pages/createPost", { user: user });
    return;
  } else {
    res.status(400).render("../views/pages/forbiddenAccess");
    return;
  }
});

router.route("/logout").get(async (req, res) => {
  //destroying the session
  req.session.destroy();
  //redirecting to index route which renders login page
  res.redirect("/");
  return;
});

module.exports = router;
