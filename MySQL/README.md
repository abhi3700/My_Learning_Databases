# MySQL

## Description

## Installation

> For macOS.

```sh
brew install mysql
```

## Server

Start mysql server:
```sh
brew services start mysql
==> Successfully started `mysql` (label: homebrew.mxcl.mysql)
```

---

REPL-like terminal
```sh
$ mysql
Welcome to the MySQL monitor.  Commands end with ; or \g.
Your MySQL connection id is 10
Server version: 8.3.0 Homebrew

Copyright (c) 2000, 2024, Oracle and/or its affiliates.

Oracle is a registered trademark of Oracle Corporation and/or its
affiliates. Other names may be trademarks of their respective
owners.

Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.

mysql>
```

---

Set root mysql password
```sh
$ mysqladmin -u root password 'secretpassword'
```

---

Access MySQL on mac

```sh
mysql -u root -p
```

---

Stop MySQL server:

```sh
brew services stop mysql
```

## References
