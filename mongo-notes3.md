# Mongo Notes

## Section 3
### Removing / Modifying Documents

Removing Document  
**Use `remove()`**
``` shell
> db.potions.remove({
  "name":"Love"
})
WriteResult({"nRemoved":1})
```
