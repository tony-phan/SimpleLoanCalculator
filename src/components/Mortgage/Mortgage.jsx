import { useNavigate } from "react-router-dom";
import { useReducer, useState } from "react";
import styles from './Mortgage.module.css';
import { moneyFormat } from "../../helpers/helpers";
import { Slider, Alert, AlertTitle, Snackbar } from "@mui/material";
import mortgageReducer from "./MortgageReducer";
import { getMortgage, getInterest, getCost, getAnnualPropertyTax } from "../../helpers/MortgageHelpers"; 

const initialState = {
    homePrice: 0,               // home price
    interest: 0,                // interest rate (%)
    length: 1,                  // length of loan (in years)
    downPayment: 0,
    closingCost: 0,
    propertyTaxRate: 0   
};

function Mortgage() {
    const [state, dispatch] = useReducer(mortgageReducer, initialState);
    const [sliderDisabled, setSliderDisabled] = useState(false);
    const [errorFlag, setErrorFlag] = useState(false);
    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1);
    }

    const updateHomePrice = (newPrice) => {
        // logic check to ensure the cost is not less than down payment
        if(newPrice < state.downPayment) {
            console.log('home price cannot be less than down payment!');
            setSliderDisabled(true);
            setErrorFlag(true);
        } else {
            dispatch({ type: 'UPDATE_HOME_PRICE', value: newPrice });
        }
    }

    const handleClose = () => {
        if(errorFlag) {
            setSliderDisabled(false);
            setErrorFlag(false);
            dispatch({ type: 'UPDATE_HOME_PRICE', value: state.downPayment });
        } 
    }

    return (
        <div className={styles.page}>
            <button className={styles.btn} onClick={goBack}>Back</button>
            <h1>Mortgage Financing</h1>
            <div className={styles.inputs}>
                <div className={styles.sliderDiv}>
                    <h4>Home Price</h4>
                    {moneyFormat(state.homePrice)}
                    <Slider disabled={sliderDisabled} value={state.homePrice} aria-label="Default" valueLabelDisplay="off" min={0} max={3000000} step={25000} onChange={(event, newHomePrice) => updateHomePrice(newHomePrice)} />
                </div>
                <div className={styles.sliderDiv}>
                    <h4>Interest Rate</h4>
                    {state.interest} %
                    <Slider value={state.interest} aria-label="Default" valueLabelDisplay="off" min={0} max={15} step={0.1} onChange={(event, newInterest) => dispatch({ type: "UPDATE_INTEREST", value: newInterest })} />
                </div>
                <div className={styles.sliderDiv}>
                    <h4>Length of Loan</h4>
                    {state.length} year(s)
                    <Slider value={state.length} aria-label="Default" valueLabelDisplay="off" min={1} max={84} onChange={(event, newLength) => dispatch({ type: "UPDATE_LENGTH", value: newLength })} />
                </div>
                <div className={styles.sliderDiv}>
                    <h4>Down Payment</h4>
                    {moneyFormat(state.downPayment)}
                    <Slider value={state.downPayment} aria-label="Default" valueLabelDisplay="off" min={0} max={state.homePrice} step={5000} onChange={(event, newDownPayment) => dispatch({ type: "UPDATE_DOWN_PAYMENT", value: newDownPayment })} />
                </div>
                <div className={styles.sliderDiv}>
                    <h4>Closing Costs (% of House Price)</h4>
                    {state.closingCost} %
                    <Slider value={state.closingCost} aria-label="Default" valueLabelDisplay="off" min={0} max={15} step={0.1} onChange={(event, newClosingCost) => dispatch({ type: "UPDATE_CLOSING_COST", value: newClosingCost })} />
                </div>
                <div className={styles.sliderDiv}>
                    <h4>Property Tax Rate (% of House Price)</h4>
                    {state.propertyTaxRate} %
                    <Slider value={state.propertyTaxRate} aria-label="Default" valueLabelDisplay="off" min={0} max={15} step={0.1} onChange={(event, newPropertyTaxRate) => dispatch({ type: "UPDATE_PROPERTY_TAX_RATE", value: newPropertyTaxRate })} />
                </div>
            </div>
            <div className={styles.results}>
                <p><strong>Mortgage Payment</strong></p> {moneyFormat(getMortgage(state.homePrice, state.downPayment, state.closingCost, state.interest, state.length))}
                <p><strong>Total Interest Paid</strong></p> {moneyFormat(getInterest(state.homePrice, state.downPayment, state.closingCost, state.interest, state.length))}
                <p><strong>Total Mortgage Cost</strong></p> {moneyFormat(getCost(state.homePrice, state.downPayment, state.closingCost, state.interest, state.length))}
                <p><strong>Annual Property Taxes</strong></p> {moneyFormat(getAnnualPropertyTax(state.homePrice, state.propertyTaxRate))}
                <p><strong>Actual Monthly Payment</strong></p> {moneyFormat(getMortgage(state.homePrice, state.downPayment, state.closingCost, state.interest, state.length) + getAnnualPropertyTax(state.homePrice, state.propertyTaxRate) / 12)}
                <p></p>
            </div>

            <Snackbar open={errorFlag} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error" sx={{ width: '600%' }}>
                    <AlertTitle><strong>Error</strong></AlertTitle>
                    Down payment cannot be greater than the cost!
                </Alert>
            </Snackbar>
        </div>
    )
}

export default Mortgage;