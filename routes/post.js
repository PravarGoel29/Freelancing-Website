//require express and express router
const express = require("express");
const router = express.Router();
const data = require("../data");
const userData = data.users;
const postData = data.posts;
const validations = require("../validations/routeValidations");
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
    res.redirect("/user");
    return;
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: e });
  }
});

router.route("/:postId").get(async (req, res) => {
  //code here for GET
  let id = req.params.postId;
  try {
    //validation of id
    validations.validateID(id);
    id = id.trim();
    const user = req.session.user;
    const post = await postData.getPostById(id);

    let thisUserPostFlag = false;
    if (post.userName.toLowerCase() === user.userName.toLowerCase()) {
      thisUserPostFlag = true;
    }
    //console.log(post);
    res.status(200).render("../views/pages/viewpost", { user: user, post: post, thisUserPostFlag: thisUserPostFlag });
    return;
  } catch (e) {
    console.log(e);
    res.status(404).json({ error: e });
    return;
  }
});

router.route("/:postId/applied").get(async (req, res) => {
  //code here for GET
  let id = req.params.postId;
  try {
    //validation of id
    validations.validateID(id);
    id = id.trim();
    const user = req.session.user;
    const post = await postData.addApplicants(user.userName, id);
    console.log(post);
    res.status(200).render("../views/pages/jobapplied");
    return;
  } catch (e) {
    console.log(e);
    res.status(404).json({ error: e });
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
