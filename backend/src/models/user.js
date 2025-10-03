const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db');
const { encrypt, decrypt } = require('../services/encryption');

class User extends Model {
  getName() { return this.name_enc ? decrypt(this.name_enc) : null; }
  getDob()  { return this.dob_enc ? decrypt(this.dob_enc) : null; }
  getPhone(){ return this.phone_enc ? decrypt(this.phone_enc) : null; }
}

User.init({
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  email: { type: DataTypes.STRING, unique: true, allowNull: false },
  passwordHash: { type: DataTypes.STRING, allowNull: false },
  name_enc: { type: DataTypes.TEXT, allowNull: true },
  dob_enc: { type: DataTypes.TEXT, allowNull: true },
  phone_enc: { type: DataTypes.TEXT, allowNull: true }
}, { sequelize, modelName: 'User', timestamps: true });

User.prototype.setSensitive = function({ name, dob, phone } = {}) {
  if (name) this.name_enc = encrypt(name);
  if (dob) this.dob_enc = encrypt(dob);
  if (phone) this.phone_enc = encrypt(phone);
};

module.exports = User;
