db.movies.aggregate([
  { $facet : { 
    "topTenImdb" : [
      { $match: {
        "imdb.rating": { $gt: 0},
        metacritic: { $gt: 0}
        }
      },
      { $sort : { "imdb.rating" : -1 } },
      { $limit : 10 }
      ],
    "topTenMetacritic" : [
      { $match: {
        "imdb.rating": { $gt: 0},
        metacritic: { $gt: 0}
        }
      },
      { $sort : { "metacritic" : -1 } },
      { $limit : 10 }
      ]
    }
  },
	{ $project : {
	    "commonTopFilms" : {
			$size : {
				$setIntersection : [ "$topTenImdb", "$topTenMetacritic" ]
      } }	} }
])