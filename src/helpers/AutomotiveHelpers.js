const getMonthlyPayment = (cost, downPayment, interest, length) => {
    let financed = cost - downPayment;
    if(interest === 0) {
        return financed / length;
    }
    let rate = interest * .001;
    return (rate * financed) / (1 - Math.pow(1 + rate, -length));
}

const getTotalInterestPaid = (cost, downPayment, interest, length) => {
    let payment = getMonthlyPayment(cost, downPayment, interest, length);
    return payment * length - cost + downPayment;
}

const getTotalVehicleCost = (cost, downPayment, interest, length) => {
    return getMonthlyPayment(cost, downPayment, interest, length) * length + downPayment;
}

export { getMonthlyPayment, getTotalInterestPaid, getTotalVehicleCost }