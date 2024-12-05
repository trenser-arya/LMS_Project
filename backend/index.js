//import
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const mongoose = require("mongoose");
const userModel = require("./userModel");
const bookModel = require("./bookModel");

// App Initialization
const JWT_SECRET = "AryaPradeep212";
const port = 9453;
const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

//MongoDB Connection
mongoose
  .connect("mongodb://127.0.0.1:27017/lms", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB", error);
  });

// user registration
app.post("/register", async (req, res) => {
  const { name, username, email, phone, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const oldUser = await userModel.findOne({ username });

    if (oldUser) {
      return res.send({ error: "User Exists" });
    }
    await userModel.create({
      name,
      username,
      email,
      phone,
      password: hashedPassword,
    });
    return res.send({ status: "ok" });
  } catch (error) {
    console.log(error);
    res.send({ status: "error" });
  }
});

//book view
app.get("/viewbook", async (req, res) => {
  try {
    const data = await bookModel.find();
    res.json(data);
  } catch (error) {
    console.log(error);
    res.send({ status: "error" });
  }
});

//user view
app.get("/viewuser", async (req, res) => {
  try {
    const data = await userModel.find();
    res.json(data);
  } catch (error) {
    console.log(error);
    res.send({ status: "error" });
  }
});

//view single user
app.get("/singleuser/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = await userModel.findOne({ _id: id });
    res.send(data);
  } catch (error) {
    console.error(error);
    res.send("Unable to fetch data");
  }
});

// user login
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await userModel.findOne({ username });

    if (!user) {
      return res.send({ error: "User not found" });
    }
    if (await bcrypt.compare(password, user.password)) {
      const token = jwt.sign({ id: user._id }, JWT_SECRET, {
        expiresIn: "1w",
      });

      if (res.status(201)) {
        console.log(res);
        return res.json({
          status: "ok",
          data: token,
          role: user.role,
          id: user._id,
        });
      } else {
        return res.json({ error: "error" });
      }
    }
    res.json({ status: "error", error: "Invalid Password" });
  } catch (error) {
    res.send({ status: "error" });
  }
});

//book details fetch
app.get("/singlebook/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = await bookModel.findOne({ _id: id });
    res.send(data);
  } catch (error) {
    console.error(error);
    res.send("Unable to fetch data");
  }
});

//book details post
app.post("/createbook", async (req, res) => {
  try {
    console.log(req.body);
    const result = new bookModel(req.body);
    await result.save();
    res.send("Data Added");
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while saving the data.");
  }
});

//delete book
app.delete("/deletebook/:id", async (req, res) => {
  var id = req.params.id;
  await bookModel.findByIdAndDelete(id);
  res.send("Deleted");
});

//update book
app.put("/updatebook/:id", async (req, res) => {
  let id = req.params.id;
  var result = await bookModel.findByIdAndUpdate(id, req.body);
  res.send("Updated");
});
//update book
app.put("/updateuser/:id", async (req, res) => {
  let id = req.params.id;
  var result = await userModel.findByIdAndUpdate(id, req.body);
  res.send("Updated");
});

//book rented status updating
app.put("/statusbook/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const userId = req.body.userId;
    let book = await bookModel.findById(id);
    if (!book) {
      return res.status(404).send({ message: "Book not found" });
    }
    if (book.available) {
      book.rented = true;
      book.available = false;
      book.rentedBy = userId;
    } else {
      return res.status(400).send({ message: "Book is already rented." });
    }
    await book.save();
    res.status(200).send({ message: "Book status updated successfully", book });
  } catch (error) {
    res.status(500).send({ message: "Error updating book status", error });
  }
});

//return book
app.put("/returnbook/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const userId = req.body.userId;
    let book = await bookModel.findById(id);
    if (!book) {
      return res.status(404).send({ message: "Book not found" });
    }
    if (book.rentedBy.toString() !== userId) {
      return res
        .status(403)
        .send({ message: "You cannot return a book you did not rent." });
    }
    book.rented = false;
    book.available = true;
    book.rentedBy = null;
    await book.save();
    res.status(200).send({ message: "Book returned successfully", book });
  } catch (error) {
    res.status(500).send({ message: "Error returning the book", error });
  }
});

//delete book
app.delete("/deleteuser/:id", async (req, res) => {
  var id = req.params.id;
  await userModel.findByIdAndDelete(id);
  res.send("Deleted");
});

// Port Checking
app.listen(port, () => {
  console.log("App listening on port 9453");
});
