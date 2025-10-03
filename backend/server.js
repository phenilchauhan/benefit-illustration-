const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 4000;

// Middleware
app.use(cors());
app.use(express.json());

// ---------------------
// Auth routes
// ---------------------
const authRouter = require('./routes/auth'); // your existing auth routes
app.use('/api/auth', authRouter);

// ---------------------
// Policy routes
// ---------------------
const policyRouter = require('./routes/policy'); // the policy routes we wrote
app.use('/api/policies', policyRouter);

// ---------------------
// Root test route
// ---------------------
app.get('/', (req, res) => res.send('API Running'));

// ---------------------
// Start server
// ---------------------
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
