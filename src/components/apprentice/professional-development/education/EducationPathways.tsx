
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GraduationCap, Clock, MapPin, TrendingUp, BookOpen, Award } from "lucide-react";

const educationPathways = [
  {
    id: 1,
    title: "HNC Electrical Engineering",
    level: "Level 4",
    duration: "1-2 years",
    studyMode: ["Part-time", "Evening", "Distance Learning"],
    cost: "£3,000 - £6,000",
    fundingAvailable: true,
    description: "Build advanced technical knowledge in electrical engineering principles, digital electronics, and project management.",
    keyModules: [
      "Electrical Principles & Applications",
      "Engineering Mathematics",
      "Digital Electronics",
      "Health & Safety Management",
      "Project Planning & Management"
    ],
    careerProgression: [
      "Senior Electrician",
      "Electrical Supervisor", 
      "Technical Specialist",
      "Progress to HND"
    ],
    entryRequirements: "Level 3 qualification or relevant work experience",
    providers: ["Local colleges", "Distance learning providers"],
    averageSalaryIncrease: "£3,000 - £5,000"
  },
  {
    id: 2,
    title: "HND Electrical Engineering",
    level: "Level 5",
    duration: "2-3 years",
    studyMode: ["Part-time", "Evening", "Block release"],
    cost: "£6,000 - £12,000",
    fundingAvailable: true,
    description: "Comprehensive higher education qualification covering advanced electrical systems, power engineering, and management skills.",
    keyModules: [
      "Power Systems Analysis",
      "Electronic Circuit Design",
      "Industrial Control Systems",
      "Renewable Energy Systems",
      "Business Management",
      "Research Project"
    ],
    careerProgression: [
      "Electrical Design Engineer",
      "Project Manager",
      "Technical Manager",
      "Final year degree entry"
    ],
    entryRequirements: "HNC or equivalent Level 4 qualification",
    providers: ["Universities", "Technical colleges"],
    averageSalaryIncrease: "£5,000 - £8,000"
  },
  {
    id: 3,
    title: "Degree Top-Up (BEng/BSc)",
    level: "Level 6",
    duration: "1 year",
    studyMode: ["Full-time", "Part-time"],
    cost: "£9,250 (full-time) / £4,625 (part-time)",
    fundingAvailable: true,
    description: "Complete your bachelor's degree with one additional year of study after completing an HND.",
    keyModules: [
      "Advanced Power Systems",
      "Sustainable Energy Technologies",
      "Engineering Management",
      "Individual Project",
      "Professional Practice"
    ],
    careerProgression: [
      "Graduate Engineer",
      "Design Engineer",
      "Technical Consultant",
      "Master's degree entry"
    ],
    entryRequirements: "HND in relevant subject with good grades",
    providers: ["Universities nationwide"],
    averageSalaryIncrease: "£7,000 - £12,000"
  },
  {
    id: 4,
    title: "Renewable Energy Courses",
    level: "Specialist",
    duration: "1-5 days",
    studyMode: ["Intensive courses", "Online"],
    cost: "£300 - £1,500",
    fundingAvailable: true,
    description: "Specialise in the growing renewable energy sector with solar PV, heat pump, and energy storage training.",
    keyModules: [
      "Solar PV Installation & Maintenance",
      "Heat Pump Systems",
      "Battery Storage Systems",
      "Grid Connection Requirements",
      "MCS Certification Preparation"
    ],
    careerProgression: [
      "Renewable Energy Specialist",
      "Green Technology Installer",
      "Energy Consultant",
      "Business opportunities"
    ],
    entryRequirements: "Qualified electrician status",
    providers: ["NICEIC", "NAPIT", "Specialist training centres"],
    averageSalaryIncrease: "£2,000 - £4,000"
  },
  {
    id: 5,
    title: "Electric Vehicle Charging",
    level: "Specialist",
    duration: "1-3 days",
    studyMode: ["Practical workshops"],
    cost: "£400 - £800",
    fundingAvailable: true,
    description: "Enter the rapidly expanding EV charging market with comprehensive installation and maintenance training.",
    keyModules: [
      "EV Charging Technologies",
      "Installation Requirements",
      "Safety Procedures",
      "Testing & Commissioning",
      "Business Development"
    ],
    careerProgression: [
      "EV Charging Specialist",
      "Commercial EV Installer",
      "Charging Network Technician",
      "Independent contractor"
    ],
    entryRequirements: "18th Edition, AM2, or equivalent",
    providers: ["Industry training providers", "Manufacturer courses"],
    averageSalaryIncrease: "£3,000 - £6,000"
  },
  {
    id: 6,
    title: "Smart Home Technology",
    level: "Emerging",
    duration: "2-5 days",
    studyMode: ["Hands-on training"],
    cost: "£500 - £1,200",
    fundingAvailable: false,
    description: "Master home automation, IoT systems, and smart electrical installations for the connected home market.",
    keyModules: [
      "Home Automation Systems",
      "IoT Device Integration",
      "Smart Lighting Controls",
      "Security System Integration",
      "Troubleshooting Connected Systems"
    ],
    careerProgression: [
      "Smart Home Specialist",
      "Home Automation Consultant",
      "Technology Integration Expert",
      "Premium service provider"
    ],
    entryRequirements: "Electrical qualification + IT literacy",
    providers: ["Technology companies", "Specialist academies"],
    averageSalaryIncrease: "£4,000 - £7,000"
  }
];

const EducationPathways = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {educationPathways.map((pathway) => (
          <Card key={pathway.id} className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <GraduationCap className="h-5 w-5 text-elec-yellow" />
                    {pathway.title}
                  </CardTitle>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant="secondary">{pathway.level}</Badge>
                    {pathway.fundingAvailable && (
                      <Badge variant="default" className="bg-green-600">
                        Funding Available
                      </Badge>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-muted-foreground">{pathway.cost}</div>
                  <div className="text-xs text-elec-yellow">+{pathway.averageSalaryIncrease}</div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm">{pathway.description}</p>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-elec-yellow" />
                  <span>{pathway.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-elec-yellow" />
                  <span>{pathway.studyMode.join(", ")}</span>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-semibold mb-2 text-elec-yellow">Key Modules:</h4>
                <div className="flex flex-wrap gap-1">
                  {pathway.keyModules.slice(0, 3).map((module, idx) => (
                    <Badge key={idx} variant="outline" className="text-xs">
                      {module}
                    </Badge>
                  ))}
                  {pathway.keyModules.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{pathway.keyModules.length - 3} more
                    </Badge>
                  )}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-semibold mb-2 text-elec-yellow">Career Progression:</h4>
                <div className="flex flex-wrap gap-1">
                  {pathway.careerProgression.slice(0, 2).map((career, idx) => (
                    <Badge key={idx} variant="secondary" className="text-xs">
                      {career}
                    </Badge>
                  ))}
                  {pathway.careerProgression.length > 2 && (
                    <Badge variant="secondary" className="text-xs">
                      +{pathway.careerProgression.length - 2} more
                    </Badge>
                  )}
                </div>
              </div>

              <div className="pt-4">
                <Button className="w-full" size="sm">
                  Learn More & Find Providers
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-elec-yellow/20 bg-elec-gray/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-elec-yellow" />
            Why Invest in Further Education?
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-elec-yellow mb-2">£5,000+</div>
              <div className="text-sm font-semibold mb-1">Average salary increase</div>
              <div className="text-xs text-muted-foreground">
                Higher qualifications typically lead to better-paid positions
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-elec-yellow mb-2">90%+</div>
              <div className="text-sm font-semibold mb-1">Employment rate</div>
              <div className="text-xs text-muted-foreground">
                Electrical engineering graduates have excellent job prospects
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-elec-yellow mb-2">Future-proof</div>
              <div className="text-sm font-semibold mb-1">Career security</div>
              <div className="text-xs text-muted-foreground">
                Stay ahead of industry changes and emerging technologies
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EducationPathways;
