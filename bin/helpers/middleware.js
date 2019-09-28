//checks if user is logged in

const isLoggedIn = (req, res, next) => {
  if (req.session.email) {
    return next();
  }
  req.flash('error', 'You need to be logged in to access this page.');
  res.redirect('/');
};

module.exports = {isLoggedIn};
