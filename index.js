const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/jobposts", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define job post schema
const jobPostSchema = new mongoose.Schema({
  jobTitle: String,
  jobDescription: String,
});

// Define job post model
const JobPost = mongoose.model("JobPost", jobPostSchema, "collection");

//CREATE A NEW JOB POST
/* This code is creating a new job post by handling a POST request to the "/jobposts" endpoint. It
creates a new instance of the JobPost model with the job title and job description taken from the
request body, saves it to the database using the `save()` method, and sends the saved job post as a
response. If there is an error during the save operation, it sends a 500 status code with the error
message. */
app.post("/jobposts", async (req, res) => {
  const jobPost = new JobPost({
    jobTitle: req.body.jobTitle,
    jobDescription: req.body.jobDescription,
  });

  try {
    await jobPost.save();
    res.send(jobPost);
  } catch (err) {
    res.status(500).send(err);
  }
});

// GET ALL JOB POSTS
/* This code is handling a GET request to the "/jobposts" endpoint. It retrieves all job posts from the
MongoDB database using the `find()` method of the JobPost model, and sends them as a response. If
there is an error during the retrieval operation, it sends a 500 status code with the error message. */
app.get("/jobposts", async (req, res) => {
  try {
    const jobPosts = await JobPost.find();
    res.send(jobPosts);
  } catch (err) {
    res.status(500).send(err);
  }
});

// GET A JOB POST BY ID
/* This code is handling a GET request to the "/jobposts/:id" endpoint, where ":id" is a parameter that
represents the unique identifier of a specific job post. It retrieves the job post with the
specified ID from the MongoDB database using the `findById()` method of the JobPost model, and sends
it as a response. If the job post with the specified ID is not found, it sends a 404 status code. If
there is an error during the retrieval operation, it sends a 500 status code with the error message. */
app.get("/jobposts/:id", async (req, res) => {
  try {
    const jobPost = await JobPost.findById(req.params.id);
    if (!jobPost) {
      return res.status(404).send();
    }
    res.send(jobPost);
  } catch (err) {
    res.status(500).send(err);
  }
});

// UPDATE
/* This code is handling a PATCH request to the "/jobposts/:id" endpoint, where ":id" is a parameter
that represents the unique identifier of a specific job post. It updates the job post with the
specified ID in the MongoDB database using the `findByIdAndUpdate()` method of the JobPost model,
with the new data provided in the request body. The `{ new: true }` option is used to return the
updated job post as a response. If the job post with the specified ID is not found, it sends a 404
status code. If there is an error during the update operation, it sends a 500 status code with the
error message. */
app.patch("/jobposts/:id", async (req, res) => {
  try {
    const jobPost = await JobPost.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!jobPost) {
      return res.status(404).send();
    }
    res.send(jobPost);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Delete a job post
/* This code is handling a DELETE request to the "/jobposts/:id" endpoint, where ":id" is a parameter
that represents the unique identifier of a specific job post. It deletes the job post with the
specified ID from the MongoDB database using the `findByIdAndDelete()` method of the JobPost model.
If the job post with the specified ID is not found, it sends a 404 status code. If there is an error
during the deletion operation, it sends a 500 status code with the error message. The deleted job
post is sent as a response. */
app.delete("/jobposts/:id", async (req, res) => {
  try {
    const jobPost = await JobPost.findByIdAndDelete(req.params.id);
    if (!jobPost) {
      return res.status(404).send();
    }
    res.send(jobPost);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Start the server
/* `app.listen(3000, () => { console.log("Server started on port 3000"); });` is starting the server
and listening for incoming requests on port 3000. Once the server is started, it logs a message to
the console indicating that the server has started successfully. */
app.listen(3000, () => {
  console.log("Server started on port 3000");
});
