
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, FileCheck, Calendar, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

const professionalAccreditations = [
  {
    id: 1,
    title: "IET Membership",
    level: "Professional",
    description: "Membership of the Institution of Engineering and Technology, providing recognition of professional competence.",
    requirements: "Relevant engineering qualification or experience",
    benefits: [
      "Professional recognition", 
      "Networking opportunities", 
      "Access to technical resources",
      "Career development services"
    ],
    renewalPeriod: "Annual",
    cost: "£150-£220 per year",
    websiteLink: "#"
  },
  {
    id: 2,
    title: "Chartered Engineer (CEng)",
    level: "Advanced",
    description: "Prestigious qualification demonstrating high-level competence and commitment to engineering.",
    requirements: "Accredited master's degree or equivalent + professional experience",
    benefits: [
      "International recognition", 
      "Higher earning potential", 
      "Professional credibility",
      "Competitive advantage in job market"
    ],
    renewalPeriod: "Annual (through engineering institution)",
    cost: "Initial application £220-£300 + annual membership fees",
    websiteLink: "#"
  },
  {
    id: 3,
    title: "ECA Membership",
    level: "Industry",
    description: "Electrical Contractors' Association membership, vital for commercial credibility.",
    requirements: "Established electrical contracting business with required insurances and qualifications",
    benefits: [
      "Business credibility", 
      "Technical and legal support", 
      "Client referrals",
      "Access to industry schemes"
    ],
    renewalPeriod: "Annual",
    cost: "Based on company turnover, from £600 per year",
    websiteLink: "#"
  },
  {
    id: 4,
    title: "Incorporated Engineer (IEng)",
    level: "Professional",
    description: "Recognition for applying proven techniques to solve engineering problems.",
    requirements: "Accredited bachelor's degree or HND/HNC + professional experience",
    benefits: [
      "Professional recognition", 
      "Career progression", 
      "Improved employability",
      "Pathway to Chartered Engineer status"
    ],
    renewalPeriod: "Annual (through engineering institution)",
    cost: "Initial application £180-£250 + annual membership fees",
    websiteLink: "#"
  },
  {
    id: 5,
    title: "Engineering Technician (EngTech)",
    level: "Foundation",
    description: "Professional registration for those who apply proven techniques and procedures to solve practical engineering problems.",
    requirements: "Level 3 qualification + work experience, or substantial work experience",
    benefits: [
      "Recognition of competence", 
      "Career development", 
      "Improved employability",
      "First step on professional registration ladder"
    ],
    renewalPeriod: "Annual (through engineering institution)",
    cost: "Initial application £90-£150 + annual membership fees",
    websiteLink: "#"
  }
];

const ProfessionalAccreditation = () => {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Professional Accreditation</h2>
        <p className="text-muted-foreground">
          Professional accreditations provide recognition of your expertise and commitment to the electrical industry.
          They can significantly enhance your career prospects and demonstrate your professional standing to employers and clients.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {professionalAccreditations.map((cert) => (
          <Card key={cert.id} className="border-elec-yellow/20 bg-elec-gray h-full flex flex-col">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg">{cert.title}</CardTitle>
                <span className={`text-xs px-2 py-1 rounded ${
                  cert.level === "Professional" 
                    ? "bg-blue-500/20 text-blue-300" 
                    : cert.level === "Advanced" 
                    ? "bg-green-500/20 text-green-300" 
                    : cert.level === "Foundation"
                    ? "bg-purple-500/20 text-purple-300"
                    : "bg-amber-500/20 text-amber-300"
                }`}>
                  {cert.level}
                </span>
              </div>
            </CardHeader>
            <CardContent className="pt-2 flex-grow flex flex-col">
              <p className="text-sm mb-3">{cert.description}</p>
              
              <div className="space-y-3 mt-auto">
                <div>
                  <h4 className="text-xs text-elec-yellow mb-1">Requirements:</h4>
                  <p className="text-xs">{cert.requirements}</p>
                </div>
                
                <div>
                  <h4 className="text-xs text-elec-yellow mb-1">Key Benefits:</h4>
                  <ul className="text-xs space-y-1">
                    {cert.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-center gap-1.5">
                        <span className="h-1 w-1 rounded-full bg-elec-yellow"></span>
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="border-t border-elec-yellow/10 pt-3 grid grid-cols-2 gap-2 text-xs">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5 text-elec-yellow" />
                    <div>
                      <p className="text-elec-yellow/80">Renewal:</p>
                      <p>{cert.renewalPeriod}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-elec-yellow/80">Approx. Cost:</p>
                    <p>{cert.cost}</p>
                  </div>
                </div>
                
                <div className="pt-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full text-xs flex items-center gap-1.5 border-elec-yellow/30 hover:border-elec-yellow"
                  >
                    More Information
                    <ExternalLink className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-elec-yellow/20 bg-elec-gray/50 p-4">
        <div className="flex gap-3 items-start">
          <Award className="h-6 w-6 text-elec-yellow mt-1" />
          <div>
            <h3 className="font-medium text-lg mb-1">Accreditation Application Tips</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow font-bold">•</span>
                <span>Start gathering evidence of your work experience and competence early in your career</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow font-bold">•</span>
                <span>Seek guidance from colleagues who already hold the accreditation you're targeting</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow font-bold">•</span>
                <span>Attend information sessions offered by professional bodies to understand application requirements</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow font-bold">•</span>
                <span>Consider finding a mentor who can guide you through the professional registration process</span>
              </li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ProfessionalAccreditation;
