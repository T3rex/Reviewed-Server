const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { BCRYPT_SALTROUND } = require("../config/server-config");

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Please fill a valid email address",
      ],
    },
    campaignList: [
      { type: Schema.Types.ObjectId, ref: "Campaign", unique: true },
    ],

    password: { type: String, required: true },
  },
  { timestamps: true }
);

userSchema.pre("save", function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  bcrypt.hash(this.password, parseInt(BCRYPT_SALTROUND)).then((hash) => {
    this.password = hash;
    next();
  });
});
const User = mongoose.model("User", userSchema);

module.exports = User;
