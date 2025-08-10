
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
      requirements: [
        "Enrolled on approved apprenticeship",
        "Working towards Level 3 qualification",
        "Health & Safety test passed"
      ],
      benefits: ["Apprentice minimum wage protection", "Structured training pathway", "Industry recognition"],
      duration: "Typically 4 years"
    },
    {
      grade: "Improver",
      color: "bg-purple-500/20 text-purple-400 border-purple-500/30",
      requirements: [
        "Level 3 NVQ Diploma completed",
        "18th Edition BS 7671",
        "Working towards AM2 assessment"
      ],
      benefits: ["Higher pay rates", "More complex work opportunities", "Preparation for Gold Card"],
      duration: "1-2 years typically"
    },
    {
      grade: "Electrician (Gold Card)",
      color: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
      requirements: [
        "Level 3 NVQ Diploma",
        "AM2 assessment passed",
        "18th Edition BS 7671",
        "ECS H&S test"
      ],
      benefits: ["JIB Gold Card", "Skilled worker rates", "Industry-wide recognition"],
      duration: "Career level"
    },
    {
      grade: "Approved Electrician (JIB)",
      color: "bg-elec-yellow/20 text-elec-yellow border-elec-yellow/30",
      requirements: [
        "All Electrician (Gold Card) requirements",
        "Inspection & Testing (2391)",
        "Post-qualification site experience"
      ],
      benefits: ["Enhanced recognition", "Access to JIB resources", "Higher responsibility roles"],
      duration: "Career level"
    },
    {
      grade: "Technician Electrician (JIB)",
      color: "bg-green-500/20 text-green-400 border-green-500/30",
      requirements: [
        "Approved Electrician status",
        "Advanced qualifications (2391; HNC/HND preferred)",
        "Design/inspection competence",
        "Significant experience"
      ],
      benefits: ["Technical leadership", "Complex project work", "Design and test authority", "Mentoring responsibilities"],
      duration: "Career level"
    },
    {
      grade: "Supervisor",
      color: "bg-red-500/20 text-red-400 border-red-500/30",
      requirements: [
        "Approved Electrician or Technician Electrician",
        "Management/leadership experience",
        "SSSTS/SMSTS or IOSH Managing Safely",
        "Proven track record on site"
      ],
      benefits: ["Management responsibilities", "Project oversight", "Staff development role", "Strategic planning involvement"],
      duration: "Career level"
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
          <p className="text-sm text-muted-foreground">
            The Joint Industry Board (JIB) grading scheme is the UK standard for electrical worker classification and pay scales
          </p>
        </header>
        <div>
          {/* Top metrics grid: 2x2 on mobile, 4 cols on desktop; square tiles with coloured icons */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            <div className="aspect-square rounded-lg border border-elec-yellow/20 bg-elec-gray p-3 flex flex-col items-center justify-center text-center">
              <Award className="h-6 w-6 text-purple-400" aria-hidden="true" />
              <div className="mt-2 font-semibold text-sm">6 Grades</div>
              <div className="text-[11px] text-muted-foreground">Progression pathway</div>
            </div>
            <div className="aspect-square rounded-lg border border-elec-yellow/20 bg-elec-gray p-3 flex flex-col items-center justify-center text-center">
              <Clock className="h-6 w-6 text-elec-yellow" aria-hidden="true" />
              <div className="mt-2 font-semibold text-sm">4–5 yrs</div>
              <div className="text-[11px] text-muted-foreground">To Gold Card</div>
            </div>
            <div className="aspect-square rounded-lg border border-elec-yellow/20 bg-elec-gray p-3 flex flex-col items-center justify-center text-center">
              <Shield className="h-6 w-6 text-green-400" aria-hidden="true" />
              <div className="mt-2 font-semibold text-sm">3‑year</div>
              <div className="text-[11px] text-muted-foreground">ECS renewal</div>
            </div>
            <div className="aspect-square rounded-lg border border-elec-yellow/20 bg-elec-gray p-3 flex flex-col items-center justify-center text-center">
              <Briefcase className="h-6 w-6 text-blue-400" aria-hidden="true" />
              <div className="mt-2 font-semibold text-sm">UK‑wide</div>
              <div className="text-[11px] text-muted-foreground">Employer recognition</div>
            </div>
          </div>

          {/* Structured content like Skills Development (mobile‑first accordion) */}
          <MobileAccordion type="multiple" className="space-y-4">
            {/* JIB Grades (moved existing content) */}
            <MobileAccordionItem value="grades">
              <MobileAccordionTrigger icon={<Award className="h-4 w-4 text-elec-yellow" />}>JIB Grades & Requirements</MobileAccordionTrigger>
              <MobileAccordionContent>
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
                            <Badge className={grade.color}>Grade {selectedGradeIndex + 1}</Badge>
                          </div>
                          <div className="space-y-4">
                            <div>
                              <h4 className="text-sm font-medium mb-2 text-elec-yellow flex items-center gap-1">
                                <BookOpen className="h-3 w-3" /> Requirements
                              </h4>
                              <div className="space-y-1">
                                {grade.requirements.map((req, idx) => (
                                  <div key={idx} className="text-xs flex items-start gap-2">
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
                                  <div key={idx} className="text-xs flex items-start gap-2">
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
                              <div className="text-sm text-muted-foreground">{grade.duration}</div>
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
                          <Badge className={grade.color}>Grade {index + 1}</Badge>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <h4 className="text-sm font-medium mb-2 text-elec-yellow flex items-center gap-1">
                              <BookOpen className="h-3 w-3" /> Requirements
                            </h4>
                            <div className="space-y-1">
                              {grade.requirements.map((req, idx) => (
                                <div key={idx} className="text-xs flex items-start gap-2">
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
                                <div key={idx} className="text-xs flex items-start gap-2">
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
                            <div className="text-sm text-muted-foreground">{grade.duration}</div>
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
              <MobileAccordionTrigger icon={<Shield className="h-4 w-4 text-elec-yellow" />}>ECS Cards & Categories</MobileAccordionTrigger>
              <MobileAccordionContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="rounded border border-elec-yellow/20 bg-elec-gray p-3">
                    <div className="text-base font-medium mb-1">Core Electrical</div>
                    <div className="text-sm space-y-2">
                      <div className="flex flex-wrap gap-2">
                        {["Apprentice","Trainee/Improver","Electrician (Gold)","Approved Electrician","Technician Electrician","Site Supervisor/Manager"].map((t) => (
                          <Badge key={t} variant="outline" className="border-elec-yellow/30 text-elec-yellow">{t}</Badge>
                        ))}
                      </div>
                      <p className="text-xs text-muted-foreground">Cards verify competence, qualifications and H&S.</p>
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
                      <p className="text-xs text-muted-foreground">Specialist routes often require manufacturer or scheme approval.</p>
                    </div>
                  </div>
                </div>
              </MobileAccordionContent>
            </MobileAccordionItem>

            {/* Pay & allowances */}
            <MobileAccordionItem value="pay">
              <MobileAccordionTrigger icon={<Briefcase className="h-4 w-4 text-elec-yellow" />}>Pay Rates & Allowances</MobileAccordionTrigger>
              <MobileAccordionContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="rounded border border-elec-yellow/20 bg-elec-gray p-3">
                    <div className="text-base font-medium mb-1">Indicative Day Rates</div>
                    <div className="space-y-1 text-xs">
                      <div className="flex items-center gap-2"><Banknote className="h-3 w-3 text-elec-yellow" /> Electrician: £180–£260</div>
                      <div className="flex items-center gap-2"><Banknote className="h-3 w-3 text-elec-yellow" /> Approved: £220–£320</div>
                      <div className="flex items-center gap-2"><Banknote className="h-3 w-3 text-elec-yellow" /> Technician/Supervisor: £260–£400+</div>
                      <p className="text-muted-foreground mt-2">Varies by region, project type and experience.</p>
                    </div>
                  </div>
                  <div className="rounded border border-elec-yellow/20 bg-elec-gray p-3">
                    <div className="text-base font-medium mb-1">JIB Working Rules</div>
                    <div className="text-xs space-y-1">
                      <div>• Standardised pay scales (check latest JIB agreement)</div>
                      <div>• Overtime, lodge and travel allowances where applicable</div>
                      <div>• Holiday and pension arrangements</div>
                    </div>
                  </div>
                  <div className="rounded border border-elec-yellow/20 bg-elec-gray p-3">
                    <div className="text-base font-medium mb-1">Regional Notes</div>
                    <div className="text-xs space-y-1">
                      <div className="flex items-center gap-2"><MapPin className="h-3 w-3 text-elec-yellow" /> London & SE tend to command higher rates</div>
                      <div className="flex items-center gap-2"><MapPin className="h-3 w-3 text-elec-yellow" /> Scotland: SJIB equivalent grading and rates</div>
                      <div className="flex items-center gap-2"><MapPin className="h-3 w-3 text-elec-yellow" /> Major projects can offer enhanced uplifts</div>
                    </div>
                  </div>
                </div>
              </MobileAccordionContent>
            </MobileAccordionItem>

            {/* Upgrade pathway */}
            <MobileAccordionItem value="pathway">
              <MobileAccordionTrigger icon={<TrendingUp className="h-4 w-4 text-elec-yellow" />}>Upgrade Pathways</MobileAccordionTrigger>
              <MobileAccordionContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="rounded border border-elec-yellow/20 bg-elec-gray p-3">
                    <div className="text-base font-medium mb-1">Standard Route</div>
                    <div className="text-xs space-y-1">
                      <div>Apprentice → Improver → Electrician (Gold) → Approved → Technician</div>
                      <div className="text-muted-foreground">Typical 6–10 years to Technician depending on experience and quals.</div>
                    </div>
                  </div>
                  <div className="rounded border border-elec-yellow/20 bg-elec-gray p-3">
                    <div className="text-base font-medium mb-1">Supervisor/Manager Route</div>
                    <div className="text-xs space-y-1">
                      <div>Approved/Technician → Chargehand → Site Supervisor → Manager</div>
                      <div className="text-muted-foreground">Add leadership (SSSTS/SMSTS/IOSH) and project delivery experience.</div>
                    </div>
                  </div>
                </div>
              </MobileAccordionContent>
            </MobileAccordionItem>

            {/* CPD & renewals */}
            <MobileAccordionItem value="cpd">
              <MobileAccordionTrigger icon={<Clock className="h-4 w-4 text-elec-yellow" />}>CPD & Renewals</MobileAccordionTrigger>
              <MobileAccordionContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="rounded border border-elec-yellow/20 bg-elec-gray p-3">
                    <div className="text-base font-medium mb-1">ECS Renewal</div>
                    <div className="text-xs space-y-1">
                      <div className="flex items-center gap-2"><Shield className="h-3 w-3 text-elec-yellow" /> Renew every 3 years</div>
                      <div>• Current H&S assessment</div>
                      <div>• Up‑to‑date qualifications</div>
                    </div>
                  </div>
                  <div className="rounded border border-elec-yellow/20 bg-elec-gray p-3">
                    <div className="text-base font-medium mb-1">BS 7671 Updates</div>
                    <div className="text-xs space-y-1">
                      <div>• Keep current with 18th Edition (A2:2022) and amendments</div>
                      <div>• CPD on changes and application</div>
                    </div>
                  </div>
                  <div className="rounded border border-elec-yellow/20 bg-elec-gray p-3">
                    <div className="text-base font-medium mb-1">Professional CPD</div>
                    <div className="text-xs space-y-1">
                      <div>• Testing (2391), EV, Solar, Fire/Alarm, BMS</div>
                      <div>• Scheme assessments (NICEIC/NAPIT) if contracting</div>
                    </div>
                  </div>
                </div>
              </MobileAccordionContent>
            </MobileAccordionItem>

            {/* Evidence checklist */}
            <MobileAccordionItem value="evidence">
              <MobileAccordionTrigger icon={<CheckCircle className="h-4 w-4 text-green-400" />}>Evidence Checklist (Upgrades)</MobileAccordionTrigger>
              <MobileAccordionContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
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
                </div>
              </MobileAccordionContent>
            </MobileAccordionItem>

            {/* Application process */}
            <MobileAccordionItem value="apply">
              <MobileAccordionTrigger icon={<CheckCircle className="h-4 w-4 text-green-400" />}>Application Process (Typical)</MobileAccordionTrigger>
              <MobileAccordionContent>
                <ol className="list-decimal pl-5 space-y-2 text-xs">
                  <li>Confirm eligibility and gather evidence (NVQ, AM2, 18th, references)</li>
                  <li>Create or log into your MyECS account and start a new application</li>
                  <li>Upload documents and pay the applicable fee</li>
                  <li>Book and pass the ECS Health & Safety assessment (if required)</li>
                  <li>Await verification; your digital ECS card updates first, physical card follows</li>
                </ol>
              </MobileAccordionContent>
            </MobileAccordionItem>

            {/* H&S topics */}
            <MobileAccordionItem value="hs-topics">
              <MobileAccordionTrigger icon={<Shield className="h-4 w-4 text-elec-yellow" />}>ECS Health & Safety Test Topics</MobileAccordionTrigger>
              <MobileAccordionContent>
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
              </MobileAccordionContent>
            </MobileAccordionItem>

            {/* SJIB mapping */}
            <MobileAccordionItem value="sjib">
              <MobileAccordionTrigger icon={<MapPin className="h-4 w-4 text-blue-400" />}>SJIB Equivalence (Scotland)</MobileAccordionTrigger>
              <MobileAccordionContent>
                <div className="text-xs space-y-2">
                  <p className="text-muted-foreground">SJIB mirrors JIB grading for Scotland. Typical mappings:</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="rounded border border-elec-yellow/20 bg-elec-gray p-3">
                      <div className="font-medium">JIB Electrician ⇄ SJIB Electrician</div>
                      <div className="text-muted-foreground">NVQ3 + AM2 + 18th Edition</div>
                    </div>
                    <div className="rounded border border-elec-yellow/20 bg-elec-gray p-3">
                      <div className="font-medium">JIB Approved ⇄ SJIB Approved</div>
                      <div className="text-muted-foreground">Add 2391 and experience</div>
                    </div>
                  </div>
                </div>
              </MobileAccordionContent>
            </MobileAccordionItem>

            {/* FAQs */}
            <MobileAccordionItem value="faqs">
              <MobileAccordionTrigger icon={<Users className="h-4 w-4 text-elec-yellow" />}>FAQs</MobileAccordionTrigger>
              <MobileAccordionContent>
                <div className="space-y-3 text-sm">
                  <div>
                    <div className="font-medium text-elec-yellow">Is JIB grading mandatory?</div>
                    <p className="text-xs text-muted-foreground">Not legally, but widely required by employers and sites for proof of competence.</p>
                  </div>
                  <div>
                    <div className="font-medium text-elec-yellow">Do I need 2391 for Approved?</div>
                    <p className="text-xs text-muted-foreground">Yes, Inspection & Testing is typically required for JIB Approved Electrician status.</p>
                  </div>
                  <div>
                    <div className="font-medium text-elec-yellow">What about Scotland?</div>
                    <p className="text-xs text-muted-foreground">Scotland follows SJIB which mirrors JIB; check SJIB for local details.</p>
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
