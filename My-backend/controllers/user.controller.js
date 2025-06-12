const User = require('../boxes/userBox');


exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
        return res.status(404).json({ msg: 'Profile not found' });
    }

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ msg: 'Server error. Code 500' });
  }
};


exports.getAllUsers = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ msg: 'Access denied. Not enough rights'});
    }

    const users = await User.find().select('-password');
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ msg: 'Server error. Code 500' });
  }
};


exports.deleteUser = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ msg: 'Access denied. Not enough rights' });
    }

    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ msg: 'User has been deleted' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error. Code 500' });
  }
};

exports.deleteAccount = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.user.id);
    res.status(200).json({ msg: 'Your account has been deleted' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error. Code 500' });
    console.log(req.user);
  }
};