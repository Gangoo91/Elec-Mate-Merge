import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Wrench } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export const EmergencyLightingModule5Section6Practical = () => {
  const practicalItems = [
    {
      title: "Schedule Formal Handover Meeting",
      content: "Arrange a dedicated handover meeting with the Responsible Person, facilities team, or site manager. Never attempt to hand over documentation informally or leave it at reception.",
      color: "green"
    },
    {
      title: "Conduct Site Walkthrough",
      content: "Walk the client through the main escape routes, pointing out luminaire and exit sign coverage. Show them where test switches are located and explain the system layout.",
      color: "orange"
    },
    {
      title: "Provide Digital and Physical Copies",
      content: "Provide digital copies (PDF or USB drive) of all certificates, drawings, and manuals in addition to printed, bound documentation. This ensures backup copies exist if physical documents are lost.",
      color: "blue"
    },
    {
      title: "Explain Legal Consequences",
      content: "Clearly explain the consequences of failing to perform regular tests: potential fines under Fire Safety Order 2005, invalid insurance claims, prosecution following fire incidents, and closure orders from fire authorities.",
      color: "purple"
    },
    {
      title: "30-Day Follow-Up Check",
      content: "Follow up within 30 days to ensure the client has carried out their first monthly test correctly and has no questions about logbook entries or system operation. This demonstrates professionalism and catches any issues early.",
      color: "red"
    }
  ];

  const colorClasses: Record<string, { badge: string; bg: string }> = {
    green: { badge: "bg-green-500 text-foreground", bg: "bg-green-500/10 border-green-500/30" },
    orange: { badge: "bg-orange-500 text-foreground", bg: "bg-orange-500/10 border-orange-500/30" },
    blue: { badge: "bg-blue-500 text-foreground", bg: "bg-blue-500/10 border-blue-500/30" },
    purple: { badge: "bg-purple-500 text-foreground", bg: "bg-purple-500/10 border-purple-500/30" },
    red: { badge: "bg-red-500 text-foreground", bg: "bg-red-500/10 border-red-500/30" }
  };

  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Wrench className="h-6 w-6 text-elec-yellow" />
          Practical Guidance
        </CardTitle>
      </CardHeader>
      <CardContent className="text-foreground space-y-6">
        {practicalItems.map((item, index) => (
          <div key={index} className="space-y-3">
            <div className="flex items-start gap-3">
              <Badge className={`w-6 h-6 rounded-full flex items-center justify-center ${colorClasses[item.color].badge} flex-shrink-0 text-sm font-bold`}>
                {index + 1}
              </Badge>
              <h3 className="text-lg sm:text-xl font-semibold text-foreground pt-0.5">{item.title}</h3>
            </div>
            <div className={`ml-0 sm:ml-9 bg-gray-800 p-4 rounded-lg border ${colorClasses[item.color].bg}`}>
              <p className="text-sm sm:text-base lg:text-lg text-foreground">{item.content}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
