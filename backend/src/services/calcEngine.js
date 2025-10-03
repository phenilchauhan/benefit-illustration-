function getBonusRateForAge(template, age) {
  if (!template.bonusRateByAge) return template.bonusRate || 0.02;
  for (const b of template.bonusRateByAge) {
    if (age >= b.minAge && age <= b.maxAge) return b.rate;
  }
  return template.bonusRate || 0.02;
}

function calculate(policyTemplate, inputs) {
  const { age: startAge, term, premium, premiumFreq = 'YEARLY', riders = [], sumAssured } = inputs;
  const t = policyTemplate;
  const guaranteed = t.guaranteedRate || 0.03;
  const yearlyPremium = (String(premiumFreq).toUpperCase() === 'MONTHLY') ? premium * 12 : premium;
  let accumulated = 0;
  const yearly = [];

  for (let y = 1; y <= term; y++) {
    const currentAge = startAge + y - 1;
    const premiumThisYear = yearlyPremium;
    accumulated += premiumThisYear;

    const bonusRate = getBonusRateForAge(t, currentAge);
    const baseReturn = accumulated * (guaranteed + bonusRate);

    let riderBenefit = 0;
    for (const r of riders) {
      if (r === 'Accidental') {
        riderBenefit += accumulated * (t.riders?.Accidental?.rate || 0.01);
      } else if (r === 'CriticalIllness') {
        if (y === 1) riderBenefit += (t.riders?.CriticalIllness?.lump || 100000);
      }
    }

    const total = baseReturn + riderBenefit;
    yearly.push({
      year: y,
      age: currentAge,
      premiumPaidThisYear: premiumThisYear,
      accumulatedPremium: Math.round(accumulated),
      baseReturn: Math.round(baseReturn),
      riderBenefit: Math.round(riderBenefit),
      totalBenefit: Math.round(total)
    });
  }

  const totalBenefitFinal = yearly[yearly.length - 1].totalBenefit;
  return {
    yearly,
    totals: {
      totalPremiumsPaid: yearly.reduce((s, r) => s + r.premiumPaidThisYear, 0),
      projectedBenefitAtMaturity: totalBenefitFinal
    }
  };
}

module.exports = { calculate };
