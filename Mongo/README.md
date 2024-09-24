# Mongo

## Overview

- NoSQL database
- Document based database in JSON format
- Supports:
  - IP Whitelisting
  - Authentication: Create users with different roles with username and password. In this way, in case of data breach, the damage is limited to the data accessible to that particular user & also the user can be tracked.
  > Here, the user could be a human or a code using the username & password.
  - SSL/TLS encryption
- Different cluster types:
  - Single node
  - Replica set: Normally in FREE tier, you get a replica set with 3 nodes.
  - Sharded cluster: For scaling horizontally.
    - Config servers: For storing metadata about the sharded cluster.
    - Shards: For storing data.
    - Routers: For routing requests to the shards.
- DB Providers:
  - MongoDB Atlas by MongoDB Inc.
  - DigitalOcean
  - AWS
  - GCP
  - Azure
  - [Clever Cloud](https://www.clever-cloud.com/product/mongodb/) (starts with 17 EUR/month)
- Valid URI formats:

```
MONGODB_URI=mongodb://127.0.0.1:27017/
MONGODB_URI=mongodb+srv://dalvath3700:R3SaL5ArgFVsaPwK@cluster0.xrlfvc5.mongodb.net/
MONGODB_URI=mongodb+srv://dalvath3700:R3SaL5ArgFVsaPwK@cluster0.xrlfvc5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
MONGODB_URI=mongodb://dalvath3700:R3SaL5ArgFVsaPwK@ac-xdtjxkm-shard-00-02.xrlfvc5.mongodb.net:27017
MONGODB_URI=mongodb://dalvath3700:R3SaL5ArgFVsaPwK@ac-xdtjxkm-shard-00-00.xrlfvc5.mongodb.net:27017,ac-xdtjxkm-shard-00-01.xrlfvc5.mongodb.net:27017,ac-xdtjxkm-shard-00-02.xrlfvc5.mongodb.net:27017/?ssl=true&connectTimeoutMS=30000&serverSelectionTimeoutMS=30000&w=majority&tlsAllowInvalidCertificates=true&authSource=admin&replicaSet=atlas-3wdz0g-shard-0
```

To get the replica nodes, run `$ python3 get_mongo_nodes.py` in [`nslookup`](./nslookup/) directory.

## Installation

### Mac (M1)

#### Server Setup on CLI

1. Install using `$ brew tap mongodb/brew`: add the MongoDB Homebrew tap into the Homebrew formulae list
2. To update Homebrew and all existing formulae: `$ brew upgrade mongodb-community`
3. Install `mongodb-community` via `$ brew install mongodb-community@6.0` [Source](https://www.mongodb.com/docs/v6.0/tutorial/install-mongodb-on-os-x/)

- Now, check the installation of `mongod`, `mongos`

```console
❯ mongod --version
db version v6.0.4
Build Info: {
    "version": "6.0.4",
    "gitVersion": "44ff59461c1353638a71e710f385a566bcd2f547",
    "modules": [],
    "allocator": "system",
    "environment": {
        "distarch": "aarch64",
        "target_arch": "aarch64"
    }
}


❯ mongos --version
mongos version v6.0.4
Build Info: {
    "version": "6.0.4",
    "gitVersion": "44ff59461c1353638a71e710f385a566bcd2f547",
    "modules": [],
    "allocator": "system",
    "environment": {
        "distarch": "aarch64",
        "target_arch": "aarch64"
    }
}
```

- To run MongoDB (i.e. the mongod process)

  - ❌ as a macOS service, run:

    - Services can be started via `$ brew services start mongodb-community@6.0`
    - Services can be stopped via `$ brew services stop mongodb-community@6.0`
    - Services can be restarted via `$ brew services start mongodb-community@6.0`
    - View services if running: `$ brew services list`

      ```console
      ❯ brew services list                                                                                                                                                               ⏎
      Name              Status      User     File
      docker-machine    none
      mongodb-community error  3584 abhi3700 ~/Library/LaunchAgents/homebrew.mxcl.mongodb-community.plist
      mysql             started     abhi3700 ~/Library/LaunchAgents/homebrew.mxcl.mysql.plist
      postgresql@11     none
      postgresql@14     none
      redis             none
      unbound           none
      ```

      This error is not concerning as the service would be manually run in a separate terminal.

  - ✅ manually as a background process, run:

    - `$ mongod --config /opt/homebrew/etc/mongod.conf --fork`, but it would fail with the following error:

    ```console
    ❯ mongod --config /opt/homebrew/etc/mongod.conf --fork

    about to fork child process, waiting until server is ready for connections.
    forked process: 65097
    ERROR: child process failed, exited with 14
    To see additional information in this output, start without the "--fork" option.
    ```

    Now, open the file in VSCode via `$ code /opt/homebrew/etc/mongod.conf` and add the following:

    ```diff
    net:
        bindIp: 127.0.0.1, ::1
    +   port: 27017
        ipv6: true
    ```

    Now, run this command with `sudo`:

    ```console
    ❯ sudo mongod --dbpath /opt/homebrew/var/mongodb
    ```

    The background process starts successfully...

    To shutdown the connection, press <kbd>ctrl+c</kbd>.

- To connect to the MongoDB server, run `$ mongosh` in a separate tab.

  ```console
  ❯ mongosh
  Current Mongosh Log ID: 63fee439999e5d9c63d6f9c7
  Connecting to:  mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.7.1
  Using MongoDB:  6.0.4
  Using Mongosh:  1.7.1

  For mongosh info see: https://docs.mongodb.com/mongodb-shell/

  ------
  The server generated these startup warnings when booting
  2023-03-01T11:01:28.618+05:30: Access control is not enabled for the database. Read and write access to data and configuration is unrestricted
  2023-03-01T11:01:28.618+05:30: You are running this process as the root user, which is not recommended
  2023-03-01T11:01:28.618+05:30: This server is bound to localhost. Remote systems will be unable to connect to this server. Start the server with --bind_ip <address> to specify which IP addresses it should serve responses from, or with --bind_ip_all to bind to all interfaces. If this behavior is desired, start the server with --bind_ip 127.0.0.1 to disable this warning
  2023-03-01T11:01:28.618+05:30: Soft rlimits for open file descriptors too low
  ------

  ------
  Enable MongoDB's free cloud-based monitoring service, which will then receive and display
  metrics about your deployment (disk utilization, CPU, operation statistics, etc).

  The monitoring data will be available on a MongoDB website with a unique URL accessible to you
  and anyone you share the URL with. MongoDB may use this information to make product
  improvements and to suggest MongoDB products and deployment options to you.

  To enable free monitoring, run the following command: db.enableFreeMonitoring()
  To permanently disable this reminder, run the following command: db.disableFreeMonitoring()
  ------

  test> show dbs
  admin                       40.00 KiB
  config                     108.00 KiB
  local                       72.00 KiB
  ```

  There are 3 pre-existing DBs: `admin`, `config`, `local`.

  To exit from console, press 2 times <kbd>ctrl+c</kbd> or 1 time <kbd>ctrl+d</kbd> or type `exit`.

---

**log directory**: `/opt/homebrew/var/log/mongodb/`

```console
❯ ls /opt/homebrew/var/log/mongodb
mongo.log  output.log
```

**data/database directory**: `/opt/homebrew/var/mongodb/`

#### DB usage on VSCode

Install this VSCode [extension](https://marketplace.visualstudio.com/items?itemName=mongodb.mongodb-vscode)

Feed the DB url here:

> provided the `mongod` & `mongosh` are running in the terminals.

![](../img/mongo-vscode.png)

Now, you can play with the DB in VSCode playground in this:

![](../img/mongo-vscode-playground.png)

Here, <kbd>Connect</kbd> button is to create playground for a new DB.

When the <kbd>Run</kbd> button is clicked, the playground is executed and the result is shown in the "Playground Result" separate tab.

## Coding

For Rust, refer [here](https://github.com/abhi3700/My_Learning-Rust/blob/main/libs/databases/mongo).

---

Transactions in MongoDB: It's ACID compliant. This means that while performing a write operation, the following things happen:

1. Atomicity: The operation is performed as a single unit of work.
2. Consistency: The operation is performed in a consistent manner.
3. Isolation: The operation is performed in an isolated manner.
4. Durability: The operation is performed in a durable manner.

Watch [this](https://www.youtube.com/watch?v=ErszXERETr0) video for a complete walkthrough.

This is how transactions are performed in MongoDB:

```rust
  let mut session = self.db_client.start_session().await?;
  session.start_transaction().await?;

  // Update `wallet_offchain` of sender & receiver in their respective documents in "users"
  // collection.
  users_collection
   .update_one(
    doc! {"user_id": &from_user_id},
    doc! {
     "$set": {
      format!("wallet_offchain.{}.debited", coin): sender_update_doc_set,
     },
     "$push": {
      format!("wallet_offchain.{}.payments", coin): &payment_id_next
     }
    },
   )
   .session(&mut session)
   .await?;
  users_collection
   .update_one(
    doc! {"user_id": &to_user_id},
    doc! {
     "$set": {
      format!("wallet_offchain.{}.credited", coin): receiver_update_doc_set,
     },
     "$push": {
      format!("wallet_offchain.{}.payments", coin): &payment_id_next
     }
    },
   )
   .session(&mut session)
   .await?;

  let payment_receipt_doc = PaymentReceiptDocument {
   payment_id: payment_id_next.clone(),
   sender_user_id: from_user_id,
   receiver_user_id: to_user_id,
   coin,
   amount: amount.to_string(),
   memo,
   deleted_by: None,
  };

  // Add the payment receipt to the "payments" collection.
  let payments_collection: Collection<PaymentReceiptDocument> = self
   .db_client
   .database(PAYMENT_DB_NAME)
   .collection(PAYMENT_RECEIPTS_COLLECTION_NAME);
  payments_collection.insert_one(payment_receipt_doc).await?;

  // update the 'payment_id_next' in payment_global_collection
  payment_global_collection
  .update_one(
   doc! {},
   doc! {
    "$set": {
     "payment_id_next": to_bson(&payment_id_next.parse::<u128>()?.checked_add(1).ok_or_eyre("Error in incrementing payment id")?)?,
    }
   },
  )
  .session(&mut session)
  .await?;

  session.commit_transaction().await?;
```

## Cloud Service Providers

### MongoDB Atlas

To register, visit [here](https://www.mongodb.com/cloud/atlas/register). It supports different kinds of datasets:
![](../img/mongo-atlas-data.png)

The free tier is called `M0 Sandbox` and it has the following limitations:

- 512 MB storage

---

**Cluster created**:

When DB is created, a cluster is created with default-name as "cluster-0".

---

**Cluster Access**:

There are 2 ways to access the cluster:
![](../img/mongo-atlas-cluster-security-options.png)

---

**Load sample data**:

We can load sample data like this:

![](../img/mongo-atlas-load-sample-data.png)

After loading sample data, the cluster looks like this:

![](../img/mongo-atlas-cluster-sample-data-loaded.png)

---

**Create Collection**:

When create a collection, there are 3 options to select from:

![](../img/mongo-atlas-create-collection.png)

Normally, `_id` is preferred i.e. Clustered Index Collection.

---

**Get URI**:

Get the connection string from here:
![](../img/mongo-atlas-connect.png)

---

**Database access**

Add more admins to the project here:
![](../img/mongo-atlas-add-admin.png)

**Network Access**:

TODO: Add image

### AWS

### GCP

### Azure

## Mongosh

Use the mongosh inside its **Compass** App. It has suggestions.
Or else, you also have the option to run `$ mongosh` in a separate tab.

To connect mongosh to a connection uri, run

```sh
mongosh mongodb://localhost:27017
```

### Playground

<details><summary>Details</summary>

```sh
$ mongosh mongodb+srv://sanju:9M57dhTZ6Mv9W6AL@cluster0.xrlfvc.mongodb.net/
Current Mongosh Log ID: 662268a94e6ac5be8fc60c
Connecting to:  mongodb+srv://<credentials>@cluster0.xrlfvc.mongodb.net/?appName=mongosh+2.2.4
Using MongoDB:  7.0.8
Using Mongosh:  2.2.4

For mongosh info see: https://docs.mongodb.com/mongodb-shell/

# Show all databases.
test> show dbs
sample_airbnb        52.69 MiB
sample_analytics      9.56 MiB
sample_geospatial     1.26 MiB
sample_guides        40.00 KiB
sample_mflix        111.09 MiB
sample_restaurants    6.56 MiB
sample_supplies       1.05 MiB
sample_training      48.89 MiB
sample_weatherdata    2.59 MiB
admin               312.00 KiB
local                28.15 GiB
# Create a database and switch to it.
test> use appdb
switched to db appdb
# Drop the database.
appdb> db.dropDatabase()
{ ok: 1, dropped: 'appdb' }
appdb>
# clear
appdb> cls
# current db name
> db
appdb
> db.users.insertOne({"name": "Abhi", "age": "31"})
{
  acknowledged: true,
  insertedId: ObjectId('662269b303e0698e64d42882')
}
# List all collections in this DB - appdb.
> show collections
users
> db.users.insertOne({name: 'Alice'})
{
  acknowledged: true,
  insertedId: ObjectId('66226a5003e0698e64d42883')
}
# Get all documents (in MongoDB is analogous to rows of a SQL table) or users.
> db.users.find()
[
  {
    _id: ObjectId('662269b303e0698e64d42882'),
    name: 'Abhi',
    age: '31'
  },
  { _id: ObjectId('66226a5003e0698e64d42883'), name: 'Alice' }
]
> db.users.insertOne({name: 'John', age: 42, address: {street: "71 Gandhi road", pincode: 732435 }})
{
  acknowledged: true,
  insertedId: ObjectId('66226aaa03e0698e64d42884')
}
> db.users.find()
[
  {
    _id: ObjectId('662269b303e0698e64d42882'),
    name: 'Abhi',
    age: '31'
  },
  { _id: ObjectId('66226a5003e0698e64d42883'), name: 'Alice' },
  {
    _id: ObjectId('66226aaa03e0698e64d42884'),
    name: 'John',
    age: 42,
    address: { street: '71 Gandhi road', pincode: 732435 }
  }
]
> db.users.insertMany([{name: 'Bob'}, {name: 'Charlie'}])
{
  acknowledged: true,
  insertedIds: {
    '0': ObjectId('66226adc03e0698e64d42885'),
    '1': ObjectId('66226adc03e0698e64d42886')
  }
}
> db.users.find()
[
  {
    _id: ObjectId('662269b303e0698e64d42882'),
    name: 'Abhi',
    age: '31'
  },
  { _id: ObjectId('66226a5003e0698e64d42883'), name: 'Alice' },
  {
    _id: ObjectId('66226aaa03e0698e64d42884'),
    name: 'John',
    age: 42,
    address: { street: '71 Gandhi road', pincode: 732435 }
  },
  { _id: ObjectId('66226adc03e0698e64d42885'), name: 'Bob' },
  { _id: ObjectId('66226adc03e0698e64d42886'), name: 'Charlie' }
]
> db.users.find().limit(2)
[
  {
    _id: ObjectId('662269b303e0698e64d42882'),
    name: 'Abhi',
    age: '31'
  },
  { _id: ObjectId('66226a5003e0698e64d42883'), name: 'Alice' }
]
# Use of `sort()` and `limit()`
> db.users.find().sort({name: 1})
[
  {
    _id: ObjectId('662269b303e0698e64d42882'),
    name: 'Abhi',
    age: '31'
  },
  { _id: ObjectId('66226a5003e0698e64d42883'), name: 'Alice' },
  { _id: ObjectId('66226adc03e0698e64d42885'), name: 'Bob' },
  { _id: ObjectId('66226adc03e0698e64d42886'), name: 'Charlie' },
  {
    _id: ObjectId('66226aaa03e0698e64d42884'),
    name: 'John',
    age: 42,
    address: { street: '71 Gandhi road', pincode: 732435 }
  }
]
> db.users.find().sort({name: 1}).limit(3)
[
  {
    _id: ObjectId('662269b303e0698e64d42882'),
    name: 'Abhi',
    age: '31'
  },
  { _id: ObjectId('66226a5003e0698e64d42883'), name: 'Alice' },
  { _id: ObjectId('66226adc03e0698e64d42885'), name: 'Bob' }
]
> db.users.find().sort({name: -1}).limit(3)
[
  {
    _id: ObjectId('66226aaa03e0698e64d42884'),
    name: 'John',
    age: 42,
    address: { street: '71 Gandhi road', pincode: 732435 }
  },
  { _id: ObjectId('66226adc03e0698e64d42886'), name: 'Charlie' },
  { _id: ObjectId('66226adc03e0698e64d42885'), name: 'Bob' }
]
> db.users.find().sort({name: -1, age: 1}).limit(3)
[
  {
    _id: ObjectId('66226aaa03e0698e64d42884'),
    name: 'John',
    age: 42,
    address: { street: '71 Gandhi road', pincode: 732435 }
  },
  { _id: ObjectId('66226adc03e0698e64d42886'), name: 'Charlie' },
  { _id: ObjectId('66226adc03e0698e64d42885'), name: 'Bob' }
]
# Use of `skip()` and `limit()`
> db.users.find().limit(2)
[
  {
    _id: ObjectId('662269b303e0698e64d42882'),
    name: 'Abhi',
    age: '31'
  },
  { _id: ObjectId('66226a5003e0698e64d42883'), name: 'Alice' }
]
> db.users.find().skip(1).limit(2)
[
  { _id: ObjectId('66226a5003e0698e64d42883'), name: 'Alice' },
  {
    _id: ObjectId('66226aaa03e0698e64d42884'),
    name: 'John',
    age: 42,
    address: { street: '71 Gandhi road', pincode: 732435 }
  }
]

> db.users.find({age: '31'})
{
  _id: ObjectId('662269b303e0698e64d42882'),
  name: 'Abhi',
  age: '31'
}
> db.users.find({name: 'John'})
{
  _id: ObjectId('66226aaa03e0698e64d42884'),
  name: 'John',
  age: 42,
  address: {
    street: '71 Gandhi road',
    pincode: 732435
  }
}
> db.users.find({_id: ObjectId('66226aaa03e0698e64d42884')})
{
  _id: ObjectId('66226aaa03e0698e64d42884'),
  name: 'John',
  age: 42,
  address: {
    street: '71 Gandhi road',
    pincode: 732435
  }
}
> db.users.find({age: 31})
<
# only show name and age of document with name as John
> db.users.find({name: 'John'}, {name: 1, age: 1})
{
  _id: ObjectId('66226aaa03e0698e64d42884'),
  name: 'John',
  age: 42
}
# only show name and address of document with name as John
> db.users.find({name: 'John'}, {name: 1, address: 1})
{
  _id: ObjectId('66226aaa03e0698e64d42884'),
  name: 'John',
  address: {
    street: '71 Gandhi road',
    pincode: 732435
  }
}
# only show address of document with name as John that too w/o _id
> db.users.find({name: 'John'}, {address: 1, _id: 0})
{
  address: {
    street: '71 Gandhi road',
    pincode: 732435
  }
}
# show everything of person with name 'John', but age.
> db.users.find({name: 'John'}, {age: 0})
{
  _id: ObjectId('66226aaa03e0698e64d42884'),
  name: 'John',
  address: {
    street: '71 Gandhi road',
    pincode: 732435
  }
}
# show everything of person with name == 'John'
> db.users.find({name: {$eq: 'John'}})
{
  _id: ObjectId('66226aaa03e0698e64d42884'),
  name: 'John',
  age: 42,
  address: {
    street: '71 Gandhi road',
    pincode: 732435
  }
}
# show everything of person with name != 'John'
> db.users.find({name: {$ne: 'John'}})
{
  _id: ObjectId('662269b303e0698e64d42882'),
  name: 'Abhi',
  age: '31'
}
{
  _id: ObjectId('66226a5003e0698e64d42883'),
  name: 'Alice'
}
{
  _id: ObjectId('66226adc03e0698e64d42885'),
  name: 'Bob'
}
{
  _id: ObjectId('66226adc03e0698e64d42886'),
  name: 'Charlie'
}
# show all users with age > 32
> db.users.find({age: {$gt: 32}})
{
  _id: ObjectId('66226aaa03e0698e64d42884'),
  name: 'John',
  age: 42,
  address: {
    street: '71 Gandhi road',
    pincode: 732435
  }
}
> db.users.deleteOne({name: 'Abhi'})
{
  acknowledged: true,
  deletedCount: 1
}
# show all users whose name is either 'John' or 'Abhi'
> db.users.find({name: {$in: ["John", "Abhi"]}})
{
  _id: ObjectId('66226aaa03e0698e64d42884'),
  name: 'John',
  age: 42,
  address: {
    street: '71 Gandhi road',
    pincode: 732435
  }
}
# show all users whose name is neither 'John' nor 'Abhi'
> db.users.find({name: {$nin: ["John", "Abhi"]}})
{
  _id: ObjectId('66226a5003e0698e64d42883'),
  name: 'Alice'
}
{
  _id: ObjectId('66226adc03e0698e64d42885'),
  name: 'Bob'
}
{
  _id: ObjectId('66226adc03e0698e64d42886'),
  name: 'Charlie'
}
# show all users whose age field exists and for for age not exists, set false.
> db.users.find({age: {$exists: true}})
{
  _id: ObjectId('66226aaa03e0698e64d42884'),
  name: 'John',
  age: 42,
  address: {
    street: '71 Gandhi road',
    pincode: 732435
  }
}
# show all users whose age > 20 and ≤ 42
> db.users.find({age: {$gt: 20, $lte: 42}})
{
  _id: ObjectId('66226aaa03e0698e64d42884'),
  name: 'John',
  age: 42,
  address: {
    street: '71 Gandhi road',
    pincode: 732435
  }
}
{
  _id: ObjectId('66256e6570604beaf3661d03'),
  name: 'Abhi',
  age: 21
}
# show all users whose age > 20 and ≤ 42 and name == 'Abhi'
> db.users.find({age: {$gt: 20, $lte: 42}, name: 'Abhi'})
{
  _id: ObjectId('66256e6570604beaf3661d03'),
  name: 'Abhi',
  age: 21
}
# same thing can be done using `$and` operator.
> db.users.find({$and: [{age: {$gt:20, $lte:42}}, {name: 'Abhi'}]})
{
  _id: ObjectId('66256e6570604beaf3661d03'),
  name: 'Abhi',
  age: 21
}
# We can also use `$or` operator like this.
> db.users.find({$or: [{age: {$gte: 23}, name: 'John'}]})
{
  _id: ObjectId('66226aaa03e0698e64d42884'),
  name: 'John',
  age: 42,
  address: {
    street: '71 Gandhi road',
    pincode: 732435
  }
}
# show all users whose age is not greater than 20 i.e. age ≤ 20 and also age field also may not be there.
# Use of $not negates the condition.
> db.users.find({age: {$not: {$gt: 20}}})
{
  _id: ObjectId('66226a5003e0698e64d42883'),
  name: 'Alice'
}
{
  _id: ObjectId('66226adc03e0698e64d42885'),
  name: 'Bob'
}
{
  _id: ObjectId('66226adc03e0698e64d42886'),
  name: 'Charlie'
}
> db.users.insertMany([{name: 'Tom', balance: 100, debt: 200}, {name: 'Kristin', balance: 20, debt: 0}])
{
  acknowledged: true,
  insertedIds: {
    '0': ObjectId('66257be270604beaf3661d04'),
    '1': ObjectId('66257be270604beaf3661d05')
  }
}
# show all users whose debt > balance
> db.users.find({$expr: {$gt: ['$debt', '$balance']}})
{
  _id: ObjectId('66257be270604beaf3661d04'),
  name: 'Tom',
  balance: 100,
  debt: 200
}
# show all users whose address.street == '71 Gandhi road'. Here, nested query is used.
> db.users.find({"address.street": '71 Gandhi road'})
{
  _id: ObjectId('66226aaa03e0698e64d42884'),
  name: 'John',
  age: 42,
  address: {
    street: '71 Gandhi road',
    pincode: 732435
  }
}
# show all users whose age >= 21
# Another command: `db.users.find({age: {$gte: 21}}).limit(1)` which returns the same result.
> db.users.findOne({age: {$gte: 21}})
{
  _id: ObjectId('66226aaa03e0698e64d42884'),
  name: 'John',
  age: 42,
  address: {
    street: '71 Gandhi road',
    pincode: 732435
  }
}
> db.users.countDocuments({age: {$gte: 21}})
2
# update the age of the first document whose age == 42 to 43.
# if no document is found, it does nothing.
> db.users.updateOne({age: 42}, {$set: {age: 43}})
{
  acknowledged: true,
  insertedId: null,
  matchedCount: 1,
  modifiedCount: 1,
  upsertedCount: 0
}
> db.users.findOne({age: 43})
{
  _id: ObjectId('66226aaa03e0698e64d42884'),
  name: 'John',
  age: 43,
  address: {
    street: '71 Gandhi road',
    pincode: 732435
  }
}
> db.users.updateOne({_id: ObjectId('66226aaa03e0698e64d42884')}, {$set: {name: 'John Marwaha', age: 50}})
{
  acknowledged: true,
  insertedId: null,
  matchedCount: 1,
  modifiedCount: 1,
  upsertedCount: 0
}
> db.users.findOne({_id: ObjectId('66226aaa03e0698e64d42884')})
{
  _id: ObjectId('66226aaa03e0698e64d42884'),
  name: 'John Marwaha',
  age: 50,
  address: {
    street: '71 Gandhi road',
    pincode: 732435
  }
}
# View balance of all users before airdrop
> db.users.find({balance: {$exists: true}})
{
  _id: ObjectId('66257be270604beaf3661d04'),
  name: 'Tom',
  balance: 100,
  debt: 200
}
{
  _id: ObjectId('66257be270604beaf3661d05'),
  name: 'Kristin',
  balance: 20,
  debt: 0
}
# Airdrop 20 balance to all users
> db.users.updateMany({balance: {$exists: true}}, {$inc: {balance: 20}})
{
  acknowledged: true,
  insertedId: null,
  matchedCount: 2,
  modifiedCount: 2,
  upsertedCount: 0
}
# View balance of all users after airdrop of 20
> db.users.find({balance: {$exists: true}}) 
{
  _id: ObjectId('66257be270604beaf3661d04'),
  name: 'Tom',
  balance: 120,
  debt: 200
}
{
  _id: ObjectId('66257be270604beaf3661d05'),
  name: 'Kristin',
  balance: 40,
  debt: 0
}
# All users pay 5 from balance to reduce debt
> db.users.updateMany({balance: {$exists: true}}, {$inc: {debt: -5, balance: -5}})
{
  acknowledged: true,
  insertedId: null,
  matchedCount: 2,
  modifiedCount: 2,
  upsertedCount: 0
}
# Update field name of all users from name to first_name
> db.users.updateMany({_id: {$exists: true}}, {$rename: {name: 'first_name'}})
{
  acknowledged: true,
  insertedId: null,
  matchedCount: 7,
  modifiedCount: 7,
  upsertedCount: 0
}
# Remove/Unset the age field of all users
> db.users.updateMany({_id: {$exists: true}}, {$unset: {age: ''}})
{
  acknowledged: true,
  insertedId: null,
  matchedCount: 7,
  modifiedCount: 2,
  upsertedCount: 0
}
# Add hobbies to the user with a given id
> db.users.updateOne({_id: ObjectId('66226aaa03e0698e64d42884')}, {$set: {hobbies: ["swimming", "football"]}})
{
  acknowledged: true,
  insertedId: null,
  matchedCount: 1,
  modifiedCount: 1,
  upsertedCount: 0
}
# View the update user document
> db.users.find({_id: ObjectId('66226aaa03e0698e64d42884')})
{
  _id: ObjectId('66226aaa03e0698e64d42884'),
  address: {
    street: '71 Gandhi road',
    pincode: 732435
  },
  first_name: 'John Marwaha',
  hobbies: [
    'swimming',
    'football'
  ]
}
# Add a hobby to the user with a given id
> db.users.updateOne({_id: ObjectId('66226aaa03e0698e64d42884')}, {$push: {hobbies: "golf"}})
{
  acknowledged: true,
  insertedId: null,
  matchedCount: 1,
  modifiedCount: 1,
  upsertedCount: 0
}
# view the updated user doc.
> db.users.find({_id: ObjectId('66226aaa03e0698e64d42884')})
{
  _id: ObjectId('66226aaa03e0698e64d42884'),
  address: {
    street: '71 Gandhi road',
    pincode: 732435
  },
  first_name: 'John Marwaha',
  hobbies: [
    'swimming',
    'football',
    'golf'
  ]
}
# remove a hobby from the user
> db.users.updateOne({_id: ObjectId('66226aaa03e0698e64d42884')}, {$pull: {hobbies: "football"}})
{
  acknowledged: true,
  insertedId: null,
  matchedCount: 1,
  modifiedCount: 1,
  upsertedCount: 0
}
# This replaces the whole documnent/object with a new object.
> db.users.replaceOne({first_name: 'John Marwaha'}, {name: 'John Paaji'})
{
  acknowledged: true,
  insertedId: null,
  matchedCount: 1,
  modifiedCount: 1,
  upsertedCount: 0
}
# View the replaced document
> db.users.find({name: 'John Paaji'})
{
  _id: ObjectId('66226aaa03e0698e64d42884'),
  name: 'John Paaji'
}
# Delete the replaced document
> db.users.deleteOne({name: 'John Paaji'})
{
  acknowledged: true,
  deletedCount: 1
}
# delete multiple documents that have balance field
> db.users.deleteMany({balance: {$exists: true}})
> exit
```

---

For customers document like this:

```json
{
  "_id": {
    "$oid": "5ca4bbcea2dd94ee58162a6c"
  },
  "username": "charleshudson",
  "name": "Brad Cardenas",
  "address": "2765 Powers Meadow\nHeatherfurt, CT 53165",
  "birthdate": {
    "$date": "1977-05-06T21:57:35.000Z"
  },
  "email": "dustin37@yahoo.com",
  "accounts": [
    721914,
    817222,
    973067,
    260799,
    87389
  ],
  "tier_and_details": {}
}
```

If you want to find users with email containing "yahoo", the query is `db.customers.find({ 'email': {$regex: 'yahoo', $options: 'i'} })`. This will return all users whose email contains "yahoo" in any case. For precise matching, use `db.customers.find({ 'email': {$regex: 'yahoo'} })`.

</details>

## Troubleshooting

### 1. `MongoDB Error: Kind: Server selection timeout: No available servers. Topology: { Type: ReplicaSetNoPrimary, .....`

Full error:

```sh
Error: Kind: Server selection timeout: No available servers. Topology: { Type: ReplicaSetNoPrimary, Set Name: atlas-3wdz0g-shard-0, Servers: [ { Address: ac-xdtjxkm-shard-00-01.xrlfvc5.mongodb.net:27017, Type: Unknown }, { Address: ac-xdtjxkm-shard-00-00.xrlfvc5.mongodb.net:27017, Type: Unknown }, { Address: ac-xdtjxkm-shard-00-02.xrlfvc5.mongodb.net:27017, Type: Unknown } ] }, labels: {}
```

- *Cause*: Somehow the MongoDB connection string although being correct, is not discoverable by the Heroku app. I have experienced this in all other cloud providers like Render, Koyeb as well. Inspite of trying many different URI formats, the issue persisted.

```sh
MONGODB_URI=mongodb://USERNAME:PASSWORD@ac-xdtjxkm-shard-00-00.xrlfvc5.mongodb.net:27017,ac-xdtjxkm-shard-00-01.xrlfvc5.mongodb.net:27017,ac-xdtjxkm-shard-00-02.xrlfvc5.mongodb.net:27017/?ssl=true&connectTimeoutMS=30000&serverSelectionTimeoutMS=30000&w=majority&tlsAllowInvalidCertificates=true&authSource=admin&replicaSet=atlas-3wdz0g-shard-0
MONGODB_URI=mongodb+srv://USERNAME:PASSWORD@cluster0.xrlfvc5.mongodb.net/
MONGODB_URI=mongodb://USERNAME:PASSWORD@ac-xdtjxkm-shard-00-02.xrlfvc5.mongodb.net:27017
MONGODB_URI=mongodb+srv://USERNAME:PASSWORD@cluster0.xrlfvc5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
```

- *Solution*: I simply switched to other MongoDB cloud provider like DigitalOcean. And on setting the URI in the Heroku app, the issue got solved 🎉.

  Also, added this solution for community reference in [StackOverflow](https://stackoverflow.com/a/78913525/6774636).

### 2. “TransientTransactionError”

- *Cause*:

  This error was found during manual API testing. And it was ok when retried, but the payment_id was not added to DB (major) & also the balance not updated (minor).

  If the error message is `MongoNetworkError`, it means the transient transaction error is related to the network connectivity between the client and the server. So, might be due to internet issue. More: <https://stackoverflow.com/questions/52153538/what-is-a-transienttransactionerror-in-mongoose-or-mongodb>

  Generally, in my opinion, it can happen during long wait in a session like `65s` or so. So, there could be timeout issue as the default timeout is set to 60s. In OmniPay, it can occur when paying onchain especially during “FREE | zero allowance” case.

- *Solution*:
  - Increase the session max. commit time to `120s`.

  ```rust
  session
      .start_transaction()
      .max_commit_time(Duration::from_secs(120))
      .await
      .map_err(OmniPayError::DatabaseError)?;
  ```

- In your MongoDB configuration, let's add some more options to improve reliability:

  ```rust
  let mut client_options = ClientOptions::parse(MONGODB_URI.to_string()).await?;
      client_options.max_pool_size = Some(50);
      client_options.min_pool_size = Some(10);  // Ensure a minimum number of connections
      client_options.retry_writes = Some(true);  // Enable automatic retries for write operations
      client_options.retry_reads = Some(true);   // Enable automatic retries for read operations
      client_options.server_selection_timeout = Some(Duration::from_secs(30));  // Increase server selection timeout
  ```

- Add retry by looping (alongwith ***exponential backoff strategy***) around the DB `update_one` method like this:
  - **Code**

  ```rust
      let mut retries = 0;
      let mut delay = Duration::from_millis(100);  // Start with a 100ms delay
      loop {
          match users_collection
              .update_one(
                  doc! {"user_id": &from_user_id},
                  doc! {
                      "$set": update_doc_set.clone(),
                      "$push": {
                          format!("wallet_onchain.{}.{}.payments", coin, chain_name): &tx_hash
                      }
                  },
              )
              .session(&mut *session)
              .await
          {
              Ok(_) => {
                  tracing::info!("Transaction committed! 🎉");
                  return Ok(tx_hash);
              },
              Err(e) if retries < MAX_RETRIES && matches!(e.to_string().as_str(), TRANSIENT_TRANSACTION_ERROR) => {
                  retries += 1;
                  tracing::warn!(
                      "TransientTransactionError encountered. Retrying in {:?}... (attempt {}/{})",
                      delay,
                      retries,
                      MAX_RETRIES
                  );
                  tokio::time::sleep(delay).await;
                  delay *= 2;  // Exponential backoff
              },
              Err(e) => return Err(e.into()),
          }
      }
  }
  ```

## References

### Official

- Ask MongoDB AI at the [MongoDB Manual](https://www.mongodb.com/docs/manual/) about anything related to query, command, code, etc. It uses RAG under the hood, so doesn't hallucilate.
![](../img/mongodb-ai.png)

- [MongoDB Documentation](https://www.mongodb.com/docs/)
- [MongoDB Manual](https://www.mongodb.com/docs/manual/)
- [MongoDB Shell](https://www.mongodb.com/docs/mongodb-shell/)
- [MongoDB Drivers](https://www.mongodb.com/docs/drivers/) i.e. Client Libraries. Supports almost all popular languages.
  - [Rust](https://www.mongodb.com/docs/drivers/rust/current/)
- [MongoDB University](https://learn.mongodb.com/)

### Videos

- [MongoDB Crash Course](https://www.youtube.com/watch?v=ofme2o29ngU) ✅
- [Transactions in MongoDB: Complete Walkthrough](https://www.youtube.com/watch?v=ErszXERETr0) ✅
