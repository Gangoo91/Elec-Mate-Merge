import { TrendingUp, Calendar, AlertTriangle, Zap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const Amendment3Intro = () => {
  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <TrendingUp className="h-5 w-5 text-elec-yellow" />
          Amendment 3 Overview
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-gray-300 text-lg leading-relaxed">
          Amendment 3 to BS 7671, effective from 31st July 2024, introduces critical requirements for bidirectional protection 
          in electrical installations, particularly focusing on renewable energy systems and grid interaction safety.
        </p>
        
        <div className="bg-yellow-600/10 border border-yellow-600/20 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <Calendar className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="text-yellow-200 font-medium mb-2">Implementation Timeline</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Amendment 3 became mandatory on 31st July 2024. All new installations must comply with these requirements, 
                while existing installations may require upgrades during major alterations or replacements.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-blue-600/10 border border-blue-600/20 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <Zap className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="text-blue-200 font-medium mb-2">Key Focus Areas</h3>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li>• <strong>Bidirectional Protection:</strong> Devices capable of isolating reverse current flows</li>
                <li>• <strong>Consumer Unit Enhancements:</strong> Requirements for renewable energy integration</li>
                <li>• <strong>Grid Interaction Safety:</strong> Protection against back-feed and islanding conditions</li>
                <li>• <strong>Testing Procedures:</strong> Updated commissioning and verification methods</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-red-600/10 border border-red-600/20 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="text-red-200 font-medium mb-2">Critical Compliance Note</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Non-compliance with Amendment 3 requirements can result in dangerous operating conditions, insurance voidance, 
                and regulatory enforcement action. Understanding these requirements is essential for current electrical practice.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};