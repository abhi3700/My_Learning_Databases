# Postgres DB

## CLI commands

psql is the PostgreSQL interactive terminal.

```sh
$ psql
```

- Connect to a
- Create a database: `CREATE DATABASE mydb;`
- List all databases: `\l`
- Connect to a database: `\c mydb`

  ```sh
  abhi3700=# \c mydb
  You are now connected to database "mydb" as user "abhi3700".
  mydb=#
  ```

- List all tables: `\dt`
- List all tables in a specific database: `\dt mydb.*`
- Delete a database: `DROP DATABASE mydb;`
- Create a table in a database:

  ```sql
  CREATE TABLE customers (
  id INT PRIMARY KEY,
  name VARCHAR(50),
  email VARCHAR(100),
  age INT
  );
  ```

  This query creates a table called "customers" with four columns: "id", "name", "email", and "age". The "id" column is set as the primary key, which means it will contain unique values for each row in the table. The "name" and "email" columns are set to hold strings of up to 50 and 100 characters, respectively, while the "age" column is set to hold integer values.

- Show all tables in the selected database: `\dt` [on psql shell]

  ```sh
  mydb=# \dt
          List of relations
  Schema |   Name    | Type  |  Owner
  --------+-----------+-------+----------
  public | customers | table | abhi3700
  (1 row)
  ```

- Show all tables in the selected database: `\dt` [on terminal]

  ```sh
  ❯ psql -d mydb -c "\dt"
          List of relations
  Schema |   Name    | Type  |  Owner
  --------+-----------+-------+----------
  public | customers | table | abhi3700
  (1 row)
  ```

  > The selected database is `mydb` is on the port where the `postgres` background service is running or was last connected.

- Quit: `\q`

## GUI App

There is an app called 'Postgres.app' which is a full-featured PostgreSQL installation packaged as a standard Mac app.

You can download from [here](https://postgresapp.com/downloads.html)

> Go for the specific version of your postgresql version i.e. 14 or 15 etc.

It looks like this:

![](../img/postgres-app.png)

Here, we can have the server started at any unused port.

By default, we get this 3 DBs locally:

![](../img/postgres-app-3-dbs.png)

## Database url

- Always use lowercase letters in naming the table in SQL table.
- Database URL looks like this:

```py
DATABASE_URL = "postgres://sncwwevyyzviez:7569a516be40f3f5d62f6d6a881856771c5f1ade86096b96dabeb01bef14c37@ec2-54-247-96-169.eu-west-1.compute.amazonaws.com:5432/dm8m5ustplad3"
```

The connection string looks like this:

```sh
postgresql://<username>:<password>@<hostname>:<port>/<database>
```

## using python

- Upload Dataframe to SQL

```py
sqlengine = sqlalchemy.create_engine(DATABASE_URL)

df_a.to_sql('product_a', con= sqlengine, if_exists='replace', index= False)
```

- Upload CSV to SQL

```py
df_a = pd.read_csv('../keys/A.csv')

sqlengine = sqlalchemy.create_engine(DATABASE_URL)

df_a.to_sql('product_a', con= sqlengine, if_exists='replace', index= False)

```

- Download SQL table to Dataframe

```py
df_sql = pd.read_sql_table('product_a', con= DATABASE_URL)
# print(df_sql)
```

## Reference

- [PostgreSQL Tutorial](https://www.postgresqltutorial.com/)
- [w3schools tutorial](https://www.w3schools.com/sql/default.asp)
