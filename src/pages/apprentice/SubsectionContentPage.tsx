
import React from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle } from "lucide-react";
import { legislationSubsections, rolesResponsibilitiesSubsections, Subsection } from "@/data/healthAndSafety/subsections";

const SubsectionContentPage = () => {
  const { courseSlug, unitSlug, category, subsectionId } = useParams();
  const [isCompleted, setIsCompleted] = React.useState(false);
  const [subsectionData, setSubsectionData] = React.useState<Subsection | null>(null);
  const [categoryTitle, setCategoryTitle] = React.useState("");
  
  React.useEffect(() => {
    // Check which category we're dealing with
    if (category === "legislation") {
      setCategoryTitle("Legislation and Regulations");
      const data = legislationSubsections.find(sub => sub.id === subsectionId);
      if (data) setSubsectionData(data);
    } else if (category === "roles") {
      setCategoryTitle("Roles and Responsibilities");
      const data = rolesResponsibilitiesSubsections.find(sub => sub.id === subsectionId);
      if (data) setSubsectionData(data);
    }
    
    // Check if this subsection has been completed
    const completionKey = `completion_${category}_${subsectionId}`;
    const completionStatus = localStorage.getItem(completionKey);
    if (completionStatus === "true") {
      setIsCompleted(true);
    }
  }, [category, subsectionId]);
  
  const markAsComplete = () => {
    const completionKey = `completion_${category}_${subsectionId}`;
    localStorage.setItem(completionKey, "true");
    setIsCompleted(true);
  };
  
  const backLink = `/apprentice/study/eal/${courseSlug}/unit/${unitSlug}/${category}`;

  return (
    <div className="space-y-6 animate-fade-in px-4 md:px-6">
      <div className="max-w-4xl mx-auto py-6">
        <div className="flex items-center mb-6">
          <Link to={backLink} className="mr-4">
            <Button variant="outline" className="border-elec-yellow/30 hover:bg-elec-yellow/10">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to {categoryTitle}
            </Button>
          </Link>
        </div>
        
        {subsectionData ? (
          <div className="bg-elec-dark border border-elec-yellow/20 rounded-lg p-6">
            <h1 className="text-2xl font-bold text-elec-yellow mb-4">{subsectionData.title}</h1>
            
            <div className="prose prose-invert max-w-none">
              <p className="text-elec-light/80 mb-4">{subsectionData.content}</p>
              
              {/* Placeholder for more detailed content */}
              <div className="bg-elec-dark/50 border border-elec-yellow/30 rounded-lg p-6 mt-6">
                <h3 className="text-xl font-bold text-elec-yellow mb-4">Content Under Development</h3>
                <p className="text-elec-light/80">
                  More detailed content for this section is currently being developed.
                  Please check back soon for updated materials including interactive elements,
                  diagrams, and comprehensive explanations.
                </p>
              </div>
              
              {/* Mark as complete button */}
              <div className="flex justify-end pt-6 mt-6 border-t border-elec-yellow/20">
                <Button
                  variant="study"
                  className={`${isCompleted ? 'bg-green-600/20 border-green-500/50 text-green-400' : 'hover:bg-elec-yellow hover:text-elec-dark'}`}
                  onClick={markAsComplete}
                  disabled={isCompleted}
                >
                  {isCompleted ? 'Completed' : 'Mark as Complete'}
                  {isCompleted && <CheckCircle className="ml-2 h-4 w-4" />}
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center text-elec-light/80 py-12">
            Subsection not found
          </div>
        )}
      </div>
    </div>
  );
};

export default SubsectionContentPage;
