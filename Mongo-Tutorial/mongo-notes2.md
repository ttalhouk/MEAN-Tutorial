# Mongo Notes

## Section 2
### Removing / Modifying Documents

Removing Document  
**Use `remove()`**
``` shell
> db.potions.remove({
  "name":"Love"
})
WriteResult({"nRemoved":1})
```
Removing Multiple Documents
Removing Document
``` shell
> db.potions.remove({
  "vendor":"kettlecooked"
})
WriteResult({"nRemoved":2}) // removes all matching the query
```
Modifying Existing Entries  
**Use `update()`** *Note: Only updates first found document*
``` shell
> db.potions.update(
  {"name":"Love"},
  {$set:{"price":3.99}} // $set to set parameter for update
  )
WriteResult({
  "nMatched":1,  // docs matched
  "nUpserted":0, // docs created
  "nModified":1  // docs modified
})
```
if `$set` was not used it would overwrite the whole document and only have the price field.

Updating multiple Entries
``` shell
> db.potions.update(
  {"vendor":"KC"},
  {$set:{"vendor":"kettlecooked"}},
  {"multi": true} // updates all
  )
WriteResult({
  "nMatched":4,  // docs matched
  "nUpserted":0, // docs created
  "nModified":4  // docs modified
})
```

Incrementing a Count
``` shell
> db.potions.update(
  {"potion":"Shrinking"},
  {$inc{"count":1}} // increments a count by 1
```

Update or Create
``` shell
> db.potions.update(
  {"name":"Love"},
  {$inc{"count":1}} ,
  {"upsert": true} // if not found create
  )
WriteResult({
  "nMatched":0,  // docs matched
  "nUpserted":1, // docs created
  "nModified":0  // docs modified
})
```

### Advanced Updates

Removing Parameters from All Documents
``` shell
> db.potions.update(
  {}, //selects all documents in collection
  {$unset{"color":""}} ,
  {"multi": true}
  )
```
Renaming a field
``` shell
> db.potions.update(
  {}, //selects all documents in collection
  {$rename{"score":"grade"}} ,
  {"multi": true}
  )
```
Updating in an Array
``` shell
> db.potions.update(
  {"name":"shrinking"},
  {$set{"ingredients.1":42}} // updates only element 1 in Array
  )
```

Updating in an Array if position is not know
``` shell
> db.potions.update(
  {"ingredients":"secret"},
  {$set{"ingredients.$":42}}, // updates only element where query matches in Array
  {"multi":true}
  )
```
Useful Operators  
* `$max` Updates only if new value is greater than current value
* `$min` Updates only if new value is smaller than current value
* `$mul` Multiplies the current value by specified value
* `$pop` Removes element off end of arrays `$pop:{"key": (1) or (-1)}` 1:last -1:first
* `$push` Adds to end of arrays `$push:{"key": "value"}` [...,"value"]
* `$addToSet` Adds to end of arrays if it doesn't exist `$addToSet:{"key": "value"}` [...,"value"]
* `$pull` removes all instances from array `$pull:{"key": "value"}` [...]
