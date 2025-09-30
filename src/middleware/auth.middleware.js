const jwt = require('jsonwebtoken');
module.exports = function auth(req, res, next){
  const authHeader = req.headers.authorization;
  if(!authHeader || !authHeader.startsWith('Bearer ')) return res.status(401).json({ error:'No token' });
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    req.admin = decoded;
    next();
  } catch(err) {
    return res.status(401).json({ error: 'Token invalid' });
  }
}
