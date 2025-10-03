const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db');

class Policy extends Model {}

Policy.init({
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  code: { type: DataTypes.STRING, unique: true },
  name: { type: DataTypes.STRING },
  template: { type: DataTypes.JSONB, allowNull: false }
}, { sequelize, modelName: 'policy', timestamps: true });

module.exports = Policy;
