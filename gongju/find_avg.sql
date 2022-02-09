use test;
db.parking_avg.remove({})

avg_result = db.gongju.aggregate([
    { 
        $group:
        {
            _id:
            {
                "floor": "$floor",
                "date": "$date",
                "hour": "$hour"
            },
            avg_num:
            {
                $avg: "$parking"
            }
        }
    },
    {
        $project:
        {
            _id: 0,
            floor: "$_id.floor",
            date: "$_id.date",
            hour: "$_id.hour",
            avg_num:
            {
                $round: "$avg_num"
            }
        }
    },
    {
        $sort: { "_id.hour" : 1, "_id.date": 1, "_id.floor" : 1 }
    },
    {
        $out: { db: "test", coll: "parking_avg" } }
]);