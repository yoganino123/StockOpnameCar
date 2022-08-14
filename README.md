STOCK_OPNAME_CAR

```bash
Car
npx sequelize-cli model:generate --name car --attributes name:string,categoryId:integer,cc:integer,transmisi:string,year:integer,price:integer,stock:integer

Category
npx sequelize-cli model:generate --name category --attributes name:string

Input
npx sequelize-cli model:generate --name input --attributes carId:integer,total:integer

Output
npx sequelize-cli model:generate --name output --attributes carId:integer,total:integer

Report
npx sequelize-cli model:generate --name report --attributes inputId:integer,outputId:integer,carId:integer
```
![DBDiagram tugas stock opname](https://user-images.githubusercontent.com/33244943/184529091-097ac145-c51e-418d-af00-cfe259776ef3.png)

