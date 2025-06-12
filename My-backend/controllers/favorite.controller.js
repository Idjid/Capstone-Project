const Favorite = require('../boxes/favoriteBox');


exports.addFavorite = async (req, res) => {
  try {
    const { bookId } = req.body;

    const exists = await Favorite.findOne({ student: req.user.id, books: bookId });
    if (exists) return res.status(400).json({ msg: 'Already in your favorite list' });

    const favorite = new Favorite({
      student: req.user.id,
      books: bookId
    });
    

    const saved = await favorite.save();
    console.log('Saved favorite:', saved);
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ msg: 'Server error. Error code 500' });
  }
};


exports.getFavorite = async (req, res) => {
  try {
    const favorites = await Favorite.find({ student: req.user.id }).populate('books');
    res.status(200).json(favorites);
  } catch (err) {
    res.status(500).json({ msg: 'Server error. Error code 500' });
  }
};


exports.deleteFavorite = async (req, res) => {
  try {
    await Favorite.findOneAndDelete({ student: req.user.id, books: req.params.bookId });
    res.status(200).json({ msg: 'Removed from favorites' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error. Error code 500' });
  }
};