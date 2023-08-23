const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

exports.MiddleWare = asyncHandler(async(req, res, next) => {
  const secretKey = "my_secret_key";
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, secretKey);
      console.log(decoded, "decoded");
      req.user = decoded.user;
      console.log(req.user, " req.user");
      next();
    } catch (error) {
      console.error(error);
      res.status(401);
    }
  }
  if (!token) {
    res.status(401);
    throw new Error("authuntication error");
  }
});
