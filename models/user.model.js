const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require('bcrypt');

//define schema for user data
const UserSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: [true, "A user must have a first name"],
  },
  lastname: {
    type: String,
    required: [true, "A user must have a last name"],
  },
  email: {
    type: String,
    required: [true, "A user must have an email"],
    unique: [true, "A user email must be unique"],
    lowercase: true,
    validate: [validator.isEmail, "Please, enter a valid email"],
  },
  password: {
    type: String,
    required: true,
  },
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
});

//add a pre-hook function to the UserSchema. This function gets called before the user info is stored in the database
UserSchema.pre("save", async function (next) {
 //hash incoming password before saving to db
 this.password = await bcrypt.hash(this.password, 12);
 next()
});
//This method will chain a function that compares and validates the password.
UserSchema.methods.isValidPassword = async function (
  currentPassword,
  storedUserPassword
) {
  return await bcrypt.compare(currentPassword, storedUserPassword);
};

//create User model object
const User = mongoose.model("User", UserSchema);
module.exports = User;
