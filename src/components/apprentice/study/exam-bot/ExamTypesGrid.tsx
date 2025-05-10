
import { Card } from "@/components/ui/card";
import { GraduationCap, Lightbulb, BookOpen, Book, Code } from "lucide-react";

interface ExamType {
  id: string;
  name: string;
  icon: React.ReactNode;
}

interface ExamTypesGridProps {
  selectedType: string;
  onSelectType: (type: string) => void;
}

const ExamTypesGrid = ({ selectedType, onSelectType }: ExamTypesGridProps) => {
  const examTypes: ExamType[] = [
    { id: "am2", name: "AM2 Assessment", icon: <GraduationCap className="h-4 w-4 text-elec-yellow" /> },
    { id: "level2", name: "Level 2 Exams", icon: <Lightbulb className="h-4 w-4 text-elec-yellow" /> },
    { id: "level3", name: "Level 3 Exams", icon: <BookOpen className="h-4 w-4 text-elec-yellow" /> },
    { id: "bs7671", name: "BS 7671 Regulations", icon: <Book className="h-4 w-4 text-elec-yellow" /> },
    { id: "technical", name: "Technical Questions", icon: <Code className="h-4 w-4 text-elec-yellow" /> },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-4">
      {examTypes.map((type) => (
        <Card
          key={type.id}
          className={`p-3 cursor-pointer transition-all border ${
            selectedType === type.id 
              ? "border-elec-yellow bg-elec-yellow/10" 
              : "border-elec-yellow/20 hover:border-elec-yellow/40 bg-elec-dark"
          }`}
          onClick={() => onSelectType(type.id)}
        >
          <div className="flex flex-col items-center text-center gap-2">
            {type.icon}
            <span className="text-xs font-medium">{type.name}</span>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default ExamTypesGrid;
