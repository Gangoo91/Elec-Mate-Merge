import { Network, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const DataCablingIntro = () => {
  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <Network className="h-5 w-5 text-elec-yellow" />
          Introduction to Structured Cabling
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 text-gray-300">
        <p className="leading-relaxed">
          Structured cabling is the backbone of modern telecommunications infrastructure, providing a 
          standardised approach to building comprehensive cabling systems that support multiple hardware 
          uses and be suitable for today's needs and those of the future.
        </p>
        
        <div className="bg-blue-600/20 border border-blue-600/30 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <ArrowRight className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-blue-300 mb-2">Why Structured Cabling Matters</h4>
              <p className="text-blue-100 text-sm leading-relaxed">
                Unlike point-to-point cabling, structured cabling creates a unified system that can handle 
                voice, data, video, and multimedia applications through a single infrastructure. This approach 
                reduces costs, improves reliability, and simplifies future upgrades.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};