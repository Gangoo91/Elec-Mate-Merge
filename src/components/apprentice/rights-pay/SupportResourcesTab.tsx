
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Phone, Mail, Globe, MessageCircle, Shield, Users, FileText, AlertTriangle } from "lucide-react";

const SupportResourcesTab = () => {
  const emergencyContacts = [
    {
      service: "Health & Safety Executive (HSE)",
      phone: "0300 003 1747",
      email: "hse.enquiries@hse.gov.uk",
      website: "www.hse.gov.uk",
      description: "Report serious safety violations or dangerous working conditions",
      urgency: "Emergency"
    },
    {
      service: "ACAS (Advisory, Conciliation & Arbitration Service)",
      phone: "0300 123 1100",
      email: "helpline@acas.org.uk",
      website: "www.acas.org.uk",
      description: "Free advice on workplace disputes, employment rights, and mediation",
      urgency: "Immediate Help"
    },
    {
      service: "National Minimum Wage Helpline",
      phone: "0300 123 1100",
      email: "enquiries.nmw@hmrc.gov.uk",
      website: "www.gov.uk/minimum-wage-rates",
      description: "Report underpayment or wage violations",
      urgency: "Priority"
    }
  ];

  const supportOrganisations = [
    {
      name: "Education & Skills Funding Agency (ESFA)",
      contact: "0370 267 0001",
      email: "enquiries@education.gov.uk",
      website: "www.gov.uk/government/organisations/education-and-skills-funding-agency",
      services: [
        "Apprenticeship quality concerns",
        "Training provider complaints",
        "Funding and payment issues",
        "Off-the-job training disputes"
      ],
      description: "Government body overseeing apprenticeship quality and funding"
    },
    {
      name: "Citizens Advice",
      contact: "0808 223 1133",
      email: "Contact via website",
      website: "www.citizensadvice.org.uk",
      services: [
        "Employment rights advice",
        "Debt and financial guidance",
        "Housing and benefit support",
        "Discrimination complaints"
      ],
      description: "Free, confidential advice on a wide range of issues"
    },
    {
      name: "Institute of the Motor Industry (IMI)",
      contact: "01992 511 521",
      email: "customer.services@theimi.org.uk",
      website: "www.theimi.org.uk",
      services: [
        "Professional development guidance",
        "Qualification pathways",
        "Career progression advice",
        "Industry standards information"
      ],
      description: "Professional body for automotive and electrical trades"
    },
    {
      name: "JTL (Training Provider Support)",
      contact: "0844 844 5300",
      email: "enquiries@jtltraining.com",
      website: "www.jtltraining.com",
      services: [
        "Apprenticeship programme support",
        "Training quality issues",
        "Career guidance",
        "Employer relations"
      ],
      description: "Major electrical apprenticeship training provider"
    }
  ];

  const tradeUnions = [
    {
      name: "Unite the Union",
      contact: "020 7611 2500",
      website: "www.unitetheunion.org",
      sectors: ["Construction", "Electrical", "Manufacturing"],
      benefits: [
        "Legal representation",
        "Workplace advocacy",
        "Training and development",
        "Professional indemnity insurance"
      ]
    },
    {
      name: "GMB Union",
      contact: "020 7391 6700",
      website: "www.gmb.org.uk",
      sectors: ["Construction", "Energy", "Manufacturing"],
      benefits: [
        "Employment protection",
        "Collective bargaining",
        "Health and safety support",
        "Career development"
      ]
    },
    {
      name: "UCATT (Unite Construction)",
      contact: "020 7611 2500",
      website: "www.unitetheunion.org/construction",
      sectors: ["Construction", "Building trades"],
      benefits: [
        "Site safety representation",
        "Skills training support",
        "Wage negotiation",
        "Accident claims support"
      ]
    }
  ];

  const onlineResources = [
    {
      platform: "Apprenticeship Support & Knowledge for Schools",
      website: "www.apprenticeshipsfinder.co.uk",
      description: "Find support services and resolve apprenticeship issues"
    },
    {
      platform: "GOV.UK Apprenticeships",
      website: "www.gov.uk/topic/further-education-skills/apprenticeships",
      description: "Official government information on apprenticeship rights and processes"
    },
    {
      platform: "Ofsted Apprenticeship Reports",
      website: "www.gov.uk/government/organisations/ofsted",
      description: "Check your training provider's inspection reports and ratings"
    },
    {
      platform: "Apprenticeship Ombudsman",
      website: "www.apprenticeshipombudsman.org",
      description: "Independent complaints service for apprenticeship issues"
    }
  ];

  const whenToSeekHelp = [
    {
      situation: "Your employer denies you off-the-job training time",
      severity: "High Priority",
      firstSteps: "Document all instances, speak to training provider, contact ESFA if not resolved"
    },
    {
      situation: "Unsafe working conditions or inadequate safety training",
      severity: "Emergency",
      firstSteps: "Refuse unsafe work, report to HSE immediately, document everything"
    },
    {
      situation: "Being paid below minimum wage rates",
      severity: "High Priority",
      firstSteps: "Keep detailed pay records, contact HMRC National Minimum Wage team"
    },
    {
      situation: "Discrimination, bullying, or harassment",
      severity: "High Priority",
      firstSteps: "Report to HR/management, contact ACAS, consider union support"
    },
    {
      situation: "Employer wants to end apprenticeship unfairly",
      severity: "Urgent",
      firstSteps: "Contact training provider immediately, seek ACAS advice, review contract terms"
    }
  ];

  return (
    <div className="space-y-6">
      <Card className="border-red-500/30 bg-red-500/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-400">
            <AlertTriangle className="h-5 w-5" />
            Emergency & Priority Contacts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {emergencyContacts.map((contact, index) => (
              <div key={index} className="border border-red-500/20 rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-medium text-red-300">{contact.service}</h4>
                  <Badge className="bg-red-500/20 text-red-400 text-xs">{contact.urgency}</Badge>
                </div>
                <p className="text-sm text-red-200 mb-3">{contact.description}</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs">
                  <div className="flex items-center gap-1">
                    <Phone className="h-3 w-3" />
                    <span>{contact.phone}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Mail className="h-3 w-3" />
                    <span className="truncate">{contact.email}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Globe className="h-3 w-3" />
                    <span className="truncate">{contact.website}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-blue-500/30 bg-blue-500/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-400">
            <Shield className="h-5 w-5" />
            Support Organisations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {supportOrganisations.map((org, index) => (
              <div key={index} className="border border-blue-500/20 rounded-lg p-4">
                <h4 className="font-medium text-blue-300 mb-2">{org.name}</h4>
                <p className="text-xs text-blue-200 mb-3">{org.description}</p>
                
                <div className="space-y-1 mb-3">
                  <div className="flex items-center gap-1 text-xs">
                    <Phone className="h-3 w-3" />
                    <span>{org.contact}</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs">
                    <Globe className="h-3 w-3" />
                    <span className="truncate">{org.website}</span>
                  </div>
                </div>

                <div>
                  <h5 className="text-xs font-medium text-blue-300 mb-1">Services:</h5>
                  <ul className="text-xs text-blue-200 space-y-1">
                    {org.services.map((service, serviceIndex) => (
                      <li key={serviceIndex}>• {service}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-green-500/30 bg-green-500/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-400">
            <Users className="h-5 w-5" />
            Trade Union Support
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {tradeUnions.map((union, index) => (
              <div key={index} className="border border-green-500/20 rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-medium text-green-300">{union.name}</h4>
                  <div className="flex gap-1">
                    {union.sectors.map((sector, sectorIndex) => (
                      <Badge key={sectorIndex} className="bg-green-500/20 text-green-400 text-xs">
                        {sector}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <div className="flex items-center gap-1 text-xs mb-1">
                      <Phone className="h-3 w-3" />
                      <span>{union.contact}</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs">
                      <Globe className="h-3 w-3" />
                      <span className="truncate">{union.website}</span>
                    </div>
                  </div>
                  
                  <div>
                    <h5 className="text-xs font-medium text-green-300 mb-1">Member Benefits:</h5>
                    <ul className="text-xs text-green-200 space-y-1">
                      {union.benefits.map((benefit, benefitIndex) => (
                        <li key={benefitIndex}>• {benefit}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-purple-500/30 bg-purple-500/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-400">
            <Globe className="h-5 w-5" />
            Online Resources & Tools
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {onlineResources.map((resource, index) => (
              <div key={index} className="border border-purple-500/20 rounded-lg p-3">
                <h4 className="font-medium text-purple-300 text-sm mb-1">{resource.platform}</h4>
                <p className="text-xs text-purple-200 mb-2">{resource.description}</p>
                <div className="flex items-center gap-1 text-xs text-purple-300">
                  <Globe className="h-3 w-3" />
                  <span className="truncate">{resource.website}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-yellow-500/30 bg-yellow-500/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-yellow-400">
            <MessageCircle className="h-5 w-5" />
            When to Seek Help - Action Guide
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {whenToSeekHelp.map((scenario, index) => (
              <div key={index} className="border border-yellow-500/20 rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-medium text-yellow-300 flex-1">{scenario.situation}</h4>
                  <Badge className="bg-yellow-500/20 text-yellow-400 text-xs ml-2">{scenario.severity}</Badge>
                </div>
                <p className="text-sm text-yellow-200">
                  <strong>First Steps:</strong> {scenario.firstSteps}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SupportResourcesTab;
