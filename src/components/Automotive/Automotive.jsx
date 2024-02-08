import { useNavigate } from "react-router-dom";
import { useReducer, useState } from "react";
import styles from './Automotive.module.css'
import { Slider, Alert, AlertTitle, Snackbar } from "@mui/material";
import { moneyFormat } from "../../helpers/helpers";
import automotiveReducer from "./AutomotiveReducer";
import { getMonthlyPayment, getTotalInterestPaid, getTotalVehicleCost } from "../../helpers/AutomotiveHelpers";

const initialState = {
    cost: 0,                    // cost of vehicle
    interest: 0,                // interest rate (%)
    length: 1,                  // length of loan (in months)
    downPayment: 0              // down payment + vehicle trade in value
};

function Automotive() {
    const [state, dispatch] = useReducer(automotiveReducer, initialState);
    const [sliderDisabled, setSliderDisabled] = useState(false);
    const [errorFlag, setErrorFlag] = useState(false);
    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1);
    }

    const handleClose = () => {
        if(errorFlag) {
            setSliderDisabled(false);
            setErrorFlag(false);
            dispatch({ type: "UPDATE_COST", value: state.downPayment });
        } 
    }

    const updateCost = (newCost) => {
        // logic check to ensure the cost is not less than down payment
        if(newCost < state.downPayment) {
            console.log('cost cannot be less than down payment!');
            setSliderDisabled(true);
            setErrorFlag(true);
        } else {
            dispatch({ type: "UPDATE_COST", value: newCost });
        }
    }

    return (
        <div className={styles.page}>
            <button className={styles.btn} onClick={goBack}>Back</button>
            <h1>Automotive Financing</h1>
            <div className={styles.inputs}>
                <div className={styles.sliderDiv}>
                    <h4>Cost of Vehicle</h4>
                    {moneyFormat(state.cost)}
                    <Slider disabled={sliderDisabled} value={state.cost} aria-label="Default" valueLabelDisplay="off" min={0} max={100000} step={500} onChange={(event, newCost) => updateCost(newCost)} />
                </div>
                <div className={styles.sliderDiv}>
                    <h4>Interest Rate</h4>
                    {state.interest} %
                    <Slider value={state.interest} aria-label="Default" valueLabelDisplay="off" min={0} max={15} step={0.1} onChange={(event, newInterest) => dispatch({ type: "UPDATE_INTEREST", value: newInterest })} />
                </div>
                <div className={styles.sliderDiv}>
                    <h4>Length of Loan</h4>
                    {state.length} month(s)
                    <Slider value={state.length} aria-label="Default" valueLabelDisplay="off" min={1} max={84} onChange={(event, newLength) => dispatch({ type: "UPDATE_LENGTH", value: newLength })} />
                </div>
                <div className={styles.sliderDiv}>
                    <h4>Down Payment</h4>
                    {moneyFormat(state.downPayment)}
                    <Slider value={state.downPayment} aria-label="Default" valueLabelDisplay="off" min={0} max={state.cost} step={500} onChange={(event, newDownPayment) => dispatch({ type: "UPDATE_DOWN_PAYMENT", value: newDownPayment })} />
                </div>
            </div>
            <div className={styles.results}>
                <p><strong>Monthly Payment</strong></p> {moneyFormat(getMonthlyPayment(state.cost, state.downPayment, state.interest, state.length))}
                <p><strong>Total Interest Paid</strong></p> {moneyFormat(getTotalInterestPaid(state.cost, state.downPayment, state.interest, state.length))}
                <p><strong>Total Vehicle Cost</strong></p> {moneyFormat(getTotalVehicleCost(state.cost, state.downPayment, state.interest, state.length))}
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