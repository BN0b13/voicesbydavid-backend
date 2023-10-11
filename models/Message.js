'use strict';
import {
  Model,
  DataTypes
} from 'sequelize';
import { sequelize } from '../db.js';

  class Message extends Model {
    
    static associate(models) {
      
    }
  }
  Message.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    phone: DataTypes.STRING,
    email: DataTypes.STRING,
    message: DataTypes.TEXT,
    status: DataTypes.STRING,
    replied: DataTypes.BOOLEAN,
    deleted: DataTypes.BOOLEAN
  }, {
    sequelize,
    schema: process.env.PG_SCHEMA_NAME,
    modelName: 'Message',
  });

  export default Message;