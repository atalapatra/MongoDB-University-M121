// Starting code
var pipeline = [ { $match: { ... } } ]

// Answer
var pipeline = [
  { $match: {
    "imdb.rating": { $gte:7},
    genres: { $nin:[ "Crime", "Horror"] },
    $or: [ {rated: "PG"}, {rated: "G"} ],
    languages: { $all: [ "English", "Japanese" ] }
  } } ]

// Verify pipeline
db.movies.aggregate(pipeline).itcount()
load('/Users/amitt/OneDrive/Career/2020-04-21 MongoDB U - Aggregation Framework/m121/chapter1/validateLab1.js')
validateLab1(pipeline)

// Sample Code
db.articles.aggregate(
    [ { $match : { author : "dave" } } ]
);

db.articles.aggregate( [
  { $match: { $or: [
    { score: { $gt: 70, $lt: 90 } },
    { views: { $gte: 1000 } }
  ] } },
  { $group: { _id: null, count: { $sum: 1 } } }
] );
