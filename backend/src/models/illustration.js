const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db');

class Illustration extends Model {}

Illustration.init({
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  userId: { type: DataTypes.INTEGER },
  policyId: { type: DataTypes.INTEGER },
  inputs: { type: DataTypes.JSONB },
  result: { type: DataTypes.JSONB }
}, { sequelize, modelName: 'illustration', timestamps: true });

module.exports = Illustration;
