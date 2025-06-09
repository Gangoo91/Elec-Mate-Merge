
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, FileText, CheckCircle, Clock, AlertTriangle } from 'lucide-react';

const WorkflowTab = () => {
  const [selectedWorkflow, setSelectedWorkflow] = useState<string | null>(null);

  const workflows = [
    {
      id: 'standard-eicr',
      title: 'Standard EICR',
      duration: '2-4 hours',
      complexity: 'Standard',
      description: 'Complete electrical installation condition report for domestic and small commercial properties',
      steps: ['Visual inspection', 'Testing & measurements', 'Documentation', 'Report generation'],
      recommended: true
    },
    {
      id: 'minor-works',
      title: 'Minor Works Certificate',
      duration: '30-60 mins',
      complexity: 'Basic',
      description: 'Simple addition or alteration to existing installation',
      steps: ['Installation details', 'Testing', 'Certification'],
      recommended: false
    },
    {
      id: 'initial-verification',
      title: 'Initial Verification',
      duration: '3-6 hours',
      complexity: 'Comprehensive',
      description: 'Full verification of new electrical installation',
      steps: ['Design verification', 'Construction verification', 'Testing', 'Documentation'],
      recommended: false
    }
  ];

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case 'Basic': return 'bg-green-500/10 text-green-400 border-green-500/20';
      case 'Standard': return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case 'Comprehensive': return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
      default: return 'bg-elec-yellow/10 text-elec-yellow border-elec-yellow/20';
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border-elec-yellow/30 bg-gradient-to-br from-elec-yellow/5 to-blue-500/5">
        <CardHeader>
          <CardTitle className="text-elec-yellow flex items-center gap-2">
            <FileText className="h-5 w-5" />
            EICR Workflow Selection
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-green-500/10 rounded-lg p-4 border border-green-500/20">
              <div className="text-2xl font-bold text-green-400">3</div>
              <div className="text-sm text-muted-foreground">Available Workflows</div>
            </div>
            <div className="bg-blue-500/10 rounded-lg p-4 border border-blue-500/20">
              <div className="text-2xl font-bold text-blue-400">BS 7671</div>
              <div className="text-sm text-muted-foreground">Compliant</div>
            </div>
            <div className="bg-purple-500/10 rounded-lg p-4 border border-purple-500/20">
              <div className="text-2xl font-bold text-purple-400">Digital</div>
              <div className="text-sm text-muted-foreground">PDF Export</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {workflows.map((workflow) => (
          <Card 
            key={workflow.id} 
            className={`border transition-all cursor-pointer ${
              selectedWorkflow === workflow.id
                ? 'border-elec-yellow bg-elec-yellow/5 ring-1 ring-elec-yellow/20'
                : 'border-elec-yellow/20 bg-elec-gray hover:border-elec-yellow/40'
            }`}
            onClick={() => setSelectedWorkflow(workflow.id)}
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-white text-lg">{workflow.title}</CardTitle>
                    {workflow.recommended && (
                      <Badge className="bg-elec-yellow/20 text-elec-yellow border-elec-yellow/30">
                        Recommended
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={getComplexityColor(workflow.complexity)}>
                      {workflow.complexity}
                    </Badge>
                    <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/20">
                      <Clock className="h-3 w-3 mr-1" />
                      {workflow.duration}
                    </Badge>
                  </div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">{workflow.description}</p>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <h4 className="font-medium text-elec-yellow">Process Steps</h4>
                <div className="space-y-2">
                  {workflow.steps.map((step, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      <div className="w-6 h-6 rounded-full bg-elec-yellow/20 border border-elec-yellow/30 flex items-center justify-center text-xs text-elec-yellow font-medium">
                        {index + 1}
                      </div>
                      <span className="text-muted-foreground">{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <Button 
                  className="w-full bg-elec-yellow text-black hover:bg-elec-yellow/90"
                  onClick={(e) => {
                    e.stopPropagation();
                    // Handle workflow start
                    console.log(`Starting ${workflow.title} workflow`);
                  }}
                >
                  Start {workflow.title}
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-green-500/30 bg-green-500/10">
        <CardHeader>
          <CardTitle className="text-green-300 flex items-center gap-2">
            <CheckCircle className="h-5 w-5" />
            Best Practices
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3 text-green-300">Before Starting</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Ensure safe isolation is complete</li>
                <li>• Have all necessary test equipment calibrated</li>
                <li>• Review installation drawings and schedules</li>
                <li>• Plan your inspection and testing sequence</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-green-300">Quality Standards</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Follow BS 7671 requirements precisely</li>
                <li>• Document all findings thoroughly</li>
                <li>• Take clear photographs of defects</li>
                <li>• Complete all required test measurements</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WorkflowTab;
