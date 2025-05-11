
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BookOpen, CheckCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import LearningBackButton from "@/components/apprentice/navigation/LearningBackButton";
import { getHealthSafetySectionById } from "@/data/healthAndSafety/index";
import type { SectionData, Subsection } from "@/data/healthAndSafety/types";
import SectionSubsectionCard from "@/components/apprentice/SectionSubsectionCard";
import { useNavigate } from "react-router-dom";

const SectionContent = () => {
  const { courseSlug, unitSlug, sectionId } = useParams();
  const navigate = useNavigate();
  const [sectionData, setSectionData] = useState<SectionData | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);
  
  useEffect(() => {
    if (sectionId) {
      // Check if we're on the quiz route
      if (window.location.pathname.includes('/quiz')) {
        // Set quiz data
        setSectionData({
          sectionNumber: "Q",
          title: "Unit Assessment Quiz",
          description: "Test your knowledge of health and safety in electrical installations",
          content: {
            introduction: "This quiz will test your understanding of the key concepts covered in this unit.",
            subsections: [],
          }
        });
        
        // Check if quiz is completed
        const quizCompletionKey = `unit_${unitSlug}_quiz_completed`;
        const completionStatus = localStorage.getItem(quizCompletionKey);
        setIsCompleted(completionStatus === 'true');
      } else {
        // Load section data from health & safety content
        const section = getHealthSafetySectionById(sectionId);
        if (section) {
          setSectionData(section);
          
          // Check if section is completed
          const sectionCompletionKey = `unit_${unitSlug}_section_${sectionId}_completed`;
          const completionStatus = localStorage.getItem(sectionCompletionKey);
          setIsCompleted(completionStatus === 'true');
        }
      }
    }
  }, [sectionId, unitSlug]);
  
  const markAsComplete = () => {
    if (window.location.pathname.includes('/quiz')) {
      // Mark quiz as completed
      const quizCompletionKey = `unit_${unitSlug}_quiz_completed`;
      localStorage.setItem(quizCompletionKey, 'true');
    } else if (sectionId) {
      // Mark section as completed
      const sectionCompletionKey = `unit_${unitSlug}_section_${sectionId}_completed`;
      localStorage.setItem(sectionCompletionKey, 'true');
    }
    
    setIsCompleted(true);
  };
  
  const navigateToSubsection = (subsection: Subsection | string) => {
    let subsectionId;
    if (typeof subsection === 'string') {
      subsectionId = subsection;
    } else {
      subsectionId = subsection.id;
    }
    
    navigate(`/apprentice/study/eal/${courseSlug}/unit/${unitSlug}/section/${sectionId}/subsection/${subsectionId}`);
  };
  
  // Show quiz content if on quiz route
  if (window.location.pathname.includes('/quiz')) {
    return (
      <div className="max-w-4xl mx-auto py-6 px-4 animate-fade-in space-y-6">
        <LearningBackButton 
          currentPath="section"
          courseSlug={courseSlug} 
          unitSlug={unitSlug} 
        />
        
        <div className="bg-elec-gray border border-elec-yellow/20 rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-elec-yellow flex items-center justify-center">
                <span className="text-elec-dark font-bold text-xl">Q</span>
              </div>
              <h1 className="text-2xl font-semibold">Unit Assessment Quiz</h1>
            </div>
            
            {isCompleted && (
              <div className="flex items-center text-green-500 gap-2">
                <CheckCircle className="h-5 w-5" />
                <span className="text-sm">Completed</span>
              </div>
            )}
          </div>
          
          <div className="mb-8">
            <p className="text-muted-foreground">
              This quiz will test your understanding of the key health and safety concepts 
              covered in this unit. Complete the quiz to demonstrate your knowledge.
            </p>
          </div>
          
          <div className="bg-elec-dark/50 border border-elec-yellow/20 rounded-lg p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4 text-elec-yellow">Quiz Instructions</h2>
            <ul className="space-y-2 text-muted-foreground">
              <li>• The quiz contains 10 multiple choice questions</li>
              <li>• You need to score at least 70% to pass</li>
              <li>• You can retake the quiz as many times as needed</li>
              <li>• Take your time and read each question carefully</li>
            </ul>
          </div>
          
          <div className="flex justify-between items-center pt-4">
            <Button
              variant="outline"
              className="border-elec-yellow/30 hover:bg-elec-yellow/10"
              onClick={() => navigate(`/apprentice/study/eal/${courseSlug}/unit/${unitSlug}`)}
            >
              Back to Unit
            </Button>
            
            <Button
              onClick={markAsComplete}
              disabled={isCompleted}
              className={`${isCompleted ? 'bg-green-600/20 border-green-500/50 text-green-400' : 'hover:bg-elec-yellow hover:text-elec-dark'}`}
            >
              {isCompleted ? 'Quiz Completed' : 'Start Quiz'}
              {isCompleted && <CheckCircle className="ml-2 h-4 w-4" />}
            </Button>
          </div>
        </div>
      </div>
    );
  }
  
  // If no section data is available yet
  if (!sectionData) {
    return (
      <div className="max-w-4xl mx-auto py-6 px-4 animate-fade-in">
        <LearningBackButton 
          currentPath="section"
          courseSlug={courseSlug}
          unitSlug={unitSlug}
        />
        <div className="text-center py-12">
          <p className="text-lg text-muted-foreground">Loading section content...</p>
        </div>
      </div>
    );
  }

  // Extract subsections from the section data
  const subsections = sectionData.content && 
                     typeof sectionData.content === 'object' && 
                     'subsections' in sectionData.content ? 
                     sectionData.content.subsections : 
                     sectionData.subsections || [];
  
  // Regular section display
  return (
    <div className="max-w-4xl mx-auto py-6 px-4 animate-fade-in space-y-6">
      {/* Replace BackButton with LearningBackButton */}
      <LearningBackButton 
        currentPath="section"
        courseSlug={courseSlug}
        unitSlug={unitSlug}
      />
      
      <div className="bg-elec-gray border border-elec-yellow/20 rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-elec-yellow flex items-center justify-center">
              <span className="text-elec-dark font-bold text-xl">{sectionData.sectionNumber}</span>
            </div>
            <h1 className="text-2xl font-semibold">{sectionData.title}</h1>
          </div>
          
          {isCompleted && (
            <div className="flex items-center text-green-500 gap-2">
              <CheckCircle className="h-5 w-5" />
              <span className="text-sm">Completed</span>
            </div>
          )}
        </div>
        
        <div className="mb-8">
          <p className="text-muted-foreground">
            {sectionData.description}
          </p>
        </div>
        
        {/* Display subsections */}
        <div className="space-y-6 mb-8">
          {subsections.map(subsection => (
            <SectionSubsectionCard 
              key={subsection.id}
              subsection={subsection}
              navigateToSubsection={navigateToSubsection}
            />
          ))}
        </div>
        
        {/* Completion button */}
        <div className="flex justify-between items-center pt-4 border-t border-elec-yellow/20">
          <Button
            variant="outline"
            className="border-elec-yellow/30 hover:bg-elec-yellow/10"
            onClick={() => navigate(`/apprentice/study/eal/${courseSlug}/unit/${unitSlug}`)}
          >
            Back to Unit
          </Button>
          
          <Button
            onClick={markAsComplete}
            disabled={isCompleted}
            className={`${isCompleted ? 'bg-green-600/20 border-green-500/50 text-green-400' : 'hover:bg-elec-yellow hover:text-elec-dark'}`}
          >
            {isCompleted ? 'Section Completed' : 'Mark as Complete'}
            {isCompleted && <CheckCircle className="ml-2 h-4 w-4" />}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SectionContent;
