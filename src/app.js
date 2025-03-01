const express = require("express");
const app = express(); //instance of an express js application
const connectDB = require("./config/database");
const cors = require("cors");
const http = require("http");
require("dotenv").config();
const User = require("./models/user");
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/requests");
const userRouter = require("./routes/user");
const paymentRouter = require("./routes/payment");
const initializeSocket = require("./utils/socket");
const chatRouter = require("./routes/chat");

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());


app.use("/",authRouter);
app.use("/",profileRouter);
app.use("/",requestRouter);
app.use("/",userRouter);
app.use("/",paymentRouter);
app.use("/", chatRouter);


// Get user by email
app.get("/user", async (req, res) => {
  try {
    const userEmail = req.body.emailId;
    const users = await User.find({ emailId: userEmail });
    if (users.length === 0) {
      res.status(404).send("User not found!!");
    } else {
      console.log(users);
      res.send(users);
    }
  } catch (err) {
    res.status(400).send(`Something went wrong!! ${err.message}`);
  }
});

// Feed API - Get /feed - get all the users from the Database
app.get("/feed", async (req, res) => {
  const data = await User.find({});
  res.send(data);
});

// Delete a user from the database
app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    const user = await User.findByIdAndDelete({ _id: userId });
    // const user = await User.findByIdAndDelete(userId);
    // await user.save();
    res.send("User data deleted successfully!!");
  } catch (error) {
    res.status(400).send("Something went wrong!!");
  }
});

// update a user from the database
app.put("/user/:userId", async (req, res) => {
  const userId = req.params?.userId;
  const data = req.body;

  try {
    const ALLOWED_UPDATES = [
      "userId",
      "photoUrl",
      "about",
      "gender",
      "age",
      "skills",
    ];

    const isUpdateAllowed = Object.keys(data).every((k) => {
      ALLOWED_UPDATES.includes(k);
    });

    if (!isUpdateAllowed) {
      throw new Error("Update not allowed!!");
    }

    if (data?.skills.length > 10) {
      throw new Error("Skills cannot be more than 10");
    }
    const user = await User.findByIdAndUpdate({ _id: userId }, data);
    console.log(user);
    res.send("User updated successfully!!");
  } catch (err) {
    res.status(400).send("UPDATE FAILED : " + err.message);
  }
});

const server = http.createServer(app);
initializeSocket(server);

connectDB()
  .then(() => {
    console.log("Database connection established!!");
    server.listen(3000, () => {
      console.log("Server is listening on the port : 3000");
    });
  })
  .catch((err) => {
    console.log("Error while connecting to the databse : ", err);
  });
