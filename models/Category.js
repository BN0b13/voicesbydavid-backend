'use strict';
import {
  Model,
  DataTypes,
  Sequelize
} from 'sequelize';

import { sequelize } from '../db.js';


class Category extends Model {
  
  static associate(models) {
    
  }
}
Category.init({
  name: DataTypes.STRING,
  description: DataTypes.TEXT,
  type: DataTypes.STRING,
  thumbnailPath: DataTypes.STRING,
  thumbnailFilename: DataTypes.STRING,
  backSplashPath: DataTypes.STRING,
  backSplashFilename: DataTypes.STRING,
  details: DataTypes.JSONB,
  status: DataTypes.BOOLEAN
}, {
  sequelize,
  schema: process.env.PG_SCHEMA_NAME,
  modelName: 'Category',
});

export default Category;