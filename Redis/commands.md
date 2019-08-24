## Redis
![](./images/Redis_DataModel.png)

## Commands
[All commands](https://redis.io/commands)

## Data Structure
> NOTE:
> - All keys are always string type.
> - But, values can be of - string, list, hashes, and sets. Some advanced types include geospatial items and the new stream type.

### 1. key:value
__DB Structure:__
```json
{
	"Bahamas": "Nassau",
	"Croatia": "Zagreb"
}
```

![](./images/1_set_get.png)

### 2. Multiple key:value
__DB Structure:__
```json
{
	"Lebanon": "Beirut",
	"Norway": "Oslo",
	"France": "Paris",
}
```
![](./images/2_mset_mget.png)

### Hashes
__DB Structure:__
```json
{
	"user:1": {
  		"username": "abhi3700",
  		"location": "mohali",
  		"name": "abhijit",
  		"birthyear": "1996",
  		"job": "India"
	}
}
```
* Input:
```console
> hmset user:1 username abhi3700 location mohali
> hmset user:1 name abhijit birthyear 1996 job India
```
Output:
```console
> hget user:1 name
"abhijit"

> hgetall user:1
1) "username"
2) "abhi3700"
3) "location"
4) "mohali"
5) "name"
6) "abhijit"
7) "birthyear"
8) "1996"
9) "job"
10) "India"
```



## Redis-Python
`r` - instance of redis client
* Get all DB's keys: `r.keys()`
* Delete keys in a database using `for` loop
```py
for item in r.keys():
    r.delete("{0}".format(item.decode('utf-8')))
```