
import BackButton from "@/components/common/BackButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Briefcase, Building, Zap, Users, Crown, Wrench, GraduationCap, Shield, Hammer } from "lucide-react";

const CareerPathways = () => {
  const careerPaths = [
    {
      title: "Qualified Electrician",
      timeframe: "2-4 years",
      description: "Complete your apprenticeship to become a fully qualified electrician capable of working independently on domestic and commercial installations",
      requirements: ["Complete Level 3 Electrical Installation NVQ", "Pass AM2 practical assessment", "Achieve 18th Edition BS 7671 certification", "Accumulate required on-the-job hours"],
      opportunities: ["Domestic rewires and installations", "Commercial lighting and power", "Industrial maintenance work", "Emergency call-out services", "Testing and inspection work"],
      salaryRange: "£28,000 - £38,000",
      progression: "Foundation for all other electrical career paths",
      icon: <Zap className="h-8 w-8 text-elec-yellow" />
    },
    {
      title: "Approved Electrician",
      timeframe: "3-5 years",
      description: "Gain approved status with registration schemes, enabling you to self-certify work and operate with greater independence",
      requirements: ["2+ years post-qualification experience", "Registration with approved scheme (NICEIC, NAPIT, etc.)", "Inspection & Testing qualification (2391)", "Professional indemnity insurance"],
      opportunities: ["Self-certification of electrical work", "Building Control notification", "Electrical Installation Condition Reports (EICRs)", "Portable Appliance Testing (PAT)", "Periodic inspection and testing"],
      salaryRange: "£32,000 - £45,000",
      progression: "Gateway to running your own electrical business",
      icon: <Shield className="h-8 w-8 text-elec-yellow" />
    },
    {
      title: "Specialist Electrician",
      timeframe: "3-6 years",
      description: "Develop expertise in specific areas of electrical work, commanding premium rates for specialist knowledge",
      requirements: ["Standard electrical qualifications", "Specialist training courses", "Manufacturer certifications", "Ongoing CPD in chosen speciality"],
      opportunities: ["Solar PV and renewable energy systems", "Electric vehicle charging installations", "Smart home automation systems", "Fire alarm and security systems", "Industrial automation and PLCs", "High voltage switching operations"],
      salaryRange: "£35,000 - £50,000",
      progression: "Lead to consultancy roles or specialist contracting",
      icon: <Wrench className="h-8 w-8 text-elec-yellow" />
    },
    {
      title: "Electrical Supervisor",
      timeframe: "5-8 years",
      description: "Lead teams of electricians on construction sites and oversee electrical installation projects",
      requirements: ["Extensive practical experience", "Leadership and communication skills", "Knowledge of construction processes", "Health and safety qualifications (SMSTS/SSSTS)"],
      opportunities: ["Site supervision on major projects", "Quality control and inspection", "Training and mentoring apprentices", "Liaison with other trades and management", "Project planning and coordination"],
      salaryRange: "£40,000 - £55,000",
      progression: "Move into project management or contract management",
      icon: <Users className="h-8 w-8 text-elec-yellow" />
    },
    {
      title: "Electrical Contractor",
      timeframe: "6-10 years",
      description: "Establish and run your own electrical contracting business, taking on projects and employing staff",
      requirements: ["Approved electrician status", "Business management skills", "Financial planning knowledge", "Public liability and employers' liability insurance", "Registration with trade bodies"],
      opportunities: ["Tender for commercial contracts", "Build long-term client relationships", "Employ and train apprentices", "Diversify into related services", "Expand into multiple service areas"],
      salaryRange: "£45,000 - £100,000+",
      progression: "Scale business operations or specialise in high-value sectors",
      icon: <Briefcase className="h-8 w-8 text-elec-yellow" />
    },
    {
      title: "Electrical Engineer",
      timeframe: "4-7 years",
      description: "Design electrical systems and work on complex engineering projects requiring technical expertise",
      requirements: ["Higher education (HNC/HND/Degree)", "Chartered Engineer status (CEng)", "Design software proficiency", "Knowledge of engineering standards"],
      opportunities: ["Electrical system design", "Power distribution planning", "Technical consultancy work", "Research and development projects", "Building services engineering"],
      salaryRange: "£40,000 - £65,000",
      progression: "Senior engineering roles or technical director positions",
      icon: <Building className="h-8 w-8 text-elec-yellow" />
    },
    {
      title: "Electrical Manager",
      timeframe: "8-12 years",
      description: "Manage electrical departments, oversee major projects, and make strategic business decisions",
      requirements: ["Extensive industry experience", "Management qualifications", "Strategic thinking abilities", "Understanding of business operations", "Leadership experience"],
      opportunities: ["Department management in large companies", "Strategic planning and budgeting", "Policy development and implementation", "Stakeholder management", "Business development activities"],
      salaryRange: "£55,000 - £85,000+",
      progression: "Executive roles or board-level positions",
      icon: <Crown className="h-8 w-8 text-elec-yellow" />
    },
    {
      title: "Electrical Trainer/Assessor",
      timeframe: "6-10 years",
      description: "Train the next generation of electricians in colleges, training centres, or through apprenticeship programmes",
      requirements: ["Teaching qualifications (PTLLS/CTLLS)", "Assessor qualifications (A1/D32/D33)", "Up-to-date technical knowledge", "Strong communication skills"],
      opportunities: ["College/university teaching", "Training centre instruction", "Apprenticeship delivery", "CPD course development", "Industry training consultancy"],
      salaryRange: "£35,000 - £50,000",
      progression: "Senior lecturer roles or training centre management",
      icon: <GraduationCap className="h-8 w-8 text-elec-yellow" />
    }
  ];

  const certificationBodies = [
    {
      name: "NICEIC",
      description: "Leading electrical registration body",
      benefits: ["Industry recognition", "Insurance backing", "Technical support"]
    },
    {
      name: "NAPIT",
      description: "Competent person scheme operator",
      benefits: ["Competitive fees", "Technical helpline", "Business support"]
    },
    {
      name: "ECA",
      description: "Trade association for electrical contractors",
      benefits: ["Networking opportunities", "Industry representation", "Business guidance"]
    },
    {
      name: "JIB",
      description: "Joint Industry Board for electrical industry",
      benefits: ["Grading system", "Training standards", "Employment terms"]
    }
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-fade-in">
      <div className="flex flex-col items-center justify-center mb-6">
        <h1 className="text-3xl font-bold tracking-tight mb-4">Electrical Career Progression Pathways</h1>
        <p className="text-muted-foreground text-center max-w-2xl mb-4">
          Explore comprehensive career paths in the UK electrical industry, from apprentice to senior management roles. 
          Each pathway shows typical progression times, salary ranges, and requirements specific to UK electrical professionals.
        </p>
        <BackButton customUrl="/apprentice/professional-development" label="Back to Professional Development" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {careerPaths.map((path, index) => (
          <Card key={index} className="border-elec-yellow/20 bg-elec-gray hover:border-elec-yellow/40 transition-all duration-300">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                {path.icon}
                <div className="flex-1">
                  <CardTitle className="text-xl text-elec-yellow">{path.title}</CardTitle>
                  <div className="flex gap-2 mt-1">
                    <Badge variant="outline" className="border-elec-yellow/40 text-elec-yellow">
                      {path.timeframe}
                    </Badge>
                    <Badge variant="outline" className="border-green-500/40 text-green-300">
                      {path.salaryRange}
                    </Badge>
                  </div>
                </div>
              </div>
              <p className="text-muted-foreground">{path.description}</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold text-white mb-2">Key Requirements:</h4>
                <ul className="space-y-1">
                  {path.requirements.map((req, reqIndex) => (
                    <li key={reqIndex} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <ArrowRight className="h-3 w-3 text-elec-yellow" />
                      {req}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-2">Career Opportunities:</h4>
                <ul className="space-y-1">
                  {path.opportunities.map((opp, oppIndex) => (
                    <li key={oppIndex} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <ArrowRight className="h-3 w-3 text-elec-yellow" />
                      {opp}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="border-t border-elec-yellow/10 pt-3">
                <h4 className="font-semibold text-white mb-1">Progression Route:</h4>
                <p className="text-xs text-muted-foreground">{path.progression}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-elec-yellow/20 bg-gradient-to-r from-elec-gray to-elec-dark/50">
        <CardHeader>
          <CardTitle className="text-elec-yellow">UK Electrical Industry Registration Bodies</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            To become an Approved Electrician in the UK, you'll need to register with one of these competent person schemes:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {certificationBodies.map((body, index) => (
              <div key={index} className="border border-elec-yellow/20 rounded-lg p-4">
                <h4 className="font-semibold text-white mb-2">{body.name}</h4>
                <p className="text-muted-foreground text-sm mb-3">{body.description}</p>
                <ul className="space-y-1">
                  {body.benefits.map((benefit, benefitIndex) => (
                    <li key={benefitIndex} className="text-xs text-muted-foreground flex items-start gap-2">
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
          <CardTitle className="text-elec-yellow">Planning Your Electrical Career Journey</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
            <div>
              <h4 className="font-semibold text-white mb-3">Years 1-3: Foundation Building</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Complete Level 3 apprenticeship</li>
                <li>• Pass AM2 practical assessment</li>
                <li>• Gain 18th Edition certification</li>
                <li>• Build practical experience</li>
                <li>• Develop core electrical skills</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-3">Years 3-7: Specialisation</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Achieve Approved Electrician status</li>
                <li>• Gain Inspection & Testing qualification</li>
                <li>• Choose specialist area of focus</li>
                <li>• Build professional network</li>
                <li>• Consider business ownership</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-3">Years 7+: Leadership & Growth</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Move into management roles</li>
                <li>• Develop business and leadership skills</li>
                <li>• Consider higher education options</li>
                <li>• Pursue consultancy opportunities</li>
                <li>• Mentor the next generation</li>
              </ul>
            </div>
          </div>
          <div className="mt-6 p-4 bg-elec-yellow/10 rounded-lg">
            <h4 className="font-semibold text-elec-yellow mb-2">Remember:</h4>
            <p className="text-muted-foreground text-sm">
              Career progression isn't always linear. Many successful electrical professionals combine multiple paths, 
              such as running a contracting business whilst also teaching part-time, or specialising in renewable energy 
              whilst maintaining general electrical skills. The key is continuous learning and adapting to industry changes.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CareerPathways;
