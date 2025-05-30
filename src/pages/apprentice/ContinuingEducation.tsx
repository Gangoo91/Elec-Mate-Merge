
import BackButton from "@/components/common/BackButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Monitor, Users, Calendar, Globe, Lightbulb, Building, Award, Zap, Shield } from "lucide-react";

const ContinuingEducation = () => {
  const educationOptions = [
    {
      title: "Manufacturer Technical Training",
      provider: "Schneider Electric, ABB, Siemens, Legrand",
      format: "In-person / Online / Webinars",
      description: "Learn about cutting-edge products, installation techniques, and system integration from leading manufacturers",
      examples: [
        "Schneider Electric EcoXpert training programmes",
        "ABB robotics and automation courses", 
        "Siemens digital factory training",
        "Legrand smart building systems",
        "Hager consumer unit installations",
        "MK Electric wiring accessories"
      ],
      benefits: ["Product expertise and certification", "Access to technical support", "Early access to new products", "Manufacturer warranty backing", "Enhanced credibility with clients"],
      icon: <Lightbulb className="h-6 w-6 text-elec-yellow" />,
      cost: "Often free to £300",
      cpdHours: "4-8 hours per course"
    },
    {
      title: "Industry Webinars & Technical Seminars",
      provider: "ECA, NICEIC, NAPIT, IET, SELECT",
      format: "Online webinars / Regional seminars",
      description: "Stay current with industry developments, regulatory changes, and best practices through expert-led sessions",
      examples: [
        "ECA technical breakfast seminars",
        "NICEIC quarterly technical updates",
        "NAPIT monthly webinar series",
        "IET professional development lectures",
        "SELECT regional training events",
        "JIB skills and training updates"
      ],
      benefits: ["CPD hours towards registration", "Regulatory update briefings", "Networking with peers", "Expert Q&A sessions", "Certificate of attendance"],
      icon: <Monitor className="h-6 w-6 text-elec-yellow" />,
      cost: "Free - £150",
      cpdHours: "1-4 hours per session"
    },
    {
      title: "Higher Education Pathways",
      provider: "Universities & Further Education Colleges",
      format: "Part-time / Distance learning / Evening classes",
      description: "Pursue formal qualifications to advance into engineering, management, or specialist technical roles",
      examples: [
        "HNC/HND Electrical & Electronic Engineering",
        "Foundation Degree in Building Services Engineering",
        "BEng (Hons) Electrical Engineering (part-time)",
        "MSc Renewable Energy Systems",
        "Degree Apprenticeships in Engineering",
        "MBA with Engineering Management focus"
      ],
      benefits: ["Academic qualifications for career progression", "Management and leadership skills", "Research and analysis capabilities", "Access to professional engineering status", "Higher earning potential"],
      icon: <BookOpen className="h-6 w-6 text-elec-yellow" />,
      cost: "£3,000 - £15,000 per year",
      cpdHours: "Substantial ongoing commitment"
    },
    {
      title: "Professional Body Membership",
      provider: "IET, IEEE, CIBSE, EI",
      format: "Membership benefits & resources",
      description: "Join professional engineering institutions for access to technical resources, networking, and career development",
      examples: [
        "Institution of Engineering and Technology (IET)",
        "Institute of Electrical and Electronics Engineers (IEEE)",
        "Chartered Institution of Building Services Engineers (CIBSE)",
        "Energy Institute (EI) for renewable energy professionals"
      ],
      benefits: ["Professional recognition and letters (MIET, CENG)", "Access to technical journals and standards", "Networking events and conferences", "Career mentoring programmes", "Continuing professional development framework"],
      icon: <Users className="h-6 w-6 text-elec-yellow" />,
      cost: "£150 - £400 annually",
      cpdHours: "Flexible self-directed learning"
    },
    {
      title: "Health & Safety Training Updates",
      provider: "CITB, NEBOSH, IOSH Providers",
      format: "Classroom / Online modules / Practical assessments",
      description: "Maintain current health and safety qualifications essential for electrical work in all environments",
      examples: [
        "First Aid at Work refresher (3-year renewal)",
        "Working at Height training updates",
        "Asbestos Awareness for electrical workers",
        "Manual Handling in electrical environments",
        "NEBOSH Construction Certificate",
        "IOSH Managing Safely for supervisors"
      ],
      benefits: ["Legal compliance for site work", "Insurance requirement satisfaction", "Reduced workplace accident risk", "Enhanced employability", "Site access card maintenance"],
      icon: <Shield className="h-6 w-6 text-elec-yellow" />,
      cost: "£50 - £500",
      cpdHours: "4-16 hours per course"
    },
    {
      title: "Digital & Emerging Technologies",
      provider: "Technology Companies & Specialist Trainers",
      format: "Workshops / Online courses / Hands-on training",
      description: "Master new technologies transforming the electrical industry to future-proof your career",
      examples: [
        "Internet of Things (IoT) systems for buildings",
        "Building Information Modelling (BIM) for electrical",
        "Energy storage and battery systems",
        "Electric vehicle infrastructure",
        "Smart grid and demand response systems",
        "Artificial Intelligence in building management"
      ],
      benefits: ["Competitive advantage in emerging markets", "Higher value project opportunities", "Innovation and problem-solving skills", "Technology integration expertise", "Future career security"],
      icon: <Globe className="h-6 w-6 text-elec-yellow" />,
      cost: "£200 - £2,000",
      cpdHours: "8-40 hours depending on complexity"
    },
    {
      title: "Business & Management Skills",
      provider: "Business Schools & Professional Training",
      format: "Evening classes / Weekend workshops / Online",
      description: "Develop business acumen essential for career progression into management or self-employment",
      examples: [
        "Project Management (PRINCE2, APM)",
        "Business Development and Marketing",
        "Financial Management for Contractors",
        "Leadership and Team Management",
        "Contract Law and Commercial Awareness",
        "Customer Service Excellence"
      ],
      benefits: ["Preparation for management roles", "Essential skills for contracting", "Enhanced client relationships", "Business growth opportunities", "Cross-industry transferable skills"],
      icon: <Building className="h-6 w-6 text-elec-yellow" />,
      cost: "£300 - £3,000",
      cpdHours: "Variable, often substantial"
    },
    {
      title: "Specialist System Training",
      provider: "Equipment Manufacturers & System Integrators",
      format: "Factory training / On-site instruction / Simulation",
      description: "Gain expertise in complex electrical systems for high-value specialist markets",
      examples: [
        "Industrial automation and SCADA systems",
        "Hospital and healthcare electrical systems",
        "Data centre power and cooling",
        "Marine and offshore electrical systems",
        "Railway and transport infrastructure",
        "Renewable energy grid integration"
      ],
      benefits: ["Access to specialist high-paying markets", "Complex problem-solving skills", "System design capabilities", "Consultancy opportunities", "International work possibilities"],
      icon: <Zap className="h-6 w-6 text-elec-yellow" />,
      cost: "£500 - £5,000",
      cpdHours: "20-80 hours for comprehensive training"
    }
  ];

  const cpdRequirements = [
    {
      scheme: "NICEIC",
      hours: "20 hours annually",
      details: "Structured CPD programme with online portfolio tracking and verification",
      categories: ["Technical knowledge", "Health & Safety", "Business skills", "Regulations"]
    },
    {
      scheme: "NAPIT",
      hours: "20 hours annually", 
      details: "Flexible CPD framework with online recording and automatic reminders",
      categories: ["Technical competence", "Legal requirements", "Business development", "Innovation"]
    },
    {
      scheme: "ECA",
      hours: "20 hours annually",
      details: "Competency-based CPD with emphasis on practical application",
      categories: ["Technical skills", "Management", "Health & Safety", "Commercial awareness"]
    },
    {
      scheme: "SELECT",
      hours: "20 hours annually",
      details: "Scottish-focused CPD with local industry relevance",
      categories: ["Technical updates", "Scottish regulations", "Business skills", "Safety"]
    }
  ];

  const learningMethods = [
    {
      method: "Formal Training Courses",
      timeCommitment: "1-5 days intensive",
      cpdValue: "High - Structured content",
      cost: "£200-£2,000",
      benefits: ["Certificates and qualifications", "Hands-on practical experience", "Expert instruction", "Networking opportunities"]
    },
    {
      method: "Online Learning & Webinars",
      timeCommitment: "1-4 hours per session",
      cpdValue: "Medium - Convenient access",
      cost: "Free - £300",
      benefits: ["Flexible timing", "Cost-effective", "Wide topic range", "Recorded for replay"]
    },
    {
      method: "Technical Reading & Research",
      timeCommitment: "Ongoing self-study",
      cpdValue: "Medium - Self-directed",
      cost: "£50-£200 for materials",
      benefits: ["Deep knowledge development", "Current industry trends", "Regulatory updates", "Problem-solving skills"]
    },
    {
      method: "Mentoring & Knowledge Sharing",
      timeCommitment: "Regular meetings",
      cpdValue: "High - Practical application",
      cost: "Time investment only",
      benefits: ["Real-world experience", "Industry insights", "Career guidance", "Skill development"]
    }
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-fade-in">
      <div className="flex flex-col items-center justify-center mb-6">
        <h1 className="text-3xl font-bold tracking-tight mb-4">Continuing Professional Development</h1>
        <p className="text-muted-foreground text-center max-w-2xl mb-4">
          Stay at the forefront of the electrical industry through ongoing education and professional development. 
          Meet CPD requirements whilst building expertise that advances your career and increases earning potential.
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
                    <Badge variant="outline" className="border-blue-500/40 text-blue-300 text-xs">
                      {option.cpdHours}
                    </Badge>
                  </div>
                </div>
              </div>
              <p className="text-muted-foreground text-sm">{option.description}</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold text-white mb-2">Training Examples:</h4>
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
                <h4 className="font-semibold text-white mb-2">Professional Benefits:</h4>
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
          <CardTitle className="text-elec-yellow">UK Registration Scheme CPD Requirements</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            All UK electrical registration schemes require annual CPD to maintain competent person status. Here's what each scheme expects:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {cpdRequirements.map((scheme, index) => (
              <div key={index} className="border border-elec-yellow/20 rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold text-white">{scheme.scheme}</h4>
                  <Badge variant="outline" className="border-elec-yellow/40 text-elec-yellow text-xs">
                    {scheme.hours}
                  </Badge>
                </div>
                <p className="text-muted-foreground text-sm mb-3">{scheme.details}</p>
                <div>
                  <h5 className="font-medium text-white text-sm mb-2">Required Categories:</h5>
                  <div className="grid grid-cols-2 gap-1">
                    {scheme.categories.map((category, catIndex) => (
                      <div key={catIndex} className="text-xs text-muted-foreground flex items-center gap-1">
                        <span className="text-elec-yellow">•</span>
                        {category}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="text-elec-yellow">CPD Learning Methods Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-elec-yellow/20">
                  <th className="text-left py-2 text-elec-yellow">Learning Method</th>
                  <th className="text-left py-2 text-elec-yellow">Time Commitment</th>
                  <th className="text-left py-2 text-elec-yellow">CPD Value</th>
                  <th className="text-left py-2 text-elec-yellow">Typical Cost</th>
                </tr>
              </thead>
              <tbody>
                {learningMethods.map((method, index) => (
                  <tr key={index} className="border-b border-elec-yellow/10">
                    <td className="py-3 text-white font-medium">{method.method}</td>
                    <td className="py-3 text-muted-foreground">{method.timeCommitment}</td>
                    <td className="py-3 text-muted-foreground">{method.cpdValue}</td>
                    <td className="py-3 text-muted-foreground">{method.cost}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {learningMethods.map((method, index) => (
              <div key={index} className="border border-elec-yellow/20 rounded-lg p-3">
                <h5 className="font-medium text-white text-sm mb-2">{method.method} Benefits:</h5>
                <ul className="space-y-1">
                  {method.benefits.map((benefit, benefitIndex) => (
                    <li key={benefitIndex} className="text-xs text-muted-foreground flex items-start gap-1">
                      <span className="text-elec-yellow">•</span>
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="text-elec-yellow">Creating Your Personal CPD Strategy</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-semibold text-white mb-3">1. Assess Your Development Needs</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Review your current role requirements</li>
                <li>• Identify skills gaps for progression</li>
                <li>• Consider emerging industry trends</li>
                <li>• Evaluate client and market demands</li>
                <li>• Check regulatory update requirements</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-3">2. Plan Your Learning Journey</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Set annual CPD hour targets (minimum 20)</li>
                <li>• Budget for training investments</li>
                <li>• Schedule learning around work commitments</li>
                <li>• Mix formal and informal learning methods</li>
                <li>• Align with performance review cycles</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-3">3. Track and Apply Learning</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Maintain detailed CPD records</li>
                <li>• Document learning outcomes achieved</li>
                <li>• Apply new knowledge in practice</li>
                <li>• Share learning with colleagues</li>
                <li>• Reflect on professional development</li>
              </ul>
            </div>
          </div>
          <div className="mt-6 p-4 bg-elec-yellow/10 rounded-lg">
            <h4 className="font-semibold text-elec-yellow mb-2">Professional Tip:</h4>
            <p className="text-muted-foreground text-sm">
              The most successful electrical professionals exceed minimum CPD requirements and actively seek learning 
              opportunities that differentiate them in the market. Consider targeting 30-40 hours annually, with a mix 
              of technical updates, business skills, and emerging technology training. This investment in professional 
              development typically returns 3-5 times its cost through increased earning potential and career opportunities.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContinuingEducation;
