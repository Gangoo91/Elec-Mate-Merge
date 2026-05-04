import { Phone, Mail, Globe } from 'lucide-react';

const SupportResourcesTab = () => {
  const emergencyContacts = [
    {
      service: 'Health & Safety Executive (HSE)',
      phone: '0300 003 1747',
      email: 'hse.enquiries@hse.gov.uk',
      website: 'www.hse.gov.uk',
      description: 'Report serious safety violations or dangerous working conditions',
      urgency: 'Emergency',
    },
    {
      service: 'ACAS (Advisory, Conciliation & Arbitration Service)',
      phone: '0300 123 1100',
      email: 'helpline@acas.org.uk',
      website: 'www.acas.org.uk',
      description: 'Free advice on workplace disputes, employment rights, and mediation',
      urgency: 'Immediate Help',
    },
    {
      service: 'National Minimum Wage Helpline',
      phone: '0300 123 1100',
      email: 'enquiries.nmw@hmrc.gov.uk',
      website: 'www.gov.uk/minimum-wage-rates',
      description: 'Report underpayment or wage violations',
      urgency: 'Priority',
    },
  ];

  const supportOrganisations = [
    {
      name: 'Education & Skills Funding Agency (ESFA)',
      contact: '0370 267 0001',
      email: 'enquiries@education.gov.uk',
      website: 'www.gov.uk/government/organisations/education-and-skills-funding-agency',
      services: [
        'Apprenticeship quality concerns',
        'Training provider complaints',
        'Funding and payment issues',
        'Off-the-job training disputes',
      ],
      description: 'Government body overseeing apprenticeship quality and funding',
    },
    {
      name: 'Citizens Advice',
      contact: '0808 223 1133',
      email: 'Contact via website',
      website: 'www.citizensadvice.org.uk',
      services: [
        'Employment rights advice',
        'Debt and financial guidance',
        'Housing and benefit support',
        'Discrimination complaints',
      ],
      description: 'Free, confidential advice on a wide range of issues',
    },
    {
      name: 'Joint Industry Board (JIB)',
      contact: '01322 661600',
      email: 'info@jib.org.uk',
      website: 'www.jib.org.uk',
      services: [
        'ECS card applications and renewals',
        'Grading and pay dispute resolution',
        'Industry standards and benchmarks',
        'Apprentice registration and support',
      ],
      description: 'Official body for the electrical contracting industry in England and Wales',
    },
    {
      name: 'JTL (Training Provider Support)',
      contact: '0844 844 5300',
      email: 'enquiries@jtltraining.com',
      website: 'www.jtltraining.com',
      services: [
        'Apprenticeship programme support',
        'Training quality issues',
        'Career guidance',
        'Employer relations',
      ],
      description: 'Major electrical apprenticeship training provider',
    },
  ];

  const electricalIndustryBodies = [
    {
      name: 'Institution of Engineering & Technology (IET)',
      contact: '01438 313 311',
      website: 'www.theiet.org',
      description: 'Professional body that publishes BS 7671 Wiring Regulations and the On-Site Guide',
      services: [
        'Wiring Regulations guidance and publications',
        'Professional registration (EngTech, IEng)',
        'Free student/apprentice membership',
        'Technical forums and networking events',
      ],
    },
    {
      name: 'NICEIC (National Inspection Council)',
      contact: '0333 015 6625',
      website: 'www.niceic.com',
      description: 'Leading certification body for the electrical contracting industry',
      services: [
        'Electrical contractor registration and assessment',
        'Technical helpline for registered contractors',
        'Training and certification courses',
        'Consumer protection scheme',
      ],
    },
    {
      name: 'Electrical Contractors\' Association (ECA)',
      contact: '020 7313 4800',
      website: 'www.eca.co.uk',
      description: 'Trade association representing electrical and technical contractors',
      services: [
        'Technical and legal advice for members',
        'Contract and specification guidance',
        'Business support and training',
        'Health and safety resources',
      ],
    },
    {
      name: 'SELECT (Scotland)',
      contact: '0131 445 5577',
      website: 'www.select.org.uk',
      description: 'Trade association for the electrical contracting industry in Scotland',
      services: [
        'Scottish apprenticeship support',
        'Technical helpline',
        'Employment law advice',
        'Health and safety guidance',
      ],
    },
  ];

  const mentalHealthSupport = [
    {
      name: 'Samaritans',
      contact: '116 123 (free, 24/7)',
      description: 'Confidential emotional support for anyone in distress. Available 24 hours a day, 365 days a year.',
    },
    {
      name: 'Mates in Mind',
      contact: 'www.matesinmind.org',
      description: 'Mental health charity specifically for the construction and related industries.',
    },
    {
      name: 'Mind',
      contact: '0300 123 3393',
      description: 'Mental health charity providing advice and support. Infoline open Mon-Fri 9am-6pm.',
    },
    {
      name: 'Andy\'s Man Club',
      contact: 'www.andysmanclub.co.uk',
      description: 'Free peer-to-peer talking groups for men. Monday evenings across the UK. No referral needed.',
    },
    {
      name: 'Lighthouse Construction Industry Charity',
      contact: '0345 605 1956 (24/7)',
      description: 'Free confidential support including financial, emotional, and wellbeing support for construction workers.',
    },
  ];

  const tradeUnions = [
    {
      name: 'Unite the Union',
      contact: '020 7611 2500',
      website: 'www.unitetheunion.org',
      sectors: ['Construction', 'Electrical', 'Manufacturing'],
      benefits: [
        'Legal representation',
        'Workplace advocacy',
        'Training and development',
        'Professional indemnity insurance',
      ],
    },
    {
      name: 'GMB Union',
      contact: '020 7391 6700',
      website: 'www.gmb.org.uk',
      sectors: ['Construction', 'Energy', 'Manufacturing'],
      benefits: [
        'Employment protection',
        'Collective bargaining',
        'Health and safety support',
        'Career development',
      ],
    },
    {
      name: 'UCATT (Unite Construction)',
      contact: '020 7611 2500',
      website: 'www.unitetheunion.org/construction',
      sectors: ['Construction', 'Building trades'],
      benefits: [
        'Site safety representation',
        'Skills training support',
        'Wage negotiation',
        'Accident claims support',
      ],
    },
  ];

  const onlineResources = [
    {
      platform: 'Find an Apprenticeship (GOV.UK)',
      website: 'www.gov.uk/apply-apprenticeship',
      description: 'Official government service to search and apply for apprenticeships',
    },
    {
      platform: 'GOV.UK Apprenticeships',
      website: 'www.gov.uk/topic/further-education-skills/apprenticeships',
      description: 'Official government information on apprenticeship rights and processes',
    },
    {
      platform: 'Ofsted Reports',
      website: 'www.gov.uk/government/organisations/ofsted',
      description: "Check your training provider's inspection reports and ratings",
    },
    {
      platform: 'ESFA Complaints',
      website: 'www.gov.uk/government/organisations/education-and-skills-funding-agency',
      description: 'Raise formal complaints about apprenticeship quality or funding issues',
    },
  ];

  const escalationSteps = [
    { step: 1, title: 'Raise it informally', desc: 'Talk to your supervisor, mentor, or line manager. Many issues are resolved at this stage.' },
    { step: 2, title: 'Put it in writing', desc: 'Send an email or letter to your employer documenting the issue. This creates a paper trail.' },
    { step: 3, title: 'Involve your training provider', desc: 'Your assessor or training provider can mediate between you and your employer.' },
    { step: 4, title: 'Raise a formal grievance', desc: 'Use your employer\'s formal grievance procedure. They must investigate and respond in writing.' },
    { step: 5, title: 'Contact ACAS', desc: 'Free, impartial advice and mediation. Call 0300 123 1100 (Mon-Fri 8am-6pm).' },
    { step: 6, title: 'Report to the relevant authority', desc: 'HSE for safety, HMRC for wages, ESFA for training issues. These bodies have enforcement powers.' },
    { step: 7, title: 'Employment Tribunal', desc: 'Last resort for serious issues (unfair dismissal, discrimination). Must apply within 3 months via ACAS Early Conciliation first.' },
  ];

  const whenToSeekHelp = [
    {
      situation: 'Your employer denies you off-the-job training time',
      severity: 'High Priority',
      firstSteps:
        'Document all instances, speak to training provider, contact ESFA if not resolved',
    },
    {
      situation: 'Unsafe working conditions or inadequate safety training',
      severity: 'Emergency',
      firstSteps: 'Refuse unsafe work, report to HSE immediately, document everything',
    },
    {
      situation: 'Being paid below minimum wage rates',
      severity: 'High Priority',
      firstSteps: 'Keep detailed pay records, contact HMRC National Minimum Wage team',
    },
    {
      situation: 'Discrimination, bullying, or harassment',
      severity: 'High Priority',
      firstSteps: 'Report to HR/management, contact ACAS, consider union support',
    },
    {
      situation: 'Employer wants to end apprenticeship unfairly',
      severity: 'Urgent',
      firstSteps: 'Contact training provider immediately, seek ACAS advice, review contract terms',
    },
    {
      situation: 'Being asked to work live without proper procedures',
      severity: 'Emergency',
      firstSteps: 'Refuse the task immediately. Report to HSE. This is a criminal offence under the Electricity at Work Regulations.',
    },
    {
      situation: 'Mental health struggles affecting your work or training',
      severity: 'Important',
      firstSteps: 'Talk to someone you trust. Contact Samaritans (116 123) or Lighthouse Charity (0345 605 1956). Your training provider can arrange support.',
    },
    {
      situation: 'Your training provider is not delivering quality training',
      severity: 'High Priority',
      firstSteps: 'Raise with your provider first. If unresolved, check their Ofsted rating and report to ESFA.',
    },
  ];

  const Section = ({
    eyebrow,
    children,
    accent = 'neutral',
  }: {
    eyebrow: string;
    children: React.ReactNode;
    accent?: 'neutral' | 'red';
  }) => (
    <div
      className={`${
        accent === 'red'
          ? 'rounded-xl border border-red-500/30 bg-red-500/[0.04]'
          : 'rounded-xl border border-white/[0.06] bg-white/[0.02]'
      } p-4 sm:p-5 space-y-3`}
    >
      <span
        className={`text-[10px] font-medium uppercase tracking-[0.18em] ${
          accent === 'red' ? 'text-red-300' : 'text-white/55'
        }`}
      >
        {eyebrow}
      </span>
      {children}
    </div>
  );

  const ContactLine = ({ icon, text }: { icon: React.ReactNode; text: string }) => (
    <div className="flex items-center gap-1 text-[12px] text-white/85">
      {icon}
      <span className="truncate">{text}</span>
    </div>
  );

  return (
    <div className="space-y-6">
      <Section eyebrow="Emergency & priority contacts" accent="red">
        <div className="space-y-3">
          {emergencyContacts.map((contact, index) => (
            <div
              key={index}
              className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 space-y-2"
            >
              <div className="flex items-start justify-between gap-2">
                <h4 className="text-[14px] font-semibold text-white">{contact.service}</h4>
                <span className="text-[12px] text-red-300 px-2 py-0.5 rounded-md border border-red-500/30 bg-red-500/[0.04] whitespace-nowrap">
                  {contact.urgency}
                </span>
              </div>
              <p className="text-[14px] text-white/85 leading-relaxed">{contact.description}</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                <ContactLine icon={<Phone className="h-3 w-3" />} text={contact.phone} />
                <ContactLine icon={<Mail className="h-3 w-3" />} text={contact.email} />
                <ContactLine icon={<Globe className="h-3 w-3" />} text={contact.website} />
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="Support organisations">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {supportOrganisations.map((org, index) => (
            <div
              key={index}
              className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 space-y-2"
            >
              <h4 className="text-[14px] font-semibold text-white">{org.name}</h4>
              <p className="text-[13px] text-white/85 leading-relaxed">{org.description}</p>
              <div className="space-y-1">
                <ContactLine icon={<Phone className="h-3 w-3" />} text={org.contact} />
                <ContactLine icon={<Globe className="h-3 w-3" />} text={org.website} />
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                  Services
                </span>
                <ul className="space-y-1">
                  {org.services.map((service, serviceIndex) => (
                    <li
                      key={serviceIndex}
                      className="text-[13px] text-white/85 leading-relaxed flex items-start gap-2"
                    >
                      <span className="w-1 h-1 rounded-full bg-white/55 mt-2 flex-shrink-0" />
                      <span>{service}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="Trade union support">
        <div className="space-y-3">
          {tradeUnions.map((union, index) => (
            <div
              key={index}
              className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 space-y-3"
            >
              <div className="flex items-start justify-between gap-2 flex-wrap">
                <h4 className="text-[14px] font-semibold text-white">{union.name}</h4>
                <div className="flex gap-1.5 flex-wrap">
                  {union.sectors.map((sector, sectorIndex) => (
                    <span
                      key={sectorIndex}
                      className="text-[12px] text-white/85 px-2 py-0.5 rounded-md border border-white/10 bg-white/[0.03]"
                    >
                      {sector}
                    </span>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <ContactLine icon={<Phone className="h-3 w-3" />} text={union.contact} />
                  <ContactLine icon={<Globe className="h-3 w-3" />} text={union.website} />
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                    Member benefits
                  </span>
                  <ul className="space-y-1">
                    {union.benefits.map((benefit, benefitIndex) => (
                      <li
                        key={benefitIndex}
                        className="text-[13px] text-white/85 leading-relaxed flex items-start gap-2"
                      >
                        <span className="w-1 h-1 rounded-full bg-white/55 mt-2 flex-shrink-0" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="Electrical industry bodies">
        <p className="text-[14px] text-white/85 leading-relaxed">
          These organisations are specific to the electrical industry and can provide specialist
          technical guidance, qualifications support, and career advice.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {electricalIndustryBodies.map((org, index) => (
            <div
              key={index}
              className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 space-y-2"
            >
              <h4 className="text-[14px] font-semibold text-white">{org.name}</h4>
              <p className="text-[13px] text-white/85 leading-relaxed">{org.description}</p>
              <div className="space-y-1">
                <ContactLine icon={<Phone className="h-3 w-3" />} text={org.contact} />
                <ContactLine icon={<Globe className="h-3 w-3" />} text={org.website} />
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                  Key services
                </span>
                <ul className="space-y-1">
                  {org.services.map((service, serviceIndex) => (
                    <li
                      key={serviceIndex}
                      className="text-[13px] text-white/85 leading-relaxed flex items-start gap-2"
                    >
                      <span className="w-1 h-1 rounded-full bg-white/55 mt-2 flex-shrink-0" />
                      <span>{service}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="Mental health & wellbeing support">
        <p className="text-[14px] text-white/85 leading-relaxed">
          Construction and electrical work can be physically and mentally demanding. These
          organisations offer free, confidential support specifically for people in the trades.
        </p>
        <div className="space-y-3">
          {mentalHealthSupport.map((org, index) => (
            <div
              key={index}
              className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 space-y-1"
            >
              <div className="flex items-start justify-between gap-2">
                <h4 className="text-[14px] font-semibold text-white">{org.name}</h4>
                <span className="text-[12px] text-elec-yellow px-2 py-0.5 rounded-md border border-elec-yellow/20 bg-elec-yellow/[0.04] whitespace-nowrap">
                  {org.contact}
                </span>
              </div>
              <p className="text-[14px] text-white/85 leading-relaxed">{org.description}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="Online resources & tools">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {onlineResources.map((resource, index) => (
            <div
              key={index}
              className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3 space-y-1"
            >
              <h4 className="text-[14px] font-semibold text-white">{resource.platform}</h4>
              <p className="text-[13px] text-white/85 leading-relaxed">{resource.description}</p>
              <ContactLine icon={<Globe className="h-3 w-3" />} text={resource.website} />
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="How to escalate a problem">
        <p className="text-[14px] text-white/85 leading-relaxed">
          If something is wrong at work or with your training, follow these steps in order. Most
          issues are resolved at the first two stages.
        </p>
        <div className="space-y-3">
          {escalationSteps.map((item) => (
            <div key={item.step} className="flex gap-3 items-start">
              <span className="flex-shrink-0 w-8 h-8 rounded-full border border-white/15 bg-white/[0.03] flex items-center justify-center text-[13px] font-mono text-white">
                {item.step}
              </span>
              <div className="flex-1 min-w-0">
                <h4 className="text-[14px] font-semibold text-white">{item.title}</h4>
                <p className="text-[13px] text-white/85 leading-relaxed mt-1">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="rounded-xl border border-elec-yellow/20 bg-elec-yellow/[0.04] p-3 space-y-1">
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-elec-yellow/85">
            Important
          </span>
          <p className="text-[13px] text-white/85 leading-relaxed">
            Keep written records at every stage — emails, letters, dates, and names. If your issue
            reaches ACAS or a Tribunal, evidence is essential.
          </p>
        </div>
      </Section>

      <Section eyebrow="When to seek help">
        <div className="space-y-3">
          {whenToSeekHelp.map((scenario, index) => (
            <div
              key={index}
              className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 space-y-1"
            >
              <div className="flex items-start justify-between gap-2 flex-wrap">
                <h4 className="text-[14px] font-semibold text-white flex-1">
                  {scenario.situation}
                </h4>
                <span className="text-[12px] text-white/85 px-2 py-0.5 rounded-md border border-white/10 bg-white/[0.03] whitespace-nowrap">
                  {scenario.severity}
                </span>
              </div>
              <p className="text-[14px] text-white/85 leading-relaxed">
                <span className="font-semibold">First steps:</span> {scenario.firstSteps}
              </p>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
};

export default SupportResourcesTab;
