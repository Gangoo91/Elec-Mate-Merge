
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Download, CheckCircle, AlertTriangle, Calendar } from "lucide-react";

const DocumentationTab = () => {
  const documents = [
    {
      name: "Electrical Installation Certificate",
      type: "EIC",
      description: "Required for new installations and additions",
      status: "required",
      category: "New Work",
      downloadUrl: "#"
    },
    {
      name: "Electrical Installation Condition Report",
      type: "EICR",
      description: "Periodic inspection of existing installations",
      status: "required",
      category: "Existing Work",
      downloadUrl: "#"
    },
    {
      name: "Minor Electrical Installation Works Certificate",
      type: "MEIWC",
      description: "For additions and alterations not requiring full EIC",
      status: "conditional",
      category: "Minor Work",
      downloadUrl: "#"
    },
    {
      name: "Schedule of Inspections",
      type: "Schedule",
      description: "Detailed inspection checklist and results",
      status: "required",
      category: "Inspection",
      downloadUrl: "#"
    },
    {
      name: "Schedule of Test Results",
      type: "Schedule",
      description: "Record of all electrical test measurements",
      status: "required",
      category: "Testing",
      downloadUrl: "#"
    }
  ];

  const completionSteps = [
    {
      step: 1,
      title: "Installation Details",
      description: "Complete installation type, extent of work, and location details",
      completed: false
    },
    {
      step: 2,
      title: "Supply Characteristics",
      description: "Record supply type, earthing arrangements, and main protective device",
      completed: false
    },
    {
      step: 3,
      title: "Inspection Results",
      description: "Document visual inspection findings and any observations",
      completed: false
    },
    {
      step: 4,
      title: "Test Results",
      description: "Record all electrical test measurements and outcomes",
      completed: false
    },
    {
      step: 5,
      title: "Declaration",
      description: "Complete declaration section and obtain required signatures",
      completed: false
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'required': return 'bg-red-500/10 text-red-400 border-red-500/20';
      case 'conditional': return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
      case 'optional': return 'bg-green-500/10 text-green-400 border-green-500/20';
      default: return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
    }
  };

  return (
    <div className="space-y-6">
      {/* Documentation Overview */}
      <Card className="border-blue-500/30 bg-blue-500/10">
        <CardHeader>
          <CardTitle className="text-blue-400 flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Documentation Requirements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-3 border border-blue-500/20 rounded-lg">
              <div className="text-2xl font-bold text-blue-400">{documents.filter(d => d.status === 'required').length}</div>
              <div className="text-sm text-muted-foreground">Required Documents</div>
            </div>
            <div className="text-center p-3 border border-blue-500/20 rounded-lg">
              <div className="text-2xl font-bold text-blue-400">{documents.filter(d => d.status === 'conditional').length}</div>
              <div className="text-sm text-muted-foreground">Conditional Documents</div>
            </div>
            <div className="text-center p-3 border border-blue-500/20 rounded-lg">
              <div className="text-2xl font-bold text-blue-400">BS 7671</div>
              <div className="text-sm text-muted-foreground">Compliance Standard</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Document Templates */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="text-elec-yellow flex items-center gap-2">
            <Download className="h-5 w-5" />
            Certificate Templates
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {documents.map((doc, index) => (
              <div key={index} className="border border-elec-yellow/20 rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-medium text-white mb-1">{doc.name}</h4>
                    <p className="text-sm text-muted-foreground mb-2">{doc.description}</p>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="border-blue-500/40 text-blue-400">
                        {doc.category}
                      </Badge>
                      <Badge variant="outline" className={getStatusColor(doc.status)}>
                        {doc.status}
                      </Badge>
                    </div>
                  </div>
                  <FileText className="h-6 w-6 text-elec-yellow flex-shrink-0" />
                </div>
                <Button size="sm" className="w-full">
                  <Download className="h-3 w-3 mr-1" />
                  Download Template
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Completion Checklist */}
      <Card className="border-green-500/30 bg-green-500/10">
        <CardHeader>
          <CardTitle className="text-green-400 flex items-center gap-2">
            <CheckCircle className="h-5 w-5" />
            Certificate Completion Checklist
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {completionSteps.map((step) => (
              <div key={step.step} className="flex items-center gap-4 p-3 border border-green-500/20 rounded-lg">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                  step.completed 
                    ? 'bg-green-500 text-black' 
                    : 'bg-green-500/20 text-green-400 border border-green-500/40'
                }`}>
                  {step.completed ? <CheckCircle className="h-4 w-4" /> : step.step}
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-white">{step.title}</h4>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>
                <Button size="sm" variant={step.completed ? "default" : "outline"}>
                  {step.completed ? 'Completed' : 'Start'}
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Legal Requirements */}
      <Card className="border-amber-500/30 bg-amber-500/10">
        <CardHeader>
          <CardTitle className="text-amber-400 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Legal Requirements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3 text-amber-300">Building Regulations</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Part P compliance required</li>
                <li>• Local Authority notification</li>
                <li>• Competent person scheme registration</li>
                <li>• Building Control approval</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-amber-300">Record Keeping</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Certificates must be retained</li>
                <li>• Copy provided to client</li>
                <li>• Digital copies recommended</li>
                <li>• Inspection intervals documented</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DocumentationTab;
