const Review = require('../boxes/reviewsBox');

exports.createReview = async (req, res) => {
  try {
    const { bookId, comment, rating } = req.body;

    if (!bookId || !comment || !rating) {
      return res.status(400).json({msg: 'Fill all fields'})
    };

    const review = new Review({
      bookId,
      userId: req.user.id,
      userName: req.user.name,
      rating,
      comment
    });

    const saved = await review.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error('Review create error:', err); 
    res.status(500).json({ msg: 'Server error. Error code 500' });
  }
};

exports.getReview = async (req, res) => {
  try {
    const reviews = await Review.find({ bookId: req.params.id });
    res.status(200).json(reviews);
  } catch (err) {
    res.status(500).json({ msg: 'Server error. Error code 500' });
  }
};


exports.deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) return res.status(404).json({ msg: 'Review not found' });

    
    if (review.userId.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ msg: 'Not enough rights' });
    }

    await Review.findByIdAndDelete(req.params.id);
    res.status(200).json({ msg: 'Review deleted' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error. Error code 500' });
  }
};


exports.averageRating = async (req, res) => {
  try {
    const bookId = req.params.id;

    const reviews = await Review.find({ bookId });

    if (reviews.length === 0) {
      return res.status(200).json({ averageRating: 0 });
    }

    const totalRating = reviews.reduce((sum, review) => sum + (review.rating || 0), 0);

    const averageRating = totalRating / reviews.length;

    res.status(200).json({ averageRating });
  } catch (err) {
    console.error('Error getting average rating:', err);
    res.status(500).json({ msg: 'Server error. Error code 500' });
  }
};
