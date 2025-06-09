
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Phone, Mail, ExternalLink, HeadphonesIcon, Users, BookOpen, AlertTriangle } from "lucide-react";

const SupportResourcesTab = () => {
  const emergencyContacts = [
    { name: "CITB Helpline", phone: "0300 303 4444", hours: "Mon-Fri 8am-5pm", type: "Training Support" },
    { name: "ACAS (Employment Relations)", phone: "0300 123 1100", hours: "Mon-Fri 8am-8pm, Sat 9am-1pm", type: "Employment Law" },
    { name: "HSE Infoline", phone: "0300 003 1747", hours: "Mon-Fri 8:30am-5pm", type: "Health & Safety" },
    { name: "Apprenticeship Support", phone: "0800 015 0400", hours: "Mon-Fri 8am-10pm, Sat 9am-5pm", type: "Government Support" }
  ];

  const onlineResources = [
    {
      category: "Government Resources",
      resources: [
        { name: "GOV.UK Apprenticeships", url: "apprenticeships.gov.uk", description: "Official apprenticeship portal" },
        { name: "CITB Training Directory", url: "citb.co.uk", description: "Construction training resources" },
        { name: "HSE Guidance", url: "hse.gov.uk", description: "Health and safety information" },
        { name: "HMRC Apprenticeship Levy", url: "hmrc.gov.uk", description: "Tax and levy information" }
      ]
    },
    {
      category: "Industry Bodies",
      resources: [
        { name: "ECA (Electrical Contractors)", url: "eca.co.uk", description: "Trade association support" },
        { name: "NICEIC", url: "niceic.com", description: "Electrical safety and standards" },
        { name: "SELECT (Scotland)", url: "select.org.uk", description: "Scottish electrical trade body" },
        { name: "NAPIT", url: "napit.org.uk", description: "Inspection and testing" }
      ]
    },
    {
      category: "Training Providers",
      resources: [
        { name: "Local College Finder", url: "gov.uk/find-college", description: "Find training providers" },
        { name: "Apprenticeship Provider Directory", url: "roatp.apprenticeships.education.gov.uk", description: "Registered providers" },
        { name: "Training Standards", url: "instituteforapprenticeships.org", description: "Apprenticeship standards" }
      ]
    }
  ];

  const commonIssues = [
    {
      issue: "Apprentice motivation problems",
      solutions: [
        "Regular feedback and goal setting",
        "Varied work experiences",
        "Clear progression pathways",
        "Recognition and rewards system"
      ]
    },
    {
      issue: "Training provider difficulties",
      solutions: [
        "Open communication channels",
        "Regular progress reviews",
        "Escalation procedures",
        "Alternative provider options"
      ]
    },
    {
      issue: "20% off-the-job training challenges",
      solutions: [
        "Flexible scheduling arrangements",
        "Blended learning approaches",
        "Weekend/evening options",
        "Block release periods"
      ]
    },
    {
      issue: "Assessment and EPA concerns",
      solutions: [
        "Early preparation planning",
        "Mock assessments",
        "Skills gap analysis",
        "Additional support resources"
      ]
    }
  ];

  const wellbeingSupport = [
    { service: "Mental Health First Aid", description: "Training for supporting apprentice wellbeing", provider: "Various providers" },
    { service: "Samaritans", description: "24/7 emotional support", contact: "116 123 (free)" },
    { service: "Mind", description: "Mental health information and support", contact: "0300 123 3393" },
    { service: "Young Minds", description: "Support for young people's mental health", contact: "Text YM to 85258" },
    { service: "Childline", description: "Support for under-19s", contact: "0800 1111" }
  ];

  return (
    <div className="space-y-6">
      <Card className="border-red-500/30 bg-red-500/10">
        <CardHeader>
          <CardTitle className="text-red-400 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Emergency Support Contacts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {emergencyContacts.map((contact, index) => (
              <div key={index} className="p-4 border border-red-500/20 rounded-lg bg-red-500/5">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold text-white">{contact.name}</h4>
                  <Badge className="bg-red-500/20 text-red-400">{contact.type}</Badge>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-red-200">
                    <Phone className="h-4 w-4" />
                    <span className="font-mono">{contact.phone}</span>
                  </div>
                  <p className="text-sm text-red-300">{contact.hours}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {onlineResources.map((category, index) => (
          <Card key={index} className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader>
              <CardTitle className="text-elec-yellow flex items-center gap-2">
                <ExternalLink className="h-5 w-5" />
                {category.category}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {category.resources.map((resource, resourceIndex) => (
                  <div key={resourceIndex} className="p-3 border border-elec-yellow/20 rounded-lg hover:bg-elec-yellow/5 transition-colors">
                    <h4 className="font-medium text-white mb-1">{resource.name}</h4>
                    <p className="text-sm text-muted-foreground mb-2">{resource.description}</p>
                    <p className="text-xs font-mono text-elec-yellow">{resource.url}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-amber-500/20 bg-amber-500/10">
        <CardHeader>
          <CardTitle className="text-amber-400 flex items-center gap-2">
            <HeadphonesIcon className="h-5 w-5" />
            Common Issues & Solutions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {commonIssues.map((item, index) => (
              <div key={index} className="border border-amber-500/20 rounded-lg p-4">
                <h4 className="font-semibold text-amber-300 mb-3">{item.issue}</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {item.solutions.map((solution, solutionIndex) => (
                    <div key={solutionIndex} className="flex items-center gap-2 text-sm text-amber-200">
                      <div className="w-1 h-1 bg-amber-400 rounded-full" />
                      {solution}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-green-500/20 bg-green-500/10">
        <CardHeader>
          <CardTitle className="text-green-400 flex items-center gap-2">
            <Users className="h-5 w-5" />
            Wellbeing & Mental Health Support
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {wellbeingSupport.map((service, index) => (
              <div key={index} className="flex items-start gap-3 p-3 border border-green-500/20 rounded-lg">
                <BookOpen className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <h4 className="font-medium text-green-300">{service.service}</h4>
                  <p className="text-sm text-green-200 mb-1">{service.description}</p>
                  <p className="text-xs text-green-400">{service.contact || service.provider}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 p-3 bg-green-500/20 border border-green-500/40 rounded-lg">
            <p className="text-sm text-green-300">
              <strong>Remember:</strong> Supporting your apprentice's wellbeing is just as important as their technical development. 
              Create an environment where they feel comfortable discussing any challenges they're facing.
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Button variant="outline" className="border-elec-yellow/30 hover:bg-elec-yellow/10">
          <Mail className="h-4 w-4 mr-2" />
          Email Support Template
        </Button>
        <Button variant="outline" className="border-blue-500/30 hover:bg-blue-500/10">
          <Phone className="h-4 w-4 mr-2" />
          Emergency Contact Card
        </Button>
        <Button variant="outline" className="border-green-500/30 hover:bg-green-500/10">
          <ExternalLink className="h-4 w-4 mr-2" />
          Resource Library
        </Button>
      </div>
    </div>
  );
};

export default SupportResourcesTab;
