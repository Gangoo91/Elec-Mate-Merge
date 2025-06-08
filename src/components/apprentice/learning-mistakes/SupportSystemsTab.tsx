
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, Phone, MessageCircle, ExternalLink, Heart } from "lucide-react";

const SupportSystemsTab = () => {
  const supportContacts = [
    {
      title: "Your Training Provider",
      description: "Assessors and tutors who understand your learning journey",
      contact: "Available during office hours",
      action: "Contact through college portal or phone",
      icon: Users,
      color: "border-blue-500/20 bg-blue-500/10"
    },
    {
      title: "Workplace Mentor",
      description: "Experienced electrician assigned to guide your development",
      contact: "Daily workplace support",
      action: "Speak to them about any challenges",
      icon: Users,
      color: "border-green-500/20 bg-green-500/10"
    },
    {
      title: "NICEIC/NAPIT Helplines",
      description: "Technical guidance on electrical regulations and standards",
      contact: "0333 015 6626 (NICEIC) / 0345 543 0330 (NAPIT)",
      action: "Call for technical regulation queries",
      icon: Phone,
      color: "border-purple-500/20 bg-purple-500/10"
    },
    {
      title: "Apprentice Support Networks",
      description: "Connect with other apprentices facing similar challenges",
      contact: "Online forums and local groups",
      action: "Join ElectriciansForums.net apprentice section",
      icon: MessageCircle,
      color: "border-yellow-500/20 bg-yellow-500/10"
    }
  ];

  const mentalHealthResources = [
    {
      service: "Samaritans",
      description: "24/7 emotional support for anyone in distress",
      contact: "116 123 (free from any phone)",
      website: "samaritans.org"
    },
    {
      service: "Construction Industry Helpline",
      description: "Specialist support for construction workers",
      contact: "0345 605 1956",
      website: "constructionindustryhelpline.com"
    },
    {
      service: "Mind",
      description: "Mental health information and local support services",
      contact: "0300 123 3393",
      website: "mind.org.uk"
    },
    {
      service: "Apprentice Support",
      description: "Government support for apprentice wellbeing",
      contact: "0800 015 0400",
      website: "gov.uk/apprenticeships-guide"
    }
  ];

  const practicalSupport = [
    {
      area: "Technical Questions",
      resources: [
        "IET Wiring Regulations forum",
        "Electrical Safety First guidance",
        "Manufacturer technical support lines",
        "YouTube channels like John Ward"
      ]
    },
    {
      area: "Career Guidance",
      resources: [
        "JIB careers advice",
        "CITB apprentice support",
        "Local college career services",
        "LinkedIn electrical industry groups"
      ]
    },
    {
      area: "Financial Support",
      resources: [
        "Government apprentice minimum wage info",
        "Student loan eligibility",
        "Local council support schemes",
        "Union advice services"
      ]
    },
    {
      area: "Rights & Workplace Issues",
      resources: [
        "ACAS employment advice",
        "Unite the Union apprentice support",
        "Citizens Advice employment guidance",
        "Apprentice complaints procedure"
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <Card className="border-elec-yellow/20 bg-gradient-to-r from-elec-gray to-elec-dark/50">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Users className="h-6 w-6 text-elec-yellow" />
            <CardTitle className="text-elec-yellow">Your Support Network</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {supportContacts.map((contact, index) => {
              const IconComponent = contact.icon;
              return (
                <div key={index} className={`border rounded-lg p-6 ${contact.color}`}>
                  <div className="flex items-center gap-3 mb-4">
                    <IconComponent className="h-6 w-6 text-white" />
                    <h3 className="text-lg font-semibold text-white">{contact.title}</h3>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-3">{contact.description}</p>
                  
                  <div className="space-y-2">
                    <div>
                      <span className="font-medium text-white">Contact: </span>
                      <span className="text-sm text-muted-foreground">{contact.contact}</span>
                    </div>
                    <Badge variant="outline" className="text-xs border-white/20">
                      {contact.action}
                    </Badge>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <Card className="border-red-500/20 bg-red-500/10">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Heart className="h-6 w-6 text-red-400" />
            <CardTitle className="text-red-300">Mental Health & Wellbeing Support</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mentalHealthResources.map((resource, index) => (
              <div key={index} className="border border-red-500/20 rounded-lg p-4">
                <h4 className="font-semibold text-white mb-2">{resource.service}</h4>
                <p className="text-sm text-muted-foreground mb-3">{resource.description}</p>
                
                <div className="space-y-2">
                  <div className="text-sm">
                    <span className="font-medium text-red-300">Phone: </span>
                    <span className="text-muted-foreground">{resource.contact}</span>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-red-500/30 hover:bg-red-500/10 text-red-300 text-xs"
                    onClick={() => window.open(`https://${resource.website}`, '_blank')}
                  >
                    <ExternalLink className="h-3 w-3 mr-1" />
                    {resource.website}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="text-elec-yellow">Practical Support Resources</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {practicalSupport.map((support, index) => (
              <div key={index} className="border border-elec-yellow/20 rounded-lg p-4">
                <h4 className="font-semibold text-white mb-3">{support.area}</h4>
                <ul className="space-y-2">
                  {support.resources.map((resource, resourceIndex) => (
                    <li key={resourceIndex} className="text-sm text-muted-foreground flex items-start gap-2">
                      <div className="w-1 h-1 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                      {resource}
                    </li>
                  ))}
                </ul>
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
          <div className="space-y-3 text-sm text-muted-foreground">
            <p>
              • <strong>Asking for help is a sign of professionalism</strong> - it shows you care about doing quality work
            </p>
            <p>
              • <strong>Your training provider wants you to succeed</strong> - they're invested in your development
            </p>
            <p>
              • <strong>Experienced electricians remember being apprentices</strong> - most are happy to share knowledge
            </p>
            <p>
              • <strong>Early intervention prevents bigger problems</strong> - speak up about concerns quickly
            </p>
            <p>
              • <strong>You're not alone in this journey</strong> - thousands of apprentices face similar challenges
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SupportSystemsTab;
