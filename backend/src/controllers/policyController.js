const Policy = require('../models/policy');
const Illustration = require('../models/illustration');
const { calculate } = require('../services/calcEngine');

function validateInputs(template, inputs) {
  const errors = [];
  const age = inputs.age;
  if (age < (template.minAge || 18) || age > (template.maxAge || 65)) {
    errors.push('Age out of range');
  }
  if (inputs.term < (template.minTerm || 5) || inputs.term > (template.maxTerm || 30)) {
    errors.push('Term out of range');
  }
  const freq = String(inputs.premiumFreq || '').toUpperCase();
  if (!['SINGLE', 'YEARLY', 'MONTHLY'].includes(freq)) {
    errors.push('Invalid premium frequency');
  }
  if (inputs.premium < (template.minPremium || 1000)) {
    errors.push('Premium below minimum allowed');
  }
  if (inputs.riders && inputs.riders.includes('CriticalIllness')) {
    const min = template.riders?.CriticalIllness?.minSumAssured || 100000;
    if ((inputs.sumAssured || 0) < min) errors.push('Sum assured too small for Critical Illness rider');
  }
  return errors;
}

async function listPolicies(req, res) {
  const policies = await Policy.findAll();
  res.json(policies);
}

async function calculateIllustration(req, res) {
  const { policyCode, inputs } = req.body;
  const policy = await Policy.findOne({ where: { code: policyCode } });
  if (!policy) return res.status(404).json({ error: 'policy not found' });

  const errors = validateInputs(policy.template, inputs);
  if (errors.length) return res.status(400).json({ errors });

  const result = calculate(policy.template, inputs);

  const ill = await Illustration.create({
    userId: req.user?.userId || null,
    policyId: policy.id,
    inputs,
    result
  });
  res.json({ illustration: result, id: ill.id });
}

module.exports = { listPolicies, calculateIllustration };
