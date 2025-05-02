
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Video, BookOpen } from "lucide-react";

interface ResourceCardProps {
  title: string;
  description: string;
  type: 'document' | 'video' | 'learning';
  cta: string;
  href?: string;
  onClick?: () => void;
  duration?: string;
}

const ResourceCard = ({ 
  title, 
  description, 
  type, 
  cta, 
  href,
  onClick,
  duration 
}: ResourceCardProps) => {
  const Icon = type === 'document' 
    ? FileText 
    : type === 'video' 
      ? Video 
      : BookOpen;
  
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray h-full flex flex-col">
      <CardHeader className="pb-2 flex flex-row items-start gap-3">
        <Icon className="h-6 w-6 text-elec-yellow mt-1" />
        <div>
          <CardTitle className="text-base">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
          {duration && (
            <p className="text-xs text-elec-yellow mt-1">{duration}</p>
          )}
        </div>
      </CardHeader>
      <CardContent className="pt-2 mt-auto">
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full"
          onClick={handleClick}
          {...(href ? { asChild: true } : {})}
        >
          {href ? <a href={href} target="_blank" rel="noopener noreferrer">{cta}</a> : cta}
        </Button>
      </CardContent>
    </Card>
  );
};

export default ResourceCard;
