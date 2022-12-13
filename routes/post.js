//require express and express router
const express = require("express");
const router = express.Router();
const data = require("../data");
const userData = data.users;
const postData = data.posts;
const employerData = data.employers;
const employeeData = data.employees;
const validations = require("../validations/routeValidations");
//let alert = require("alert");
const xss = require("xss");

router.route("/").get(async (req, res) => {
  //console.log("inside post / get");
  res.status(200).render("../views/pages/profile");
});

router.route("/").post(async (req, res) => {
  //getting the post body
  const postInfo = req.body;
  const userName = req.session.user.userName;
  try {
    const { location, description, title, domain, tags, jobtype, salary } = postInfo;
    //calling the createUser function with post body contents as it's arguments
    const newPost = await postData.createPost(location, description, title, domain, tags, jobtype, salary, userName);
    //Displaying the success message
    //res.status(200).json("Job post successful");
    //res.redirect("/profile/" + userName);
    res.status(200).json({ message: "Succefully Posted", success: true });
    return;
  } catch (e) {
    res.status(400).json({ error: e, success: false });
    //res.status(500).json({ error: e });
  }
});

router.route("/:postId").get(async (req, res) => {
  let id = req.params.postId;
  try {
    validations.validateID(id);
    id = id.trim();
    const user = req.session.user;
    const post = await postData.getPostById(id);
    const applicants = await postData.getApplicantsByPostId(id);
    let thisUserPostFlag = false;
    if (post.userName.toLowerCase() === user.userName.toLowerCase()) {
      thisUserPostFlag = true;
    }

    let savedFlag = await employeeData.checkIfWishlisted(user.userName, id);

    console.log(post);
    res.status(200).render("../views/pages/viewpost", {
      user: user,
      post: post,
      thisUserPostFlag: thisUserPostFlag,
      applicants: applicants,
      savedFlag: savedFlag,
    });
    return;
  } catch (e) {
    console.log(e);
    res.status(404).json({ error: e });
    return;
  }
});

router.route("/:postId/:userName/invite").get(async (req, res) => {
  //Here the userName is the applicant userName
  let id = req.params.postId;
  const user = req.session.user;
  const post = await postData.getPostById(id);
  const applicants = await postData.getApplicantsByPostId(id);
  let thisUserPostFlag = false;
  if (post.userName.toLowerCase() === user.userName.toLowerCase()) {
    thisUserPostFlag = true;
  }
  let savedFlag = await employeeData.checkIfWishlisted(user.userName, id);
  let messageFlag = false;
  try {
    validations.validateID(id);
    id = id.trim();
    if (user) {
      const applicantName = req.params.userName.toLowerCase();
      const applicantEmployeeId = await userData.getEmployeeIdByUserName(applicantName);
      const invitedApplicant = await employeeData.getInvite(applicantEmployeeId, id);
      console.log(invitedApplicant);
      if (invitedApplicant) {
        messageFlag = true;
        console.log("Invite sent successfully to " + invitedApplicant.userName);
      }
      res.status(200).redirect("/post/" + id);
      return;
    } else {
      res.status(400).render("../views/pages/forbiddenAccess");
      return;
    }
  } catch (e) {
    console.log(e);
    res.status(400).render("../views/pages/viewpost", {
      user: user,
      post: post,
      thisUserPostFlag: thisUserPostFlag,
      applicants: applicants,
      savedFlag: savedFlag,
      error: e,
    });
    return;
  }
});

router.route("/:postId/applied").get(async (req, res) => {
  let id = req.params.postId;
  const user = req.session.user;
  const post = await postData.getPostById(id);
  const applicants = await postData.getApplicantsByPostId(id);
  let thisUserPostFlag = false;
  if (post.userName.toLowerCase() === user.userName.toLowerCase()) {
    thisUserPostFlag = true;
  }
  let savedFlag = await employeeData.checkIfWishlisted(user.userName, id);
  try {
    validations.validateID(id);
    id = id.trim();
    const updatedPost = await postData.addApplicants(user.userName, id);
    console.log(updatedPost);

    if (user) {
      res.status(200).render("../views/pages/jobapplied", { user: user });
      return;
    } else {
      res.status(400).render("../views/pages/forbiddenAccess");
      return;
    }
  } catch (e) {
    console.log(e);
    //res.status(400).json({ error: e });
    res.status(400).render("../views/pages/viewpost", {
      user: user,
      post: post,
      thisUserPostFlag: thisUserPostFlag,
      applicants: applicants,
      savedFlag: savedFlag,
      error: e,
    });
    return;
  }
});

router.route("/:postId/saved").get(async (req, res) => {
  let id = req.params.postId;
  const user = req.session.user;
  const post = await postData.getPostById(id);
  const applicants = await postData.getApplicantsByPostId(id);

  let thisUserPostFlag = false;
  if (post.userName.toLowerCase() === user.userName.toLowerCase()) {
    thisUserPostFlag = true;
  }
  let savedFlag = await employeeData.checkIfWishlisted(user.userName, id);
  try {
    validations.validateID(id);
    id = id.trim();

    const employeeId = await userData.getEmployeeIdByUserName(user.userName);
    const updatedPost = await employeeData.savePosttoWishList(employeeId, id);

    if (user) {
      res.status(200).render("../views/pages/jobsaved", { user: user, post: post });
      return;
    } else {
      res.status(400).render("../views/pages/forbiddenAccess");
      return;
    }
  } catch (e) {
    console.log(e);
    //res.status(400).json({ error: e });
    res.status(400).render("../views/pages/viewpost", {
      user: user,
      post: post,
      thisUserPostFlag: thisUserPostFlag,
      applicants: applicants,
      savedFlag: savedFlag,
      error: e,
    });
    return;
  }
});

router.route("/:postId/unsaved").get(async (req, res) => {
  let id = req.params.postId;
  const user = req.session.user;
  const post = await postData.getPostById(id);
  const applicants = await postData.getApplicantsByPostId(id);
  let thisUserPostFlag = false;
  if (post.userName.toLowerCase() === user.userName.toLowerCase()) {
    thisUserPostFlag = true;
  }
  let savedFlag = await employeeData.checkIfWishlisted(user.userName, id);
  try {
    validations.validateID(id);
    id = id.trim();

    const employeeId = await userData.getEmployeeIdByUserName(user.userName);
    const updatedPost = await employeeData.unsavePosttoWishList(employeeId, id);

    if (user) {
      res.status(200).redirect("/post/" + id);
      return;
    } else {
      res.status(400).render("../views/pages/forbiddenAccess");
      return;
    }
  } catch (e) {
    console.log(e);
    //res.status(400).json({ error: e });
    res.status(400).render("../views/pages/viewpost", {
      user: user,
      post: post,
      thisUserPostFlag: thisUserPostFlag,
      applicants: applicants,
      savedFlag: savedFlag,
      error: e,
    });
    return;
  }
});

router.route("/:postId").delete(async (req, res) => {
  //code here for DELETE
  let id = req.params.postId;
  try {
    //validation of id
    validations.validateID(id);
    id = id.trim();
  } catch (e) {
    res.status(400).json({ error: e });
    return;
  }
  try {
    await postData.removePost(id);
    res.status(200).json({ postId: id, deleted: true });
    return;
  } catch (e) {
    console.log(e);
    res.status(404).json({ error: e });
    return;
  }
});

module.exports = router;
