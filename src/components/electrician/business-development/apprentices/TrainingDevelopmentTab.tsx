import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { MobileAccordion, MobileAccordionContent, MobileAccordionItem, MobileAccordionTrigger } from "@/components/ui/mobile-accordion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { BookOpen, Target, Calendar, Users, TrendingUp, Award, Clock, Brain, CheckCircle, Star, Lightbulb, Download, PoundSterling, BarChart, Zap, Shield } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const TrainingDevelopmentTab = () => {
  const isMobile = useIsMobile();

  const trainingInvestment = [
    { 
      item: "Training Provider Fees", 
      cost: "£3,000-6,000", 
      calculation: "Per apprentice per year",
      description: "External college or training provider costs",
      breakdown: "Often 95-100% government funded through levy system"
    },
    { 
      item: "Internal Training Time", 
      cost: "£4,800-7,200", 
      calculation: "8-12 hours per week × mentor hourly rate",
      description: "Skilled tradesperson time for mentoring and guidance",
      breakdown: "£20-30/hour × 8 hours × 52 weeks"
    },
    { 
      item: "Training Resources & Materials", 
      cost: "£800-1,500", 
      calculation: "Books, software, assessment materials",
      description: "Educational materials and digital resources",
      breakdown: "Technical manuals, BS 7671, software licenses"
    },
    { 
      item: "Assessment & EPA Costs", 
      cost: "£1,200-2,000", 
      calculation: "End-point assessment and ongoing evaluations",
      description: "Professional assessment and certification fees",
      breakdown: "EPA fees, portfolio reviews, competency assessments"
    },
    { 
      item: "Total Annual Training Investment", 
      cost: "£9,800-16,700", 
      calculation: "Complete training programme costs", 
      highlight: true,
      description: "Comprehensive annual investment per apprentice",
      breakdown: "ROI achieved within 6-12 months post-qualification"
    }
  ];

  const trainingPhases = [
    {
      phase: "Foundation Phase",
      period: "Months 1-6",
      focus: "Building Core Knowledge & Safety Awareness",
      objectives: [
        "Establish strong safety culture and practices",
        "Develop fundamental electrical knowledge",
        "Learn company procedures and standards",
        "Build confidence and learning habits"
      ],
      onSiteActivities: [
        "Basic health and safety awareness implementation",
        "Tool familiarisation and proper usage techniques",
        "Simple cable installation under direct supervision",
        "Observation and assistance on various project types",
        "Site induction and company-specific procedures",
        "Customer interaction basics and communication skills",
        "Quality control standards and documentation processes"
      ],
      offSiteTraining: [
        "Electrical theory fundamentals and core principles",
        "Health and safety regulations (CDM 2015, HASAWA)",
        "Basic electrical calculations and mathematical formulae", 
        "Wiring regulations study (BS 7671 18th Edition 2018)",
        "Technical drawing interpretation and basic sketching",
        "Functional skills development (English and Mathematics)",
        "Industry history and career pathway exploration"
      ],
      assessmentMethods: [
        "Basic knowledge tests and evaluations",
        "Practical skill demonstrations",
        "Safety procedure assessments",
        "Portfolio development initiation"
      ],
      expectedOutcomes: [
        "Confident in basic safety procedures",
        "Understands fundamental electrical principles",
        "Can perform simple tasks under supervision",
        "Demonstrates good learning attitude"
      ]
    },
    {
      phase: "Development Phase",
      period: "Months 7-18",
      focus: "Applied Learning & Skill Development",
      objectives: [
        "Apply theoretical knowledge in practical situations",
        "Develop increasing independence in task completion",
        "Build strong customer relationships and communication",
        "Begin specialisation in key electrical areas"
      ],
      onSiteActivities: [
        "Circuit installation with decreasing supervision levels",
        "Proficient use of testing equipment and measurement tools",
        "Fault finding assistance and diagnostic skill development",
        "Direct customer interaction and relationship building",
        "Quality control procedures and independent inspection",
        "Project planning assistance and resource management",
        "Mentoring support for newer apprentices"
      ],
      offSiteTraining: [
        "Advanced electrical theory and complex calculations",
        "Comprehensive testing and inspection procedures",
        "Detailed wiring regulations study (BS 7671 in depth)",
        "Motor control systems and industrial applications",
        "Emergency lighting and fire alarm systems training",
        "Energy efficiency and renewable technology concepts",
        "Business skills and commercial awareness development"
      ],
      assessmentMethods: [
        "Intermediate practical competency tests",
        "Written examinations and evaluations",
        "Customer feedback and service reviews",
        "Comprehensive competency-based assessments"
      ],
      expectedOutcomes: [
        "Works independently on standard installations",
        "Understands complex electrical systems",
        "Provides excellent customer service",
        "Demonstrates technical problem-solving skills"
      ]
    },
    {
      phase: "Competency Phase",
      period: "Months 19-36",
      focus: "Mastery & Professional Development",
      objectives: [
        "Achieve full professional competency standards",
        "Lead and manage small projects independently",
        "Prepare comprehensively for End-Point Assessment",
        "Plan future career development and specialisation"
      ],
      onSiteActivities: [
        "Independent circuit design and implementation",
        "Complex installation work and system integration",
        "Comprehensive fault diagnosis and repair solutions",
        "Customer consultation and technical advisory services",
        "Site management responsibilities and team leadership",
        "Training and mentoring of junior apprentices",
        "Innovation projects and process improvement initiatives"
      ],
      offSiteTraining: [
        "Specialised systems training (smart homes, industrial control)",
        "Enhanced business and commercial awareness",
        "Advanced testing procedures and certification processes",
        "Emerging technology and innovation understanding",
        "Comprehensive End-Point Assessment preparation",
        "Professional development planning and goal setting",
        "Industry networking and continuous learning strategies"
      ],
      assessmentMethods: [
        "EPA preparation and mock assessments",
        "Independent project completion and evaluation",
        "Professional interview simulations",
        "Comprehensive portfolio final review"
      ],
      expectedOutcomes: [
        "Fully competent qualified electrician",
        "Capable of independent project management",
        "Ready for professional responsibilities",
        "Prepared for career advancement opportunities"
      ]
    }
  ];

  const skillsMatrix = [
    {
      category: "Health & Safety Excellence",
      description: "Developing comprehensive safety awareness and leadership",
      levels: [
        {
          level: "Foundation",
          badge: "Safety Aware",
          color: "red",
          competencies: [
            "Recognise electrical hazards and risks",
            "Use personal protective equipment correctly",
            "Follow established safety procedures",
            "Report incidents and near misses"
          ]
        },
        {
          level: "Competent",
          badge: "Safety Leader",
          color: "amber",
          competencies: [
            "Conduct comprehensive risk assessments",
            "Implement effective control measures",
            "Train others in safety procedures",
            "Investigate incidents thoroughly"
          ]
        },
        {
          level: "Expert",
          badge: "Safety Champion",
          color: "green",
          competencies: [
            "Develop safety protocols and procedures",
            "Lead safety culture initiatives",
            "Mentor safety leadership in others",
            "Drive continuous safety improvement"
          ]
        }
      ]
    },
    {
      category: "Technical Mastery",
      description: "Progressive development of electrical knowledge and application",
      levels: [
        {
          level: "Foundation",
          badge: "Technical Learner",
          color: "red",
          competencies: [
            "Apply Ohm's law and basic calculations",
            "Understand AC/DC electrical concepts",
            "Read and interpret simple circuit diagrams",
            "Use basic electrical testing equipment"
          ]
        },
        {
          level: "Competent",
          badge: "Technical Practitioner",
          color: "amber",
          competencies: [
            "Design electrical circuits and systems",
            "Calculate power factors and load requirements",
            "Understand three-phase electrical systems",
            "Troubleshoot complex electrical faults"
          ]
        },
        {
          level: "Expert",
          badge: "Technical Specialist",
          color: "green",
          competencies: [
            "Solve complex technical problems independently",
            "Design innovative electrical solutions",
            "Optimise electrical installations for efficiency",
            "Lead technical training and development"
          ]
        }
      ]
    },
    {
      category: "Practical Application",
      description: "Hands-on skills from basic tasks to complex project management",
      levels: [
        {
          level: "Foundation",
          badge: "Practical Learner",
          color: "red",
          competencies: [
            "Install basic wiring systems safely",
            "Use hand tools correctly and safely",
            "Follow detailed work instructions",
            "Complete simple electrical connections"
          ]
        },
        {
          level: "Competent",
          badge: "Skilled Installer",
          color: "amber",
          competencies: [
            "Install consumer units and distribution boards",
            "Test electrical installations thoroughly",
            "Complete electrical installation certificates",
            "Manage installation project timelines"
          ]
        },
        {
          level: "Expert",
          badge: "Installation Specialist",
          color: "green",
          competencies: [
            "Install complex industrial systems",
            "Commission sophisticated electrical equipment",
            "Manage multiple project timelines",
            "Train others in advanced techniques"
          ]
        }
      ]
    }
  ];

  const trainingMethods = [
    {
      method: "College/Training Provider Partnership",
      description: "Structured classroom learning with qualified instructors and industry-standard facilities",
      benefits: [
        "Nationally recognised qualifications and certifications",
        "Access to specialist equipment and simulation environments",
        "Peer learning opportunities and networking",
        "Qualified instructor expertise and guidance",
        "Structured curriculum aligned with industry standards",
        "Assessment and progression tracking systems"
      ],
      timeCommitment: "1-2 days per week (typically day release)",
      costRange: "£3,000-6,000 annually",
      funding: "95-100% government funded through levy system",
      bestFor: "Comprehensive foundational learning and certification"
    },
    {
      method: "Online Learning Platforms",
      description: "Flexible digital learning modules, virtual classrooms, and interactive content delivery",
      benefits: [
        "Self-paced learning accommodating work schedules",
        "Lower delivery costs and accessibility",
        "Easy progress tracking and performance monitoring",
        "Interactive multimedia content and simulations",
        "24/7 access to learning materials",
        "Integration with practical workplace learning"
      ],
      timeCommitment: "6-8 hours per week (flexible scheduling)",
      costRange: "£500-1,500 annually",
      funding: "Partial funding available through training budgets",
      bestFor: "Supplementary learning and flexible skill development"
    },
    {
      method: "In-House Training Programmes",
      description: "Company-specific training delivered by internal experts and experienced tradespeople",
      benefits: [
        "Content tailored specifically to company needs",
        "Immediate application of learning in workplace",
        "Lower external training costs over time",
        "Builds internal expertise and mentoring capability",
        "Reinforces company culture and standards",
        "Flexible delivery around operational requirements"
      ],
      timeCommitment: "4-6 hours per week (integrated with work)",
      costRange: "£1,000-3,000 annually (including mentor time)",
      funding: "Internal investment with potential tax benefits",
      bestFor: "Company-specific skills and cultural integration"
    },
    {
      method: "Blended Learning Approach",
      description: "Combination of college education, online resources, and workplace mentoring for optimal results",
      benefits: [
        "Best of all training methods combined",
        "Comprehensive skill development pathway",
        "Flexibility with structured progression",
        "Enhanced retention and application rates",
        "Multiple assessment and feedback mechanisms",
        "Adaptable to individual learning preferences"
      ],
      timeCommitment: "Variable based on individual needs",
      costRange: "£4,000-8,000 annually",
      funding: "Mixed funding sources available",
      bestFor: "Complete apprentice development programme"
    }
  ];

  const progressTracking = [
    {
      milestone: "Safety Certification",
      timeframe: "Month 3",
      requirements: ["Complete safety induction", "Pass safety assessment", "Demonstrate PPE usage"],
      impact: "Enables unsupervised site work"
    },
    {
      milestone: "Basic Competency",
      timeframe: "Month 6",
      requirements: ["Complete foundation training", "Practical skills assessment", "Portfolio review"],
      impact: "Increased independence and responsibility"
    },
    {
      milestone: "Intermediate Skills",
      timeframe: "Month 12",
      requirements: ["Advanced theory completion", "Complex installation projects", "Customer service feedback"],
      impact: "Lead on standard installation projects"
    },
    {
      milestone: "Advanced Competency",
      timeframe: "Month 24",
      requirements: ["Specialisation training", "Project management experience", "Mentor newer apprentices"],
      impact: "Senior apprentice responsibilities"
    },
    {
      milestone: "EPA Readiness",
      timeframe: "Month 30",
      requirements: ["Complete portfolio", "Mock assessments passed", "Industry knowledge verified"],
      impact: "Ready for final qualification"
    },
    {
      milestone: "Full Qualification",
      timeframe: "Month 36",
      requirements: ["EPA completion", "Professional interview", "Final competency sign-off"],
      impact: "Qualified electrician status achieved"
    }
  ];

  const mentorshipGuidelines = [
    {
      principle: "Structured Guidance",
      description: "Provide clear, progressive learning opportunities with defined outcomes",
      implementation: [
        "Create weekly learning objectives",
        "Review progress regularly",
        "Adjust pace based on individual needs",
        "Document achievements and areas for improvement"
      ]
    },
    {
      principle: "Safety First Culture",
      description: "Embed safety consciousness in every aspect of training and development",
      implementation: [
        "Model exemplary safety behaviour",
        "Explain the 'why' behind safety procedures",
        "Encourage questions about safety concerns",
        "Celebrate safety achievements and awareness"
      ]
    },
    {
      principle: "Practical Application",
      description: "Connect theoretical learning with real-world electrical work experiences",
      implementation: [
        "Demonstrate theory through practical examples",
        "Encourage experimentation in safe environments",
        "Relate classroom learning to site activities",
        "Use real projects as learning opportunities"
      ]
    },
    {
      principle: "Professional Development",
      description: "Foster professional attitudes, communication skills, and career awareness",
      implementation: [
        "Model professional customer interaction",
        "Teach business awareness and commercial thinking",
        "Encourage industry networking and learning",
        "Discuss career pathways and opportunities"
      ]
    }
  ];

  if (isMobile) {
    return (
      <div className="space-y-4">
        <Alert className="border-blue-500/50 bg-blue-500/10">
          <Brain className="h-4 w-4 text-blue-400" />
          <AlertDescription className="text-blue-200">
            <strong>Training ROI:</strong> Comprehensive apprentice training delivers a 300-400% return on investment through reduced recruitment costs, improved retention, and enhanced productivity over 5 years.
          </AlertDescription>
        </Alert>

        <MobileAccordion type="single" collapsible className="space-y-2">
          {/* Training Investment */}
          <MobileAccordionItem value="training-investment">
            <MobileAccordionTrigger
              icon={<PoundSterling className="h-6 w-6 text-blue-400" />}
            >
              <div className="text-sm font-medium text-blue-400">Training Investment</div>
              <div className="text-xs text-blue-300/80">Cost Analysis</div>
            </MobileAccordionTrigger>
            <MobileAccordionContent>
               <div className="bg-elec-gray border-x border-b border-elec-yellow/20 rounded-b-lg p-4 space-y-4">
                 <h3 className="text-lg font-semibold text-elec-yellow mb-4 text-center">Annual Training Investment Breakdown</h3>
                {trainingInvestment.map((item, index) => (
                  <div key={index} className={`p-4 rounded-lg border ${item.highlight ? 'bg-elec-yellow/20 border-elec-yellow/30' : 'bg-elec-dark/50 border-gray-700/50'}`}>
                    <div className={`space-y-3 ${item.highlight ? 'text-center' : ''}`}>
                      <h5 className={`font-medium text-lg ${item.highlight ? 'text-elec-yellow' : 'text-white'}`}>{item.item}</h5>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                      <div className="flex justify-center">
                        <Badge className={item.highlight 
                          ? "bg-elec-yellow/30 text-elec-yellow text-xl px-6 py-2 font-bold" 
                          : "bg-blue-500/30 text-blue-300 text-base px-4 py-2"
                        }>
                          {item.cost}
                        </Badge>
                      </div>
                      <p className="text-xs text-gray-400">{item.calculation}</p>
                      <p className="text-xs text-gray-500 italic">{item.breakdown}</p>
                    </div>
                  </div>
                ))}
              </div>
            </MobileAccordionContent>
          </MobileAccordionItem>

          {/* Training Phases */}
          <MobileAccordionItem value="training-phases">
            <MobileAccordionTrigger
              icon={<Calendar className="h-6 w-6 text-green-400" />}
            >
              <div className="text-sm font-medium text-green-400">Training Phases</div>
              <div className="text-xs text-green-300/80">36-Month Programme</div>
            </MobileAccordionTrigger>
            <MobileAccordionContent>
              <div className="bg-elec-gray border-x border-b border-elec-yellow/20 rounded-b-lg p-4 space-y-6">
                {trainingPhases.map((phase, index) => (
                  <div key={index} className="space-y-4">
                    <div className="text-center space-y-2">
                      <Badge className="bg-elec-yellow/20 text-elec-yellow text-sm px-3 py-1">
                        {phase.period}
                      </Badge>
                      <h4 className="text-lg font-semibold text-elec-yellow flex items-center justify-center gap-2">
                        <BookOpen className="h-5 w-5" />
                        {phase.phase}
                      </h4>
                      <p className="text-sm text-muted-foreground text-center">{phase.focus}</p>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <h5 className="font-medium text-purple-400 mb-3 text-sm">Phase Objectives</h5>
                        <div className="space-y-2">
                          {phase.objectives.map((objective, objIndex) => (
                            <div key={objIndex} className="flex items-start gap-2 text-sm text-purple-300">
                              <Target className="h-3 w-3 mt-1 flex-shrink-0" />
                              <span>{objective}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h5 className="font-medium text-blue-400 mb-3 text-sm flex items-center gap-2">
                          <Zap className="h-4 w-4" />
                          On-Site Activities (80%)
                        </h5>
                        <div className="space-y-2">
                          {phase.onSiteActivities.slice(0, 3).map((activity, actIndex) => (
                            <div key={actIndex} className="text-sm text-muted-foreground flex items-start gap-2">
                              <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0" />
                              {activity}
                            </div>
                          ))}
                          {phase.onSiteActivities.length > 3 && (
                            <div className="text-xs text-gray-400 italic">
                              +{phase.onSiteActivities.length - 3} more activities
                            </div>
                          )}
                        </div>
                      </div>

                      <div>
                        <h5 className="font-medium text-green-400 mb-3 text-sm flex items-center gap-2">
                          <BookOpen className="h-4 w-4" />
                          Off-Site Training (20%)
                        </h5>
                        <div className="space-y-2">
                          {phase.offSiteTraining.slice(0, 3).map((training, trainIndex) => (
                            <div key={trainIndex} className="text-sm text-muted-foreground flex items-start gap-2">
                              <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 flex-shrink-0" />
                              {training}
                            </div>
                          ))}
                          {phase.offSiteTraining.length > 3 && (
                            <div className="text-xs text-gray-400 italic">
                              +{phase.offSiteTraining.length - 3} more training modules
                            </div>
                          )}
                        </div>
                      </div>

                      <div>
                        <h5 className="font-medium text-orange-400 mb-3 text-sm">Assessment Methods</h5>
                        <div className="flex flex-wrap gap-2">
                          {phase.assessmentMethods.map((assessment, assessIndex) => (
                            <Badge key={assessIndex} variant="outline" className="text-orange-300 border-orange-400/30 text-xs">
                              {assessment}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h5 className="font-medium text-cyan-400 mb-3 text-sm">Expected Outcomes</h5>
                        <div className="space-y-1">
                          {phase.expectedOutcomes.map((outcome, outIndex) => (
                            <div key={outIndex} className="text-sm text-cyan-300 flex items-start gap-2">
                              <CheckCircle className="h-3 w-3 mt-1 flex-shrink-0" />
                              {outcome}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    {index < trainingPhases.length - 1 && (
                      <div className="border-t border-gray-700/50 pt-4" />
                    )}
                  </div>
                ))}
              </div>
            </MobileAccordionContent>
          </MobileAccordionItem>

          {/* Skills Matrix */}
          <MobileAccordionItem value="skills-matrix">
            <MobileAccordionTrigger
              icon={<TrendingUp className="h-6 w-6 text-purple-400" />}
            >
              <div className="text-sm font-medium text-purple-400">Skills Matrix</div>
              <div className="text-xs text-purple-300/80">Competency Framework</div>
            </MobileAccordionTrigger>
            <MobileAccordionContent>
              <div className="bg-elec-gray border-x border-b border-elec-yellow/20 rounded-b-lg p-4 space-y-6">
                {skillsMatrix.map((category, catIndex) => (
                  <div key={catIndex} className="space-y-4">
                    <div>
                      <h4 className="text-lg font-semibold text-elec-yellow">{category.category}</h4>
                      <p className="text-sm text-muted-foreground">{category.description}</p>
                    </div>
                    <div className="space-y-4">
                      {category.levels.map((level, levelIndex) => (
                        <div key={levelIndex} className={`p-4 rounded-lg border ${
                          level.color === 'red' ? 'bg-red-500/10 border-red-500/30' :
                          level.color === 'amber' ? 'bg-amber-500/10 border-amber-500/30' :
                          'bg-green-500/10 border-green-500/30'
                        }`}>
                          <div className="flex items-center gap-2 mb-3">
                            <Badge className={
                              level.color === 'red' ? 'bg-red-500/20 text-red-400' :
                              level.color === 'amber' ? 'bg-amber-500/20 text-amber-400' :
                              'bg-green-500/20 text-green-400'
                            }>
                              {level.badge}
                            </Badge>
                          </div>
                         <div className="space-y-2">
                           {level.competencies.map((competency, compIndex) => (
                             <div key={compIndex} className={`flex items-start gap-2 text-sm ${
                               level.color === 'red' ? 'text-red-300' :
                               level.color === 'amber' ? 'text-amber-300' :
                               'text-green-300'
                             }`}>
                               <CheckCircle className="h-3 w-3 mt-0.5 flex-shrink-0" />
                               {competency}
                             </div>
                           ))}
                         </div>
                        </div>
                      ))}
                    </div>
                    {catIndex < skillsMatrix.length - 1 && (
                      <div className="border-t border-gray-700/50 pt-4" />
                    )}
                  </div>
                ))}
              </div>
            </MobileAccordionContent>
          </MobileAccordionItem>

          {/* Training Methods */}
          <MobileAccordionItem value="training-methods">
            <MobileAccordionTrigger
              icon={<Clock className="h-6 w-6 text-cyan-400" />}
            >
              <div className="text-sm font-medium text-cyan-400">Training Methods</div>
              <div className="text-xs text-cyan-300/80">Delivery Options</div>
            </MobileAccordionTrigger>
            <MobileAccordionContent>
              <div className="bg-elec-gray border-x border-b border-elec-yellow/20 rounded-b-lg p-4 space-y-6">
                {trainingMethods.map((method, index) => (
                  <div key={index} className="space-y-4">
                    <div>
                      <h4 className="text-lg font-semibold text-elec-yellow flex items-center gap-2">
                        <Brain className="h-5 w-5" />
                        {method.method}
                      </h4>
                      <p className="text-sm text-muted-foreground mt-1">{method.description}</p>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <h5 className="font-medium text-green-400 mb-2 text-sm">Key Benefits</h5>
                        <div className="space-y-1">
                          {method.benefits.slice(0, 3).map((benefit, benefitIndex) => (
                            <div key={benefitIndex} className="text-sm text-green-300 flex items-start gap-2">
                              <Star className="h-3 w-3 mt-1 flex-shrink-0" />
                              {benefit}
                            </div>
                          ))}
                          {method.benefits.length > 3 && (
                            <div className="text-xs text-gray-400 italic">
                              +{method.benefits.length - 3} more benefits
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium text-blue-300">Time Commitment:</span>
                            <span className="text-sm text-blue-200">{method.timeCommitment}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium text-blue-300">Cost Range:</span>
                            <Badge className="bg-blue-500/20 text-blue-400">{method.costRange}</Badge>
                          </div>
                          <div className="pt-2 border-t border-blue-500/20">
                            <span className="text-xs text-blue-200">Funding: {method.funding}</span>
                          </div>
                          <div className="pt-1">
                            <span className="text-xs text-blue-300">Best For: {method.bestFor}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {index < trainingMethods.length - 1 && (
                      <div className="border-t border-gray-700/50 pt-4" />
                    )}
                  </div>
                ))}
              </div>
            </MobileAccordionContent>
          </MobileAccordionItem>

          {/* Progress Tracking */}
          <MobileAccordionItem value="progress-tracking">
            <MobileAccordionTrigger
              icon={<Award className="h-6 w-6 text-amber-400" />}
            >
              <div className="text-sm font-medium text-amber-400">Progress Tracking</div>
              <div className="text-xs text-amber-300/80">Milestones</div>
            </MobileAccordionTrigger>
            <MobileAccordionContent>
               <div className="bg-elec-gray border-x border-b border-elec-yellow/20 rounded-b-lg p-4 space-y-4">
                 {progressTracking.map((milestone, index) => (
                   <div key={index} className="p-4 border border-amber-500/20 bg-amber-500/10 rounded-lg">
                     <div className="text-center space-y-2 mb-4">
                       <Badge className="bg-amber-500/20 text-amber-300">{milestone.timeframe}</Badge>
                       <h4 className="text-lg font-medium text-amber-400">{milestone.milestone}</h4>
                     </div>
                    <div className="space-y-3">
                      <div>
                        <h5 className="font-medium text-amber-300 mb-2 text-sm">Requirements:</h5>
                        <div className="space-y-1">
                          {milestone.requirements.map((req, reqIndex) => (
                            <div key={reqIndex} className="text-xs text-amber-200 flex items-start gap-1">
                              <CheckCircle className="h-3 w-3 mt-0.5 flex-shrink-0" />
                              {req}
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="pt-2 border-t border-amber-500/20">
                        <h5 className="font-medium text-amber-300 mb-1 text-sm">Impact:</h5>
                        <p className="text-xs text-amber-200 italic">{milestone.impact}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </MobileAccordionContent>
          </MobileAccordionItem>

          {/* Mentorship */}
          <MobileAccordionItem value="mentorship">
            <MobileAccordionTrigger
              icon={<Users className="h-6 w-6 text-indigo-400" />}
            >
              <div className="text-sm font-medium text-indigo-400">Mentorship</div>
              <div className="text-xs text-indigo-300/80">Best Practices</div>
            </MobileAccordionTrigger>
            <MobileAccordionContent>
              <div className="bg-elec-gray border-x border-b border-elec-yellow/20 rounded-b-lg p-4 space-y-6">
                {mentorshipGuidelines.map((guideline, index) => (
                  <div key={index} className="space-y-4">
                    <div>
                      <h4 className="text-lg font-semibold text-elec-yellow flex items-center gap-2">
                        <Lightbulb className="h-5 w-5" />
                        {guideline.principle}
                      </h4>
                      <p className="text-sm text-muted-foreground mt-1">{guideline.description}</p>
                    </div>
                    <div>
                      <h5 className="font-medium text-indigo-400 mb-3 text-sm">Implementation Strategies:</h5>
                      <div className="space-y-2">
                        {guideline.implementation.map((strategy, stratIndex) => (
                          <div key={stratIndex} className="text-sm text-indigo-300 flex items-start gap-2">
                            <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full mt-2 flex-shrink-0" />
                            {strategy}
                          </div>
                        ))}
                      </div>
                    </div>
                    {index < mentorshipGuidelines.length - 1 && (
                      <div className="border-t border-gray-700/50 pt-4" />
                    )}
                  </div>
                ))}
              </div>
            </MobileAccordionContent>
          </MobileAccordionItem>
        </MobileAccordion>

        <Alert className="border-green-500/50 bg-green-500/10">
          <Download className="h-4 w-4 text-green-400" />
          <AlertDescription className="text-green-200">
            <strong>Free Resources:</strong> Download our comprehensive training templates, assessment checklists, and mentorship guides to streamline your apprentice development programme.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  // Desktop version
  return (
    <div className="space-y-6">
      <Alert className="border-blue-500/50 bg-blue-500/10">
        <Brain className="h-4 w-4 text-blue-400" />
        <AlertDescription className="text-blue-200">
          <strong>Training ROI:</strong> Comprehensive apprentice training delivers a 300-400% return on investment through reduced recruitment costs, improved retention, and enhanced productivity over 5 years.
        </AlertDescription>
      </Alert>

      <Accordion type="multiple" defaultValue={["training-investment"]} className="space-y-4">
        <AccordionItem value="training-investment" className="border-0">
          <div className="border border-blue-500/30 rounded-lg bg-blue-500/5 overflow-hidden">
            <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-blue-500/10 transition-colors">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-500/20">
                  <PoundSterling className="h-5 w-5 text-blue-400" />
                </div>
                <div className="text-left">
                  <div className="text-lg font-semibold text-blue-400">Training Investment & Cost Analysis</div>
                  <div className="text-sm text-blue-300/80">Calculate training costs and value proposition</div>
                </div>
              </div>
            </AccordionTrigger>
             <AccordionContent className="px-6 pb-6">
               <div className="space-y-6 pt-4">
                 <div className="space-y-4">
                   <h3 className="text-xl font-semibold text-elec-yellow flex items-center justify-center gap-2">
                     <BarChart className="h-5 w-5" />
                     Annual Training Investment Breakdown
                   </h3>
                  {trainingInvestment.map((item, index) => (
                    <div key={index} className={`p-4 rounded-lg border ${item.highlight ? 'bg-elec-yellow/20 border-elec-yellow/30' : 'bg-elec-dark/50 border-gray-700/50'}`}>
                      <div className={`flex flex-col ${item.highlight ? 'items-center text-center' : ''} space-y-3`}>
                        <h5 className={`font-medium text-lg ${item.highlight ? 'text-elec-yellow' : 'text-white'}`}>{item.item}</h5>
                        <p className={`text-sm text-muted-foreground ${item.highlight ? 'max-w-md' : ''}`}>{item.description}</p>
                        <div className="flex justify-center">
                          <Badge className={item.highlight 
                            ? "bg-elec-yellow/30 text-elec-yellow text-xl px-6 py-2 font-bold" 
                            : "bg-blue-500/30 text-blue-300 text-base px-4 py-2"
                          }>
                            {item.cost}
                          </Badge>
                        </div>
                        <p className="text-xs text-gray-400">{item.calculation}</p>
                        <p className="text-xs text-gray-500 italic">{item.breakdown}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </AccordionContent>
          </div>
        </AccordionItem>

        <AccordionItem value="training-phases" className="border-0">
          <div className="border border-green-500/30 rounded-lg bg-green-500/5 overflow-hidden">
            <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-green-500/10 transition-colors">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-green-500/20">
                  <Calendar className="h-5 w-5 text-green-400" />
                </div>
                <div className="text-left">
                  <div className="text-lg font-semibold text-green-400">Comprehensive Training Phase Structure</div>
                  <div className="text-sm text-green-300/80">Detailed 36-month development programme</div>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-6">
              <div className="space-y-6 pt-4">
                {trainingPhases.map((phase, index) => (
                  <div key={index} className="p-6 border border-elec-yellow/20 bg-elec-gray rounded-lg">
                    <div className="text-center space-y-3 mb-6">
                      <Badge className="bg-elec-yellow/20 text-elec-yellow text-base px-4 py-2">
                        {phase.period}
                      </Badge>
                      <h4 className="text-xl font-semibold text-elec-yellow flex items-center justify-center gap-2">
                        <BookOpen className="h-5 w-5" />
                        {phase.phase}
                      </h4>
                      <p className="text-sm text-muted-foreground max-w-2xl mx-auto">{phase.focus}</p>
                    </div>
                    
                    <div className="space-y-6">
                      <div>
                        <h5 className="font-medium text-purple-400 mb-3">Phase Objectives</h5>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {phase.objectives.map((objective, objIndex) => (
                            <div key={objIndex} className="flex items-start gap-2 text-sm text-purple-300">
                              <Target className="h-3 w-3 mt-1 flex-shrink-0" />
                              <span>{objective}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div>
                          <h5 className="font-medium text-blue-400 mb-3 flex items-center gap-2">
                            <Zap className="h-4 w-4" />
                            On-Site Activities (80%)
                          </h5>
                          <ul className="space-y-2">
                            {phase.onSiteActivities.map((activity, actIndex) => (
                              <li key={actIndex} className="text-sm text-muted-foreground flex items-start gap-2">
                                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0" />
                                {activity}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h5 className="font-medium text-green-400 mb-3 flex items-center gap-2">
                            <BookOpen className="h-4 w-4" />
                            Off-Site Training (20%)
                          </h5>
                          <ul className="space-y-2">
                            {phase.offSiteTraining.map((training, trainIndex) => (
                              <li key={trainIndex} className="text-sm text-muted-foreground flex items-start gap-2">
                                <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 flex-shrink-0" />
                                {training}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div>
                          <h5 className="font-medium text-orange-400 mb-3">Assessment Methods</h5>
                          <div className="flex flex-wrap gap-2">
                            {phase.assessmentMethods.map((assessment, assessIndex) => (
                              <Badge key={assessIndex} variant="outline" className="text-orange-300 border-orange-400/30">
                                {assessment}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h5 className="font-medium text-cyan-400 mb-3">Expected Outcomes</h5>
                          <ul className="space-y-1">
                            {phase.expectedOutcomes.map((outcome, outIndex) => (
                              <li key={outIndex} className="text-sm text-cyan-300 flex items-start gap-2">
                                <CheckCircle className="h-3 w-3 mt-1 flex-shrink-0" />
                                {outcome}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </div>
        </AccordionItem>

        <AccordionItem value="skills-matrix" className="border-0">
          <div className="border border-purple-500/30 rounded-lg bg-purple-500/5 overflow-hidden">
            <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-purple-500/10 transition-colors">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-purple-500/20">
                  <TrendingUp className="h-5 w-5 text-purple-400" />
                </div>
                <div className="text-left">
                  <div className="text-lg font-semibold text-purple-400">Skills Progression Matrix</div>
                  <div className="text-sm text-purple-300/80">Competency development framework</div>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-6">
              <div className="space-y-6 pt-4">
                 {skillsMatrix.map((category, catIndex) => (
                   <div key={catIndex} className="p-6 border border-elec-yellow/20 bg-elec-gray rounded-lg">
                     <div className="text-center mb-6">
                       <h4 className="text-xl font-semibold text-elec-yellow mb-2">{category.category}</h4>
                       <p className="text-sm text-muted-foreground max-w-2xl mx-auto">{category.description}</p>
                     </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {category.levels.map((level, levelIndex) => (
                        <div key={levelIndex} className={`p-4 rounded-lg border ${
                          level.color === 'red' ? 'bg-red-500/10 border-red-500/30' :
                          level.color === 'amber' ? 'bg-amber-500/10 border-amber-500/30' :
                          'bg-green-500/10 border-green-500/30'
                        }`}>
                          <div className="flex items-center gap-2 mb-3">
                            <Badge className={
                              level.color === 'red' ? 'bg-red-500/20 text-red-400' :
                              level.color === 'amber' ? 'bg-amber-500/20 text-amber-400' :
                              'bg-green-500/20 text-green-400'
                            }>
                              {level.badge}
                            </Badge>
                          </div>
                          <div className="space-y-2">
                            {level.competencies.map((competency, compIndex) => (
                              <div key={compIndex} className={`flex items-start gap-2 text-sm ${
                                level.color === 'red' ? 'text-red-300' :
                                level.color === 'amber' ? 'text-amber-300' :
                                'text-green-300'
                              }`}>
                                <CheckCircle className="h-3 w-3 mt-0.5 flex-shrink-0" />
                                {competency}
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </div>
        </AccordionItem>

        <AccordionItem value="training-methods" className="border-0">
          <div className="border border-cyan-500/30 rounded-lg bg-cyan-500/5 overflow-hidden">
            <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-cyan-500/10 transition-colors">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-cyan-500/20">
                  <Clock className="h-5 w-5 text-cyan-400" />
                </div>
                <div className="text-left">
                  <div className="text-lg font-semibold text-cyan-400">Training Methods & Delivery Options</div>
                  <div className="text-sm text-cyan-300/80">Compare different training approaches</div>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-6">
              <div className="space-y-4 pt-4">
                 {trainingMethods.map((method, index) => (
                   <div key={index} className="p-6 border border-elec-yellow/20 bg-elec-gray rounded-lg">
                     <div className="text-center mb-6">
                       <h4 className="text-xl font-semibold text-elec-yellow flex items-center justify-center gap-2 mb-2">
                         <Brain className="h-5 w-5" />
                         {method.method}
                       </h4>
                       <p className="text-sm text-muted-foreground max-w-2xl mx-auto">{method.description}</p>
                     </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div>
                        <h5 className="font-medium text-green-400 mb-3">Key Benefits</h5>
                        <ul className="space-y-2">
                          {method.benefits.map((benefit, benefitIndex) => (
                            <li key={benefitIndex} className="text-sm text-green-300 flex items-start gap-2">
                              <Star className="h-3 w-3 mt-1 flex-shrink-0" />
                              {benefit}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="space-y-4">
                        <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                          <div className="space-y-2">
                            <div className="flex justify-between items-center">
                              <span className="text-sm font-medium text-blue-300">Time Commitment:</span>
                              <span className="text-sm text-blue-200">{method.timeCommitment}</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-sm font-medium text-blue-300">Cost Range:</span>
                              <Badge className="bg-blue-500/20 text-blue-400">{method.costRange}</Badge>
                            </div>
                            <div className="pt-2 border-t border-blue-500/20">
                              <span className="text-xs text-blue-200">Funding: {method.funding}</span>
                            </div>
                            <div className="pt-1">
                              <span className="text-xs text-blue-300">Best For: {method.bestFor}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </div>
        </AccordionItem>

        <AccordionItem value="progress-tracking" className="border-0">
          <div className="border border-amber-500/30 rounded-lg bg-amber-500/5 overflow-hidden">
            <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-amber-500/10 transition-colors">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-amber-500/20">
                  <Award className="h-5 w-5 text-amber-400" />
                </div>
                <div className="text-left">
                  <div className="text-lg font-semibold text-amber-400">Progress Tracking & Milestones</div>
                  <div className="text-sm text-amber-300/80">Key development checkpoints and achievements</div>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-6">
              <div className="space-y-4 pt-4">
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                   {progressTracking.map((milestone, index) => (
                     <div key={index} className="p-4 border border-amber-500/20 bg-amber-500/10 rounded-lg">
                       <div className="text-center space-y-2 mb-4">
                         <Badge className="bg-amber-500/20 text-amber-300">{milestone.timeframe}</Badge>
                         <h4 className="text-lg font-medium text-amber-400">{milestone.milestone}</h4>
                       </div>
                      <div className="space-y-3">
                        <div>
                          <h5 className="font-medium text-amber-300 mb-2 text-sm">Requirements:</h5>
                          <ul className="space-y-1">
                            {milestone.requirements.map((req, reqIndex) => (
                              <li key={reqIndex} className="text-xs text-amber-200 flex items-start gap-1">
                                <CheckCircle className="h-3 w-3 mt-0.5 flex-shrink-0" />
                                {req}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="pt-2 border-t border-amber-500/20">
                          <h5 className="font-medium text-amber-300 mb-1 text-sm">Impact:</h5>
                          <p className="text-xs text-amber-200 italic">{milestone.impact}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </AccordionContent>
          </div>
        </AccordionItem>

        <AccordionItem value="mentorship" className="border-0">
          <div className="border border-indigo-500/30 rounded-lg bg-indigo-500/5 overflow-hidden">
            <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-indigo-500/10 transition-colors">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-indigo-500/20">
                  <Users className="h-5 w-5 text-indigo-400" />
                </div>
                <div className="text-left">
                  <div className="text-lg font-semibold text-indigo-400">Mentorship Guidelines & Best Practices</div>
                  <div className="text-sm text-indigo-300/80">Effective apprentice guidance strategies</div>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-6">
              <div className="space-y-6 pt-4">
                 {mentorshipGuidelines.map((guideline, index) => (
                   <div key={index} className="p-6 border border-elec-yellow/20 bg-elec-gray rounded-lg">
                     <div className="text-center mb-6">
                       <h4 className="text-xl font-semibold text-elec-yellow flex items-center justify-center gap-2 mb-2">
                         <Lightbulb className="h-5 w-5" />
                         {guideline.principle}
                       </h4>
                       <p className="text-sm text-muted-foreground max-w-2xl mx-auto">{guideline.description}</p>
                     </div>
                    <div>
                      <h5 className="font-medium text-indigo-400 mb-3">Implementation Strategies:</h5>
                      <ul className="space-y-2">
                        {guideline.implementation.map((strategy, stratIndex) => (
                          <li key={stratIndex} className="text-sm text-indigo-300 flex items-start gap-2">
                            <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full mt-2 flex-shrink-0" />
                            {strategy}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </div>
        </AccordionItem>
      </Accordion>

      <Alert className="border-green-500/50 bg-green-500/10">
        <Download className="h-4 w-4 text-green-400" />
        <AlertDescription className="text-green-200">
          <strong>Free Resources:</strong> Download our comprehensive training templates, assessment checklists, and mentorship guides to streamline your apprentice development programme.
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default TrainingDevelopmentTab;