import { Model, DataTypes } from "sequelize";
import db from "../config/database.js";

const Category = db.define('categories', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING
  }
}, {
  freezeTableName: true
});


export default Category;