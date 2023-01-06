const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
});

userSchema.pre("validate", function (next) {
  if (this.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
    const words = this.email.split("@");
    this.username = words[0];
  }

  next();
});

module.exports = mongoose.model("User", userSchema);
