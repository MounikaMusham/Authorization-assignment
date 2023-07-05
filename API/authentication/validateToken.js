
function authorizeToken(req, res, next) {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1]; 
  
    if (!token) {
      return res.status(401).json({ error: 'Token not provided' });
    }
  
    jwt.verify(token, '#MMM@vvvv@AAA@AAA#', (err, user) => {
      if (err) {
        return res.status(403).json({ error: 'Invalid token' });
      }
      req.user = user;
      next();
    });
  }
  
  module.exports = {
    authorizeToken,
  };