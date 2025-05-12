
import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, BookOpen, CheckCircle, Shield, Users, FileText, Info, Construction, AlertTriangle, Play } from "lucide-react";
import { getCourseUnitById } from "@/data/courseUnits";
import BackButton from "@/components/apprentice/BackButton";

const UnitContent = () => {
  const { unitId } = useParams();
  const navigate = useNavigate();
  const [completedSections, setCompletedSections] = useState<Record<string, boolean>>({});
  const [quizCompleted, setQuizCompleted] = useState(false);
  
  // Get course unit data
  const unitData = unitId ? getCourseUnitById(unitId) : null;
  
  // Health and safety sections
  const sections = [
    { id: "1", title: "Understanding Health and Safety within the Electrical Industry" },
    { id: "2", title: "Health and Safety Procedures in the Work Environment" },
    { id: "3", title: "Basic Electrical Safety Requirements" },
    { id: "4", title: "Safety Requirements for Using Access Equipment" },
    { id: "5", title: "Importance of Establishing a Safe Working Environment" },
    { id: "6", title: "Requirements for Identifying and Dealing with Hazards on Site" },
    { id: "7", title: "Carry Out Safe Working Practices" },
  ];
  
  // Load any completed sections and quiz status from localStorage
  useEffect(() => {
    if (unitId) {
      // Check for completed quiz
      const storedQuizStatus = localStorage.getItem(`unit_${unitId}_quiz_completed`);
      if (storedQuizStatus === 'true') {
        setQuizCompleted(true);
      }
      
      // Check for completed sections
      const storedSections: Record<string, boolean> = {};
      sections.forEach(section => {
        const status = localStorage.getItem(`unit_${unitId}_section_${section.id}_completed`);
        if (status === 'true') {
          storedSections[section.id] = true;
        }
      });
      setCompletedSections(storedSections);
    }
  }, [unitId]);
  
  // Handle section click
  const handleSectionClick = (sectionId: string) => {
    if (unitId) {
      navigate(`/apprentice/study/eal/level-2-diploma/unit/${unitId}/section/${sectionId}`);
    }
  };
  
  // Handle quiz click
  const handleQuizClick = () => {
    if (unitId) {
      navigate(`/apprentice/study/eal/level-2-diploma/unit/${unitId}/quiz`);
    }
  };

  // Get the appropriate icon based on section number
  const getSectionIcon = (sectionId: string) => {
    switch(sectionId) {
      case "1": return <Info className="h-5 w-5 text-elec-yellow" />;
      case "2": return <Users className="h-5 w-5 text-elec-yellow" />;
      case "3": return <Shield className="h-5 w-5 text-elec-yellow" />;
      case "4": return <Construction className="h-5 w-5 text-elec-yellow" />;
      case "5": return <AlertTriangle className="h-5 w-5 text-elec-yellow" />;
      case "6": return <FileText className="h-5 w-5 text-elec-yellow" />;
      case "7": return <BookOpen className="h-5 w-5 text-elec-yellow" />;
      default: return <Info className="h-5 w-5 text-elec-yellow" />;
    }
  };
  
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8 animate-fade-in">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">
            <span className="gradient-text">{unitData?.title || 'Health & Safety for Electrical Installations'}</span>
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            {unitData?.code || 'ELEC2/01'}: {unitData?.description || 'Understanding health and safety legislation and working practices'}
          </p>
        </div>
        <BackButton courseSlug="level-2-diploma" />
      </div>

      {/* Unit description */}
      <div className="bg-elec-gray border border-elec-yellow/20 rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-2">Unit Overview</h2>
        <p className="text-muted-foreground">
          This unit focuses on health and safety principles within electrical installations, covering regulation knowledge, 
          hazard identification, safe working practices, and proper use of access equipment.
        </p>
      </div>

      {/* Sections grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {sections.map((section) => (
          <Card 
            key={section.id}
            className="border-elec-yellow/20 bg-elec-gray hover:bg-elec-gray/80 hover:border-elec-yellow/40 transition-all duration-300 cursor-pointer shadow-md relative"
            onClick={() => handleSectionClick(section.id)}
          >
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-elec-yellow/90 flex items-center justify-center shadow-inner">
                  <span className="text-elec-dark font-bold text-lg">{section.id}</span>
                </div>
                <h3 className="text-lg font-medium leading-tight">{section.title}</h3>
              </div>
              
              {/* Display complete icon if section is completed */}
              {completedSections[section.id] && (
                <div className="absolute top-3 right-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                </div>
              )}
            </CardContent>
          </Card>
        ))}
        
        {/* Quiz Card */}
        <Card 
          className="border-elec-yellow/20 bg-elec-gray hover:bg-elec-gray/80 hover:border-elec-yellow/40 transition-all duration-300 cursor-pointer shadow-md relative"
          onClick={handleQuizClick}
        >
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-elec-yellow/90 flex items-center justify-center shadow-inner">
                <span className="text-elec-dark font-bold text-lg">Q</span>
              </div>
              <div className="flex flex-col">
                <h3 className="text-lg font-medium leading-tight">Unit Quiz</h3>
                <div className="flex items-center mt-2">
                  <Button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleQuizClick();
                    }} 
                    className="bg-elec-yellow hover:bg-elec-yellow/80 text-elec-dark flex items-center gap-2 text-xs py-1 h-auto"
                    size="sm"
                  >
                    <Play className="h-3 w-3" />
                    {quizCompleted ? "Retake Quiz" : "Take Quiz"}
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Display complete icon if quiz is completed */}
            {quizCompleted && (
              <div className="absolute top-3 right-3">
                <CheckCircle className="h-5 w-5 text-green-500" />
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UnitContent;
