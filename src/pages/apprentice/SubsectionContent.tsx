
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const SubsectionContent = () => {
  const { courseSlug, unitSlug, sectionId } = useParams();
  
  return (
    <div className="space-y-6 animate-fade-in bg-[#121212] px-4 md:px-6 max-w-4xl mx-auto">
      <div className="py-12 text-center">
        <h1 className="text-2xl font-bold text-elec-yellow mb-6">Content Being Updated</h1>
        <p className="text-elec-light/80 mb-8">
          This subsection content is currently being redeveloped. Please check back soon for the updated materials.
        </p>
        <Link to={`/apprentice/study/eal/${courseSlug}/unit/${unitSlug}/section/${sectionId}`}>
          <Button 
            variant="outline" 
            className="border-elec-yellow/30 hover:bg-elec-yellow/10"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Return to Section
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default SubsectionContent;
