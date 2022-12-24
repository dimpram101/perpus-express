import { Model, DataTypes } from "sequelize";
import db from "../config/database.js";
import Role from "./role.js";

const User = db.define('users', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
  }, 
  email : {
    type: DataTypes.STRING,
  },
  password: {
    type: DataTypes.STRING,
  }
}, {
  freezeTableName: true
});


export default User;