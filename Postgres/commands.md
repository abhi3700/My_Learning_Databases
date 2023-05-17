# Postgres DB

## CLI commands

> I prefer CLI for CRUD operation. Sometimes, the `$ brew services list` doesn't show appropriate results. That's why use a GUI like `postgres.app`

`psql` is the PostgreSQL interactive terminal.

```sh
$ psql
```

- Check the current version: `$ psql --version`
- Check the postgresql service details: `$ brew services info postgresql@14`
- Check to see the listening ports related to `postgres` process: `$ lsof -nP +c 15 | grep LISTEN`
- Check to see a particular db port (**LISTEN**, **ESTABLISHED**): `$ lsof -i TCP:5432`
- Check to see a particular db port is listening: `$ lsof -i TCP:5432 | grep LISTEN`
- Migrate the database to new version if available: `$ brew postgresql-upgrade-database`
- Connect to localhost: `$ psql -h localhost` (connects to the 1st db alphabetically)
- Connect to localhost with db: `$ psql -h localhost mydb`
- Connect to port: `$ psql -p5432` (connects to the 1st db alphabetically)
- Connect to port with db: `$ psql -p5432 mydb`
- Connect to a database (with url): `❯ psql postgresql://abhi3700:abhi3700@localhost:5432/abhi3700` which would open a shell.
- Show the connection info: `\conninfo`. It shows the connection info of the current connection.
- Create a database: `CREATE DATABASE mydb;`
- List all databases:
  - `\l` in `psql` REPL terminal
  - `$ psql -l` in terminal
- Connect to a database:

  - `\c mydb` in `psql` REPL terminal

    ```sh
    abhi3700=# \c mydb
    You are now connected to database "mydb" as user "abhi3700".
    mydb=#
    ```

  - `$ psql -d mydb`

- Delete a database:

  ```sql
  DROP DATABASE mydb;
  ```

- Create a table in a database:

  ```sql
  CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NULL
  );

  ```

  This query creates a table called "customers" with four columns: "id", "name", "email", and "age". The "id" column is set as the primary key, which means it will contain unique values for each row in the table. The "name" and "email" columns are set to hold strings of up to 50 and 100 characters, respectively, while the "age" column is set to hold integer values.

- List all tables (in the selected database): `\dt` (display tables)

  ```sh
  ❯ psql -d mydb -c "\dt"
          List of relations
  Schema |   Name    | Type  |  Owner
  --------+-----------+-------+----------
  public | customers | table | abhi3700
  (1 row)
  ```

  > The selected database is `mydb` is on the port where the `postgres` background service is running or was last connected.

- List all tables in a specific database: `\dt mydb.*`
- View a table structure: `\d <table_name>`. For more, use `\d+ <table_name>`
- Insert a row in a table

  ```sql
  INSERT INTO users (first_name, last_name)
  VALUES ('John', 'Doe');
  ```

- Show the entire table with data:

  ```sql
  SELECT * FROM users;
  ```

- Drop/Delete a table: `DROP TABLE IF EXISTS users;`
- List all schemas: `\dn`
- List all the users and their roles: `\du`
- Get a specific user: `\du <username>`
- List all the functions from your database: `\df`
- Quit: `\q`

## GUI App

> Used to see the connections as `$ brew services list` show improper results at times.

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
