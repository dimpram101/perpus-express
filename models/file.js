import { Model, DataTypes } from "sequelize";
import db from "../config/database.js";

const File = db.define('files', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  dist: {
    type: DataTypes.STRING
  },
  path: {
    type: DataTypes.STRING
  }
}, {
  freezeTableName: true
});


export default File;