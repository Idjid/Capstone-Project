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
    let users;

    if (req.user.role !== 'admin') {
      users = await User.find().select('-password');
    } else {
      users = await User.find().select('name email role');
    }

    res.status(200).json(users);
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

exports.updateName = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name || typeof name !== 'string') {
      return res.status(400).json({ msg: 'Invalid name' });
    }

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { name },
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    res.status(200).json({ msg: 'Name updated', user });
  } catch (err) {
    res.status(500).json({ msg: 'Server error. Code 500' });
  }
};


exports.updateDescription = async (req, res) => {
  try {
    const { description } = req.body;

    if (typeof description !== 'string') {
      return res.status(400).json({ msg: 'Invalid description' });
    }

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { description },
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    res.status(200).json({ msg: 'Description updated', user });
  } catch (err) {
    res.status(500).json({ msg: 'Server error. Code 500' });
  }
};


exports.updateAddress = async (req, res) => {
  try {
    const { country, state, city } = req.body;

    const updatedFields = {};
    if (country) updatedFields['address.country'] = country;
    if (state) updatedFields['address.state'] = state;
    if (city) updatedFields['address.city'] = city;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { $set: updatedFields },
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    res.status(200).json({ msg: 'Address updated', user });
  } catch (err) {
    res.status(500).json({ msg: 'Server error. Code 500' });
  }
};

exports.updatePicture = async (req, res) => {
  try {
    const { picture } = req.body;

    if (typeof picture !== 'string' || !picture.startsWith('http')) {
      return res.status(400).json({ msg: 'Invalid image URL' });
    }

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { picture },
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    res.status(200).json({ msg: 'Picture updated', user });
  } catch (err) {
    res.status(500).json({ msg: 'Server error. Code 500' });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) return res.status(404).json({ msg: 'User not found' });

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ msg: 'Server error. Code 500' });
  }
};
