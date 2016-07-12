# Mongo Notes

## Section 3
### Query Operators

Quering with Multiple Criteria
``` shell
> db.potions.find({
  "vendor":"kettlecooked",
  "ratings.strength":5
})
// results in documents that fulfill both requirements
```
Qurey Operators
* `$gt` = greater than (>)
* `$lt` = less than (<)
* `$gte` = greater than or equal to (>=)
* `$lte` = less than or equal to (<=)
* `$ne` = not equal to (!=)

``` shell
> db.potions.find({
  "price":{"$lt": 20}
})
// potions less than 20 in price
```

Between search
``` shell
> db.potions.find({
  "price":{"$lt": 20, "$gt":10}
})
// potions less than 20 in price but greater than 10
```

Checking Arrays using `$elemMatch` to check for potions with at least one matching element in the Arrays
``` shell
> db.potions.find({
  "sizes":{"$elemMatch":{"$lt": 20, "$gt":10}}
})
// potions with at least one element in the size array that is less than 20 and greater than 10
```

### Customized Queries

Making lists based on Queries such as finding by criteria and only returning the name field not the whole object
``` shell
> db.potions.find(
  {"grade":{"$gt":80}},
  {vendor:true, name:true, _id:false}
)
// returns potions name/vendor where grade > 80
// note only _id: can be set to false when doing selection
```

Excluding fields
``` shell
> db.potions.find(
  {"grade":{"$gt":80}},
  {vendor:false, name:false}
)
// returns potion info other than name/vendor where grade > 80
```

Counting Objects (Cursor Methods)
``` shell
> db.potions.find().count()
80
// returns number of documents in the potions collection
```

Sorting Objects
``` shell
> db.potions.find().sort({"price": 1 (or -1)})
// returns objects sorted by price 1 ascending -1 descending
```

Pagination `.skip()` and `.limit()`
``` shell
> db.potions.find().limit(3)
// returns 3 Objects

> db.potions.find().skip(3).limit(3)
// returns 3 Objects after skipping 3 Objects

... add skipps until done
```
