const jwt = require("jsonwebtoken");
const secret = "Y@Raa2B%!*sEcUrePa$$w0rd";

function setUser(user) {
  const payload = {
    id: user._id,
    email: user.email,
  };
  const token = jwt.sign(payload, secret, { expiresIn: "1h" });
  return token;
}

function getUser(token) {
  if (!token) return null;
  try {
    return jwt.verify(token, secret);
  } catch (err) {
    return null;
  }
}
module.exports = { setUser, getUser };
