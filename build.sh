rm -rf ./temp/db_development.sqlite
npx sequelize db:migrate
npx sequelize db:seed:all
