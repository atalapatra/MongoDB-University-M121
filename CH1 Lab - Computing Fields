// Answer
db.movies.aggregate([
  { $project:
    { "wordsInTitle": { $size: { $split: ["$title", " "] } } }
  },
  { $match : { "wordsInTitle" : 1 } }
]).itcount()
