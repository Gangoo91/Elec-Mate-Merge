
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
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
  AlertCircle
} from "lucide-react";

const KnowingYourWorthTab = () => {
  const [experience, setExperience] = useState("");
  const [location, setLocation] = useState("");
  const [qualification, setQualification] = useState("");

  const salaryRanges = [
    {
      level: "Apprentice Electrician",
      yearRange: "0-2 years",
      salaryRange: "£18,000 - £25,000",
      description: "Entry level with basic qualifications",
      icon: <GraduationCap className="h-5 w-5 text-green-400" />
    },
    {
      level: "Qualified Electrician",
      yearRange: "2-5 years",
      salaryRange: "£25,000 - £35,000",
      description: "Fully qualified with Level 3 and AM2",
      icon: <Award className="h-5 w-5 text-blue-400" />
    },
    {
      level: "Experienced Electrician",
      yearRange: "5-10 years",
      salaryRange: "£35,000 - £45,000",
      description: "Experienced with specialist skills",
      icon: <Star className="h-5 w-5 text-elec-yellow" />
    },
    {
      level: "Senior Electrician",
      yearRange: "10+ years",
      salaryRange: "£45,000 - £60,000+",
      description: "Senior role with leadership responsibilities",
      icon: <Users className="h-5 w-5 text-purple-400" />
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
    { skill: "18th Edition BS 7671", premium: "Essential", description: "Basic requirement for most roles" },
    { skill: "NICEIC/NAPIT Approval", premium: "+£2-5k", description: "Enables domestic/commercial work" },
    { skill: "Industrial Experience", premium: "+£3-8k", description: "High voltage, complex systems" },
    { skill: "Testing & Inspection", premium: "+£2-6k", description: "EICR and compliance work" },
    { skill: "Fire Alarm Systems", premium: "+£3-7k", description: "Specialist installation/maintenance" },
    { skill: "Solar/Renewable Energy", premium: "+£4-10k", description: "Growing market, high demand" },
    { skill: "Building Management Systems", premium: "+£5-12k", description: "Commercial building automation" },
    { skill: "HV Switching/Authorised Person", premium: "+£8-15k", description: "High voltage operations" }
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
      <Card className="border-elec-yellow/20 bg-gradient-to-r from-elec-gray to-elec-dark/50">
        <CardHeader>
          <div className="flex items-center gap-2">
            <PoundSterling className="h-6 w-6 text-elec-yellow" />
            <CardTitle className="text-elec-yellow">Know Your Worth - Electrical Salaries</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            Understanding your market value as an electrician. Get insights into salary ranges, 
            regional variations, and how your skills and experience translate to earning potential.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <Calculator className="h-6 w-6 text-green-400 mx-auto mb-2" />
              <div className="text-sm font-medium text-white mb-1">Salary Calculator</div>
              <div className="text-xs text-muted-foreground">Estimate your worth</div>
            </div>
            <div className="text-center">
              <MapPin className="h-6 w-6 text-blue-400 mx-auto mb-2" />
              <div className="text-sm font-medium text-white mb-1">Regional Data</div>
              <div className="text-xs text-muted-foreground">Location-based rates</div>
            </div>
            <div className="text-center">
              <TrendingUp className="h-6 w-6 text-purple-400 mx-auto mb-2" />
              <div className="text-sm font-medium text-white mb-1">Negotiation</div>
              <div className="text-xs text-muted-foreground">Professional guidance</div>
            </div>
            <div className="text-center">
              <Target className="h-6 w-6 text-red-400 mx-auto mb-2" />
              <div className="text-sm font-medium text-white mb-1">Career Growth</div>
              <div className="text-xs text-muted-foreground">Progression planning</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Salary Calculator */}
      <Card className="border-green-500/20 bg-green-500/5">
        <CardHeader>
          <CardTitle className="text-green-300 flex items-center gap-2">
            <Calculator className="h-5 w-5" />
            Quick Salary Estimator
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="text-sm font-medium text-white mb-2 block">Years of Experience</label>
              <Input
                type="number"
                placeholder="e.g. 5"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                className="bg-elec-dark border-elec-yellow/20 text-white"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-white mb-2 block">Location</label>
              <Input
                placeholder="e.g. London, Manchester"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="bg-elec-dark border-elec-yellow/20 text-white"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-white mb-2 block">Highest Qualification</label>
              <Input
                placeholder="e.g. Level 3, HND, Degree"
                value={qualification}
                onChange={(e) => setQualification(e.target.value)}
                className="bg-elec-dark border-elec-yellow/20 text-white"
              />
            </div>
          </div>
          
          <Button className="w-full md:w-auto bg-elec-yellow text-black hover:bg-elec-yellow/90">
            <Calculator className="h-4 w-4 mr-2" />
            Calculate My Worth
          </Button>
          
          {experience && (
            <div className="mt-4 p-4 bg-green-500/10 rounded-lg border border-green-500/20">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-4 w-4 text-green-400" />
                <span className="text-sm font-medium text-white">Estimated Salary Range</span>
              </div>
              <p className="text-lg font-bold text-green-400">
                £{Math.max(18000, 20000 + (parseInt(experience) * 3000)).toLocaleString()} - 
                £{Math.max(25000, 30000 + (parseInt(experience) * 4000)).toLocaleString()}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Based on {experience} years experience {location && `in ${location}`}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Salary Ranges by Experience */}
      <Card className="border-blue-500/20 bg-blue-500/5">
        <CardHeader>
          <CardTitle className="text-blue-300 flex items-center gap-2">
            <Briefcase className="h-5 w-5" />
            Salary Ranges by Experience Level
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {salaryRanges.map((range, index) => (
              <div key={index} className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {range.icon}
                    <h4 className="font-medium text-white text-sm">{range.level}</h4>
                  </div>
                  <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 text-xs">
                    {range.yearRange}
                  </Badge>
                </div>
                <p className="text-lg font-bold text-elec-yellow mb-1">{range.salaryRange}</p>
                <p className="text-xs text-muted-foreground">{range.description}</p>
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

      {/* Skill Premiums */}
      <Card className="border-amber-500/20 bg-amber-500/5">
        <CardHeader>
          <CardTitle className="text-amber-300 flex items-center gap-2">
            <Award className="h-5 w-5" />
            Skills & Qualification Premiums
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {skillPremiums.map((skill, index) => (
              <div key={index} className="p-3 bg-amber-500/10 rounded-lg border border-amber-500/20">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-white text-sm">{skill.skill}</h4>
                  <Badge className={`text-xs ${
                    skill.premium === "Essential" 
                      ? "bg-red-500/20 text-red-400 border-red-500/30" 
                      : "bg-amber-500/20 text-amber-400 border-amber-500/30"
                  }`}>
                    {skill.premium}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">{skill.description}</p>
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
    </div>
  );
};

export default KnowingYourWorthTab;
