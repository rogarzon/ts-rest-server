import { Sequelize } from 'sequelize';

const { DB_HOST = 'localhost', DB_USER = 'node', DB_PASSWORD = 'node', DB_NAME = 'node' } = process.env;

const db = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    dialect: 'postgres',
    host: DB_HOST,
});


export default db;