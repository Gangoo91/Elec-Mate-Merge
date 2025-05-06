
import ResourceCard from "@/components/apprentice/ResourceCard";
import type { CourseResource } from "@/data/courseUnits";

interface UnitResourceListProps {
  resources: CourseResource[];
  onResourceClick: (type: string) => void;
  completedResources: Record<string, boolean>;
  onToggleResourceComplete: (resourceId: string) => void;
}

const UnitResourceList = ({ 
  resources, 
  onResourceClick, 
  completedResources, 
  onToggleResourceComplete 
}: UnitResourceListProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
      <h4 className="font-semibold col-span-full">Learning Resources</h4>
      {resources.map(resource => (
        <ResourceCard
          key={resource.id}
          title={resource.title}
          description={resource.description}
          type={resource.type}
          cta={resource.type === 'video' ? 'Watch Video' : resource.type === 'document' ? 'Read Document' : 'Start Activity'}
          href={resource.href}
          duration={resource.duration}
          onClick={() => onResourceClick(resource.type)}
          isCompleted={!!completedResources[resource.id]}
          onToggleComplete={() => onToggleResourceComplete(resource.id)}
        />
      ))}
    </div>
  );
};

export default UnitResourceList;
