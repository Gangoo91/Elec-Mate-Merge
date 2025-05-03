
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Video, BookOpen, CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ResourceCardProps {
  title: string;
  description: string;
  type: 'document' | 'video' | 'learning';
  cta: string;
  href?: string;
  onClick?: () => void;
  duration?: string;
  isCompleted?: boolean;
  onToggleComplete?: () => void;
}

const ResourceCard = ({ 
  title, 
  description, 
  type, 
  cta, 
  href,
  onClick,
  duration,
  isCompleted = false,
  onToggleComplete
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

  const handleToggleComplete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onToggleComplete) {
      onToggleComplete();
    }
  };

  return (
    <Card className={`border-elec-yellow/20 bg-elec-gray h-full flex flex-col ${isCompleted ? 'border-l-4 border-l-green-500' : ''}`}>
      <CardHeader className="pb-2 flex flex-row items-start gap-3">
        <div className="flex-shrink-0 relative">
          <Icon className={`h-6 w-6 ${isCompleted ? 'text-green-500' : 'text-elec-yellow'} mt-1`} />
          {isCompleted && (
            <CheckCircle className="h-4 w-4 text-green-500 absolute -right-2 -bottom-1" />
          )}
        </div>
        <div className="flex-grow">
          <div className="flex justify-between items-start">
            <CardTitle className="text-base">{title}</CardTitle>
            {isCompleted && (
              <Badge variant="outline" className="bg-green-500/20 text-green-500 border-green-500/30 ml-2 text-xs">
                Completed
              </Badge>
            )}
          </div>
          <CardDescription>{description}</CardDescription>
          {duration && (
            <p className="text-xs text-elec-yellow mt-1">{duration}</p>
          )}
        </div>
      </CardHeader>
      <CardContent className="pt-2 mt-auto flex gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          className={`${!isCompleted ? 'w-full' : 'flex-grow'}`}
          onClick={handleClick}
          {...(href ? { asChild: true } : {})}
        >
          {href ? <a href={href} target="_blank" rel="noopener noreferrer">{cta}</a> : cta}
        </Button>
        
        <Button 
          variant={isCompleted ? "outline" : "default"}
          size="sm" 
          className={`${isCompleted ? 'bg-green-500/20 hover:bg-green-500/30 text-green-500 border-green-500/30' : 'bg-elec-yellow/20 hover:bg-elec-yellow/30 text-elec-yellow border-elec-yellow/30'}`}
          onClick={handleToggleComplete}
        >
          {isCompleted ? "Completed" : "Mark Complete"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default ResourceCard;
