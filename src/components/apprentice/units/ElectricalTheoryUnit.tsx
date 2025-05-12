
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TheorySections from "./components/TheorySections";

interface ElectricalTheoryUnitProps {
  unitCode: string;
  onResourceClick: (type: string) => void;
}

const ElectricalTheoryUnit = ({ unitCode, onResourceClick }: ElectricalTheoryUnitProps) => {
  const [quizCompleted, setQuizCompleted] = useState(false);
  const navigate = useNavigate();
  
  // Load completion status
  useEffect(() => {
    const storedQuizStatus = localStorage.getItem(`unit_${unitCode}_quiz_completed`);
    if (storedQuizStatus === 'true') {
      setQuizCompleted(true);
    }
  }, [unitCode]);

  return (
    <div className="space-y-6 animate-fade-in">
      <h2 className="text-2xl font-bold">Electrical Installation Theory and Technology</h2>
      <p className="text-muted-foreground mb-6">
        This unit covers the essential theories, regulations, and technical information related to electrical installations.
        Select a section below to begin learning.
      </p>
      
      {/* Electrical Theory Sections */}
      <div className="bg-elec-dark border border-elec-yellow/20 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-elec-yellow mb-4">
          Study Sections
        </h2>
        
        <TheorySections 
          unitCode={unitCode} 
          quizCompleted={quizCompleted} 
          onResourceClick={onResourceClick} 
        />
      </div>
    </div>
  );
};

export default ElectricalTheoryUnit;
