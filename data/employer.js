const db = require("../config");
const employers = db.employerCollection;
const errorHandling = require("../validations");
const validations = errorHandling.userValidations;
const { ObjectId } = require("mongodb");
const moment = require("moment");

/**Database function for the Employer Collection */
const createEmployer = async (userName) => {
  validations.validateUsername(userName);
  userName = userName.toLowerCase();
  //0. establish db connection
  const employerCollection = await employers();
  //1. create a new employee obj
  let newEmployer = {
    userName: userName,
    historyOfJobs: [],
    overallRating: 0,
    reported: [],
    flag: false,
  };

  //2. insert employee into the db
  let insertEmployerData = await employerCollection.insertOne(newEmployer);
  if (insertEmployerData.acknowldeged === 0 || !insertEmployerData.insertedId === 0)
    throw "Could not add new employer!";

  //3. get user id
  let employer = await employerCollection.findOne({ userName: userName });
  return employer["_id"].toString();
};

const getEmployerById = async (employerId) => {
  //0. validate arguments
  validations.validateID(employerId);
  employerId = employerId.trim();

  //1. establish db connection
  const employerCollection = await employers();

  //2. checks if the employer with the given employerID is already in the DB
  const thisEmployer = await employerCollection.findOne({ _id: ObjectId(employerId) });
  if (thisEmployer === null) throw "No employer with that id found";

  //3. converts objectID to a string and returns it
  thisEmployer._id = thisEmployer._id.toString();
  return thisEmployer;
};

const getAllEmployers = async () => {
  const employerCollection = await employers();
  const employersList = await employerCollection.find({}).toArray();
  if (!employersList) throw "Could not get all employers";
  return employersList;
};

const removeEmployer = async (employerId) => {
  //check.idValidation(id);

  const employer = await getEmployerById(id);
  const employerCollection = await employers();
  const deletionInfo = await employerCollection.deleteOne({
    _id: ObjectId(employerId),
  });

  if (deletionInfo.deletedCount === 0) {
    throw `Could not delete the employer with id of ${employerId}`;
  }
  return employer.userName + " has been successfully deleted";
};

const addPost = async (userName, employerId, postID) => {
  validations.validateUsername(userName);

  const employerCollection = await employers();

  //2. checks if the employer with the given employerID is already in the DB
  const thisEmployer = await employerCollection.findOne({ _id: ObjectId(employerId) });
  if (thisEmployer === null) throw "No employer with that id found";

  console.log(thisEmployer);
  let historyOfJobs_ = thisEmployer.historyOfJobs;
  historyOfJobs_.push(postID);
  const updatedEmployer = await employerCollection.updateOne(
    { _id: ObjectId(employerId) },
    {
      $set: {
        userName: userName,
        historyOfJobs: historyOfJobs_,
        overallRating: thisEmployer.overallRating,
        reported: thisEmployer.reported,
        flag: thisEmployer.flag,
      },
    }
  );

  if (updatedEmployer.modifiedCount === 0) {
    throw "Employer not modified!";
  }

  return await getEmployerById(employerId);
};

/**Exporting Modules*/
module.exports = {
  createEmployer,
  getEmployerById,
  getAllEmployers,
  removeEmployer,
  addPost,
};
