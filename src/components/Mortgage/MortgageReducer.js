const mortgageReducer = (state, action) => {
    switch(action.type) {
        case 'UPDATE_HOME_PRICE':
            return { ...state, homePrice: action.value };
        case 'UPDATE_INTEREST':
            return { ...state, interest: action.value };
        case 'UPDATE_LENGTH':
            return { ...state, length: action.value };
        case 'UPDATE_DOWN_PAYMENT':
            return { ...state, downPayment: action.value };
        case 'UPDATE_CLOSING_COST':
            return { ...state, closingCost: action.value };
        case 'UPDATE_PROPERTY_TAX_RATE':
            return { ...state, propertyTaxRate: action.value };
        default:
            return state;
    }
}

export default mortgageReducer;