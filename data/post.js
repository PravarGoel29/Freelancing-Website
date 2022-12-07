const db = require("../config");

const posts = db.postsCollection;
const validations = require("../validations/dataValidations");
//const validations = errorHandling.userValidations;
const { ObjectId } = require("mongodb");

/**Database function for the Post Collection */

const getPostById = async (postId) => {
  //validation of id
  validations.validateID(postId)
  postId = postId.trim()
  const postCollection = await posts();
  const postInfo = await postCollection.findOne({ _id: ObjectId(postId) });
  if (postInfo === null) {
    throw 'There is no post for the given id';
  }
  postInfo._id = postInfo._id.toString();
  console.log(postInfo)
  return postInfo;
};

const addPost = async (
  location,
  description,
  postedTime,
  updatedTime,
  imageID,
  status,
  jobType,
  salary
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
    salary: salary,
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
  //if (!PostList) throw "Could not get all posts";
  return PostList;
};

const removePost = async (postId) => {
  //validation of id
  validations.validateID(postId)
  id = postId.trim()
  const postCollection = await posts();
  const postInfo = await postCollection.findOne({ _id: ObjectId(id) });
  if (!postInfo) {
    throw "There is no post for the given id";
  }
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
