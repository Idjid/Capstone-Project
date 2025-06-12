const Review = require('../boxes/reviewsBox');

exports.createReview = async (req, res) => {
  try {
    const { book, rating, comment } = req.body;

    const review = new Review({
      book,
      user: req.user.id,
      rating,
      comment
    });

    const sav = await review.save();
    res.status(201).json(sav);
  } catch (err) {
    res.status(500).json({ msg: 'Server error. Error code 500' });
  }
};

exports.getReview = async (req, res) => {
  try {
    const reviews = await Review.find({ book: req.params.id }).populate('user', 'name');
    res.status(200).json(reviews);
  } catch (err) {
    res.status(500).json({ msg: 'Server error. Error code 500' });
  }
};


exports.deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ msg: 'Review not found' });

    
    if (review.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ msg: 'Not authorized' });
    }

    await Review.findByIdAndDelete(req.params.id);
    res.status(200).json({ msg: 'Review deleted' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error. Error code 500' });
  }
};