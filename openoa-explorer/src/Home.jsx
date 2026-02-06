import { useNavigate } from "react-router-dom";
import "./Home.css";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-wrapper">
      <div className="home-content">
        <h1 className="home-title">OpenOA Explorer</h1>

        <p className="home-subtitle">
          Explore OpenOA notebooks, examples, and analysis
        </p>

        <button
          className="home-button"
          onClick={() => navigate("/examples")}
        >
          Explore Examples →
        </button>
      </div>
    </div>
  );
}
