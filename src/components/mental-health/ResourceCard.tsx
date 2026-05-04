import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, FileText, Video, BookOpen, Users } from 'lucide-react';

interface ResourceCardProps {
  title: string;
  description: string;
  type: 'document' | 'video' | 'article' | 'website';
  url?: string;
  isExternal?: boolean;
}

const ResourceCard = ({ title, description, type, url, isExternal = true }: ResourceCardProps) => {
  // Choose icon based on content type or specific resource
  let Icon = type === 'document' ? FileText : type === 'video' ? Video : BookOpen;

  // Special styling for Andy's Man Club
  const isAndysManClub = title.includes("Andy's Man Club");

  if (isAndysManClub) {
    Icon = Users;
  }

  return (
    <Card
      className={`${isAndysManClub ? 'border-white/[0.06] bg-white/[0.02]' : 'border-white/[0.06] bg-[hsl(0_0%_12%)]'} h-full`}
    >
      <CardHeader className="pb-2">
        <div className="flex gap-3 items-start">
          <Icon
            className={`h-5 w-5 ${isAndysManClub ? 'text-white/85' : 'text-white/85'} mt-1 flex-shrink-0`}
          />
          <div>
            <CardTitle className="text-base">{title}</CardTitle>
            <CardDescription className="text-sm mt-1">{description}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {url && (
          <Button
            variant="outline"
            size="sm"
            className={`w-full mt-2 ${isAndysManClub ? 'border-white/[0.06] hover:bg-white/[0.02]' : ''}`}
            asChild
          >
            <a
              href={url}
              target={isExternal ? '_blank' : undefined}
              rel={isExternal ? 'noopener noreferrer' : undefined}
              className="flex items-center justify-center gap-2"
            >
              Access Resource
              {isExternal && <ExternalLink className="h-3.5 w-3.5" />}
            </a>
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default ResourceCard;
