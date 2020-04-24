// Answer
var pipeline = [
  { $match: {
    "imdb.rating": { $gte:7},
    genres: { $nin:[ "Crime", "Horror"] },
    $or: [ {rated: "PG"}, {rated: "G"} ],
    languages: { $all: [ "English", "Japanese" ] }
  } },
  { $project: {
    _id:0,
    title:1,
    rated:1
  } }]

// Verify pipeline
load('/Users/amitt/OneDrive/Career/1 - GitHub Repos - atalapatra/MongoDB-University-M121/m121/chapter1/validateLab2.js')
validateLab2(pipeline)
