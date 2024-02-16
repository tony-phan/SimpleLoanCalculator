const getMortgage = (homePrice, downPayment, closingCost, interest, length) => {
    let financed = homePrice - downPayment + closingCost * 0.01 * homePrice;
    if(interest === 0) { return financed / length }
    let rate = interest * 0.01 / 12;
    let months = length * 12;
    return (rate * financed) / (1 - Math.pow(1 + rate, -months));
}

const getInterest = (homePrice, downPayment, closingCost, interest, length) => {
    let payment = getMortgage(homePrice, downPayment, closingCost, interest, length);
    return payment * length * 12 - homePrice + downPayment - closingCost;
}

const getCost = (homePrice, downPayment, closingCost, interest, length) => {
    return getMortgage(homePrice, downPayment, closingCost, interest, length) * length * 12 + downPayment;
}

const getAnnualPropertyTax = (homePrice, propertyTaxRate) => {
    return propertyTaxRate * 0.01 * homePrice;
}

export { getMortgage, getInterest, getCost, getAnnualPropertyTax }