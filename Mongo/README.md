# Mongo

## Overview

- NoSQL database
- Document based database in JSON format

## Installation

### Mac (M1)

#### Server Setup on CLI

- Install Homebrew `brew`
- Install using `$ brew tap mongodb/brew`: add the MongoDB Homebrew tap into the Homebrew formulae list
- To update Homebrew and all existing formulae: `$ brew update`
- Install `mongodb-community` via `$ brew install mongodb-community@6.0` [Source](https://www.mongodb.com/docs/v6.0/tutorial/install-mongodb-on-os-x/)
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
  Current Mongosh Log ID:	63fee439999e5d9c63d6f9c7
  Connecting to:		mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.7.1
  Using MongoDB:		6.0.4
  Using Mongosh:		1.7.1

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

## Cloud Service Providers

- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register) supports different kinds of DB:
  ![](../img/mongo-atlas-data.png)
- AWS
- GCP
- Azure
