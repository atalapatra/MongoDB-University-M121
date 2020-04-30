db.movies.aggregate([
  { $match:
    {
        awards: { $regex : /Won \d+ Oscar/ }
    }
  },
  {
    $group: {
      _id : null,
      highest_rating: { $max: "$imdb.rating" },
      lowest_rating: { $min: "$imdb.rating" },
      average: { $avg: "$imdb.rating" },
      deviation: { $stdDevSamp: "$imdb.rating" }
    }
  }
])
