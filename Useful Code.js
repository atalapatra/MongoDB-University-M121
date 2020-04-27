// Useful code

db.movies.findOne()

db.movies.find().count()

db.movies.aggregate([
  { $limit: 5}
]).pretty()

db.movies.aggregate([
  { $match:
    {
        languages: "English"
    }
  },
  { $limit: 5}
]).pretty()

db.movies.aggregate([
  { $match:
    {
      languages: ("English", "German")
    }
  },
  { $limit: 20}
]).pretty()
