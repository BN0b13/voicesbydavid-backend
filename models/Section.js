'use strict';
import {
  Model,
  DataTypes
} from 'sequelize';
import { sequelize } from '../db.js';

class Section extends Model {
  
  static associate(models) {
    
  }
}
Section.init({
  type: DataTypes.STRING,
  url: DataTypes.STRING,
  title: DataTypes.STRING,
  titleOn: DataTypes.BOOLEAN,
  subtitle: DataTypes.STRING,
  subtitleOn: DataTypes.BOOLEAN,
  paragraph: DataTypes.STRING,
  paragraphOn: DataTypes.BOOLEAN,
  imagesOn: DataTypes.BOOLEAN,
  position: DataTypes.INTEGER
}, {
  sequelize,
  schema: process.env.PG_SCHEMA_NAME,
  modelName: 'Section',
});

export default Section;