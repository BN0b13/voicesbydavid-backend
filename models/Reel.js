'use strict';
import {
  Model,
  DataTypes
} from 'sequelize';
import { sequelize } from '../db.js';

  class Reel extends Model {
    
    static associate(models) {
      
    }
  }
  Reel.init({
    categoryId: DataTypes.INTEGER,
    position: DataTypes.INTEGER,
    reelType: DataTypes.STRING,
    reelDate: DataTypes.STRING,
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    company: DataTypes.STRING,
    companyUrl: DataTypes.STRING,
    url: DataTypes.STRING,
    filename: DataTypes.STRING,
    path: DataTypes.STRING,
    active: DataTypes.BOOLEAN
  }, {
    sequelize,
    schema: process.env.PG_SCHEMA_NAME,
    modelName: 'Reel',
  });

  export default Reel;