const Favorite = require('../boxes/favoriteBox');


exports.addFavorite = async (req, res) => {
  try {
    const { bookId } = req.body;

    let favorite = await Favorite.findOne({ userId: req.user.id});

    if (favorite) {
      if (favorite.bookIds.includes(bookId)) {
        return res.status(400).json({msg: 'The book is already in your list'});
      }
      
      favorite.bookIds.push(bookId);
      await favorite.save();
      return res.status(200).json(favorite);
    } else {
      const newFavorite = new Favorite ({
        userId: req.user.id,
        bookIds: [bookId]
      });

      const saved = await newFavorite.save();
      return res.status(201).json(saved);
    }
  } catch (err) {
    console.error('Add to favorite error:', err);
    res.status(500).json({msg: 'Server error. Code 500'});
  }
};


exports.getFavorite = async (req, res) => {
  try {
    const favorite = await Favorite.find({ userId: req.user.id }).populate('bookIds');
    
    if (!favorite) {
      return res.status(200).json({ bookIds: [] });
    }

    res.status(200).json(favorite);
  } catch (err) {
    res.status(500).json({ msg: 'Server error. Error code 500' });
  }
};


exports.deleteFavorite = async (req, res) => {
  try {
    const bookId = req.params.bookId;

    const favorite = await Favorite.findOne({ userId: req.user.id });
    
    if (!favorite) {
      return res.status(404).json({msg: 'Favorite list not found'});
    }    

    if (!favorite.bookIds.map(id => id.toString()).includes(bookId)) {
      return res.status(400).json({ msg: 'Book is not in the favorite list'});
    }

    favorite.bookIds = favorite.bookIds.filter(id => id.toString() !== bookId);
    await favorite.save();

    res.status(200).json({ msg: 'Removed from favorites' });
  } catch (err) {
    console.error('Deleted favorite error:', err);
    res.status(500).json({ msg: 'Server error. Error code 500' });
  }
};