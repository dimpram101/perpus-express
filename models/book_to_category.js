import { Model, DataTypes } from "sequelize";
import db from "../config/database.js";

const BookToCategory = db.define('book_to_category', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  }
}, {
  freezeTableName: true,
  timestamps:false
});

export default BookToCategory;