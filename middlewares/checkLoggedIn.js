function checkLoggedIn(req, res, next) {
  const isLoggedIn = req.isAuthenticated();
  if (!isLoggedIn) {
    return res.status(401).json({ error: "You must login to continue." });
  }
  next();
}

module.exports = {
  checkLoggedIn,
};
