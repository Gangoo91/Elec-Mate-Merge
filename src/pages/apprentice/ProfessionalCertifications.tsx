
import BackButton from "@/components/common/BackButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award, Clock, BookOpen, CheckCircle, Zap, Shield, Home, Building, Users, Car, Flame, Sun } from "lucide-react";

const ProfessionalCertifications = () => {
  const certifications = [
    {
      title: "18th Edition BS 7671 (IET Wiring Regulations)",
      provider: "Various City & Guilds Approved Centres",
      duration: "3-5 days intensive or part-time",
      cost: "£300-£500",
      description: "Essential qualification covering current UK wiring regulations - legally required for all electrical work",
      requirements: ["Basic electrical knowledge", "Previous electrical experience preferred", "Must be renewed every 3-5 years"],
      benefits: ["Legal requirement for electrical installations", "Industry standard qualification", "Foundation for career progression", "Required by all registration schemes"],
      icon: <BookOpen className="h-6 w-6 text-elec-yellow" />,
      category: "Essential",
      code: "2382-18"
    },
    {
      title: "Inspection & Testing (2391-52)",
      provider: "City & Guilds / EAL Centres",
      duration: "5 days + practical assessment",
      cost: "£800-£1,200",
      description: "Enables you to inspect, test and certify electrical installations - essential for EICR work",
      requirements: ["Level 3 Electrical Installation", "AM2 or equivalent practical experience", "18th Edition certification", "Minimum 2 years experience"],
      benefits: ["Issue Electrical Installation Condition Reports", "Higher earning potential (£200-£400 per EICR)", "Work independently", "Required for Approved Electrician status"],
      icon: <CheckCircle className="h-6 w-6 text-elec-yellow" />,
      category: "Advanced",
      code: "2391-52"
    },
    {
      title: "Initial Verification & Certification (2394/95)",
      provider: "City & Guilds Centres",
      duration: "3-4 days",
      cost: "£600-£800",
      description: "Qualify to test and commission new electrical installations and issue completion certificates",
      requirements: ["Level 3 electrical qualification", "Understanding of testing procedures", "18th Edition knowledge"],
      benefits: ["Test new installations", "Issue installation certificates", "Work on new build projects", "Commercial opportunities"],
      icon: <Award className="h-6 w-6 text-elec-yellow" />,
      category: "Advanced",
      code: "2394/95"
    },
    {
      title: "PAT Testing Certification",
      provider: "Various Training Providers",
      duration: "1-2 days",
      cost: "£200-£400",
      description: "Portable Appliance Testing - inspect and test electrical equipment in workplaces",
      requirements: ["Basic electrical knowledge", "Understanding of electrical safety", "No formal qualifications required"],
      benefits: ["Additional income stream (£2-5 per test)", "Regular contract work", "Low equipment investment", "Flexible working arrangements"],
      icon: <Zap className="h-6 w-6 text-elec-yellow" />,
      category: "Specialist",
      code: "PAT"
    },
    {
      title: "Fire Alarm Systems (FIA BS 5839)",
      provider: "Fire Industry Association",
      duration: "3-5 days per category",
      cost: "£800-£1,500",
      description: "Design, install, commission and maintain fire detection and alarm systems",
      requirements: ["Electrical qualification", "Understanding of fire safety regulations", "Knowledge of BS 5839 standards"],
      benefits: ["High-value specialist market", "Recurring maintenance contracts", "Commercial and industrial sectors", "Premium day rates (£250-400)"],
      icon: <Flame className="h-6 w-6 text-elec-yellow" />,
      category: "Specialist",
      code: "FIA"
    },
    {
      title: "Smart Home & Building Automation",
      provider: "KNX / Lutron / Control4 Training",
      duration: "2-5 days per system",
      cost: "£500-£2,000",
      description: "Install and programme intelligent building systems including lighting, heating, security and audio-visual",
      requirements: ["Electrical qualification", "IT understanding helpful", "Problem-solving skills", "Customer service focus"],
      benefits: ["Growing luxury market", "Premium pricing potential", "Technology integration skills", "Future-proof specialisation"],
      icon: <Home className="h-6 w-6 text-elec-yellow" />,
      category: "Emerging",
      code: "KNX/BA"
    },
    {
      title: "Solar PV Installation (MCS Certification)",
      provider: "Various MCS Approved Training Centres",
      duration: "3-5 days + assessment",
      cost: "£800-£1,500",
      description: "Install solar photovoltaic systems and qualify for government green energy schemes",
      requirements: ["Level 3 electrical qualification", "Working at height certification", "Understanding of grid connection", "MCS registration"],
      benefits: ["Growing renewable energy market", "Government scheme access", "Environmental benefits", "Installation rates £150-200/kWp"],
      icon: <Sun className="h-6 w-6 text-elec-yellow" />,
      category: "Green Energy",
      code: "MCS PV"
    },
    {
      title: "Electric Vehicle Charging Points",
      provider: "Various EV Training Providers",
      duration: "2-3 days",
      cost: "£400-£800",
      description: "Install and maintain electric vehicle charging infrastructure for domestic and commercial use",
      requirements: ["Electrical qualification", "Understanding of charging standards", "Knowledge of OLEV grant schemes"],
      benefits: ["Rapidly expanding market", "Government grant schemes", "Domestic and commercial opportunities", "Future transport infrastructure"],
      icon: <Car className="h-6 w-6 text-elec-yellow" />,
      category: "Emerging",
      code: "EV CP"
    },
    {
      title: "Electrician's Health & Safety (CompEx)",
      provider: "CompEx Scheme Operators",
      duration: "2-5 days depending on modules",
      cost: "£300-£800",
      description: "Work safely in potentially explosive atmospheres - essential for oil, gas, chemical industries",
      requirements: ["Electrical qualification", "Understanding of hazardous area classification", "Medical fitness certificate"],
      benefits: ["Access to high-paying industrial work", "Oil and gas industry opportunities", "Offshore work possibilities", "Premium rates £300-500/day"],
      icon: <Shield className="h-6 w-6 text-elec-yellow" />,
      category: "Specialist",
      code: "CompEx"
    },
    {
      title: "Teaching & Training Qualifications",
      provider: "Further Education Colleges",
      duration: "Part-time over 1-2 years",
      cost: "£1,500-£3,000",
      description: "Become a qualified electrical trainer or assessor in colleges or training centres",
      requirements: ["Substantial electrical experience", "Current industry knowledge", "Communication skills", "Commitment to education"],
      benefits: ["Career change opportunity", "Share knowledge and experience", "Regular hours and holidays", "Job security in education sector"],
      icon: <Users className="h-6 w-6 text-elec-yellow" />,
      category: "Alternative",
      code: "PTLLS/CTLLS"
    }
  ];

  const categoryColors = {
    "Essential": "bg-red-500/20 text-red-300 border-red-500/30",
    "Advanced": "bg-blue-500/20 text-blue-300 border-blue-500/30",
    "Specialist": "bg-purple-500/20 text-purple-300 border-purple-500/30",
    "Emerging": "bg-green-500/20 text-green-300 border-green-500/30",
    "Green Energy": "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
    "Alternative": "bg-orange-500/20 text-orange-300 border-orange-500/30"
  };

  const registrationSchemes = [
    {
      name: "NICEIC",
      cpdHours: "20 hours annually",
      focus: "Technical competence and business standards",
      benefits: ["Industry leading reputation", "Technical support helpline", "Marketing support", "Insurance backing"]
    },
    {
      name: "NAPIT",
      cpdHours: "20 hours annually",
      focus: "Competent person scheme registration",
      benefits: ["Competitive membership fees", "Online CPD tracking", "Technical guidance", "Business development support"]
    },
    {
      name: "ECA",
      cpdHours: "20 hours annually",
      focus: "Trade association membership",
      benefits: ["Industry representation", "Networking events", "Business guidance", "Training discounts"]
    },
    {
      name: "SELECT (Scotland)",
      cpdHours: "20 hours annually",
      focus: "Scottish electrical contractors",
      benefits: ["Regional focus", "Scottish Building Standards", "Local networking", "Government liaison"]
    }
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-fade-in">
      <div className="flex flex-col items-center justify-center mb-6">
        <h1 className="text-3xl font-bold tracking-tight mb-4">Professional Electrical Certifications</h1>
        <p className="text-muted-foreground text-center max-w-2xl mb-4">
          Advance your electrical career with industry-recognised qualifications. These certifications open new opportunities, 
          increase earning potential, and demonstrate professional competence to clients and employers.
        </p>
        <BackButton customUrl="/apprentice/professional-development" label="Back to Professional Development" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {certifications.map((cert, index) => (
          <Card key={index} className="border-elec-yellow/20 bg-elec-gray hover:border-elec-yellow/40 transition-all duration-300">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  {cert.icon}
                  <div>
                    <CardTitle className="text-lg text-elec-yellow">{cert.title}</CardTitle>
                    <div className="flex items-center gap-2 mt-1">
                      <p className="text-sm text-muted-foreground">{cert.provider}</p>
                      <Badge variant="outline" className="border-elec-yellow/40 text-elec-yellow text-xs">
                        {cert.code}
                      </Badge>
                    </div>
                  </div>
                </div>
                <Badge className={categoryColors[cert.category as keyof typeof categoryColors]}>
                  {cert.category}
                </Badge>
              </div>
              <p className="text-muted-foreground text-sm">{cert.description}</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-elec-yellow" />
                  <span className="text-muted-foreground">{cert.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="h-4 w-4 text-elec-yellow" />
                  <span className="text-muted-foreground">{cert.cost}</span>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-white mb-2">Entry Requirements:</h4>
                <ul className="space-y-1">
                  {cert.requirements.map((req, reqIndex) => (
                    <li key={reqIndex} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="text-elec-yellow">•</span>
                      {req}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-white mb-2">Career Benefits:</h4>
                <ul className="space-y-1">
                  {cert.benefits.map((benefit, benefitIndex) => (
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
          <CardTitle className="text-elec-yellow">UK Registration Scheme Requirements</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            To maintain your registration with UK competent person schemes, you must complete continuing professional development (CPD):
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {registrationSchemes.map((scheme, index) => (
              <div key={index} className="border border-elec-yellow/20 rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold text-white">{scheme.name}</h4>
                  <Badge variant="outline" className="border-elec-yellow/40 text-elec-yellow text-xs">
                    {scheme.cpdHours}
                  </Badge>
                </div>
                <p className="text-muted-foreground text-sm mb-3">{scheme.focus}</p>
                <ul className="space-y-1">
                  {scheme.benefits.map((benefit, benefitIndex) => (
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
          <CardTitle className="text-elec-yellow">Certification Strategy for Electrical Apprentices</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-white mb-3">Priority Order for New Electricians:</h4>
              <ol className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow font-bold">1.</span>
                  Complete Level 3 Electrical Installation NVQ diploma
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow font-bold">2.</span>
                  Pass AM2 practical assessment for JIB Gold Card
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow font-bold">3.</span>
                  Achieve 18th Edition BS 7671 certification
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow font-bold">4.</span>
                  Gain 2 years post-qualification experience
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow font-bold">5.</span>
                  Complete Inspection & Testing (2391-52) qualification
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow font-bold">6.</span>
                  Register with competent person scheme (NICEIC/NAPIT)
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow font-bold">7.</span>
                  Choose specialist areas based on market demand
                </li>
              </ol>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-3">Financial Planning Considerations:</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  Many employers fund essential qualifications (18th Edition, 2391)
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  Check apprenticeship levy funding eligibility
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  Calculate return on investment - 2391 can increase earnings by £8,000-£12,000 annually
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  Training costs may qualify for tax relief as business expense
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  Some courses offer payment plans or employer partnerships
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  Consider timing to spread costs over tax years
                </li>
              </ul>
              
              <div className="mt-4 p-3 bg-elec-yellow/10 rounded-lg">
                <h5 className="font-semibold text-elec-yellow mb-2">Investment Tip:</h5>
                <p className="text-xs text-muted-foreground">
                  The average Approved Electrician earns £10,000-£15,000 more annually than a standard electrician. 
                  The initial investment of £2,000-£3,000 in qualifications typically pays for itself within 6-12 months.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfessionalCertifications;
