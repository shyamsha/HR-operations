const { authenticationByUser } = require("./authenticate");
function authorizationByUser(req, res, next) {
  if (authenticationByUser) {
    req.user.role.map((role) => {
      if (role === "hr") {
        next();
      } else if (role === "employee") {
        console.log(req.method, req.url);
        if (req.url === "/") {
          if (req.method === "GET") {
            next();
          } else {
            res.status(403).send({
              error: "You are unauthorized to access this URL",
            });
          }
        }
      }
    });
  }
}
module.exports = { authorizationByUser };
