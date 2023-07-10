const { User } = require("../modals/user");
function authenticationByUser(req, res, next) {
  const token = req.header("x-auth");

  if (token) {
    User.findByToken(token)
      .then((user) => {
        req.user = user;
        req.token = token;
        next();
      })
      .catch((err) => {
        res.send(err);
      });
  } else {
    res.send("token must be provide");
  }
}
module.exports = { authenticationByUser };
