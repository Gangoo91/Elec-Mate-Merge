import { TreePine } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const Section3Header = () => {
  return (
    <div className="max-w-full">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
        <TreePine className="h-6 w-6 sm:h-8 sm:w-8 text-elec-yellow flex-shrink-0" />
        <div className="min-w-0 flex-1">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground break-words">
            Outdoor and Agricultural Installations
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-foreground break-words">
            Module 7, Section 3 - Harsh Environment Requirements
          </p>
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        <Badge variant="secondary" className="bg-elec-yellow text-elec-dark text-xs sm:text-sm">
          Module 7.3
        </Badge>
        <Badge variant="outline" className="border-gray-600 text-foreground text-xs sm:text-sm">
          28 minutes
        </Badge>
      </div>
    </div>
  );
};

export default Section3Header;