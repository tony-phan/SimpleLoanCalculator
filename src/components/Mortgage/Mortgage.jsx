import { useNavigate } from "react-router-dom";
import styles from './Mortgage.module.css'

function Mortgage() {
    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1);
    }

    return (
        <>
            <h1>Mortgage Financing</h1>
            <div>
                <p>Mortgage Payment: </p>
                <p>Total Interest Paid:</p>
                <p>Total Mortgage Cost: </p>
                <p>Annual Property Taxes: </p>
                <p>Actual Monthly Payment: </p>
            </div>
            <button onClick={goBack}>Back</button>
        </>
    )
}

export default Mortgage;