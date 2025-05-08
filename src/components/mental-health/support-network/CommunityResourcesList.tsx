
import ResourceCard from "@/components/mental-health/ResourceCard";

export interface Resource {
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
    <div className="space-y-4">
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
  );
};

export default CommunityResourcesList;
