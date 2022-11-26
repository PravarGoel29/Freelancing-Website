const express = require("express");
const router = express.Router();
const validations = errorHandling.userValidations;
const { ObjectId } = require("mongodb");
const db = require("../config");
const userData = require("../data/user");
//require path
const path = require("path");

router
  .route('/user')
  .get(async (req, res) => {
    //code here for GET
    try {
      const userInfo = await userData.getAllUser();
      let result = [];
      for (const user of userInfo) {
        result.push({
          _id: user._id,
          preferences: user.preferences
        })
      }
      res.status(200).json(result);
    } catch (e) {
      res.status(400).json({ error: e });
      return
    }
  })
  .post(async (req, res) => {
    const userBody = req.body;
    try {
      // NEED TO VALIDATE SCHEMA AND BODY     
      //   helper.validatePayloadSchema(moviesBody);
      //   helper.checkFields(
      //     req.body.title,
      //     req.body.plot,
      //     req.body.genres,
      //     req.body.rating,
      //     req.body.studio,
      //     req.body.director,
      //     req.body.castMembers,
      //     req.body.dateReleased,
      //     req.body.runtime
      //   )
      //   helper.checkTitle(req.body.title);
      //   helper.checkStudio(req.body.studio);
      //   helper.checkDirector(req.body.director);
      //   helper.checkRating(req.body.rating);
      //   helper.checkGenres(req.body.genres);
      //   helper.checkCastMembers(req.body.castMembers);
      //   helper.checkDate(req.body.dateReleased);
      //   helper.checkRuntime(req.body.runtime);
    } catch (e) {
      res.status(400).json({ error: e });
      return;
    }
    try {
      const { userName, firstName, lastName, email, password, contactNumber, gender, dob, preferences } = userBody
      const user = await userData.createUser(
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
      res.status(200).json(user);
      return;
    } catch (e) {
      res.status(400).json({ error: e });
      return;
    }
  });

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
// try {
// } catch (e) {
//   return res.status(400).json({ error: e });
// }

//calling the createUser function with post body contents as it's arguments
try {
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

router
  .route("/:_id")
  .get(async (req, res) => {
    //code here for GET by id

    //Validating the id
    // try {
    //   validation.idValidation(req.params._id);
    // } catch (e) {
    //   return res.status(400).json({ error: e });
    // }

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
    // try {
    // } catch (e) {
    //   return res.status(400).json({ error: e });
    // }

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
