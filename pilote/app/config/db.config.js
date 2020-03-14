module.exports = {

    USER: 'root',
    PASSWORD: 'lili1996',
    HOST: 'localhost',
    DB:'testdb',
    dialect: 'mysql',
    pool:{
        min: 0,
        max: 6,
        acquire: 20000,
        idle: 10000
    }
};


