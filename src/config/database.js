// PostgreSQL
/*module.exports = {
    dialect: 'postgres',
    host: 'localhost',
    port: 5432,
    database: 'escambo',
    username: 'postgres',
    password: 'postgres'
}*/

module.exports = {
    dialect: 'sqlite',
    storage: './database.sqlite',
    logging: true
};
