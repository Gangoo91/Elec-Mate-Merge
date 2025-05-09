
import ResourceCard from "@/components/mental-health/ResourceCard";

interface Resource {
  title: string;
  description: string;
  type: 'document' | 'video' | 'article' | 'website';
  url: string;
}

interface CommunityResourcesListProps {
  resources: Resource[];
}

const CommunityResourcesList = ({ resources }: CommunityResourcesListProps) => {
  return (
    <div>
      <h3 className="text-lg font-medium mb-3">Community Resources</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {resources.map((resource, index) => (
          <ResourceCard 
            key={index}
            title={resource.title}
            description={resource.description}
            type={resource.type}
            url={resource.url}
          />
        ))}
      </div>
    </div>
  );
};

export default CommunityResourcesList;
