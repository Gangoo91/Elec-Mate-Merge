
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MobileAccordion, MobileAccordionContent, MobileAccordionItem, MobileAccordionTrigger } from "@/components/ui/mobile-accordion";
import { useIsMobile } from "@/hooks/use-mobile";
import { BookOpen, Target, Calendar, Users, TrendingUp, Award, Clock, Brain, FileText, CheckCircle, Star, Lightbulb, Download } from "lucide-react";

const TrainingDevelopmentTab = () => {
  const isMobile = useIsMobile();

  const trainingStructure = [
    {
      period: "Months 1-6",
      phase: "Foundation Phase",
      objectives: ["Build basic electrical knowledge", "Develop safety awareness", "Learn company procedures", "Establish learning habits"],
      onSite: [
        "Basic health and safety awareness and implementation",
        "Tool familiarisation, care, and proper usage",
        "Simple cable installation tasks under supervision",
        "Observation of experienced electricians on various projects",
        "Site induction and company-specific procedures",
        "Customer interaction basics and communication skills",
        "Quality control standards and documentation requirements"
      ],
      offSite: [
        "Electrical theory fundamentals and principles",
        "Health and safety regulations (CDM, HASAWA, etc.)",
        "Basic electrical calculations and formulae",
        "Wiring regulations introduction (BS 7671 basics)",
        "Technical drawing interpretation and sketching",
        "Functional skills development (English and Maths)",
        "Industry history and career pathway understanding"
      ],
      assessments: ["Basic knowledge tests", "Practical skill demonstrations", "Safety procedure assessments", "Portfolio development start"]
    },
    {
      period: "Months 7-18",
      phase: "Development Phase",
      objectives: ["Apply theoretical knowledge practically", "Develop independence", "Build customer relationships", "Specialise in key areas"],
      onSite: [
        "Circuit installation under decreasing supervision",
        "Use of testing equipment and measurement tools",
        "Fault finding assistance and diagnostic support",
        "Direct customer interaction and relationship building",
        "Quality control procedures and self-inspection",
        "Project planning assistance and resource management",
        "Mentoring newer apprentices and knowledge sharing"
      ],
      offSite: [
        "Advanced electrical theory and complex calculations",
        "Testing and inspection procedures (comprehensive)",
        "Wiring regulations detailed study (BS 7671 in depth)",
        "Motor control systems and industrial applications",
        "Emergency lighting and fire alarm systems",
        "Energy efficiency and renewable technologies",
        "Business skills and commercial awareness development"
      ],
      assessments: ["Intermediate practical tests", "Written examinations", "Customer feedback reviews", "Competency-based assessments"]
    },
    {
      period: "Months 19-36",
      phase: "Competency Phase",
      objectives: ["Achieve full competency", "Lead small projects", "Prepare for EPA", "Plan career development"],
      onSite: [
        "Independent circuit design and implementation",
        "Complex installation work and system integration",
        "Comprehensive fault diagnosis and repair",
        "Customer consultation and technical advice",
        "Site management responsibilities and team leadership",
        "Training and mentoring junior apprentices",
        "Innovation projects and process improvements"
      ],
      offSite: [
        "Specialised systems training (smart homes, industrial control)",
        "Business and commercial awareness enhancement",
        "Advanced testing procedures and certification processes",
        "New technology and innovation understanding",
        "End-point assessment preparation and mock assessments",
        "Professional development planning and goal setting",
        "Industry networking and continuous learning strategies"
      ],
      assessments: ["EPA preparation assessments", "Independent project completion", "Professional interview simulations", "Portfolio final review"]
    }
  ];

  const skillsProgressionMatrix = [
    { 
      skill: "Health & Safety Awareness", 
      level1: { description: "Basic understanding of common hazards", competencies: ["Recognise basic electrical hazards", "Use basic PPE correctly", "Follow simple safety procedures"] },
      level2: { description: "Proactive hazard identification", competencies: ["Conduct risk assessments", "Implement control measures", "Report near misses effectively"] },
      level3: { description: "Lead safety initiatives and training", competencies: ["Train others in safety procedures", "Develop safety protocols", "Investigate incidents thoroughly"] }
    },
    { 
      skill: "Technical Knowledge", 
      level1: { description: "Understands basic electrical principles", competencies: ["Apply Ohm's law", "Understand AC/DC concepts", "Read simple circuit diagrams"] },
      level2: { description: "Applies complex electrical principles", competencies: ["Design circuits", "Calculate power factors", "Understand three-phase systems"] },
      level3: { description: "Solves complex technical problems", competencies: ["Troubleshoot complex faults", "Design system solutions", "Optimise electrical installations"] }
    },
    { 
      skill: "Practical Skills", 
      level1: { description: "Performs simple tasks with guidance", competencies: ["Install basic wiring", "Use hand tools safely", "Follow work instructions"] },
      level2: { description: "Completes standard installations independently", competencies: ["Install consumer units", "Test installations", "Complete certificates"] },
      level3: { description: "Handles complex systems and projects", competencies: ["Install industrial systems", "Commission complex equipment", "Manage project timelines"] }
    }
  ];

  const offTheJobTrainingMethods = [
    {
      method: "College/Training Provider Attendance",
      description: "Structured classroom learning with qualified instructors",
      benefits: ["Accredited qualifications", "Peer learning opportunities", "Access to specialist equipment"],
      timeCommitment: "1-2 days per week",
      costEstimate: "£3,000-6,000 per year"
    },
    {
      method: "Online Learning Platforms",
      description: "Flexible digital learning modules and virtual classrooms",
      benefits: ["Self-paced learning", "Lower costs", "Easy progress tracking"],
      timeCommitment: "6-8 hours per week",
      costEstimate: "£500-1,500 per year"
    },
    {
      method: "In-House Training Programs",
      description: "Company-specific training delivered by internal experts",
      benefits: ["Tailored to company needs", "Immediate application", "Lower external costs"],
      timeCommitment: "4-6 hours per week",
      costEstimate: "£1,000-3,000 per year"
    }
  ];

  const quickActionItems = [
    { action: "Download Training Plan Template", icon: <Download className="h-4 w-4" />, description: "Structured training progression template" },
    { action: "Skills Assessment Checklist", icon: <CheckCircle className="h-4 w-4" />, description: "Track apprentice development" },
    { action: "Mentor Guidelines", icon: <Users className="h-4 w-4" />, description: "Best practices for mentoring" }
  ];

  if (isMobile) {
    return (
      <div className="space-y-4">
        {/* Quick Actions for Mobile */}
        <Card className="border-blue-500/20 bg-blue-500/10">
          <CardHeader>
            <CardTitle className="text-blue-400 text-lg">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {quickActionItems.map((item, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-blue-500/5 border border-blue-500/30 rounded-lg">
                  {item.icon}
                  <div>
                    <h4 className="font-medium text-blue-300">{item.action}</h4>
                    <p className="text-xs text-blue-200">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <MobileAccordion type="single" collapsible className="space-y-2">
          {trainingStructure.map((phase, index) => (
            <MobileAccordionItem key={index} value={`phase-${index}`}>
              <MobileAccordionTrigger icon={<BookOpen className="h-5 w-5" />}>
                {phase.phase} ({phase.period})
              </MobileAccordionTrigger>
              <MobileAccordionContent className="border-x border-b border-elec-yellow/20 rounded-b-lg bg-elec-gray">
                <div className="p-4 space-y-4">
                  <div>
                    <h5 className="font-medium text-purple-400 mb-2 text-sm">Phase Objectives</h5>
                    <div className="space-y-2">
                      {phase.objectives.map((objective, objIndex) => (
                        <div key={objIndex} className="flex items-start gap-2 text-sm text-purple-300">
                          <Target className="h-3 w-3 mt-1 flex-shrink-0" />
                          <span className="text-xs leading-relaxed">{objective}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h5 className="font-medium text-blue-400 mb-2 text-sm flex items-center gap-2">
                      <Target className="h-4 w-4" />
                      On-Site Training (80%)
                    </h5>
                    <div className="space-y-2">
                      {phase.onSite.map((item, itemIndex) => (
                        <div key={itemIndex} className="text-xs text-muted-foreground flex items-start gap-2 p-2 bg-elec-dark/30 rounded">
                          <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-1.5 flex-shrink-0" />
                          <span className="leading-relaxed">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h5 className="font-medium text-green-400 mb-2 text-sm flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      Off-Site Training (20%)
                    </h5>
                    <div className="space-y-2">
                      {phase.offSite.map((item, itemIndex) => (
                        <div key={itemIndex} className="text-xs text-muted-foreground flex items-start gap-2 p-2 bg-elec-dark/30 rounded">
                          <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-1.5 flex-shrink-0" />
                          <span className="leading-relaxed">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h5 className="font-medium text-orange-400 mb-2 text-sm">Assessment Methods</h5>
                    <div className="flex flex-wrap gap-1">
                      {phase.assessments.map((assessment, assessIndex) => (
                        <Badge key={assessIndex} variant="outline" className="text-orange-300 border-orange-400/30 text-xs">
                          {assessment}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </MobileAccordionContent>
            </MobileAccordionItem>
          ))}

          <MobileAccordionItem value="skills">
            <MobileAccordionTrigger icon={<TrendingUp className="h-5 w-5" />}>
              Skills Progression Matrix
            </MobileAccordionTrigger>
            <MobileAccordionContent className="border-x border-b border-elec-yellow/20 rounded-b-lg bg-elec-gray">
              <div className="p-4 space-y-4">
                {skillsProgressionMatrix.map((skill, index) => (
                  <div key={index} className="space-y-3">
                    <h4 className="font-medium text-white text-sm">{skill.skill}</h4>
                    <div className="space-y-3">
                      <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge className="bg-red-500/20 text-red-400 text-xs">Level 1</Badge>
                          <h5 className="text-xs font-medium text-red-300">Beginner</h5>
                        </div>
                        <p className="text-xs text-red-200 mb-2">{skill.level1.description}</p>
                        <div className="space-y-1">
                          {skill.level1.competencies.map((comp, compIndex) => (
                            <div key={compIndex} className="flex items-start gap-1 text-xs text-red-300">
                              <CheckCircle className="h-3 w-3 mt-0.5 flex-shrink-0" />
                              <span className="leading-relaxed">{comp}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge className="bg-amber-500/20 text-amber-400 text-xs">Level 2</Badge>
                          <h5 className="text-xs font-medium text-amber-300">Competent</h5>
                        </div>
                        <p className="text-xs text-amber-200 mb-2">{skill.level2.description}</p>
                        <div className="space-y-1">
                          {skill.level2.competencies.map((comp, compIndex) => (
                            <div key={compIndex} className="flex items-start gap-1 text-xs text-amber-300">
                              <CheckCircle className="h-3 w-3 mt-0.5 flex-shrink-0" />
                              <span className="leading-relaxed">{comp}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge className="bg-green-500/20 text-green-400 text-xs">Level 3</Badge>
                          <h5 className="text-xs font-medium text-green-300">Expert</h5>
                        </div>
                        <p className="text-xs text-green-200 mb-2">{skill.level3.description}</p>
                        <div className="space-y-1">
                          {skill.level3.competencies.map((comp, compIndex) => (
                            <div key={compIndex} className="flex items-start gap-1 text-xs text-green-300">
                              <CheckCircle className="h-3 w-3 mt-0.5 flex-shrink-0" />
                              <span className="leading-relaxed">{comp}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </MobileAccordionContent>
          </MobileAccordionItem>

          <MobileAccordionItem value="training-methods">
            <MobileAccordionTrigger icon={<Clock className="h-5 w-5" />}>
              Off-the-Job Training Methods
            </MobileAccordionTrigger>
            <MobileAccordionContent className="border-x border-b border-elec-yellow/20 rounded-b-lg bg-blue-500/10">
              <div className="p-4 space-y-4">
                {offTheJobTrainingMethods.map((method, index) => (
                  <div key={index} className="p-3 bg-blue-500/5 border border-blue-500/30 rounded-lg">
                    <h4 className="font-semibold text-blue-300 mb-2 text-sm">{method.method}</h4>
                    <p className="text-xs text-blue-200 mb-3 leading-relaxed">{method.description}</p>
                    <div className="space-y-2">
                      <div>
                        <h5 className="text-xs font-medium text-blue-300 mb-1">Benefits:</h5>
                        <ul className="text-xs text-blue-200 space-y-1">
                          {method.benefits.map((benefit, bIndex) => (
                            <li key={bIndex} className="flex items-start gap-1">
                              <Star className="h-2 w-2 mt-1 flex-shrink-0" />
                              <span className="leading-relaxed">{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="flex flex-col gap-1 pt-2 border-t border-blue-500/20">
                        <span className="text-xs text-blue-300">Time: {method.timeCommitment}</span>
                        <Badge className="bg-blue-500/20 text-blue-400 text-xs self-start">{method.costEstimate}</Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </MobileAccordionContent>
          </MobileAccordionItem>
        </MobileAccordion>
      </div>
    );
  }

  // Desktop view remains comprehensive but with better organization
  return (
    <div className="space-y-6">
      {/* Quick Actions for Desktop */}
      <Card className="border-blue-500/20 bg-blue-500/10">
        <CardHeader>
          <CardTitle className="text-blue-400 flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {quickActionItems.map((item, index) => (
              <div key={index} className="flex items-center gap-3 p-4 bg-blue-500/5 border border-blue-500/30 rounded-lg cursor-pointer hover:bg-blue-500/10 transition-colors">
                {item.icon}
                <div>
                  <h4 className="font-medium text-blue-300">{item.action}</h4>
                  <p className="text-sm text-blue-200">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Training Structure */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="text-elec-yellow flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Comprehensive Training Structure & Progression
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            {trainingStructure.map((phase, index) => (
              <div key={index} className="border border-elec-yellow/20 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold text-white text-lg">{phase.phase}</h4>
                  <Badge className="bg-elec-yellow/20 text-elec-yellow">
                    {phase.period}
                  </Badge>
                </div>
                
                <div className="mb-4">
                  <h5 className="font-medium text-purple-400 mb-2">Phase Objectives</h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {phase.objectives.map((objective, objIndex) => (
                      <div key={objIndex} className="flex items-center gap-2 text-sm text-purple-300">
                        <Target className="h-3 w-3" />
                        {objective}
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <h5 className="font-medium text-blue-400 mb-3 flex items-center gap-2">
                      <Target className="h-4 w-4" />
                      On-Site Training (80%)
                    </h5>
                    <ul className="space-y-2">
                      {phase.onSite.map((item, itemIndex) => (
                        <li key={itemIndex} className="text-sm text-muted-foreground flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h5 className="font-medium text-green-400 mb-3 flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      Off-Site Training (20%)
                    </h5>
                    <ul className="space-y-2">
                      {phase.offSite.map((item, itemIndex) => (
                        <li key={itemIndex} className="text-sm text-muted-foreground flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-4">
                  <h5 className="font-medium text-orange-400 mb-2">Assessment Methods</h5>
                  <div className="flex flex-wrap gap-2">
                    {phase.assessments.map((assessment, assessIndex) => (
                      <Badge key={assessIndex} variant="outline" className="text-orange-300 border-orange-400/30">
                        {assessment}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Skills Progression Matrix */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="text-elec-yellow flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Skills Progression Matrix & Competency Development
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {skillsProgressionMatrix.map((skill, index) => (
              <div key={index} className="space-y-3">
                <h4 className="font-medium text-white text-lg">{skill.skill}</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className="bg-red-500/20 text-red-400">Level 1</Badge>
                      <h5 className="text-sm font-medium text-red-300">Beginner</h5>
                    </div>
                    <p className="text-xs text-red-200 mb-3">{skill.level1.description}</p>
                    <div className="space-y-1">
                      {skill.level1.competencies.map((comp, compIndex) => (
                        <div key={compIndex} className="flex items-start gap-1 text-xs text-red-300">
                          <CheckCircle className="h-3 w-3 mt-0.5 flex-shrink-0" />
                          {comp}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className="bg-amber-500/20 text-amber-400">Level 2</Badge>
                      <h5 className="text-sm font-medium text-amber-300">Competent</h5>
                    </div>
                    <p className="text-xs text-amber-200 mb-3">{skill.level2.description}</p>
                    <div className="space-y-1">
                      {skill.level2.competencies.map((comp, compIndex) => (
                        <div key={compIndex} className="flex items-start gap-1 text-xs text-amber-300">
                          <CheckCircle className="h-3 w-3 mt-0.5 flex-shrink-0" />
                          {comp}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className="bg-green-500/20 text-green-400">Level 3</Badge>
                      <h5 className="text-sm font-medium text-green-300">Expert</h5>
                    </div>
                    <p className="text-xs text-green-200 mb-3">{skill.level3.description}</p>
                    <div className="space-y-1">
                      {skill.level3.competencies.map((comp, compIndex) => (
                        <div key={compIndex} className="flex items-start gap-1 text-xs text-green-300">
                          <CheckCircle className="h-3 w-3 mt-0.5 flex-shrink-0" />
                          {comp}
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

      {/* Off-the-Job Training Methods */}
      <Card className="border-blue-500/20 bg-blue-500/10">
        <CardHeader>
          <CardTitle className="text-blue-400 flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Off-the-Job Training Methods & Costs
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {offTheJobTrainingMethods.map((method, index) => (
              <div key={index} className="p-4 bg-blue-500/5 border border-blue-500/30 rounded-lg">
                <h4 className="font-semibold text-blue-300 mb-2">{method.method}</h4>
                <p className="text-sm text-blue-200 mb-3">{method.description}</p>
                <div className="space-y-2">
                  <div>
                    <h5 className="text-xs font-medium text-blue-300 mb-1">Benefits:</h5>
                    <ul className="text-xs text-blue-200 space-y-1">
                      {method.benefits.map((benefit, bIndex) => (
                        <li key={bIndex} className="flex items-center gap-1">
                          <Star className="h-2 w-2" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t border-blue-500/20">
                    <span className="text-xs text-blue-300">{method.timeCommitment}</span>
                    <Badge className="bg-blue-500/20 text-blue-400 text-xs">{method.costEstimate}</Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TrainingDevelopmentTab;
