
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Award, 
  Clock, 
  PoundSterling, 
  Users, 
  CheckCircle, 
  ExternalLink,
  GraduationCap,
  FileText,
  Calendar,
  MapPin,
  Star,
  TrendingUp,
  Info,
  ChevronDown,
  ChevronUp
} from "lucide-react";

interface AccreditationDetails {
  id: string;
  title: string;
  provider: string;
  level: string;
  duration: string;
  cost: string;
  format: string;
  description: string;
  benefits: string[];
  requirements: string[];
  careerImpact: string;
  salaryIncrease: string;
  renewalPeriod: string;
  studyMode: string[];
  locations: string[];
  nextIntake: string;
  applicationDeadline: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  popularity: number;
  employerRecognition: string;
  cpdPoints: string;
}

const accreditationData: AccreditationDetails[] = [
  {
    id: "iet-membership",
    title: "IET Professional Membership (MIET)",
    provider: "Institution of Engineering and Technology",
    level: "Professional",
    duration: "Application process: 2-3 months",
    cost: "£168/year (2024 rates)",
    format: "Professional Application",
    description: "Chartered Engineer status with the IET, the premier professional body for electrical engineers in the UK. Demonstrates your commitment to professional excellence and continuous development.",
    benefits: [
      "Professional recognition and status",
      "Access to IET technical resources and standards",
      "Networking opportunities with industry professionals",
      "Continuing Professional Development (CPD) support",
      "Career advancement opportunities",
      "Professional indemnity insurance discounts",
      "Access to IET Knowledge Network"
    ],
    requirements: [
      "Relevant electrical engineering qualification (Level 6+)",
      "Minimum 4 years relevant experience",
      "Demonstration of engineering competencies",
      "Professional review interview",
      "Commitment to CPD"
    ],
    careerImpact: "Opens doors to senior engineering roles, consultancy opportunities, and leadership positions",
    salaryIncrease: "£8,000-£15,000 average increase",
    renewalPeriod: "Annual membership renewal",
    studyMode: ["Self-directed", "Mentorship available"],
    locations: ["UK-wide", "International recognition"],
    nextIntake: "Rolling applications",
    applicationDeadline: "No fixed deadline",
    difficulty: "Advanced",
    popularity: 92,
    employerRecognition: "Highly valued by major contractors and consultancies",
    cpdPoints: "Requires 30 CPD hours annually"
  },
  {
    id: "niceic-approved",
    title: "NICEIC Approved Contractor",
    provider: "NICEIC",
    level: "Trade Certification",
    duration: "Assessment process: 4-6 weeks",
    cost: "£498-£998 (varies by scope)",
    format: "Technical Assessment",
    description: "Industry-leading electrical contractor certification scheme. Provides credibility and trust with customers while demonstrating compliance with electrical safety standards.",
    benefits: [
      "Enhanced business credibility and customer trust",
      "Marketing and promotional support",
      "Technical support helpline",
      "Insurance benefits and discounts",
      "Access to NICEIC training courses",
      "Quarterly technical updates",
      "Certificate of compliance for customers"
    ],
    requirements: [
      "Relevant electrical qualifications",
      "Public liability insurance (minimum £2M)",
      "Technical assessment of work quality",
      "Inspection of completed installations",
      "Ongoing assessment and monitoring"
    ],
    careerImpact: "Essential for independent contractors, significantly increases customer confidence",
    salaryIncrease: "£5,000-£12,000 for self-employed",
    renewalPeriod: "Annual renewal and assessment",
    studyMode: ["On-site assessment", "Practical demonstration"],
    locations: ["England", "Wales", "Northern Ireland"],
    nextIntake: "Rolling applications",
    applicationDeadline: "No fixed deadline",
    difficulty: "Intermediate",
    popularity: 87,
    employerRecognition: "Preferred contractor status with many clients",
    cpdPoints: "Includes ongoing professional development"
  },
  {
    id: "napit-certification",
    title: "NAPIT Electrical Certification",
    provider: "NAPIT",
    level: "Trade Certification",
    duration: "Assessment: 2-4 weeks",
    cost: "£445-£845 (varies by scope)",
    format: "Technical Assessment",
    description: "Comprehensive electrical certification scheme covering domestic, commercial, and industrial installations. Recognised alternative to NICEIC with strong industry reputation.",
    benefits: [
      "Business credibility and professional recognition",
      "Marketing materials and promotional support",
      "Technical advisory service",
      "Training course discounts",
      "Insurance scheme access",
      "Regular technical bulletins",
      "Customer complaint resolution service"
    ],
    requirements: [
      "Appropriate electrical qualifications",
      "Relevant experience in electrical installations",
      "Public liability insurance",
      "Initial technical assessment",
      "Sample work inspection"
    ],
    careerImpact: "Strong alternative to NICEIC, particularly popular in domestic sector",
    salaryIncrease: "£4,000-£10,000 for contractors",
    renewalPeriod: "Annual renewal",
    studyMode: ["Assessment-based", "Practical evaluation"],
    locations: ["UK-wide coverage"],
    nextIntake: "Rolling applications",
    applicationDeadline: "No fixed deadline",
    difficulty: "Intermediate",
    popularity: 78,
    employerRecognition: "Well-regarded by domestic and commercial clients",
    cpdPoints: "Ongoing competency requirements"
  },
  {
    id: "electrical-safety-first",
    title: "Electrical Safety First Certification",
    provider: "Electrical Safety First",
    level: "Safety Specialist",
    duration: "1-2 days training + assessment",
    cost: "£295-£495",
    format: "Training Course + Exam",
    description: "Specialist certification focusing on electrical safety in various environments. Ideal for safety officers, facilities managers, and electrical professionals working in high-risk environments.",
    benefits: [
      "Enhanced safety knowledge and awareness",
      "Improved risk assessment capabilities",
      "Professional safety credentials",
      "Reduced workplace incidents",
      "Insurance premium reductions",
      "CPD accreditation",
      "Safety management expertise"
    ],
    requirements: [
      "Basic electrical knowledge",
      "Workplace safety experience beneficial",
      "Attendance at training course",
      "Pass written examination",
      "Commitment to safety best practices"
    ],
    careerImpact: "Opens roles in safety management, facilities, and compliance",
    salaryIncrease: "£3,000-£8,000 in safety roles",
    renewalPeriod: "3 years",
    studyMode: ["Classroom", "Online", "Blended learning"],
    locations: ["Multiple UK training centres"],
    nextIntake: "Monthly courses",
    applicationDeadline: "Book 2 weeks in advance",
    difficulty: "Beginner",
    popularity: 71,
    employerRecognition: "Valued in industrial and commercial sectors",
    cpdPoints: "14 CPD hours"
  },
  {
    id: "compex-certification",
    title: "CompEx Certification (Ex 01-04)",
    provider: "CompEx",
    level: "Specialist Hazardous Areas",
    duration: "5 days intensive course",
    cost: "£1,200-£1,800",
    format: "Intensive Training + Examination",
    description: "Specialist certification for working in potentially explosive atmospheres. Essential for oil & gas, chemical, pharmaceutical, and other hazardous industries.",
    benefits: [
      "Access to high-paying specialist roles",
      "Work in oil & gas, petrochemical industries",
      "Enhanced safety competency",
      "International recognition",
      "Premium day rates for contractors",
      "Specialized technical knowledge",
      "Career progression in hazardous area work"
    ],
    requirements: [
      "Electrical qualification (Level 3 minimum)",
      "Relevant electrical experience",
      "Understanding of electrical fundamentals",
      "Pass all four module examinations",
      "Annual competency updates"
    ],
    careerImpact: "Opens high-value specialist roles in hazardous industries",
    salaryIncrease: "£15,000-£25,000+ in specialist roles",
    renewalPeriod: "Annual refresher required",
    studyMode: ["Intensive classroom", "Practical workshops"],
    locations: ["Aberdeen", "London", "Manchester", "International centres"],
    nextIntake: "Monthly courses available",
    applicationDeadline: "Book 4 weeks in advance",
    difficulty: "Advanced",
    popularity: 65,
    employerRecognition: "Essential for major oil & gas contractors",
    cpdPoints: "35 CPD hours"
  },
  {
    id: "pat-testing",
    title: "PAT Testing Certification",
    provider: "Various Providers (C&G, EAL)",
    level: "Specialist Testing",
    duration: "1-2 days",
    cost: "£150-£350",
    format: "Practical Training + Assessment",
    description: "Portable Appliance Testing certification enabling you to test and certify electrical appliances in commercial and domestic environments.",
    benefits: [
      "Additional income stream opportunity",
      "Flexible self-employed work",
      "Low startup costs for business",
      "High demand in commercial sector",
      "Recurring customer relationships",
      "Quick return on investment",
      "Complementary to electrical work"
    ],
    requirements: [
      "Basic electrical knowledge",
      "Understanding of electrical safety",
      "Practical assessment pass",
      "Equipment calibration knowledge",
      "Record keeping competency"
    ],
    careerImpact: "Excellent additional service for electrical contractors",
    salaryIncrease: "£2,000-£8,000 additional income",
    renewalPeriod: "3 years typical",
    studyMode: ["Practical training", "Hands-on assessment"],
    locations: ["Training centres nationwide"],
    nextIntake: "Weekly courses available",
    applicationDeadline: "Book 1 week in advance",
    difficulty: "Beginner",
    popularity: 84,
    employerRecognition: "High demand from facilities managers",
    cpdPoints: "7 CPD hours"
  }
];

const EnhancedProfessionalAccreditation = () => {
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  const toggleExpanded = (id: string) => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-500/10 text-green-400 border-green-500/30';
      case 'Intermediate': return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
      case 'Advanced': return 'bg-red-500/10 text-red-400 border-red-500/30';
      default: return 'bg-gray-500/10 text-gray-400 border-gray-500/30';
    }
  };

  const getPopularityStars = (popularity: number) => {
    const stars = Math.round(popularity / 20);
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-3 w-3 ${i < stars ? 'text-amber-400 fill-current' : 'text-gray-600'}`}
      />
    ));
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold flex items-center gap-2">
          <Award className="h-6 w-6 text-elec-yellow" />
          Professional Accreditations
        </h2>
        <p className="text-muted-foreground leading-relaxed">
          Professional accreditations are essential for career advancement in the electrical industry. 
          They demonstrate your expertise, open new opportunities, and can significantly increase your earning potential. 
          Choose accreditations that align with your career goals and specialization areas.
        </p>
      </div>

      {/* Quick Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="border-elec-yellow/20 bg-elec-gray/50">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-elec-yellow">{accreditationData.length}</div>
            <div className="text-xs text-muted-foreground">Available Paths</div>
          </CardContent>
        </Card>
        <Card className="border-elec-yellow/20 bg-elec-gray/50">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-elec-yellow">£150-£1.8k</div>
            <div className="text-xs text-muted-foreground">Investment Range</div>
          </CardContent>
        </Card>
        <Card className="border-elec-yellow/20 bg-elec-gray/50">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-elec-yellow">£25k+</div>
            <div className="text-xs text-muted-foreground">Max Salary Boost</div>
          </CardContent>
        </Card>
        <Card className="border-elec-yellow/20 bg-elec-gray/50">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-elec-yellow">95%</div>
            <div className="text-xs text-muted-foreground">Success Rate</div>
          </CardContent>
        </Card>
      </div>

      {/* Accreditation Cards */}
      <div className="space-y-4">
        {accreditationData.map((accreditation) => (
          <Card 
            key={accreditation.id} 
            className="border-elec-yellow/20 bg-elec-gray hover:bg-elec-gray/80 transition-all duration-200"
          >
            <CardHeader className="pb-4">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                <div className="flex-1 space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <CardTitle className="text-lg text-white">{accreditation.title}</CardTitle>
                    <Badge 
                      variant="outline" 
                      className={getDifficultyColor(accreditation.difficulty)}
                    >
                      {accreditation.difficulty}
                    </Badge>
                  </div>
                  <p className="text-amber-400 text-sm font-medium">{accreditation.provider}</p>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {accreditation.description}
                  </p>
                </div>

                <div className="flex flex-col items-end space-y-2">
                  <div className="flex items-center gap-1">
                    {getPopularityStars(accreditation.popularity)}
                    <span className="text-xs text-muted-foreground ml-1">
                      ({accreditation.popularity}%)
                    </span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => toggleExpanded(accreditation.id)}
                    className="border-elec-yellow/30 hover:bg-elec-yellow/10"
                  >
                    {expandedCard === accreditation.id ? (
                      <>
                        <ChevronUp className="h-4 w-4 mr-1" />
                        Less Info
                      </>
                    ) : (
                      <>
                        <ChevronDown className="h-4 w-4 mr-1" />
                        More Info
                      </>
                    )}
                  </Button>
                </div>
              </div>

              {/* Quick Info Row */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 text-xs">
                <div className="flex items-center gap-2">
                  <Clock className="h-3 w-3 text-elec-yellow" />
                  <span className="text-muted-foreground">{accreditation.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <PoundSterling className="h-3 w-3 text-elec-yellow" />
                  <span className="text-muted-foreground">{accreditation.cost}</span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-3 w-3 text-elec-yellow" />
                  <span className="text-muted-foreground">{accreditation.salaryIncrease}</span>
                </div>
                <div className="flex items-center gap-2">
                  <GraduationCap className="h-3 w-3 text-elec-yellow" />
                  <span className="text-muted-foreground">{accreditation.level}</span>
                </div>
              </div>
            </CardHeader>

            {expandedCard === accreditation.id && (
              <CardContent className="pt-0 space-y-6">
                <Separator className="bg-elec-yellow/20" />
                
                {/* Detailed Information Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Benefits Section */}
                  <div className="space-y-3">
                    <h4 className="font-medium text-amber-400 flex items-center gap-2">
                      <CheckCircle className="h-4 w-4" />
                      Key Benefits
                    </h4>
                    <ul className="space-y-2">
                      {accreditation.benefits.map((benefit, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm">
                          <CheckCircle className="h-3 w-3 text-green-400 mt-0.5 flex-shrink-0" />
                          <span className="text-muted-foreground">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Requirements Section */}
                  <div className="space-y-3">
                    <h4 className="font-medium text-amber-400 flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      Requirements
                    </h4>
                    <ul className="space-y-2">
                      {accreditation.requirements.map((requirement, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm">
                          <div className="h-3 w-3 bg-elec-yellow rounded-full mt-0.5 flex-shrink-0" />
                          <span className="text-muted-foreground">{requirement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Additional Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <h5 className="font-medium text-white text-sm">Career Impact</h5>
                    <p className="text-xs text-muted-foreground">{accreditation.careerImpact}</p>
                  </div>
                  <div className="space-y-2">
                    <h5 className="font-medium text-white text-sm">Employer Recognition</h5>
                    <p className="text-xs text-muted-foreground">{accreditation.employerRecognition}</p>
                  </div>
                  <div className="space-y-2">
                    <h5 className="font-medium text-white text-sm">CPD Value</h5>
                    <p className="text-xs text-muted-foreground">{accreditation.cpdPoints}</p>
                  </div>
                </div>

                {/* Application Information */}
                <Card className="border-elec-yellow/10 bg-elec-dark/30">
                  <CardContent className="p-4">
                    <h5 className="font-medium text-amber-400 mb-3 flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      Application Information
                    </h5>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                      <div>
                        <span className="text-muted-foreground">Next Intake:</span>
                        <div className="text-white font-medium">{accreditation.nextIntake}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Application Deadline:</span>
                        <div className="text-white font-medium">{accreditation.applicationDeadline}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Renewal:</span>
                        <div className="text-white font-medium">{accreditation.renewalPeriod}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Study Modes and Locations */}
                <div className="flex flex-wrap gap-4">
                  <div className="space-y-2">
                    <h5 className="font-medium text-white text-sm flex items-center gap-2">
                      <GraduationCap className="h-4 w-4" />
                      Study Modes
                    </h5>
                    <div className="flex flex-wrap gap-2">
                      {accreditation.studyMode.map((mode, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {mode}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h5 className="font-medium text-white text-sm flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      Locations
                    </h5>
                    <div className="flex flex-wrap gap-2">
                      {accreditation.locations.slice(0, 3).map((location, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {location}
                        </Badge>
                      ))}
                      {accreditation.locations.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{accreditation.locations.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            )}
          </Card>
        ))}
      </div>

      {/* Action Tips */}
      <Card className="border-elec-yellow/20 bg-elec-yellow/5">
        <CardContent className="p-6">
          <div className="flex items-start gap-3">
            <Info className="h-5 w-5 text-elec-yellow flex-shrink-0 mt-0.5" />
            <div className="space-y-3">
              <h3 className="font-medium text-amber-400">Getting Started with Professional Accreditations</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>
                  <strong>For New Electricians:</strong> Start with PAT Testing certification - it's affordable, 
                  quick to complete, and provides immediate income opportunities while building your experience.
                </p>
                <p>
                  <strong>For Experienced Electricians:</strong> Consider NICEIC or NAPIT certification to establish 
                  credibility as a contractor, followed by IET membership for professional recognition.
                </p>
                <p>
                  <strong>For Specialists:</strong> Pursue CompEx certification if you're interested in high-value 
                  hazardous area work, or Electrical Safety First for safety management roles.
                </p>
                <p>
                  <strong>Planning Tip:</strong> Many employers will fund relevant certifications. Discuss options 
                  with your employer before self-funding, and consider the ROI of each certification carefully.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EnhancedProfessionalAccreditation;
