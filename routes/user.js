//require express and express router
const express = require("express");
const router = express.Router();
const data = require("../data");
const userData = data.users;
const postData = data.posts;
const employerData = data.employers;
const employeeData = data.employees;
const validations = require("../validations/dataValidations");
const path = require("path");
const multer = require("multer");
const xss = require("xss");

//Using multer to upload and store resume
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../public/images/resumes"));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "_" + file.originalname);
  },
});

let upload = multer({
  storage: storage,
}).single("resumeInput");

router.route("/").get(async (req, res) => {
  //checks if the session is active
  if (req.session.user) {
    //redirect to /protected if active
    res.redirect("/home");
    return;
  } else {
    //renders login page if not active
    res.status(200).render("../views/pages/login", {style: "stylesheet.css"});
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
    res.status(200).render("../views/pages/signup", {style: "stylesheet.css"});
    return;
  }
});

router.route("/signup").post(upload, async (req, res) => {
  //router.post("/signup", upload, async (req, res) => {
  //getting the post body
  const UserInfo = req.body;
  try {
    const { userName, firstName, lastName, email, password, contactNumber, gender, dob, preferences } = UserInfo;
    //console.log(req);
    //Validating the contents of UserInfo obj
    try {
      //validations.UserValidation(userName,firstName,lastName,email,password,contactNumber,gender,dob,preferences)
      validations.validateConfirmPassword(password, UserInfo.confirmPassword);
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

    let resumeInput;
    if (!req.file) {
      resumeInput = "noResume.pdf";
    } else {
      // check file suffix
      if (!/\.(pdf)$/.test(req.file.filename)) {
        res.status(400).json({ error: "Please provide valid pdf document." });
        return;
      } else {
        resumeInput = xss(req.file.filename);
        resumeInput = resumeInput.split(" ").join("");
      }
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
      preferences,
      resumeInput
    );
    //res.redirect("/");
    res.status(200).redirect("/");
    return;
  } catch (e) {
    console.log(e);
    //res.status(400).render("../views/pages/signup", { error: e });
    res.status(400).json({ error: e, success: false });
    return;
  }
});

router.route("/login").post(async (req, res) => {
  //getting the post body
  const userInfo = req.body;

  console.log(userInfo);

  try {
    const { usernameInput, passwordInput } = userInfo;

    validations.validateUsername(usernameInput);
    validations.validatePassword(passwordInput);

    //calling the checUser function to check if the username and password match with the ones in db
    const thisUser = await userData.checkUser(usernameInput, passwordInput);
    const thisUserPosts = await postData.getAllPostsbyUserName(thisUser.user.userName);
    const allPosts = await postData.getAllPosts();

    //storing the user session
    req.session.user = thisUser.user;
    req.session.posts = thisUserPosts;
    if (req.session.user.emailVerified) {
      //req.session.allPosts = allUsersPosts;
      //const allPosts = req.session.allPosts;
      res.status(200).json({ message: "Succefully logged in", success: true });
      //res.status(200).render("../views/pages/landing", { user: thisUser.user, allPosts: allPosts });
      return;
    } else {
      res.status(400).json({ error: "Please verify your account", success: false });
      return;
    }
  } catch (e) {
    console.log(e);
    //in case of error, rendering login page again with error message
    // res.status(400).render("../views/pages/login", { error: e });
    res.status(400).json({ error: "Either userName or Password is incorrect!", success: false });
    return;
  }
});

router.route("/confirmation/:userId").get(async (req, res) => {
  let userId = req.params.userId;

  try {
    const updatedUser = await userData.updateEmailVerificationStatus(userId);
    res.status(200).render("../views/pages/emailverified");
    return;
  } catch (e) {
    res.status(400).render("../views/errors/error", { error: e });
    return;
  }
});

router.route("/home").get(async (req, res) => {
  try {
    //console.log("Inside Home");
    const user = req.session.user;

    const allPosts = await postData.getAllPosts();
    //req.session.allPosts = allUsersPosts;
    //const allPosts = req.session.allPosts;

    // if authenticated user, renders landing page
    if (user) {
      res.status(200).render("../views/pages/landing", { user: user, allPosts: allPosts, style: "landingPage.css" });
      return;
    } else {
      res.status(400).render("../views/pages/forbiddenAccess");
      return;
    }
  } catch (e) {
    res.status(400).render("../views/errors/error", { error: e });
    return;
  }
});

router.route("/profile/:userName").get(async (req, res) => {
  const user = req.session.user;
  const thisUserPosts = await postData.getAllPostsbyUserName(user.userName);
  const employeeId = await userData.getEmployeeIdByUserName(user.userName);
  const wishList = await employeeData.getAllJobsinWishList(employeeId);
  const invites = await employeeData.getAllinvites(employeeId);
  const currentJobs = await employeeData.getAllCurrentJobs(employeeId);
  const historyOfJobs = await employeeData.getAllJobsCompleted(employeeId);
  req.session.posts = thisUserPosts;
  const posts = req.session.posts;
  if (user) {
    res.status(200).render("../views/pages/profile", {
      user: user,
      posts: posts,
      wishList: wishList,
      invites: invites,
      currentJobs: currentJobs,
      historyOfJobs: historyOfJobs,
      style: "profile.css"
    });
    return;
  } else {
    res.status(400).render("../views/pages/forbiddenAccess");
    return;
  }
});

router.route("/user/:userName").get(async (req, res) => {
  const user = req.session.user;
  const userName = req.params.userName;
  const thatUser = await userData.getUserByUserName(userName);

  if (user) {
    if (user.userName == thatUser.userName) {
      res.status(200).redirect("/profile/" + user.userName);
      return;
    }
    //console.log("user passed to user page", req.session.user);
    res.status(200).render("../views/pages/user", { user: thatUser });
    return;
  } else {
    res.status(400).render("../views/pages/forbiddenAccess");
    return;
  }
});

router.route("/user/:userName/employee").get(async (req, res) => {
  const user = req.session.user;
  const userName = req.params.userName;
  const thatUser = await userData.getUserByUserName(userName);
  const thatUserAsEmployee = await employeeData.getEmployeeByUserName(userName);

  if (user) {
    res.status(200).render("../views/pages/employeeprofile", { user: thatUser, employee: thatUserAsEmployee });
    return;
  } else {
    res.status(400).render("../views/pages/forbiddenAccess");
    return;
  }
});

router.route("/user/:userName/employer").get(async (req, res) => {
  const user = req.session.user;
  const userName = req.params.userName;
  const thatUser = await userData.getUserByUserName(userName);
  const thatUserAsEmployer = await employerData.getEmployerByUserName(userName);
  if (user) {
    res.status(200).render("../views/pages/employerprofile", {
      user: thatUser,
      employer: thatUserAsEmployer,
      style: "employerProfile.css"
    });
    return;
  } else {
    res.status(400).render("../views/pages/forbiddenAccess");
    return;
  }
});

router.route("/profile/:userName/addPost").get(async (req, res) => {
  const user = req.session.user;
  if (user) {
    res.status(200).render("../views/pages/createPost", { user: user, style: "createPost.css" });
    return;
  } else {
    res.status(400).render("../views/pages/forbiddenAccess");
    return;
  }
});
router.route("/profile/:userName/edit").get(async (req, res) => {
  const user = req.session.user;
  if (user) {
    res.status(200).render("../views/pages/editProfile", { username: user.userName, style: "stylesheet.css" });
    return;
  } else {
    res.status(400).render("../views/pages/forbiddenAccess");
    return;
  }
});
router.route("/profile/:userName/edit").post(upload,async (req, res) => {
  const UserInfo = req.body;
  const user = req.session.user;
  try {
    const { firstName, lastName,  contactNumber, gender, } = UserInfo;
    //console.log(req);
    //Validating the contents of UserInfo obj
    try {
      //validations.UserValidation(userName,firstName,lastName,email,password,contactNumber,gender,dob,preferences)

      validations.validateUsername(user.userName);
      validations.validateName(firstName);
      validations.validateName(lastName);
      validations.validatePhoneNumber(contactNumber);
    } catch (e) {
      console.log(e);
      res.status(400).json({ error: e });
      return;
    }

    let resumeInput;
    if (!req.file) {
      resumeInput = "noResume.pdf";
    } else {
      // check file suffix
      if (!/\.(pdf)$/.test(req.file.filename)) {
        res.status(400).json({ error: "Please provide valid pdf document." });
        return;
      } else {
        resumeInput = xss(req.file.filename);
        resumeInput = resumeInput.split(" ").join("");
      }
    }

    //calling the createUser function with post body contents as it's arguments
    const updatedUser = await userData.updateUser(
      user.userName,
      firstName,
      lastName,
      contactNumber,
      gender,
      // resumeInput
    );
    //res.redirect("/");
    res.status(200).json({ message: "Succefully updated user.", success: true });
    return;
  } catch (e) {
    console.log(e);
    //res.status(400).render("../views/pages/signup", { error: e });
    res.status(400).json({ error: e, success: false });
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
