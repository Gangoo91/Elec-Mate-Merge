import { Globe } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import ResourceCard from '@/components/mental-health/ResourceCard';

interface OnlineResource {
  title: string;
  description: string;
  type: 'document' | 'video' | 'article' | 'website';
  url?: string;
}

interface OnlineCrisisSupportProps {
  onlineResources: OnlineResource[];
}

const OnlineCrisisSupport = ({ onlineResources }: OnlineCrisisSupportProps) => {
  return (
    <Card className="border-white/[0.06] bg-[hsl(0_0%_12%)] col-span-1 md:col-span-2 shadow-sm">
      <CardHeader className="pb-3 border-b border-white/[0.06]">
        <CardTitle className="text-lg flex items-center gap-2">
          <Globe className="h-5 w-5 text-red-500" />
          Online Support Resources
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-6 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {onlineResources.map((resource, index) => (
            <ResourceCard
              key={index}
              title={resource.title}
              description={resource.description}
              type={resource.type}
              url={resource.url}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default OnlineCrisisSupport;
