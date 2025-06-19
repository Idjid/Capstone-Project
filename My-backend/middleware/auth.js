const jwt = require('jsonwebtoken');
require('dotenv').config();





module.exports = function (req, res, next) {
  const token = req.header('Authorization');

  if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });

  const actualToken = token.replace('Bearer ', '');

  try {
    const decoded = jwt.verify(actualToken, process.env.MY_SUPER_SECRET);
    console.log('Decoded token:', decoded);
    req.user = decoded;
    next();
  } catch (err) {
    console.error('JWT verify error:', err.name, err.message);
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
