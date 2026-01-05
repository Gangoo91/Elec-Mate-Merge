import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { 
  Search,
  CheckCircle,
  Clock,
  AlertCircle,
  FileCheck,
  User,
  Calendar,
  Zap,
  ClipboardCheck,
  Award,
  ChevronRight
} from "lucide-react";
import { testingWorkflows, employees } from "@/data/employerMockData";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";

const stageIcons: Record<string, any> = {
  "Visual Inspection": ClipboardCheck,
  "Dead Testing": Zap,
  "Live Testing": Zap,
  "Documentation": FileCheck,
  "Supervisor Sign-off": User,
  "Client Sign-off": Award,
};

export function TestingWorkflowSection() {
  const isMobile = useIsMobile();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredWorkflows = testingWorkflows.filter(
    wf => wf.jobTitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStageProgress = (stages: typeof testingWorkflows[0]['stages']) => {
    const completed = stages.filter(s => s.status === "Complete").length;
    return (completed / stages.length) * 100;
  };

  const handleStageComplete = (workflowId: string, stageName: string) => {
    toast({
      title: "Stage Completed",
      description: `${stageName} has been marked as complete.`
    });
  };

  const completedWorkflows = testingWorkflows.filter(w => w.status === "Complete").length;
  const inProgressWorkflows = testingWorkflows.filter(w => w.status === "In Progress").length;
  const totalCircuits = testingWorkflows.reduce((sum, w) => sum + w.testResults.circuits, 0);
  const testedCircuits = testingWorkflows.reduce((sum, w) => sum + w.testResults.circuitsTested, 0);

  return (
    <div className="space-y-4 md:space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col gap-3">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-foreground">Testing & Sign-off</h1>
          <p className="text-sm text-muted-foreground">EIC/EICR certification workflow tracking</p>
        </div>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search workflows..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 w-full bg-elec-gray"
          />
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        <Card className="bg-elec-gray touch-feedback">
          <CardContent className="p-3 md:p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xl md:text-2xl font-bold text-foreground">{testingWorkflows.length}</p>
                <p className="text-xs md:text-sm text-muted-foreground">Total</p>
              </div>
              <FileCheck className="h-6 w-6 md:h-8 md:w-8 text-elec-yellow opacity-70" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-elec-gray touch-feedback">
          <CardContent className="p-3 md:p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xl md:text-2xl font-bold text-warning">{inProgressWorkflows}</p>
                <p className="text-xs md:text-sm text-muted-foreground">In Progress</p>
              </div>
              <Clock className="h-6 w-6 md:h-8 md:w-8 text-warning opacity-70" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-elec-gray touch-feedback">
          <CardContent className="p-3 md:p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xl md:text-2xl font-bold text-success">{completedWorkflows}</p>
                <p className="text-xs md:text-sm text-muted-foreground">Certified</p>
              </div>
              <Award className="h-6 w-6 md:h-8 md:w-8 text-success opacity-70" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-elec-gray touch-feedback">
          <CardContent className="p-3 md:p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xl md:text-2xl font-bold text-info">
                  {testedCircuits}/{totalCircuits}
                </p>
                <p className="text-xs md:text-sm text-muted-foreground">Circuits</p>
              </div>
              <Zap className="h-6 w-6 md:h-8 md:w-8 text-info opacity-70" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Workflow Cards */}
      <div className="space-y-3">
        {filteredWorkflows.map((workflow) => {
          const progress = getStageProgress(workflow.stages);
          const currentStage = workflow.stages.find(s => s.status === "In Progress");
          const nextStage = workflow.stages.find(s => s.status === "Pending");

          return (
            <Card key={workflow.id} className="bg-elec-gray overflow-hidden touch-feedback">
              <CardHeader className="p-3 md:pb-2">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <CardTitle className="text-sm md:text-lg truncate">{workflow.jobTitle}</CardTitle>
                      <Badge variant="outline" className="text-[10px]">{workflow.type}</Badge>
                      <Badge 
                        variant={
                          workflow.status === "Complete" ? "default" :
                          workflow.status === "In Progress" ? "secondary" : "outline"
                        }
                        className={cn(
                          "text-[10px]",
                          workflow.status === "Complete" && "bg-success"
                        )}
                      >
                        {workflow.status}
                      </Badge>
                    </div>
                    {workflow.certNumber && (
                      <p className="text-[10px] md:text-xs text-muted-foreground mt-1">
                        {workflow.certNumber} • {workflow.issuedDate}
                      </p>
                    )}
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-lg md:text-2xl font-bold text-elec-yellow">{Math.round(progress)}%</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-3 md:pt-0 space-y-3">
                {/* Progress Bar */}
                <Progress value={progress} className="h-2" />

                {/* Stages - Compact on mobile */}
                <div className={cn(
                  "grid gap-1.5",
                  isMobile ? "grid-cols-3" : "grid-cols-6"
                )}>
                  {workflow.stages.map((stage, i) => {
                    const StageIcon = stageIcons[stage.name] || CheckCircle;
                    const employee = stage.completedBy ? employees.find(e => e.id === stage.completedBy) : null;

                    return (
                      <div 
                        key={i}
                        className={cn(
                          "p-2 rounded-lg text-center transition-all",
                          stage.status === "Complete" && "bg-success/10 border border-success/30",
                          stage.status === "In Progress" && "bg-elec-yellow/10 border border-elec-yellow/30",
                          stage.status === "Pending" && "bg-muted"
                        )}
                      >
                        <StageIcon className={cn(
                          "h-4 w-4 mx-auto mb-0.5",
                          stage.status === "Complete" && "text-success",
                          stage.status === "In Progress" && "text-elec-yellow",
                          stage.status === "Pending" && "text-muted-foreground"
                        )} />
                        <p className={cn(
                          "text-[9px] md:text-xs font-medium leading-tight",
                          stage.status === "Complete" && "text-success",
                          stage.status === "In Progress" && "text-elec-yellow",
                          stage.status === "Pending" && "text-muted-foreground"
                        )}>
                          {stage.name.split(' ')[0]}
                        </p>
                      </div>
                    );
                  })}
                </div>

                {/* Test Results Summary */}
                <div className={cn(
                  "grid gap-2 p-2 bg-muted/50 rounded-lg text-xs",
                  isMobile ? "grid-cols-2" : "grid-cols-5"
                )}>
                  <div>
                    <p className="text-[10px] text-muted-foreground">Circuits</p>
                    <p className="font-semibold text-foreground">
                      {workflow.testResults.circuitsTested}/{workflow.testResults.circuits}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] text-muted-foreground">Faults</p>
                    <p className={cn(
                      "font-semibold",
                      workflow.testResults.faults > 0 ? "text-destructive" : "text-success"
                    )}>
                      {workflow.testResults.faults}
                    </p>
                  </div>
                  {!isMobile && (
                    <>
                      <div>
                        <p className="text-[10px] text-muted-foreground">Ze Values</p>
                        <p className={cn(
                          "font-semibold",
                          workflow.testResults.zeValues === "Good" ? "text-success" : "text-foreground"
                        )}>
                          {workflow.testResults.zeValues || "—"}
                        </p>
                      </div>
                      <div>
                        <p className="text-[10px] text-muted-foreground">RCD Tests</p>
                        <p className={cn(
                          "font-semibold",
                          workflow.testResults.rcdTests === "Passed" ? "text-success" : "text-foreground"
                        )}>
                          {workflow.testResults.rcdTests || "—"}
                        </p>
                      </div>
                    </>
                  )}
                  {currentStage && (
                    <div className={isMobile ? "col-span-2" : ""}>
                      <Button 
                        size="sm"
                        onClick={() => handleStageComplete(workflow.id, currentStage.name)}
                        className="w-full h-auto py-1.5 text-xs touch-feedback"
                      >
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Complete {currentStage.name.split(' ')[0]}
                      </Button>
                    </div>
                  )}
                </div>

                {/* Current Stage Action */}
                {currentStage && (
                  <div className="flex items-center gap-2 p-2 bg-elec-yellow/10 rounded-lg text-xs">
                    <Clock className="h-3 w-3 text-elec-yellow flex-shrink-0" />
                    <span className="text-foreground truncate">
                      <strong>Current:</strong> {currentStage.name}
                    </span>
                    {nextStage && !isMobile && (
                      <>
                        <ChevronRight className="h-3 w-3 text-muted-foreground flex-shrink-0" />
                        <span className="text-muted-foreground truncate">
                          Next: {nextStage.name}
                        </span>
                      </>
                    )}
                  </div>
                )}

                {workflow.status === "Complete" && (
                  <div className="flex items-center justify-between gap-2 p-2 bg-success/10 rounded-lg">
                    <div className="flex items-center gap-2 min-w-0">
                      <Award className="h-4 w-4 text-success flex-shrink-0" />
                      <span className="text-xs text-success truncate">
                        Certified - {workflow.certNumber}
                      </span>
                    </div>
                    <Button variant="outline" size="sm" className="text-xs touch-feedback flex-shrink-0">
                      View
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
