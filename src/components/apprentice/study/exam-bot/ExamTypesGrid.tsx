
import ExamTypeCard from "./ExamTypeCard";

const examTypes = [
  "EAL Level 2 Questions",
  "EAL Level 3 Questions",
  "City & Guilds Questions",
  "AM2 Prep Questions"
];

const ExamTypesGrid = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
      {examTypes.map((examType) => (
        <ExamTypeCard key={examType} examType={examType} />
      ))}
    </div>
  );
};

export default ExamTypesGrid;
