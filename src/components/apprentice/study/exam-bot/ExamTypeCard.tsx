
import { BookOpen } from "lucide-react";

interface ExamTypeCardProps {
  examType: string;
}

const ExamTypeCard = ({ examType }: ExamTypeCardProps) => {
  return (
    <div className="p-3 border rounded-md border-elec-yellow/20 bg-elec-dark flex items-center gap-2">
      <BookOpen className="h-4 w-4 text-elec-yellow" />
      <span>{examType}</span>
    </div>
  );
};

export default ExamTypeCard;
