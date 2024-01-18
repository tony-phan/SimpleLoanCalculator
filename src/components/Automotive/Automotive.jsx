import { useNavigate } from "react-router-dom";
import { useState } from "react";
import styles from './Automotive.module.css'
import { Slider } from "@mui/material";

function Automotive() {
    const [cost, setCost] = useState(0); // cost of vehicle
    const [interest, setInterest] = useState(3.5); // interest rate (%)
    const [length, setLength] = useState(48); // length of loan (in months)
    const [downPayment, setDownPayment] = useState(0); // down payment + vehicle trade in value

    const navigate = useNavigate();
    const goBack = () => {
        navigate(-1);
    }

    const moneyFormat = (amount) => {
        let price = amount.toFixed(2).toString();
        return "$" + price;
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

    return (
        <div className={styles.page}>
            <button className={styles.btn} onClick={goBack}>Back</button>
            <h1>Automotive Financing</h1>
            <img className={styles.autoImage} src="https://static.vecteezy.com/system/resources/previews/026/166/620/original/character-flat-drawing-stylized-car-auto-loan-or-transforming-assets-into-cash-concept-logo-icon-car-model-us-dollar-notes-in-jute-bag-on-simple-balance-scale-cartoon-design-illustration-vector.jpg" alt="auto-loan" />
            <div className={styles.inputs}>
                <div>
                    <h4>Cost of Vehicle</h4>
                    $ {cost}
                    <Slider value={cost} aria-label="Default" valueLabelDisplay="off" min={0} max={100000} step={5000} onChange={(event, newValue) => setCost(newValue)} />
                </div>
                <div>
                    <h4>Interest Rate</h4>
                    {interest} %
                    <Slider value={interest} aria-label="Default" valueLabelDisplay="off" min={0} max={15} step={0.1} onChange={(event, newValue) => setInterest(newValue)} />
                </div>
                <div>
                    <h4>Length of Loan</h4>
                    {length} months
                    <Slider value={length} aria-label="Default" valueLabelDisplay="off" min={1} max={84} onChange={(event, newValue) => setLength(newValue)} />
                </div>
                <div>
                    <h4>Down Payment</h4>
                    $ {downPayment}
                    <Slider value={downPayment} aria-label="Default" valueLabelDisplay="off" min={0} max={cost} step={500} onChange={(event, newValue) => setDownPayment(newValue)} />
                </div>
            </div>
            <div className={styles.results}>
                <p>Monthly Payment: </p> {moneyFormat(getMonthlyPayment())}
                <p>Total Interest Paid: </p> {moneyFormat(getTotalInterestPaid())}
                <p>Total Vehicle Cost: </p> {moneyFormat(getTotalVehicleCost())}
            </div>
        </div>
    )
}

export default Automotive;