// //require express and express router
// const express = require("express");
// const router = express.Router();

// //require data file
// const data = require("../data");
// const userData = data.users;

// const postData = data.posts;

// //require path
// const path = require("path");

// //require validations file
// //const validation = require("../validations");

// router
//   .route("/")
//   .get(async (req, res) => {
//     //code for GET

//     //rendering the signup page
//     res.sendFile(path.resolve("static/login.html"));
//   })
//   .post(async (req, res) => {
//     //code for POST

//     //getting the post body
//     const UserInfo = req.body;

//     try {
//       const { userName, password } = UserInfo;

//       //Validating the contents of UserInfo obj
//       // try {
//       // } catch (e) {
//       //   return res.status(400).json({ error: e });
//       // }

//       //calling the getAllUsers function with post body contents as it's arguments
//       const AllUsers = await userData.getAllUsers();

//       let flag = false;

//       for (let index = 0; index < AllUsers.length; index++) {
//         let currentUser = AllUsers[index];
//         console.log(typeof currentUser);
//         if (userName === currentUser.userName) {
//           if (password === currentUser.hashedPassword) {
//             flag = true;
//             break;
//           } else {
//             throw "Incorrect username or password !";
//           }
//         }
//         if (!flag) {
//           throw "Incorrect username or password!";
//         }
//       }

//       const allPosts = await postData.getAllPosts();

//       context = {
//         title: "Landing Page",
//         Name: allPosts._id,
//         peopleStatus: true,
//         allPosts: allPosts,
//       };

//       //Displaying the success message
//       res.status(200).render("landing", context);
//       //res.status(200).json("Successfully Signed Up !");
//     } catch (e) {
//       res.status(500).json({ error: e });
//     }
//   });

// module.exports = router;
