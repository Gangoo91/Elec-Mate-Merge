
import CourseUnit, { CourseUnitProps } from "./CourseUnit";

interface CourseYearSectionProps {
  year: number;
  level: string;
  units: CourseUnitProps[];
}

const CourseYearSection = ({ year, level, units }: CourseYearSectionProps) => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Year {year} - {getTitleByYear(year)} (Level {level})</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {units.map((unit, index) => (
          <CourseUnit key={index} {...unit} />
        ))}
      </div>
    </div>
  );
};

function getTitleByYear(year: number): string {
  switch (year) {
    case 1:
      return "Foundation";
    case 2:
      return "Intermediate";
    case 3:
      return "Advanced";
    default:
      return "";
  }
}

export default CourseYearSection;
