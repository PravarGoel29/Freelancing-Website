//require express and express router
const express = require("express");
const router = express.Router();
const data = require("../data");
const userData = data.users;
const postData = data.posts;
const employerData = data.employers;
const employeeData = data.employees;
const reviewData = data.reviews;
const applicationData = data.applications;
const validations = require("../validations/routeValidations");
//let alert = require("alert");
const xss = require("xss");

router.route("/").get(async (req, res) => {
  //console.log("inside post / get");
  res.status(200).redirect("/home");
});

router.route("/").post(async (req, res) => {
  //getting the post body
  const postInfo = req.body;
  const user = req.session.user;
  const userName = req.session.user.userName;
  try {
    const { location, description, title, domain, tags, jobtype, salary } = postInfo;
    //calling the createUser function with post body contents as it's arguments
    const newPost = await postData.createPost(location, description, title, domain, tags, jobtype, salary, userName);
    //Displaying the success message
    //res.status(200).json("Job post successful");
    //res.redirect("/profile/" + userName);
    //res.status(200).json({ message: "Succefully Posted", success: true });
    if (user) {
      //console.log()
      res.status(200).redirect("/post/" + newPost._id);
      return;
    } else {
      res.status(400).render("../views/pages/forbiddenAccess");
      return;
    }
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
    const applications = await applicationData.getallApplicationByPostID(id);

    let thisUserPostFlag = false;
    if (post.userName.toLowerCase() === user.userName.toLowerCase()) {
      thisUserPostFlag = true;
    }

    let candidateFlag = false;
    if (post.candidates.includes(user.userName.toLowerCase())) {
      candidateFlag = true;
    }

    let savedFlag = await employeeData.checkIfWishlisted(user.userName, id);
    let activeFlag = true;
    if (post.status !== "Active") {
      activeFlag = false;
    }
    //const reviewObjectList = await postData.getReviewObjectList(id);

    console.log(post);
    res.status(200).render("../views/pages/viewpost", {
      user: user,
      post: post,
      reviews: post.reviewIDs,
      thisUserPostFlag: thisUserPostFlag,
      applicants: applicants,
      savedFlag: savedFlag,
      activeFlag: activeFlag,
      candidateFlag: candidateFlag,
      style: "viewPost.css",
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
  const candidates = post.candidates;
  const applicants = await postData.getApplicantsByPostId(id);
  let thisUserPostFlag = false;
  if (post.userName.toLowerCase() === user.userName.toLowerCase()) {
    thisUserPostFlag = true;
  }
  let candidateFlag = false;
  if (post.candidates.includes(user.userName.toLowerCase())) {
    candidateFlag = true;
  }
  let savedFlag = await employeeData.checkIfWishlisted(user.userName.toLowerCase(), id);
  let activeFlag = true;
  if (post.status !== "Active") {
    activeFlag = false;
  }
  //const reviewObjectList = await postData.getReviewObjectList(id);
  let messageFlag = false;
  try {
    validations.validateID(id);
    id = id.trim();
    if (user) {
      if (!activeFlag) {
        res.status(400).render("../views/pages/viewpost", {
          user: user,
          post: post,
          reviews: post.reviewIDs,
          thisUserPostFlag: thisUserPostFlag,
          applicants: applicants,
          savedFlag: savedFlag,
          activeFlag: activeFlag,
          candidateFlag: candidateFlag,
          error: "Sorry! You can only send invite if the Job is active",
        });
        return;
      }
      const applicantName = req.params.userName.toLowerCase();
      if (candidates.includes(applicantName)) {
        res.status(400).render("../views/pages/viewpost", {
          user: user,
          post: post,
          reviews: post.reviewIDs,
          thisUserPostFlag: thisUserPostFlag,
          applicants: applicants,
          savedFlag: savedFlag,
          activeFlag: activeFlag,
          candidateFlag: candidateFlag,
          error: "Employee has already taken this job",
        });
        return;
      }

      const applicantEmployeeId = await userData.getEmployeeIdByUserName(applicantName);
      const invitedApplicant = await employeeData.getInvite(applicantEmployeeId, id);
      console.log(invitedApplicant);
      if (invitedApplicant) {
        if (!applicants.includes(applicantName)) {
          res.status(400).render("../views/pages/viewpost", {
            user: user,
            post: post,
            reviews: post.reviewIDs,
            thisUserPostFlag: thisUserPostFlag,
            applicants: applicants,
            savedFlag: savedFlag,
            activeFlag: activeFlag,
            candidateFlag: candidateFlag,
            error: "Sorry! You can only send invite if the employee has applied to this Job",
          });
          return;
        }
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
      reviews: post.reviewIDs,
      thisUserPostFlag: thisUserPostFlag,
      applicants: applicants,
      savedFlag: savedFlag,
      activeFlag: activeFlag,
      candidateFlag: candidateFlag,
      error: e,
    });
    return;
  }
});

router.route("/:postId/reviewrate/:userName").get(async (req, res) => {
  //Here the :userName is the user who the session user is going to rate and review for the post id :postId
  let id = req.params.postId;
  const rateUser = req.params.userName.toLowerCase();
  const user = req.session.user;
  const post = await postData.getPostById(id);
  const candidates = post.candidates;
  const applicants = await postData.getApplicantsByPostId(id);
  let thisUserPostFlag = false;
  if (post.userName.toLowerCase() === user.userName.toLowerCase()) {
    thisUserPostFlag = true;
  }
  let candidateFlag = false;
  if (post.candidates.includes(user.userName.toLowerCase())) {
    candidateFlag = true;
  }
  let savedFlag = await employeeData.checkIfWishlisted(user.userName.toLowerCase(), id);
  let activeFlag = true;
  if (post.status !== "Active") {
    activeFlag = false;
  }
  //const reviewObjectList = await postData.getReviewObjectList(id);

  try {
    validations.validateID(id);
    id = id.trim();
    if (user) {
      if (user.userName.toLowerCase() === rateUser) {
        res.status(400).render("../views/pages/viewpost", {
          user: user,
          post: post,
          reviews: post.reviewIDs,
          thisUserPostFlag: thisUserPostFlag,
          applicants: applicants,
          savedFlag: savedFlag,
          activeFlag: activeFlag,
          candidateFlag: candidateFlag,
          error: "You can't rate yourself",
        });
        return;
      }
      res.status(200).render("../views/pages/reviewrate", { user: user, post: post, rateUser: rateUser });
      return;
    } else {
      res.status(400).render("../views/pages/forbiddenAccess");
      return;
    }
  } catch (e) {
    //console.log(e);
    res.status(400).render("../views/pages/viewpost", {
      user: user,
      post: post,
      reviews: post.reviewIDs,
      thisUserPostFlag: thisUserPostFlag,
      applicants: applicants,
      savedFlag: savedFlag,
      activeFlag: activeFlag,
      candidateFlag: candidateFlag,
      error: e,
    });
    return;
  }
});

router.route("/:postId/reviewrate/:userName").post(async (req, res) => {
  let id = req.params.postId;
  const rateUser = req.params.userName.toLowerCase();
  const user = req.session.user;
  const post = await postData.getPostById(id);
  const { reviewInput, rateInput } = req.body;
  try {
    validations.validateReview(reviewInput);
    validations.validateRating(rateInput);
    let employeeToEmployerFlag = true;
    if (post.userName === user.userName.toLowerCase()) {
      employeeToEmployerFlag = false;
      const employeeId = await userData.getEmployeeIdByUserName(rateUser);
      const addedReview = await reviewData.createReview(
        id,
        employeeId,
        user.employerId,
        reviewInput,
        rateInput,
        employeeToEmployerFlag
      );
    } else {
      const employerId = await userData.getEmployerIdByUserName(post.userName);
      const addedReview = await reviewData.createReview(
        id,
        user.employeeId,
        employerId,
        reviewInput,
        rateInput,
        employeeToEmployerFlag
      );
    }
    res.status(200).redirect("/post/" + id);
    return;
  } catch (e) {
    console.log(e);
    res.status(400).json({ error: e });
    return;
  }
});

router.route("/:postId/reviewedandrated/:reviewId").get(async (req, res) => {
  let id = req.params.postId;
  let reviewId = req.params.reviewId;

  const user = req.session.user;
  const post = await postData.getPostById(id);
  const applicants = await postData.getApplicantsByPostId(id);
  let thisUserPostFlag = false;
  if (post.userName.toLowerCase() === user.userName.toLowerCase()) {
    thisUserPostFlag = true;
  }
  let candidateFlag = false;
  if (post.candidates.includes(user.userName.toLowerCase())) {
    candidateFlag = true;
  }
  let savedFlag = await employeeData.checkIfWishlisted(user.userName.toLowerCase(), id);
  let activeFlag = true;
  if (post.status !== "Active") {
    activeFlag = false;
  }
  //const reviewObjectList = await postData.getReviewObjectList(id);

  try {
    validations.validateID(id);
    id = id.trim();

    validations.validateID(reviewId);
    reviewId = reviewId.trim();
    const reviewDetails = await reviewData.getReviewDetailsByReviewId(reviewId);
    //console.log(updatedPost);

    if (user) {
      res.status(200).render("../views/pages/viewreviewrating", { review: reviewDetails });
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
      reviews: post.reviewIDs,
      thisUserPostFlag: thisUserPostFlag,
      applicants: applicants,
      savedFlag: savedFlag,
      activeFlag: activeFlag,
      candidateFlag: candidateFlag,
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
  let candidateFlag = false;
  if (post.candidates.includes(user.userName.toLowerCase())) {
    candidateFlag = true;
  }
  let savedFlag = await employeeData.checkIfWishlisted(user.userName.toLowerCase(), id);
  let activeFlag = true;
  if (post.status !== "Active") {
    activeFlag = false;
  }
  //const reviewObjectList = await postData.getReviewObjectList(id);
  try {
    validations.validateID(id);
    id = id.trim();

    if (post.applicants.includes(user.userName.toLowerCase())) {
      throw "You have already applied to this job";
    }
    // const updatedPost = await postData.addApplicants(user.userName, id);
    // console.log(updatedPost);

    if (user) {
      res.redirect("/application/" + id + "/apply");
      // res.status(200).render("../views/pages/jobapplied", { user: user });
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
      reviews: post.reviewIDs,
      thisUserPostFlag: thisUserPostFlag,
      applicants: applicants,
      savedFlag: savedFlag,
      activeFlag: activeFlag,
      candidateFlag: candidateFlag,
      error: e,
      style: "viewPost.css",
    });
    return;
  }
});

router.route("/:postId/acceptinvite").get(async (req, res) => {
  let id = req.params.postId;
  const user = req.session.user;
  const post = await postData.getPostById(id);
  const applicants = await postData.getApplicantsByPostId(id);

  let thisUserPostFlag = false;
  if (post.userName.toLowerCase() === user.userName.toLowerCase()) {
    thisUserPostFlag = true;
  }
  let candidateFlag = false;
  if (post.candidates.includes(user.userName.toLowerCase())) {
    candidateFlag = true;
  }
  let savedFlag = await employeeData.checkIfWishlisted(user.userName.toLowerCase(), id);
  let activeFlag = true;
  if (post.status !== "Active") {
    activeFlag = false;
  }
  //const reviewObjectList = await postData.getReviewObjectList(id);

  try {
    validations.validateID(id);
    id = id.trim();
    if (!applicants.includes(user.userName.toLowerCase())) {
      res.status(400).render("../views/pages/viewpost", {
        user: user,
        post: post,
        reviews: post.reviewIDs,
        thisUserPostFlag: thisUserPostFlag,
        applicants: applicants,
        savedFlag: savedFlag,
        activeFlag: activeFlag,
        candidateFlag: candidateFlag,
        error: "Sorry! You can only send invite if the employee has applied to this Job",
      });
      return;
    }

    const updatedEmployee = await employeeData.takeAJob(user.employeeId, id);
    const updatedPost = await postData.addCandidates(user.userName, id);
    // const employeeId = await userData.getEmployeeIdByUserName(user.userName);
    // const updatedPost = await employeeData.savePosttoWishList(employeeId, id);

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
      reviews: post.reviewIDs,
      thisUserPostFlag: thisUserPostFlag,
      applicants: applicants,
      savedFlag: savedFlag,
      activeFlag: activeFlag,
      candidateFlag: candidateFlag,
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

  let candidateFlag = false;
  if (post.candidates.includes(user.userName.toLowerCase())) {
    candidateFlag = true;
  }

  let savedFlag = await employeeData.checkIfWishlisted(user.userName.toLowerCase(), id);
  let activeFlag = true;
  if (post.status !== "Active") {
    activeFlag = false;
  }

  //const reviewObjectList = await postData.getReviewObjectList(id);
  try {
    validations.validateID(id);
    id = id.trim();

    const employeeId = await userData.getEmployeeIdByUserName(user.userName);
    const updatedPost = await employeeData.savePosttoWishList(employeeId, id);

    if (user) {
      res.status(200).render("../views/pages/jobsaved", { user: user, post: post, style: "jobsaved.css" });
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
      reviews: post.reviewIDs,
      thisUserPostFlag: thisUserPostFlag,
      applicants: applicants,
      savedFlag: savedFlag,
      activeFlag: activeFlag,
      candidateFlag: candidateFlag,
      error: e,
      style: "viewPost.css",
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
  let candidateFlag = false;
  if (post.candidates.includes(user.userName.toLowerCase())) {
    candidateFlag = true;
  }

  let savedFlag = await employeeData.checkIfWishlisted(user.userName.toLowerCase(), id);
  let activeFlag = true;
  if (post.status !== "Active") {
    activeFlag = false;
  }
  //const reviewObjectList = await postData.getReviewObjectList(id);
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
      reviews: post.reviewIDs,
      thisUserPostFlag: thisUserPostFlag,
      applicants: applicants,
      savedFlag: savedFlag,
      activeFlag: activeFlag,
      candidateFlag: candidateFlag,
      error: e,
    });
    return;
  }
});

router.route("/:postId/completed").get(async (req, res) => {
  let id = req.params.postId;
  const user = req.session.user;
  const post = await postData.getPostById(id);
  const applicants = await postData.getApplicantsByPostId(id);
  let thisUserPostFlag = false;
  if (post.userName.toLowerCase() === user.userName.toLowerCase()) {
    thisUserPostFlag = true;
  }

  let candidateFlag = false;
  if (post.candidates.includes(user.userName.toLowerCase())) {
    candidateFlag = true;
  }

  let savedFlag = await employeeData.checkIfWishlisted(user.userName.toLowerCase(), id);

  let activeFlag = true;
  if (post.status !== "Active") {
    activeFlag = false;
  }
  //const reviewObjectList = await postData.getReviewObjectList(id);
  try {
    validations.validateID(id);
    id = id.trim();

    // const employeeId = await userData.getEmployeeIdByUserName(user.userName);
    // const updatedPost = await employeeData.unsavePosttoWishList(employeeId, id);

    if (user && thisUserPostFlag) {
      if (activeFlag) {
        const updatedPost = await postData.markCompleted(id);
        res.status(200).redirect("/post/" + id);
        return;
      } else {
        res.status(400).render("../views/pages/viewpost", {
          user: user,
          post: post,
          reviews: post.reviewIDs,
          thisUserPostFlag: thisUserPostFlag,
          applicants: applicants,
          savedFlag: savedFlag,
          activeFlag: activeFlag,
          candidateFlag: candidateFlag,
          error: "The Job is already marked Completed",
        });
        return;
      }
    } else {
      res.status(400).render("../views/pages/forbiddenAccess");
      return;
    }
  } catch (e) {
    //res.status(400).json({ error: e });
    res.status(400).render("../views/pages/viewpost", {
      user: user,
      post: post,
      reviews: post.reviewIDs,
      thisUserPostFlag: thisUserPostFlag,
      applicants: applicants,
      savedFlag: savedFlag,
      activeFlag: activeFlag,
      candidateFlag: candidateFlag,
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
