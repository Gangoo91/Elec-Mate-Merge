
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Wrench, AlertTriangle, CheckCircle } from 'lucide-react';

const RcdInstallationTab = () => {
  const installationGuidelines = [
    { category: 'Location', requirement: 'Accessible for testing', detail: 'RCD should be easily accessible for monthly testing' },
    { category: 'Labelling', requirement: 'Clear identification', detail: 'All RCD-protected circuits must be clearly labelled' },
    { category: 'Discrimination', requirement: 'Selective coordination', detail: 'Use S-type RCDs for upstream protection' },
    { category: 'Load Balance', requirement: 'Balanced loading', detail: 'Distribute loads evenly across phases' },
    { category: 'Nuisance Tripping', requirement: 'Minimise earth leakage', detail: 'Consider load characteristics and cable lengths' }
  ];

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Wrench className="h-6 w-6 text-elec-yellow" />
          Installation Guidelines
        </CardTitle>
        <CardDescription>
          Best practices for RCD installation and configuration
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {installationGuidelines.map((guideline, index) => (
            <Card key={index} className="bg-muted border-border">
              <CardHeader className="pb-3">
                <CardTitle className="text-foreground text-lg">{guideline.category}</CardTitle>
                <Badge className="bg-elec-yellow text-black w-fit">
                  {guideline.requirement}
                </Badge>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-300">{guideline.detail}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="bg-amber-500/10 border border-amber-500/30">
          <CardHeader>
            <CardTitle className="text-amber-400 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Common Installation Issues
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="font-semibold text-foreground">Nuisance Tripping</h4>
                <ul className="text-sm text-gray-300 space-y-1">
                  <li>• Excessive earth leakage current</li>
                  <li>• Inappropriate RCD type selection</li>
                  <li>• Poor installation practices</li>
                  <li>• Equipment compatibility issues</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-foreground">Discrimination Problems</h4>
                <ul className="text-sm text-gray-300 space-y-1">
                  <li>• Incorrect time grading</li>
                  <li>• Inappropriate sensitivity selection</li>
                  <li>• Lack of selectivity between devices</li>
                  <li>• Poor coordination with other protection</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-green-500/10 border border-green-500/30">
          <CardHeader>
            <CardTitle className="text-green-400 flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              Installation Checklist
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="font-semibold text-foreground">Before Installation</h4>
                <ul className="text-sm text-gray-300 space-y-1">
                  <li>✓ Verify circuit requirements</li>
                  <li>✓ Select appropriate RCD type</li>
                  <li>✓ Check discrimination requirements</li>
                  <li>✓ Calculate earth leakage currents</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-foreground">After Installation</h4>
                <ul className="text-sm text-gray-300 space-y-1">
                  <li>✓ Perform all required tests</li>
                  <li>✓ Verify correct operation</li>
                  <li>✓ Label all protected circuits</li>
                  <li>✓ Provide user instructions</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
};

export default RcdInstallationTab;
