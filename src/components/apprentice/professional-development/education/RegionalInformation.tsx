
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { MapPin, Building, Phone, Globe, Mail } from "lucide-react";

const regionalData = {
  "England": {
    funding: [
      { name: "Advanced Learner Loans", description: "Available for Level 4-6 qualifications", amount: "Full course fees" },
      { name: "Skills Development Fund", description: "For emerging technologies", amount: "Up to £1,000" },
      { name: "Adult Education Budget", description: "Local authority funding", amount: "Varies by region" }
    ],
    providers: [
      { name: "City & Guilds", type: "Awarding Body", specialties: ["Electrical qualifications", "Professional development"] },
      { name: "EAL", type: "Awarding Body", specialties: ["Electrical Installation", "Maintenance"] },
      { name: "Local FE Colleges", type: "Education Provider", specialties: ["HNC/HND", "Part-time study"] }
    ],
    contacts: [
      { name: "National Careers Service", phone: "0800 100 900", website: "nationalcareers.service.gov.uk" },
      { name: "Adult Education Budget", email: "aeb.info@education.gov.uk", website: "gov.uk/adult-education-budget" }
    ]
  },
  "Scotland": {
    funding: [
      { name: "Student Awards Agency Scotland", description: "Higher education funding", amount: "Full fees + bursary" },
      { name: "Individual Learning Account", description: "Skills development", amount: "Up to £500" },
      { name: "Flexible Workforce Development Fund", description: "Employer-led training", amount: "Up to £15,000" }
    ],
    providers: [
      { name: "SQA", type: "Awarding Body", specialties: ["Scottish qualifications", "SVQs"] },
      { name: "Skills Development Scotland", type: "Government Agency", specialties: ["Career guidance", "Funding advice"] },
      { name: "Scottish Colleges", type: "Education Provider", specialties: ["HNC/HND", "Professional courses"] }
    ],
    contacts: [
      { name: "Skills Development Scotland", phone: "0800 917 8000", website: "skillsdevelopmentscotland.co.uk" },
      { name: "Student Awards Agency", phone: "0300 555 0505", website: "saas.gov.uk" }
    ]
  },
  "Wales": {
    funding: [
      { name: "Student Finance Wales", description: "Higher education support", amount: "Tuition fees + grants" },
      { name: "Working Wales", description: "Skills and employment support", amount: "Free training courses" },
      { name: "ReAct Programme", description: "Redundancy support", amount: "Up to £1,500" }
    ],
    providers: [
      { name: "Qualifications Wales", type: "Regulator", specialties: ["Welsh qualifications framework"] },
      { name: "Coleg Cymru", type: "College Network", specialties: ["Further education", "Skills training"] },
      { name: "University of South Wales", type: "University", specialties: ["Engineering degrees", "Part-time study"] }
    ],
    contacts: [
      { name: "Careers Wales", phone: "0800 028 4844", website: "careerswales.gov.uk" },
      { name: "Student Finance Wales", phone: "0300 200 4050", website: "studentfinancewales.co.uk" }
    ]
  },
  "Northern Ireland": {
    funding: [
      { name: "Student Finance NI", description: "Higher education funding", amount: "Tuition fees + maintenance" },
      { name: "Skills Focus", description: "Adult skills training", amount: "Free Level 2-3 courses" },
      { name: "Department for Economy Funding", description: "Professional development", amount: "Varies" }
    ],
    providers: [
      { name: "CCEA", type: "Awarding Body", specialties: ["Northern Ireland qualifications"] },
      { name: "Further Education Colleges", type: "Education Provider", specialties: ["Technical education", "Part-time courses"] },
      { name: "Ulster University", type: "University", specialties: ["Engineering", "Technology"] }
    ],
    contacts: [
      { name: "NI Direct", phone: "0300 200 7832", website: "nidirect.gov.uk" },
      { name: "Student Finance NI", phone: "0300 100 0077", website: "studentfinanceni.co.uk" }
    ]
  }
};

const specialistCentres = [
  {
    name: "NICEIC Training",
    locations: ["Multiple UK locations"],
    specialties: ["Electrical safety", "Renewable energy", "EV charging"],
    contact: "0333 015 6626",
    website: "niceic.com/training"
  },
  {
    name: "NAPIT",
    locations: ["Multiple UK locations"],
    specialties: ["Electrical competency", "Gas safety", "Renewable technology"],
    contact: "0345 543 0330",
    website: "napit.org.uk/training"
  },
  {
    name: "City & Guilds Centres",
    locations: ["Nationwide"],
    specialties: ["Electrical qualifications", "Professional development"],
    contact: "0844 543 0000",
    website: "cityandguilds.com"
  },
  {
    name: "JTL Training",
    locations: ["England & Wales"],
    specialties: ["Electrical apprenticeships", "Adult training"],
    contact: "0800 085 2308",
    website: "jtltraining.com"
  }
];

const RegionalInformation = () => {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h3 className="text-xl font-semibold">Regional Information & Support</h3>
        <p className="text-muted-foreground">
          Find funding options, providers, and contact information specific to your region
        </p>
      </div>

      <Tabs defaultValue="England" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="England">England</TabsTrigger>
          <TabsTrigger value="Scotland">Scotland</TabsTrigger>
          <TabsTrigger value="Wales">Wales</TabsTrigger>
          <TabsTrigger value="Northern Ireland">N. Ireland</TabsTrigger>
        </TabsList>

        {Object.entries(regionalData).map(([region, data]) => (
          <TabsContent key={region} value={region} className="space-y-6">
            {/* Regional Funding */}
            <Card className="border-elec-yellow/20 bg-elec-gray">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-elec-yellow" />
                  {region} - Available Funding
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {data.funding.map((fund, idx) => (
                    <div key={idx} className="bg-elec-dark/50 p-4 rounded-md">
                      <h4 className="font-semibold mb-2">{fund.name}</h4>
                      <p className="text-sm text-muted-foreground mb-2">{fund.description}</p>
                      <Badge variant="default">{fund.amount}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Regional Providers */}
            <Card className="border-elec-yellow/20 bg-elec-gray">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="h-5 w-5 text-elec-yellow" />
                  Education Providers
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {data.providers.map((provider, idx) => (
                    <div key={idx} className="flex items-start justify-between bg-elec-dark/50 p-4 rounded-md">
                      <div>
                        <h4 className="font-semibold">{provider.name}</h4>
                        <Badge variant="outline" className="mb-2">{provider.type}</Badge>
                        <div className="flex flex-wrap gap-1">
                          {provider.specialties.map((specialty, specIdx) => (
                            <Badge key={specIdx} variant="secondary" className="text-xs">
                              {specialty}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Regional Contacts */}
            <Card className="border-elec-yellow/20 bg-elec-gray">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="h-5 w-5 text-elec-yellow" />
                  Key Contacts & Resources
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {data.contacts.map((contact, idx) => (
                    <div key={idx} className="bg-elec-dark/50 p-4 rounded-md">
                      <h4 className="font-semibold mb-2">{contact.name}</h4>
                      <div className="space-y-1 text-sm">
                        {contact.phone && (
                          <div className="flex items-center gap-2">
                            <Phone className="h-4 w-4 text-elec-yellow" />
                            <span>{contact.phone}</span>
                          </div>
                        )}
                        {contact.email && (
                          <div className="flex items-center gap-2">
                            <Mail className="h-4 w-4 text-elec-yellow" />
                            <span>{contact.email}</span>
                          </div>
                        )}
                        {contact.website && (
                          <div className="flex items-center gap-2">
                            <Globe className="h-4 w-4 text-elec-yellow" />
                            <span>{contact.website}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>

      {/* Specialist Training Centres */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building className="h-5 w-5 text-elec-yellow" />
            UK-Wide Specialist Training Centres
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {specialistCentres.map((centre, idx) => (
              <div key={idx} className="bg-elec-dark/50 p-4 rounded-md">
                <h4 className="font-semibold mb-2">{centre.name}</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-elec-yellow" />
                    <span>{centre.locations.join(", ")}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-elec-yellow" />
                    <span>{centre.contact}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4 text-elec-yellow" />
                    <span>{centre.website}</span>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {centre.specialties.map((specialty, specIdx) => (
                      <Badge key={specIdx} variant="secondary" className="text-xs">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Local Resources Finder */}
      <Card className="border-green-500/20 bg-green-500/10">
        <CardHeader>
          <CardTitle className="text-green-400">Find Local Resources</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            Use these tools to find education providers and funding opportunities in your specific area:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <h4 className="font-semibold mb-2">Course Finder</h4>
              <p className="text-xs text-muted-foreground mb-2">Search for courses by postcode</p>
              <Badge variant="outline" className="cursor-pointer">Find Courses</Badge>
            </div>
            <div className="text-center">
              <h4 className="font-semibold mb-2">College Locator</h4>
              <p className="text-xs text-muted-foreground mb-2">Find nearby colleges and training centres</p>
              <Badge variant="outline" className="cursor-pointer">Locate Colleges</Badge>
            </div>
            <div className="text-center">
              <h4 className="font-semibold mb-2">Advisor Finder</h4>
              <p className="text-xs text-muted-foreground mb-2">Connect with local career advisors</p>
              <Badge variant="outline" className="cursor-pointer">Find Advisors</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegionalInformation;
