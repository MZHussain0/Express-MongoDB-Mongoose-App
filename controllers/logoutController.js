const User = require("../models/User");

const handleLogout = async (req, res) => {
  //on client, also delete the access token
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204); //no content
  const refreshToken = cookies.jwt;

  //finding the user
  const foundUser = await User.findOne({ refreshToken }).exec();
  if (!foundUser) {
    res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
    return res.sendStatus(204);
  }

  // delete refreshToken from DB
  foundUser.refreshToken = "";
  const result = await foundUser.save();
  console.log("🚀 ~ file: logoutController.js:19 ~ result", result);

  res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
  res.sendStatus(204);
};

module.exports = { handleLogout };
