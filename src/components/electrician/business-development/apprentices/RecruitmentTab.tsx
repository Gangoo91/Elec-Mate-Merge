
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Users, Search, Target, CheckCircle, AlertCircle, ExternalLink, Calculator, PoundSterling, FileText, TrendingUp, Calendar, Shield, Clock } from "lucide-react";

const RecruitmentTab = () => {
  const recruitmentChannels = [
    { name: "Apprenticeship.gov.uk", type: "Government Portal", cost: "Free", effectiveness: "High", avgApplications: "15-25", timeToFill: "4-6 weeks" },
    { name: "Local Colleges", type: "Educational Partnership", cost: "Free", effectiveness: "High", avgApplications: "10-20", timeToFill: "2-4 weeks" },
    { name: "Job Centre Plus", type: "Government Service", cost: "Free", effectiveness: "Medium", avgApplications: "8-15", timeToFill: "3-5 weeks" },
    { name: "Indeed/LinkedIn", type: "Commercial Job Board", cost: "£200-500", effectiveness: "Medium", avgApplications: "20-40", timeToFill: "3-4 weeks" },
    { name: "Local Schools", type: "Direct Outreach", cost: "Time", effectiveness: "High", avgApplications: "5-12", timeToFill: "6-8 weeks" },
    { name: "Word of Mouth", type: "Referrals", cost: "Free", effectiveness: "Very High", avgApplications: "3-8", timeToFill: "1-2 weeks" }
  ];

  const jobPostingTemplate = {
    title: "Electrical Apprenticeship - Level 3",
    overview: "Join our growing electrical contracting business and train to become a qualified electrician",
    keyPoints: [
      "4-year apprenticeship programme leading to Level 3 qualification",
      "Starting wage: £7.00/hour (2025 apprentice minimum wage)",
      "Progression to £18-25/hour upon qualification",
      "20% college training, 80% hands-on experience",
      "Full support from experienced mentors",
      "Opportunity for further specialisation and career advancement"
    ],
    requirements: [
      "GCSE Maths and English (Grade 4/C or above preferred)",
      "Strong interest in electrical work and problem-solving",
      "Good manual dexterity and attention to detail",
      "Reliable, punctual, and willing to learn",
      "Physical fitness for manual work and working at heights",
      "Valid UK right to work"
    ],
    benefits: [
      "Comprehensive training programme",
      "Qualified mentor support",
      "Career progression opportunities",
      "Company van and tools provided (after probation)",
      "28 days annual leave",
      "Pension scheme"
    ]
  };

  const costBreakdown = [
    { 
      item: "Apprentice Annual Salary (Year 1)", 
      cost: "£14,560", 
      calculation: "£7.00 × 40 hours × 52 weeks",
      description: "2025 apprentice minimum wage rate"
    },
    { 
      item: "Employer NI & Pension", 
      cost: "£1,820", 
      calculation: "~12.5% of gross salary",
      description: "National Insurance + minimum 3% pension contribution"
    },
    { 
      item: "Training Provider Fees", 
      cost: "£0-2,000", 
      calculation: "Often 95-100% government funded",
      description: "Levy funds or government co-investment"
    },
    { 
      item: "Equipment & PPE", 
      cost: "£1,200-1,800", 
      calculation: "Tools, uniform, safety equipment",
      description: "Initial tool allowance and safety gear"
    },
    { 
      item: "Administrative & Assessment", 
      cost: "£600-1,000", 
      calculation: "Documentation, EPA, assessments",
      description: "End-point assessment and admin costs"
    },
    { 
      item: "Vehicle & Fuel Allowance", 
      cost: "£2,400-3,600", 
      calculation: "£200-300 per month",
      description: "Travel costs or company vehicle provision"
    },
    { 
      item: "Total Year 1 Investment", 
      cost: "£20,580-23,780", 
      calculation: "All inclusive realistic costs", 
      highlight: true,
      description: "Complete first-year investment per apprentice"
    }
  ];

  const salaryProgression = [
    { year: "Year 1", wage: "£7.00/hour", annual: "£14,560", notes: "2025 apprentice minimum wage" },
    { year: "Year 2", wage: "£11.44-12.21/hour", annual: "£23,795-25,397", notes: "National minimum wage (age dependent)" },
    { year: "Year 3", wage: "£12.21-14.00/hour", annual: "£25,397-29,120", notes: "Progressing skills and competency" },
    { year: "Year 4", wage: "£14.00-18.00/hour", annual: "£29,120-37,440", notes: "Near qualification, increased responsibility" },
    { year: "Post-Qualification", wage: "£18.00-25.00/hour", annual: "£37,440-52,000", notes: "Fully qualified electrician - 2025 rates" }
  ];

  const interviewQuestions = [
    "Why are you interested in becoming an electrician?",
    "What do you know about electrical safety?",
    "How do you handle working in a team environment?",
    "Describe a time when you had to learn something new quickly",
    "What are your career goals for the next 5 years?",
    "How comfortable are you with heights and confined spaces?",
    "Tell me about a practical project you've worked on",
    "What would you do if you didn't understand a task given to you?"
  ];

  const redFlags = [
    "Lack of interest in learning",
    "Poor communication skills", 
    "Unreliable attendance history",
    "Unwillingness to follow safety procedures",
    "Expecting immediate high wages",
    "No questions about the role or company",
    "Negative attitude towards authority",
    "Unwillingness to commit to training duration"
  ];

  const governmentIncentives = [
    { incentive: "16-18 Year Old Apprentice", amount: "£3,000", eligibility: "Per apprentice hired aged 16-18 (2025)" },
    { incentive: "19-24 Year Old Apprentice", amount: "£1,500", eligibility: "Per apprentice hired aged 19-24 (2025)" },
    { incentive: "Care Leaver Support", amount: "£1,000", eligibility: "Additional support for care leavers" },
    { incentive: "Small Employer Support", amount: "£1,000", eligibility: "Employers with <50 employees (2025)" },
    { incentive: "100% Training Funding", amount: "Up to £27,000", eligibility: "For apprentices aged 16-18" },
    { incentive: "95% Training Funding", amount: "Various", eligibility: "Small employers (<50 staff)" }
  ];

  const timelineChecklist = [
    { phase: "Pre-Recruitment (2-4 weeks)", tasks: ["Define role requirements", "Prepare job description", "Set up application process", "Contact training providers"] },
    { phase: "Active Recruitment (4-6 weeks)", tasks: ["Post job adverts", "Review applications", "Conduct initial screenings", "Schedule interviews"] },
    { phase: "Selection Process (2-3 weeks)", tasks: ["Conduct interviews", "Skills assessments", "Reference checks", "Make offer"] },
    { phase: "Pre-Start Setup (2-4 weeks)", tasks: ["Complete paperwork", "Arrange training provider", "Prepare workspace", "Order equipment/PPE"] }
  ];

  const legalConsiderations = [
    { requirement: "Apprenticeship Agreement", description: "Written agreement covering terms, training plan, and progression pathway", importance: "Legal requirement" },
    { requirement: "Training Plan", description: "Detailed plan of on/off-job training with learning objectives and assessment criteria", importance: "Ofsted requirement" },
    { requirement: "End-Point Assessment", description: "Independent assessment of apprentice competency at programme completion", importance: "Qualification requirement" },
    { requirement: "20% Off-Job Training", description: "Minimum 20% of working time must be dedicated to learning and development", importance: "Funding requirement" },
    { requirement: "Minimum Wage Compliance", description: "Must pay apprentice minimum wage for first year, then age-appropriate minimum wage", importance: "Legal requirement" }
  ];

  return (
    <div className="space-y-6">
      <Alert className="border-green-500/50 bg-green-500/10">
        <Calculator className="h-4 w-4 text-green-400" />
        <AlertDescription className="text-green-200">
          <strong>ROI Calculation:</strong> With government incentives, the true cost of a first-year apprentice can be as low as £12,000, with a qualified electrician worth £35,000+ annually to your business.
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardHeader>
            <CardTitle className="text-elec-yellow flex items-center gap-2">
              <PoundSterling className="h-5 w-5" />
              Investment & Cost Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {costBreakdown.map((item, index) => (
                <div key={index} className={`p-4 rounded-lg ${item.highlight ? 'bg-elec-yellow/20 border border-elec-yellow/30' : 'bg-elec-dark/50 border border-gray-700/50'}`}>
                  <div className="flex flex-col space-y-2">
                    <h5 className={`font-medium ${item.highlight ? 'text-elec-yellow' : 'text-white'}`}>{item.item}</h5>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                    <p className="text-xs text-gray-400">{item.calculation}</p>
                    <div className="flex justify-end">
                      <Badge className={item.highlight ? "bg-elec-yellow/30 text-elec-yellow text-lg px-3 py-1" : "bg-blue-500/30 text-blue-300 text-base px-3 py-1"}>
                        {item.cost}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-green-500/20 bg-green-500/10">
          <CardHeader>
            <CardTitle className="text-green-400 flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Government Incentives
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {governmentIncentives.map((item, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-green-500/5 border border-green-500/20 rounded-lg">
                  <div>
                    <h5 className="font-medium text-green-300">{item.incentive}</h5>
                    <p className="text-xs text-green-200">{item.eligibility}</p>
                  </div>
                  <Badge className="bg-green-500/30 text-green-400">
                    {item.amount}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-blue-500/20 bg-blue-500/10">
        <CardHeader>
          <CardTitle className="text-blue-400 flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Salary Progression Timeline
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {salaryProgression.map((stage, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-blue-500/5 border border-blue-500/20 rounded-lg">
                <div className="flex-1">
                  <h5 className="font-medium text-blue-300">{stage.year}</h5>
                  <p className="text-sm text-blue-200">{stage.notes}</p>
                </div>
                <div className="text-right">
                  <div className="font-medium text-blue-400">{stage.wage}</div>
                  <div className="text-xs text-blue-300">{stage.annual}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="text-elec-yellow flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Job Posting Template
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-white mb-2">{jobPostingTemplate.title}</h4>
              <p className="text-muted-foreground mb-3">{jobPostingTemplate.overview}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <h5 className="font-medium text-blue-400 mb-2">What We Offer</h5>
                <ul className="space-y-1">
                  {jobPostingTemplate.keyPoints.map((point, index) => (
                    <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                      <div className="w-1 h-1 bg-blue-400 rounded-full mt-2" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h5 className="font-medium text-amber-400 mb-2">Requirements</h5>
                <ul className="space-y-1">
                  {jobPostingTemplate.requirements.map((req, index) => (
                    <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                      <div className="w-1 h-1 bg-amber-400 rounded-full mt-2" />
                      {req}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h5 className="font-medium text-green-400 mb-2">Benefits</h5>
                <ul className="space-y-1">
                  {jobPostingTemplate.benefits.map((benefit, index) => (
                    <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                      <div className="w-1 h-1 bg-green-400 rounded-full mt-2" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-elec-yellow" />
            <CardTitle className="text-elec-yellow">Recruitment Channels & Performance</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recruitmentChannels.map((channel, index) => (
              <div key={index} className="border border-elec-yellow/20 rounded-lg p-4">
                <div className="flex justify-between items-start mb-3">
                  <h5 className="font-medium text-white">{channel.name}</h5>
                  <Badge className={
                    channel.effectiveness === "Very High" ? "bg-green-500/20 text-green-400" :
                    channel.effectiveness === "High" ? "bg-blue-500/20 text-blue-400" :
                    "bg-amber-500/20 text-amber-400"
                  }>
                    {channel.effectiveness}
                  </Badge>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Type:</span>
                    <span className="text-white">{channel.type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Cost:</span>
                    <span className="text-elec-yellow">{channel.cost}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Avg Applications:</span>
                    <span className="text-white">{channel.avgApplications}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Time to Fill:</span>
                    <span className="text-white">{channel.timeToFill}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
            <h4 className="font-semibold text-blue-400 mb-2 flex items-center gap-2">
              <Target className="h-4 w-4" />
              Partnership Strategy
            </h4>
            <p className="text-sm text-muted-foreground mb-3">
              Build long-term relationships with local colleges and schools. Offer work experience placements, 
              career talks, and sponsor events to become a preferred employer for quality candidates.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <h5 className="text-sm font-medium text-blue-300 mb-1">Local Colleges</h5>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• Offer guest lectures on industry practices</li>
                  <li>• Provide work experience placements</li>
                  <li>• Sponsor equipment or facilities</li>
                </ul>
              </div>
              <div>
                <h5 className="text-sm font-medium text-blue-300 mb-1">Secondary Schools</h5>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• Participate in careers fairs</li>
                  <li>• Offer site visits and demonstrations</li>
                  <li>• Support STEM education initiatives</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardHeader>
            <CardTitle className="text-elec-yellow flex items-center gap-2">
              <Search className="h-5 w-5" />
              Interview Best Practices
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-white mb-3">Essential Interview Questions</h4>
                <div className="space-y-2">
                  {interviewQuestions.map((question, index) => (
                    <div key={index} className="flex items-start gap-2 p-2 bg-elec-dark/50 rounded">
                      <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">{question}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3">
                <h5 className="font-medium text-green-400 mb-2">What to Look For</h5>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Genuine interest in the trade</li>
                  <li>• Willingness to learn and take direction</li>
                  <li>• Good communication skills</li>
                  <li>• Practical problem-solving ability</li>
                  <li>• Reliability and punctuality</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-red-500/20 bg-red-500/10">
          <CardHeader>
            <CardTitle className="text-red-400 flex items-center gap-2">
              <AlertCircle className="h-5 w-5" />
              Warning Signs to Avoid
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {redFlags.map((flag, index) => (
                <div key={index} className="flex items-start gap-2 p-2 bg-red-500/5 border border-red-500/20 rounded">
                  <AlertCircle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-red-200">{flag}</span>
                </div>
              ))}
            </div>

            <div className="mt-4 p-3 bg-amber-500/10 border border-amber-500/30 rounded-lg">
              <h5 className="font-medium text-amber-400 mb-2">Remember</h5>
              <p className="text-sm text-amber-200">
                A poor apprentice hire can cost you thousands in wasted training, reduced productivity, 
                and potential safety issues. Take time to select the right candidate.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="text-elec-yellow">Useful Recruitment Resources</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Button variant="outline" className="h-auto p-4 flex-col gap-2 border-elec-yellow/30">
              <ExternalLink className="h-5 w-5 text-elec-yellow" />
              <span className="font-medium">Gov.uk Apprenticeships</span>
              <span className="text-xs text-muted-foreground">Official recruitment portal</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex-col gap-2 border-blue-500/30">
              <ExternalLink className="h-5 w-5 text-blue-400" />
              <span className="font-medium">CITB Careers Hub</span>
              <span className="text-xs text-muted-foreground">Industry career resources</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex-col gap-2 border-green-500/30">
              <ExternalLink className="h-5 w-5 text-green-400" />
              <span className="font-medium">Local College Finder</span>
              <span className="text-xs text-muted-foreground">Find training partners</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-cyan-500/20 bg-cyan-500/10">
          <CardHeader>
            <CardTitle className="text-cyan-400 flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Recruitment Timeline & Checklist
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {timelineChecklist.map((phase, index) => (
                <div key={index} className="p-4 bg-cyan-500/5 border border-cyan-500/20 rounded-lg">
                  <h5 className="font-medium text-cyan-300 mb-2">{phase.phase}</h5>
                  <ul className="space-y-1">
                    {phase.tasks.map((task, taskIndex) => (
                      <li key={taskIndex} className="flex items-start gap-2 text-sm text-cyan-200">
                        <Clock className="h-3 w-3 mt-1 flex-shrink-0" />
                        {task}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-purple-500/20 bg-purple-500/10">
          <CardHeader>
            <CardTitle className="text-purple-400 flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Legal Requirements & Compliance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {legalConsiderations.map((item, index) => (
                <div key={index} className="p-3 bg-purple-500/5 border border-purple-500/20 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <h5 className="font-medium text-purple-300">{item.requirement}</h5>
                    <Badge className={
                      item.importance === "Legal requirement" ? "bg-red-500/30 text-red-400" :
                      item.importance === "Funding requirement" ? "bg-amber-500/30 text-amber-400" :
                      "bg-blue-500/30 text-blue-400"
                    }>
                      {item.importance}
                    </Badge>
                  </div>
                  <p className="text-sm text-purple-200">{item.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Alert className="border-amber-500/50 bg-amber-500/10">
        <TrendingUp className="h-4 w-4 text-amber-400" />
        <AlertDescription className="text-amber-200">
          <strong>2025 Update:</strong> These figures reflect the latest apprentice minimum wage increases and government incentives. 
          Remember to factor in regional variations and industry-specific requirements when budgeting for apprentice recruitment.
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default RecruitmentTab;
