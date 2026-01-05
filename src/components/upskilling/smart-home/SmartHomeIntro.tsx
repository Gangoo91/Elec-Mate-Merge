import { Target } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const SmartHomeIntro = () => {
  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Target className="h-6 w-6 text-elec-yellow" />
          Introduction
        </CardTitle>
      </CardHeader>
      <CardContent className="text-gray-300 space-y-4">
        <p className="text-base leading-relaxed">
          Smart homes represent a revolutionary approach to residential living, transforming traditional houses 
          into intelligent, interconnected environments. These systems integrate advanced technologies to create 
          seamless automation, enhanced security, and optimised energy management.
        </p>
        <p className="text-base leading-relaxed">
          This comprehensive section explores the fundamental concepts of smart home technology, examining how 
          interconnected devices, communication protocols, and intelligent control systems work together to 
          create more efficient, convenient, and secure living spaces.
        </p>
        <div className="bg-blue-600/10 p-4 rounded-lg border border-blue-600/30">
          <p className="text-blue-400 font-semibold text-sm mb-2">Key Focus Areas:</p>
          <ul className="text-sm text-gray-300 space-y-1">
            <li>• Understanding smart home definitions and core technologies</li>
            <li>• Exploring communication protocols and device integration</li>
            <li>• Analysing benefits, challenges, and real-world applications</li>
            <li>• Examining implementation strategies and future developments</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};