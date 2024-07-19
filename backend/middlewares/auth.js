const { getUser } = require("../services/auth");

async function restrictToLoggedInOnly(req, res) {
  const userUid = req.cookies?.uid;
  if (!userUid) {
    return res.status(401).json({ message: "Unauthorized access" });
  }
  const user = getUser(userUid);
  if (!user) {
    return res.status(401).json({ message: "Unauthorized access" });
  }
  req.user = user;
  next();
}
module.exports = { restrictToLoggedInOnly };
