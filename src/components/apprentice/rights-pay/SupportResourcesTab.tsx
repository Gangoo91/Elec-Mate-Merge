import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Phone,
  Mail,
  Globe,
  MessageCircle,
  Shield,
  Users,
  FileText,
  AlertTriangle,
} from 'lucide-react';

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

  return (
    <div className="space-y-6">
      <Card className="border-red-500/30 bg-red-500/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-400">
            <AlertTriangle className="h-5 w-5" />
            Emergency & Priority Contacts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {emergencyContacts.map((contact, index) => (
              <div key={index} className="border border-red-500/20 rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-medium text-red-300">{contact.service}</h4>
                  <Badge className="bg-red-500/20 text-red-400 text-xs">{contact.urgency}</Badge>
                </div>
                <p className="text-sm text-white mb-3">{contact.description}</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs">
                  <div className="flex items-center gap-1">
                    <Phone className="h-3 w-3" />
                    <span>{contact.phone}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Mail className="h-3 w-3" />
                    <span className="truncate">{contact.email}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Globe className="h-3 w-3" />
                    <span className="truncate">{contact.website}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-blue-500/30 bg-blue-500/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-400">
            <Shield className="h-5 w-5" />
            Support Organisations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {supportOrganisations.map((org, index) => (
              <div key={index} className="border border-blue-500/20 rounded-lg p-4">
                <h4 className="font-medium text-blue-300 mb-2">{org.name}</h4>
                <p className="text-xs text-white mb-3">{org.description}</p>

                <div className="space-y-1 mb-3">
                  <div className="flex items-center gap-1 text-xs">
                    <Phone className="h-3 w-3" />
                    <span>{org.contact}</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs">
                    <Globe className="h-3 w-3" />
                    <span className="truncate">{org.website}</span>
                  </div>
                </div>

                <div>
                  <h5 className="text-xs font-medium text-blue-300 mb-1">Services:</h5>
                  <ul className="text-xs text-white space-y-1">
                    {org.services.map((service, serviceIndex) => (
                      <li key={serviceIndex}>• {service}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-green-500/30 bg-green-500/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-400">
            <Users className="h-5 w-5" />
            Trade Union Support
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {tradeUnions.map((union, index) => (
              <div key={index} className="border border-green-500/20 rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-medium text-green-300">{union.name}</h4>
                  <div className="flex gap-1">
                    {union.sectors.map((sector, sectorIndex) => (
                      <Badge key={sectorIndex} className="bg-green-500/20 text-green-400 text-xs">
                        {sector}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <div className="flex items-center gap-1 text-xs mb-1">
                      <Phone className="h-3 w-3" />
                      <span>{union.contact}</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs">
                      <Globe className="h-3 w-3" />
                      <span className="truncate">{union.website}</span>
                    </div>
                  </div>

                  <div>
                    <h5 className="text-xs font-medium text-green-300 mb-1">Member Benefits:</h5>
                    <ul className="text-xs text-white space-y-1">
                      {union.benefits.map((benefit, benefitIndex) => (
                        <li key={benefitIndex}>• {benefit}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Electrical Industry Bodies */}
      <Card className="border-elec-yellow/30 bg-elec-yellow/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-elec-yellow">
            <FileText className="h-5 w-5" />
            Electrical Industry Bodies
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-white mb-4">
            These organisations are specific to the electrical industry and can provide specialist
            technical guidance, qualifications support, and career advice.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {electricalIndustryBodies.map((org, index) => (
              <div key={index} className="border border-elec-yellow/20 rounded-lg p-4">
                <h4 className="font-medium text-elec-yellow mb-2">{org.name}</h4>
                <p className="text-xs text-white mb-3">{org.description}</p>
                <div className="space-y-1 mb-3">
                  <div className="flex items-center gap-1 text-xs">
                    <Phone className="h-3 w-3" />
                    <span>{org.contact}</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs">
                    <Globe className="h-3 w-3" />
                    <span className="truncate">{org.website}</span>
                  </div>
                </div>
                <div>
                  <h5 className="text-xs font-medium text-elec-yellow mb-1">Key Services:</h5>
                  <ul className="text-xs text-white space-y-1">
                    {org.services.map((service, serviceIndex) => (
                      <li key={serviceIndex}>• {service}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Mental Health Support */}
      <Card className="border-green-500/30 bg-green-500/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-400">
            <MessageCircle className="h-5 w-5" />
            Mental Health & Wellbeing Support
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-white mb-4">
            Construction and electrical work can be physically and mentally demanding. These organisations
            offer free, confidential support specifically for people in the trades.
          </p>
          <div className="space-y-3">
            {mentalHealthSupport.map((org, index) => (
              <div key={index} className="border border-green-500/20 rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-medium text-green-300">{org.name}</h4>
                  <Badge className="bg-green-500/20 text-green-400 text-xs ml-2 flex-shrink-0">
                    {org.contact}
                  </Badge>
                </div>
                <p className="text-sm text-white">{org.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-purple-500/30 bg-purple-500/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-400">
            <Globe className="h-5 w-5" />
            Online Resources & Tools
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {onlineResources.map((resource, index) => (
              <div key={index} className="border border-purple-500/20 rounded-lg p-3">
                <h4 className="font-medium text-purple-300 text-sm mb-1">{resource.platform}</h4>
                <p className="text-xs text-white mb-2">{resource.description}</p>
                <div className="flex items-center gap-1 text-xs text-white">
                  <Globe className="h-3 w-3" />
                  <span className="truncate">{resource.website}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Escalation Steps */}
      <Card className="border-orange-500/30 bg-orange-500/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-orange-400">
            <AlertTriangle className="h-5 w-5" />
            How to Escalate a Problem
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-white mb-4">
            If something is wrong at work or with your training, follow these steps in order.
            Most issues are resolved at the first two stages.
          </p>
          <div className="space-y-3">
            {escalationSteps.map((item) => (
              <div key={item.step} className="flex gap-3 items-start">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-orange-500/20 border border-orange-500/30 flex items-center justify-center">
                  <span className="text-orange-400 font-bold text-sm">{item.step}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-orange-300 text-sm">{item.title}</h4>
                  <p className="text-xs text-white mt-1">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 bg-orange-500/10 border border-orange-500/20 rounded-lg p-3">
            <p className="text-xs text-white">
              <strong className="text-orange-300">Important:</strong> Keep written records at every stage — emails, letters,
              dates, and names. If your issue reaches ACAS or a Tribunal, evidence is essential.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="border-yellow-500/30 bg-yellow-500/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-yellow-400">
            <MessageCircle className="h-5 w-5" />
            When to Seek Help - Action Guide
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {whenToSeekHelp.map((scenario, index) => (
              <div key={index} className="border border-yellow-500/20 rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-medium text-yellow-300 flex-1">{scenario.situation}</h4>
                  <Badge className="bg-yellow-500/20 text-yellow-400 text-xs ml-2">
                    {scenario.severity}
                  </Badge>
                </div>
                <p className="text-sm text-white">
                  <strong>First Steps:</strong> {scenario.firstSteps}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SupportResourcesTab;
