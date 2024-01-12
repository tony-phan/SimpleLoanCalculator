import { useNavigate } from "react-router-dom";
import style from './stylesheet/Mortgage.module.css'

function Mortgage() {
    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1);
    }

    return (
        <>
        <h1>Mortgage Financing</h1>
        <img className="mortgage-image" src="https://credible.com/assets/cms/dealing_with_insurance_adjusters_article_e6f090af0b.png" alt="mortgage-loan"/>
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