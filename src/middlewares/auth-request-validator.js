const authRequestValidator = (req, res, next) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({
      success: false,
      error: "Email or Password missing in the request",
    });
  }
  next();
};

module.exports = authRequestValidator;
