import { useNavigate } from "react-router-dom";
import './App.css'

function App() {
  const navigate = useNavigate();

  return (
    <div>
      <img src="https://user-images.githubusercontent.com/35363316/145449491-68b42f73-b8f9-4c40-bb0e-8dc99c973bc6.png" alt="logo" />
      <h1>Simple Loan Calculator</h1>
      <h3>Use the Simple Loan Calculator to calculate loans so you can make smarter financial decisions!</h3>
      <p>What would you like to finance today?</p>
      <div className="btn-container">
        <button onClick={() => navigate("mortgage")}>Mortgage Financing</button>
        <button onClick={() => navigate("automotive")}>Automotive Financing</button>
      </div>
      
    </div>
  )
}

export default App;
