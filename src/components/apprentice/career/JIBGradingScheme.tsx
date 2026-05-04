import {
  MobileAccordion,
  MobileAccordionItem,
  MobileAccordionTrigger,
  MobileAccordionContent,
} from '@/components/ui/mobile-accordion';
import { CheckCircle } from 'lucide-react';
import { useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

const JIBGradingScheme = () => {
  const isMobile = useIsMobile();
  const [selectedGradeIndex, setSelectedGradeIndex] = useState<number | null>(null);

  const jibGrades = [
    {
      grade: 'Apprentice',
      hourlyRate: '£8.00/hr minimum (April 2026)',
      dayRate: '£60-65/day typical',
      requirements: [
        'Enrolled on approved Level 3 apprenticeship programme',
        'Working towards 2357/5357 NVQ Diploma',
        'Health & Safety test passed (CSCS Construction)',
        'Monthly college attendance (day/block release)',
        'Employer mentorship programme',
        'DBS check (Basic level) for some sites',
      ],
      benefits: [
        'Apprentice minimum wage protection (£8.00/hr minimum)',
        'Structured 4-year training pathway with portfolio building',
        'Industry recognition and ECS Apprentice card eligibility',
        'Government funding support for employers',
        'Clear progression route to Improver status',
        'Access to JTL/NICEIC/ECA apprentice support networks',
        'Career development guidance and mentorship',
      ],
      responsibilities: [
        'Basic electrical installation under direct supervision',
        'Cable pulling, containment installation, basic connections',
        'Health & safety compliance and risk awareness',
        'Portfolio evidence collection and reflective practice',
        'College assignment completion and practical assessments',
        'Site housekeeping and tool maintenance',
        'Following method statements and risk assessments',
      ],
      cpd: [
        '18th Edition BS 7671 preparation (Year 3-4)',
        'First Aid at Work certification',
        'Working at Height awareness training',
        'Fire safety and emergency procedures',
        'Manufacturer product training (cable management, accessories)',
        'Digital skills development (apps, testing equipment)',
        'EV charging fundamentals introduction',
      ],
      duration: '4 years (Level 3 apprenticeship standard)',
      fastTrack: 'Adult apprenticeships may complete in 2-3 years with prior experience',
    },
    {
      grade: 'Improver',
      hourlyRate: '£16-22/hr typical',
      dayRate: '£160-220/day London premium',
      requirements: [
        'Level 3 NVQ Diploma (2357/5357) completed',
        '18th Edition BS 7671 (2382-22) certificate current',
        'Working towards AM2/AM2S practical assessment',
        'Minimum 6 months post-qualification experience',
        'ECS Health & Safety test passed',
        'Evidence portfolio demonstrating practical competence',
      ],
      benefits: [
        'Higher pay rates and reduced supervision',
        'More complex work opportunities',
        'Pathway to ECS Gold Card application',
        'Access to specialist training (EV, Solar PV, Smart Buildings)',
        'Career development discussions with senior electricians',
        'Opportunity to work on renewable energy projects',
        'Access to manufacturer training programmes',
      ],
      responsibilities: [
        'Installation and commissioning of electrical circuits',
        'Basic testing and inspection procedures (dead tests)',
        'Fault diagnosis on simple circuits and domestic installations',
        'Mentoring new apprentices and work experience students',
        'Quality assurance and compliance checking',
        'Customer interaction under supervision',
        'Site survey assistance and material calculations',
      ],
      cpd: [
        'AM2/AM2S practical assessment preparation',
        '2391-52 Initial Verification and Certification',
        'EV Charging installation (2919) introduction',
        'Solar PV systems overview (2399) and battery storage',
        'Site safety leadership (SSSTS preparation)',
        'Smart home technology and IoT integration',
        'Heat pump electrical installation basics',
      ],
      duration: '1-2 years pathway to Electrician status',
      fastTrack: 'Experienced workers may progress faster with APL assessment',
    },
    {
      grade: 'Electrician (Gold Card)',
      hourlyRate: '£24-30/hr base',
      dayRate: '£200-320/day + regional premiums',
      requirements: [
        'Level 3 NVQ Diploma (2357/5357) completed',
        'AM2/AM2S practical assessment passed',
        '18th Edition BS 7671 (2382-22) current certificate',
        'ECS Health & Safety test valid (renewed every 3 years)',
        'Minimum 2 years post-qualification experience',
        'Evidence of competent person status',
      ],
      benefits: [
        'ECS Gold Card recognition UK-wide',
        'Skilled worker rates',
        'Industry-wide acceptance for site access',
        'Independent working authority on complex installations',
        'Pathway to specialist roles and further qualifications',
        'Access to NICEIC/NAPIT contractor schemes',
        'Self-employment opportunities with Part P registration',
      ],
      responsibilities: [
        'Complete electrical installations from design to commissioning',
        'Testing, inspection and certification of electrical work (periodic)',
        'Fault finding and repair on complex industrial/commercial systems',
        'Customer liaison, technical explanations and quotations',
        'Compliance with BS 7671, building regulations and CDM',
        'Risk assessment creation and method statement implementation',
        'Supervision of junior electricians and apprentices',
      ],
      cpd: [
        'BS 7671:2018 + A4:2026 (current standard)',
        '2391-52 Inspection, Testing and Certification (essential)',
        'Specialist manufacturer training',
        'Smart building systems, IoT integration and BMS',
        'Customer service and communication skills',
        'EV charging installation and maintenance (City & Guilds 2919)',
        'Solar PV design and installation with battery storage',
      ],
      duration: 'Career level with ongoing development',
    },
    {
      grade: 'Approved Electrician (JIB)',
      hourlyRate: '£25-32/hr enhanced',
      requirements: [
        'All Electrician (Gold Card) requirements met',
        '2391-52 Inspection & Testing qualification',
        'Minimum 3 years post-Gold Card experience',
        'Demonstrated competency in complex installations',
        'JIB membership and annual CPD compliance',
      ],
      benefits: [
        'Enhanced recognition and premium rates',
        'Access to JIB member resources and support',
        'Priority consideration for senior roles',
        'Pathway to supervision and management positions',
        'Industry leadership opportunities and networking',
      ],
      responsibilities: [
        'Design verification and electrical system approval',
        'Complex installation project leadership',
        'Quality assurance and inspection oversight',
        'Technical mentoring of junior electricians',
        'Customer consultation on electrical solutions',
      ],
      cpd: [
        'Advanced 2391 courses and periodic updates',
        'IET technical seminars and conferences',
        'Code of Practice updates and regulatory changes',
        'Business skills development (project management)',
        'Emerging technology training (smart grids, energy storage)',
      ],
      duration: 'Career level with enhanced responsibilities',
    },
    {
      grade: 'Technician Electrician (JIB)',
      hourlyRate: '£28-36/hr premium',
      requirements: [
        'Approved Electrician status established',
        'HNC/HND Electrical Engineering preferred',
        '2391-52 plus additional design qualifications',
        'Proven design and inspection competence',
        'Minimum 5 years advanced electrical experience',
      ],
      benefits: [
        'Technical leadership authority and premium rates',
        'Complex project design and specification responsibility',
        'Advanced testing and commissioning authority',
        'Professional mentoring and development role',
        'Industry technical committee participation opportunities',
      ],
      responsibilities: [
        'Electrical system design and specification',
        'Advanced testing, commissioning and handover procedures',
        'Technical problem solving and innovation',
        'Team leadership and skills development',
        'Client technical consultation and solution development',
      ],
      cpd: [
        'IET membership and Chartered Engineer pathway',
        'Advanced electrical design courses (lighting, power systems)',
        'Building Management Systems (BMS) and controls',
        'Renewable energy integration and storage systems',
        'Professional development and leadership training',
      ],
      duration: 'Senior career level with technical specialisation',
    },
    {
      grade: 'Supervisor',
      hourlyRate: '£32-45/hr management',
      requirements: [
        'Approved Electrician or Technician Electrician status',
        'SSSTS/SMSTS (Site Supervisor/Manager Training Scheme)',
        'IOSH Managing Safely or equivalent',
        'Proven team leadership and project management experience',
        'Current First Aid at Work and emergency response training',
      ],
      benefits: [
        'Management responsibility and enhanced rates',
        'Project oversight and strategic planning involvement',
        'Staff development and career progression authority',
        'Budget management and resource allocation',
        'Senior stakeholder liaison and contract management',
      ],
      responsibilities: [
        'Site safety management and regulatory compliance',
        'Team coordination, planning and resource allocation',
        'Quality control, progress monitoring and reporting',
        'Client communication and stakeholder management',
        'Budget oversight and cost control management',
      ],
      cpd: [
        'IOSH certification maintenance and updates',
        'Project management professional development (PRINCE2, APM)',
        'Health & safety law updates and CDM regulations',
        'Leadership and team development training',
        'Commercial awareness and contract management',
      ],
      duration: 'Senior management career level',
    },
  ];

  return (
    <div className="space-y-6">
      <section aria-labelledby="jib-heading" className="space-y-4">
        <header className="space-y-2">
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
            JIB grading
          </span>
          <h2 id="jib-heading" className="text-[20px] sm:text-[24px] font-bold text-white leading-tight">
            JIB grading scheme & ECS cards
          </h2>
          <p className="text-[14px] text-white/70 leading-relaxed">
            The Joint Industry Board (JIB) grading scheme is the UK standard for electrical worker
            classification and pay scales.
          </p>
        </header>

        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-3">
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
            Industry update
          </span>
          <p className="text-[14px] text-white/85 leading-relaxed">
            Skills shortages continue to push rates upward year-on-year. Net Zero targets are
            driving demand for EV charging, heat pump and data centre specialists.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3 space-y-1">
              <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                High demand
              </span>
              <p className="text-[13px] text-white/85">
                EV charging · Data centres · Heat pumps · Smart buildings
              </p>
            </div>
            <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3 space-y-1">
              <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                Rate premiums
              </span>
              <p className="text-[13px] text-white/85">
                Specialists earn meaningful premiums over base rates
              </p>
            </div>
            <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3 space-y-1">
              <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                Skills gap
              </span>
              <p className="text-[13px] text-white/85">
                Strong demand for qualified electricians across the UK
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 space-y-1">
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
              Grades
            </span>
            <div className="text-[16px] font-semibold text-white">6</div>
            <p className="text-[12px] text-white/55">Progression pathway</p>
          </div>
          <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 space-y-1">
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
              To Gold Card
            </span>
            <div className="text-[16px] font-semibold text-white">4-5 yrs</div>
            <p className="text-[12px] text-white/55">Typical pathway</p>
          </div>
          <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 space-y-1">
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
              ECS renewal
            </span>
            <div className="text-[16px] font-semibold text-white">3-year</div>
            <p className="text-[12px] text-white/55">Card validity</p>
          </div>
          <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 space-y-1">
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
              Coverage
            </span>
            <div className="text-[16px] font-semibold text-white">UK-wide</div>
            <p className="text-[12px] text-white/55">Employer recognition</p>
          </div>
        </div>

        <MobileAccordion type="multiple" className="space-y-3">
          <MobileAccordionItem value="calculator">
            <MobileAccordionTrigger className="bg-white/[0.02] border-white/[0.06]">
              Quick rate calculator
            </MobileAccordionTrigger>
            <MobileAccordionContent className="bg-white/[0.02] border-x border-b border-white/[0.06] rounded-b-lg p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                    Estimate your day rate
                  </span>
                  <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3 space-y-1">
                    <p className="text-[13px] text-white">Gold Card Electrician (base)</p>
                    <div className="space-y-1 text-[12px] text-white/85">
                      <div className="flex justify-between">
                        <span>Regional</span>
                        <span className="font-mono">£200-280/day</span>
                      </div>
                      <div className="flex justify-between">
                        <span>London</span>
                        <span className="font-mono">£220-340/day</span>
                      </div>
                      <div className="flex justify-between">
                        <span>+ EV specialist</span>
                        <span className="font-mono">+£30-50/day</span>
                      </div>
                      <div className="flex justify-between">
                        <span>+ 2391 testing</span>
                        <span className="font-mono">+£20-40/day</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                    Progression target
                  </span>
                  <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3 space-y-1 text-[13px] text-white/85">
                    <div>Current: Improver (£180/day)</div>
                    <div>Next: Gold Card (+£40-80/day)</div>
                    <div>Required: AM2 + 2 years experience</div>
                    <div className="text-white">Potential increase: £8,000-16,000/year</div>
                  </div>
                  <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3 text-[12px] text-white/85">
                    Self-employment bonus: add 25-40% to employee rates to cover benefits, tax and
                    profit margin.
                  </div>
                </div>
              </div>
            </MobileAccordionContent>
          </MobileAccordionItem>

          <MobileAccordionItem value="trends">
            <MobileAccordionTrigger className="bg-white/[0.02] border-white/[0.06]">
              Industry trends & opportunities
            </MobileAccordionTrigger>
            <MobileAccordionContent className="bg-white/[0.02] border-x border-b border-white/[0.06] rounded-b-lg p-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3 space-y-1.5">
                  <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                    Net Zero impact
                  </span>
                  <ul className="text-[13px] text-white/85 space-y-1">
                    <li>Strong growth in green jobs through 2030</li>
                    <li>Heat pump installations scaling up</li>
                    <li>EV charging infrastructure expanding</li>
                    <li>Solar PV growth across domestic and commercial</li>
                  </ul>
                  <p className="text-[12px] text-white/55 pt-1">
                    Skills premium for certified specialists
                  </p>
                </div>
                <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3 space-y-1.5">
                  <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                    AI & data infrastructure
                  </span>
                  <ul className="text-[13px] text-white/85 space-y-1">
                    <li>Data centre investment growing</li>
                    <li>Smart building integration expanding</li>
                    <li>IoT and BMS specialists in demand</li>
                    <li>Critical power systems growth</li>
                  </ul>
                  <p className="text-[12px] text-white/55 pt-1">Specialist roles command premium rates</p>
                </div>
                <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3 space-y-1.5">
                  <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                    Skills gap
                  </span>
                  <ul className="text-[13px] text-white/85 space-y-1">
                    <li>Strong demand across the country</li>
                    <li>Aging workforce in many regions</li>
                    <li>Regional shortages acute in South East</li>
                  </ul>
                  <p className="text-[12px] text-white/55 pt-1">
                    Fast progression opportunities available
                  </p>
                </div>
              </div>
            </MobileAccordionContent>
          </MobileAccordionItem>

          <MobileAccordionItem value="grades">
            <MobileAccordionTrigger className="bg-white/[0.02] border-white/[0.06]">
              JIB grades & requirements
            </MobileAccordionTrigger>
            <MobileAccordionContent className="bg-white/[0.02] border-x border-b border-white/[0.06] rounded-b-lg p-4">
              {isMobile ? (
                <>
                  <div className="grid grid-cols-2 gap-3">
                    {jibGrades.map((grade, index) => {
                      const isSelected = selectedGradeIndex === index;
                      return (
                        <button
                          key={grade.grade}
                          onClick={() => setSelectedGradeIndex(index)}
                          className={`rounded-xl border p-3 flex flex-col items-center justify-center text-center touch-manipulation min-h-[88px] transition-colors ${
                            isSelected
                              ? 'border-elec-yellow/40 bg-elec-yellow/[0.04]'
                              : 'border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04]'
                          }`}
                        >
                          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                            Grade {index + 1}
                          </span>
                          <span className="text-[14px] font-semibold text-white mt-1">
                            {grade.grade}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {selectedGradeIndex !== null &&
                    (() => {
                      const grade = jibGrades[selectedGradeIndex];
                      return (
                        <div className="mt-4 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 space-y-4">
                          <div className="flex items-baseline justify-between gap-2">
                            <h4 className="text-[16px] font-semibold text-white">{grade.grade}</h4>
                            <span className="text-[12px] text-white/85 font-mono">
                              {grade.hourlyRate}
                            </span>
                          </div>

                          <div className="space-y-2">
                            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                              Requirements
                            </span>
                            <ul className="space-y-1.5">
                              {grade.requirements.map((req, idx) => (
                                <li
                                  key={idx}
                                  className="flex items-start gap-2 text-[13px] text-white/85"
                                >
                                  <CheckCircle className="h-3.5 w-3.5 text-white/55 mt-0.5 flex-shrink-0" />
                                  <span>{req}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="space-y-2">
                            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                              Benefits
                            </span>
                            <ul className="space-y-1.5">
                              {grade.benefits.map((benefit, idx) => (
                                <li
                                  key={idx}
                                  className="flex items-start gap-2 text-[13px] text-white/85"
                                >
                                  <span className="w-1 h-1 rounded-full bg-white/55 mt-2 flex-shrink-0" />
                                  <span>{benefit}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="space-y-2">
                            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                              Duration
                            </span>
                            <p className="text-[13px] text-white/85">{grade.duration}</p>
                            {grade.fastTrack && (
                              <p className="text-[13px] text-white/70">
                                <span className="text-white">Fast track:</span> {grade.fastTrack}
                              </p>
                            )}
                          </div>

                          <div className="space-y-2">
                            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                              Typical responsibilities
                            </span>
                            <ul className="space-y-1.5">
                              {grade.responsibilities.map((resp, idx) => (
                                <li
                                  key={idx}
                                  className="flex items-start gap-2 text-[13px] text-white/85"
                                >
                                  <span className="w-1 h-1 rounded-full bg-white/55 mt-2 flex-shrink-0" />
                                  <span>{resp}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="space-y-2">
                            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                              Recommended CPD
                            </span>
                            <ul className="space-y-1.5">
                              {grade.cpd.map((course, idx) => (
                                <li
                                  key={idx}
                                  className="flex items-start gap-2 text-[13px] text-white/85"
                                >
                                  <span className="w-1 h-1 rounded-full bg-white/55 mt-2 flex-shrink-0" />
                                  <span>{course}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      );
                    })()}
                </>
              ) : (
                <div className="space-y-3">
                  {jibGrades.map((grade, index) => (
                    <div
                      key={grade.grade}
                      className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 space-y-4"
                    >
                      <div className="flex items-baseline justify-between gap-2">
                        <div>
                          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                            Grade {index + 1}
                          </span>
                          <h4 className="text-[16px] font-semibold text-white mt-1">
                            {grade.grade}
                          </h4>
                        </div>
                        <span className="text-[13px] text-white/85 font-mono">
                          {grade.hourlyRate}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                            Requirements
                          </span>
                          <ul className="space-y-1.5">
                            {grade.requirements.map((req, idx) => (
                              <li
                                key={idx}
                                className="flex items-start gap-2 text-[13px] text-white/85"
                              >
                                <CheckCircle className="h-3.5 w-3.5 text-white/55 mt-0.5 flex-shrink-0" />
                                <span>{req}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="space-y-2">
                          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                            Benefits
                          </span>
                          <ul className="space-y-1.5">
                            {grade.benefits.map((benefit, idx) => (
                              <li
                                key={idx}
                                className="flex items-start gap-2 text-[13px] text-white/85"
                              >
                                <span className="w-1 h-1 rounded-full bg-white/55 mt-2 flex-shrink-0" />
                                <span>{benefit}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="space-y-2">
                          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                            Duration
                          </span>
                          <p className="text-[13px] text-white/85">{grade.duration}</p>
                          {grade.fastTrack && (
                            <p className="text-[13px] text-white/70">
                              <span className="text-white">Fast track:</span> {grade.fastTrack}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                            Typical responsibilities
                          </span>
                          <ul className="space-y-1.5">
                            {grade.responsibilities.map((resp, idx) => (
                              <li
                                key={idx}
                                className="flex items-start gap-2 text-[13px] text-white/85"
                              >
                                <span className="w-1 h-1 rounded-full bg-white/55 mt-2 flex-shrink-0" />
                                <span>{resp}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="space-y-2">
                          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                            Recommended CPD
                          </span>
                          <ul className="space-y-1.5">
                            {grade.cpd.map((course, idx) => (
                              <li
                                key={idx}
                                className="flex items-start gap-2 text-[13px] text-white/85"
                              >
                                <span className="w-1 h-1 rounded-full bg-white/55 mt-2 flex-shrink-0" />
                                <span>{course}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </MobileAccordionContent>
          </MobileAccordionItem>

          <MobileAccordionItem value="ecs">
            <MobileAccordionTrigger className="bg-white/[0.02] border-white/[0.06]">
              ECS cards & categories
            </MobileAccordionTrigger>
            <MobileAccordionContent className="bg-white/[0.02] border-x border-b border-white/[0.06] rounded-b-lg p-4">
              <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3 space-y-2 mb-4">
                <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                  Application fees (current)
                </span>
                <div className="grid grid-cols-2 gap-2 text-[13px] text-white/85">
                  <div>Apprentice: £36</div>
                  <div>Gold Card: £42</div>
                  <div>Approved: £70</div>
                  <div>Supervisor: £126</div>
                </div>
                <p className="text-[12px] text-white/55">
                  3-year validity · digital cards issued immediately · physical cards posted within
                  5 working days.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3 space-y-2">
                  <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                    Core electrical
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      'Apprentice',
                      'Trainee/Improver',
                      'Electrician (Gold)',
                      'Approved Electrician',
                      'Technician Electrician',
                      'Site Supervisor/Manager',
                    ].map((t) => (
                      <span
                        key={t}
                        className="text-[12px] text-white/85 px-2 py-0.5 rounded-md border border-white/10 bg-white/[0.03]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <p className="text-[12px] text-white/55">
                    Cards verify competence, qualifications and health & safety knowledge.
                  </p>
                </div>
                <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3 space-y-2">
                  <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                    Specialist categories
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      'EV Charging',
                      'Smart Buildings',
                      'Data Centres',
                      'Fire & Security',
                      'Network Cabling',
                      'Solar PV',
                      'Heat Pumps',
                      'H.V. Authorised',
                      'Energy Storage',
                    ].map((t) => (
                      <span
                        key={t}
                        className="text-[12px] text-white/85 px-2 py-0.5 rounded-md border border-white/10 bg-white/[0.03]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <p className="text-[12px] text-white/55">
                    High-demand specialisations requiring additional certifications and
                    manufacturer approvals.
                  </p>
                </div>
                <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3 space-y-2">
                  <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                    Application process
                  </span>
                  <ul className="text-[13px] text-white/85 space-y-1.5">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-3.5 w-3.5 text-white/55 mt-0.5 flex-shrink-0" />
                      <span>Create MyECS account</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-3.5 w-3.5 text-white/55 mt-0.5 flex-shrink-0" />
                      <span>Upload qualifications (PDF)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-3.5 w-3.5 text-white/55 mt-0.5 flex-shrink-0" />
                      <span>Passport-style photo (mobile upload)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-3.5 w-3.5 text-white/55 mt-0.5 flex-shrink-0" />
                      <span>Book H&S test online (if required)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-3.5 w-3.5 text-white/55 mt-0.5 flex-shrink-0" />
                      <span>Instant digital card upon approval</span>
                    </li>
                  </ul>
                </div>
              </div>
            </MobileAccordionContent>
          </MobileAccordionItem>

          <MobileAccordionItem value="pay">
            <MobileAccordionTrigger className="bg-white/[0.02] border-white/[0.06]">
              Pay rates & regional breakdown
            </MobileAccordionTrigger>
            <MobileAccordionContent className="bg-white/[0.02] border-x border-b border-white/[0.06] rounded-b-lg p-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3 space-y-2">
                  <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                    Day rates by region
                  </span>
                  <div className="space-y-2 text-[13px] text-white/85">
                    <div>
                      <p className="text-white">London & M25</p>
                      <p>Electrician: £220-340/day</p>
                      <p>Approved: £280-420/day</p>
                      <p>Supervisor: £350-500+/day</p>
                    </div>
                    <div>
                      <p className="text-white">Regional (England/Wales)</p>
                      <p>Electrician: £180-280/day</p>
                      <p>Approved: £220-350/day</p>
                      <p>Supervisor: £280-420/day</p>
                    </div>
                    <div>
                      <p className="text-white">Scotland (SJIB)</p>
                      <p>Similar to regional + 5-10%</p>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3 space-y-2">
                  <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                    Project type premiums
                  </span>
                  <div className="text-[13px] text-white/85 space-y-1">
                    <div className="flex justify-between">
                      <span>Data centres</span>
                      <span className="font-mono">+20-25%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Nuclear/Power</span>
                      <span className="font-mono">+25-30%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>EV infrastructure</span>
                      <span className="font-mono">+15-20%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Smart buildings</span>
                      <span className="font-mono">+10-15%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Domestic/small commercial</span>
                      <span className="font-mono">Base</span>
                    </div>
                  </div>
                  <p className="text-[12px] text-white/55 pt-1 border-t border-white/[0.06]">
                    Overtime rates: 1.5x after 8hrs weekdays, 2x Sundays/bank holidays.
                  </p>
                </div>

                <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3 space-y-2">
                  <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                    Allowances & benefits
                  </span>
                  <div className="text-[13px] text-white/85 space-y-1.5">
                    <div>
                      <p className="text-white">Travel & accommodation</p>
                      <p>Mileage: £0.45-0.65/mile</p>
                      <p>Lodging: £35-55/night (tax-free)</p>
                      <p>Subsistence: £10-25/day</p>
                    </div>
                    <div>
                      <p className="text-white">JIB benefits package</p>
                      <p>Pension: 8% employer contribution</p>
                      <p>Annual leave: 22+ days</p>
                      <p>Sick pay: statutory + enhanced</p>
                    </div>
                  </div>
                  <p className="text-[12px] text-white/55 pt-1 border-t border-white/[0.06]">
                    Self-employed rates typically 25-40% higher to cover benefits/pension.
                  </p>
                </div>
              </div>
            </MobileAccordionContent>
          </MobileAccordionItem>

          <MobileAccordionItem value="pathway">
            <MobileAccordionTrigger className="bg-white/[0.02] border-white/[0.06]">
              Upgrade pathways
            </MobileAccordionTrigger>
            <MobileAccordionContent className="bg-white/[0.02] border-x border-b border-white/[0.06] rounded-b-lg p-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3 space-y-2">
                  <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                    Standard route
                  </span>
                  <p className="text-[13px] text-white/85 leading-relaxed">
                    Apprentice → Improver → Electrician (Gold) → Approved → Technician
                  </p>
                  <p className="text-[12px] text-white/55">
                    Typical 6-10 years to Technician depending on experience and qualifications.
                  </p>
                </div>
                <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3 space-y-2">
                  <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                    Supervisor/Manager route
                  </span>
                  <p className="text-[13px] text-white/85 leading-relaxed">
                    Approved/Technician → Chargehand → Site Supervisor → Manager
                  </p>
                  <p className="text-[12px] text-white/55">
                    Add leadership (SSSTS/SMSTS/IOSH) and project delivery experience.
                  </p>
                </div>
                <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3 space-y-2">
                  <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                    Fast-track / APL
                  </span>
                  <p className="text-[13px] text-white/85 leading-relaxed">
                    Experienced workers scheme with evidence portfolio.
                  </p>
                  <p className="text-[12px] text-white/55">
                    Recognition of prior learning can reduce time to Gold/Approved.
                  </p>
                </div>
              </div>
            </MobileAccordionContent>
          </MobileAccordionItem>

          <MobileAccordionItem value="cpd">
            <MobileAccordionTrigger className="bg-white/[0.02] border-white/[0.06]">
              CPD & renewals
            </MobileAccordionTrigger>
            <MobileAccordionContent className="bg-white/[0.02] border-x border-b border-white/[0.06] rounded-b-lg p-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3 space-y-2">
                  <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                    ECS renewal
                  </span>
                  <ul className="text-[13px] text-white/85 space-y-1">
                    <li>Renew every 3 years</li>
                    <li>Current H&S assessment</li>
                    <li>Up-to-date qualifications</li>
                  </ul>
                  <p className="text-[12px] text-white/55">
                    Digital card updates first; physical card follows by post.
                  </p>
                </div>
                <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3 space-y-2">
                  <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                    BS 7671 updates
                  </span>
                  <ul className="text-[13px] text-white/85 space-y-1">
                    <li>Current standard: BS 7671:2018 + A4:2026</li>
                    <li>CPD on changes and application</li>
                  </ul>
                  <p className="text-[12px] text-white/55">
                    Amendments typically every 2-3 years. Stay subscribed.
                  </p>
                </div>
                <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3 space-y-2">
                  <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                    Professional CPD
                  </span>
                  <ul className="text-[13px] text-white/85 space-y-1">
                    <li>Testing (2391), EV, Solar, Fire/Alarm, BMS</li>
                    <li>Scheme assessments (NICEIC/NAPIT) if contracting</li>
                  </ul>
                  <p className="text-[12px] text-white/55">
                    Recommended: 20-30 hours CPD per year logged in the CPD Tracker.
                  </p>
                </div>
              </div>
            </MobileAccordionContent>
          </MobileAccordionItem>

          <MobileAccordionItem value="evidence">
            <MobileAccordionTrigger className="bg-white/[0.02] border-white/[0.06]">
              Evidence checklist (upgrades)
            </MobileAccordionTrigger>
            <MobileAccordionContent className="bg-white/[0.02] border-x border-b border-white/[0.06] rounded-b-lg p-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-[13px] text-white/85">
                <ul className="space-y-1">
                  <li>Level 3 NVQ Diploma (2357/5357)</li>
                  <li>AM2/AM2S certificate</li>
                  <li>BS 7671:2018 + A4:2026 (2382-22)</li>
                  <li>Inspection & Testing (2391-52) for Approved/Technician</li>
                </ul>
                <ul className="space-y-1">
                  <li>Employer references/logbook evidence</li>
                  <li>ECS H&S assessment</li>
                  <li>ID and recent photo</li>
                  <li>CPD record (recommended)</li>
                </ul>
                <ul className="space-y-1">
                  <li>Evidence of design/verification (Technician)</li>
                  <li>Manufacturer training certificates (EV/Solar)</li>
                  <li>Site supervisor tickets (SSSTS/SMSTS) if applicable</li>
                </ul>
              </div>
            </MobileAccordionContent>
          </MobileAccordionItem>

          <MobileAccordionItem value="apply">
            <MobileAccordionTrigger className="bg-white/[0.02] border-white/[0.06]">
              Application process (typical)
            </MobileAccordionTrigger>
            <MobileAccordionContent className="bg-white/[0.02] border-x border-b border-white/[0.06] rounded-b-lg p-4">
              <ol className="list-decimal pl-5 space-y-2 text-[13px] text-white/85">
                <li>Confirm eligibility and gather evidence (NVQ, AM2, 18th, references)</li>
                <li>Create or log into your MyECS account and start a new application</li>
                <li>Upload documents and pay the applicable fee</li>
                <li>Book and pass the ECS Health & Safety assessment (if required)</li>
                <li>
                  Await verification; your digital ECS card updates first, physical card follows
                </li>
              </ol>
              <p className="mt-3 text-[12px] text-white/55">
                Typical timeframe: 3-10 working days depending on volume and checks. Fees vary by
                card type and renewal vs upgrade.
              </p>
            </MobileAccordionContent>
          </MobileAccordionItem>

          <MobileAccordionItem value="hs-topics">
            <MobileAccordionTrigger className="bg-white/[0.02] border-white/[0.06]">
              ECS Health & Safety test topics
            </MobileAccordionTrigger>
            <MobileAccordionContent className="bg-white/[0.02] border-x border-b border-white/[0.06] rounded-b-lg p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-[13px] text-white/85">
                <ul className="space-y-1">
                  <li>Site access, permits to work</li>
                  <li>Safe isolation and lock-off</li>
                  <li>Working at height and manual handling</li>
                  <li>Fire safety and emergency procedures</li>
                </ul>
                <ul className="space-y-1">
                  <li>Asbestos awareness & COSHH</li>
                  <li>Electrical shock risk and first aid basics</li>
                  <li>Environmental considerations</li>
                  <li>Reporting near misses and incidents</li>
                </ul>
              </div>
              <p className="mt-3 text-[12px] text-white/55">
                Pass mark typically ~85%. Focus on safe isolation, permits and emergency
                procedures.
              </p>
            </MobileAccordionContent>
          </MobileAccordionItem>

          <MobileAccordionItem value="sjib">
            <MobileAccordionTrigger className="bg-white/[0.02] border-white/[0.06]">
              SJIB equivalence (Scotland)
            </MobileAccordionTrigger>
            <MobileAccordionContent className="bg-white/[0.02] border-x border-b border-white/[0.06] rounded-b-lg p-4">
              <p className="text-[13px] text-white/85 mb-3">
                SJIB mirrors JIB grading for Scotland. Typical mappings:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3 space-y-1">
                  <p className="text-[13px] text-white">JIB Electrician ⇄ SJIB Electrician</p>
                  <p className="text-[12px] text-white/85">NVQ3 + AM2 + BS 7671</p>
                </div>
                <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3 space-y-1">
                  <p className="text-[13px] text-white">JIB Approved ⇄ SJIB Approved</p>
                  <p className="text-[12px] text-white/85">Add 2391 and experience</p>
                </div>
              </div>
              <p className="mt-3 text-[12px] text-white/55">
                Check SJIB for local rules, evidence and rates which can differ from JIB.
              </p>
            </MobileAccordionContent>
          </MobileAccordionItem>

          <MobileAccordionItem value="faqs">
            <MobileAccordionTrigger className="bg-white/[0.02] border-white/[0.06]">
              FAQs
            </MobileAccordionTrigger>
            <MobileAccordionContent className="bg-white/[0.02] border-x border-b border-white/[0.06] rounded-b-lg p-4">
              <div className="space-y-3">
                <div className="space-y-1">
                  <p className="text-[13px] text-white">Is JIB grading mandatory?</p>
                  <p className="text-[12px] text-white/70">
                    Not legally, but widely required by employers and sites for proof of
                    competence.
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-[13px] text-white">Do I need 2391 for Approved?</p>
                  <p className="text-[12px] text-white/70">
                    Yes — Inspection & Testing (2391-52) is typically required for JIB Approved
                    Electrician status.
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-[13px] text-white">What about Scotland?</p>
                  <p className="text-[12px] text-white/70">
                    Scotland follows SJIB which mirrors JIB; check SJIB for local details and rates.
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-[13px] text-white">How long does verification take?</p>
                  <p className="text-[12px] text-white/70">
                    Usually 3-10 working days once all evidence is uploaded and validated.
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-[13px] text-white">Do I need a physical card?</p>
                  <p className="text-[12px] text-white/70">
                    The digital card is available immediately after approval; physical cards are
                    posted and may take a few days.
                  </p>
                </div>
              </div>
            </MobileAccordionContent>
          </MobileAccordionItem>
        </MobileAccordion>
      </section>
    </div>
  );
};

export default JIBGradingScheme;
