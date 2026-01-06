
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Download, CheckCircle, AlertTriangle, Calendar, Scale, ClipboardList } from "lucide-react";

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

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'required': return { bg: 'bg-red-500/10', text: 'text-red-400', border: 'border-red-500/30' };
      case 'conditional': return { bg: 'bg-elec-yellow/10', text: 'text-elec-yellow', border: 'border-elec-yellow/30' };
      case 'optional': return { bg: 'bg-green-500/10', text: 'text-green-400', border: 'border-green-500/30' };
      default: return { bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/30' };
    }
  };

  const getCategoryConfig = (category: string) => {
    const configs: Record<string, { bg: string; text: string; border: string }> = {
      'New Work': { bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/30' },
      'Existing Work': { bg: 'bg-purple-500/10', text: 'text-purple-400', border: 'border-purple-500/30' },
      'Minor Work': { bg: 'bg-green-500/10', text: 'text-green-400', border: 'border-green-500/30' },
      'Inspection': { bg: 'bg-orange-500/10', text: 'text-orange-400', border: 'border-orange-500/30' },
      'Testing': { bg: 'bg-cyan-500/10', text: 'text-cyan-400', border: 'border-cyan-500/30' }
    };
    return configs[category] || { bg: 'bg-white/10', text: 'text-white/70', border: 'border-white/20' };
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Documentation Overview */}
      <Card className="bg-gradient-to-br from-white/5 to-elec-card border-white/10 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <CardHeader className="relative">
          <CardTitle className="text-white flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-500/5 border border-blue-500/30">
              <FileText className="h-5 w-5 text-blue-400" />
            </div>
            Documentation Requirements
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 relative">
          <p className="text-white/70">
            Complete documentation is essential for BS7671 compliance. Use these templates
            and follow the completion checklist to ensure all requirements are met.
          </p>
          <div className="grid grid-cols-3 gap-3">
            <div className="p-4 rounded-xl bg-white/10 border border-white/10 text-center">
              <div className="p-2 rounded-lg bg-red-500/20 inline-block mb-2">
                <FileText className="h-5 w-5 text-red-400" />
              </div>
              <div className="text-2xl font-bold text-red-400">{documents.filter(d => d.status === 'required').length}</div>
              <div className="text-xs text-white/60">Required</div>
            </div>
            <div className="p-4 rounded-xl bg-white/10 border border-white/10 text-center">
              <div className="p-2 rounded-lg bg-elec-yellow/20 inline-block mb-2">
                <ClipboardList className="h-5 w-5 text-elec-yellow" />
              </div>
              <div className="text-2xl font-bold text-elec-yellow">{documents.filter(d => d.status === 'conditional').length}</div>
              <div className="text-xs text-white/60">Conditional</div>
            </div>
            <div className="p-4 rounded-xl bg-white/10 border border-white/10 text-center">
              <div className="p-2 rounded-lg bg-blue-500/20 inline-block mb-2">
                <Scale className="h-5 w-5 text-blue-400" />
              </div>
              <div className="text-2xl font-bold text-blue-400">BS 7671</div>
              <div className="text-xs text-white/60">Standard</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Document Templates */}
      <Card className="bg-gradient-to-br from-white/5 to-elec-card border-white/10 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-elec-yellow/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <CardHeader className="relative">
          <CardTitle className="text-white flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-elec-yellow/20 to-elec-yellow/5 border border-elec-yellow/30">
              <Download className="h-5 w-5 text-elec-yellow" />
            </div>
            Certificate Templates
          </CardTitle>
        </CardHeader>
        <CardContent className="relative">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {documents.map((doc, index) => {
              const statusConfig = getStatusConfig(doc.status);
              const categoryConfig = getCategoryConfig(doc.category);
              return (
                <div
                  key={index}
                  className="p-4 rounded-xl bg-white/10 border border-white/10 hover:border-white/20 transition-colors"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h4 className="font-semibold text-white mb-1">{doc.name}</h4>
                      <p className="text-sm text-white/60 mb-3">{doc.description}</p>
                      <div className="flex items-center gap-2">
                        <Badge className={`${categoryConfig.bg} ${categoryConfig.text} border ${categoryConfig.border}`}>
                          {doc.category}
                        </Badge>
                        <Badge className={`${statusConfig.bg} ${statusConfig.text} border ${statusConfig.border}`}>
                          {doc.status}
                        </Badge>
                      </div>
                    </div>
                    <div className="p-2 rounded-lg bg-elec-yellow/20 flex-shrink-0">
                      <FileText className="h-5 w-5 text-elec-yellow" />
                    </div>
                  </div>
                  <Button
                    size="sm"
                    className="w-full h-10 bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold touch-manipulation active:scale-95 transition-all"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download Template
                  </Button>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Completion Checklist */}
      <Card className="bg-gradient-to-br from-white/5 to-elec-card border-green-500/20 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <CardHeader className="relative">
          <CardTitle className="text-white flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-green-500/20 to-green-500/5 border border-green-500/30">
              <CheckCircle className="h-5 w-5 text-green-400" />
            </div>
            Certificate Completion Checklist
          </CardTitle>
        </CardHeader>
        <CardContent className="relative space-y-3">
          {completionSteps.map((step) => (
            <div
              key={step.step}
              className="flex items-center gap-4 p-4 rounded-xl bg-white/10 border border-white/10 hover:border-green-500/30 transition-colors"
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold ${
                step.completed
                  ? 'bg-green-500 text-black'
                  : 'bg-green-500/10 text-green-400 border border-green-500/30'
              }`}>
                {step.completed ? <CheckCircle className="h-5 w-5" /> : step.step}
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-white">{step.title}</h4>
                <p className="text-sm text-white/60">{step.description}</p>
              </div>
              <Button
                size="sm"
                className={`h-10 px-4 touch-manipulation active:scale-95 transition-all ${
                  step.completed
                    ? 'bg-green-500 hover:bg-green-500/90 text-white'
                    : 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
                }`}
              >
                {step.completed ? 'Completed' : 'Start'}
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Legal Requirements */}
      <Card className="bg-gradient-to-br from-white/5 to-elec-card border-orange-500/20 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <CardHeader className="relative">
          <CardTitle className="text-white flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-orange-500/20 to-orange-500/5 border border-orange-500/30">
              <AlertTriangle className="h-5 w-5 text-orange-400" />
            </div>
            Legal Requirements
          </CardTitle>
        </CardHeader>
        <CardContent className="relative">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 rounded-xl bg-white/10 border border-white/10">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-orange-500/20">
                  <Scale className="h-4 w-4 text-orange-400" />
                </div>
                <h4 className="font-semibold text-white">Building Regulations</h4>
              </div>
              <ul className="space-y-2">
                {[
                  "Part P compliance required",
                  "Local Authority notification",
                  "Competent person scheme registration",
                  "Building Control approval"
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-white/70">
                    <span className="w-1.5 h-1.5 bg-orange-400 rounded-full mt-1.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-4 rounded-xl bg-white/10 border border-white/10">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-blue-500/20">
                  <Calendar className="h-4 w-4 text-blue-400" />
                </div>
                <h4 className="font-semibold text-white">Record Keeping</h4>
              </div>
              <ul className="space-y-2">
                {[
                  "Certificates must be retained",
                  "Copy provided to client",
                  "Digital copies recommended",
                  "Inspection intervals documented"
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-white/70">
                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-1.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DocumentationTab;
