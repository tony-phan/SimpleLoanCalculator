import { useNavigate } from "react-router-dom";
import style from './stylesheet/Automotive.module.css'
import { useState } from "react";

function Automotive() {
    const [cost, setCost] = useState(0); // cost of vehicle
    const [interest, setInterest] = useState(0); // interest rate (%)
    const [length, setLength] = useState(0); // length of loan (in months)
    const [downPayment, setDownPayment] = useState(0); // down payment + vehicle trade in value

    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1);
    }

    return (
        <>
        <h1>Automotive Financing</h1>
        <img className={style.auto-image} src="https://static.vecteezy.com/system/resources/previews/026/166/620/original/character-flat-drawing-stylized-car-auto-loan-or-transforming-assets-into-cash-concept-logo-icon-car-model-us-dollar-notes-in-jute-bag-on-simple-balance-scale-cartoon-design-illustration-vector.jpg" alt="auto-loan" />
        <div>
            <p>Monthly Payment: </p>
            <p>Total Interest Paid:</p>
            <p>Total Vehicle Cost: </p>
        </div>
        <button onClick={goBack}>Back</button>
        </>
    )
}

export default Automotive;