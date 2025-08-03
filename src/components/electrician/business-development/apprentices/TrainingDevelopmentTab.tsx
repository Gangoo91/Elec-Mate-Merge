import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { MobileAccordion, MobileAccordionContent, MobileAccordionItem, MobileAccordionTrigger } from "@/components/ui/mobile-accordion";
import { 
  BookOpen, 
  Target, 
  Calendar, 
  Users, 
  TrendingUp, 
  Award, 
  Clock, 
  Brain, 
  CheckCircle, 
  Star, 
  Lightbulb, 
  PoundSterling, 
  BarChart3, 
  Zap, 
  Shield,
  Eye,
  FileText
} from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const TrainingDevelopmentTab = () => {
  const isMobile = useIsMobile();

  // Updated for 2025 - Key training metrics for employer focus
  const trainingMetrics = [
    {
      metric: "Training ROI",
      data: "£4.20 return per £1 invested",
      icon: <TrendingUp className="h-5 w-5 text-green-400" />,
      detail: "Comprehensive training programmes show strong ROI within 18 months"
    },
    {
      metric: "Skill Development Time",
      data: "36 months to full competency",
      icon: <Clock className="h-5 w-5 text-blue-400" />,
      detail: "Structured programmes reduce qualification time by 15%"
    },
    {
      metric: "Apprentice Retention Rate",
      data: "92% completion with proper support",
      icon: <Target className="h-5 w-5 text-elec-yellow" />,
      detail: "Quality training significantly improves completion rates"
    },
    {
      metric: "Employer Investment",
      data: "£12,000-18,000 total per apprentice",
      icon: <PoundSterling className="h-5 w-5 text-purple-400" />,
      detail: "Includes training, mentoring, and assessment costs over 3 years"
    }
  ];

  // 2025 Training Framework - Employer-focused
  const modernTrainingFramework = [
    {
      phase: "Digital Foundation Phase",
      timing: "Months 1-6",
      description: "Modern digital-first approach to foundational electrical training",
      components: [
        "Interactive digital learning platforms with VR safety training",
        "Blended online/classroom delivery for flexible scheduling",
        "Digital portfolio development and progress tracking",
        "Smart mentoring apps with real-time feedback systems"
      ],
      employerBenefit: "Reduced training time commitment while improving learning outcomes",
      kpis: ["Digital engagement score", "Safety assessment pass rate", "Portfolio completion"]
    },
    {
      phase: "Applied Skills Development",
      timing: "Months 7-18",
      description: "Industry 4.0 focused practical skills with emerging technology integration",
      components: [
        "Smart building systems and IoT integration training",
        "Electric vehicle charging infrastructure competency",
        "Renewable energy systems installation and maintenance",
        "Advanced diagnostic tools and digital testing equipment"
      ],
      employerBenefit: "Future-ready skills that command premium rates and contracts",
      kpis: ["Technical competency scores", "Customer satisfaction", "Technology adoption rate"]
    },
    {
      phase: "Professional Mastery & EPA",
      timing: "Months 19-36",
      description: "Advanced competency development and end-point assessment preparation",
      components: [
        "Project management and business skills development",
        "Comprehensive EPA preparation with mock assessments",
        "Specialisation pathway selection (domestic, commercial, industrial)",
        "Leadership and mentoring skills for future apprentice supervision"
      ],
      employerBenefit: "Qualified electrician ready for senior responsibilities and business growth",
      kpis: ["EPA pass rate", "Project completion quality", "Leadership assessment"]
    }
  ];

  const trainingProviderOptions = [
    {
      category: "Digital-First Training Providers",
      providers: [
        {
          name: "National College for Digital Skills",
          description: "Cutting-edge digital delivery with VR/AR training modules",
          features: ["Virtual reality safety training", "AI-powered progress tracking", "Mobile-first learning"],
          cost: "£4,500-6,000/year",
          benefits: "Flexible delivery reduces apprentice travel time by 60%"
        },
        {
          name: "EAL (Excellence, Achievement & Learning)",
          description: "Industry-leading electrical training with modern delivery methods",
          features: ["Digital portfolio system", "Industry partnerships", "EPA specialist support"],
          cost: "£5,000-7,000/year",
          benefits: "98% EPA first-time pass rate with comprehensive support"
        }
      ]
    },
    {
      category: "Hybrid Learning Solutions",
      providers: [
        {
          name: "Local FE College Partnerships",
          description: "Traditional college delivery enhanced with digital tools",
          features: ["Face-to-face practical training", "Local industry connections", "Flexible day release"],
          cost: "£3,500-5,500/year",
          benefits: "Strong local employer networks and established track record"
        },
        {
          name: "CITB Training Centres",
          description: "Industry-specific training with hands-on construction focus",
          features: ["Industry-standard facilities", "Construction-specific modules", "Safety specialist training"],
          cost: "£4,000-6,500/year",
          benefits: "Deep construction industry expertise and networking"
        }
      ]
    }
  ];

  const skillsProgressionFramework = [
    {
      competency: "Safety Leadership",
      progression: [
        {
          level: "Foundation (Months 1-6)",
          requirements: ["Health & safety awareness training", "PPE competency assessment", "Risk identification skills"],
          assessment: "Written safety test + practical demonstration",
          businessImpact: "Reduced insurance costs and compliance confidence"
        },
        {
          level: "Practitioner (Months 7-18)",
          requirements: ["Risk assessment creation", "Safety training delivery", "Incident investigation"],
          assessment: "Lead safety briefing + risk assessment portfolio",
          businessImpact: "Internal safety training capability and leadership"
        },
        {
          level: "Expert (Months 19-36)",
          requirements: ["Safety culture development", "Policy creation", "Audit and compliance"],
          assessment: "Safety improvement project + peer review",
          businessImpact: "Company-wide safety culture and reduced liability"
        }
      ]
    },
    {
      competency: "Technical Excellence",
      progression: [
        {
          level: "Foundation (Months 1-6)",
          requirements: ["Basic electrical theory", "Simple circuit installation", "Basic testing procedures"],
          assessment: "Theory exam + practical installation test",
          businessImpact: "Basic electrical work capacity and reduced supervision"
        },
        {
          level: "Practitioner (Months 7-18)",
          requirements: ["Complex circuit design", "Advanced testing", "Fault diagnosis"],
          assessment: "Project portfolio + diagnostic practical test",
          businessImpact: "Independent electrical installation and maintenance work"
        },
        {
          level: "Expert (Months 19-36)",
          requirements: ["System design", "Innovation projects", "Technical mentoring"],
          assessment: "Major project + technical presentation",
          businessImpact: "Business development through technical innovation"
        }
      ]
    },
    {
      competency: "Business & Customer Focus",
      progression: [
        {
          level: "Foundation (Months 1-6)",
          requirements: ["Customer service basics", "Communication skills", "Company standards"],
          assessment: "Customer interaction roleplay + feedback review",
          businessImpact: "Positive customer interactions and brand representation"
        },
        {
          level: "Practitioner (Months 7-18)",
          requirements: ["Customer consultation", "Quote preparation", "Project management"],
          assessment: "Customer project management + satisfaction scores",
          businessImpact: "Revenue generation through customer relationship building"
        },
        {
          level: "Expert (Months 19-36)",
          requirements: ["Business development", "Team leadership", "Process improvement"],
          assessment: "Business improvement project + leadership portfolio",
          businessImpact: "Business growth and operational efficiency improvements"
        }
      ]
    }
  ];

  const modernMentoringApproach = [
    {
      approach: "Digital Mentoring Platform",
      description: "Technology-enhanced mentoring with tracking and analytics",
      features: [
        "Daily progress logging through mobile apps",
        "Video coaching sessions and feedback",
        "AI-powered learning recommendations",
        "Peer networking and collaboration tools"
      ],
      implementation: "Monthly mentor training + digital platform subscription",
      benefits: "40% improvement in apprentice engagement and progress tracking"
    },
    {
      approach: "Structured Competency Pathways",
      description: "Clear progression routes with defined milestones and outcomes",
      features: [
        "Skills matrix with progression indicators",
        "Monthly competency assessments",
        "Personalised development planning",
        "Recognition and reward systems"
      ],
      implementation: "Quarterly skills assessments + certification tracking",
      benefits: "Faster skill development and improved motivation"
    },
    {
      approach: "Industry Exposure Programme",
      description: "Real-world experience across different electrical specialisms",
      features: [
        "Rotation through different project types",
        "Industry event attendance and networking",
        "Guest expert sessions and masterclasses",
        "Advanced technology demonstrations"
      ],
      implementation: "Planned exposure schedule + industry partnerships",
      benefits: "Broader skills base and improved career prospects"
    }
  ];

  const trainingCostAnalysis = [
    {
      category: "Direct Training Costs",
      costs: [
        { item: "Training provider fees", amount: "£4,500-7,000", period: "Annual", funding: "95-100% government funded" },
        { item: "Assessment and EPA costs", amount: "£1,500-2,500", period: "Total programme", funding: "Employer responsibility" },
        { item: "Learning materials and resources", amount: "£800-1,200", period: "Annual", funding: "Employer/apprentice shared" },
        { item: "Digital platform subscriptions", amount: "£300-600", period: "Annual", funding: "Employer investment" }
      ]
    },
    {
      category: "Indirect Training Costs",
      costs: [
        { item: "Mentor time allocation", amount: "£6,000-9,000", period: "Annual", funding: "Internal resource cost" },
        { item: "Reduced productivity (Year 1)", amount: "£3,000-5,000", period: "First year", funding: "Business investment" },
        { item: "Equipment and tool allowance", amount: "£1,500-2,500", period: "Total programme", funding: "Employer provision" },
        { item: "Travel and accommodation", amount: "£500-1,000", period: "Annual", funding: "Varies by location" }
      ]
    }
  ];

  return (
    <div className="space-y-4">
      <Alert className="border-blue-500/50 bg-blue-500/10">
        <Brain className="h-4 w-4 text-blue-400" />
        <AlertDescription className="text-blue-200">
          Modern training approaches improve apprentice completion rates by 25% and reduce time to competency.
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-2 gap-3">
        {trainingMetrics.map((metric, index) => (
          <Card key={index} className="border-elec-yellow/20 bg-elec-gray p-3">
            <div className="text-center space-y-2">
              {metric.icon}
              <div className="text-xs font-medium text-white">{metric.metric}</div>
              <div className="text-xs text-muted-foreground">{metric.data}</div>
            </div>
          </Card>
        ))}
      </div>

      <MobileAccordion type="single" collapsible className="space-y-2">
        <MobileAccordionItem value="framework">
          <MobileAccordionTrigger icon={<Target className="h-5 w-5 text-blue-400" />}>
            2025 Training Framework
          </MobileAccordionTrigger>
          <MobileAccordionContent>
            <div className="bg-elec-gray border border-elec-yellow/20 rounded-b-lg p-4 space-y-4">
              {modernTrainingFramework.map((phase, index) => (
                <div key={index} className="border border-blue-500/20 rounded-lg p-3 space-y-3">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-white text-sm">{phase.phase}</h4>
                      <Badge variant="outline" className="text-blue-300 border-blue-400/30 text-xs">
                        {phase.timing}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">{phase.description}</p>
                  </div>

                  <div>
                    <h5 className="font-medium text-blue-300 mb-2 text-xs">Training Components</h5>
                    <ul className="space-y-1">
                      {phase.components.map((component, compIndex) => (
                        <li key={compIndex} className="text-xs text-blue-200 flex items-center gap-1">
                          <CheckCircle className="h-3 w-3 text-green-400 flex-shrink-0" />
                          {component}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-green-500/10 border border-green-500/30 rounded p-2">
                    <h5 className="font-medium text-green-300 mb-1 text-xs">Business Benefits</h5>
                    <p className="text-xs text-green-200">{phase.employerBenefit}</p>
                  </div>

                  <div>
                    <h5 className="font-medium text-purple-300 mb-1 text-xs">Success Metrics</h5>
                    <div className="flex flex-wrap gap-1">
                      {phase.kpis.map((kpi, kpiIndex) => (
                        <Badge key={kpiIndex} variant="outline" className="text-purple-300 border-purple-400/30 text-xs">
                          {kpi}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </MobileAccordionContent>
        </MobileAccordionItem>

        <MobileAccordionItem value="providers">
          <MobileAccordionTrigger icon={<BookOpen className="h-5 w-5 text-green-400" />}>
            Training Provider Options
          </MobileAccordionTrigger>
          <MobileAccordionContent>
            <div className="bg-elec-gray border border-elec-yellow/20 rounded-b-lg p-4 space-y-4">
              {trainingProviderOptions.map((category, index) => (
                <div key={index} className="space-y-3">
                  <h4 className="font-medium text-green-300 text-sm border-b border-green-500/20 pb-1">
                    {category.category}
                  </h4>
                  {category.providers.map((provider, providerIndex) => (
                    <div key={providerIndex} className="border border-green-500/20 rounded-lg p-3 space-y-2">
                      <div className="flex items-center justify-between">
                        <h5 className="font-medium text-white text-sm">{provider.name}</h5>
                        <Badge variant="outline" className="text-green-300 border-green-400/30 text-xs">
                          {provider.cost}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">{provider.description}</p>
                      
                      <div>
                        <h6 className="font-medium text-green-300 mb-1 text-xs">Key Features</h6>
                        <div className="flex flex-wrap gap-1">
                          {provider.features.map((feature, featureIndex) => (
                            <Badge key={featureIndex} variant="outline" className="text-green-200 border-green-400/20 text-xs">
                              {feature}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="bg-blue-500/10 border border-blue-500/30 rounded p-2">
                        <p className="text-xs text-blue-200">{provider.benefits}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </MobileAccordionContent>
        </MobileAccordionItem>

        <MobileAccordionItem value="progression">
          <MobileAccordionTrigger icon={<Award className="h-5 w-5 text-purple-400" />}>
            Skills Progression Framework
          </MobileAccordionTrigger>
          <MobileAccordionContent>
            <div className="bg-elec-gray border border-elec-yellow/20 rounded-b-lg p-4 space-y-4">
              {skillsProgressionFramework.map((competency, index) => (
                <div key={index} className="border border-purple-500/20 rounded-lg p-3 space-y-3">
                  <h4 className="font-medium text-white text-sm border-b border-purple-500/20 pb-1">
                    {competency.competency}
                  </h4>
                  {competency.progression.map((level, levelIndex) => (
                    <div key={levelIndex} className="border border-purple-500/20 rounded p-3 space-y-2">
                      <h5 className="font-medium text-purple-300 text-sm">{level.level}</h5>
                      
                      <div>
                        <h6 className="font-medium text-purple-300 mb-1 text-xs">Requirements</h6>
                        <ul className="space-y-1">
                          {level.requirements.map((req, reqIndex) => (
                            <li key={reqIndex} className="text-xs text-purple-200 flex items-center gap-1">
                              <CheckCircle className="h-3 w-3 text-green-400 flex-shrink-0" />
                              {req}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="bg-blue-500/10 border border-blue-500/30 rounded p-2">
                        <h6 className="font-medium text-blue-300 mb-1 text-xs">Assessment Method</h6>
                        <p className="text-xs text-blue-200">{level.assessment}</p>
                      </div>

                      <div className="bg-green-500/10 border border-green-500/30 rounded p-2">
                        <h6 className="font-medium text-green-300 mb-1 text-xs">Business Impact</h6>
                        <p className="text-xs text-green-200">{level.businessImpact}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </MobileAccordionContent>
        </MobileAccordionItem>

        <MobileAccordionItem value="mentoring">
          <MobileAccordionTrigger icon={<Users className="h-5 w-5 text-amber-400" />}>
            Modern Mentoring Approaches
          </MobileAccordionTrigger>
          <MobileAccordionContent>
            <div className="bg-elec-gray border border-elec-yellow/20 rounded-b-lg p-4 space-y-4">
              {modernMentoringApproach.map((approach, index) => (
                <div key={index} className="border border-amber-500/20 rounded-lg p-3 space-y-3">
                  <h4 className="font-medium text-white text-sm">{approach.approach}</h4>
                  <p className="text-xs text-muted-foreground">{approach.description}</p>
                  
                  <div>
                    <h5 className="font-medium text-amber-300 mb-2 text-xs">Key Features</h5>
                    <ul className="space-y-1">
                      {approach.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="text-xs text-amber-200 flex items-center gap-1">
                          <CheckCircle className="h-3 w-3 text-green-400 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-blue-500/10 border border-blue-500/30 rounded p-2">
                    <h5 className="font-medium text-blue-300 mb-1 text-xs">Implementation</h5>
                    <p className="text-xs text-blue-200">{approach.implementation}</p>
                  </div>

                  <div className="bg-green-500/10 border border-green-500/30 rounded p-2">
                    <h5 className="font-medium text-green-300 mb-1 text-xs">Benefits</h5>
                    <p className="text-xs text-green-200">{approach.benefits}</p>
                  </div>
                </div>
              ))}
            </div>
          </MobileAccordionContent>
        </MobileAccordionItem>

        <MobileAccordionItem value="costs">
          <MobileAccordionTrigger icon={<PoundSterling className="h-5 w-5 text-yellow-400" />}>
            Training Investment Analysis
          </MobileAccordionTrigger>
          <MobileAccordionContent>
            <div className="bg-elec-gray border border-elec-yellow/20 rounded-b-lg p-4 space-y-4">
              {trainingCostAnalysis.map((category, index) => (
                <div key={index} className="space-y-3">
                  <h4 className="font-medium text-yellow-300 text-sm border-b border-yellow-500/20 pb-1">
                    {category.category}
                  </h4>
                  {category.costs.map((cost, costIndex) => (
                    <div key={costIndex} className="border border-yellow-500/20 rounded-lg p-3 space-y-2">
                      <div className="flex items-center justify-between">
                        <h5 className="font-medium text-white text-sm">{cost.item}</h5>
                        <Badge variant="outline" className="text-yellow-300 border-yellow-400/30 text-xs">
                          {cost.amount}
                        </Badge>
                      </div>
                      
                      <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">Period: {cost.period}</span>
                        <span className="text-yellow-200">Funding: {cost.funding}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </MobileAccordionContent>
        </MobileAccordionItem>
      </MobileAccordion>
    </div>
  );
};

export default TrainingDevelopmentTab;