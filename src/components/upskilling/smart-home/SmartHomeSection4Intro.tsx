import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Info } from 'lucide-react';

export const SmartHomeSection4Intro = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Info className="h-5 w-5 text-elec-yellow" />
          Introduction
        </CardTitle>
      </CardHeader>
      <CardContent className="text-gray-300 space-y-4">
        <p className="text-lg font-medium text-foreground mb-4">
          Smart homes can be built on different architectural models that determine how data is processed, where automation decisions are made, and how systems communicate:
        </p>
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <div className="p-3 bg-gradient-to-br from-blue-900/30 to-blue-800/30 border border-blue-600 rounded-lg text-center hover:scale-105 transition-transform">
            <h4 className="font-semibold text-blue-200 mb-2">Local Architecture</h4>
            <p className="text-sm text-blue-100">Processing happens entirely within the home</p>
          </div>
          <div className="p-3 bg-gradient-to-br from-green-900/30 to-green-800/30 border border-green-600 rounded-lg text-center hover:scale-105 transition-transform">
            <h4 className="font-semibold text-green-200 mb-2">Cloud Architecture</h4>
            <p className="text-sm text-green-100">Automation decisions made on remote servers</p>
          </div>
          <div className="p-3 bg-gradient-to-br from-purple-900/30 to-purple-800/30 border border-purple-600 rounded-lg text-center hover:scale-105 transition-transform">
            <h4 className="font-semibold text-purple-200 mb-2">Hybrid Architecture</h4>
            <p className="text-sm text-purple-100">Combines local processing with cloud services</p>
          </div>
        </div>
        <p>
          Each architectural approach has distinct advantages and limitations regarding reliability, speed, cost, security, and ease of use. Understanding these differences is crucial for making informed design and installation choices that match specific project requirements and user preferences.
        </p>
        <p>
          This section explores how these systems operate, their integration capabilities, and provides guidance on selecting the most appropriate architecture for different smart home applications and user scenarios.
        </p>
      </CardContent>
    </Card>
  );
};