
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MobileAccordion, MobileAccordionItem, MobileAccordionTrigger, MobileAccordionContent } from "@/components/ui/mobile-accordion";
import { Award, Clock, BookOpen, CheckCircle, Shield, Briefcase, MapPin, TrendingUp, Users, Banknote } from "lucide-react";
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
      requirements: [
        "Enrolled on approved Level 3 apprenticeship programme", 
        "Working towards 2357/5357 NVQ Diploma",
        "Health & Safety test passed (CSCS Construction)",
        "Monthly college attendance (day/block release)",
        "Employer mentorship programme"
      ],
      benefits: [
        "Apprentice minimum wage protection (£7.55/hr minimum)",
        "Structured 4-year training pathway with portfolio building",
        "Industry recognition and ECS Apprentice card eligibility",
        "Government funding support (up to £18,000 per apprentice)",
        "Clear progression route to Improver status"
      ],
      responsibilities: [
        "Basic electrical installation under supervision",
        "Cable pulling, containment installation, basic connections",
        "Health & safety compliance and risk awareness",
        "Portfolio evidence collection and reflective practice",
        "College assignment completion and practical assessments"
      ],
      cpd: [
        "18th Edition BS 7671 preparation (Year 3-4)",
        "First Aid at Work certification",
        "Working at Height awareness training",
        "Fire safety and emergency procedures",
        "Manufacturer product training (cable management, accessories)"
      ],
      duration: "4 years (Level 3 apprenticeship standard)"
    },
    {
      grade: "Improver",
      color: "bg-purple-500/20 text-purple-400 border-purple-500/30", 
      hourlyRate: "£15-18/hr typical (2025)",
      requirements: [
        "Level 3 NVQ Diploma (2357/5357) completed",
        "18th Edition BS 7671 (2382-22) certificate current",
        "Working towards AM2/AM2S practical assessment",
        "Minimum 6 months post-qualification experience",
        "ECS Health & Safety test passed"
      ],
      benefits: [
        "Higher pay rates (£15-18/hr typical, £160-190/day)",
        "More complex work opportunities and reduced supervision",
        "Preparation pathway for ECS Gold Card application",
        "Access to specialist training courses (EV, Solar PV)",
        "Career development discussions with senior electricians"
      ],
      responsibilities: [
        "Installation and commissioning of electrical circuits",
        "Basic testing and inspection procedures",
        "Fault diagnosis on simple circuits",
        "Mentoring new apprentices",
        "Quality assurance and compliance checking"
      ],
      cpd: [
        "AM2/AM2S practical assessment preparation",
        "2391-52 Initial Verification and Certification",
        "EV Charging installation (2919) introduction",
        "Solar PV systems overview (2399)",
        "Site safety leadership (SSSTS preparation)"
      ],
      duration: "1-2 years pathway to Electrician status"
    },
    {
      grade: "Electrician (Gold Card)",
      color: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
      hourlyRate: "£20-25/hr base (2025)",
      requirements: [
        "Level 3 NVQ Diploma (2357/5357) completed",
        "AM2/AM2S practical assessment passed",
        "18th Edition BS 7671 (2382-22) current certificate",
        "ECS Health & Safety test valid",
        "Minimum 2 years post-qualification experience"
      ],
      benefits: [
        "ECS Gold Card recognition UK-wide",
        "Skilled worker rates (£20-25/hr, £180-280/day)",
        "Industry-wide acceptance for site access",
        "Independent working authority on complex installations",
        "Pathway to specialist roles and further qualifications"
      ],
      responsibilities: [
        "Complete electrical installations from design to commissioning",
        "Testing, inspection and certification of electrical work",
        "Fault finding and repair on complex systems",
        "Customer liaison and technical explanations",
        "Compliance with BS 7671 and building regulations"
      ],
      cpd: [
        "18th Edition Amendment updates (as released)",
        "2391-52 Inspection, Testing and Certification",
        "Specialist manufacturer training (Schneider, ABB, Legrand)",
        "Smart building systems and IoT integration",
        "Customer service and communication skills"
      ],
      duration: "Career level with ongoing development"
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
          {/* Top metrics grid: 2x2 on mobile, 4 cols on desktop; square tiles with coloured icons */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            <div className="aspect-square rounded-lg border border-elec-yellow/20 bg-elec-gray p-3 flex flex-col items-center justify-center text-center">
              <Award className="h-6 w-6 text-purple-400" aria-hidden="true" />
              <div className="mt-2 font-semibold text-sm">6 Grades</div>
              <div className="text-[11px] text-white">Progression pathway</div>
            </div>
            <div className="aspect-square rounded-lg border border-elec-yellow/20 bg-elec-gray p-3 flex flex-col items-center justify-center text-center">
              <Clock className="h-6 w-6 text-elec-yellow" aria-hidden="true" />
              <div className="mt-2 font-semibold text-sm">4–5 yrs</div>
              <div className="text-[11px] text-white">To Gold Card</div>
            </div>
            <div className="aspect-square rounded-lg border border-elec-yellow/20 bg-elec-gray p-3 flex flex-col items-center justify-center text-center">
              <Shield className="h-6 w-6 text-green-400" aria-hidden="true" />
              <div className="mt-2 font-semibold text-sm">3‑year</div>
              <div className="text-[11px] text-white">ECS renewal</div>
            </div>
            <div className="aspect-square rounded-lg border border-elec-yellow/20 bg-elec-gray p-3 flex flex-col items-center justify-center text-center">
              <Briefcase className="h-6 w-6 text-blue-400" aria-hidden="true" />
              <div className="mt-2 font-semibold text-sm">UK‑wide</div>
              <div className="text-[11px] text-white">Employer recognition</div>
            </div>
          </div>

          {/* Structured content like Skills Development (mobile‑first accordion) */}
          <MobileAccordion type="multiple" className="space-y-4">
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
                            <div className="space-y-4">
                              <div>
                                <h4 className="text-sm font-medium mb-2 text-elec-yellow flex items-center gap-1">
                                  <BookOpen className="h-3 w-3" /> Requirements
                                </h4>
                                <div className="space-y-1">
                                  {grade.requirements.map((req, idx) => (
                                    <div key={idx} className="text-xs text-white flex items-start gap-2">
                                      <CheckCircle className="h-3 w-3 text-green-400 mt-0.5 flex-shrink-0" />
                                      {req}
                                    </div>
                                  ))}
                                </div>
                              </div>
                              <div>
                                <h4 className="text-sm font-medium mb-2 text-elec-yellow flex items-center gap-1">
                                  <Award className="h-3 w-3" /> Benefits
                                </h4>
                                <div className="space-y-1">
                                  {grade.benefits.map((benefit, idx) => (
                                    <div key={idx} className="text-xs text-white flex items-start gap-2">
                                      <div className="w-1 h-1 rounded-full bg-elec-yellow mt-1.5 flex-shrink-0" />
                                      {benefit}
                                    </div>
                                  ))}
                                </div>
                              </div>
                              <div>
                                <h4 className="text-sm font-medium mb-2 text-elec-yellow flex items-center gap-1">
                                  <Clock className="h-3 w-3" /> Duration
                                </h4>
                                <div className="text-sm text-white">{grade.duration}</div>
                              </div>
                              <div>
                                <h4 className="text-sm font-medium mb-2 text-elec-yellow flex items-center gap-1">
                                  <Briefcase className="h-3 w-3" /> Typical Responsibilities
                                </h4>
                                <div className="space-y-1">
                                  {grade.responsibilities.map((resp, idx) => (
                                    <div key={idx} className="text-xs text-white flex items-start gap-2">
                                      <div className="w-1 h-1 rounded-full bg-blue-400 mt-1.5 flex-shrink-0" />
                                      {resp}
                                    </div>
                                  ))}
                                </div>
                              </div>
                              <div>
                                <h4 className="text-sm font-medium mb-2 text-elec-yellow flex items-center gap-1">
                                  <BookOpen className="h-3 w-3" /> Recommended CPD/Courses
                                </h4>
                                <div className="space-y-1">
                                  {grade.cpd.map((course, idx) => (
                                    <div key={idx} className="text-xs text-white flex items-start gap-2">
                                      <div className="w-1 h-1 rounded-full bg-purple-400 mt-1.5 flex-shrink-0" />
                                      {course}
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
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <h4 className="text-sm font-medium mb-2 text-elec-yellow flex items-center gap-1">
                              <BookOpen className="h-3 w-3" /> Requirements
                            </h4>
                            <div className="space-y-1">
                              {grade.requirements.map((req, idx) => (
                                <div key={idx} className="text-xs text-white flex items-start gap-2">
                                  <CheckCircle className="h-3 w-3 text-green-400 mt-0.5 flex-shrink-0" />
                                  {req}
                                </div>
                              ))}
                            </div>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium mb-2 text-elec-yellow flex items-center gap-1">
                              <Award className="h-3 w-3" /> Benefits
                            </h4>
                            <div className="space-y-1">
                              {grade.benefits.map((benefit, idx) => (
                                <div key={idx} className="text-xs text-white flex items-start gap-2">
                                  <div className="w-1 h-1 rounded-full bg-elec-yellow mt-1.5 flex-shrink-0" />
                                  {benefit}
                                </div>
                              ))}
                            </div>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium mb-2 text-elec-yellow flex items-center gap-1">
                              <Clock className="h-3 w-3" /> Duration
                            </h4>
                            <div className="text-sm text-white">{grade.duration}</div>
                          </div>
                        </div>
                        <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div>
                            <h4 className="text-sm font-medium mb-2 text-elec-yellow flex items-center gap-1">
                              <Briefcase className="h-3 w-3" /> Typical Responsibilities
                            </h4>
                            <div className="space-y-1">
                              {grade.responsibilities.map((resp, idx) => (
                                <div key={idx} className="text-xs text-white flex items-start gap-2">
                                  <div className="w-1 h-1 rounded-full bg-blue-400 mt-1.5 flex-shrink-0" />
                                  {resp}
                                </div>
                              ))}
                            </div>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium mb-2 text-elec-yellow flex items-center gap-1">
                              <BookOpen className="h-3 w-3" /> Recommended CPD/Courses
                            </h4>
                            <div className="space-y-1">
                              {grade.cpd.map((course, idx) => (
                                <div key={idx} className="text-xs text-white flex items-start gap-2">
                                  <div className="w-1 h-1 rounded-full bg-purple-400 mt-1.5 flex-shrink-0" />
                                  {course}
                                </div>
                              ))}
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
              <MobileAccordionTrigger className="bg-elec-gray border-elec-yellow/20" icon={<Shield className="h-4 w-4 text-green-400" />}>ECS Cards & Categories</MobileAccordionTrigger>
              <MobileAccordionContent className="bg-elec-gray border-x border-b border-elec-yellow/20 rounded-b-lg p-3">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="rounded border border-elec-yellow/20 bg-elec-gray p-3">
                    <div className="text-base font-medium mb-1">Core Electrical</div>
                    <div className="text-sm space-y-2">
                      <div className="flex flex-wrap gap-2">
                        {["Apprentice","Trainee/Improver","Electrician (Gold)","Approved Electrician","Technician Electrician","Site Supervisor/Manager"].map((t) => (
                          <Badge key={t} variant="outline" className="border-elec-yellow/30 text-elec-yellow">{t}</Badge>
                        ))}
                      </div>
                      <p className="text-xs text-white">Cards verify competence, qualifications and H&S.</p>
                    </div>
                  </div>
                  <div className="rounded border border-elec-yellow/20 bg-elec-gray p-3">
                    <div className="text-base font-medium mb-1">Specialist Disciplines</div>
                    <div className="text-sm space-y-2">
                      <div className="flex flex-wrap gap-2">
                        {["Data Comms","Fire & Security","Network Cabling","EV Charging","Renewables","H.V. (authorised)"].map((t) => (
                          <Badge key={t} variant="outline" className="border-elec-yellow/30 text-elec-yellow">{t}</Badge>
                        ))}
                      </div>
                      <p className="text-xs text-white">Specialist routes often require manufacturer or scheme approval.</p>
                    </div>
                  </div>
                  <div className="rounded border border-elec-yellow/20 bg-elec-gray p-3">
                    <div className="text-base font-medium mb-1">Application Steps</div>
                    <div className="text-xs space-y-1">
                      <div className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-green-400" /> Create MyECS account</div>
                      <div className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-green-400" /> Upload qualifications & photo ID</div>
                      <div className="flex items-center gap-2"><Clock className="h-3 w-3 text-elec-yellow" /> Book H&S test (if required)</div>
                      <div className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-green-400" /> Submit and await verification (3–10 working days)</div>
                    </div>
                  </div>
                </div>
              </MobileAccordionContent>
            </MobileAccordionItem>

            {/* Pay & allowances */}
            <MobileAccordionItem value="pay">
              <MobileAccordionTrigger className="bg-elec-gray border-elec-yellow/20" icon={<Briefcase className="h-4 w-4 text-blue-400" />}>Pay Rates & Allowances</MobileAccordionTrigger>
              <MobileAccordionContent className="bg-elec-gray border-x border-b border-elec-yellow/20 rounded-b-lg p-3">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="rounded border border-elec-yellow/20 bg-elec-gray p-3">
                    <div className="text-base font-medium mb-1">Indicative Day Rates</div>
                    <div className="space-y-1 text-xs">
                      <div className="flex items-center gap-2"><Banknote className="h-3 w-3 text-elec-yellow" /> Electrician: £180–£260</div>
                      <div className="flex items-center gap-2"><Banknote className="h-3 w-3 text-elec-yellow" /> Approved: £220–£320</div>
                      <div className="flex items-center gap-2"><Banknote className="h-3 w-3 text-elec-yellow" /> Technician/Supervisor: £260–£400+</div>
                      <div className="mt-2 text-[11px] text-white">Overtime typical: x1.5 (weekday eves), x2 (Sundays/Bank Hols)</div>
                      <p className="text-white mt-2">Varies by region, project type and experience.</p>
                    </div>
                  </div>
                  <div className="rounded border border-elec-yellow/20 bg-elec-gray p-3">
                    <div className="text-base font-medium mb-1">JIB Working Rules</div>
                    <div className="text-xs space-y-1">
                      <div>• Standardised pay scales (check latest JIB agreement)</div>
                      <div>• Overtime, lodge and travel allowances where applicable</div>
                      <div>• Holiday and pension arrangements</div>
                      <div>• Travel time/uplifts may apply on large sites</div>
                    </div>
                  </div>
                  <div className="rounded border border-elec-yellow/20 bg-elec-gray p-3">
                    <div className="text-base font-medium mb-1">Regional Notes</div>
                    <div className="text-xs space-y-1">
                      <div className="flex items-center gap-2"><MapPin className="h-3 w-3 text-elec-yellow" /> London & SE tend to command higher rates</div>
                      <div className="flex items-center gap-2"><MapPin className="h-3 w-3 text-elec-yellow" /> Scotland: SJIB equivalent grading and rates</div>
                      <div className="flex items-center gap-2"><MapPin className="h-3 w-3 text-elec-yellow" /> Major projects can offer enhanced uplifts</div>
                      <div className="text-[11px] text-white">Check NAECI/Blue Book for certain industrial sites.</div>
                    </div>
                  </div>
                </div>
              </MobileAccordionContent>
            </MobileAccordionItem>

            {/* Upgrade pathway */}
            <MobileAccordionItem value="pathway">
              <MobileAccordionTrigger className="bg-elec-gray border-elec-yellow/20" icon={<TrendingUp className="h-4 w-4 text-green-400" />}>Upgrade Pathways</MobileAccordionTrigger>
              <MobileAccordionContent className="bg-elec-gray border-x border-b border-elec-yellow/20 rounded-b-lg p-3">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="rounded border border-elec-yellow/20 bg-elec-gray p-3">
                    <div className="text-base font-medium mb-1">Standard Route</div>
                    <div className="text-xs space-y-1">
                      <div>Apprentice → Improver → Electrician (Gold) → Approved → Technician</div>
                      <div className="text-white">Typical 6–10 years to Technician depending on experience and quals.</div>
                    </div>
                  </div>
                  <div className="rounded border border-elec-yellow/20 bg-elec-gray p-3">
                    <div className="text-base font-medium mb-1">Supervisor/Manager Route</div>
                    <div className="text-xs space-y-1">
                      <div>Approved/Technician → Chargehand → Site Supervisor → Manager</div>
                      <div className="text-white">Add leadership (SSSTS/SMSTS/IOSH) and project delivery experience.</div>
                    </div>
                  </div>
                  <div className="rounded border border-elec-yellow/20 bg-elec-gray p-3">
                    <div className="text-base font-medium mb-1">Fast‑Track / APL</div>
                    <div className="text-xs space-y-1">
                      <div>Experienced workers scheme with evidence portfolio</div>
                      <div className="text-white">Recognition of prior learning can reduce time to Gold/Approved.</div>
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
                      <div>• Keep current with 18th Edition (A2:2022) and amendments</div>
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
                    <p className="text-xs text-muted-foreground">Yes, Inspection & Testing is typically required for JIB Approved Electrician status.</p>
                  </div>
                  <div>
                    <div className="font-medium text-elec-yellow">What about Scotland?</div>
                    <p className="text-xs text-muted-foreground">Scotland follows SJIB which mirrors JIB; check SJIB for local details.</p>
                  </div>
                  <div>
                    <div className="font-medium text-elec-yellow">How long does verification take?</div>
                    <p className="text-xs text-muted-foreground">Usually 3–10 working days once all evidence is uploaded and validated.</p>
                  </div>
                  <div>
                    <div className="font-medium text-elec-yellow">Do I need a physical card?</div>
                    <p className="text-xs text-muted-foreground">The digital card is available immediately after approval; physical cards are posted and may take a few days.</p>
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
