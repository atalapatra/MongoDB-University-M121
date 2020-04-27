var x_max = 1521105
var x_min = 5
var min = 1
var max = 10
var x = imdb.votes

db.movies.aggregate([
  { $match:
    {
      languages: "English",
      "imdb.rating": {$gte: 1},
      "imdb.votes": {$gte: 1},
      year: {$gte: 1990}
    }
  },
  { $addFields:
    { "scaled_votes":
      { $add: [ 1, { $multiply: [ 9, { $divide: [
                                        { $subtract: [x, x_min] },
                                        { $subtract: [x_max, x_min] }
                                              ]
                                            }
                                          ]
                                        }
                                      ]
                                    }
    }
  },
  { $addFields:
    { "normalized_rating" :
      { $avg : [ "$scaled_votes", "$imdb.rating" ]
      }
    }
  },
	{ $sort : { "normalized_rating" : 1 } },
  { $limit: 1}
]).pretty()
