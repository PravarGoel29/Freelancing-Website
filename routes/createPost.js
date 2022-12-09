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
const validations = require("../validations/routeValidations");


router
  .route("/")
  .get(async (req, res) => {
    //code for GET

    //rendering the signup page
    res.sendFile(path.resolve("static/createPost.html"));
  })
  .post(async (req, res) => {
    //code for POST

    //getting the post body
    const postInfo = req.body;

    try {
      const { location, description, domain, tags, jobtype, salary } = postInfo;

      //Validating the contents of UserInfo obj
      // try {
      // } catch (e) {
      //   return res.status(400).json({ error: e });
      // }

      //calling the createUser function with post body contents as it's arguments
      const newPost = await postData.addPost(
        location,
        description,
        domain,
        tags,
        jobtype,
        salary
      );

      //   const allPosts = await postData.getAllPosts();

      //   context = {
      //     title: "Landing Page",
      //     Name: allPosts._id,
      //     peopleStatus: true,
      //     allPosts: allPosts,
      //   };

      //Displaying the success message
      res.status(200).json("Post successfully added !");
      //res.status(200).json("Successfully Signed Up !");
    } catch (e) {
      res.status(500).json({ error: e });
    }
  });
router
  .route('/:postId')
  .get(async (req, res) => {
    //code here for GET
    let id = req.params.postId;
    try {
      //validation of id
      validations.validateID(id)
      id = id.trim();
    } catch (e) {
      console.log(e)
      res.status(400).json({ error: e });
      return;
    }
    try {
      const postInfo = await postData.getPostById(id);
      res.status(200).json(postInfo);
      return;
    } catch (e) {
      res.status(404).json({ error: e });
      return;
    }
  })
  .delete(async (req, res) => {
    //code here for DELETE
    let id = req.params.postId;
    try {
      //validation of id
      validations.validateID(id)
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
      console.log(e)
      res.status(404).json({ error: e });
      return;
    }
  })



module.exports = router;
