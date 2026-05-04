import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

const DocumentTemplates = () => {
  const templates = [
    {
      title: 'Formal complaint letter template',
      description: 'Template for raising formal concerns with your employer',
      category: 'Complaint',
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
[Your Contact Details]`,
    },
    {
      title: 'Training record request',
      description: 'Request access to your training records and progress documentation',
      category: 'Request',
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
[Contact Details]`,
    },
    {
      title: 'Holiday request form',
      description: 'Template for requesting annual leave',
      category: 'Request',
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

Manager Signature: _________________ Date: _________`,
    },
    {
      title: 'Workplace incident report',
      description: 'Template for reporting safety incidents or near misses',
      category: 'Safety',
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

Signature: _________________ Date: _________`,
    },
  ];

  const downloadTemplate = (template: any) => {
    const element = document.createElement('a');
    const file = new Blob([template.content], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${template.title.replace(/\s+/g, '_')}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-4">
      <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
        Document templates
      </span>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {templates.map((template, index) => (
          <div
            key={index}
            className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 space-y-3"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h4 className="text-[14px] font-semibold text-white">{template.title}</h4>
                <span className="text-[12px] text-white/85 px-2 py-0.5 rounded-md border border-white/10 bg-white/[0.03]">
                  {template.category}
                </span>
              </div>
              <p className="text-[14px] text-white/85 leading-relaxed">{template.description}</p>
            </div>

            <Button
              variant="outline"
              className="w-full h-11 touch-manipulation border-white/15 text-white hover:bg-white/[0.05]"
              onClick={() => downloadTemplate(template)}
            >
              <Download className="h-3 w-3 mr-2" />
              Download template
            </Button>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-elec-yellow/20 bg-elec-yellow/[0.04] p-4 sm:p-5 space-y-2">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-elec-yellow/85">
          How to use these templates
        </span>
        <ul className="space-y-1.5">
          {[
            'Fill in all sections marked with [brackets]',
            'Keep copies of all correspondence for your records',
            'Send formal letters by email with read receipt when possible',
            "Follow up if you don't receive a response within reasonable time",
          ].map((item, i) => (
            <li
              key={i}
              className="text-[14px] text-white/85 leading-relaxed flex items-start gap-2"
            >
              <span className="w-1 h-1 rounded-full bg-elec-yellow mt-2 flex-shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DocumentTemplates;
