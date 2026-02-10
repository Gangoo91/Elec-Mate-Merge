import {
  ArrowLeft,
  ArrowRight,
  Shield,
  Users,
  AlertTriangle,
  CheckCircle,
  Scale,
  BookOpen,
  Building2,
  UserCheck,
  Gavel,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import useSEO from '@/hooks/useSEO';

const quickCheckQuestions = [
  {
    id: 'rp-article-5',
    question:
      'Under Article 5 of the RRFSO, who is the responsible person in a workplace?',
    options: [
      'The most senior employee on site at any given time',
      'The employer',
      'The local fire and rescue authority',
      'The building owner only',
    ],
    correctIndex: 1,
    explanation:
      'Article 5 of the Regulatory Reform (Fire Safety) Order 2005 defines the responsible person in a workplace as the employer. Where the premises are not a workplace, the responsible person is anyone who has control of the premises in connection with a trade, business, or other undertaking, or the owner.',
  },
  {
    id: 'rp-delegation',
    question:
      'Can the responsible person delegate their legal responsibility for fire safety?',
    options: [
      'Yes, to any competent person appointed under Article 18',
      'Yes, but only to a qualified fire risk assessor',
      'No, they can delegate tasks but retain legal responsibility',
      'Yes, provided the delegation is documented in writing',
    ],
    correctIndex: 2,
    explanation:
      'The responsible person can delegate fire safety tasks (such as carrying out the fire risk assessment or maintaining fire equipment) to competent persons, but they cannot delegate their legal responsibility. The RP always retains personal liability for compliance with the RRFSO.',
  },
  {
    id: 'rp-competent-person',
    question:
      'Under which Article must the responsible person appoint competent persons?',
    options: [
      'Article 9 — Fire risk assessment',
      'Article 14 — Emergency routes and exits',
      'Article 18 — Competent persons',
      'Article 21 — Training',
    ],
    correctIndex: 2,
    explanation:
      'Article 18 of the RRFSO requires the responsible person to appoint one or more competent persons to assist them in undertaking the preventive and protective measures required by the Order. A competent person must have sufficient training, experience, and knowledge to carry out the function.',
  },
];

const faqs = [
  {
    question: 'Can there be more than one responsible person for a single premises?',
    answer:
      'Yes. In multi-occupancy buildings such as shopping centres, business parks, or multi-tenanted office blocks, there may be several responsible persons. Each tenant or occupier is typically the responsible person for their own demise (their leased area), whilst the landlord or management company is usually the responsible person for common areas such as corridors, stairwells, car parks, and shared plant rooms. Article 22 of the RRFSO requires all responsible persons sharing premises to cooperate, coordinate their fire safety measures, and inform each other of any risks arising from their activities.',
  },
  {
    question: "What qualifications does a 'competent person' need under Article 18?",
    answer:
      'The RRFSO does not prescribe specific qualifications for a competent person. Instead, Article 18 states that a person is competent if they have "sufficient training and experience or knowledge and other qualities" to properly assist the responsible person. In practice, competence may be demonstrated through formal fire safety qualifications (such as NEBOSH Fire Certificate, IFE membership, or FPA Diploma), relevant experience, third-party certification (e.g. BAFE SP205 registered fire risk assessor), or a combination of these. The published standard PAS 79-1:2020 provides guidance on what constitutes competence for fire risk assessors specifically.',
  },
  {
    question: 'What happens if a fire risk assessment is carried out by an incompetent person?',
    answer:
      'If a fire risk assessment is carried out by someone who lacks the necessary competence, it may fail to identify significant risks, leading to inadequate fire safety measures. The responsible person remains legally liable for any deficiencies — they cannot use the incompetence of the assessor as a defence. In prosecution cases, the courts have been critical of responsible persons who appointed cheap or unqualified assessors without checking their competence. An inadequate fire risk assessment that results in a fire causing death or serious injury could lead to prosecution under both the RRFSO and, in the most serious cases, the Corporate Manslaughter and Corporate Homicide Act 2007.',
  },
  {
    question:
      'As an electrician working on someone else\'s premises, what fire safety duties do I have?',
    answer:
      'As a contractor working on premises controlled by another responsible person, you have a duty under Article 5(4) of the RRFSO to cooperate with the responsible person and comply with any fire safety arrangements in place. You must follow the site fire safety rules, attend any fire safety induction or briefing, report any fire hazards you create or discover (such as hot works, temporary removal of fire-stopping, or impairment of fire detection systems), and ensure your own work does not compromise the fire safety of the premises. If your work involves hot works, temporary isolation of fire alarms, or penetration of fire-resistant barriers, you must coordinate with the responsible person and follow a formal permit-to-work system.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'Under Article 5 of the RRFSO, which of the following is NOT listed as a responsible person?',
    options: [
      'The employer in a workplace',
      'A person who has control of the premises in connection with a trade or business',
      'The local fire and rescue authority',
      'The owner of the premises',
    ],
    correctAnswer: 2,
    explanation:
      'Article 5 defines the responsible person as (a) the employer, if the premises are a workplace, (b) any person who has control of the premises in connection with a trade, business, or undertaking, or (c) the owner. The fire and rescue authority is the enforcing authority, not the responsible person.',
  },
  {
    id: 2,
    question:
      'Under which Article of the RRFSO must the responsible person carry out a fire risk assessment?',
    options: ['Article 5', 'Article 8', 'Article 9', 'Article 18'],
    correctAnswer: 2,
    explanation:
      'Article 9 of the RRFSO requires the responsible person to make a suitable and sufficient assessment of the risks to which relevant persons are exposed for the purpose of identifying the general fire precautions they need to take.',
  },
  {
    id: 3,
    question: 'What does Article 18 of the RRFSO require the responsible person to do?',
    options: [
      'Provide fire safety training to all employees',
      'Appoint one or more competent persons to assist with fire safety measures',
      'Install fire detection and firefighting equipment',
      'Carry out a fire risk assessment annually',
    ],
    correctAnswer: 1,
    explanation:
      'Article 18 requires the responsible person to appoint one or more competent persons to assist them in undertaking the preventive and protective measures required by the Order. The competent person must have sufficient training, experience, and knowledge.',
  },
  {
    id: 4,
    question:
      'The responsible person delegates the fire risk assessment to an external consultant. Who retains legal liability if the assessment is inadequate?',
    options: [
      'The external consultant only',
      'Both the consultant and the responsible person equally',
      'The responsible person',
      'The fire and rescue authority',
    ],
    correctAnswer: 2,
    explanation:
      'The responsible person can delegate tasks but cannot delegate their legal responsibility. If the fire risk assessment is inadequate, the responsible person retains liability. They may also have a civil claim against the consultant, but the criminal liability under the RRFSO remains with the RP.',
  },
  {
    id: 5,
    question:
      'In a multi-tenanted office building, who is typically the responsible person for the common stairwells and corridors?',
    options: [
      'Each individual tenant shares equal responsibility',
      'The tenant nearest to the stairwell',
      'The landlord or managing agent',
      'The local authority building control',
    ],
    correctAnswer: 2,
    explanation:
      'In multi-occupancy buildings, the landlord or managing agent is typically the responsible person for common areas such as stairwells, corridors, lobbies, and shared plant rooms. Each tenant is the responsible person for their own demise. Article 22 requires all responsible persons to cooperate and coordinate.',
  },
  {
    id: 6,
    question: 'Under Article 21 of the RRFSO, when must fire safety training be provided?',
    options: [
      'Only when a fire risk assessment identifies new risks',
      'At recruitment, on transfer of role, and when risks change — during working hours and free of charge',
      'Annually, at the employer\'s discretion',
      'Only when requested by the fire and rescue authority',
    ],
    correctAnswer: 1,
    explanation:
      'Article 21 requires the responsible person to provide adequate fire safety training to employees at the time of recruitment, when being exposed to new or increased risks (such as transfer to a new role or introduction of new equipment), and to be repeated periodically. Training must be provided during working hours and at no cost to the employee.',
  },
  {
    id: 7,
    question:
      'What is the maximum prison sentence for a responsible person convicted of a fire safety offence under the RRFSO?',
    options: ['6 months', '1 year', '2 years', '5 years'],
    correctAnswer: 2,
    explanation:
      'Under the RRFSO, a person found guilty of a fire safety offence on indictment can face up to 2 years\' imprisonment and/or an unlimited fine. For offences tried summarily in the magistrates\' court, the maximum sentence is a fine (unlimited since the Legal Aid, Sentencing and Punishment of Offenders Act 2012 removed the cap).',
  },
  {
    id: 8,
    question:
      'Under which Article must the responsible person provide fire safety information to non-employees such as visitors and contractors?',
    options: ['Article 11', 'Article 18', 'Article 19', 'Article 20'],
    correctAnswer: 3,
    explanation:
      'Article 20 requires the responsible person to provide comprehensible and relevant information to non-employees (such as visitors, contractors, and members of the public) about the risks to them, the fire safety measures in place, and the identity of the competent persons appointed under Article 18. Article 19 covers information to employees specifically.',
  },
];

export default function FireSafetyModule2Section2() {
  useSEO({
    title: 'The Responsible Person | Fire Safety Module 2 Section 2',
    description:
      'Who is the responsible person under the RRFSO 2005, their duties, competent persons, delegation vs responsibility, multi-occupancy duties, personal liability and prosecution.',
  });

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../fire-safety-module-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 2
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-6xl mx-auto">
        {/* Centred Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-rose-500/20 to-rose-400/20 border border-rose-500/30 mb-4">
            <UserCheck className="h-7 w-7 text-rose-400" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 mb-3 mx-auto">
            <span className="text-rose-400 text-xs font-semibold">MODULE 2 &middot; SECTION 2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            The Responsible Person
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
            Who the responsible person is under the RRFSO, their legal duties, competent persons,
            delegation of tasks, multi-occupancy responsibilities, and personal liability
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>RP defined:</strong> Article 5 &mdash; employer, controller, or owner
              </li>
              <li>
                <strong>Core duty:</strong> Fire risk assessment (Article 9)
              </li>
              <li>
                <strong>Delegation:</strong> Tasks yes, legal liability no
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400/90 text-base font-medium mb-2">Key Facts</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Competent person:</strong> Required under Article 18
              </li>
              <li>
                <strong>Penalties:</strong> Unlimited fines, up to 2 years&rsquo; prison
              </li>
              <li>
                <strong>Multi-occupancy:</strong> Article 22 &mdash; cooperate &amp; coordinate
              </li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              'Define the responsible person under Article 5 of the RRFSO',
              'List the key duties imposed on the responsible person',
              'Explain the role and requirements of a competent person under Article 18',
              'Distinguish between delegation of tasks and delegation of legal responsibility',
              'Describe multi-occupancy duties under Article 22',
              'Outline the personal liability and prosecution risks for non-compliance',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-rose-400/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01 — Who Is the Responsible Person? */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400/80 text-sm font-normal">01</span>
            Who Is the Responsible Person?
          </h2>
          <div className="border-l-2 border-rose-500/30 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                <strong>Article 5</strong> of the Regulatory Reform (Fire Safety) Order 2005 defines who the
                &ldquo;responsible person&rdquo; (RP) is. The definition depends on the type of premises:
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Article 5 &mdash; Responsible Person Definition</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">In a workplace:</strong> the <strong>employer</strong>, if
                      the premises are (or are part of) a workplace under their control
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">In other premises:</strong> any person who has{' '}
                      <strong>control of the premises</strong> in connection with the carrying on of a trade,
                      business, or other undertaking (whether for profit or not)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Otherwise:</strong> the <strong>owner</strong> of the
                      premises
                    </span>
                  </li>
                </ul>
              </div>

              <p>
                The concept of the responsible person is deliberately broad. It ensures that someone is
                always legally accountable for fire safety in any non-domestic premises. The person with the
                most control over the premises bears the greatest responsibility.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">Key Point:</strong> In{' '}
                  <strong>multi-occupancy buildings</strong> (such as shopping centres, business parks,
                  or multi-tenanted offices), there may be <strong>multiple responsible persons</strong>,
                  each responsible for different parts of the premises. <strong>Article 22</strong>{' '}
                  requires all responsible persons sharing a building to cooperate with each other and
                  coordinate their fire safety measures.
                </p>
              </div>

              <p>
                Where there are multiple responsible persons, each must take reasonable steps to cooperate
                and share information. This is particularly important for ensuring that fire detection
                systems, escape routes, and emergency procedures work cohesively across the entire building,
                not just within individual tenancies.
              </p>
            </div>
          </div>
        </section>

        {/* Section 02 — Duties of the Responsible Person */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400/80 text-sm font-normal">02</span>
            Duties of the Responsible Person
          </h2>
          <div className="border-l-2 border-rose-500/30 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The RRFSO places extensive duties on the responsible person. These duties are designed to
                ensure that fire risks are identified, managed, and reduced to the lowest reasonably
                practicable level. The principal duties are set out across multiple Articles:
              </p>

              <div className="space-y-3">
                {[
                  {
                    article: 'Article 9',
                    title: 'Fire Risk Assessment',
                    detail:
                      'Carry out a suitable and sufficient fire risk assessment to identify risks to relevant persons. The assessment must be reviewed regularly and whenever there is reason to suspect it is no longer valid.',
                  },
                  {
                    article: 'Article 8',
                    title: 'General Fire Precautions',
                    detail:
                      'Implement general fire precautions to the extent reasonably practicable. These include measures to reduce the risk of fire, the risk of spread of fire, and measures for means of escape.',
                  },
                  {
                    article: 'Article 11',
                    title: 'Fire Safety Arrangements',
                    detail:
                      'Make and give effect to fire safety arrangements for the effective planning, organisation, control, monitoring, and review of preventive and protective measures. If five or more employees, arrangements must be recorded in writing.',
                  },
                  {
                    article: 'Article 13',
                    title: 'Fire Detection & Firefighting',
                    detail:
                      'Provide appropriate fire detection and fire alarm systems, firefighting equipment, and ensure they are maintained in an efficient state and in good working order. Provide adequate signage indicating their location.',
                  },
                  {
                    article: 'Article 14',
                    title: 'Emergency Routes & Exits',
                    detail:
                      'Ensure that routes to emergency exits and the exits themselves are kept clear at all times. Emergency doors must open in the direction of escape, must not be locked or fastened so they cannot be easily and immediately opened, and must be indicated by adequate signage.',
                  },
                  {
                    article: 'Article 15',
                    title: 'Serious & Imminent Danger',
                    detail:
                      'Establish and, where necessary, implement procedures for serious and imminent danger and danger areas, including nominating sufficient competent persons to implement evacuation procedures.',
                  },
                  {
                    article: 'Article 17',
                    title: 'Maintenance of Measures',
                    detail:
                      'Ensure that the premises, facilities, equipment, and devices provided for fire safety are subject to a suitable system of maintenance and are maintained in an efficient state, in efficient working order, and in good repair.',
                  },
                  {
                    article: 'Article 18',
                    title: 'Competent Persons',
                    detail:
                      'Appoint one or more competent persons to assist in undertaking the preventive and protective measures required by the Order.',
                  },
                  {
                    article: 'Articles 19–21',
                    title: 'Information & Training',
                    detail:
                      'Provide information to employees (Article 19) and non-employees (Article 20). Provide adequate fire safety training at recruitment, on transfer, and when risks change (Article 21). Training must be during working hours and free of charge.',
                  },
                ].map((item) => (
                  <div key={item.article} className="bg-white/5 border border-white/10 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 min-w-[80px]">
                        <span className="text-xs font-bold text-rose-400 bg-rose-500/10 border border-rose-500/30 px-2 py-1 rounded">
                          {item.article}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-white text-sm sm:text-base mb-1">
                          {item.title}
                        </h4>
                        <p className="text-white/80 text-sm leading-relaxed">{item.detail}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="h-5 w-5 text-rose-400 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-white">
                    <strong className="text-rose-300">Important:</strong> These duties are not optional.
                    The responsible person must comply with all relevant Articles of the RRFSO. Failure to do
                    so is a criminal offence that can result in prosecution, unlimited fines, and imprisonment.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03 — Competent Person (Article 18) */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400/80 text-sm font-normal">03</span>
            Competent Person (Article 18)
          </h2>
          <div className="border-l-2 border-rose-500/30 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Article 18 requires the responsible person to appoint one or more{' '}
                <strong>competent persons</strong> to assist them in undertaking the preventive and
                protective measures demanded by the RRFSO. This is a legal requirement &mdash; the RP
                cannot simply do everything themselves unless they personally possess the necessary competence.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">What Makes a Person &ldquo;Competent&rdquo;?</p>
                <p className="text-sm text-white/80 mb-3">
                  The RRFSO states that a person is competent if they have <strong>&ldquo;sufficient
                  training and experience or knowledge and other qualities&rdquo;</strong> to properly
                  assist the responsible person. In practice, this means:
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Training:</strong> Formal fire safety qualifications
                      such as NEBOSH Fire Certificate, IFE (Institution of Fire Engineers) membership, or
                      FPA (Fire Protection Association) Diploma
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Experience:</strong> Practical experience in
                      conducting fire risk assessments, implementing fire safety measures, and managing
                      fire safety in buildings of similar type and complexity
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Knowledge:</strong> Understanding of fire behaviour,
                      fire legislation, building construction, fire detection/alarm systems, means of
                      escape, and fire risk assessment methodology
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Other qualities:</strong> Good communication skills,
                      attention to detail, and the ability to write clear, actionable fire risk assessments
                    </span>
                  </li>
                </ul>
              </div>

              <p>
                The competent person can be an <strong>internal employee</strong> (such as a trained
                facilities manager or fire safety officer) or an <strong>external fire safety consultant</strong>.
                Article 18(6) states that where there is a competent person within the employer&rsquo;s
                employment, that person should be used in preference to an external consultant, provided
                they have the necessary competence.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Third-Party Certification &amp; PAS 79
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">PAS 79-1:2020</strong> is the published standard for
                      fire risk assessment in non-residential premises. It provides a framework for what a
                      competent fire risk assessor should cover and how a fire risk assessment should be structured.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">BAFE SP205</strong> is a third-party certification
                      scheme for fire risk assessors. Assessors registered under SP205 have been independently
                      verified as competent to carry out fire risk assessments.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">IFE Register:</strong> The Institution of Fire
                      Engineers maintains a register of fire risk assessors who have demonstrated competence
                      through a combination of qualifications and practical experience.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="h-5 w-5 text-orange-400 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-white">
                    <strong className="text-orange-300">Recent Case Law:</strong> Courts have increasingly
                    scrutinised the competence of those appointed to carry out fire risk assessments. In
                    several prosecution cases, responsible persons have received heavier penalties because
                    they failed to verify the competence of the person they appointed. Simply hiring the
                    cheapest assessor without checking their qualifications, experience, or track record is
                    not a defence.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 04 — Delegation vs Responsibility */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400/80 text-sm font-normal">04</span>
            Delegation vs Responsibility
          </h2>
          <div className="border-l-2 border-rose-500/30 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                One of the most commonly misunderstood aspects of the RRFSO is the distinction between
                delegating fire safety <strong>tasks</strong> and delegating fire safety{' '}
                <strong>responsibility</strong>. This distinction is critical:
              </p>

              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                <div className="bg-green-500/10 border-2 border-green-500/40 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="h-5 w-5 text-green-400" />
                    <h3 className="font-bold text-green-300 text-sm">Can Be Delegated</h3>
                  </div>
                  <p className="text-white/70 text-xs mb-3">Tasks &amp; operational duties</p>
                  <ul className="text-sm text-white/80 space-y-2">
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                      <span>Carrying out the fire risk assessment</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                      <span>Day-to-day fire safety management</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                      <span>Maintenance of fire detection systems</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                      <span>Delivery of fire safety training</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                      <span>Fire marshal/warden duties during an evacuation</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-red-500/10 border-2 border-red-500/40 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="h-5 w-5 text-red-400" />
                    <h3 className="font-bold text-red-300 text-sm">Cannot Be Delegated</h3>
                  </div>
                  <p className="text-white/70 text-xs mb-3">Legal responsibility &amp; liability</p>
                  <ul className="text-sm text-white/80 space-y-2">
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-red-400" />
                      <span>Criminal liability under the RRFSO</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-red-400" />
                      <span>Personal accountability for compliance</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-red-400" />
                      <span>Duty to verify that delegated tasks are done properly</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-red-400" />
                      <span>Obligation to ensure competence of those appointed</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-red-400" />
                      <span>Prosecution risk if anything goes wrong</span>
                    </li>
                  </ul>
                </div>
              </div>

              <p>
                Fire marshals and fire wardens act <strong>on behalf of</strong> the responsible person,
                but the RP retains full liability. The practical hierarchy typically works as follows:
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Typical Fire Safety Management Hierarchy
                </p>
                <div className="space-y-2">
                  {[
                    {
                      role: 'Responsible Person (RP)',
                      desc: 'Overall legal accountability — typically the employer, MD, or building owner',
                    },
                    {
                      role: 'Fire Safety Manager',
                      desc: 'Manages day-to-day fire safety on behalf of the RP — may be a facilities manager or dedicated role',
                    },
                    {
                      role: 'Fire Marshals / Fire Wardens',
                      desc: 'Assist with evacuation, carry out routine checks, report hazards — trained volunteers or appointed staff',
                    },
                    {
                      role: 'All Employees',
                      desc: 'Follow fire safety procedures, attend training, report hazards, know evacuation routes',
                    },
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3 bg-white/5 border border-white/10 rounded-lg p-3">
                      <div className="flex-shrink-0 w-7 h-7 rounded-full bg-rose-500/20 border border-rose-500/40 flex items-center justify-center">
                        <span className="text-xs font-bold text-rose-400">{idx + 1}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-white">{item.role}</p>
                        <p className="text-xs text-white/70">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">Key Point:</strong> Clear documentation of roles and
                  responsibilities is essential. The responsible person should ensure that fire safety
                  duties are assigned to <strong>named individuals</strong> with written role descriptions,
                  and that those individuals are trained and resourced to carry out their roles effectively.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 05 — Duties Towards Employees & Others */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400/80 text-sm font-normal">05</span>
            Duties Towards Employees &amp; Others
          </h2>
          <div className="border-l-2 border-rose-500/30 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The responsible person has specific duties to provide both <strong>information</strong> and{' '}
                <strong>training</strong> to employees and other relevant persons. These duties are set out
                in Articles 19, 20, and 21 of the RRFSO.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <BookOpen className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">
                    Article 19 &mdash; Information to Employees
                  </p>
                </div>
                <p className="text-sm text-white/80 mb-2">
                  The responsible person must provide employees with comprehensible and relevant information on:
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>The risks identified by the fire risk assessment</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>The preventive and protective measures in place</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>The emergency procedures, including evacuation routes and assembly points</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>The identity of the competent persons appointed under Article 18</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>Any specific risks arising from the activities of other employers sharing the premises</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Users className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">
                    Article 20 &mdash; Information to Non-Employees
                  </p>
                </div>
                <p className="text-sm text-white/80 mb-2">
                  The RP must also provide comprehensible and relevant information to non-employees who may
                  be on the premises, including:
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Visitors:</strong> information about evacuation
                      procedures and assembly points
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Contractors:</strong> site-specific fire safety rules,
                      hot work procedures, and any temporary changes to fire safety arrangements
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Members of the public:</strong> where applicable
                      (e.g. shops, theatres, hotels), adequate signage and verbal/written instructions
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Shield className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">
                    Article 21 &mdash; Training
                  </p>
                </div>
                <p className="text-sm text-white/80 mb-2">
                  The responsible person must ensure that employees receive adequate fire safety training:
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">At recruitment:</strong> as part of induction, before
                      the employee begins work
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">On transfer or change of role:</strong> when an
                      employee moves to a different part of the building or takes on new responsibilities
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">When risks change:</strong> following introduction of
                      new equipment, processes, substances, or changes to the building layout
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Repeated periodically:</strong> refresher training to
                      maintain awareness (typically annually, but more frequently in higher-risk premises)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">During working hours:</strong> training must take
                      place during normal working hours
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Free of charge:</strong> the employer must bear the
                      cost of training, not the employee
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">Fire Marshal Training:</strong> Training of fire
                  marshals and fire wardens falls within the scope of Article 21. Fire marshals need
                  enhanced training beyond basic fire awareness, including how to conduct a sweep of their
                  zone, how to assist persons with disabilities, how to use fire extinguishers, and how to
                  communicate with the fire and rescue service on arrival.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 06 — Multi-Occupancy & Shared Responsibilities */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400/80 text-sm font-normal">06</span>
            Multi-Occupancy &amp; Shared Responsibilities
          </h2>
          <div className="border-l-2 border-rose-500/30 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Many buildings &mdash; shopping centres, business parks, multi-tenanted offices, industrial
                estates &mdash; are occupied by multiple organisations, each of which may be a responsible
                person for their part of the premises. <strong>Article 22</strong> addresses this
                situation directly.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Article 22 &mdash; Co-operation and Co-ordination
                </p>
                <p className="text-sm text-white/80 mb-3">
                  Where two or more responsible persons share, or have duties in respect of, the same
                  premises, each must:
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Cooperate</strong> with each other to enable
                      compliance with the RRFSO
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Coordinate</strong> their fire safety measures to
                      ensure they are consistent and do not conflict
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Inform</strong> each other of any risks arising from
                      their own activities that could affect others in the building
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Building2 className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-white">Common Areas &mdash; Who Is Responsible?</p>
                </div>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Landlord / management company:</strong> typically the
                      responsible person for common parts &mdash; corridors, stairwells, lobbies, car parks,
                      shared plant rooms, external areas, and building-wide fire detection/alarm systems
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Individual tenants:</strong> responsible person for
                      their own demise (their leased area), including internal fire safety measures, staff
                      training, and compliance within their unit
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Lease agreements:</strong> should clearly define fire
                      safety responsibilities, including who maintains what, who pays for what, and how
                      communication between parties is managed
                    </span>
                  </li>
                </ul>
              </div>

              <p>
                In practice, multi-occupancy fire safety requires regular communication, shared fire risk
                assessments for common areas, coordinated evacuation procedures, and clear documentation
                of who is responsible for each element of fire safety within the building. A breakdown in
                cooperation between responsible persons is one of the most common causes of enforcement
                action in multi-tenanted premises.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="h-5 w-5 text-rose-400 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-white">
                    <strong className="text-rose-300">Common Pitfall:</strong> In multi-occupancy
                    buildings, gaps in responsibility often occur where no single party considers themselves
                    responsible for shared areas or interfaces between tenancies. The fire and rescue
                    authority can prosecute <strong>all</strong> responsible persons who have failed in
                    their duty, not just the one most at fault.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 07 — Personal Liability & Prosecution */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400/80 text-sm font-normal">07</span>
            Personal Liability &amp; Prosecution
          </h2>
          <div className="border-l-2 border-rose-500/30 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The RRFSO does not only target organisations &mdash; it can target{' '}
                <strong>individuals</strong>. Article 32 makes it clear that directors, managers, company
                secretaries, and similar officers can be held <strong>personally liable</strong> for fire
                safety offences committed by the organisation.
              </p>

              <div className="bg-red-500/10 border-2 border-red-500/40 p-4 sm:p-5 rounded-lg">
                <div className="flex items-start gap-2 mb-3">
                  <Gavel className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-bold text-red-300 text-base">Article 32 &mdash; Personal Liability</h3>
                </div>
                <p className="text-white text-sm leading-relaxed mb-3">
                  Where an offence under the RRFSO is committed by a body corporate and is proved to have
                  been committed with the <strong>&ldquo;consent or connivance&rdquo;</strong> of, or to
                  be attributable to any <strong>&ldquo;neglect&rdquo;</strong> on the part of, any
                  director, manager, secretary, or similar officer, that individual as well as the body
                  corporate is guilty of the offence and liable to be prosecuted and punished accordingly.
                </p>
                <p className="text-white/80 text-sm leading-relaxed">
                  This means a director who knew about a fire safety deficiency and failed to act, or who
                  turned a blind eye to non-compliance, can face personal criminal prosecution.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Penalties for RRFSO Offences</p>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="text-center bg-red-500/10 border border-red-500/30 rounded-lg p-3 sm:p-4">
                    <div className="text-2xl sm:text-3xl font-bold text-red-400">Unlimited</div>
                    <div className="text-xs text-white/60 mt-1">
                      Fines &mdash; no upper limit on fines for RRFSO offences on indictment
                    </div>
                  </div>
                  <div className="text-center bg-red-500/10 border border-red-500/30 rounded-lg p-3 sm:p-4">
                    <div className="text-2xl sm:text-3xl font-bold text-red-400">2 Years</div>
                    <div className="text-xs text-white/60 mt-1">
                      Maximum imprisonment &mdash; on conviction on indictment
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Consequences Beyond Criminal Penalties</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Professional reputation:</strong> criminal convictions
                      for fire safety offences are a matter of public record and can severely damage
                      professional reputation and career prospects
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Insurance implications:</strong> insurers may void
                      fire insurance policies or refuse to pay claims where the responsible person has
                      failed to comply with the RRFSO, leaving the organisation to bear the full cost of
                      fire damage
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Civil claims:</strong> in addition to criminal
                      prosecution, the responsible person may face civil claims for damages from those
                      injured or bereaved as a result of a fire
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Disqualification:</strong> directors convicted of
                      serious fire safety offences may face disqualification from acting as a company
                      director under the Company Directors Disqualification Act 1986
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Corporate Manslaughter:</strong> where gross
                      management failures lead to a fire causing death, prosecution under the Corporate
                      Manslaughter and Corporate Homicide Act 2007 may follow, with unlimited fines and
                      mandatory publicity orders
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2">
                  <Scale className="h-5 w-5 text-rose-400 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-white">
                    <strong className="text-rose-300">Recent Prosecution Examples:</strong> In recent
                    years, the courts have imposed significant penalties for RRFSO breaches. Landlords of
                    houses in multiple occupation (HMOs), hotel owners, care home operators, and business
                    owners have all received prison sentences and six-figure fines. The trend is towards
                    increasingly robust enforcement, particularly where failures put sleeping occupants or
                    vulnerable persons at risk.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Responsible Person Decision Tree */}
        <section className="mb-10">
          <div className="bg-white/5 border border-white/10 rounded-lg p-4 sm:p-6">
            <h3 className="text-rose-400 font-semibold text-sm mb-6 text-center">
              Responsible Person Decision Tree
            </h3>
            <div className="max-w-md mx-auto space-y-3">
              {/* Start */}
              <div className="text-center">
                <div className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-rose-500/20 border-2 border-rose-500/40">
                  <span className="text-sm font-bold text-rose-300">Are the premises a workplace?</span>
                </div>
              </div>

              {/* Yes branch */}
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-xs font-bold text-green-400 mb-1">YES</div>
                  <div className="h-4 w-[1px] bg-white/20 mx-auto" />
                  <div className="mt-1 px-3 py-2 rounded-lg bg-green-500/10 border border-green-500/30">
                    <span className="text-xs font-semibold text-green-300">
                      RP = The Employer
                    </span>
                  </div>
                </div>

                {/* No branch */}
                <div className="text-center">
                  <div className="text-xs font-bold text-red-400 mb-1">NO</div>
                  <div className="h-4 w-[1px] bg-white/20 mx-auto" />
                  <div className="mt-1 px-3 py-2 rounded-lg bg-white/5 border border-white/20">
                    <span className="text-xs font-medium text-white">
                      Does anyone control the premises for trade/business?
                    </span>
                  </div>
                </div>
              </div>

              {/* Second level - right branch */}
              <div className="ml-auto w-1/2">
                <div className="grid grid-cols-2 gap-3">
                  <div className="text-center">
                    <div className="text-xs font-bold text-green-400 mb-1">YES</div>
                    <div className="h-3 w-[1px] bg-white/20 mx-auto" />
                    <div className="mt-1 px-2 py-2 rounded-lg bg-green-500/10 border border-green-500/30">
                      <span className="text-[10px] sm:text-xs font-semibold text-green-300">
                        RP = That Person
                      </span>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs font-bold text-red-400 mb-1">NO</div>
                    <div className="h-3 w-[1px] bg-white/20 mx-auto" />
                    <div className="mt-1 px-2 py-2 rounded-lg bg-green-500/10 border border-green-500/30">
                      <span className="text-[10px] sm:text-xs font-semibold text-green-300">
                        RP = The Owner
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Multi-occupancy note */}
              <div className="mt-4 bg-rose-500/10 border border-rose-500/30 rounded-lg p-3 text-center">
                <p className="text-rose-300 text-xs sm:text-sm font-semibold">
                  In multi-occupancy buildings: multiple RPs may exist &mdash; Article 22 requires
                  cooperation &amp; coordination
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="pb-4 border-b border-white/5 last:border-0">
                <h3 className="text-sm font-medium text-white mb-1">{faq.question}</h3>
                <p className="text-sm text-white/80 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Quiz */}
        <Quiz title="The Responsible Person &mdash; Knowledge Check" questions={quizQuestions} />

        {/* Bottom Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../fire-safety-module-2-section-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              The RRFSO 2005
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-rose-500 text-white hover:bg-rose-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../fire-safety-module-2-section-3">
              Next: Fire Risk Assessment
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
