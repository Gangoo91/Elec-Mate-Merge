
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, BookOpen, FileText, Wrench, Shield, Lightbulb } from "lucide-react";
import { level2DiplomaUnits, getCourseUnitById } from "@/data/courseUnits";
import type { CourseUnit } from "@/data/courseTypes";

const EALLevel2Diploma = () => {
  const navigate = useNavigate();
  const [selectedUnit, setSelectedUnit] = useState<string | null>(null);
  const [completedResources, setCompletedResources] = useState<Record<string, boolean>>({});

  // Handle unit selection
  const handleUnitSelect = (unitId: string) => {
    setSelectedUnit(unitId);
    const selectedUnitData = level2DiplomaUnits.find(unit => unit.id === unitId);
    if (selectedUnitData) {
      navigate(`/apprentice/study/eal/level-2-diploma/unit/${unitId}`);
    }
  };

  // Handle resource click (tracking)
  const handleResourceClick = (type: string) => {
    console.log(`Resource of type ${type} clicked`);
  };

  // Handle resource completion toggle
  const handleToggleResourceComplete = (resourceId: string) => {
    setCompletedResources(prev => ({
      ...prev,
      [resourceId]: !prev[resourceId]
    }));
  };

  // Get selected unit data
  const selectedUnitData = selectedUnit 
    ? level2DiplomaUnits.find(unit => unit.id === selectedUnit) || null
    : null;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8 animate-fade-in">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">
            <span className="gradient-text">EAL Level 2 Diploma</span>
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            Diploma in Electrical Installation
          </p>
        </div>
        <Link to="/apprentice/study/eal" className="w-full sm:w-auto">
          <Button 
            variant="outline" 
            className="border-elec-yellow/30 hover:bg-elec-yellow/10 w-full sm:w-auto"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to EAL Courses
          </Button>
        </Link>
      </div>

      {/* Course description */}
      <div className="bg-elec-gray border border-elec-yellow/20 rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-2">Course Overview</h2>
        <p className="text-muted-foreground">
          The Level 2 Diploma in Electrical Installation is the foundation qualification for anyone looking to become an electrician. 
          This course covers essential knowledge and skills needed to start your career in the electrical industry.
        </p>
      </div>

      {/* Units grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {level2DiplomaUnits.map((unit) => {
          // Select the appropriate icon based on the unit code
          let UnitIcon;
          switch(unit.code) {
            case "ELEC2/01": 
              UnitIcon = Shield;
              break;
            case "ELEC2/04": 
              UnitIcon = BookOpen;
              break;
            case "ELEC2/05A": 
              UnitIcon = FileText;
              break;
            case "ELEC2/05B": 
              UnitIcon = Wrench;
              break;
            default: 
              UnitIcon = Lightbulb;
          }

          return (
            <Card 
              key={unit.id}
              className="h-full border-elec-yellow/20 bg-elec-gray hover:bg-elec-gray/80 hover:border-elec-yellow/40 transition-all duration-300 cursor-pointer"
              onClick={() => handleUnitSelect(unit.id)}
            >
              <CardHeader className="flex flex-row items-center gap-4">
                <div className="p-2 rounded-md bg-elec-yellow/10 group-hover:bg-elec-yellow/20 transition-colours">
                  <UnitIcon className="h-8 w-8 text-elec-yellow" />
                </div>
                <div>
                  <CardTitle className="text-xl font-semibold">{unit.title}</CardTitle>
                  <p className="text-sm text-elec-yellow mt-1">{unit.code}</p>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{unit.description}</p>
                <div className="flex justify-end">
                  <Button 
                    variant="outline" 
                    className="border-elec-yellow/30 hover:bg-elec-yellow/10 text-sm"
                  >
                    Open Unit
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default EALLevel2Diploma;
