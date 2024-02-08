import { useNavigate } from "react-router-dom";
import { useState } from "react";
import styles from './Mortgage.module.css';
import { moneyFormat } from "../../helpers/helpers";
import { Slider, Alert, AlertTitle, Snackbar } from "@mui/material";

function Mortgage() {
    const [homePrice, setHomePrice] = useState(0);
    const [interest, setInterest] = useState(3.5); // interest rate (%)
    const [length, setLength] = useState(30); // length of loan (in years)
    const [downPayment, setDownPayment] = useState(0);
    const [closingCost, setClosingCost] = useState(2.0);
    const [propertyTaxRate, setPropertyTaxRate] = useState(2.0);
    const [sliderDisabled, setSliderDisabled] = useState(false);
    const [errorFlag, setErrorFlag] = useState(false);
    const navigate = useNavigate();

    const getMortgage = () => {
        let financed = homePrice - downPayment + closingCost * 0.01 * homePrice;
        if(interest === 0) { return financed / length }
        let rate = interest * 0.01 / 12;
        let months = length * 12;
        return (rate * financed) / (1 - Math.pow(1 + rate, -months));
    }

    const getInterest = () => {
        let payment = getMortgage();
        return payment * length * 12 - homePrice + downPayment - closingCost;
    }

    const getCost = () => {
        return getMortgage() * length * 12 + downPayment;
    }

    const getAnnualPropertyTax = () => {
        return propertyTaxRate * 0.01 * homePrice;
    }

    const goBack = () => {
        navigate(-1);
    }

    const updateHomePrice = (newPrice) => {
        // logic check to ensure the cost is not less than down payment
        if(newPrice < downPayment) {
            console.log('home price cannot be less than down payment!');
            setSliderDisabled(true);
            setErrorFlag(true);
        } else {
            setHomePrice(newPrice);
        }
    }

    const handleClose = () => {
        if(errorFlag) {
            setSliderDisabled(false);
            setErrorFlag(false);
            setHomePrice(downPayment);
        } 
    }

    return (
        <div className={styles.page}>
            <button className={styles.btn} onClick={goBack}>Back</button>
            <h1>Mortgage Financing</h1>
            <div className={styles.inputs}>
                <div className={styles.sliderDiv}>
                    <h4>Home Price</h4>
                    {moneyFormat(homePrice)}
                    <Slider disabled={sliderDisabled} value={homePrice} aria-label="Default" valueLabelDisplay="off" min={0} max={3000000} step={25000} onChange={(event, newValue) => updateHomePrice(newValue)} />
                </div>
                <div className={styles.sliderDiv}>
                    <h4>Interest Rate</h4>
                    {interest} %
                    <Slider value={interest} aria-label="Default" valueLabelDisplay="off" min={0} max={15} step={0.1} onChange={(event, newValue) => setInterest(newValue)} />
                </div>
                <div className={styles.sliderDiv}>
                    <h4>Length of Loan</h4>
                    {length} year(s)
                    <Slider value={length} aria-label="Default" valueLabelDisplay="off" min={1} max={84} onChange={(event, newValue) => setLength(newValue)} />
                </div>
                <div className={styles.sliderDiv}>
                    <h4>Down Payment</h4>
                    {moneyFormat(downPayment)}
                    <Slider value={downPayment} aria-label="Default" valueLabelDisplay="off" min={0} max={homePrice} step={5000} onChange={(event, newValue) => setDownPayment(newValue)} />
                </div>
                <div className={styles.sliderDiv}>
                    <h4>Closing Costs (% of House Price)</h4>
                    {closingCost} %
                    <Slider value={closingCost} aria-label="Default" valueLabelDisplay="off" min={0} max={15} step={0.1} onChange={(event, newValue) => setClosingCost(newValue)} />
                </div>
                <div className={styles.sliderDiv}>
                    <h4>Property Tax Rate (% of House Price)</h4>
                    {propertyTaxRate} %
                    <Slider value={propertyTaxRate} aria-label="Default" valueLabelDisplay="off" min={0} max={15} step={0.1} onChange={(event, newValue) => setPropertyTaxRate(newValue)} />
                </div>
            </div>
            <div className={styles.results}>
                <p><strong>Mortgage Payment</strong></p> {moneyFormat(getMortgage())}
                <p><strong>Total Interest Paid</strong></p> {moneyFormat(getInterest())}
                <p><strong>Total Mortgage Cost</strong></p> {moneyFormat(getCost())}
                <p><strong>Annual Property Taxes</strong></p> {moneyFormat(getAnnualPropertyTax())}
                <p><strong>Actual Monthly Payment</strong></p> {moneyFormat(getMortgage() + getAnnualPropertyTax() / 12)}
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