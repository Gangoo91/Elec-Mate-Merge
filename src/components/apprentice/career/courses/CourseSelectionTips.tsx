
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb, Target, TrendingUp, Award, Clock, PoundSterling, MapPin, Users, BookOpen, Search, Calculator, Shield } from "lucide-react";

const CourseSelectionTips = () => {
  const tips = [
    {
      icon: Target,
      title: "Align with Career Goals",
      description: "Choose courses that directly support your career progression plans. Consider specialist areas like industrial, commercial, or domestic work. Research salary expectations for each path and match courses to desired outcomes. Speak to professionals in your target field for insider advice."
    },
    {
      icon: TrendingUp,
      title: "Future-Proof Your Skills",
      description: "Prioritise emerging technologies like EV charging (£35-50k annually), smart home systems, renewable energy, and energy storage. These sectors are experiencing 40%+ growth annually. Consider IoT, automation, and sustainable energy courses for maximum future earning potential."
    },
    {
      icon: Award,
      title: "Check Accreditations",
      description: "Ensure courses are recognised by NICEIC, ECA, SELECT, City & Guilds, EAL, or JIB. Verify if the qualification counts towards your JIB grading. Look for courses that include competency assessments and portfolio building. Some employers only recognise specific awarding bodies."
    },
    {
      icon: Clock,
      title: "Consider Timing & Format",
      description: "Balance course duration with work commitments. Evening classes (6-9pm), weekend intensive courses, or online hybrid learning are available. Block release courses may suit some employers. Factor in travel time to training centres and practical session requirements."
    },
    {
      icon: PoundSterling,
      title: "Funding & Employer Support",
      description: "Many employers offer funding through apprenticeship levy (£15k+ available). Check for government grants, skills bootcamps, or sector-specific funding. Some courses qualify for career development loans. Negotiate with employers for study leave and expense coverage."
    },
    {
      icon: Search,
      title: "Research Training Providers",
      description: "Compare course quality, pass rates, and industry connections. Read reviews from recent students and check employment outcomes. Visit facilities to assess equipment quality. Ask about instructor experience and industry links. Some providers offer job placement assistance."
    },
    {
      icon: Calculator,
      title: "Calculate Return on Investment",
      description: "Compare course costs against potential salary increases. Entry-level courses (£500-2000) can lead to £3-5k salary jumps. Specialist qualifications (£2-5k) often result in £8-15k increases. Factor in travel costs, time off work, and materials when budgeting."
    },
    {
      icon: Users,
      title: "Network & Learn from Peers",
      description: "Join course-related forums, LinkedIn groups, and professional associations. Connect with fellow students for study groups and future job opportunities. Many courses include industry networking events. Build relationships with instructors who often have industry connections."
    }
  ];

  const costGuidance = [
    {
      category: "Entry Level (Level 2)",
      cost: "£500 - £2,000",
      duration: "6-12 months",
      outcome: "Start as trainee, £18-22k salary"
    },
    {
      category: "Intermediate (Level 3)",
      cost: "£1,500 - £4,000", 
      duration: "12-24 months",
      outcome: "Qualified electrician, £25-35k salary"
    },
    {
      category: "Specialist Courses",
      cost: "£800 - £3,000 per course",
      duration: "1-6 months",
      outcome: "£3-8k salary increase per specialism"
    }
  ];

  const qualityIndicators = [
    "Industry-standard equipment and facilities",
    "Qualified instructors with recent industry experience", 
    "High pass rates (80%+ for practical assessments)",
    "Strong employer links and job placement support",
    "Up-to-date curriculum reflecting current regulations",
    "Good student reviews and graduate employment rates"
  ];

  return (
    <div className="space-y-6 sm:space-y-8">
      <Card className="border-elec-yellow/20 bg-elec-card">
        <CardHeader className="pb-4 sm:pb-6">
          <CardTitle className="flex items-center gap-3 text-xl sm:text-2xl text-white">
            <Lightbulb className="h-6 w-6 sm:h-7 sm:w-7 text-elec-yellow" />
            Course Selection Tips
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {tips.map((tip, idx) => (
              <div key={idx} className="p-4 sm:p-5 bg-elec-dark/40 rounded-lg border border-elec-yellow/20 hover:border-elec-yellow/30 transition-colors">
                <div className="flex items-start gap-3 sm:gap-4">
                  <tip.icon className="h-6 w-6 sm:h-7 sm:w-7 text-elec-yellow flex-shrink-0 mt-0.5" />
                  <div className="space-y-2 sm:space-y-3">
                    <h4 className="font-semibold text-sm sm:text-base text-white">{tip.title}</h4>
                    <p className="text-xs sm:text-sm text-white leading-relaxed">{tip.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Cost Guidance Section */}
      <Card className="border-elec-yellow/20 bg-elec-card">
        <CardHeader className="pb-4 sm:pb-6">
          <CardTitle className="flex items-center gap-3 text-lg sm:text-xl text-white">
            <Calculator className="h-5 w-5 sm:h-6 sm:w-6 text-elec-yellow" />
            Course Cost Guidance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {costGuidance.map((item, idx) => (
              <div key={idx} className="p-4 sm:p-5 bg-elec-dark/30 rounded-lg border border-elec-yellow/10">
                <div className="space-y-3">
                  <h4 className="font-semibold text-sm sm:text-base text-elec-yellow">{item.category}</h4>
                  <div className="space-y-2 text-xs sm:text-sm text-white">
                    <p><span className="font-medium">Cost:</span> {item.cost}</p>
                    <p><span className="font-medium">Duration:</span> {item.duration}</p>
                    <p><span className="font-medium">Outcome:</span> {item.outcome}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quality Indicators Section */}
      <Card className="border-elec-yellow/20 bg-elec-card">
        <CardHeader className="pb-4 sm:pb-6">
          <CardTitle className="flex items-center gap-3 text-lg sm:text-xl text-white">
            <Shield className="h-5 w-5 sm:h-6 sm:w-6 text-elec-yellow" />
            Quality Indicators to Look For
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {qualityIndicators.map((indicator, idx) => (
              <div key={idx} className="flex items-start gap-3 p-3 sm:p-4 bg-elec-dark/30 rounded-lg">
                <div className="w-2 h-2 bg-elec-yellow rounded-full flex-shrink-0 mt-2"></div>
                <p className="text-xs sm:text-sm text-white leading-relaxed">{indicator}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
        
      {/* Enhanced Industry Insight */}
      <Card className="border-elec-yellow/20 bg-elec-card">
        <CardHeader className="pb-4 sm:pb-6">
          <CardTitle className="flex items-center gap-3 text-lg sm:text-xl text-elec-yellow">
            <TrendingUp className="h-5 w-5 sm:h-6 sm:w-6" />
            Industry Insight & Market Trends
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 sm:space-y-6">
          <div className="p-4 sm:p-5 bg-elec-yellow/5 border border-elec-yellow/20 rounded-lg">
            <h4 className="font-semibold text-sm sm:text-base mb-3 text-elec-yellow">High-Growth Sectors (2025)</h4>
            <div className="space-y-3 text-xs sm:text-sm text-white">
              <p><span className="font-medium text-elec-yellow">EV Charging Infrastructure:</span> 65% annual growth, £35-55k salaries for specialists</p>
              <p><span className="font-medium text-elec-yellow">Renewable Energy Systems:</span> 45% growth, particularly solar and battery storage</p>
              <p><span className="font-medium text-elec-yellow">Smart Building Technology:</span> 40% growth in commercial and residential sectors</p>
              <p><span className="font-medium text-elec-yellow">Data Centre Infrastructure:</span> Critical skills shortage, £40-65k for qualified engineers</p>
            </div>
          </div>
          
          <div className="p-4 sm:p-5 bg-elec-dark/30 border border-elec-yellow/10 rounded-lg">
            <h4 className="font-semibold text-sm sm:text-base mb-3 text-white">Regional Considerations</h4>
            <div className="space-y-2 text-xs sm:text-sm text-white">
              <p><span className="font-medium">London & South East:</span> Highest salaries but intense competition and higher course costs</p>
              <p><span className="font-medium">Industrial North:</span> Strong demand for manufacturing and renewable energy skills</p>
              <p><span className="font-medium">Scotland:</span> Offshore wind and renewable energy opportunities, government funding available</p>
              <p><span className="font-medium">Wales:</span> Growing green energy sector with apprenticeship support</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CourseSelectionTips;
