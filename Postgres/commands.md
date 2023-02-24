# Postgres DB

## Commands

## Data Structure

- Always use lowercase letters in naming the table in SQL table.
- Database URL looks like this:

```py
DATABASE_URL = "postgres://sncwwevyyzviez:7569a516be40f3f5d62f6d6a881856771c5f1ade86096b96dabeb01bef14c37@ec2-54-247-96-169.eu-west-1.compute.amazonaws.com:5432/dm8m5ustplad3"
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
