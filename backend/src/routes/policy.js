const express = require('express');
const router = express.Router();
const Policy = require('../models/policy');

// --------------------
// GET all policies
// --------------------
router.get('/', async (req, res) => {
  try {
    const policies = await Policy.findAll();
    res.json(policies);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// --------------------
// POST /calculate
// --------------------
router.post('/calculate', async (req, res) => {
  try {
    const { policyCode, age, term, premium } = req.body;

    // Fetch policy
    const policy = await Policy.findOne({ where: { code: policyCode } });
    if (!policy) return res.status(404).json({ error: 'Policy not found' });

    // Example calculation
    const guaranteed = premium * (1 + (policy.template.guaranteedRate || 0)) ** term;
    const bonus = premium * (policy.template.bonusRate || 0) * term;
    const totalBenefit = guaranteed + bonus;

    res.json({
      policyCode,
      age,
      term,
      premium,
      guaranteed,
      bonus,
      totalBenefit
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
