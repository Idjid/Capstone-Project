const jwt = require('jsonwebtoken');
const User = require('../boxes/userBox');
require('dotenv').config();

module.exports = async function (req, res, next) {
  const token = req.header('Authorization');

  if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });

  const actualToken = token.replace('Bearer ', '');

  try {
    const decoded = jwt.verify(actualToken, process.env.MY_SUPER_SECRET);

    const user = await User.findById(decoded.id).select('name role');

    if (!user) {
      return res.status(404).json({msg: 'User not found'});
    }

    req.user = {
      id: user._id.toString(),
      name: user.name,
      role: user.role
    };

    next();
  } catch (err) {
    console.error('JWT verify error:', err.name, err.message);
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
