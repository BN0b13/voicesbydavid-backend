'use strict';
import {
  Model,
  DataTypes
} from 'sequelize';

import { sequelize } from '../db.js';

class User extends Model {
  
  static associate(models) {

  }
}
User.init({
  email: DataTypes.STRING,
  password: DataTypes.STRING,
  roleId: DataTypes.INTEGER,
  firstName: DataTypes.STRING,
  lastName: DataTypes.STRING,
  phone: DataTypes.STRING,
  address: DataTypes.JSONB,
  emailVerified: DataTypes.BOOLEAN,
  emailToken: DataTypes.STRING,
  passwordToken: DataTypes.STRING,
  themeId: DataTypes.INTEGER,
  themeInverted: DataTypes.BOOLEAN
}, {
  sequelize,
  schema: process.env.PG_SCHEMA_NAME,
  modelName: 'User',
});

export default User;