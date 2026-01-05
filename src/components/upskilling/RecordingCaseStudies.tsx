
import { FileText, AlertTriangle, CheckCircle, XCircle, Info } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const RecordingCaseStudies = () => {
  const caseStudies = [
    {
      title: "Domestic EICR - Proper Documentation Saves Lives",
      situation: "Inspector finds missing RCD protection on bathroom lighting circuit during routine EICR. Correctly codes as C1 and advises immediate isolation.",
      documentation: "Clear C1 coding with reference to Regulation 411.3.3. Detailed description: 'Bathroom lighting circuit lacks RCD protection - immediate danger present'",
      outcome: "Client immediately arranges remedial work. Six months later, prevents serious injury when light fitting develops fault.",
      lesson: "Accurate, urgent coding and clear communication prevent accidents",
      status: "success"
    },
    {
      title: "Commercial Installation - Vague Documentation Causes Problems",
      situation: "Inspector notices 'some issues' with bonding but records only 'bonding appears questionable' without specific details or codes.",
      documentation: "Vague description without regulation references or specific locations. No clear action required.",
      outcome: "Later electrical fault causes equipment damage. Insurance claim disputed due to unclear documentation and lack of specific non-compliance records.",
      lesson: "Vague documentation provides no protection and creates liability",
      status: "failure"
    },
    {
      title: "Industrial Unit - Handling Access Limitations Professionally",
      situation: "During EICR, key distribution boards are inaccessible due to ongoing production. Inspector cannot complete full visual inspection.",
      documentation: "Clearly records limitation: 'DB-3 and DB-7 not accessible due to production constraints. Visual inspection incomplete. Recommend re-inspection when accessible.'",
      outcome: "Client accepts limitation, schedules follow-up inspection during shutdown. Professional approach maintains relationship and legal protection.",
      lesson: "Honest limitation recording protects all parties",
      status: "professional"
    },
    {
      title: "Residential Property - Missing Documentation Creates Confusion",
      situation: "Inspector completes visual inspection but fails to record several C2 observations on certificate. Only mentions verbally to client.",
      documentation: "Certificate shows 'satisfactory' for items that were actually non-compliant. Verbal advice not documented.",
      outcome: "Client sells property believing all is compliant. New owner discovers issues, leading to legal dispute over inspection quality.",
      lesson: "If it's not written down, it didn't happen legally",
      status: "failure"
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-400" />;
      case 'failure':
        return <XCircle className="h-4 w-4 text-red-400" />;
      case 'professional':
        return <Info className="h-4 w-4 text-blue-400" />;
      default:
        return <AlertTriangle className="h-4 w-4 text-yellow-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'border-green-600/20 bg-green-600/10';
      case 'failure':
        return 'border-red-600/20 bg-red-600/10';
      case 'professional':
        return 'border-blue-600/20 bg-blue-600/10';
      default:
        return 'border-yellow-600/20 bg-yellow-600/10';
    }
  };

  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <FileText className="h-5 w-5 text-elec-yellow" />
          Documentation Case Studies
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <p className="text-foreground leading-relaxed">
          These real-world examples demonstrate the critical importance of proper documentation in visual inspection work, 
          showing both the consequences of poor practice and the benefits of professional approach.
        </p>

        <div className="space-y-6">
          {caseStudies.map((study, index) => (
            <div key={index} className={`rounded-lg border p-6 ${getStatusColor(study.status)}`}>
              <div className="flex items-start gap-3 mb-4">
                {getStatusIcon(study.status)}
                <div className="flex-1">
                  <h3 className="text-foreground font-semibold text-lg mb-2">{study.title}</h3>
                  <p className="text-foreground text-sm leading-relaxed mb-3">{study.situation}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <h4 className="text-foreground font-medium mb-2">Documentation Approach</h4>
                  <p className="text-foreground text-sm leading-relaxed bg-[#323232] p-3 rounded">
                    {study.documentation}
                  </p>
                </div>
                
                <div>
                  <h4 className="text-foreground font-medium mb-2">Outcome</h4>
                  <p className="text-foreground text-sm leading-relaxed">{study.outcome}</p>
                </div>
              </div>

              <div className="border-t border-gray-600/30 pt-3">
                <h4 className="text-foreground font-medium mb-2">Key Lesson</h4>
                <p className="text-elec-yellow text-sm font-medium">{study.lesson}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-purple-600/10 border border-purple-600/20 rounded-lg p-4">
          <h3 className="text-purple-200 font-medium mb-3 flex items-center gap-2">
            <Info className="h-4 w-4" />
            Best Practice Principles
          </h3>
          <ul className="space-y-2 text-foreground text-sm">
            <li>• Document everything you observe - good, bad, and uncertain</li>
            <li>• Use specific regulation references where applicable</li>
            <li>• Apply observation codes consistently and accurately</li>
            <li>• Record limitations and explain their impact</li>
            <li>• Write as if a court will read your documentation</li>
            <li>• Never assume - only record what you can verify</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};
