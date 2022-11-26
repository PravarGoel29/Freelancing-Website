//require express and express router
const express = require("express");
const router = express.Router();

//require data file
const data = require("../data");
const userData = data.users;

//require path
const path = require("path");

//require validations file
const validation = require("../validations");

router
  .route("/")
  .get(async (req, res) => {
    //code for GET

    //rendering the signup page
    res.sendFile(path.resolve("static/signup.html"));
  })
  .post(async (req, res) => {
    //code for POST

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

      // Validating the contents of UserInfo obj
      try {
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

      //Displaying the success message
      res.status(200).json("Successfully Signed Up !");
    } catch (e) {
      res.status(500).json({ error: e });
    }
  });

router
  .route("/:_id")
  .get(async (req, res) => {
    //code here for GET by id

    //Validating the id
    try {
      validation.idValidation(req.params._id);
    } catch (e) {
      return res.status(400).json({ error: e });
    }

    //getting the user with the given id from the DB
    try {
      let thisUser = await userData.getUserById(req.params._id);
      res.json(thisUser);
    } catch (e) {
      console.log(req.params._id);
      res.status(404).json({ error: "User not found" });
    }
  })

  .put(async (req, res) => {
    //code for PUT

    //getting the put body
    let UserInfo = req.body;

    const {
      _id,
      userName,
      firstName,
      lastName,
      email,
      password,
      contactNumber,
      gender,
      preferences,
    } = UserInfo;

    //Validating the contents of UserInfo obj
    try {
    } catch (e) {
      return res.status(400).json({ error: e });
    }

    //checks if the user with given id is present in the database
    try {
      await userData.getUserById(req.params._id);
    } catch (e) {
      return res.status(404).json({ error: "User not found" });
    }

    //updating the user data
    try {
      const updatedUser = await userData.updateUser(
        _id,
        userName,
        firstName,
        lastName,
        email,
        password,
        contactNumber,
        gender,
        preferences
      );
      res.json(updatedUser);
    } catch (e) {
      res.status(500).send(e);
    }
  });

module.exports = router;