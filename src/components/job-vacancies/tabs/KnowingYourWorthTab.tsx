
import { useState, useEffect, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  PoundSterling, 
  TrendingUp, 
  MapPin, 
  Award, 
  Clock,
  Calculator,
  Target,
  Star,
  Users,
  Briefcase,
  GraduationCap,
  AlertCircle,
  Zap,
  Brain,
  BarChart3,
  TrendingDown,
  ArrowRight,
  Check,
  X,
  Lightbulb,
  MessageSquare,
  Gauge
} from "lucide-react";
import DetailedBreakdown from "./DetailedBreakdown";

const KnowingYourWorthTab = () => {
  // Enhanced state management
  const [experience, setExperience] = useState(2);
  const [location, setLocation] = useState("");
  const [qualification, setQualification] = useState("");
  const [specialisms, setSpecialisms] = useState<string[]>([]);
  const [companySize, setCompanySize] = useState("");
  const [contractType, setContractType] = useState("");
  const [currentSalary, setCurrentSalary] = useState("");
  const [skillsAssessment, setSkillsAssessment] = useState<Record<string, number>>({});
  const [showDetailedBreakdown, setShowDetailedBreakdown] = useState(false);

  // Smart salary calculation algorithm
  const calculateSalary = useMemo(() => {
    let baseSalary = 22000; // 2025 apprentice minimum
    let maxSalary = 28000;

    // Experience multiplier (enhanced for July 2025 market)
    if (experience <= 1) {
      baseSalary = 20000;
      maxSalary = 26000;
    } else if (experience <= 3) {
      baseSalary = 26000;
      maxSalary = 34000;
    } else if (experience <= 7) {
      baseSalary = 34000;
      maxSalary = 46000;
    } else if (experience <= 12) {
      baseSalary = 46000;
      maxSalary = 62000;
    } else {
      baseSalary = 62000;
      maxSalary = 85000;
    }

    // Location premium (updated for 2025 market conditions)
    const locationPremiums: Record<string, number> = {
      'london': 1.45,
      'cambridge': 1.35,
      'oxford': 1.30,
      'bristol': 1.25,
      'reading': 1.25,
      'manchester': 1.20,
      'birmingham': 1.15,
      'leeds': 1.15,
      'edinburgh': 1.20,
      'glasgow': 1.15,
      'cardiff': 1.10,
      'newcastle': 1.05,
      'liverpool': 1.10,
      'nottingham': 1.05,
      'sheffield': 1.00
    };

    const locationKey = location.toLowerCase();
    const locationMultiplier = Object.keys(locationPremiums).find(key => 
      locationKey.includes(key)
    ) ? locationPremiums[Object.keys(locationPremiums).find(key => locationKey.includes(key))!] : 1.0;

    // Qualification bonus
    const qualBonus = (() => {
      const qual = qualification.toLowerCase();
      if (qual.includes('degree') || qual.includes('hnd')) return 1.25;
      if (qual.includes('level 3') || qual.includes('nvq 3')) return 1.15;
      if (qual.includes('level 2') || qual.includes('nvq 2')) return 1.05;
      return 1.0;
    })();

    // Company size multiplier (new for 2025)
    const companySizeMultiplier = (() => {
      switch(companySize) {
        case 'startup': return 0.85;
        case 'small': return 0.95;
        case 'medium': return 1.05;
        case 'large': return 1.15;
        case 'enterprise': return 1.25;
        default: return 1.0;
      }
    })();

    // Contract type adjustment
    const contractMultiplier = (() => {
      switch(contractType) {
        case 'permanent': return 1.0;
        case 'contract': return 1.3;
        case 'freelance': return 1.5;
        default: return 1.0;
      }
    })();

    // Specialism premiums (updated for 2025 demand)
    const specialismBonus = specialisms.reduce((total, spec) => {
      const bonuses: Record<string, number> = {
        'renewable_energy': 8000,
        'ev_charging': 6000,
        'smart_home': 5000,
        'industrial_automation': 7000,
        'hv_switching': 12000,
        'fire_systems': 6000,
        'data_centres': 9000,
        'marine_offshore': 10000,
        'niceic_approved': 4000,
        'testing_inspection': 5000
      };
      return total + (bonuses[spec] || 0);
    }, 0);

    const finalBase = Math.round((baseSalary * locationMultiplier * qualBonus * companySizeMultiplier * contractMultiplier) + specialismBonus);
    const finalMax = Math.round((maxSalary * locationMultiplier * qualBonus * companySizeMultiplier * contractMultiplier) + specialismBonus);

    return { min: finalBase, max: finalMax, confidence: calculateConfidence() };
  }, [experience, location, qualification, specialisms, companySize, contractType]);

  const calculateConfidence = () => {
    let confidence = 60; // Base confidence
    if (location) confidence += 15;
    if (qualification) confidence += 10;
    if (specialisms.length > 0) confidence += 10;
    if (companySize) confidence += 5;
    return Math.min(confidence, 95);
  };

  const marketTrends2025 = [
    {
      trend: "EV Infrastructure Boom",
      impact: "+15-25%",
      description: "Electric vehicle charging point installations driving massive demand",
      urgency: "high",
      icon: <Zap className="h-4 w-4" />
    },
    {
      trend: "Heat Pump Installation",
      impact: "+10-20%",
      description: "Government net-zero targets creating new opportunities",
      urgency: "high",
      icon: <TrendingUp className="h-4 w-4" />
    },
    {
      trend: "Data Centre Expansion",
      impact: "+20-35%",
      description: "AI and cloud computing infrastructure growth",
      urgency: "medium",
      icon: <Brain className="h-4 w-4" />
    },
    {
      trend: "Smart Building Integration",
      impact: "+12-18%",
      description: "IoT and building automation systems integration",
      urgency: "medium",
      icon: <Lightbulb className="h-4 w-4" />
    }
  ];

  const salaryRanges = [
    {
      level: "Apprentice Electrician",
      yearRange: "0-2 years",
      salaryRange: "£20,000 - £28,000",
      description: "Entry level with 2025 minimum wage increases",
      icon: <GraduationCap className="h-5 w-5 text-green-400" />,
      growth: "+8% from 2024"
    },
    {
      level: "Qualified Electrician",
      yearRange: "2-5 years",
      salaryRange: "£28,000 - £42,000",
      description: "Fully qualified with Level 3, 18th Edition, AM2",
      icon: <Award className="h-5 w-5 text-blue-400" />,
      growth: "+12% from 2024"
    },
    {
      level: "Specialist Electrician",
      yearRange: "5-10 years",
      salaryRange: "£42,000 - £58,000",
      description: "Specialist skills in high-demand areas",
      icon: <Star className="h-5 w-5 text-elec-yellow" />,
      growth: "+15% from 2024"
    },
    {
      level: "Senior/Lead Electrician",
      yearRange: "10+ years",
      salaryRange: "£58,000 - £85,000+",
      description: "Leadership, project management, technical expertise",
      icon: <Users className="h-5 w-5 text-purple-400" />,
      growth: "+18% from 2024"
    }
  ];

  const regionalVariations = [
    { region: "London & South East", multiplier: "1.2-1.4x", premium: "20-40% above national average" },
    { region: "Scotland", multiplier: "1.1-1.2x", premium: "10-20% above national average" },
    { region: "North West", multiplier: "1.0-1.1x", premium: "National average to 10% above" },
    { region: "Midlands", multiplier: "0.9-1.0x", premium: "10% below to national average" },
    { region: "South West", multiplier: "0.9-1.0x", premium: "10% below to national average" },
    { region: "Wales & North East", multiplier: "0.8-0.9x", premium: "10-20% below national average" }
  ];

  const skillPremiums = [
    { skill: "18th Edition BS 7671", premium: "Essential", description: "Mandatory for all electrical work", demand: "critical" },
    { skill: "EV Charging Installation", premium: "+£6-12k", description: "Electric vehicle infrastructure - 2025 boom", demand: "very-high" },
    { skill: "Heat Pump Systems", premium: "+£5-10k", description: "Net-zero government targets driving demand", demand: "very-high" },
    { skill: "NICEIC/NAPIT Approval", premium: "+£4-8k", description: "Enables domestic/commercial certification", demand: "high" },
    { skill: "Data Centre/Server Rooms", premium: "+£8-15k", description: "AI and cloud infrastructure growth", demand: "very-high" },
    { skill: "Industrial Automation", premium: "+£6-12k", description: "Smart manufacturing and robotics", demand: "high" },
    { skill: "Testing & Inspection", premium: "+£4-8k", description: "EICR and compliance - always needed", demand: "high" },
    { skill: "Fire Alarm Systems", premium: "+£5-9k", description: "Complex building safety systems", demand: "medium" },
    { skill: "Solar/Battery Storage", premium: "+£7-14k", description: "Renewable energy and storage systems", demand: "very-high" },
    { skill: "Smart Home/IoT", premium: "+£4-8k", description: "Home automation and connectivity", demand: "high" },
    { skill: "HV Switching/AP", premium: "+£10-20k", description: "High voltage operations and safety", demand: "medium" },
    { skill: "Marine/Offshore", premium: "+£12-25k", description: "Offshore wind and marine installations", demand: "high" }
  ];

  const negotiationTips = [
    {
      category: "Research & Preparation",
      tips: [
        "Research company salary bands and recent job postings",
        "Document your qualifications, certifications, and achievements",
        "Prepare examples of value you've added in previous roles",
        "Know the local market rates for your experience level"
      ]
    },
    {
      category: "Negotiation Strategy",
      tips: [
        "Don't accept the first offer immediately - it's expected to negotiate",
        "Focus on total package including benefits, pension, overtime rates",
        "Consider asking for training budget or professional development",
        "Negotiate start date to allow proper notice period"
      ]
    },
    {
      category: "Beyond Base Salary",
      tips: [
        "Company van and fuel card can add £3-6k value annually",
        "Private healthcare and enhanced pension contributions",
        "Overtime rates - time and a half vs double time weekends",
        "Tool allowance and PPE provision"
      ]
    }
  ];

  return (
    <div className="space-y-6">
      {/* Enhanced Header with Market Intelligence */}
      <Card className="border-elec-yellow/20 bg-gradient-to-r from-elec-gray to-elec-dark/50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-elec-yellow/10 rounded-full -translate-y-16 translate-x-16"></div>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-elec-yellow/20 rounded-lg">
                <PoundSterling className="h-6 w-6 text-elec-yellow" />
              </div>
              <div>
                <CardTitle className="text-elec-yellow">Know Your Worth 2025</CardTitle>
                <p className="text-sm text-muted-foreground">AI-powered salary intelligence for electricians</p>
              </div>
            </div>
            <Badge className="bg-elec-yellow/20 text-elec-yellow border-elec-yellow/30">
              <Brain className="h-3 w-3 mr-1" />
              Smart Calculator
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-white/5 rounded-lg border border-white/10">
              <Calculator className="h-6 w-6 text-green-400 mx-auto mb-2" />
              <div className="text-sm font-medium text-white mb-1">Smart Calculator</div>
              <div className="text-xs text-muted-foreground">AI-powered estimation</div>
            </div>
            <div className="text-center p-3 bg-white/5 rounded-lg border border-white/10">
              <BarChart3 className="h-6 w-6 text-blue-400 mx-auto mb-2" />
              <div className="text-sm font-medium text-white mb-1">Market Data</div>
              <div className="text-xs text-muted-foreground">July 2025 insights</div>
            </div>
            <div className="text-center p-3 bg-white/5 rounded-lg border border-white/10">
              <TrendingUp className="h-6 w-6 text-purple-400 mx-auto mb-2" />
              <div className="text-sm font-medium text-white mb-1">Growth Trends</div>
              <div className="text-xs text-muted-foreground">Future projections</div>
            </div>
            <div className="text-center p-3 bg-white/5 rounded-lg border border-white/10">
              <MessageSquare className="h-6 w-6 text-red-400 mx-auto mb-2" />
              <div className="text-sm font-medium text-white mb-1">Negotiation</div>
              <div className="text-xs text-muted-foreground">Professional tips</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Interactive Smart Calculator */}
      <Card className="border-green-500/20 bg-gradient-to-br from-green-500/5 to-emerald-500/5">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-green-300 flex items-center gap-2">
              <Brain className="h-5 w-5" />
              Smart Salary Calculator
            </CardTitle>
            <div className="flex items-center gap-2">
              <Gauge className="h-4 w-4 text-green-400" />
              <span className="text-sm text-green-400">{calculateSalary.confidence}% confidence</span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Experience Slider */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-white">Years of Experience</label>
              <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                {experience} {experience === 1 ? 'year' : 'years'}
              </Badge>
            </div>
            <Slider
              value={[experience]}
              onValueChange={(value) => setExperience(value[0])}
              max={20}
              min={0}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Apprentice</span>
              <span>Qualified</span>
              <span>Experienced</span>
              <span>Senior</span>
            </div>
          </div>

          {/* Location and Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-white">Location</label>
              <Input
                placeholder="e.g. London, Manchester, Birmingham"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="bg-elec-dark border-green-500/20 focus:border-green-500/50"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-white">Highest Qualification</label>
              <Select value={qualification} onValueChange={setQualification}>
                <SelectTrigger className="bg-elec-dark border-green-500/20">
                  <SelectValue placeholder="Select qualification" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="level2">Level 2 NVQ</SelectItem>
                  <SelectItem value="level3">Level 3 NVQ</SelectItem>
                  <SelectItem value="hnd">HND Electrical</SelectItem>
                  <SelectItem value="degree">Electrical Engineering Degree</SelectItem>
                  <SelectItem value="other">Other/Equivalent</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-white">Company Size</label>
              <Select value={companySize} onValueChange={setCompanySize}>
                <SelectTrigger className="bg-elec-dark border-green-500/20">
                  <SelectValue placeholder="Select company size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="startup">Startup (1-10 employees)</SelectItem>
                  <SelectItem value="small">Small (11-50 employees)</SelectItem>
                  <SelectItem value="medium">Medium (51-250 employees)</SelectItem>
                  <SelectItem value="large">Large (251-1000 employees)</SelectItem>
                  <SelectItem value="enterprise">Enterprise (1000+ employees)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-white">Contract Type</label>
              <Select value={contractType} onValueChange={setContractType}>
                <SelectTrigger className="bg-elec-dark border-green-500/20">
                  <SelectValue placeholder="Select contract type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="permanent">Permanent Employee</SelectItem>
                  <SelectItem value="contract">Fixed-term Contract</SelectItem>
                  <SelectItem value="freelance">Freelance/Self-employed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Specialisms */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-white">Specialisms & Certifications</label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {[
                { id: 'renewable_energy', label: 'Renewable Energy' },
                { id: 'ev_charging', label: 'EV Charging' },
                { id: 'smart_home', label: 'Smart Home' },
                { id: 'industrial_automation', label: 'Industrial Auto' },
                { id: 'hv_switching', label: 'HV Switching' },
                { id: 'fire_systems', label: 'Fire Systems' },
                { id: 'data_centres', label: 'Data Centres' },
                { id: 'marine_offshore', label: 'Marine/Offshore' },
                { id: 'niceic_approved', label: 'NICEIC Approved' },
                { id: 'testing_inspection', label: 'Testing & Inspection' }
              ].map((spec) => (
                <div key={spec.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={spec.id}
                    checked={specialisms.includes(spec.id)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSpecialisms([...specialisms, spec.id]);
                      } else {
                        setSpecialisms(specialisms.filter(s => s !== spec.id));
                      }
                    }}
                  />
                  <label
                    htmlFor={spec.id}
                    className="text-xs text-white cursor-pointer"
                  >
                    {spec.label}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Results */}
          <div className="space-y-4">
            <div className="p-6 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-lg border border-green-500/20">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-green-400" />
                  <span className="font-medium text-white">Your Estimated Salary Range</span>
                </div>
                <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                  2025 Market Rate
                </Badge>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="text-center p-4 bg-green-500/10 rounded-lg">
                  <div className="text-sm text-muted-foreground mb-1">Minimum Expected</div>
                  <div className="text-2xl font-bold text-green-400">
                    £{calculateSalary.min.toLocaleString()}
                  </div>
                </div>
                <div className="text-center p-4 bg-emerald-500/10 rounded-lg">
                  <div className="text-sm text-muted-foreground mb-1">Maximum Potential</div>
                  <div className="text-2xl font-bold text-emerald-400">
                    £{calculateSalary.max.toLocaleString()}
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Confidence Level</span>
                  <span className="text-green-400">{calculateSalary.confidence}%</span>
                </div>
                <Progress value={calculateSalary.confidence} className="h-2" />
              </div>

              <div className="mt-4 p-3 bg-white/5 rounded border border-white/10">
                <div className="flex items-start gap-2">
                  <Lightbulb className="h-4 w-4 text-yellow-400 mt-0.5" />
                  <div className="text-xs text-muted-foreground">
                    <strong className="text-white">Confidence factors:</strong> {' '}
                    {location ? '✓ Location specified' : '• Add location for better accuracy'}{', '}
                    {qualification ? '✓ Qualification provided' : '• Add qualification'}{', '}
                    {specialisms.length > 0 ? `✓ ${specialisms.length} specialisms` : '• Add specialisms for premium calculation'}
                  </div>
                </div>
              </div>
            </div>

            <Button 
              onClick={() => setShowDetailedBreakdown(!showDetailedBreakdown)}
              variant="outline"
              className="w-full border-green-500/20 hover:bg-green-500/10"
            >
              {showDetailedBreakdown ? 'Hide' : 'Show'} Detailed Breakdown
              <ArrowRight className={`h-4 w-4 ml-2 transition-transform ${showDetailedBreakdown ? 'rotate-90' : ''}`} />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* 2025 Market Trends */}
      <Card className="border-cyan-500/20 bg-gradient-to-br from-cyan-500/5 to-blue-500/5">
        <CardHeader>
          <CardTitle className="text-cyan-300 flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            2025 Market Intelligence
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {marketTrends2025.map((trend, index) => (
              <div key={index} className="p-4 bg-cyan-500/10 rounded-lg border border-cyan-500/20 hover:border-cyan-500/40 transition-colors">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    {trend.icon}
                    <h4 className="font-medium text-white text-sm">{trend.trend}</h4>
                  </div>
                  <Badge className={`text-xs ${
                    trend.urgency === 'high' 
                      ? 'bg-red-500/20 text-red-400 border-red-500/30' 
                      : 'bg-amber-500/20 text-amber-400 border-amber-500/30'
                  }`}>
                    {trend.urgency === 'high' ? 'Hot' : 'Rising'}
                  </Badge>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-lg font-bold text-cyan-400">{trend.impact}</span>
                  <TrendingUp className="h-4 w-4 text-green-400" />
                </div>
                <p className="text-xs text-muted-foreground">{trend.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Salary Ranges */}
      <Card className="border-blue-500/20 bg-gradient-to-br from-blue-500/5 to-indigo-500/5">
        <CardHeader>
          <CardTitle className="text-blue-300 flex items-center gap-2">
            <Briefcase className="h-5 w-5" />
            2025 Salary Ranges by Experience Level
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {salaryRanges.map((range, index) => (
              <div key={index} className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/20 hover:border-blue-500/40 transition-all hover:shadow-lg hover:shadow-blue-500/10">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    {range.icon}
                    <h4 className="font-medium text-white text-sm">{range.level}</h4>
                  </div>
                  <div className="flex gap-2">
                    <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 text-xs">
                      {range.yearRange}
                    </Badge>
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">
                      {range.growth}
                    </Badge>
                  </div>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-lg font-bold text-elec-yellow">{range.salaryRange}</p>
                  <TrendingUp className="h-4 w-4 text-green-400" />
                </div>
                <p className="text-xs text-muted-foreground">{range.description}</p>
                
                {index === Math.floor(experience / 5) && (
                  <div className="mt-2 p-2 bg-elec-yellow/10 rounded border border-elec-yellow/20">
                    <div className="flex items-center gap-1">
                      <Target className="h-3 w-3 text-elec-yellow" />
                      <span className="text-xs text-elec-yellow font-medium">Your Level</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Regional Variations */}
      <Card className="border-purple-500/20 bg-purple-500/5">
        <CardHeader>
          <CardTitle className="text-purple-300 flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Regional Salary Variations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {regionalVariations.map((region, index) => (
              <div key={index} className="p-3 bg-purple-500/10 rounded-lg border border-purple-500/20">
                <h4 className="font-medium text-white text-sm mb-1">{region.region}</h4>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-purple-400">{region.multiplier}</span>
                  <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30 text-xs">
                    Regional
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">{region.premium}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Skills & Premiums */}
      <Card className="border-amber-500/20 bg-gradient-to-br from-amber-500/5 to-orange-500/5">
        <CardHeader>
          <CardTitle className="text-amber-300 flex items-center gap-2">
            <Award className="h-5 w-5" />
            High-Demand Skills & Salary Premiums
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {skillPremiums.map((skill, index) => (
              <div key={index} className="p-4 bg-amber-500/10 rounded-lg border border-amber-500/20 hover:border-amber-500/40 transition-all hover:shadow-lg hover:shadow-amber-500/10">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-white text-sm">{skill.skill}</h4>
                  <div className="flex gap-2">
                    <Badge className={`text-xs ${
                      skill.premium === "Essential" 
                        ? "bg-red-500/20 text-red-400 border-red-500/30" 
                        : "bg-amber-500/20 text-amber-400 border-amber-500/30"
                    }`}>
                      {skill.premium}
                    </Badge>
                    <Badge className={`text-xs ${
                      skill.demand === "very-high" 
                        ? "bg-red-500/20 text-red-400 border-red-500/30" 
                        : skill.demand === "high"
                        ? "bg-orange-500/20 text-orange-400 border-orange-500/30"
                        : skill.demand === "medium"
                        ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                        : "bg-gray-500/20 text-gray-400 border-gray-500/30"
                    }`}>
                      {skill.demand === "very-high" ? "🔥 Very High" : 
                       skill.demand === "high" ? "📈 High" : 
                       skill.demand === "medium" ? "📊 Medium" : "Critical"}
                    </Badge>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mb-2">{skill.description}</p>
                
                {specialisms.includes(skill.skill.toLowerCase().replace(/[^a-z0-9]/g, '_').replace(/_+/g, '_').replace(/^_|_$/g, '')) && (
                  <div className="flex items-center gap-1 text-xs text-green-400">
                    <Check className="h-3 w-3" />
                    <span>Added to your profile</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Negotiation Tips */}
      <Card className="border-red-500/20 bg-red-500/5">
        <CardHeader>
          <CardTitle className="text-red-300 flex items-center gap-2">
            <Target className="h-5 w-5" />
            Salary Negotiation Tips
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {negotiationTips.map((category, index) => (
              <div key={index} className="space-y-3">
                <h4 className="font-medium text-white">{category.category}</h4>
                <div className="space-y-2">
                  {category.tips.map((tip, tipIndex) => (
                    <div key={tipIndex} className="p-2 bg-red-500/10 rounded border border-red-500/20">
                      <p className="text-xs text-muted-foreground flex items-start gap-2">
                        <AlertCircle className="h-3 w-3 text-red-400 mt-0.5 flex-shrink-0" />
                        {tip}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Detailed Breakdown */}
      {showDetailedBreakdown && (
        <DetailedBreakdown
          experience={experience}
          location={location}
          qualification={qualification}
          specialisms={specialisms}
          companySize={companySize}
          contractType={contractType}
          salaryCalculation={calculateSalary}
        />
      )}
    </div>
  );
};

export default KnowingYourWorthTab;
