const User = require('../boxes/userBox');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config(); 

console.log('SECRET in controller:', process.env.MY_SUPER_SECRET);




exports.userRegister = async (req, res) => {
  try {
    let { name, email, password, role } = req.body;

    const exUser = await User.findOne({ email });
    if (exUser) {
      return res.status(400).json({ msg: 'This user already exists' });
    };

    if (!name || !email || !password || !role) {
      return res.status(400).json({ msg: 'Please fill in all fields' });
    };

    if (role !== 'reader' && role !== 'author') {
      role = 'reader'; 
    };

    
    
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role
    });

    await newUser.save();

    const token = jwt.sign(
      { id: newUser._id, role: newUser.role },
      process.env.MY_SUPER_SECRET,
      { expiresIn: '1d' }
    );

    res.status(201).json({
      token,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role
      }
    });

  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server error' });
  };
};


exports.userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

   
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).json({ msg: 'Invalid credentials' });
    };

    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ msg: 'Invalid credentials' });
    }

    
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.MY_SUPER_SECRET, {
      expiresIn: '1d',
    });

    res.status(200).json({ token });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ msg: 'Server error' });
  };
};