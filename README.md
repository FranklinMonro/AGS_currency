# AGS_currency

## Creating devcontainer
### Install extension
![image](https://github.com/FranklinMonro/AGS_currency/assets/34055502/4a207c94-5541-4357-9c9c-edf2a6cb3c66)

### Build devcontainer
![image](https://github.com/FranklinMonro/AGS_currency/assets/34055502/bd582b5a-eb16-436b-8138-b7c6f4cc6c14)


## Install node_modules
### Manual installation web
![image](https://github.com/FranklinMonro/AGS_currency/assets/34055502/f2bae084-69a4-4e9a-b485-98ce7c322ba0)

### Manual installation api
![image](https://github.com/FranklinMonro/AGS_currency/assets/34055502/c23db733-6cd6-4a27-86cb-4c6c7716272d)

## Running projects
### Running web
ng serve --host 0.0.0.0 --poll 500
![image](https://github.com/FranklinMonro/AGS_currency/assets/34055502/eb0d7399-b93b-49a0-a3a9-fb26362b56a2)

### Running api
npm run dev
![image](https://github.com/FranklinMonro/AGS_currency/assets/34055502/b5548c37-e4fe-4920-94c2-25dc05ea5e84)

## Create tables
docker exec -it ags_currency_devcontainer-db-1 bash
 psql -U postgres -f ./docker-entrypoint-initdb.d/create_tables.sql
![image](https://github.com/FranklinMonro/AGS_currency/assets/34055502/2200d8ca-e277-4ce8-93eb-c4c22c41c624)

