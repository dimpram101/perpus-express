import { Model, DataTypes } from "sequelize";
import db from "../config/database.js";
import User from "./user.js";

const Role = db.define('roles', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
  }
}, {
  freezeTableName: true,
  timestamps: false
});

export default Role;