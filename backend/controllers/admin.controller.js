const User = require('../boxes/userBox');
const Book = require('../boxes/bookBox')

exports.getAllUsers = async (req, res) => {
    try {
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
        res.status(500).json({ message: 'Server error. Code 500' });
  }
};

exports.deleteUser = async (req, res) => {
    try {
        if (req.user.role !== 'admin') return res.status(403).json({msg: 'Access denied. Not enough rights'});
        
        const userId = req.params.id;
        const user = await User.findById(userId);


        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        await User.findByIdAndDelete(userId);

        res.status(200).json({msg: 'User has been deleted'});
    } catch (err) {
        res.status(500).json({msg: 'Server error. Code 500'});
    }
};

exports.getAllBooks = async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).json(books);
    } catch (err) {
        res.status(500).json({msg: 'Server error. Code 500'});
    }
};


exports.deleteBook = async (req, res) => {
    try {
        if (req.user.role !== 'admin') return res.status(403).json({msg: 'Access denied. Not enough rights'});

        const bookId = req.params.id;
        const book = await Book.findById(bookId);

        if (!book) {
            return res.status(404).json({msg: 'Book not found'});
        };       

        await Book.findByIdAndDelete(req.params.id);

        res.status(200).json({msg: 'Book deleted'});
    } catch (err) {
        res.status(500).json({msg: 'Server error. Code 500'});
    }
};

exports.postBook = async (req, res) => {
    try {
        console.log('User from req.user:', req.user);
        console.log('Incoming request body:', req.body);
        console.log('Incoming request:', req.body); 
        
        const {
            key,
            title,
            description,
            price,
            bookQuality,
            bookType,
            author,
            location
        } = req.body;

        if (!key || !title || !price || !bookQuality || !bookType || !author) {
            return res.status(400).json({ msg: 'Please fill in all required fields' });
        }

        const existing = await Book.findOne({ key });
        if (existing) {
            return res.status(400).json({ msg: 'This book already exists in database' });
        }
        const coverUrl = `https://covers.openlibrary.org/b/olid/${key.replace("/works/", "")}-M.jpg`;

        const newBook = new Book({
            key,
            title,
            description,
            price,
            bookQuality,
            bookType,
            author,
            location,
            owner: req.user.id
        });

        await newBook.save();

        res.status(201).json({
            msg: 'Book successfully saved',
            book: newBook
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Server error. Code 500' });
    }
};
