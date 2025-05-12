
import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, BookOpen, CheckCircle, Shield, Users, FileText, Info, Construction, AlertTriangle, Play, LightbulbIcon, Cable, CircuitBoard } from "lucide-react";
import { getCourseUnitById } from "@/data/courseUnits";
import BackButton from "@/components/apprentice/BackButton";
import HealthSafetyUnit from "@/components/apprentice/units/HealthSafetyUnit";
import ElectricalTheoryUnit from "@/components/apprentice/units/ElectricalTheoryUnit";
import InstallationMethodsUnit from "@/components/apprentice/units/InstallationMethodsUnit";

const UnitContent = () => {
  const { unitId } = useParams();
  const navigate = useNavigate();
  const [completedSections, setCompletedSections] = useState<Record<string, boolean>>({});
  const [quizCompleted, setQuizCompleted] = useState(false);
  
  // Get course unit data
  const unitData = unitId ? getCourseUnitById(unitId) : null;
  
  // Determine which unit to display based on unitId
  const isHealthSafetyUnit = unitId === 'elec2-01';
  const isElectricalTheoryUnit = unitId === 'elec2-04';
  const isInstallationMethodsUnit = unitId === 'elec2-05a';
  const unitCode = unitData?.code || '';
  
  // Load any completed sections and quiz status from localStorage
  useEffect(() => {
    if (unitId && unitData?.code) {
      const code = unitData.code;
      // Check for completed quiz
      const storedQuizStatus = localStorage.getItem(`unit_${code}_quiz_completed`);
      if (storedQuizStatus === 'true') {
        setQuizCompleted(true);
      }
    }
  }, [unitId, unitData]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8 animate-fade-in">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">
            <span className="gradient-text">{unitData?.title || 'Course Unit'}</span>
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            {unitData?.code || ''}: {unitData?.description || ''}
          </p>
        </div>
        <BackButton courseSlug="level-2-diploma" />
      </div>

      {/* Unit content based on type */}
      {isHealthSafetyUnit && (
        <HealthSafetyUnit 
          unitCode={unitCode}
          onResourceClick={() => console.log("Resource clicked")}
        />
      )}
      
      {isElectricalTheoryUnit && (
        <ElectricalTheoryUnit 
          unitCode={unitCode}
          onResourceClick={() => console.log("Resource clicked")}
        />
      )}
      
      {isInstallationMethodsUnit && (
        <InstallationMethodsUnit 
          unitCode={unitCode}
          onResourceClick={() => console.log("Resource clicked")}
        />
      )}
      
      {/* Fallback content if no specific unit component matches */}
      {!isHealthSafetyUnit && !isElectricalTheoryUnit && !isInstallationMethodsUnit && (
        <div className="bg-elec-gray border border-elec-yellow/20 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-2">Unit Overview</h2>
          <p className="text-muted-foreground">
            {unitData?.description || 'This unit covers essential knowledge and skills for electrical installation work.'}
          </p>
        </div>
      )}
    </div>
  );
};

export default UnitContent;
