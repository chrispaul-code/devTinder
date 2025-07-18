const jwt = require('jsonwebtoken');
const User = require('../models/user');

const userAuth = async (req, res, next) => {
  try {
    const token =
      req.cookies?.Token ||
      req.headers.authorization?.split("Bearer ")[1];

    if (!token) {
      return res.status(401).send("Please daaa Login!!");
    }

    const decodedObj = jwt.verify(token, "CHRIS$1311");

    const user = await User.findById(decodedObj._id);
    if (!user) {
      throw new Error("User not Found");
    }

    req.user = user;
    next();
  } catch (err) {
    res.status(401).send("ERROR: " + err.message);
  }
};

module.exports ={
    userAuth
}