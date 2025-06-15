
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, Target, Calendar, Users, TrendingUp, Award, Clock, Brain, FileText, CheckCircle, Star, Lightbulb } from "lucide-react";

const TrainingDevelopmentTab = () => {
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
    },
    { 
      skill: "Customer Service", 
      level1: { description: "Observes customer interactions", competencies: ["Professional appearance", "Polite communication", "Follow customer requirements"] },
      level2: { description: "Handles basic customer communication", competencies: ["Explain work clearly", "Handle complaints", "Provide technical advice"] },
      level3: { description: "Manages customer relationships", competencies: ["Build long-term relationships", "Identify new opportunities", "Lead customer meetings"] }
    },
    { 
      skill: "Problem Solving", 
      level1: { description: "Follows instructions and procedures", competencies: ["Follow fault-finding procedures", "Use basic diagnostic tools", "Report findings accurately"] },
      level2: { description: "Identifies solutions independently", competencies: ["Analyse complex problems", "Propose multiple solutions", "Implement effective fixes"] },
      level3: { description: "Innovates and improves processes", competencies: ["Develop new procedures", "Mentor others in problem-solving", "Lead continuous improvement"] }
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
    },
    {
      method: "Industry Workshops & Seminars",
      description: "Specialist training sessions on new technologies and regulations",
      benefits: ["Latest industry updates", "Networking opportunities", "Expert instruction"],
      timeCommitment: "2-4 hours per month",
      costEstimate: "£200-800 per year"
    }
  ];

  const mentorshipFramework = [
    {
      stage: "Mentor Selection",
      criteria: ["Minimum 5 years experience", "Strong communication skills", "Patience and teaching ability", "Positive attitude", "Company values alignment"],
      responsibilities: ["Skills assessment", "Goal setting", "Regular feedback", "Career guidance", "Performance monitoring"]
    },
    {
      stage: "Structured Mentoring Program",
      criteria: ["Weekly one-to-one sessions", "Monthly progress reviews", "Quarterly goal reassessment", "Annual development planning", "EPA preparation support"],
      responsibilities: ["Learning plan development", "Skills gap identification", "Progress documentation", "Career pathway guidance", "Industry knowledge sharing"]
    },
    {
      stage: "Peer Learning Networks",
      criteria: ["Cross-departmental exposure", "Project-based learning", "Knowledge sharing sessions", "Problem-solving workshops", "Innovation projects"],
      responsibilities: ["Collaboration skills", "Knowledge transfer", "Team building", "Communication development", "Leadership preparation"]
    }
  ];

  const assessmentStrategy = [
    {
      type: "Formative Assessments",
      frequency: "Ongoing",
      methods: ["Daily observation checklists", "Weekly skill demonstrations", "Monthly knowledge checks", "Peer feedback sessions"],
      purpose: "Monitor progress and provide immediate feedback"
    },
    {
      type: "Summative Assessments",
      frequency: "Quarterly",
      methods: ["Practical skills tests", "Written examinations", "Portfolio reviews", "Customer feedback analysis"],
      purpose: "Evaluate competency achievement and learning outcomes"
    },
    {
      type: "Self-Assessment",
      frequency: "Monthly",
      methods: ["Skills self-evaluation", "Learning reflection journals", "Goal-setting exercises", "Career planning activities"],
      purpose: "Develop self-awareness and ownership of learning"
    },
    {
      type: "360-Degree Feedback",
      frequency: "Bi-annually",
      methods: ["Supervisor evaluations", "Peer assessments", "Customer feedback", "Self-evaluation synthesis"],
      purpose: "Comprehensive performance review and development planning"
    }
  ];

  const innovativeTrainingApproaches = [
    {
      approach: "Virtual Reality Training",
      description: "Immersive simulations for dangerous or complex scenarios",
      applications: ["High-voltage safety training", "Complex fault finding", "Emergency procedures"],
      benefits: ["Safe learning environment", "Repeatable scenarios", "Engaging experience"],
      implementation: "Partner with VR training providers or invest in equipment"
    },
    {
      approach: "Micro-Learning Modules",
      description: "Bite-sized learning sessions focusing on specific skills",
      applications: ["Daily safety tips", "Regulation updates", "Quick skill refreshers"],
      benefits: ["Easy to fit into work schedule", "High retention rates", "Just-in-time learning"],
      implementation: "Develop mobile app or use existing platforms"
    },
    {
      approach: "Gamification",
      description: "Game-like elements to increase engagement and motivation",
      applications: ["Knowledge competitions", "Achievement badges", "Progress tracking"],
      benefits: ["Increased motivation", "Healthy competition", "Clear progress indicators"],
      implementation: "Design point systems and reward structures"
    },
    {
      approach: "Blended Learning",
      description: "Combination of online and face-to-face learning methods",
      applications: ["Theory online, practice in-person", "Flexible scheduling", "Personalised learning paths"],
      benefits: ["Flexibility", "Cost-effective", "Personalised experience"],
      implementation: "Integrate multiple learning platforms and methods"
    }
  ];

  const qualityAssuranceFramework = [
    {
      element: "Training Provider Evaluation",
      criteria: ["Ofsted ratings", "Industry accreditations", "Employer feedback", "Pass rates", "Employment outcomes"],
      monitoring: "Annual reviews and audits"
    },
    {
      element: "Curriculum Relevance",
      criteria: ["Industry standards alignment", "Employer feedback", "Technology updates", "Skills gap analysis", "Future skills requirements"],
      monitoring: "Quarterly curriculum reviews"
    },
    {
      element: "Assessment Validity",
      criteria: ["Industry relevance", "Assessment criteria clarity", "Consistency across assessors", "Fair and unbiased", "Continuous improvement"],
      monitoring: "Monthly assessment reviews"
    },
    {
      element: "Employer Engagement",
      criteria: ["Regular communication", "Feedback collection", "Improvement implementation", "Partnership development", "Resource sharing"],
      monitoring: "Ongoing relationship management"
    }
  ];

  return (
    <div className="space-y-6">
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

      <Card className="border-purple-500/20 bg-purple-500/10">
        <CardHeader>
          <CardTitle className="text-purple-400 flex items-center gap-2">
            <Users className="h-5 w-5" />
            Advanced Mentorship Framework
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {mentorshipFramework.map((stage, index) => (
              <div key={index} className="p-4 bg-purple-500/5 border border-purple-500/30 rounded-lg">
                <h4 className="font-semibold text-purple-300 mb-3">{stage.stage}</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="text-sm font-medium text-purple-300 mb-2">Selection Criteria:</h5>
                    <ul className="space-y-1">
                      {stage.criteria.map((criterion, cIndex) => (
                        <li key={cIndex} className="text-xs text-purple-200 flex items-start gap-2">
                          <Award className="h-3 w-3 mt-0.5 flex-shrink-0" />
                          {criterion}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-sm font-medium text-purple-300 mb-2">Key Responsibilities:</h5>
                    <ul className="space-y-1">
                      {stage.responsibilities.map((responsibility, rIndex) => (
                        <li key={rIndex} className="text-xs text-purple-200 flex items-start gap-2">
                          <CheckCircle className="h-3 w-3 mt-0.5 flex-shrink-0" />
                          {responsibility}
                        </li>
                      ))}
                    </ul>
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
            <Brain className="h-5 w-5" />
            Assessment Strategy & Progress Monitoring
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {assessmentStrategy.map((assessment, index) => (
              <div key={index} className="p-4 bg-green-500/5 border border-green-500/30 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-green-300">{assessment.type}</h4>
                  <Badge className="bg-green-500/20 text-green-400">{assessment.frequency}</Badge>
                </div>
                <p className="text-sm text-green-200 mb-3">{assessment.purpose}</p>
                <div>
                  <h5 className="text-xs font-medium text-green-300 mb-2">Methods:</h5>
                  <div className="space-y-1">
                    {assessment.methods.map((method, mIndex) => (
                      <div key={mIndex} className="text-xs text-green-200 flex items-center gap-1">
                        <FileText className="h-3 w-3" />
                        {method}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-orange-500/20 bg-orange-500/10">
        <CardHeader>
          <CardTitle className="text-orange-400 flex items-center gap-2">
            <Lightbulb className="h-5 w-5" />
            Innovative Training Approaches
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {innovativeTrainingApproaches.map((approach, index) => (
              <div key={index} className="p-4 bg-orange-500/5 border border-orange-500/30 rounded-lg">
                <h4 className="font-semibold text-orange-300 mb-2">{approach.approach}</h4>
                <p className="text-sm text-orange-200 mb-3">{approach.description}</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <h5 className="text-xs font-medium text-orange-300 mb-1">Applications:</h5>
                    <ul className="text-xs text-orange-200 space-y-1">
                      {approach.applications.map((app, aIndex) => (
                        <li key={aIndex}>• {app}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-xs font-medium text-orange-300 mb-1">Benefits:</h5>
                    <ul className="text-xs text-orange-200 space-y-1">
                      {approach.benefits.map((benefit, bIndex) => (
                        <li key={bIndex}>• {benefit}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-xs font-medium text-orange-300 mb-1">Implementation:</h5>
                    <p className="text-xs text-orange-200">{approach.implementation}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-yellow-500/20 bg-yellow-500/10">
        <CardHeader>
          <CardTitle className="text-yellow-400 flex items-center gap-2">
            <CheckCircle className="h-5 w-5" />
            Quality Assurance Framework
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {qualityAssuranceFramework.map((element, index) => (
              <div key={index} className="p-4 bg-yellow-500/5 border border-yellow-500/30 rounded-lg">
                <h4 className="font-semibold text-yellow-300 mb-2">{element.element}</h4>
                <div className="space-y-2">
                  <div>
                    <h5 className="text-xs font-medium text-yellow-300 mb-1">Quality Criteria:</h5>
                    <ul className="text-xs text-yellow-200 space-y-1">
                      {element.criteria.map((criterion, cIndex) => (
                        <li key={cIndex}>• {criterion}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="pt-2 border-t border-yellow-500/20">
                    <span className="text-xs text-yellow-300 font-medium">Monitoring: </span>
                    <span className="text-xs text-yellow-200">{element.monitoring}</span>
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
