function checkLoggedIn(_, res, next) {
  const isLoggedIn = true;
  if (!isLoggedIn) {
    return res.status(401).json({ error: "You must login to continue." })
  }
  next();
}

module.exports = {
  checkLoggedIn
}
