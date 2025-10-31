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
          className="flex-1 text-left space-y-4 max-w-none
            [&_h1]:text-2xl [&_h1]:font-bold [&_h1]:text-white [&_h1]:mb-4 [&_h1]:mt-0
            [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-white [&_h2]:mb-3 [&_h2]:mt-6
            [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-gray-100 [&_h3]:mb-2 [&_h3]:mt-4
            [&_p]:text-gray-200 [&_p]:leading-relaxed [&_p]:mb-4 [&_p]:text-left
            [&_ul]:list-disc [&_ul]:list-outside [&_ul]:ml-6 [&_ul]:space-y-2 [&_ul]:mb-4 [&_ul]:text-left
            [&_li]:text-gray-200 [&_li]:leading-relaxed [&_li]:pl-2 [&_li]:text-left
            [&_strong]:font-semibold [&_strong]:text-white
            [&_em]:italic [&_em]:text-gray-300"
          dangerouslySetInnerHTML={{ __html: processedHTML }}
        />
      </div>
    </Card>
  );
};
