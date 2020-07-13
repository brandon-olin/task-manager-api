const jwt = require("jsonwebtoken");
const User = require("../models/user");

const auth = async (req, res, next) => {
  try {
    // Isolate the actual token from the headers
    const token = req.header("Authorization").replace("Bearer ", "");
    // Verify that the token is legit
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Find the correct user for said token
    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });
    if (!user) {
      // Throw an error if there's no user, which will trigger the catch block below
      throw new Error();
    }

    // Specify which token so that, when logging out, you only log out of the device in
    // question, not all devices
    req.token = token;
    // Store the user in the request body so that the authorization doesn't need to be
    // run again each time
    req.user = user;
    // Call next to move on to the actual route actions
    next();
  } catch (e) {
    res.status(401).send({ error: "Please authenticate." });
  }
};

module.exports = auth;
