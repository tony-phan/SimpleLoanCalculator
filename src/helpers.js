const moneyFormat = (amount) => {
    // format the price to 2 significant digits and find all occurrences of 3 digits that are not followed by another digit and replaces them with a comma
    let price = amount.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return "$" + price;
}

export { moneyFormat }