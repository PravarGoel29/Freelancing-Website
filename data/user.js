const db = require("../config");
const users = db.usersCollection;
const bcrypt = require("bcryptjs");
const errorHandling = require("../validations");
const validations = errorHandling.userValidations;
const { ObjectId } = require("mongodb");
const moment = require("moment");
const Employee = require("./employee");
const Employer = require("./employer");

/**This function is for initital user signup  */
/**Database function for the Users Collection */
const createUser = async (
  userName,
  firstName,
  lastName,
  email,
  password,
  contactNumber,
  gender,
  dob,
  preferences
) => {
  //1. validate arguments
  if (arguments.length !== 5) throw "Incorrect number of arguments!";
  // validations.createUserValidation(
  //   userName,
  //   firstName,
  //   lastName,
  //   email,
  //   password,
  //   contactNumber,
  //   gender,
  //   dob,
  //   preferences
  // );
  // validations.stringtrim(arguments);

  //2. establish db connection
  const usersCollection = await users();

  //3. check if email is already in db
  const count = await usersCollection.countDocuments();
  if (count !== 0) {
    //checks if the email is already in the DB
    const findEmail = await usersCollection.findOne({
      email: email.toLowerCase(),
    });
    if (findEmail !== null) throw "Email is already in use!";
  }

  //4 check if username is already in db
  const countUserName = await usersCollection.countDocuments();
  if (countUserName !== 0) {
    //checks if the username is already in the DB
    const findUserName = await usersCollection.findOne({ userName: userName });
    if (findUserName !== null) throw "Username is already in use!";
  }

  //5. hash the password
  saltRounds = 10;
  const hashedPw = await bcrypt.hash(password, saltRounds);

  //6. Create employee
  let employeeId = Employee.createEmployee(userName, preferences);

  //7. Create employee
  let employerId = Employer.createEmployer(userName);

  //8. Create new user obj
  let newUser = {
    userName: userName.toLowerCase(),
    firstName: firstName,
    lastName: lastName,
    email: email.toLowerCase(),
    hashedPassword: hashedPw,
    dob: new Date(dob),
    contactNumber: contactNumber,
    gender: gender,
    createdAt: new Date().toLocaleDateString(),
    employeeId: employeeId,
    employerId: employerId,
  };

  //9. insert user into the db
  let insertData = await usersCollection.insertOne(newUser);
  if (insertData.acknowldeged === 0 || !insertData.insertedId === 0)
    throw "Could not add new user!";

  //10. get user id
  let user = await usersCollection.findOne({ email: email.toLowerCase() });
  return user["_id"].toString();
};

/**This function is for user login  */
const checkUser = async (username, password) => {
  //1. validate arguments
  // check.userNameValidation(username);
  // check.passwordValidation(password);

  //2. establish db connection
  const usersCollection = await users();

  //3. get all the users in an array
  const usersList = await usersCollection.find({}).toArray();

  //4. checking if all the data has been fetched
  if (!usersList) throw "Could not get all users";

  //5. checks if userName and password are already present in the db or not
  for (let index = 0; index < usersList.length; index++) {
    let currentUser = usersList[index];

    //comparing username
    if (username.toLowerCase().trim() === currentUser.userName) {
      compareToMatch = await bcrypt.compare(
        password,
        currentUser.hashedPassword
      );
      //comparing password with hashedPassword
      if (compareToMatch) {
        //return true if username and password match
        return {
          authenticatedUser: true,
        };
      } else {
        //throw if password does not match hashedPassword
        throw "Either the username or password is invalid";
      }
    }
  }
  //throw if username does not match
  throw "Either the username or password is invalid";
};

const getUserById = async (_id) => {
  //1. validate argument
  // check.idValidation(_id);
  _id = _id.trim();

  //2. establish db connection
  const usersCollection = await users();

  //3. checks if the user with the given id is already in the DB
  const thisUser = await usersCollection.findOne({ _id: ObjectId(_id) });
  if (thisUser === null) throw "No user with that id found";

  //4. converts objectID to a string and returns it
  thisUser._id = thisUser._id.toString();
  return thisUser;
};

const updateUser = async (
  _id,
  userName,
  firstName,
  lastName,
  email,
  password,
  contactNumber,
  gender,
  preferences
) => {
  //1. get user's data with the given id
  let user_var = await getUserById(_id);

  //2. validate argument
  // check.idValidation(movieId);
  // check.titleValidation(title);

  //3. establish db connection
  const usersCollection = await users();

  //4. Updating user obj
  const updatedUser = {
    userName: userName.trim(),
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: password.trim(),
    contactNumber: contactNumber.trim(),
    gender: gender,
    preferences: preferences,
  };

  //5. Storing the updated user in DB
  const updatedInfo = await usersCollection.updateOne(
    { _id: ObjectId(_id) },
    { $set: updatedUser }
  );

  //6. checks if the user was successfully updated and stored in the DB
  if (updatedInfo.modifiedCount === 0) {
    throw "could not update the user successfully";
  }

  //7. returns the updated user's id
  return await getUserById(_id);
};

const getAllUsers = async () => {
  //1. establish db connection
  const usersCollection = await users();

  //2. get all the users in an array
  const usersList = await usersCollection.find({}).toArray();

  //3. checking if all the data has been fetched
  if (!usersList) throw "Could not get all users";
  return usersList;
};

/**Exporting Modules*/
module.exports = {
  createUser,
  getUserById,
  updateUser,
  getAllUsers,
  checkUser,
};
