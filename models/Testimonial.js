'use strict';
import {
  Model,
  DataTypes
} from 'sequelize';
import { sequelize } from '../db.js';

  class Testimonial extends Model {
    
    static associate(models) {
      
    }
  }
  Testimonial.init({
    position: DataTypes.INTEGER,
    testimonialDate: DataTypes.STRING,
    title: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    initials: DataTypes.STRING,
    company: DataTypes.STRING,
    url: DataTypes.STRING,
    testimonial: DataTypes.STRING,
    filename: DataTypes.STRING,
    path: DataTypes.STRING,
  }, {
    sequelize,
    schema: process.env.PG_SCHEMA_NAME,
    modelName: 'Testimonial',
  });

  export default Testimonial;