
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CareerPathways = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Redirect to the new tabbed structure
    navigate("/apprentice/professional-development", { replace: true });
  }, [navigate]);

  return null;
};

export default CareerPathways;
