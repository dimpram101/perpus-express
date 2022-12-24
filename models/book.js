import { Model, DataTypes } from "sequelize";
import db from "../config/database.js";

const Book = db.define('books', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING
  },
  published_year: {
    type: DataTypes.DATEONLY
  }
}, {
  freezeTableName: true
});


export default Book;