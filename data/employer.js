const db = require("../config");
const employers = db.employerCollection;
const bcrypt = require("bcryptjs");
const errorHandling = require("../validations");
const validations = errorHandling.userValidations;
const { ObjectId } = require("mongodb");
const moment = require("moment");

/**Database function for the Employer Collection */
const createEmployer = async (userName) => {
  //0. establish db connection
  const employerCollection = await employers();
  //1. create a new employee obj
  let newEmployer = {
    userName: userName,
    historyOfJobs: [],
    overallRating: [],
    reported: [],
    flag: false,
  };

  //2. insert employee into the db
  let insertEmployerData = await employerCollection.insertOne(newEmployer);
  if (
    insertEmployerData.acknowldeged === 0 ||
    !insertEmployerData.insertedId === 0
  )
    throw "Could not add new employer!";

  //3. get user id
  let employer = await employerCollection.findOne({ userName: userName });
  return employer["_id"].toString();
};


const getAllEmployer = async () => {
  const employerCollection = await employers();
  const employerList = await employerCollection.find({}).toArray();
  for (let employerData of employerList) {
    employerData._id = employerData._id.toString();
  }
  return employerList;
};

const getEmployerById = async (_id) => {
  //0. validate arguments
  // check.idValidation(_id);
  _id = _id.trim();

  //1. establish db connection
  const employerCollection = await employers();

  //2. checks if the employer with the given employerID is already in the DB
  const thisEmployer = await employerCollection.findOne({ _id: ObjectId(_id) });
  if (thisEmployer === null) throw "No employer with that id found";

  //3. converts objectID to a string and returns it
  thisEmployer._id = thisEmployer._id.toString();
  return thisEmployer;
};

/**Exporting Modules*/
module.exports = {
  createEmployer,
  getEmployerById,

  getAllEmployer
};
