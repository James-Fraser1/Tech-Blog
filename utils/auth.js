const withAuth = (req, res, next) => {
    if (!req.session.UserID) {
      res.redirect('/login');
    } else {
      next();
    }
  };
  
  module.exports = withAuth;