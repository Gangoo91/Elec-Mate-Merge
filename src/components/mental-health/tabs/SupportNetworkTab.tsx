
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Users, MessageCircle, Heart, Building, Phone, MapPin, ExternalLink, Clock, Shield } from "lucide-react";

const SupportNetworkTab = () => {
  const emergencySupport = [
    {
      name: "Samaritans",
      phone: "116 123",
      description: "Free 24/7 confidential emotional support",
      availability: "24/7, 365 days a year",
      website: "www.samaritans.org"
    },
    {
      name: "Crisis Text Line",
      phone: "Text SHOUT to 85258",
      description: "Free 24/7 crisis support via text",
      availability: "24/7",
      website: "giveusashout.org"
    },
    {
      name: "NHS 111 Option 2",
      phone: "111 (Option 2)",
      description: "NHS mental health helpline",
      availability: "24/7",
      website: "www.nhs.uk"
    }
  ];

  const workplaceSupport = [
    {
      name: "Access to Work Scheme",
      description: "Government funding for mental health support at work",
      contact: "0800 121 7479",
      website: "www.gov.uk/access-to-work"
    },
    {
      name: "ACAS (Advisory, Conciliation and Arbitration Service)",
      description: "Free advice on workplace rights and mental health",
      contact: "0300 123 1100",
      website: "www.acas.org.uk"
    },
    {
      name: "Unite the Union",
      description: "Mental health support for electrical workers",
      contact: "020 7611 2500",
      website: "www.unitetheunion.org"
    },
    {
      name: "GMB Union",
      description: "Support and advocacy for construction/electrical workers",
      contact: "020 7391 6700",
      website: "www.gmb.org.uk"
    }
  ];

  const industrySupport = [
    {
      name: "Electrical Industries Charity",
      description: "Comprehensive support for electrical sector workers and families",
      contact: "01895 823 726",
      website: "www.electricalcharity.org",
      services: "Financial aid, debt advice, mental health support"
    },
    {
      name: "Mates in Mind",
      description: "Mental health in construction and related industries",
      contact: "0203 510 6972",
      website: "www.matesinmind.org",
      services: "Training, support, resources"
    },
    {
      name: "Lighthouse Construction Industry Charity",
      description: "Support for construction workers and families",
      contact: "0345 605 1956",
      website: "www.lighthouseconstructioncharity.org.uk",
      services: "24/7 helpline, financial support, mental health resources"
    }
  ];

  const professionalServices = [
    {
      name: "NHS Talking Therapies",
      description: "Free psychological therapies on the NHS",
      contact: "Refer via GP or self-refer online",
      website: "www.nhs.uk/mental-health/talking-therapies-medicine-treatments/talking-therapies-and-counselling/",
      waitTime: "Usually 6-18 weeks"
    },
    {
      name: "Mind",
      description: "Mental health information and local services",
      contact: "0300 123 3393",
      website: "www.mind.org.uk",
      services: "Information line, local groups, advocacy"
    },
    {
      name: "Rethink Mental Illness",
      description: "Support for severe mental health conditions",
      contact: "0300 5000 927",
      website: "www.rethink.org",
      services: "Advice line, support groups, services"
    },
    {
      name: "British Association for Counselling and Psychotherapy",
      description: "Find qualified therapists in your area",
      contact: "01455 883 300",
      website: "www.bacp.co.uk",
      services: "Therapist directory, information"
    }
  ];

  const peerSupport = [
    {
      name: "Andy's Man Club",
      description: "Free weekly peer-to-peer support groups for men",
      website: "andysmanclub.co.uk",
      meetingTime: "Monday evenings 7pm",
      locations: "Over 120 locations across UK"
    },
    {
      name: "Campaign Against Living Miserably (CALM)",
      description: "Support for men in crisis",
      contact: "0800 58 58 58",
      website: "www.thecalmzone.net",
      availability: "Daily 5pm-midnight"
    },
    {
      name: "Mental Health Mates",
      description: "Peer support walks and communities",
      website: "mentalhealthmates.co.uk",
      description2: "Free community walks in local areas"
    },
    {
      name: "Hub of Hope",
      description: "Find local mental health support",
      website: "hubofhope.co.uk",
      description2: "Comprehensive database of local services"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header Card */}
      <Card className="border-green-500/20 bg-gradient-to-r from-green-500/5 to-green-500/10">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Users className="h-6 w-6 text-green-400" />
            <CardTitle className="text-green-300">Support Network & Community</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            Building a strong support network is crucial for mental wellbeing. You don't have to face 
            challenges alone - there are people, services, and communities ready to help.
          </p>
        </CardContent>
      </Card>

      {/* Accordion Layout */}
      <Accordion type="multiple" className="space-y-4">
        
        {/* Emergency Support */}
        <AccordionItem value="emergency" className="border border-red-500/20 bg-red-500/5 rounded-lg px-4">
          <AccordionTrigger className="text-red-300 hover:text-red-200 hover:no-underline">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              <span className="font-semibold">Emergency Support - Available 24/7</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="space-y-4 pt-4">
            {emergencySupport.map((service, index) => (
              <div key={index} className="p-4 bg-red-500/10 rounded-lg border border-red-500/20">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div className="flex-1">
                    <h4 className="font-semibold text-white text-sm">{service.name}</h4>
                    <p className="text-xs text-muted-foreground mb-2">{service.description}</p>
                    <div className="flex flex-wrap gap-4 text-xs">
                      <span className="flex items-center gap-1">
                        <Phone className="h-3 w-3" />
                        <span className="font-medium text-red-300">{service.phone}</span>
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span className="text-muted-foreground">{service.availability}</span>
                      </span>
                    </div>
                  </div>
                  <Button size="sm" variant="outline" className="text-xs shrink-0">
                    <ExternalLink className="h-3 w-3 mr-1" />
                    Visit
                  </Button>
                </div>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>

        {/* Workplace Support */}
        <AccordionItem value="workplace" className="border border-blue-500/20 bg-blue-500/5 rounded-lg px-4">
          <AccordionTrigger className="text-blue-300 hover:text-blue-200 hover:no-underline">
            <div className="flex items-center gap-2">
              <Building className="h-5 w-5" />
              <span className="font-semibold">Workplace Rights & Support</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="space-y-4 pt-4">
            {workplaceSupport.map((service, index) => (
              <div key={index} className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div className="flex-1">
                    <h4 className="font-semibold text-white text-sm">{service.name}</h4>
                    <p className="text-xs text-muted-foreground mb-2">{service.description}</p>
                    <div className="flex items-center gap-1 text-xs">
                      <Phone className="h-3 w-3" />
                      <span className="font-medium text-blue-300">{service.contact}</span>
                    </div>
                  </div>
                  <Button size="sm" variant="outline" className="text-xs shrink-0">
                    <ExternalLink className="h-3 w-3 mr-1" />
                    Visit
                  </Button>
                </div>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>

        {/* Industry Support */}
        <AccordionItem value="industry" className="border border-purple-500/20 bg-purple-500/5 rounded-lg px-4">
          <AccordionTrigger className="text-purple-300 hover:text-purple-200 hover:no-underline">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              <span className="font-semibold">Electrical Industry Support</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="space-y-4 pt-4">
            {industrySupport.map((service, index) => (
              <div key={index} className="p-4 bg-purple-500/10 rounded-lg border border-purple-500/20">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                  <div className="flex-1">
                    <h4 className="font-semibold text-white text-sm">{service.name}</h4>
                    <p className="text-xs text-muted-foreground mb-2">{service.description}</p>
                    <div className="space-y-1 text-xs">
                      <div className="flex items-center gap-1">
                        <Phone className="h-3 w-3" />
                        <span className="font-medium text-purple-300">{service.contact}</span>
                      </div>
                      {service.services && (
                        <p className="text-muted-foreground">Services: {service.services}</p>
                      )}
                    </div>
                  </div>
                  <Button size="sm" variant="outline" className="text-xs shrink-0">
                    <ExternalLink className="h-3 w-3 mr-1" />
                    Visit
                  </Button>
                </div>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>

        {/* Professional Services */}
        <AccordionItem value="professional" className="border border-teal-500/20 bg-teal-500/5 rounded-lg px-4">
          <AccordionTrigger className="text-teal-300 hover:text-teal-200 hover:no-underline">
            <div className="flex items-center gap-2">
              <Heart className="h-5 w-5" />
              <span className="font-semibold">Professional Mental Health Services</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="space-y-4 pt-4">
            {professionalServices.map((service, index) => (
              <div key={index} className="p-4 bg-teal-500/10 rounded-lg border border-teal-500/20">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                  <div className="flex-1">
                    <h4 className="font-semibold text-white text-sm">{service.name}</h4>
                    <p className="text-xs text-muted-foreground mb-2">{service.description}</p>
                    <div className="space-y-1 text-xs">
                      <div className="flex items-center gap-1">
                        <Phone className="h-3 w-3" />
                        <span className="font-medium text-teal-300">{service.contact}</span>
                      </div>
                      {service.waitTime && (
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span className="text-muted-foreground">{service.waitTime}</span>
                        </div>
                      )}
                      {service.services && (
                        <p className="text-muted-foreground">Services: {service.services}</p>
                      )}
                    </div>
                  </div>
                  <Button size="sm" variant="outline" className="text-xs shrink-0">
                    <ExternalLink className="h-3 w-3 mr-1" />
                    Visit
                  </Button>
                </div>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>

        {/* Peer Support */}
        <AccordionItem value="peer" className="border border-green-500/20 bg-green-500/5 rounded-lg px-4">
          <AccordionTrigger className="text-green-300 hover:text-green-200 hover:no-underline">
            <div className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5" />
              <span className="font-semibold">Peer Support & Communities</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="space-y-4 pt-4">
            {peerSupport.map((service, index) => (
              <div key={index} className="p-4 bg-green-500/10 rounded-lg border border-green-500/20">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                  <div className="flex-1">
                    <h4 className="font-semibold text-white text-sm">{service.name}</h4>
                    <p className="text-xs text-muted-foreground mb-2">{service.description}</p>
                    <div className="space-y-1 text-xs">
                      {service.contact && (
                        <div className="flex items-center gap-1">
                          <Phone className="h-3 w-3" />
                          <span className="font-medium text-green-300">{service.contact}</span>
                        </div>
                      )}
                      {service.meetingTime && (
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span className="text-muted-foreground">{service.meetingTime}</span>
                        </div>
                      )}
                      {service.availability && (
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span className="text-muted-foreground">{service.availability}</span>
                        </div>
                      )}
                      {service.locations && (
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          <span className="text-muted-foreground">{service.locations}</span>
                        </div>
                      )}
                      {service.description2 && (
                        <p className="text-muted-foreground">{service.description2}</p>
                      )}
                    </div>
                  </div>
                  <Button size="sm" variant="outline" className="text-xs shrink-0">
                    <ExternalLink className="h-3 w-3 mr-1" />
                    Visit
                  </Button>
                </div>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>

      </Accordion>

      {/* Find Local Support Footer */}
      <Card className="border-blue-500/20 bg-blue-500/5">
        <CardHeader>
          <CardTitle className="text-blue-300 flex items-center gap-2 text-lg">
            <MapPin className="h-5 w-5" />
            Find Local Support
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
              <Phone className="h-6 w-6 text-blue-400 mx-auto mb-2" />
              <div className="text-sm font-medium text-white mb-1">NHS 111 Option 2</div>
              <div className="text-xs text-muted-foreground">24/7 mental health helpline</div>
            </div>
            <div className="text-center p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
              <MapPin className="h-6 w-6 text-blue-400 mx-auto mb-2" />
              <div className="text-sm font-medium text-white mb-1">Hub of Hope</div>
              <div className="text-xs text-muted-foreground">Find local mental health services</div>
            </div>
            <div className="text-center p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
              <Users className="h-6 w-6 text-blue-400 mx-auto mb-2" />
              <div className="text-sm font-medium text-white mb-1">Andy's Man Club</div>
              <div className="text-xs text-muted-foreground">120+ local support groups</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SupportNetworkTab;
