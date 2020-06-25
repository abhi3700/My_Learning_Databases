# Redis Database

## Installation
* Python - `pip install redis`
* Ubuntu CLI - 
  - Install: `$ sudo apt install redis-server`
  - Verify 
```console
$ sudo service redis-server start
Starting redis-server: redis-server.
```
  - Usage
```console
$ redis-cli
127.0.0.1:6379> get name
"abhijit"
127.0.0.1:6379> delete name
(error) ERR unknown command 'delete'
127.0.0.1:6379> del name
(integer) 1
127.0.0.1:6379> get name
(nil)
127.0.0.1:6379> get keys
(nil)
127.0.0.1:6379> keys
(error) ERR wrong number of arguments for 'keys' command
127.0.0.1:6379>
```

## References
* Practice online - https://try.redis.io/
* Add __Heroku Redis__ for any product - chatbots, Flask/Django Web App. [RECOMMENDED]
* [RedisLab - Geospatial](https://github.com/Altoros/redis-labs-use-cases/tree/master/geospatial)
