const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Schema } = mongoose;
const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  tokens: [
    {
      token: {
        type: String,
      },
    },
  ],
  role: {
    type: [
      {
        type: String,
        enum: ["hr", "employee"],
      },
    ],
    default: ["employee"],
  },
});
//hash password
userSchema.pre("save", function (next) {
  if (this.isNew) {
    bcryptjs.genSalt(10).then((salt) => {
      bcryptjs
        .hash(this.password, salt)
        .then((hashPassword) => {
          this.password = hashPassword;
          next();
        })
        .catch((err) => {
          console.log(err);
        });
    });
  } else {
    next();
  }
});
//checking email and password correct or not written by user
userSchema.statics.findByCredentials = function (email, password) {
  return User.findOne({ email })
    .then((user) => {
      if (user) {
        return bcryptjs
          .compare(password, user.password)
          .then((result) => {
            if (result) {
              return Promise.resolve(user);
            } else {
              return Promise.reject("invalid email or password");
            }
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      } else {
        return Promise.reject("invalid email or password");
      }
    })
    .catch((err) => {
      return Promise.reject(err);
    });
};
//generate by token while user login
userSchema.methods.generateByToken = function () {
  user = this; //referring the user object in side User model
  const userId = {
    user_id: user._id,
    user_role: user.role,
  };

  const token = jwt.sign(userId, "9849084994");

  user.tokens.push({ token });
  return user
    .save()
    .then((user) => {
      return token;
    })
    .catch((err) => {
      return err;
    });
};
userSchema.statics.findByToken = function (token) {
  let tokenData;
  try {
    tokenData = jwt.verify(token, "9849084994");
  } catch (err) {
    return Promise.reject(err);
  }

  return User.findOne({
    _id: tokenData.user_id,
    "tokens.token": token, //check in form db delete or present
  })
    .then((user) => {
      return Promise.resolve(user);
    })
    .catch((err) => {
      return Promise.reject(err);
    });
};
const User = mongoose.model("User", userSchema);
module.exports = {
  User,
};
