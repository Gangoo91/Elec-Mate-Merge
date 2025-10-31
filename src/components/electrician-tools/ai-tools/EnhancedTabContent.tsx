import { processElectricalText } from "@/lib/text-processor";
import { Card } from "@/components/ui/card";
import { BookOpen, FileText, Wrench } from "lucide-react";

interface EnhancedTabContentProps {
  content: string;
  type: 'technical' | 'regulations' | 'practical';
}

export const EnhancedTabContent = ({ content, type }: EnhancedTabContentProps) => {
  const processedHTML = processElectricalText(content);
  
  const iconMap = {
    technical: FileText,
    regulations: BookOpen,
    practical: Wrench
  };
  
  const Icon = iconMap[type];
  
  const colorClasses = {
    technical: {
      card: 'bg-blue-500/5 border-blue-500/20',
      iconBg: 'bg-blue-500/10',
      icon: 'text-blue-400'
    },
    regulations: {
      card: 'bg-purple-500/5 border-purple-500/20',
      iconBg: 'bg-purple-500/10',
      icon: 'text-purple-400'
    },
    practical: {
      card: 'bg-green-500/5 border-green-500/20',
      iconBg: 'bg-green-500/10',
      icon: 'text-green-400'
    }
  };
  
  const colors = colorClasses[type];
  
  return (
    <Card className={`${colors.card} p-4 sm:p-6`}>
      <div className="flex items-start gap-3 sm:gap-4">
        <div className={`w-9 h-9 sm:w-10 sm:h-10 ${colors.iconBg} rounded-lg flex items-center justify-center flex-shrink-0`}>
          <Icon className={`h-4 w-4 sm:h-5 sm:w-5 ${colors.icon}`} />
        </div>
        <div 
          className="flex-1 prose prose-invert prose-sm sm:prose-base max-w-none [&>h1]:text-xl [&>h1]:sm:text-2xl [&>h1]:font-bold [&>h1]:mb-3 [&>h1]:sm:mb-4 [&>h2]:text-lg [&>h2]:sm:text-xl [&>h2]:font-semibold [&>h2]:mb-2 [&>h2]:sm:mb-3 [&>h3]:text-base [&>h3]:sm:text-lg [&>h3]:font-semibold [&>h3]:mb-2 [&>p]:mb-3 [&>p]:sm:mb-4 [&>p]:leading-relaxed [&>li]:mb-2 [&>ul]:space-y-2 [&>ol]:space-y-2"
          dangerouslySetInnerHTML={{ __html: processedHTML }}
        />
      </div>
    </Card>
  );
};
