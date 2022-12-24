import { Sequelize } from "sequelize";

const db = new Sequelize('perpus_express', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});

export default db;