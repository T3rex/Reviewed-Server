const jwt = require("jsonwebtoken");
const { JWT_PRIVATE_KEY } = require("../config/server-config");

const authenticateUser = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
      return res
        .status(400)
        .json({ success: false, error: "Auth token not found" });
    }
    const user = jwt.verify(token, JWT_PRIVATE_KEY);
    req.user = user;
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ success: false, error: "Invalid or expired token" });
  }
};

module.exports = authenticateUser;
