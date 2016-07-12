# Mongo Notes

## Section 5
### Common Aggregation

**`.aggregate()` Method**

``` shell
> db.potions.aggregate(
    [{"$group":{"_id":"$vendor_id"}}]
  )
// items are grouped by vendor_id
// Results in
// {"_id": "kettlecooked"},
// {"_id": "brewers"}, ...
```
Accumulation
``` shell
{"_id":"$vendor_id","total":{"$sum":1}}
// everything after the group aggregator is the accumulator
// totals the number of potions by a specific vendor

// returns
// {"_id": "kettlecooked", "total":2},
// {"_id": "brewers", "total":1}, ...

// can also total up values
{"_id":"$vendor_id",
  "grade_total":{"$sum":"$grade"}}

```
Aggregation Pipeline
you can filter results prior to grouping using `$match` stage opperator
``` shell
> db.potions.aggregate(
    [{"$match":{"ingredients":"unicorn"}},
    {"$project":{"_id":false},{"vendor_id": true}, {"grade":true}},
    {"$group":{"_id":"$vendor_id"},"ave_grade":{$ave:"$grade"}},
    {"$sort":{"ave_grade": -1}},
    {"$limit":3}]
  )
// similar to find
// only returns the vendor and grade field (efficency improvement)
// aggregates from matched list
// then sorted by criteria
// then limited to top 3
```
