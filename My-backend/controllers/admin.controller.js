const User = require('../boxes/userBox');

exports.getAllUsers = async (req, res) => {
    try {
        if (req.user.role !== 'admin') return res.status(403).json({msg: 'Access denied. Not enough rights'});
        const users = await User.find().select('-password');
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ msg: 'Servers error. Code 500'});
    }
};

exports.getOneUser = async (req, res) => {
    try {
        const userId = req.params.id; 

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error 500' });
  }
};

exports.deleteUser = async (req, res) => {
    try {
        if (req.user,role !== 'admin') return res.status(403).json({msg: 'Access denied. Not enough rights'});
        await User.findByIdAndDelete(req.params.userId);
        res.status(200).json({msg: 'User has been deleted'});
    } catch (err) {
        res.status(500).json({msg: 'Server error. Code 500'});
    }
};

exports.getAllBooks = async (req, res) => {
    try {
        if (req.user.role !== 'admin') return res.status(403).json({msg: 'Access denied. Not enough rights'});
        const books = await Books.find().populate('book', 'id name');
        res.status(200).json(books);
    } catch (err) {
        res.status(500).json({msg: 'Server error. Code 500'});
    }
};


exports.deleteBook = async (req, res) => {
    try {
        if (req.user,role !== 'admin') return res.status(403).json({msg: 'Access denied. Not enough rights'});
        await Books.findByIdAndDelete(req.params.bookId);
        if (!book) {
            return res.status(404).json({msg: 'Book not found'});
        };        
        res.status(200).json({msg: 'Book deleted'});
    } catch (err) {
        res.status(500).json({msg: 'Server error. Code 500'});
    }
};

