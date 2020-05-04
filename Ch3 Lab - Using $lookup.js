db.air_alliances.aggregate([
  { $unwind : "$airlines" },
  { $lookup: {
    from: "air_routes",
    localField: "airlines",
    foreignField: "airline.name",
    as: "routes" } },
  { $project: {
    _id:0,
    name:1,
    "routes.airplane":1 } },
  { $unwind: "$routes" },
  { $match: {
    "routes.airplane": {
      $in: ["747", "380"] } } }
  // ,{ $limit: 10 }
]).pretty()
