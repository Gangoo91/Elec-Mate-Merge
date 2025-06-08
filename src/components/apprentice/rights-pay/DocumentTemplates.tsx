
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Download, Mail, AlertTriangle, Clock } from "lucide-react";

const DocumentTemplates = () => {
  const templates = [
    {
      title: "Formal Complaint Letter Template",
      description: "Template for raising formal concerns with your employer",
      category: "Complaint",
      icon: AlertTriangle,
      content: `[Date]

[Employer Name]
[Employer Address]

Dear [Supervisor/HR Manager],

I am writing to formally raise a concern regarding my apprenticeship training with [Company Name].

Issue Description:
[Describe the specific issue, including dates, times, and people involved]

Impact on Training:
[Explain how this affects your learning and development]

Resolution Sought:
[State what you would like to happen to resolve the issue]

I would appreciate the opportunity to discuss this matter further and work towards a resolution. I am available for a meeting at your convenience.

I look forward to your prompt response.

Yours sincerely,
[Your Name]
[Your Contact Details]`
    },
    {
      title: "Training Record Request",
      description: "Request access to your training records and progress documentation",
      category: "Request",
      icon: FileText,
      content: `[Date]

[Training Provider Name]
[Training Provider Address]

Dear [Contact Name],

I am writing to request access to my training records and progress documentation for my [Apprenticeship Title] with [Employer Name].

Records Requested:
- Progress reviews and assessments
- Training plans and schedules
- Feedback from supervisors/assessors
- Portfolio development records
- Any correspondence regarding my training

Under data protection regulations, I understand I am entitled to access this information. Please let me know if there are any fees associated with this request.

I would prefer to receive these records [by email/by post/for collection].

Thank you for your assistance.

Yours sincerely,
[Your Name]
[Apprentice ID/Reference Number]
[Contact Details]`
    },
    {
      title: "Holiday Request Form",
      description: "Template for requesting annual leave",
      category: "Request",
      icon: Clock,
      content: `Holiday Request Form

Employee Name: [Your Name]
Department: [Your Department]
Employee ID: [Your ID Number]

Requested Holiday Dates:
From: [Start Date]
To: [End Date]
Total Days Requested: [Number of Days]

Reason for Request: [Brief reason - optional]

Current Holiday Entitlement:
- Annual allowance: [Total days]
- Used to date: [Days used]
- Remaining: [Days remaining]

Alternative arrangements for work coverage:
[Brief description of how work will be covered]

Employee Signature: _________________ Date: _________

For Manager Use:
☐ Approved  ☐ Declined

Manager Comments:
[Comments]

Manager Signature: _________________ Date: _________`
    },
    {
      title: "Workplace Incident Report",
      description: "Template for reporting safety incidents or near misses",
      category: "Safety",
      icon: AlertTriangle,
      content: `Incident Report Form

Date of Incident: [Date]
Time of Incident: [Time]
Location: [Specific location where incident occurred]

Reported by:
Name: [Your Name]
Position: [Your Role]
Contact: [Your Contact Details]

Type of Incident:
☐ Accident  ☐ Near Miss  ☐ Safety Concern  ☐ Other: _______

Description of Incident:
[Detailed description of what happened, including sequence of events]

Injuries Sustained:
☐ None  ☐ First Aid  ☐ Medical Treatment Required
Details: [Description of any injuries]

Witnesses:
Name: [Witness Name]  Contact: [Contact Details]

Immediate Actions Taken:
[What was done immediately after the incident]

Potential Causes:
[What you think may have caused the incident]

Suggestions for Prevention:
[How similar incidents could be prevented]

Signature: _________________ Date: _________`
    }
  ];

  const downloadTemplate = (template: any) => {
    const element = document.createElement("a");
    const file = new Blob([template.content], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${template.title.replace(/\s+/g, '_')}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Complaint": return "bg-red-500/20 text-red-400 border-red-500/40";
      case "Request": return "bg-blue-500/20 text-blue-400 border-blue-500/40";
      case "Safety": return "bg-orange-500/20 text-orange-400 border-orange-500/40";
      default: return "bg-gray-500/20 text-gray-400 border-gray-500/40";
    }
  };

  return (
    <Card className="border-green-500/30 bg-green-500/10">
      <CardHeader>
        <div className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-green-400" />
          <CardTitle className="text-green-400">Document Templates</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {templates.map((template, index) => {
            const IconComponent = template.icon;
            return (
              <div key={index} className="border border-green-500/20 rounded-lg p-4">
                <div className="flex items-start gap-3 mb-3">
                  <IconComponent className="h-5 w-5 text-green-400 mt-1 flex-shrink-0" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-white">{template.title}</h4>
                      <Badge className={`text-xs ${getCategoryColor(template.category)}`}>
                        {template.category}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{template.description}</p>
                  </div>
                </div>
                
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="w-full border-green-500/40 text-green-400 hover:bg-green-500/20"
                  onClick={() => downloadTemplate(template)}
                >
                  <Download className="h-3 w-3 mr-2" />
                  Download Template
                </Button>
              </div>
            );
          })}
        </div>
        
        <div className="mt-6 p-4 bg-blue-500/20 rounded-lg border border-blue-500/30">
          <h4 className="font-semibold text-blue-400 mb-2">How to Use These Templates</h4>
          <ul className="text-sm text-blue-300 space-y-1">
            <li>• Fill in all sections marked with [brackets]</li>
            <li>• Keep copies of all correspondence for your records</li>
            <li>• Send formal letters by email with read receipt when possible</li>
            <li>• Follow up if you don't receive a response within reasonable time</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default DocumentTemplates;
