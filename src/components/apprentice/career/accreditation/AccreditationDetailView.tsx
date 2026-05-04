import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, ExternalLink, Star } from 'lucide-react';
import { openExternalUrl } from '@/utils/open-external-url';
import { AccreditationOption } from './enhancedAccreditationData';

interface AccreditationDetailViewProps {
  accreditation: AccreditationOption;
  onBack: () => void;
}

const Section = ({ eyebrow, children }: { eyebrow: string; children: React.ReactNode }) => (
  <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-3">
    <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
      {eyebrow}
    </span>
    <div>{children}</div>
  </div>
);

const Pill = ({ children }: { children: React.ReactNode }) => (
  <span className="text-[12px] text-white/85 px-2 py-0.5 rounded-md border border-white/10 bg-white/[0.03]">
    {children}
  </span>
);

const Bullets = ({ items }: { items: string[] }) => (
  <ul className="space-y-1.5">
    {items.map((item, idx) => (
      <li
        key={idx}
        className="text-[14px] text-white/85 leading-relaxed flex items-start gap-2"
      >
        <span className="w-1 h-1 rounded-full bg-white/55 mt-2 flex-shrink-0" />
        <span>{item}</span>
      </li>
    ))}
  </ul>
);

const AccreditationDetailView = ({ accreditation, onBack }: AccreditationDetailViewProps) => {
  return (
    <div className="space-y-5 animate-fade-in">
      {/* Header */}
      <Button
        variant="ghost"
        onClick={onBack}
        className="text-white hover:text-white hover:bg-white/[0.05] -ml-2 h-11 touch-manipulation"
      >
        <ArrowLeft className="mr-2 h-5 w-5" />
        Back to accreditations
      </Button>

      <div className="space-y-3">
        <div className="flex flex-wrap items-baseline gap-3 text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          <span>{accreditation.level}</span>
          <span className="text-white/25">·</span>
          <span>{accreditation.category}</span>
          {accreditation.onlineAvailable && (
            <>
              <span className="text-white/25">·</span>
              <span>Online available</span>
            </>
          )}
        </div>
        <h2 className="text-[24px] sm:text-[28px] font-bold tracking-tight text-white leading-tight">
          {accreditation.title}
        </h2>
        <p className="text-[14px] text-white/70">{accreditation.provider}</p>
        <p className="text-[14px] text-white/85 leading-relaxed">{accreditation.description}</p>
      </div>

      {/* Quick info grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: 'Duration', value: accreditation.duration },
          { label: 'Investment', value: accreditation.cost },
          {
            label: 'Locations',
            value:
              accreditation.locations.length > 1 ? 'Multiple' : accreditation.locations[0],
          },
          { label: 'Popularity', value: `${accreditation.popularity}%` },
        ].map((item) => (
          <div
            key={item.label}
            className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3 space-y-1"
          >
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
              {item.label}
            </span>
            <div className="text-[14px] text-white/85">{item.value}</div>
          </div>
        ))}
      </div>

      <Section eyebrow="Career impact">
        <p className="text-[14px] text-white/85 leading-relaxed">{accreditation.careerImpact}</p>
      </Section>

      {/* Tabs */}
      <Tabs defaultValue="benefits" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 gap-1 bg-white/[0.02] border border-white/[0.06] p-1 rounded-xl">
          <TabsTrigger
            value="benefits"
            className="text-[12px] data-[state=active]:bg-elec-yellow data-[state=active]:text-black"
          >
            Benefits
          </TabsTrigger>
          <TabsTrigger
            value="requirements"
            className="text-[12px] data-[state=active]:bg-elec-yellow data-[state=active]:text-black"
          >
            Requirements
          </TabsTrigger>
          <TabsTrigger
            value="process"
            className="text-[12px] data-[state=active]:bg-elec-yellow data-[state=active]:text-black"
          >
            Process
          </TabsTrigger>
          <TabsTrigger
            value="getting-started"
            className="text-[12px] data-[state=active]:bg-elec-yellow data-[state=active]:text-black"
          >
            Get started
          </TabsTrigger>
          <TabsTrigger
            value="details"
            className="text-[12px] data-[state=active]:bg-elec-yellow data-[state=active]:text-black"
          >
            Details
          </TabsTrigger>
        </TabsList>

        <TabsContent value="benefits" className="space-y-4">
          <Section eyebrow="Professional recognition">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <h5 className="text-[14px] text-white mb-1">Industry standing</h5>
                <p className="text-[14px] text-white/85 leading-relaxed">
                  Gain credibility within the electrical industry, setting you apart from non-accredited
                  professionals.
                </p>
              </div>
              <div>
                <h5 className="text-[14px] text-white mb-1">Consumer trust</h5>
                <p className="text-[14px] text-white/85 leading-relaxed">
                  Customers actively seek accredited professionals, providing immediate confidence in
                  your services.
                </p>
              </div>
            </div>
          </Section>

          <Section eyebrow="Business advantages">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <h5 className="text-[14px] text-white mb-1">Pricing</h5>
                <p className="text-[14px] text-white/85 leading-relaxed">
                  Many accredited professionals are able to charge a premium relative to non-accredited
                  competitors.
                </p>
              </div>
              <div>
                <h5 className="text-[14px] text-white mb-1">Marketing</h5>
                <p className="text-[14px] text-white/85 leading-relaxed">
                  Use accreditation logos and marketing materials to win contracts and build trust with
                  potential clients.
                </p>
              </div>
              <div>
                <h5 className="text-[14px] text-white mb-1">Insurance</h5>
                <p className="text-[14px] text-white/85 leading-relaxed">
                  Access reduced premiums through accreditation body partnerships.
                </p>
              </div>
            </div>
          </Section>

          <Section eyebrow="Professional support">
            <Bullets items={accreditation.benefits} />
          </Section>

          <Section eyebrow="Return on investment">
            <p className="text-[14px] text-white/85 leading-relaxed mb-2">
              Most professionals recoup their annual membership costs within the first few contracts
              through:
            </p>
            <Bullets
              items={[
                'Premium rate justification',
                'Increased customer confidence',
                'Access to larger contracts',
                'Insurance savings',
              ]}
            />
          </Section>
        </TabsContent>

        <TabsContent value="requirements" className="space-y-4">
          <Section eyebrow="Minimum qualifications">
            <Bullets items={accreditation.requirements} />
          </Section>

          <Section eyebrow="Alternative pathways">
            <Bullets
              items={[
                'Equivalent overseas qualifications may be accepted',
                'Apprenticeship completion with appropriate level',
                'Combination of experience and portfolio assessment',
                'Recognition of Prior Learning (RPL) available',
              ]}
            />
          </Section>

          <Section eyebrow="Experience requirements">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <h5 className="text-[14px] text-white mb-1">Years required</h5>
                <p className="text-[14px] text-white/85 leading-relaxed">
                  Typically 2-4 years post-qualification experience in installation, testing, or
                  design.
                </p>
              </div>
              <div>
                <h5 className="text-[14px] text-white mb-1">Type of work</h5>
                <p className="text-[14px] text-white/85 leading-relaxed">
                  Domestic, commercial, or industrial work with evidence of competence across multiple
                  areas.
                </p>
              </div>
              <div>
                <h5 className="text-[14px] text-white mb-1">Portfolio</h5>
                <p className="text-[14px] text-white/85 leading-relaxed">
                  Documented evidence of completed projects, installations, and ongoing development.
                </p>
              </div>
            </div>
          </Section>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Section eyebrow="Core skills required">
              <Bullets
                items={[
                  'Electrical installation to BS 7671 standards',
                  'Testing and inspection procedures',
                  'Fault diagnosis and remedial work',
                  'Understanding of Building Regulations',
                  'Health and safety compliance',
                ]}
              />
            </Section>
            <Section eyebrow="Assessment areas">
              <Bullets
                items={[
                  'Practical installation assessment',
                  'Testing and inspection competence',
                  'Knowledge of current regulations',
                  'Understanding of safety procedures',
                  'Business and customer service skills',
                ]}
              />
            </Section>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Section eyebrow="Insurance and legal">
              <Bullets
                items={[
                  'Public liability insurance (minimum £2m)',
                  'Professional indemnity cover',
                  'Valid business registration',
                  'Compliance with relevant legislation',
                ]}
              />
            </Section>
            <Section eyebrow="Documentation">
              <Bullets
                items={[
                  'Qualification certificates',
                  'Work portfolio and references',
                  'CPD records and training evidence',
                  'Character references',
                ]}
              />
            </Section>
          </div>

          {accreditation.prerequisites && accreditation.prerequisites.length > 0 && (
            <div className="rounded-xl border border-red-500/30 bg-red-500/[0.04] p-4 sm:p-5 space-y-2">
              <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-red-300">
                Critical prerequisites
              </span>
              <ul className="space-y-1.5">
                {accreditation.prerequisites.map((p, idx) => (
                  <li key={idx} className="text-[14px] text-white/85 leading-relaxed">
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </TabsContent>

        <TabsContent value="process" className="space-y-4">
          <Section eyebrow="Phase 1: Preparation (2-4 weeks)">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <h5 className="text-[14px] text-white mb-1">Self-assessment</h5>
                <Bullets
                  items={[
                    'Review qualification requirements against your certificates',
                    'Assess work experience against competency standards',
                    'Check insurance coverage and business documentation',
                    'Evaluate readiness for technical assessment',
                  ]}
                />
              </div>
              <div>
                <h5 className="text-[14px] text-white mb-1">Document gathering</h5>
                <Bullets
                  items={[
                    'Collect all qualification certificates',
                    'Prepare work portfolio with photos and descriptions',
                    'Obtain character and professional references',
                    'Gather insurance certificates and business documents',
                  ]}
                />
              </div>
            </div>
          </Section>

          <Section eyebrow="Phase 2: Application (1-2 weeks)">
            <div className="space-y-2">
              {accreditation.nextSteps.map((step, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 text-[14px] text-white/85 leading-relaxed"
                >
                  <span className="flex-shrink-0 w-6 h-6 rounded-md border border-white/10 bg-white/[0.03] flex items-center justify-center text-[12px] text-white/85 font-mono">
                    {idx + 1}
                  </span>
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </Section>

          <Section eyebrow="Phase 3: Assessment (2-6 weeks)">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <h5 className="text-[14px] text-white mb-1">Technical assessment</h5>
                <Bullets
                  items={[
                    'On-site practical assessment',
                    'Review of work portfolio',
                    'Testing and inspection demonstration',
                    'Knowledge interview',
                  ]}
                />
              </div>
              <div>
                <h5 className="text-[14px] text-white mb-1">What to expect</h5>
                <Bullets
                  items={[
                    '2-4 hour assessment duration',
                    'Friendly, supportive assessor',
                    'Real-world scenarios',
                    'Opportunity to demonstrate skills',
                  ]}
                />
              </div>
              <div>
                <h5 className="text-[14px] text-white mb-1">Common challenges</h5>
                <Bullets
                  items={[
                    'Nervousness affecting performance',
                    'Incomplete documentation',
                    'Outdated regulation knowledge',
                    'Limited testing experience',
                  ]}
                />
              </div>
            </div>
          </Section>

          <Section eyebrow="Phase 4: Approval and setup (1-2 weeks)">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <h5 className="text-[14px] text-white mb-1">After approval</h5>
                <Bullets
                  items={[
                    'Receive accreditation certificate and materials',
                    'Set up online account and access to resources',
                    'Download marketing materials and logos',
                    'Schedule ongoing assessment dates',
                  ]}
                />
              </div>
              <div>
                <h5 className="text-[14px] text-white mb-1">Getting started</h5>
                <Bullets
                  items={[
                    'Update business materials with accreditation',
                    'Contact existing clients about new status',
                    'Register for CPD and training events',
                    'Begin building regulatory compliance history',
                  ]}
                />
              </div>
            </div>
          </Section>

          <Section eyebrow="Total timeline">
            <p className="text-[14px] text-white/85 leading-relaxed">
              Approximately 6-12 weeks from start to finish, broken down across the four phases above.
            </p>
          </Section>
        </TabsContent>

        <TabsContent value="getting-started" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Section eyebrow="Ready to apply">
              <Bullets
                items={[
                  'Hold relevant electrical qualifications',
                  'Have 2+ years post-qualification experience',
                  'Current public liability insurance',
                  'Portfolio of completed electrical work',
                  'Up-to-date with BS 7671:2018+A4:2026 regulations',
                ]}
              />
            </Section>
            <Section eyebrow="Need preparation">
              <Bullets
                items={[
                  'Missing key qualifications',
                  'Limited electrical experience',
                  'No insurance or business setup',
                  'Outdated regulation knowledge',
                  'Insufficient work portfolio',
                ]}
              />
            </Section>
          </div>

          <Section eyebrow="Months 1-2: Foundation building">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <h5 className="text-[14px] text-white mb-1">Qualifications</h5>
                <Bullets
                  items={[
                    'Complete any missing electrical qualifications',
                    'Update BS 7671:2018+A4:2026 certification',
                    'Consider additional testing qualifications',
                  ]}
                />
              </div>
              <div>
                <h5 className="text-[14px] text-white mb-1">Business setup</h5>
                <Bullets
                  items={[
                    'Arrange appropriate insurance coverage',
                    'Register business if not already done',
                    'Set up basic business documentation',
                  ]}
                />
              </div>
            </div>
          </Section>

          <Section eyebrow="Months 3-4: Experience and portfolio">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <h5 className="text-[14px] text-white mb-1">Gain experience</h5>
                <Bullets
                  items={[
                    'Focus on diverse electrical projects',
                    'Develop testing and inspection skills',
                    'Work on different types of installations',
                  ]}
                />
              </div>
              <div>
                <h5 className="text-[14px] text-white mb-1">Build portfolio</h5>
                <Bullets
                  items={[
                    'Document completed projects with photos',
                    'Collect client testimonials',
                    'Gather work certificates and references',
                  ]}
                />
              </div>
            </div>
          </Section>

          <Section eyebrow="Months 5-6: Final preparation">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <h5 className="text-[14px] text-white mb-1">Knowledge review</h5>
                <Bullets
                  items={[
                    'Refresh understanding of current regulations',
                    'Practice testing and inspection procedures',
                    'Review certification requirements',
                  ]}
                />
              </div>
              <div>
                <h5 className="text-[14px] text-white mb-1">Application ready</h5>
                <Bullets
                  items={[
                    'Complete all required documentation',
                    'Schedule assessment appointment',
                    'Prepare for technical evaluation',
                  ]}
                />
              </div>
            </div>
          </Section>

          <Section eyebrow="Cost overview">
            <p className="text-[14px] text-white/85 leading-relaxed">
              Initial investment includes the application fee ({accreditation.cost.split(' ')[0]}),
              an assessment fee, and documentation costs. Most professionals see a return through
              higher rates and reduced insurance premiums over the first year.
            </p>
          </Section>

          <Section eyebrow="Avoid these common mistakes">
            <Bullets
              items={[
                'Rushing the application — take time to prepare properly',
                'Incomplete documentation — gather all required evidence',
                'Outdated knowledge — update regulation understanding',
                'Insufficient experience — build a diverse work portfolio',
                'Poor preparation for assessment — practice and review',
                'Inadequate insurance — ensure proper coverage',
              ]}
            />
          </Section>
        </TabsContent>

        <TabsContent value="details" className="space-y-4">
          <Section eyebrow="Industry recognition and standing">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <h5 className="text-[14px] text-white mb-1">Market recognition</h5>
                <p className="text-[14px] text-white/85 leading-relaxed">
                  Recognised by {accreditation.popularity}% of UK electrical professionals and trusted
                  by major contractors nationwide.
                </p>
              </div>
              <div>
                <h5 className="text-[14px] text-white mb-1">Consumer awareness</h5>
                <p className="text-[14px] text-white/85 leading-relaxed">
                  Promoted through government and industry channels.
                </p>
              </div>
              <div>
                <h5 className="text-[14px] text-white mb-1">Regulatory standing</h5>
                <p className="text-[14px] text-white/85 leading-relaxed">
                  Recognised for Building Regulations compliance and notification rights where
                  applicable.
                </p>
              </div>
            </div>
          </Section>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Section eyebrow="Career progression">
              <Bullets
                items={[
                  'Progress to senior contractor status',
                  'Develop specialist expertise areas',
                  'Become approved instructor or assessor',
                  'Expand into related electrical disciplines',
                  'Consider professional engineering registration',
                ]}
              />
            </Section>
            <Section eyebrow="Earning potential">
              <Bullets
                items={[
                  'Premium pricing on accredited work',
                  'Access to commercial contracts',
                  'Insurance savings',
                  'Long-term career value',
                  'Business expansion opportunities',
                ]}
              />
            </Section>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Section eyebrow="Annual requirements">
              <Bullets
                items={[
                  `Renewal fee: ${accreditation.cost}`,
                  'Annual assessment or surveillance visit',
                  'CPD evidence: 20-30 hours annually',
                  'Insurance maintenance and updates',
                  'Regulation knowledge updates',
                ]}
              />
            </Section>
            <Section eyebrow="Time investment">
              <Bullets
                items={[
                  'Assessment preparation: 2-4 hours monthly',
                  'CPD activities: 2-3 hours monthly',
                  'Documentation updates: 1 hour monthly',
                  'Total commitment: 5-8 hours monthly',
                ]}
              />
            </Section>
          </div>

          <Section eyebrow="Accreditation specifications">
            <div className="space-y-2 text-[14px] text-white/85 leading-relaxed">
              <div>
                <span className="text-white/55">Accrediting body: </span>
                {accreditation.accreditationBody}
              </div>
              <div>
                <span className="text-white/55">Coverage areas: </span>
                {accreditation.locations.join(', ')}
              </div>
              <div>
                <span className="text-white/55">Difficulty: </span>
                {accreditation.difficulty} — suitable for experienced professionals
              </div>
              {accreditation.renewalPeriod && (
                <div>
                  <span className="text-white/55">Renewal: </span>
                  {accreditation.renewalPeriod}
                </div>
              )}
            </div>
          </Section>
        </TabsContent>
      </Tabs>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3">
        {accreditation.website !== 'Various providers' && (
          <Button
            className="h-11 bg-elec-yellow text-black hover:bg-elec-yellow/90 touch-manipulation"
            onClick={() => openExternalUrl(accreditation.website)}
          >
            <ExternalLink className="mr-2 h-4 w-4" />
            Visit provider website
          </Button>
        )}
        <Button
          variant="outline"
          className="h-11 border-white/10 bg-white/[0.03] text-white hover:bg-white/[0.06] touch-manipulation"
        >
          <Star className="mr-2 h-4 w-4" />
          Save to favourites
        </Button>
      </div>
    </div>
  );
};

export default AccreditationDetailView;
