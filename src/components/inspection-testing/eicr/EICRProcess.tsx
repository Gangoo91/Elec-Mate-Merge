
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { FileText, Wrench, ClipboardCheck, BarChart3, Settings, Play } from 'lucide-react';
import EICRSetupWizard from './EICRSetupWizard';
import EnhancedTestingInterface from '../EnhancedTestingInterface';
import { useTestFlowEngine } from '@/hooks/useTestFlowEngine';
import { eicrTestFlow } from '@/data/inspection-testing/eicrTestFlow';

const EICRProcess = () => {
  const [activeMode, setActiveMode] = useState<'wizard' | 'testing' | 'reports'>('wizard');
  const testFlowEngine = useTestFlowEngine(eicrTestFlow);

  const handleStartTesting = () => {
    setActiveMode('testing');
  };

  const handleStartWizard = () => {
    setActiveMode('wizard');
  };

  const handleViewReports = () => {
    setActiveMode('reports');
  };

  if (activeMode === 'wizard') {
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">EICR Setup Wizard</h2>
            <p className="text-muted-foreground">
              Step-by-step EICR process following BS 7671:2018+A3:2024
            </p>
          </div>
          <div className="flex gap-2">
            <Button onClick={handleStartTesting} variant="outline" className="flex items-center gap-2">
              <Wrench className="h-4 w-4" />
              Quick Testing
            </Button>
            <Button onClick={handleViewReports} variant="outline" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              View Reports
            </Button>
          </div>
        </div>

        <EICRSetupWizard />
      </div>
    );
  }

  if (activeMode === 'testing') {
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">EICR Testing Interface</h2>
            <p className="text-muted-foreground">
              Direct access to EICR testing procedures
            </p>
          </div>
          <div className="flex gap-2">
            <Button onClick={handleStartWizard} variant="outline" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Setup Wizard
            </Button>
            <Button onClick={handleViewReports} variant="outline" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              View Reports
            </Button>
          </div>
        </div>

        <EnhancedTestingInterface
          session={testFlowEngine.session}
          onStartSession={testFlowEngine.startSession}
          onPauseSession={() => {}}
          onResumeSession={() => {}}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">EICR Reports</h2>
          <p className="text-muted-foreground">
            View and manage EICR reports
          </p>
        </div>
        <div className="flex gap-2">
          <Button onClick={handleStartWizard} variant="outline" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Setup Wizard
          </Button>
          <Button onClick={handleStartTesting} variant="outline" className="flex items-center gap-2">
            <Wrench className="h-4 w-4" />
            Quick Testing
          </Button>
        </div>
      </div>

      <Alert className="bg-blue-500/10 border-blue-500/30">
        <BarChart3 className="h-4 w-4 text-blue-400" />
        <AlertDescription className="text-blue-200">
          EICR Reports section will be implemented next. This will include report generation, 
          viewing completed EICRs, and exporting certificates.
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default EICRProcess;
