const User = require("../models/user");
const jwt = require("jsonwebtoken");
const maxAge = 5 * 24 * 60 * 60;

const createJWT = (id) => {
  return jwt.sign({ id }, "chatroom secret", {
    expiresIn: maxAge,
  });
};

const alternateError = (err) => {
  let errors = { name: "", email: "", password: "" };
  console.log(`error message: ${err.message}`);
  console.log(`error code: ${err.code}`);
  console.log("err", err);
  if (err.message.includes("user validation failed")) {
    Object.values(err.errors).forEach((error) => {
      errors[error.properties.path] = error.properties.message;
      console.log("object created");
      console.log(
        `Error in ${error.properties.path}: ${errors[error.properties.path]}`
      );
    });
  }
  if (err.message.includes("E11000 duplicate key error collection")) {
    errors.email = "account already exists";
    console.log("object created");
  }
  if (err.message === "incorrect email") {
    errors.email = "create an account";
  }
  if (err.message === "incorrect password") {
    errors.password = "did you forget your password?";
  }

  return errors;
};

module.exports.signup = async (req, res) => {
  console.log("req.body", req.body);
  const { name, email, password } = req.body;
  try {
    const user = await User.create({ name, email, password });
    const token = createJWT(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(201).json({ user });
  } catch (error) {
    let errors = alternateError(error);
    res.status(400).send(errors);
    console.log(errors);
  }
};

module.exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    const token = createJWT(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(201).json({ user });
  } catch (error) {
    let errors = alternateError(error);
    res.status(400).send(errors);
    console.log(errors);
  }
};

module.exports.verifyuser = (req, res, next) => {
  // if (req) {
  //   console.log("recieved req......");
  // }
  const token = req.cookies.jwt;
  console.log(token);
  if (token) {
    jwt.verify(token, "chatroom secret", async (err, decodedToken) => {
      console.log("decoded token", decodedToken);
      if (err) {
        console.log(err.message);
      } else {
        let user = await User.findById(decodedToken.id);
        console.log(user);
        res.json(user);
        next();
      }
    });
  } else {
    res.status(404);
  }
};

module.exports.logout = (req, res) => {
  res.cookie("jwt", ":", { maxAge: 1 });
  res.status(200).json({ LogOut: true });
};
