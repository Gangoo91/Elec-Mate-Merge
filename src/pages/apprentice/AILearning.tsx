
import BackButton from "@/components/common/BackButton";
import StudyExamBot from "@/components/apprentice/study/StudyExamBot";
import AILearningHeader from "@/components/apprentice/study/AILearningHeader";
import RegulationsSearch from "@/components/apprentice/study/RegulationsSearch";
import ConceptExplainer from "@/components/apprentice/study/ConceptExplainer";
import StudyPlanner from "@/components/apprentice/study/StudyPlanner";

const AILearning = () => {
  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-fade-in">
      <div className="flex flex-col items-center justify-center mb-4">
        <h1 className="text-3xl font-bold tracking-tight mb-4">AI Learning Tools</h1>
        <BackButton customUrl="/apprentice/study" label="Back to Study Centre" />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <AILearningHeader />
        <RegulationsSearch />
        <ConceptExplainer />
        <StudyPlanner />
      </div>
      
      <StudyExamBot />
    </div>
  );
};

export default AILearning;
