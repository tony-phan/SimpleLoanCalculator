const automotiveReducer = (state, action) => {
    switch(action.type) {
        case 'UPDATE_COST':
            return { ...state, cost: action.value };
        case 'UPDATE_INTEREST':
            return { ...state, interest: action.value };
        case 'UPDATE_LENGTH':
            return { ...state, length: action.value };
        case 'UPDATE_DOWN_PAYMENT':
            return { ...state, downPayment: action.value };
        default:
            return state;
    }
};

export default automotiveReducer;