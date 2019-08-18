## Redis
![](./images/Redis_DataModel.png)

### Hashes
* Input:
```console
> hmset user:1 username abhi3700 location mohali
> hmset user:1 name abhijit birthyear 1996 job india
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
10) "india"
```