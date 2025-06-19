const User = require('../boxes/userBox');
const Book = require('../boxes/bookBox')

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
        if (req.user.role !== 'admin') return res.status(403).json({msg: 'Access denied. Not enough rights'});
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
        if (req.user.role !== 'admin') return res.status(403).json({msg: 'Access denied. Not enough rights'});

        const {title, description, price, bookQuality, bookType, author} = req.body;        

        if (!title || !description || !price || !bookQuality || !bookType || !author) {
            return res.status(400).json({ msg: 'Please fill in all fields' });
        };

        const exBook = await Book.findOne({ title });
        
        if (exBook) {
            return res.status(400).json({ msg: 'This book already exists' });
        };
        

        const newBook =  new Book ({
            title,
            description,
            price,
            bookQuality,
            bookType,
            author
        }); 

        await newBook.save();

        res.status(201).json({
            book: {
                title: newBook.title,
                description: newBook.description,
                price: newBook.price,
                bookQuality: newBook.bookQuality,
                bookType: newBook.bookType,
                author: newBook.author
            }
        });

    }  catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Server error' });
    };
};