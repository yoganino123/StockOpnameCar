STOCK_OPNAME_CAR

```bash
Car
npx sequelize-cli model:generate --name car --attributes name:string,categoryId:integer,cc:integer,transmisi:string,year:integer,price:integer,stock:integer

Category
npx sequelize-cli model:generate --name category --attributes name:string

Input
npx sequelize-cli model:generate --name input --attributes carId:integer,categoryId:integer,total:integer

Output
npx sequelize-cli model:generate --name output --attributes carId:integer,total:integer

Report
npx sequelize-cli model:generate --name report --attributes inputId:integer,outputId:integer,carId:integer
```
