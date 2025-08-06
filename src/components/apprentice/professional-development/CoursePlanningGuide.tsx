
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  CheckCircle, 
  Clock, 
  PoundSterling, 
  Users, 
  FileText,
  Target,
  Calendar,
  TrendingUp
} from "lucide-react";

const CoursePlanningGuide = () => {
  const planningSteps = [
    {
      step: 1,
      title: "Career Goal Assessment",
      description: "Define your career objectives and identify skills gaps",
      timeframe: "1-2 weeks",
      activities: [
        "Complete a skills audit of your current capabilities",
        "Research job descriptions for your target roles",
        "Identify specific technical skills required",
        "Consider salary expectations and career progression"
      ]
    },
    {
      step: 2,
      title: "Course Research & Selection",
      description: "Evaluate available courses and training providers",
      timeframe: "2-3 weeks",
      activities: [
        "Compare course content with your learning objectives",
        "Check provider accreditation and industry recognition",
        "Read reviews and testimonials from previous students",
        "Assess course delivery methods (online, classroom, blended)"
      ]
    },
    {
      step: 3,
      title: "Financial Planning",
      description: "Secure funding and budget for your education",
      timeframe: "3-4 weeks",
      activities: [
        "Use our funding calculator to explore options",
        "Apply for Advanced Learner Loans if eligible",
        "Discuss employer funding and training budgets",
        "Research scholarships and industry grants"
      ]
    },
    {
      step: 4,
      title: "Scheduling & Logistics",
      description: "Plan your learning around work and personal commitments",
      timeframe: "1-2 weeks",
      activities: [
        "Coordinate with your employer for time off or flexible hours",
        "Arrange childcare or family support if needed",
        "Plan travel and accommodation for residential courses",
        "Set up a dedicated study space at home"
      ]
    },
    {
      step: 5,
      title: "Application & Enrolment",
      description: "Complete applications and secure your place",
      timeframe: "2-3 weeks",
      activities: [
        "Submit applications with required documentation",
        "Attend interviews or assessment days if required",
        "Complete pre-course requirements or assessments",
        "Confirm enrollment and payment arrangements"
      ]
    }
  ];

  const fundingOptions = [
    {
      title: "Advanced Learner Loans",
      eligibility: "Level 3-6 qualifications",
      coverage: "Up to 100% of course fees",
      repayment: "9% of income over £25,000",
      benefits: ["No upfront costs", "Income-contingent repayment", "Government backed"]
    },
    {
      title: "Employer Funding",
      eligibility: "Varies by employer",
      coverage: "Partial to full funding",
      repayment: "Usually none required",
      benefits: ["Direct employer investment", "Career development support", "Potential study leave"]
    },
    {
      title: "Apprenticeship Levy",
      eligibility: "Employers paying apprenticeship levy",
      coverage: "Up to £15,000 per apprentice",
      repayment: "None - funded by levy",
      benefits: ["Substantial funding available", "Structured learning pathways", "Guaranteed employment"]
    },
    {
      title: "Personal Investment",
      eligibility: "Anyone",
      coverage: "Self-funded",
      repayment: "Immediate payment",
      benefits: ["Complete flexibility", "No debt obligations", "Tax relief possibilities"]
    }
  ];

  const timingConsiderations = [
    {
      factor: "Industry Demand",
      description: "Course availability varies with industry needs",
      tip: "Book renewable energy courses early - high demand, limited places"
    },
    {
      factor: "Seasonal Work Patterns",
      description: "Consider your work schedule throughout the year",
      tip: "Winter months often better for classroom-based learning"
    },
    {
      factor: "Course Prerequisites",
      description: "Some courses require prior qualifications or experience",
      tip: "Allow 6-12 months lead time for advanced qualifications"
    },
    {
      factor: "Career Transition Timing",
      description: "Plan courses to align with job market opportunities",
      tip: "Complete certifications before actively job searching"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Planning Steps */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-elec-yellow" />
            5-Step Course Planning Process
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {planningSteps.map((step, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-elec-yellow/20 rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold text-elec-yellow">{step.step}</span>
                  </div>
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-white">{step.title}</h3>
                      <Badge variant="outline" className="text-xs">
                        <Clock className="h-3 w-3 mr-1" />
                        {step.timeframe}
                      </Badge>
                    </div>
                    <p className="text-sm text-elec-light/80">{step.description}</p>
                    <div className="space-y-2">
                      {step.activities.map((activity, activityIndex) => (
                        <div key={activityIndex} className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                          <span className="text-xs text-muted-foreground">{activity}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Funding Options Comparison */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PoundSterling className="h-5 w-5 text-elec-yellow" />
            Funding Options Comparison
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {fundingOptions.map((option, index) => (
              <div key={index} className="space-y-3">
                <h3 className="font-semibold text-white">{option.title}</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Eligibility:</span>
                    <span className="text-elec-light/80">{option.eligibility}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Coverage:</span>
                    <span className="text-elec-light/80">{option.coverage}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Repayment:</span>
                    <span className="text-elec-light/80">{option.repayment}</span>
                  </div>
                </div>
                <div className="space-y-1">
                  {option.benefits.map((benefit, benefitIndex) => (
                    <div key={benefitIndex} className="flex items-center gap-2">
                      <CheckCircle className="h-3 w-3 text-green-400" />
                      <span className="text-xs text-muted-foreground">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Timing Considerations */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-elec-yellow" />
            Strategic Timing Considerations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {timingConsiderations.map((consideration, index) => (
              <div key={index} className="space-y-2">
                <h3 className="font-semibold text-white mb-2">{consideration.factor}</h3>
                <p className="text-sm text-elec-light/80 mb-2">{consideration.description}</p>
                <div className="space-y-1">
                  <p className="text-xs text-blue-400">
                    <strong>Pro Tip:</strong> {consideration.tip}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CoursePlanningGuide;
