require('dotenv').config();
const { Sequelize } = require('sequelize');

let sequelize;
if (process.env.DATABASE_URL) {
  // Parse DATABASE_URL if provided
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    protocol: 'postgres',
    logging: false,
    dialectOptions: {}
  });
} else {
  // fallback (not needed if you use DATABASE_URL)
  sequelize = new Sequelize(
    process.env.DB_NAME || 'benefitdb',
    process.env.DB_USER || 'postgres',
    process.env.DB_PASSWORD || 'root',
    {
      host: process.env.DB_HOST || 'localhost',
      dialect: 'postgres',
      port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
      logging: false
    }
  );
}

module.exports = sequelize;
