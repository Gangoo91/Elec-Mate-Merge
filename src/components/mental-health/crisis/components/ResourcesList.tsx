
import { ChevronRight, MapPin } from "lucide-react";
import { LocalResource } from "../models/resource-types";

interface ResourcesListProps {
  resources: LocalResource[];
  dataSource: string | null;
  onSelectResource: (resource: LocalResource) => void;
}

const ResourcesList = ({ resources, dataSource, onSelectResource }: ResourcesListProps) => {
  if (resources.length === 0) return null;
  
  return (
    <div className="mt-4 space-y-3">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <h4 className="text-sm font-medium flex items-center gap-1">
          <MapPin className="h-4 w-4 text-red-500" />
          Local Services:
        </h4>
        
        {dataSource && (
          <span className="text-xs text-muted-foreground bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-full">
            Source: {dataSource}
          </span>
        )}
      </div>
      
      {resources.map((resource, index) => (
        <div 
          key={index} 
          onClick={() => onSelectResource(resource)}
          className="p-3 bg-background rounded-md border border-border flex justify-between items-center cursor-pointer hover:border-red-500/30 hover:bg-red-500/5 transition-colors"
        >
          <div>
            <div className="font-medium text-sm">{resource.name}</div>
            <div className="text-xs text-muted-foreground flex items-center gap-1">
              <MapPin className="h-3 w-3" /> {resource.distance}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs px-2 py-1 bg-red-500/10 text-red-500 rounded">
              {resource.type}
            </span>
            {resource.open_now !== undefined && (
              <span className={`text-xs px-2 py-1 rounded ${
                resource.open_now ? "bg-green-500/10 text-green-500" : "bg-yellow-500/10 text-yellow-500"
              }`}>
                {resource.open_now ? "Open" : "Closed"}
              </span>
            )}
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ResourcesList;
