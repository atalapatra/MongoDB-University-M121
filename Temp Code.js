// Useful code

db.movies.findOne()

db.movies.find().count()

db.air_alliances.aggregate().itcount()

db.movies.aggregate([
  { $limit: 100}
]).pretty()

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
        awards: {$exists:true}
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

db.air_alliances.aggregate([    { $limit: 1 }  ]).pretty()
// {
//         "_id" : ObjectId("5980bef9a39d0ba3c650ae9b"),
//         "name" : "Star Alliance",
//         "airlines" : [
//                 "Air Canada",
//                 "Adria Airways",
//                 "Avianca",
//                 "Scandinavian Airlines",
//                 "All Nippon Airways",
//                 "Brussels Airlines",
//                 "Shenzhen Airlines",
//                 "Air China",
//                 "Air New Zealand",
//                 "Asiana Airlines",
//                 "Brussels Airlines",
//                 "Copa Airlines",
//                 "Croatia Airlines",
//                 "EgyptAir",
//                 "TAP Portugal",
//                 "United Airlines",
//                 "Turkish Airlines",
//                 "Swiss International Air Lines",
//                 "Lufthansa",
//                 "EVA Air",
//                 "South African Airways",
//                 "Singapore Airlines"
//         ]
// }

db.air_routes.aggregate([{ $limit: 1 }]).pretty()
// {
//         "_id" : ObjectId("56e9b39b732b6122f877fa96"),
//         "airline" : {
//                 "id" : 470,
//                 "name" : "Air Burkina",
//                 "alias" : "2J",
//                 "iata" : "VBW"
//         },
//         "src_airport" : "OUA",
//         "dst_airport" : "LFW",
//         "codeshare" : "",
//         "stops" : 0,
//         "airplane" : "CRJ"
// }

db.air_airlines.aggregate([    { $limit: 1 }  ]).pretty()

// {
//         "_id" : ObjectId("56e9b497732b6122f8790280"),
//         "airline" : 4,
//         "name" : "2 Sqn No 1 Elementary Flying Training School",
//         "alias" : "",
//         "iata" : "WYT",
//         "icao" : "",
//         "active" : "N",
//         "country" : "United Kingdom",
//         "base" : "HGH"
// }

var airlines = [];
db.air_alliances.find({"name": "OneWorld"}).forEach(function(doc){
  airlines = doc.airlines
})
var oneWorldAirlines = db.air_airlines.find({"name": {"$in": airlines}})

oneWorldAirlines.forEach(function(airline){
  db.air_alliances.aggregate([
  {"$graphLookup": {
    "startWith": airline.base,
    "from": "air_routes",
    "connectFromField": "dst_airport",
    "connectToField": "src_airport",
    "as": "connections",
    "maxDepth": 1
  }}])
})
