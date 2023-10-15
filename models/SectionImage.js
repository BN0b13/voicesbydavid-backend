'use strict';
import {
  Model,
  DataTypes
} from 'sequelize';

import { sequelize } from '../db.js';

class SectionImage extends Model {
  
  static associate(models) {
    
  }
}
SectionImage.init({
  sectionId: DataTypes.INTEGER,
  caption: DataTypes.STRING,
  filename: DataTypes.STRING,
  path: DataTypes.STRING,
  link: DataTypes.STRING,
  position: DataTypes.INTEGER
}, {
  sequelize,
  schema: process.env.PG_SCHEMA_NAME,
  modelName: 'SectionImage',
});
  
export default SectionImage;