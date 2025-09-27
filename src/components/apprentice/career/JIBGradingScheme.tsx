
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MobileAccordion, MobileAccordionItem, MobileAccordionTrigger, MobileAccordionContent } from "@/components/ui/mobile-accordion";
import { Award, Clock, BookOpen, CheckCircle, Shield, Briefcase, MapPin, TrendingUp, Users, Banknote, Calculator, Target, DollarSign, Building, Zap, Settings, Lightbulb } from "lucide-react";
import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

const JIBGradingScheme = () => {
  const isMobile = useIsMobile();
  const [selectedGradeIndex, setSelectedGradeIndex] = useState<number | null>(null);

  const jibGrades = [
    {
      grade: "Apprentice",
      color: "bg-blue-500/20 text-blue-400 border-blue-500/30",
      hourlyRate: "£7.55 minimum (2025)",
      dayRate: "£60-65/day typical",
      requirements: [
        "Enrolled on approved Level 3 apprenticeship programme", 
        "Working towards 2357/5357 NVQ Diploma",
        "Health & Safety test passed (CSCS Construction)",
        "Monthly college attendance (day/block release)",
        "Employer mentorship programme",
        "DBS check (Basic level) for some sites"
      ],
      benefits: [
        "Apprentice minimum wage protection (£7.55/hr minimum)",
        "Structured 4-year training pathway with portfolio building", 
        "Industry recognition and ECS Apprentice card eligibility",
        "Government funding support (up to £18,000 per apprentice)",
        "Clear progression route to Improver status",
        "Access to JTL/NICEIC/ECA apprentice support networks",
        "Career development guidance and mentorship"
      ],
      responsibilities: [
        "Basic electrical installation under direct supervision",
        "Cable pulling, containment installation, basic connections",
        "Health & safety compliance and risk awareness",
        "Portfolio evidence collection and reflective practice",
        "College assignment completion and practical assessments",
        "Site housekeeping and tool maintenance",
        "Following method statements and risk assessments"
      ],
      cpd: [
        "18th Edition BS 7671 preparation (Year 3-4)",
        "First Aid at Work certification",
        "Working at Height awareness training",
        "Fire safety and emergency procedures",
        "Manufacturer product training (cable management, accessories)",
        "Digital skills development (apps, testing equipment)",
        "EV charging fundamentals introduction"
      ],
      duration: "4 years (Level 3 apprenticeship standard)",
      fastTrack: "Adult apprenticeships may complete in 2-3 years with prior experience"
    },
    {
      grade: "Improver",
      color: "bg-purple-500/20 text-purple-400 border-purple-500/30", 
      hourlyRate: "£15-20/hr typical (2025)",
      dayRate: "£160-220/day London premium",
      requirements: [
        "Level 3 NVQ Diploma (2357/5357) completed",
        "18th Edition BS 7671 (2382-22) certificate current",
        "Working towards AM2/AM2S practical assessment",
        "Minimum 6 months post-qualification experience",
        "ECS Health & Safety test passed",
        "Evidence portfolio demonstrating practical competence"
      ],
      benefits: [
        "Higher pay rates (£15-20/hr typical, £160-220/day)",
        "More complex work opportunities and reduced supervision",
        "Preparation pathway for ECS Gold Card application",
        "Access to specialist training courses (EV, Solar PV, Smart Buildings)",
        "Career development discussions with senior electricians",
        "Opportunity to work on renewable energy projects",
        "Access to manufacturer training programs (Schneider, ABB, Siemens)"
      ],
      responsibilities: [
        "Installation and commissioning of electrical circuits",
        "Basic testing and inspection procedures (dead tests)",
        "Fault diagnosis on simple circuits and domestic installations",
        "Mentoring new apprentices and work experience students",
        "Quality assurance and compliance checking",
        "Customer interaction under supervision",
        "Site survey assistance and material calculations"
      ],
      cpd: [
        "AM2/AM2S practical assessment preparation",
        "2391-52 Initial Verification and Certification",
        "EV Charging installation (2919) introduction",
        "Solar PV systems overview (2399) and battery storage",
        "Site safety leadership (SSSTS preparation)",
        "Smart home technology and IoT integration",
        "Heat pump electrical installation basics"
      ],
      duration: "1-2 years pathway to Electrician status",
      fastTrack: "Experienced workers may progress faster with APL assessment"
    },
    {
      grade: "Electrician (Gold Card)",
      color: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
      hourlyRate: "£22-28/hr base (2025)",
      dayRate: "£200-320/day + regional premiums",
      requirements: [
        "Level 3 NVQ Diploma (2357/5357) completed",
        "AM2/AM2S practical assessment passed",
        "18th Edition BS 7671 (2382-22) current certificate",
        "ECS Health & Safety test valid (renewed every 3 years)",
        "Minimum 2 years post-qualification experience",
        "Evidence of competent person status"
      ],
      benefits: [
        "ECS Gold Card recognition UK-wide (industry standard)",
        "Skilled worker rates (£22-28/hr base, £200-320/day)",
        "Industry-wide acceptance for site access and security clearance",
        "Independent working authority on complex installations",
        "Pathway to specialist roles and further qualifications",
        "Access to NICEIC/NAPIT contractor schemes",
        "Self-employment opportunities with Part P registration"
      ],
      responsibilities: [
        "Complete electrical installations from design to commissioning",
        "Testing, inspection and certification of electrical work (periodic)",
        "Fault finding and repair on complex industrial/commercial systems",
        "Customer liaison, technical explanations and quotations",
        "Compliance with BS 7671, building regulations and CDM",
        "Risk assessment creation and method statement implementation",
        "Supervision of junior electricians and apprentices"
      ],
      cpd: [
        "18th Edition Amendment updates (A3 expected 2026)",
        "2391-52 Inspection, Testing and Certification (essential)",
        "Specialist manufacturer training (Schneider, ABB, Legrand, Hager)",
        "Smart building systems, IoT integration and BMS",
        "Customer service and communication skills",
        "EV charging installation and maintenance (City & Guilds 2919)",
        "Solar PV design and installation with battery storage"
      ],
      duration: "Career level with ongoing development",
      specializations: ["EV Charging", "Solar PV", "Industrial Automation", "Data Centres", "Fire & Security"]
    },
    {
      grade: "Approved Electrician (JIB)",
      color: "bg-elec-yellow/20 text-elec-yellow border-elec-yellow/30",
      hourlyRate: "£23-28/hr enhanced (2025)",
      requirements: [
        "All Electrician (Gold Card) requirements met",
        "2391-52 Inspection & Testing qualification",
        "Minimum 3 years post-Gold Card experience",
        "Demonstrated competency in complex installations",
        "JIB membership and annual CPD compliance"
      ],
      benefits: [
        "Enhanced recognition and premium rates (£23-28/hr)",
        "Access to JIB member resources and support",
        "Priority consideration for senior roles",
        "Pathway to supervision and management positions",
        "Industry leadership opportunities and networking"
      ],
      responsibilities: [
        "Design verification and electrical system approval",
        "Complex installation project leadership",
        "Quality assurance and inspection oversight",
        "Technical mentoring of junior electricians",
        "Customer consultation on electrical solutions"
      ],
      cpd: [
        "Advanced 2391 courses and periodic updates",
        "IET technical seminars and conferences",
        "Code of Practice updates and regulatory changes",
        "Business skills development (project management)",
        "Emerging technology training (smart grids, energy storage)"
      ],
      duration: "Career level with enhanced responsibilities"
    },
    {
      grade: "Technician Electrician (JIB)",
      color: "bg-green-500/20 text-green-400 border-green-500/30",
      hourlyRate: "£26-32/hr premium (2025)",
      requirements: [
        "Approved Electrician status established",
        "HNC/HND Electrical Engineering preferred",
        "2391-52 plus additional design qualifications",
        "Proven design and inspection competence",
        "Minimum 5 years advanced electrical experience"
      ],
      benefits: [
        "Technical leadership authority and premium rates (£26-32/hr)",
        "Complex project design and specification responsibility",
        "Advanced testing and commissioning authority",
        "Professional mentoring and development role",
        "Industry technical committee participation opportunities"
      ],
      responsibilities: [
        "Electrical system design and specification",
        "Advanced testing, commissioning and handover procedures",
        "Technical problem solving and innovation",
        "Team leadership and skills development",
        "Client technical consultation and solution development"
      ],
      cpd: [
        "IET membership and Chartered Engineer pathway",
        "Advanced electrical design courses (lighting, power systems)",
        "Building Management Systems (BMS) and controls",
        "Renewable energy integration and storage systems",
        "Professional development and leadership training"
      ],
      duration: "Senior career level with technical specialisation"
    },
    {
      grade: "Supervisor",
      color: "bg-red-500/20 text-red-400 border-red-500/30",
      hourlyRate: "£30-40/hr management (2025)",
      requirements: [
        "Approved Electrician or Technician Electrician status",
        "SSSTS/SMSTS (Site Supervisor/Manager Training Scheme)",
        "IOSH Managing Safely or equivalent",
        "Proven team leadership and project management experience",
        "Current First Aid at Work and emergency response training"
      ],
      benefits: [
        "Management responsibility and enhanced rates (£30-40/hr)",
        "Project oversight and strategic planning involvement",
        "Staff development and career progression authority",
        "Budget management and resource allocation",
        "Senior stakeholder liaison and contract management"
      ],
      responsibilities: [
        "Site safety management and regulatory compliance",
        "Team coordination, planning and resource allocation",
        "Quality control, progress monitoring and reporting",
        "Client communication and stakeholder management",
        "Budget oversight and cost control management"
      ],
      cpd: [
        "IOSH certification maintenance and updates",
        "Project management professional development (PRINCE2, APM)",
        "Health & safety law updates and CDM regulations",
        "Leadership and team development training",
        "Commercial awareness and contract management"
      ],
      duration: "Senior management career level"
    }
  ];

  return (
    <div className="space-y-6">
      <section aria-labelledby="jib-heading" className="space-y-4">
        <header className="space-y-2">
          <h2 id="jib-heading" className="flex items-center gap-2 text-2xl font-bold">
            <Award className="h-5 w-5 text-elec-yellow" />
            JIB Grading Scheme & ECS Cards
          </h2>
          <p className="text-sm text-white">
            The Joint Industry Board (JIB) grading scheme is the UK standard for electrical worker classification and pay scales
          </p>
        </header>
        <div>
          {/* 2025 Market Insights Banner */}
          <div className="bg-gradient-to-r from-elec-yellow/10 to-elec-yellow/5 border border-elec-yellow/20 rounded-xl p-4 mb-6">
            <div className="text-center space-y-3">
              <h3 className="text-lg font-semibold text-elec-yellow flex items-center justify-center gap-2">
                <TrendingUp className="h-5 w-5" />
                2025 Industry Update
              </h3>
              <p className="text-white text-sm max-w-3xl mx-auto leading-relaxed">
                Record skills shortage pushing rates up 15-20% year-on-year. Net Zero targets creating unprecedented 
                demand for EV charging, heat pump, and data centre specialists. Prime time for career advancement.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">
                <div className="bg-elec-gray/50 rounded-lg p-3 border border-elec-yellow/10">
                  <div className="text-green-400 font-semibold text-sm flex items-center gap-1">
                    <Zap className="h-3 w-3" /> High Demand 2025
                  </div>
                  <div className="text-white text-xs">EV Charging • Data Centres • Heat Pumps • Smart Buildings</div>
                </div>
                <div className="bg-elec-gray/50 rounded-lg p-3 border border-elec-yellow/10">
                  <div className="text-blue-400 font-semibold text-sm flex items-center gap-1">
                    <DollarSign className="h-3 w-3" /> Rate Premiums
                  </div>
                  <div className="text-white text-xs">+£25-50/day vs 2024 • Specialists +£100/day</div>
                </div>
                <div className="bg-elec-gray/50 rounded-lg p-3 border border-elec-yellow/10">
                  <div className="text-purple-400 font-semibold text-sm flex items-center gap-1">
                    <Target className="h-3 w-3" /> Skills Gap
                  </div>
                  <div className="text-white text-xs">50,000+ unfilled positions • Fast progression opportunities</div>
                </div>
              </div>
            </div>
          </div>

          {/* Top metrics grid: 2x2 on mobile, 4 cols on desktop; square tiles with coloured icons */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="aspect-square rounded-lg border border-elec-yellow/20 bg-elec-gray p-4 flex flex-col items-center justify-center text-center">
              <Award className="h-8 w-8 text-purple-400 mb-3" aria-hidden="true" />
              <div className="font-semibold text-base text-white">6 Grades</div>
              <div className="text-xs text-white/80">Progression pathway</div>
            </div>
            <div className="aspect-square rounded-lg border border-elec-yellow/20 bg-elec-gray p-4 flex flex-col items-center justify-center text-center">
              <Clock className="h-8 w-8 text-elec-yellow mb-3" aria-hidden="true" />
              <div className="font-semibold text-base text-white">4–5 yrs</div>
              <div className="text-xs text-white/80">To Gold Card</div>
            </div>
            <div className="aspect-square rounded-lg border border-elec-yellow/20 bg-elec-gray p-4 flex flex-col items-center justify-center text-center">
              <Shield className="h-8 w-8 text-green-400 mb-3" aria-hidden="true" />
              <div className="font-semibold text-base text-white">3‑year</div>
              <div className="text-xs text-white/80">ECS renewal</div>
            </div>
            <div className="aspect-square rounded-lg border border-elec-yellow/20 bg-elec-gray p-4 flex flex-col items-center justify-center text-center">
              <Briefcase className="h-8 w-8 text-blue-400 mb-3" aria-hidden="true" />
              <div className="font-semibold text-base text-white">UK‑wide</div>
              <div className="text-xs text-white/80">Employer recognition</div>
            </div>
          </div>

          {/* Structured content like Skills Development (mobile‑first accordion) */}
          <MobileAccordion type="multiple" className="space-y-4">
            {/* Quick Rate Calculator */}
            <MobileAccordionItem value="calculator">
              <MobileAccordionTrigger className="bg-elec-gray border-elec-yellow/20" icon={<Calculator className="h-4 w-4 text-blue-400" />}>Quick Rate Calculator (2025)</MobileAccordionTrigger>
              <MobileAccordionContent className="bg-elec-gray border-x border-b border-elec-yellow/20 rounded-b-lg p-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <h4 className="font-medium text-elec-yellow">Estimate Your Day Rate</h4>
                    <div className="space-y-2 text-xs">
                      <div className="bg-elec-gray/50 p-3 rounded border border-elec-yellow/10">
                        <div className="font-medium text-white mb-2">Gold Card Electrician (Base)</div>
                        <div className="space-y-1">
                          <div className="flex justify-between">
                            <span className="text-white">Regional:</span>
                            <span className="text-elec-yellow">£200-280/day</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-white">London:</span>
                            <span className="text-elec-yellow">£220-340/day</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-white">+ EV Specialist:</span>
                            <span className="text-green-400">+£30-50/day</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-white">+ 2391 Testing:</span>
                            <span className="text-green-400">+£20-40/day</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-medium text-elec-yellow">Progression Target Calculator</h4>
                    <div className="bg-elec-gray/50 p-3 rounded border border-elec-yellow/10 text-xs">
                      <div className="space-y-2">
                        <div className="text-white">Current: Improver (£180/day)</div>
                        <div className="text-white">Next: Gold Card (+£40-80/day)</div>
                        <div className="text-white">Required: AM2 + 2 years experience</div>
                        <div className="text-green-400 font-medium">Potential increase: £8,000-16,000/year</div>
                      </div>
                    </div>
                    <div className="bg-blue-500/10 p-3 rounded border border-blue-400/20 text-xs">
                      <div className="text-white">
                        <strong className="text-blue-400">Self-employment bonus:</strong> Add 25-40% to employee rates to cover benefits, tax, and profit margin.
                      </div>
                    </div>
                  </div>
                </div>
              </MobileAccordionContent>
            </MobileAccordionItem>

            {/* Industry Trends 2025 */}
            <MobileAccordionItem value="trends">
              <MobileAccordionTrigger className="bg-elec-gray border-elec-yellow/20" icon={<TrendingUp className="h-4 w-4 text-green-400" />}>2025 Industry Trends & Opportunities</MobileAccordionTrigger>
              <MobileAccordionContent className="bg-elec-gray border-x border-b border-elec-yellow/20 rounded-b-lg p-3">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="rounded border border-green-400/20 bg-green-500/5 p-3">
                    <div className="text-base font-medium mb-2 text-green-400 flex items-center gap-2">
                      <Zap className="h-4 w-4" />
                      Net Zero Impact
                    </div>
                    <div className="text-xs space-y-1 text-white">
                      <div>• 175,000+ new green jobs by 2030</div>
                      <div>• Heat pump installations: 600,000/year target</div>
                      <div>• EV charging: 300,000 public points needed</div>
                      <div>• Solar PV growth: 40GW target by 2030</div>
                      <div className="text-green-400 font-medium mt-2">Skills premium: £50-100/day for certified specialists</div>
                    </div>
                  </div>
                  
                  <div className="rounded border border-blue-400/20 bg-blue-500/5 p-3">
                    <div className="text-base font-medium mb-2 text-blue-400 flex items-center gap-2">
                      <Building className="h-4 w-4" />
                      AI & Data Infrastructure
                    </div>
                    <div className="text-xs space-y-1 text-white">
                      <div>• Data centre boom: £25bn investment</div>
                      <div>• Smart building integration expanding</div>
                      <div>• IoT and BMS specialists in demand</div>
                      <div>• Critical power systems growth</div>
                      <div className="text-blue-400 font-medium mt-2">Specialist roles: £300-500+/day</div>
                    </div>
                  </div>
                  
                  <div className="rounded border border-purple-400/20 bg-purple-500/5 p-3">
                    <div className="text-base font-medium mb-2 text-purple-400 flex items-center gap-2">
                      <Target className="h-4 w-4" />
                      Skills Gap Crisis
                    </div>
                    <div className="text-xs space-y-1 text-white">
                      <div>• 50,000+ unfilled positions nationally</div>
                      <div>• Apprentice applications down 15%</div>
                      <div>• Aging workforce: 40% over 50</div>
                      <div>• Regional shortages acute in South East</div>
                      <div className="text-purple-400 font-medium mt-2">Fast progression opportunities available</div>
                    </div>
                  </div>
                </div>
              </MobileAccordionContent>
            </MobileAccordionItem>
            {/* JIB Grades (moved existing content) */}
            <MobileAccordionItem value="grades">
              <MobileAccordionTrigger className="bg-elec-gray border-elec-yellow/20" icon={<Award className="h-4 w-4 text-purple-400" />}>JIB Grades & Requirements</MobileAccordionTrigger>
              <MobileAccordionContent className="bg-elec-gray border-x border-b border-elec-yellow/20 rounded-b-lg p-3">
                {isMobile ? (
                  <>
                    <div className="grid grid-cols-2 gap-3">
                      {jibGrades.map((grade, index) => (
                        <button
                          key={grade.grade}
                          onClick={() => setSelectedGradeIndex(index)}
                          className="aspect-square rounded-lg border border-elec-yellow/20 bg-elec-gray p-3 flex flex-col items-center justify-center text-center hover:bg-elec-gray focus:outline-none focus:ring-2 focus:ring-elec-yellow/40"
                        >
                          <div className="text-sm font-semibold">{grade.grade}</div>
                          <Badge className={`mt-1 ${grade.color}`}>Grade {index + 1}</Badge>
                        </button>
                      ))}
                    </div>

                    {selectedGradeIndex !== null && (() => {
                      const grade = jibGrades[selectedGradeIndex];
                      return (
                        <div className="mt-4 rounded border border-elec-yellow/20 bg-elec-gray p-3">
                          <div className="flex items-center justify-between mb-2">
                            <div className="text-base font-semibold text-white">{grade.grade}</div>
                            <div className="flex items-center gap-2">
                              <div className="text-xs text-elec-yellow font-medium">{grade.hourlyRate}</div>
                              <Badge className={grade.color}>Grade {selectedGradeIndex + 1}</Badge>
                            </div>
                          </div>
                            <div className="space-y-6">
                              <div className="space-y-3">
                                <h4 className="text-base font-semibold mb-3 text-elec-yellow flex items-center gap-2">
                                  <BookOpen className="h-4 w-4" /> Requirements
                                </h4>
                                <div className="space-y-2">
                                  {grade.requirements.map((req, idx) => (
                                    <div key={idx} className="text-sm text-white flex items-start gap-3 leading-relaxed">
                                      <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                                      <span>{req}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                              
                              <div className="space-y-3">
                                <h4 className="text-base font-semibold mb-3 text-elec-yellow flex items-center gap-2">
                                  <Award className="h-4 w-4" /> Benefits
                                </h4>
                                <div className="space-y-2">
                                  {grade.benefits.map((benefit, idx) => (
                                    <div key={idx} className="text-sm text-white flex items-start gap-3 leading-relaxed">
                                      <div className="w-1.5 h-1.5 rounded-full bg-elec-yellow mt-2 flex-shrink-0" />
                                      <span>{benefit}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                              
                              <div className="space-y-3">
                                <h4 className="text-base font-semibold mb-3 text-elec-yellow flex items-center gap-2">
                                  <Clock className="h-4 w-4" /> Duration & Timeline
                                </h4>
                                <div className="text-sm text-white leading-relaxed">{grade.duration}</div>
                                {grade.fastTrack && (
                                  <div className="text-sm text-blue-400 leading-relaxed">
                                    <strong>Fast Track:</strong> {grade.fastTrack}
                                  </div>
                                )}
                              </div>
                              
                              <div className="space-y-3">
                                <h4 className="text-base font-semibold mb-3 text-elec-yellow flex items-center gap-2">
                                  <Briefcase className="h-4 w-4" /> Typical Responsibilities
                                </h4>
                                <div className="space-y-2">
                                  {grade.responsibilities.map((resp, idx) => (
                                    <div key={idx} className="text-sm text-white flex items-start gap-3 leading-relaxed">
                                      <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                                      <span>{resp}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                              
                              <div className="space-y-3">
                                <h4 className="text-base font-semibold mb-3 text-elec-yellow flex items-center gap-2">
                                  <BookOpen className="h-4 w-4" /> Recommended CPD/Courses
                                </h4>
                                <div className="space-y-2">
                                  {grade.cpd.map((course, idx) => (
                                    <div key={idx} className="text-sm text-white flex items-start gap-3 leading-relaxed">
                                      <div className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-2 flex-shrink-0" />
                                      <span>{course}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                        </div>
                      );
                    })()}
                  </>
                ) : (
                  <div className="space-y-4">
                    {jibGrades.map((grade, index) => (
                      <div key={grade.grade} className="rounded border border-elec-yellow/20 bg-elec-gray p-3 md:p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="text-lg font-semibold text-white">{grade.grade}</div>
                          <div className="flex items-center gap-2">
                            <div className="text-sm text-elec-yellow font-medium">{grade.hourlyRate}</div>
                            <Badge className={grade.color}>Grade {index + 1}</Badge>
                          </div>
                        </div>
                        <div className="space-y-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <div className="space-y-3">
                              <h4 className="text-base font-semibold text-elec-yellow flex items-center gap-2">
                                <BookOpen className="h-4 w-4" /> Requirements
                              </h4>
                              <div className="space-y-2">
                                {grade.requirements.map((req, idx) => (
                                  <div key={idx} className="text-sm text-white flex items-start gap-3 leading-relaxed">
                                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                                    <span>{req}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                            
                            <div className="space-y-3">
                              <h4 className="text-base font-semibold text-elec-yellow flex items-center gap-2">
                                <Award className="h-4 w-4" /> Benefits
                              </h4>
                              <div className="space-y-2">
                                {grade.benefits.map((benefit, idx) => (
                                  <div key={idx} className="text-sm text-white flex items-start gap-3 leading-relaxed">
                                    <div className="w-1.5 h-1.5 rounded-full bg-elec-yellow mt-2 flex-shrink-0" />
                                    <span>{benefit}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                            
                            <div className="space-y-3">
                              <h4 className="text-base font-semibold text-elec-yellow flex items-center gap-2">
                                <Clock className="h-4 w-4" /> Duration & Timeline
                              </h4>
                              <div className="text-sm text-white leading-relaxed">{grade.duration}</div>
                              {grade.fastTrack && (
                                <div className="text-sm text-blue-400 leading-relaxed">
                                  <strong>Fast Track:</strong> {grade.fastTrack}
                                </div>
                              )}
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-3">
                              <h4 className="text-base font-semibold text-elec-yellow flex items-center gap-2">
                                <Briefcase className="h-4 w-4" /> Typical Responsibilities
                              </h4>
                              <div className="space-y-2">
                                {grade.responsibilities.map((resp, idx) => (
                                  <div key={idx} className="text-sm text-white flex items-start gap-3 leading-relaxed">
                                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                                    <span>{resp}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                            
                            <div className="space-y-3">
                              <h4 className="text-base font-semibold text-elec-yellow flex items-center gap-2">
                                <BookOpen className="h-4 w-4" /> Recommended CPD/Courses
                              </h4>
                              <div className="space-y-2">
                                {grade.cpd.map((course, idx) => (
                                  <div key={idx} className="text-sm text-white flex items-start gap-3 leading-relaxed">
                                    <div className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-2 flex-shrink-0" />
                                    <span>{course}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </MobileAccordionContent>
            </MobileAccordionItem>

            {/* ECS cards */}
            <MobileAccordionItem value="ecs">
              <MobileAccordionTrigger className="bg-elec-gray border-elec-yellow/20" icon={<Shield className="h-4 w-4 text-green-400" />}>ECS Cards & Categories (2025)</MobileAccordionTrigger>
              <MobileAccordionContent className="bg-elec-gray border-x border-b border-elec-yellow/20 rounded-b-lg p-3">
                <div className="mb-4 p-3 bg-elec-yellow/10 rounded border border-elec-yellow/20">
                  <h4 className="text-sm font-medium text-elec-yellow mb-2">2025 Application Fees (Current)</h4>
                  <div className="grid grid-cols-2 gap-2 text-xs text-white">
                    <div>• Apprentice: £36</div>
                    <div>• Gold Card: £42</div>
                    <div>• Approved: £70</div>
                    <div>• Supervisor: £126</div>
                  </div>
                  <p className="text-xs text-white mt-2">3-year validity • Digital cards issued immediately • Physical cards posted within 5 working days</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="rounded border border-elec-yellow/20 bg-elec-gray p-3">
                    <div className="text-base font-medium mb-1">Core Electrical</div>
                    <div className="text-sm space-y-2">
                      <div className="flex flex-wrap gap-2">
                        {["Apprentice","Trainee/Improver","Electrician (Gold)","Approved Electrician","Technician Electrician","Site Supervisor/Manager"].map((t) => (
                          <Badge key={t} variant="outline" className="border-elec-yellow/30 text-elec-yellow">{t}</Badge>
                        ))}
                      </div>
                      <p className="text-xs text-white">Cards verify competence, qualifications and health & safety knowledge.</p>
                    </div>
                  </div>
                  <div className="rounded border border-elec-yellow/20 bg-elec-gray p-3">
                    <div className="text-base font-medium mb-1">2025 Specialist Categories</div>
                    <div className="text-sm space-y-2">
                      <div className="flex flex-wrap gap-2">
                        {["EV Charging","Smart Buildings","Data Centres","Fire & Security","Network Cabling","Solar PV","Heat Pumps","H.V. Authorised","Energy Storage"].map((t) => (
                          <Badge key={t} variant="outline" className="border-green-400/30 text-green-400">{t}</Badge>
                        ))}
                      </div>
                      <p className="text-xs text-white">High-demand specializations requiring additional certifications and manufacturer approvals.</p>
                    </div>
                  </div>
                  <div className="rounded border border-elec-yellow/20 bg-elec-gray p-3">
                    <div className="text-base font-medium mb-1">Digital-First Process (2025)</div>
                    <div className="text-xs space-y-1">
                      <div className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-green-400" /> Create MyECS account (digital verification)</div>
                      <div className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-green-400" /> Upload qualifications (PDF format accepted)</div>
                      <div className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-green-400" /> Passport-style photo (mobile upload)</div>
                      <div className="flex items-center gap-2"><Clock className="h-3 w-3 text-elec-yellow" /> Book H&S test online (if required)</div>
                      <div className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-green-400" /> Instant digital card upon approval</div>
                    </div>
                  </div>
                </div>
              </MobileAccordionContent>
            </MobileAccordionItem>

            {/* Pay & allowances */}
            <MobileAccordionItem value="pay">
              <MobileAccordionTrigger className="bg-elec-gray border-elec-yellow/20" icon={<Banknote className="h-4 w-4 text-green-400" />}>2025 Pay Rates & Regional Breakdown</MobileAccordionTrigger>
              <MobileAccordionContent className="bg-elec-gray border-x border-b border-elec-yellow/20 rounded-b-lg p-3">
                <div className="mb-4 p-3 bg-green-500/10 rounded border border-green-400/20">
                  <h4 className="text-sm font-medium text-green-400 mb-2 flex items-center gap-2">
                    <TrendingUp className="h-3 w-3" />
                    2025 Rate Increases: +15-20% YoY
                  </h4>
                  <p className="text-xs text-white">Skills shortage driving unprecedented rate growth. Specialist roles commanding significant premiums.</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="rounded border border-elec-yellow/20 bg-elec-gray p-3">
                    <div className="text-base font-medium mb-1 flex items-center gap-2">
                      <Calculator className="h-4 w-4 text-elec-yellow" />
                      2025 Day Rates by Region
                    </div>
                    <div className="space-y-2 text-xs">
                      <div className="bg-elec-gray/50 p-2 rounded">
                        <div className="font-medium text-elec-yellow">London & M25</div>
                        <div className="text-white">Electrician: £220-340/day</div>
                        <div className="text-white">Approved: £280-420/day</div>
                        <div className="text-white">Supervisor: £350-500+/day</div>
                      </div>
                      <div className="bg-elec-gray/50 p-2 rounded">
                        <div className="font-medium text-blue-400">Regional (England/Wales)</div>
                        <div className="text-white">Electrician: £180-280/day</div>
                        <div className="text-white">Approved: £220-350/day</div>
                        <div className="text-white">Supervisor: £280-420/day</div>
                      </div>
                      <div className="bg-elec-gray/50 p-2 rounded">
                        <div className="font-medium text-purple-400">Scotland (SJIB)</div>
                        <div className="text-white">Similar to regional + 5-10%</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="rounded border border-elec-yellow/20 bg-elec-gray p-3">
                    <div className="text-base font-medium mb-1 flex items-center gap-2">
                      <Building className="h-4 w-4 text-blue-400" />
                      Project Type Premiums (2025)
                    </div>
                    <div className="text-xs space-y-2">
                      <div className="flex justify-between">
                        <span className="text-white">Data Centres:</span>
                        <span className="text-green-400">+20-25%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white">Nuclear/Power:</span>
                        <span className="text-green-400">+25-30%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white">EV Infrastructure:</span>
                        <span className="text-green-400">+15-20%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white">Smart Buildings:</span>
                        <span className="text-green-400">+10-15%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white">Domestic/Small Commercial:</span>
                        <span className="text-white">Base rate</span>
                      </div>
                      <div className="mt-2 p-2 bg-elec-yellow/10 rounded">
                        <div className="text-xs text-white">Overtime rates: 1.5x after 8hrs weekdays, 2x Sundays/Bank holidays</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="rounded border border-elec-yellow/20 bg-elec-gray p-3">
                    <div className="text-base font-medium mb-1 flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-purple-400" />
                      Allowances & Benefits
                    </div>
                    <div className="text-xs space-y-1">
                      <div className="font-medium text-elec-yellow">Travel & Accommodation</div>
                      <div className="text-white">• Mileage: £0.45-0.65/mile</div>
                      <div className="text-white">• Lodging: £35-55/night (tax-free)</div>
                      <div className="text-white">• Subsistence: £10-25/day</div>
                      
                      <div className="font-medium text-elec-yellow mt-2">JIB Benefits Package</div>
                      <div className="text-white">• Pension: 8% employer contribution</div>
                      <div className="text-white">• Annual leave: 22+ days</div>
                      <div className="text-white">• Sick pay: Statutory + enhanced</div>
                      <div className="text-white">• Training allowances</div>
                      
                      <div className="mt-2 p-2 bg-blue-500/10 rounded">
                        <div className="text-xs text-white">Self-employed rates typically 25-40% higher to cover benefits/pension</div>
                      </div>
                    </div>
                  </div>
                </div>
              </MobileAccordionContent>
            </MobileAccordionItem>

            {/* Upgrade pathway */}
            <MobileAccordionItem value="pathway">
              <MobileAccordionTrigger className="bg-elec-gray border-elec-yellow/20" icon={<TrendingUp className="h-4 w-4 text-green-400" />}>Upgrade Pathways</MobileAccordionTrigger>
              <MobileAccordionContent className="bg-elec-gray border-x border-b border-elec-yellow/20 rounded-b-lg p-3">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-4 p-4 rounded-lg border border-elec-yellow/20 bg-elec-gray/50">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-green-400" />
                      <h4 className="text-base font-semibold text-elec-yellow">Standard Route</h4>
                    </div>
                    <div className="space-y-3">
                      <div className="text-sm text-white leading-relaxed">
                        Apprentice → Improver → Electrician (Gold) → Approved → Technician
                      </div>
                      <div className="text-sm text-white/80 leading-relaxed">
                        Typical 6–10 years to Technician depending on experience and qualifications.
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4 p-4 rounded-lg border border-elec-yellow/20 bg-elec-gray/50">
                    <div className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-blue-400" />
                      <h4 className="text-base font-semibold text-elec-yellow">Supervisor/Manager Route</h4>
                    </div>
                    <div className="space-y-3">
                      <div className="text-sm text-white leading-relaxed">
                        Approved/Technician → Chargehand → Site Supervisor → Manager
                      </div>
                      <div className="text-sm text-white/80 leading-relaxed">
                        Add leadership (SSSTS/SMSTS/IOSH) and project delivery experience.
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4 p-4 rounded-lg border border-elec-yellow/20 bg-elec-gray/50">
                    <div className="flex items-center gap-2">
                      <Zap className="h-5 w-5 text-purple-400" />
                      <h4 className="text-base font-semibold text-elec-yellow">Fast‑Track / APL</h4>
                    </div>
                    <div className="space-y-3">
                      <div className="text-sm text-white leading-relaxed">
                        Experienced workers scheme with evidence portfolio
                      </div>
                      <div className="text-sm text-white/80 leading-relaxed">
                        Recognition of prior learning can reduce time to Gold/Approved.
                      </div>
                    </div>
                  </div>
                </div>
              </MobileAccordionContent>
            </MobileAccordionItem>

            {/* CPD & renewals */}
            <MobileAccordionItem value="cpd">
              <MobileAccordionTrigger className="bg-elec-gray border-elec-yellow/20" icon={<Clock className="h-4 w-4 text-elec-yellow" />}>CPD & Renewals</MobileAccordionTrigger>
              <MobileAccordionContent className="bg-elec-gray border-x border-b border-elec-yellow/20 rounded-b-lg p-3">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="rounded border border-elec-yellow/20 bg-elec-gray p-3">
                    <div className="text-base font-medium mb-1">ECS Renewal</div>
                    <div className="text-xs space-y-1">
                      <div className="flex items-center gap-2"><Shield className="h-3 w-3 text-elec-yellow" /> Renew every 3 years</div>
                      <div>• Current H&S assessment</div>
                      <div>• Up‑to‑date qualifications</div>
                      <div className="text-[11px] text-white">Digital card updates first; physical card follows by post.</div>
                    </div>
                  </div>
                  <div className="rounded border border-elec-yellow/20 bg-elec-gray p-3">
                    <div className="text-base font-medium mb-1">BS 7671 Updates</div>
                    <div className="text-xs space-y-1">
                      <div>• Keep current with 18th Edition (A3:2024) and amendments</div>
                      <div>• CPD on changes and application</div>
                      <div className="text-[11px] text-white">Amendments typically every 2–3 years. Stay subscribed.</div>
                    </div>
                  </div>
                  <div className="rounded border border-elec-yellow/20 bg-elec-gray p-3">
                    <div className="text-base font-medium mb-1">Professional CPD</div>
                    <div className="text-xs space-y-1">
                      <div>• Testing (2391), EV, Solar, Fire/Alarm, BMS</div>
                      <div>• Scheme assessments (NICEIC/NAPIT) if contracting</div>
                      <div className="text-[11px] text-white">Recommended: 20–30 hours CPD per year logged in the CPD Tracker.</div>
                    </div>
                  </div>
                </div>
              </MobileAccordionContent>
            </MobileAccordionItem>

            {/* Evidence checklist */}
            <MobileAccordionItem value="evidence">
              <MobileAccordionTrigger className="bg-elec-gray border-elec-yellow/20" icon={<CheckCircle className="h-4 w-4 text-green-400" />}>Evidence Checklist (Upgrades)</MobileAccordionTrigger>
              <MobileAccordionContent className="bg-elec-gray border-x border-b border-elec-yellow/20 rounded-b-lg p-3">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  <ul className="space-y-1">
                    <li>• Level 3 NVQ Diploma (2357/5357)</li>
                    <li>• AM2/AM2S certificate</li>
                    <li>• 18th Edition BS 7671 (2382-22)</li>
                    <li>• Inspection & Testing (2391‑52) for Approved/Technician</li>
                  </ul>
                  <ul className="space-y-1">
                    <li>• Employer references/logbook evidence</li>
                    <li>• ECS H&S assessment</li>
                    <li>• ID and recent photo</li>
                    <li>• CPD record (recommended)</li>
                  </ul>
                  <ul className="space-y-1">
                    <li>• Evidence of design/verification (Technician)</li>
                    <li>• Manufacturer training certificates (EV/Solar)</li>
                    <li>• Site supervisor tickets (SSSTS/SMSTS) if applicable</li>
                  </ul>
                </div>
              </MobileAccordionContent>
            </MobileAccordionItem>

            {/* Application process */}
            <MobileAccordionItem value="apply">
              <MobileAccordionTrigger className="bg-elec-gray border-elec-yellow/20" icon={<CheckCircle className="h-4 w-4 text-purple-400" />}>Application Process (Typical)</MobileAccordionTrigger>
              <MobileAccordionContent className="bg-elec-gray border-x border-b border-elec-yellow/20 rounded-b-lg p-3">
                <ol className="list-decimal pl-5 space-y-2 text-xs">
                  <li>Confirm eligibility and gather evidence (NVQ, AM2, 18th, references)</li>
                  <li>Create or log into your MyECS account and start a new application</li>
                  <li>Upload documents and pay the applicable fee</li>
                  <li>Book and pass the ECS Health & Safety assessment (if required)</li>
                  <li>Await verification; your digital ECS card updates first, physical card follows</li>
                </ol>
                <p className="mt-2 text-[11px] text-white">Typical timeframe: 3–10 working days depending on volume and checks.</p>
                <p className="text-[11px] text-white">Fees vary by card type and renewal vs upgrade.</p>
              </MobileAccordionContent>
            </MobileAccordionItem>

            {/* H&S topics */}
            <MobileAccordionItem value="hs-topics">
              <MobileAccordionTrigger className="bg-elec-gray border-elec-yellow/20" icon={<Shield className="h-4 w-4 text-blue-400" />}>ECS Health & Safety Test Topics</MobileAccordionTrigger>
              <MobileAccordionContent className="bg-elec-gray border-x border-b border-elec-yellow/20 rounded-b-lg p-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <ul className="space-y-1">
                    <li>• Site access, permits to work</li>
                    <li>• Safe isolation and lock-off</li>
                    <li>• Working at height and manual handling</li>
                    <li>• Fire safety and emergency procedures</li>
                  </ul>
                  <ul className="space-y-1">
                    <li>• Asbestos awareness & COSHH</li>
                    <li>• Electrical shock risk and first aid basics</li>
                    <li>• Environmental considerations</li>
                    <li>• Reporting near misses and incidents</li>
                  </ul>
                </div>
                <div className="mt-2 text-[11px] text-white">Pass mark typically ~85%. Tip: focus on safe isolation, permits and emergency procedures.</div>
              </MobileAccordionContent>
            </MobileAccordionItem>

            {/* SJIB mapping */}
            <MobileAccordionItem value="sjib">
              <MobileAccordionTrigger className="bg-elec-gray border-elec-yellow/20" icon={<MapPin className="h-4 w-4 text-blue-400" />}>SJIB Equivalence (Scotland)</MobileAccordionTrigger>
              <MobileAccordionContent className="bg-elec-gray border-x border-b border-elec-yellow/20 rounded-b-lg p-3">
                <div className="text-xs space-y-2">
                  <p className="text-white">SJIB mirrors JIB grading for Scotland. Typical mappings:</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="rounded border border-elec-yellow/20 bg-elec-gray p-3">
                      <div className="font-medium">JIB Electrician ⇄ SJIB Electrician</div>
                      <div className="text-white">NVQ3 + AM2 + 18th Edition</div>
                    </div>
                    <div className="rounded border border-elec-yellow/20 bg-elec-gray p-3">
                      <div className="font-medium">JIB Approved ⇄ SJIB Approved</div>
                      <div className="text-white">Add 2391 and experience</div>
                    </div>
                  </div>
                  <p className="mt-2 text-[11px] text-white">Check SJIB for local rules, evidence and rates which can differ from JIB.</p>
                </div>
              </MobileAccordionContent>
            </MobileAccordionItem>

            {/* FAQs */}
            <MobileAccordionItem value="faqs">
              <MobileAccordionTrigger className="bg-elec-gray border-elec-yellow/20" icon={<Users className="h-4 w-4 text-purple-400" />}>FAQs</MobileAccordionTrigger>
              <MobileAccordionContent className="bg-elec-gray border-x border-b border-elec-yellow/20 rounded-b-lg p-3">
                <div className="space-y-3 text-sm">
                  <div>
                    <div className="font-medium text-elec-yellow">Is JIB grading mandatory?</div>
                    <p className="text-xs text-white">Not legally, but widely required by employers and sites for proof of competence.</p>
                  </div>
                  <div>
                     <div className="font-medium text-elec-yellow">Do I need 2391 for Approved?</div>
                     <p className="text-xs text-white">Yes, Inspection & Testing (2391-52) is typically required for JIB Approved Electrician status.</p>
                   </div>
                   <div>
                     <div className="font-medium text-elec-yellow">What about Scotland?</div>
                     <p className="text-xs text-white">Scotland follows SJIB which mirrors JIB; check SJIB for local details and rates.</p>
                   </div>
                   <div>
                     <div className="font-medium text-elec-yellow">How long does verification take?</div>
                     <p className="text-xs text-white">Usually 3–10 working days once all evidence is uploaded and validated.</p>
                   </div>
                   <div>
                     <div className="font-medium text-elec-yellow">Do I need a physical card?</div>
                     <p className="text-xs text-white">The digital card is available immediately after approval; physical cards are posted and may take a few days.</p>
                  </div>
                </div>
              </MobileAccordionContent>
            </MobileAccordionItem>
          </MobileAccordion>
        </div>
      </section>
    </div>
  );
};

export default JIBGradingScheme;
