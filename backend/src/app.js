// app.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Import routes
const authRoutes = require('./routes/auth');       // Authentication routes
const policyRoutes = require('./routes/policy');   // Policy routes

// Import database and models
const sequelize = require('./db');                 // Sequelize instance
const Policy = require('./models/policy');         // Policy model
const User = require('./models/user');             // User model

// Create Express app
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Mount routes
app.use('/api/auth', authRoutes);           // Auth routes
app.use('/api/policies', policyRoutes);    // Policy routes

// Root test route
app.get('/', (req, res) => res.send('Benefit Illustration API 🚀'));

// Users route (for testing)
app.get('/users', async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

// Sample seeding function
async function initSample() {
  try {
    // Sync all models (create tables if not exist)
    await sequelize.sync();

    // Seed sample policy if not exists
    const sample = await Policy.findOne({ where: { code: 'SAMPLE_END' }});
    if (!sample) {
      await Policy.create({
        code: 'SAMPLE_END',
        name: 'Sample Endowment Plan',
        template: {
          minAge: 18,
          maxAge: 65,
          minTerm: 5,
          maxTerm: 30,
          minPremium: 1000,
          guaranteedRate: 0.03,
          bonusRate: 0.02,
          bonusRateByAge: [
            { minAge: 18, maxAge: 30, rate: 0.025 },
            { minAge: 31, maxAge: 50, rate: 0.02 },
            { minAge: 51, maxAge: 65, rate: 0.015 }
          ],
          riders: {
            Accidental: { rate: 0.01 },
            CriticalIllness: { minSumAssured: 100000, lump: 150000 }
          }
        }
      });
      console.log('✅ Sample policy created');
    }
  } catch (err) {
    console.error('Error initializing sample data:', err);
    throw err;
  }
}

// Export app and initSample for server.js
module.exports = { app, initSample };
