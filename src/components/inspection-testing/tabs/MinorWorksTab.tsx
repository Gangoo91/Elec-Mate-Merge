
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { FileText, Shield, Play } from 'lucide-react';

const MinorWorksTab = () => {
  const handleStartMinorWorks = () => {
    console.log('Starting Minor Works Certificate process...');
    // TODO: Implement minor works certificate workflow
  };

  return (
    <div className="space-y-6">
      <Card className="border-elec-yellow/30 bg-elec-gray">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-elec-yellow" />
            Minor Works Certificate
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-6">
            Complete Minor Works Certificate procedures for small additions and alterations to electrical installations. 
            This process includes visual inspection, testing, and certification documentation as required by BS 7671.
          </p>

          <Alert className="mb-6 bg-blue-500/10 border-blue-500/30">
            <Shield className="h-4 w-4 text-blue-400" />
            <AlertDescription className="text-blue-200">
              <strong>Minor Works Definition:</strong> Work that does not include the provision of a new circuit. 
              Examples include additional socket outlets, lighting points, or replacing accessories.
            </AlertDescription>
          </Alert>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <Card className="border-green-500/20 bg-green-500/5">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Typical Minor Works</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <ul className="text-sm space-y-1">
                  <li>• Additional socket outlets</li>
                  <li>• Additional lighting points</li>
                  <li>• Replacing accessories</li>
                  <li>• Adding spurs to existing circuits</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-orange-500/20 bg-orange-500/5">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Required Tests</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <ul className="text-sm space-y-1">
                  <li>• Visual inspection</li>
                  <li>• Continuity of protective conductors</li>
                  <li>• Insulation resistance</li>
                  <li>• Polarity verification</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="flex gap-4">
            <Button 
              onClick={handleStartMinorWorks}
              className="bg-elec-yellow text-black hover:bg-elec-yellow/90"
            >
              <Play className="h-4 w-4 mr-2" />
              Start Minor Works Process
            </Button>
            <Button variant="outline">
              <FileText className="h-4 w-4 mr-2" />
              View Template
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="border-yellow-500/50 bg-yellow-500/10">
        <CardHeader>
          <CardTitle className="text-yellow-300 flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Competency Requirements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Minor works certificates can only be issued by competent persons. Ensure you have the appropriate 
            qualifications and are registered with a competent person scheme or are working under the supervision 
            of a qualified supervisor.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default MinorWorksTab;
