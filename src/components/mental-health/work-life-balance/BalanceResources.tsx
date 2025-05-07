
import ResourceCard from "@/components/mental-health/ResourceCard";

interface ResourceItem {
  title: string;
  description: string;
  type: 'document' | 'video' | 'article' | 'website';
  url?: string;
}

interface BalanceResourcesProps {
  resources: ResourceItem[];
}

const BalanceResources = ({ resources }: BalanceResourcesProps) => {
  return (
    <div>
      <h3 className="text-lg font-medium mb-3">UK Support Resources</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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

export default BalanceResources;
