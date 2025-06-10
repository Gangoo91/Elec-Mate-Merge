
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, AlertTriangle, Clock, FileText, Award, Shield, Calendar, Download } from "lucide-react";

const ComplianceTrackingTab = () => {
  const complianceItems = [
    {
      category: "Off-the-Job Training",
      requirement: "20% minimum",
      current: "22.3%",
      status: "compliant",
      hoursRequired: 312,
      hoursCompleted: 347,
      deadline: "Ongoing",
      aiStatus: "Exceeding requirements"
    },
    {
      category: "Portfolio Evidence",
      requirement: "All KSBs covered",
      current: "85% complete",
      status: "on-track",
      hoursRequired: 0,
      hoursCompleted: 0,
      deadline: "3 months",
      aiStatus: "Good progress, focus on commercial evidence"
    },
    {
      category: "EPA Readiness",
      requirement: "Gateway criteria",
      current: "73% ready",
      status: "attention-needed",
      hoursRequired: 0,
      hoursCompleted: 0,
      deadline: "6 months",
      aiStatus: "Needs focused preparation"
    },
    {
      category: "CPD Documentation",
      requirement: "Monthly updates",
      current: "Up to date",
      status: "compliant",
      hoursRequired: 0,
      hoursCompleted: 0,
      deadline: "Monthly",
      aiStatus: "Excellent record keeping"
    }
  ];

  const auditTrail = [
    {
      date: "2024-01-15",
      action: "Portfolio review completed",
      type: "review",
      outcome: "All sections approved",
      assessor: "J. Smith"
    },
    {
      date: "2024-01-10", 
      action: "OJT hours validated",
      type: "validation",
      outcome: "347 hours confirmed",
      assessor: "System"
    },
    {
      date: "2024-01-05",
      action: "EPA gateway criteria check",
      type: "assessment",
      outcome: "73% readiness achieved",
      assessor: "AI System"
    },
    {
      date: "2024-01-01",
      action: "Monthly compliance check",
      type: "automated",
      outcome: "All targets on track",
      assessor: "System"
    }
  ];

  const documents = [
    {
      name: "Learning Agreement",
      type: "contract",
      status: "signed",
      lastUpdated: "2023-09-01",
      required: true
    },
    {
      name: "Skills Scan Results", 
      type: "assessment",
      status: "current",
      lastUpdated: "2024-01-15",
      required: true
    },
    {
      name: "EPA Gateway Evidence",
      type: "portfolio",
      status: "in-progress",
      lastUpdated: "2024-01-10",
      required: true
    },
    {
      name: "Professional Discussion Plan",
      type: "preparation",
      status: "pending",
      lastUpdated: "N/A",
      required: true
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "compliant":
        return <Badge className="bg-green-600 text-white">Compliant</Badge>;
      case "on-track":
        return <Badge className="bg-blue-600 text-white">On Track</Badge>;
      case "attention-needed":
        return <Badge className="bg-orange-600 text-white">Needs Attention</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "compliant":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "on-track":
        return <Clock className="h-4 w-4 text-blue-500" />;
      case "attention-needed":
        return <AlertTriangle className="h-4 w-4 text-orange-500" />;
      default:
        return <FileText className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getDocumentStatusBadge = (status: string) => {
    switch (status) {
      case "signed":
      case "current":
        return <Badge className="bg-green-600 text-white">Complete</Badge>;
      case "in-progress":
        return <Badge className="bg-blue-600 text-white">In Progress</Badge>;
      case "pending":
        return <Badge className="bg-orange-600 text-white">Pending</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Compliance Score</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">92%</div>
            <p className="text-xs text-muted-foreground">
              Overall compliance
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">OJT Progress</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-500">22.3%</div>
            <p className="text-xs text-muted-foreground">
              Above 20% requirement
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">EPA Readiness</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-500">73%</div>
            <p className="text-xs text-muted-foreground">
              Gateway preparation
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Next Review</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-500">14d</div>
            <p className="text-xs text-muted-foreground">
              Days remaining
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Compliance Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {complianceItems.map((item, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(item.status)}
                      <span className="font-medium">{item.category}</span>
                    </div>
                    {getStatusBadge(item.status)}
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Requirement: {item.requirement}</span>
                      <span>Current: {item.current}</span>
                    </div>
                    
                    {item.hoursRequired > 0 && (
                      <>
                        <Progress 
                          value={(item.hoursCompleted / item.hoursRequired) * 100} 
                          className="h-2" 
                        />
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>{item.hoursCompleted}h completed</span>
                          <span>{item.hoursRequired}h required</span>
                        </div>
                      </>
                    )}
                    
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Deadline: {item.deadline}</span>
                      <span className="italic text-purple-500">AI: {item.aiStatus}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Document Compliance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {documents.map((doc, index) => (
                <div key={index} className="flex items-center justify-between border rounded-lg p-3">
                  <div className="flex items-center gap-3">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="font-medium text-sm">{doc.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {doc.type} • Updated: {doc.lastUpdated}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {getDocumentStatusBadge(doc.status)}
                    <Button size="sm" variant="outline">
                      <Download className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Audit Trail
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {auditTrail.map((entry, index) => (
              <div key={index} className="flex items-center justify-between border-l-2 border-blue-500 pl-4 py-2">
                <div>
                  <p className="font-medium text-sm">{entry.action}</p>
                  <p className="text-xs text-muted-foreground">
                    {entry.date} • {entry.assessor}
                  </p>
                </div>
                <div className="text-right">
                  <Badge variant="outline">{entry.type}</Badge>
                  <p className="text-xs text-muted-foreground mt-1">{entry.outcome}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Button variant="outline" className="h-12">
          <Download className="mr-2 h-4 w-4" />
          Export Compliance Report
        </Button>
        <Button variant="outline" className="h-12">
          <Calendar className="mr-2 h-4 w-4" />
          Schedule Compliance Review
        </Button>
        <Button variant="outline" className="h-12">
          <FileText className="mr-2 h-4 w-4" />
          View Full Audit Log
        </Button>
      </div>

      <Card className="border-green-500/50 bg-green-500/10">
        <CardHeader>
          <CardTitle className="text-green-300 flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Automated Compliance Monitoring
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Your intelligent compliance system continuously monitors all apprenticeship requirements, 
            tracks deadlines, validates evidence, and maintains detailed audit trails. Stay confident 
            knowing you're always meeting standards and ready for assessments.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ComplianceTrackingTab;
