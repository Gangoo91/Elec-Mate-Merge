
import React from 'react';
import { BookOpen, FileText, Video } from 'lucide-react';

interface Resource {
  id: string;
  title: string;
  type: "video" | "learning" | "document"; // Specific string literals only
  completed?: boolean;
}

interface UnitResourceListProps {
  resources: Resource[];
  onResourceClick: (resourceId: string) => void;
  onToggleComplete: (resourceId: string) => void;
  completedResources: Record<string, boolean>;
}

const UnitResourceList: React.FC<UnitResourceListProps> = ({
  resources,
  onResourceClick,
  onToggleComplete,
  completedResources
}) => {
  const getIcon = (type: "video" | "learning" | "document") => {
    switch (type) {
      case "video":
        return <Video className="h-4 w-4 text-blue-500" />;
      case "learning":
        return <BookOpen className="h-4 w-4 text-green-500" />;
      case "document":
        return <FileText className="h-4 w-4 text-amber-500" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-3">
      {resources.map((resource) => (
        <div 
          key={resource.id}
          className="flex items-center justify-between p-3 rounded-md border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 shadow-sm hover:shadow transition cursor-pointer"
          onClick={() => onResourceClick(resource.id)}
        >
          <div className="flex items-center space-x-3">
            {getIcon(resource.type)}
            <span>{resource.title}</span>
          </div>
          <div>
            <input 
              type="checkbox" 
              checked={!!completedResources[resource.id]} 
              onChange={(e) => {
                e.stopPropagation();
                onToggleComplete(resource.id);
              }}
              className="h-4 w-4 accent-green-600"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default UnitResourceList;
