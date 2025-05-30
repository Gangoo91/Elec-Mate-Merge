import BackButton from "@/components/common/BackButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PoundSterling, Shield, Phone, FileText } from "lucide-react";

const RightsAndPay = () => {
  const wageTiers = [
    { level: "Apprentice Minimum Wage", rate: "£6.40", description: "First year or under 19" },
    { level: "Year 2+ Apprentice", rate: "£10.42+", description: "National minimum wage rates apply" },
    { level: "Level 3 Qualified", rate: "£12-15", description: "Typical hourly rate for qualified electricians" },
    { level: "Experienced Electrician", rate: "£15-25", description: "With several years experience" }
  ];

  const apprenticeRights = [
    "20 days annual leave plus bank holidays",
    "Written statement of employment terms",
    "Safe working environment and proper training", 
    "Protection from discrimination and harassment",
    "Access to grievance and disciplinary procedures",
    "Time off for study (usually 1 day per week)"
  ];

  const supportChannels = [
    {
      channel: "ACAS (Advisory, Conciliation and Arbitration Service)",
      contact: "0300 123 1100",
      description: "Free advice on workplace rights and employment law"
    },
    {
      channel: "Apprenticeship Support Helpline",
      contact: "0800 015 0400", 
      description: "Help with apprenticeship-specific issues"
    },
    {
      channel: "Citizens Advice",
      contact: "Local offices nationwide",
      description: "General advice on employment rights and benefits"
    },
    {
      channel: "Unite the Union",
      contact: "0800 842 0069",
      description: "Trade union support for electrical workers"
    }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in">
      <div className="flex flex-col items-center justify-center mb-6">
        <h1 className="text-3xl font-bold tracking-tight mb-4">Apprenticeship Rights & Pay</h1>
        <p className="text-muted-foreground text-center max-w-2xl mb-4">
          Know your rights, understand wage expectations, and learn where to get help when needed
        </p>
        <BackButton customUrl="/apprentice/toolbox" label="Back to Guidance Area" />
      </div>

      <Card className="border-elec-yellow/20 bg-gradient-to-r from-elec-gray to-elec-dark/50">
        <CardHeader>
          <div className="flex items-center gap-2">
            <PoundSterling className="h-6 w-6 text-elec-yellow" />
            <CardTitle className="text-elec-yellow">UK Wage Expectations (2024)</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {wageTiers.map((tier, index) => (
              <div key={index} className="border border-elec-yellow/20 rounded-lg p-4 text-center">
                <h4 className="font-semibold text-white mb-2">{tier.level}</h4>
                <div className="text-2xl font-bold text-elec-yellow mb-2">{tier.rate}</div>
                <p className="text-sm text-muted-foreground">{tier.description}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 p-4 bg-elec-yellow/10 rounded-lg">
            <p className="text-sm text-muted-foreground">
              <strong>Note:</strong> Rates vary by region, company size, and sector. London typically pays 10-20% more.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-elec-yellow" />
            <CardTitle className="text-elec-yellow">Your Rights as an Apprentice</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-white mb-3">Legal Entitlements</h4>
              <ul className="space-y-2">
                {apprenticeRights.map((right, index) => (
                  <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                    <Shield className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    {right}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-elec-yellow/10 p-4 rounded-lg">
              <h4 className="font-semibold text-elec-yellow mb-2">Know Your Worth</h4>
              <p className="text-sm text-muted-foreground mb-3">
                You're not just cheap labour - you're a valuable team member in training. 
                Don't accept being treated poorly because you're "just an apprentice."
              </p>
              <p className="text-sm text-muted-foreground">
                If something feels wrong, speak up. There are people who can help.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Phone className="h-6 w-6 text-elec-yellow" />
            <CardTitle className="text-elec-yellow">Support When Things Go Wrong</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {supportChannels.map((support, index) => (
              <div key={index} className="border border-elec-yellow/20 rounded-lg p-4">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                  <div>
                    <h4 className="font-semibold text-white">{support.channel}</h4>
                    <p className="text-sm text-muted-foreground">{support.description}</p>
                  </div>
                  <Badge variant="outline" className="border-elec-yellow/40 text-elec-yellow w-fit">
                    {support.contact}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-green-500/50 bg-green-500/10">
        <CardHeader>
          <CardTitle className="text-green-300">Remember</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Your apprenticeship should be a positive learning experience. While challenges are normal, 
            exploitation, unsafe conditions, or unfair treatment are not. Don't suffer in silence - 
            help is available and using it shows strength, not weakness.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default RightsAndPay;
