# Mongo Notes

## Section 4
### Data Modeling

Referencing other collections
``` shell
// potion collection entry
{
  "name":"Sleeping"
  "vendor_id":"kettlecooked",
  "ratings.strength":5
}
// vendor collection entry
{
  "_id":"kettlecooked"
  "phone":5555555555
  "address":"..."
}
```
*Split into multiple collections to reduce repetition*

### Data Modeling Decisions Embedding/Referencing

*Embedding*

Pros
* Can update with one Query
* Good to use if updating infrequently

Cons
* Not good with large data set
* Tightly coupled to the objects
* Chance for duplicate information

*Referencing*

Pros
* Reduces duplication
* Ease of updating referenced data in one place
* Good to use with larger data sets

Cons
* Multiple queries to look up information
* Can cause inconsistant references
