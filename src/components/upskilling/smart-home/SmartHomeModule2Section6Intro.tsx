import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { GitBranch } from 'lucide-react';

export const SmartHomeModule2Section6Intro = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <GitBranch className="h-5 w-5 text-elec-yellow" />
          Introduction
        </CardTitle>
      </CardHeader>
      <CardContent className="text-foreground space-y-4">
        <p>
          One of the biggest challenges in smart homes is <strong className="text-foreground">device compatibility</strong>. Different manufacturers use different protocols and ecosystems, meaning devices don't always talk to each other. <strong className="text-foreground">Compatibility mapping</strong> helps installers plan which devices can integrate, and <strong className="text-foreground">bridges</strong> act as translators between systems.
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
          <div className="p-4 bg-blue-900/10 border border-blue-600/20 rounded-lg">
            <h4 className="font-semibold text-blue-200 mb-2">Compatibility Mapping</h4>
            <p className="text-blue-100 text-sm">Researching device support and protocol compatibility before purchase to ensure seamless integration.</p>
          </div>
          
          <div className="p-4 bg-purple-900/10 border border-purple-600/20 rounded-lg">
            <h4 className="font-semibold text-purple-200 mb-2">Bridge Technology</h4>
            <p className="text-purple-100 text-sm">Hardware or software solutions that translate between different protocols and ecosystems.</p>
          </div>
        </div>

        <p>
          This section covers how to evaluate compatibility and when to use bridges effectively to create cohesive smart home systems.
        </p>
      </CardContent>
    </Card>
  );
};