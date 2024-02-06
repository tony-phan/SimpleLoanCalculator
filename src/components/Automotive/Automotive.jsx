import { useNavigate } from "react-router-dom";
import { useState } from "react";
import styles from './Automotive.module.css'
import { Slider, Alert, AlertTitle, Snackbar } from "@mui/material";
import { moneyFormat } from "../../helpers";

function Automotive() {
    const [cost, setCost] = useState(0); // cost of vehicle
    const [interest, setInterest] = useState(3.5); // interest rate (%)
    const [length, setLength] = useState(42); // length of loan (in months)
    const [downPayment, setDownPayment] = useState(0); // down payment + vehicle trade in value
    const [sliderDisabled, setSliderDisabled] = useState(false);
    const [errorFlag, setErrorFlag] = useState(false);
    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1);
    }
    
    const getMonthlyPayment = () => {
        let financed = cost - downPayment;
        if(interest === 0) {
            return financed / length;
        }
        let rate = interest * .001;
        return (rate * financed) / (1 - Math.pow(1 + rate, -length));
    }

    const getTotalInterestPaid = () => {
        let payment = getMonthlyPayment();
        return payment * length - cost + downPayment;
    }

    const getTotalVehicleCost = () => {
        return getMonthlyPayment() * length + downPayment;
    }

    const updateCost = (newCost) => {
        // logic check to ensure the cost is not less than down payment
        if(newCost < downPayment) {
            console.log('cost cannot be less than down payment!');
            setSliderDisabled(true);
            setErrorFlag(true);
        } else {
            setCost(newCost);
        }
    }

    const handleClose = () => {
        if(errorFlag) {
            setSliderDisabled(false);
            setErrorFlag(false);
            setCost(downPayment);
        } 
    }

    return (
        <div className={styles.page}>
            <button className={styles.btn} onClick={goBack}>Back</button>
            <h1>Automotive Financing</h1>
            <div className={styles.inputs}>
                <div className={styles.sliderDiv}>
                    <h4>Cost of Vehicle</h4>
                    {moneyFormat(cost)}
                    <Slider disabled={sliderDisabled} value={cost} aria-label="Default" valueLabelDisplay="off" min={0} max={100000} step={500} onChange={(event, newValue) => updateCost(newValue)} />
                </div>
                <div className={styles.sliderDiv}>
                    <h4>Interest Rate</h4>
                    {interest} %
                    <Slider value={interest} aria-label="Default" valueLabelDisplay="off" min={0} max={15} step={0.1} onChange={(event, newValue) => setInterest(newValue)} />
                </div>
                <div className={styles.sliderDiv}>
                    <h4>Length of Loan</h4>
                    {length} month(s)
                    <Slider value={length} aria-label="Default" valueLabelDisplay="off" min={1} max={84} onChange={(event, newValue) => setLength(newValue)} />
                </div>
                <div className={styles.sliderDiv}>
                    <h4>Down Payment</h4>
                    {moneyFormat(downPayment)}
                    <Slider value={downPayment} aria-label="Default" valueLabelDisplay="off" min={0} max={cost} step={500} onChange={(event, newValue) => setDownPayment(newValue)} />
                </div>
            </div>
            <div className={styles.results}>
                <p><strong>Monthly Payment</strong></p> {moneyFormat(getMonthlyPayment())}
                <p><strong>Total Interest Paid</strong></p> {moneyFormat(getTotalInterestPaid())}
                <p><strong>Total Vehicle Cost</strong></p> {moneyFormat(getTotalVehicleCost())}
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

export default Automotive;