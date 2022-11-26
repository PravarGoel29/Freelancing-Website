const db = require("../config");

const posts = db.postsCollection;
const errorHandling = require("../validations/dataValidations");
const validations = errorHandling.userValidations;
const { ObjectId } = require("mongodb");

/**Database function for the Post Collection */
const getPostById = async (PostId) => {
  // if (!PostId) {
  //   throw 'You must provide an id to search for';
  // }
  // if (typeof PostId !== 'string') {
  //   throw 'Id must be a string';
  // }
  // if (PostId.trim().length === 0) {
  //   throw 'Id cannot be an empty string or just spaces';
  // }
  // id = PostId.trim();
  // if (!ObjectId.isValid(id)) {
  //   throw 'invalid object ID';
  // }
  // const postCollection = await posts();
  // const post = await postCollection.findOne({ _id: ObjectId(id)});
  // if (post === null) {
  //   throw 'no post with that id';
  // }
  // post._id = post._id.toString();
  // return post;
};

const addPost = async (
  location,
  description,
  postedTime,
  updatedTime,
  imageID,
  status,
  jobType
) => {
  const postCollection = await posts();
  var currentdate = new Date();
  var postedTime =
    currentdate.getMonth() +
    1 +
    "/" +
    currentdate.getDate() +
    "/" +
    currentdate.getFullYear() +
    " / " +
    currentdate.toLocaleTimeString();
  var updatedTime =
    currentdate.getDate() +
    "/" +
    (currentdate.getMonth() + 1) +
    "/" +
    currentdate.getFullYear() +
    " / " +
    currentdate.toLocaleTimeString();

  const newPost = {
    location: location,
    description: description,
    postedTime: postedTime,
    updatedTime: updatedTime,
    imageID: imageID,
    domain: [],
    tags: [],
    reviewIDs: [],
    status: status,
    jobType: jobType,
    salary: null,
    applicants: [],
    candidates: [],
  };
  let insertPostData = await postCollection.insertOne(newPost);
  if (insertPostData.acknowldeged === 0 || !insertPostData.insertedId === 0)
    throw "Could not add new Post!";
  const PostId = insertPostData.insertedId.toString();
  const post = await postCollection.findOne({ _id: ObjectId(PostId) });
  return post;
};

const getAllPosts = async () => {
  const postCollection = await posts();
  const PostList = await postCollection.find({}).toArray();
  return PostList;
};

const removePost = async (PostId) => {
  // if (!PostId) {
  //   throw 'You must provide an id to search for';
  // }
  // if (typeof PostId !== 'string') {
  //   throw 'Id must be a string';
  // }
  // if (PostId.trim().length === 0) {
  //   throw 'id cannot be an empty string or just spaces';
  // }
  // id = PostId.trim();
  // if (!ObjectId.isValid(id)) {
  //   throw 'invalid object ID';
  // }
  const postCollection = await posts();
  const deletionInfo = await postCollection.deleteOne({ _id: ObjectId(id) });

  if (deletionInfo.deletedCount === 0) {
    throw `Could not delete post with id of ${id}`;
  }
  return { deleted: true };
};
module.exports = {
  getPostById,
  addPost,
  getAllPosts,
  removePost,
};
