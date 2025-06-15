
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Users, Search, FileText, Target, CheckCircle, AlertTriangle, PoundSterling, MapPin } from "lucide-react";

const RecruitmentTab = () => {
  const recruitmentChannels = [
    {
      name: "Industry Job Boards",
      effectiveness: "High",
      cost: "Medium",
      avgCost: "£200-500/post",
      examples: ["ElectricalJobs.com", "Indeed", "Reed", "Totaljobs"],
      tips: "Post detailed job descriptions with clear requirements and salary ranges"
    },
    {
      name: "Trade Associations",
      effectiveness: "High", 
      cost: "Low",
      avgCost: "£0-100/year",
      examples: ["ECA", "NICEIC", "NAPIT", "SELECT"],
      tips: "Network at local branch meetings and attend industry events"
    },
    {
      name: "Local Colleges & Training Providers",
      effectiveness: "Medium",
      cost: "Low",
      avgCost: "£0-200/visit",
      examples: ["FE Colleges", "Training Providers", "University Technical Colleges"],
      tips: "Build relationships with tutors and attend career fairs regularly"
    },
    {
      name: "Social Media & Professional Networks",
      effectiveness: "Medium",
      cost: "Low",
      avgCost: "£50-300/month",
      examples: ["LinkedIn", "Facebook Groups", "Twitter", "Instagram"],
      tips: "Share company culture and day-to-day work content consistently"
    },
    {
      name: "Recruitment Agencies",
      effectiveness: "High",
      cost: "High",
      avgCost: "15-25% of salary",
      examples: ["Specialist electrical recruiters", "General construction agencies"],
      tips: "Use for hard-to-fill positions or when internal resources are limited"
    },
    {
      name: "Employee Referrals",
      effectiveness: "Very High",
      cost: "Low",
      avgCost: "£500-2000 bonus",
      examples: ["Internal referral schemes", "Word-of-mouth recommendations"],
      tips: "Offer attractive referral bonuses and make the process simple"
    }
  ];

  const salaryBenchmarks = [
    {
      level: "Apprentice Electrician",
      experience: "0-1 years",
      salary: "£16,000 - £22,000",
      benefits: "Training provided, tools allowance"
    },
    {
      level: "Qualified Electrician",
      experience: "2-5 years",
      salary: "£28,000 - £38,000",
      benefits: "Van, fuel card, pension"
    },
    {
      level: "Experienced Electrician",
      experience: "5-10 years",
      salary: "£35,000 - £45,000",
      benefits: "Van, tools, pension, healthcare"
    },
    {
      level: "Senior/Lead Electrician",
      experience: "10+ years",
      salary: "£40,000 - £55,000",
      benefits: "Van, tools, pension, healthcare, management responsibilities"
    }
  ];

  const essentialSkills = [
    "18th Edition Wiring Regulations (BS 7671:2018+A2:2022)",
    "Inspection and Testing qualifications (2391/2394/2395)",
    "AM2 Assessment or equivalent practical qualification",
    "Health and Safety awareness (CSCS card preferred)",
    "Fault finding and diagnostic skills",
    "Customer service and communication skills",
    "Driving licence (usually essential for mobile work)",
    "Experience with relevant electrical systems and installations"
  ];

  const interviewQuestions = [
    {
      category: "Technical Knowledge",
      questions: [
        "Describe your experience with different electrical systems",
        "How do you approach fault finding on a complex circuit?",
        "What safety procedures do you follow before starting work?",
        "Explain the testing sequence for a new installation"
      ]
    },
    {
      category: "Experience & Problem Solving",
      questions: [
        "Tell me about a challenging installation you've completed",
        "How do you handle unexpected issues on site?",
        "Describe a time you had to work to a tight deadline",
        "What's the most complex electrical fault you've diagnosed?"
      ]
    },
    {
      category: "Professional Development",
      questions: [
        "How do you stay updated with regulation changes?",
        "What additional qualifications are you planning to pursue?",
        "Tell me about recent training you've completed",
        "How do you ensure your work meets quality standards?"
      ]
    },
    {
      category: "Customer & Team Relations",
      questions: [
        "Describe a time you dealt with a difficult customer",
        "How do you explain technical issues to non-technical clients?",
        "Tell me about working as part of a team on a project",
        "How do you handle conflicting priorities from different clients?"
      ]
    }
  ];

  const jobDescriptionTemplate = [
    {
      section: "Job Title & Summary",
      content: "Clear, specific title (e.g., 'Qualified Electrician - Domestic & Commercial') with brief overview of role and company"
    },
    {
      section: "Key Responsibilities",
      content: "Specific duties: installations, maintenance, testing, fault finding, customer interaction, documentation"
    },
    {
      section: "Essential Requirements",
      content: "Qualifications, experience level, specific skills, driving licence, physical requirements"
    },
    {
      section: "Desirable Requirements",
      content: "Additional qualifications, specialised experience, soft skills, industry knowledge"
    },
    {
      section: "Compensation Package",
      content: "Salary range, van/travel allowance, pension, tools, training opportunities, career progression"
    },
    {
      section: "Company Information",
      content: "Brief company description, values, culture, growth opportunities, location details"
    }
  ];

  return (
    <div className="space-y-6">
      <Alert className="border-blue-500/50 bg-blue-500/10">
        <Target className="h-4 w-4 text-blue-400" />
        <AlertDescription className="text-blue-200">
          Quality recruitment saves time and money in the long run. Take time to find the right candidates who fit both the role and company culture.
        </AlertDescription>
      </Alert>

      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="text-elec-yellow flex items-center gap-2">
            <Search className="h-5 w-5" />
            Recruitment Channels & Costs
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {recruitmentChannels.map((channel, index) => (
              <div key={index} className="border border-elec-yellow/10 rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-white">{channel.name}</h4>
                  <div className="flex gap-2">
                    <Badge variant="outline" className={`${
                      channel.effectiveness === 'Very High' ? 'text-emerald-300 border-emerald-400/30' :
                      channel.effectiveness === 'High' ? 'text-green-300 border-green-400/30' :
                      'text-yellow-300 border-yellow-400/30'
                    }`}>
                      {channel.effectiveness} Success
                    </Badge>
                    <Badge variant="outline" className="text-blue-300 border-blue-400/30">
                      {channel.cost} Cost
                    </Badge>
                    <Badge variant="outline" className="text-purple-300 border-purple-400/30">
                      {channel.avgCost}
                    </Badge>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{channel.tips}</p>
                <div className="flex flex-wrap gap-1">
                  {channel.examples.map((example, exIndex) => (
                    <Badge key={exIndex} variant="secondary" className="text-xs">
                      {example}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-green-500/50 bg-green-500/10">
        <CardHeader>
          <CardTitle className="text-green-300 flex items-center gap-2">
            <PoundSterling className="h-5 w-5" />
            UK Salary Benchmarks (2024)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3">
            {salaryBenchmarks.map((benchmark, index) => (
              <div key={index} className="border border-green-500/20 rounded-lg p-4 flex justify-between items-center">
                <div>
                  <h5 className="font-medium text-green-200">{benchmark.level}</h5>
                  <p className="text-sm text-green-100">{benchmark.experience}</p>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-green-300">{benchmark.salary}</div>
                  <p className="text-xs text-green-100">{benchmark.benefits}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="border-blue-500/50 bg-blue-500/10">
          <CardHeader>
            <CardTitle className="text-blue-300 flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              Essential Skills & Qualifications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {essentialSkills.map((skill, index) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <Badge variant="outline" className="mt-0.5 h-2 w-2 rounded-full p-0 border-blue-400/50 bg-blue-400/20" />
                  <span className="text-blue-100">{skill}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="border-orange-500/50 bg-orange-500/10">
          <CardHeader>
            <CardTitle className="text-orange-300 flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Job Description Template
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {jobDescriptionTemplate.map((section, index) => (
                <li key={index} className="space-y-1">
                  <h6 className="text-sm font-medium text-orange-200">{section.section}</h6>
                  <p className="text-xs text-orange-100">{section.content}</p>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      <Card className="border-purple-500/50 bg-purple-500/10">
        <CardHeader>
          <CardTitle className="text-purple-300 flex items-center gap-2">
            <Users className="h-5 w-5" />
            Structured Interview Questions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            {interviewQuestions.map((category, index) => (
              <div key={index} className="space-y-3">
                <h5 className="font-medium text-purple-200">{category.category}</h5>
                <ul className="space-y-2">
                  {category.questions.map((question, questionIndex) => (
                    <li key={questionIndex} className="text-sm text-purple-100">
                      <strong>{questionIndex + 1}.</strong> {question}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Alert className="border-orange-500/50 bg-orange-500/10">
        <AlertTriangle className="h-4 w-4 text-orange-400" />
        <AlertDescription className="text-orange-200">
          <strong>Legal Reminder:</strong> Ensure all recruitment practices comply with equality legislation. 
          Focus on skills and qualifications, not personal characteristics. Always check right to work in the UK.
        </AlertDescription>
      </Alert>

      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="text-elec-yellow">Recruitment Process Checklist</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h5 className="font-medium text-white mb-3">Pre-Interview</h5>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <input type="checkbox" className="rounded" />
                  <span className="text-sm">Write detailed job description with salary range</span>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" className="rounded" />
                  <span className="text-sm">Post on 2-3 relevant job boards</span>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" className="rounded" />
                  <span className="text-sm">Contact local college tutors</span>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" className="rounded" />
                  <span className="text-sm">Screen CVs against essential criteria</span>
                </div>
              </div>
            </div>
            <div>
              <h5 className="font-medium text-white mb-3">Interview & Beyond</h5>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <input type="checkbox" className="rounded" />
                  <span className="text-sm">Prepare structured interview questions</span>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" className="rounded" />
                  <span className="text-sm">Check qualifications and references</span>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" className="rounded" />
                  <span className="text-sm">Conduct practical skills assessment</span>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" className="rounded" />
                  <span className="text-sm">Complete right to work checks</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RecruitmentTab;
