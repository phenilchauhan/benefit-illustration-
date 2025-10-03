const { calculate } = require('../services/calcEngine');

test('basic calculation behavior', () => {
  const template = {
    guaranteedRate: 0.03,
    bonusRate: 0.02,
    riders: {
      Accidental: { rate: 0.01 },
      CriticalIllness: { minSumAssured: 100000, lump: 150000 }
    }
  };
  const inputs = { age: 30, term: 5, premium: 10000, premiumFreq: 'YEARLY', riders: ['Accidental'], sumAssured: 200000 };
  const result = calculate(template, inputs);
  expect(result.yearly.length).toBe(5);
  expect(result.totals.totalPremiumsPaid).toBe(10000 * 5);
  expect(result.totals.projectedBenefitAtMaturity).toBeGreaterThan(0);
});
