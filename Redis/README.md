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
	- Check if a URI is working: It should respond 'PONG'
```console
$ redis-cli -u redis://h:pd4ecec34154bbca551fdeafb94421d0ec41147dab602a6a878e6509ae49f638a@ec2-54-209-85-193.compute-1.amazonaws.com:11989 ping
PONG
```
	- set, get data on URI
```console
$ redis-cli -u redis://h:pd4ecec34154bbca551fdeafb94421d0ec41147dab602a6a878e6509ae49f638a@ec2-54-209-85-193.compute-1.amazonaws.com:11989
ec2-54-209-85-193.compute-1.amazonaws.com:11989> SET name "abhijit"
OK
ec2-54-209-85-193.compute-1.amazonaws.com:11989> SET emp_code "CL00102"
OK
ec2-54-209-85-193.compute-1.amazonaws.com:11989> GET name
"abhijit"
ec2-54-209-85-193.compute-1.amazonaws.com:11989> GET emp_code
"CL00102"
```
	- For more redis-cli commands, visit [here](https://redis.io/topics/rediscli)

## References
* Practice online - https://try.redis.io/
* RedisLab Book (on Redis) - https://redislabs.com/ebook/foreword/
* Add __Heroku Redis__ for any product - chatbots, Flask/Django Web App. [RECOMMENDED]
* [RedisLab - Geospatial](https://github.com/Altoros/redis-labs-use-cases/tree/master/geospatial)
