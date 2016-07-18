# Mongo Notes

## Section 1
## Overview / Getting Started

Mongo is a open-source noSQL Database  
Data stored in Collections ~= Tables in SQL  
Collection have Documents ~= Rows in SQL  
> Documents can have different.  
This is known as Data Dynamic Schema

Start a mongo server
``` shell
$ mongod
>

```
if there are problems starting the server make sure your dbpath is set
``` shell
$ sudo mkdir -p /data/db
// may need the following command as well for permissions
$ sudo chown $USER /data/db
```

then

``` shell
$ mongo
>

```

Interaction is done with JS

``` shell
> var potion = {
  "name": "invisibility",
  "vendor": "kettlecooked"
}
> potion
{
  "name": "invisibility",
  "vendor": "kettlecooked"
}

```
Switching Database
``` shell
> use reviews
switched to db reviews
> db
reviews
> help
// shows help files
> show dbs
// lists all databases

```
Adding to a Collection

``` shell
> db.(collectionName).insert({
  // document object goes here
  "name": "invisibility",
  "vendor": "kettlecooked"
})
WriteResult({"nInserted": 1})
// returned from the database
```
Collection gets created if it doesn't exist.

Finding Documents
``` shell
> db.(collectionName).find()
{
  "_id": objectId("// some unique id"),
  "name": "invisibility",
  "vendor": "kettlecooked"
}
```
_id created if not given


## Queries and DataTypes
specific queries of equality.
*Note: case sensitive*
``` shell
> db.potions.find({"name":"invisibility"})
{
  Match 1st object
}
{
  Match 2nd object
}

```

Documents are stored as BSON format  
These can store...
* strings
* numbers
* boolean
* Arrays
* Objects
* Null

Default Parameters that can be set are...
* ObjectId
* ISODate

Date fields follow JS format so adding a date field for September 12, 2015 is...  
``` javascript
{
"name": "invisibility",
"vendor": "kettlecooked",
"price": 12.99, //precision maintained
"score": 62,
"tryDate": new Date(2015, 8, 12),// months start with 0 so 8 is September
"ingredients": ["newt",42,"laughter"],
"ratings":{"strength": 2, "flavor": 5} // no id needed
}
```

Finding in an array
``` shell
> db.potion.find("ingredients":"laughter")
{
...
"ingredients": ["newt",42,"laughter"],
...
}
```
Finding in an object
``` shell
> db.potion.find("ratings.flavor":5)
{
...
"ratings":{"strength": 2, "flavor": 5}
}
```
only validations done on data are:  
1. Unique ID's
2. No Syntax errors
3. Document is less than 16mb

**Make sure Data is valid prior to sending to Mongo**
