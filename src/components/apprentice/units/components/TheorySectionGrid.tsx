
import TheoryUnitCard from "./TheoryUnitCard";
import { TheorySection } from "../data/electricalTheorySections";

interface TheorySectionGridProps {
  sections: TheorySection[];
  courseSlug?: string;
  unitCode?: string;
  onResourceClick?: (type: string) => void;
}

const TheorySectionGrid = ({ 
  sections, 
  courseSlug, 
  unitCode, 
  onResourceClick 
}: TheorySectionGridProps) => {
  return (
    <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
      {sections.map((section) => (
        <TheoryUnitCard
          key={section.sectionNumber}
          sectionNumber={section.sectionNumber}
          title={section.title}
          description={section.description}
          icon={section.icon}
          courseSlug={courseSlug}
          unitCode={unitCode}
          onResourceClick={onResourceClick}
        />
      ))}
    </div>
  );
};

export default TheorySectionGrid;
