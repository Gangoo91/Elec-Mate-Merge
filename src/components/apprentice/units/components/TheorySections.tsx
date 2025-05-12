
import { useParams } from "react-router-dom";
import TheorySectionCard from "./TheorySectionCard";
import TheoryQuizCard from "./TheoryQuizCard";

interface TheorySectionsProps {
  unitCode: string;
  quizCompleted: boolean;
  onResourceClick: (type: string) => void;
}

const TheorySections = ({ unitCode, quizCompleted, onResourceClick }: TheorySectionsProps) => {
  const { courseSlug } = useParams();

  const handleSectionClick = () => {
    // Report study activity when opening a section
    onResourceClick('learning');
  };

  const handleQuizClick = () => {
    onResourceClick('learning');
    onResourceClick('assessment');
  };

  // Section data array
  const sections = [
    {
      number: "1",
      title: "Legislation & Regulations",
      description: "Legislation, Regulations, and Guidance for Electrical Installation Work"
    },
    {
      number: "2",
      title: "Technical Information",
      description: "Technical Information Used in Electrical Work"
    },
    {
      number: "3",
      title: "Wiring Systems",
      description: "Properties, Applications, and Limitations of Different Wiring Systems"
    },
    {
      number: "4",
      title: "Service Position",
      description: "General Layout of Equipment at the Service Position"
    },
    {
      number: "5",
      title: "Lighting Circuits",
      description: "Standard Lighting Circuits"
    },
    {
      number: "6",
      title: "Final Circuits",
      description: "Standard Ring and Radial Final Circuits"
    },
    {
      number: "7",
      title: "Circuit Requirements",
      description: "Basic Requirements for Circuits"
    },
    {
      number: "8",
      title: "Earthing & Bonding",
      description: "Importance of Earthing and Bonding for Protection"
    },
    {
      number: "9",
      title: "Overcurrent Protection",
      description: "Principles of Overcurrent Protection"
    },
    {
      number: "10",
      title: "Circuit Design",
      description: "Principles of Circuit Design"
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Section Cards */}
      {sections.map((section) => (
        <TheorySectionCard
          key={section.number}
          sectionNumber={section.number}
          title={section.title}
          description={section.description}
          courseSlug={courseSlug || 'level-2-diploma'}
          unitCode={unitCode}
          onClick={handleSectionClick}
        />
      ))}
      
      {/* Quiz Card */}
      <TheoryQuizCard
        courseSlug={courseSlug || 'level-2-diploma'}
        unitCode={unitCode}
        quizCompleted={quizCompleted}
        onClick={handleQuizClick}
      />
    </div>
  );
};

export default TheorySections;
