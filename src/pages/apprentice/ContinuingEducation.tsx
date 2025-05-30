
import BackButton from "@/components/common/BackButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Monitor, Users, Calendar, Globe, Lightbulb } from "lucide-react";

const ContinuingEducation = () => {
  const educationOptions = [
    {
      title: "Manufacturer Training Courses",
      provider: "Various Manufacturers",
      format: "In-person / Online",
      description: "Learn about specific products and installation techniques",
      examples: ["Schneider Electric courses", "ABB training programmes", "Siemens automation", "Legrand systems"],
      benefits: ["Product expertise", "Certification badges", "Technical support access", "Latest technology updates"],
      icon: <Lightbulb className="h-6 w-6 text-elec-yellow" />,
      cost: "Often free"
    },
    {
      title: "Industry Webinars & Seminars",
      provider: "Trade Associations",
      format: "Online / Conference halls",
      description: "Stay updated with industry trends and regulations",
      examples: ["ECA technical seminars", "NICEIC webinars", "IET professional lectures", "SELECT training events"],
      benefits: ["CPD hours", "Networking opportunities", "Industry insights", "Regulatory updates"],
      icon: <Monitor className="h-6 w-6 text-elec-yellow" />,
      cost: "Free - £200"
    },
    {
      title: "Higher Education Courses",
      provider: "Universities & Colleges",
      format: "Part-time / Distance learning",
      description: "Formal qualifications for career advancement",
      examples: ["HNC Electrical Engineering", "Degree apprenticeships", "Foundation degrees", "MSc programmes"],
      benefits: ["Academic qualifications", "Management skills", "Research abilities", "Career progression"],
      icon: <BookOpen className="h-6 w-6 text-elec-yellow" />,
      cost: "£3,000 - £15,000"
    },
    {
      title: "Professional Body Membership",
      provider: "IET, IEEE, etc.",
      format: "Membership benefits",
      description: "Access to professional development resources",
      examples: ["Institution of Engineering and Technology", "Institute of Electrical and Electronics Engineers"],
      benefits: ["Professional recognition", "Journal access", "Networking events", "Career guidance"],
      icon: <Users className="h-6 w-6 text-elec-yellow" />,
      cost: "£100 - £300 annually"
    },
    {
      title: "Health & Safety Updates",
      provider: "Safety Organisations",
      format: "Courses / Online modules",
      description: "Mandatory safety training and updates",
      examples: ["First aid refreshers", "Working at height", "Asbestos awareness", "Manual handling"],
      benefits: ["Legal compliance", "Workplace safety", "Insurance requirements", "Risk reduction"],
      icon: <Calendar className="h-6 w-6 text-elec-yellow" />,
      cost: "£50 - £300"
    },
    {
      title: "Digital & Emerging Technologies",
      provider: "Tech Companies",
      format: "Online / Workshops",
      description: "Training in new technologies and digital tools",
      examples: ["IoT systems", "Building management systems", "Energy storage", "Electric vehicle charging"],
      benefits: ["Future-proofing skills", "Market opportunities", "Innovation knowledge", "Competitive advantage"],
      icon: <Globe className="h-6 w-6 text-elec-yellow" />,
      cost: "£200 - £1,000"
    }
  ];

  const cpdRequirements = [
    {
      scheme: "NICEIC",
      hours: "20 hours annually",
      details: "Structured CPD programme with online tracking"
    },
    {
      scheme: "ECA",
      hours: "20 hours annually", 
      details: "Mix of technical and business skills development"
    },
    {
      scheme: "NAPIT",
      hours: "20 hours annually",
      details: "Industry-specific training and assessment"
    },
    {
      scheme: "JIB",
      hours: "As required",
      details: "Skills cards and safety training updates"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-fade-in">
      <div className="flex flex-col items-center justify-center mb-6">
        <h1 className="text-3xl font-bold tracking-tight mb-4">Continuing Professional Development</h1>
        <p className="text-muted-foreground text-center max-w-2xl mb-4">
          Stay current with industry standards, regulations, and emerging technologies through ongoing education and training.
        </p>
        <BackButton customUrl="/apprentice/professional-development" label="Back to Professional Development" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {educationOptions.map((option, index) => (
          <Card key={index} className="border-elec-yellow/20 bg-elec-gray hover:border-elec-yellow/40 transition-all duration-300">
            <CardHeader>
              <div className="flex items-start gap-3">
                {option.icon}
                <div className="flex-1">
                  <CardTitle className="text-lg text-elec-yellow">{option.title}</CardTitle>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline" className="border-elec-yellow/40 text-elec-yellow text-xs">
                      {option.format}
                    </Badge>
                    <Badge variant="outline" className="border-green-500/40 text-green-300 text-xs">
                      {option.cost}
                    </Badge>
                  </div>
                </div>
              </div>
              <p className="text-muted-foreground text-sm">{option.description}</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold text-white mb-2">Examples:</h4>
                <ul className="space-y-1">
                  {option.examples.map((example, exampleIndex) => (
                    <li key={exampleIndex} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="text-elec-yellow">•</span>
                      {example}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-white mb-2">Benefits:</h4>
                <ul className="space-y-1">
                  {option.benefits.map((benefit, benefitIndex) => (
                    <li key={benefitIndex} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="text-elec-yellow">•</span>
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-elec-yellow/20 bg-gradient-to-r from-elec-gray to-elec-dark/50">
        <CardHeader>
          <CardTitle className="text-elec-yellow">CPD Requirements by Registration Scheme</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            Most electrical registration schemes require ongoing professional development to maintain your status:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {cpdRequirements.map((scheme, index) => (
              <div key={index} className="border border-elec-yellow/20 rounded-lg p-4">
                <h4 className="font-semibold text-white mb-2">{scheme.scheme}</h4>
                <p className="text-elec-yellow text-sm font-medium mb-1">{scheme.hours}</p>
                <p className="text-muted-foreground text-xs">{scheme.details}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="text-elec-yellow">Creating Your CPD Plan</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-semibold text-white mb-3">1. Assess Your Needs</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Identify skill gaps</li>
                <li>• Consider career goals</li>
                <li>• Review job requirements</li>
                <li>• Check regulatory changes</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-3">2. Plan Your Learning</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Set annual CPD targets</li>
                <li>• Budget for training costs</li>
                <li>• Schedule learning time</li>
                <li>• Mix formal and informal learning</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-3">3. Track Progress</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Keep training records</li>
                <li>• Document learning outcomes</li>
                <li>• Apply new knowledge</li>
                <li>• Reflect on development</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContinuingEducation;
