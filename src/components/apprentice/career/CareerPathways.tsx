
import { careerPaths } from "./careerPathsData";
import CareerPathCard from "./CareerPathCard";
import CareerAdvancementTips from "./CareerAdvancementTips";
import CareerProgressionPaths from "./CareerProgressionPaths";

const CareerPathways = () => {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Career Pathways</h2>
        <p className="text-muted-foreground">
          The electrical industry offers diverse career paths with opportunities for advancement based on your interests, skills, and goals. 
          Below are key pathways you can explore as you progress in your electrical career, sorted by typical salary ranges from entry-level to advanced positions.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {careerPaths.map((path) => (
          <CareerPathCard 
            key={path.id}
            title={path.title}
            requirements={path.requirements}
            description={path.description}
            icon={path.icon}
            skills={path.skills}
            salaryRange={path.salaryRange}
            timeToAchieve={path.timeToAchieve}
          />
        ))}
      </div>

      <CareerAdvancementTips />
      <CareerProgressionPaths />
    </div>
  );
};

export default CareerPathways;
