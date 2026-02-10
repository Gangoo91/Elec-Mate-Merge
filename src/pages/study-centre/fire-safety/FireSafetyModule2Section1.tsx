import {
  ArrowLeft,
  ArrowRight,
  Scale,
  CheckCircle,
  AlertTriangle,
  ShieldCheck,
  FileText,
  Users,
  Gavel,
  Flame,
  Building,
  ClipboardList,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

/* ───────────────────────── Quick-check questions ───────────────────────── */

const quickCheckQuestions = [
  {
    id: "rrfso-commencement",
    question:
      "When did the RRFSO 2005 come into force?",
    options: [
      "1 January 2005",
      "1 October 2006",
      "1 April 2006",
      "31 December 2005",
    ],
    correctIndex: 1,
    explanation:
      "The Regulatory Reform (Fire Safety) Order 2005 came into force on 1 October 2006 in England and Wales. Although it received Royal Assent in 2005, the implementation date was deliberately delayed to allow duty holders time to prepare for the transition from the old fire certificate system to the new risk-based approach.",
  },
  {
    id: "rrfso-scope-exclusion",
    question:
      "What type of premises does the RRFSO NOT apply to?",
    options: [
      "Offices and commercial buildings",
      "Common areas of blocks of flats",
      "Individual private dwellings (single domestic premises)",
      "Hospitals and care homes",
    ],
    correctIndex: 2,
    explanation:
      "The RRFSO does not apply to domestic premises occupied as a single private dwelling. It covers virtually all non-domestic premises, including the common areas of residential buildings (such as corridors, stairwells, and lobbies in blocks of flats). Individual flats themselves fall outside the scope of the Order, though they may be covered by housing legislation.",
  },
  {
    id: "rrfso-max-sentence",
    question:
      "What is the maximum prison sentence for RRFSO offences?",
    options: [
      "6 months imprisonment",
      "12 months imprisonment",
      "Up to 2 years imprisonment",
      "Up to 5 years imprisonment",
    ],
    correctIndex: 2,
    explanation:
      "Under the RRFSO, a person convicted on indictment of a fire safety offence can face up to 2 years\u2019 imprisonment and/or an unlimited fine. This applies to individuals such as the responsible person or any person who fails to comply with an enforcement notice, prohibition notice, or the general fire precaution requirements of the Order.",
  },
];

/* ──────────────────────────────── FAQs ─────────────────────────────────── */

const faqs = [
  {
    question:
      "Does the RRFSO apply to houses in multiple occupation (HMOs)?",
    answer:
      "Yes. Houses in multiple occupation (HMOs) fall within the scope of the RRFSO because the common areas (hallways, staircases, shared kitchens, and communal lounges) are not part of any single private dwelling. The responsible person \u2014 typically the landlord or managing agent \u2014 must carry out a fire risk assessment covering all common parts and ensure appropriate fire precautions are in place. HMOs are also subject to additional requirements under the Housing Act 2004, where the local authority\u2019s housing team may impose licence conditions relating to fire safety. In practice, both the fire and rescue authority (under the RRFSO) and the local housing authority (under the Housing Act) may have enforcement powers over fire safety in HMOs, and they are expected to coordinate their activities.",
  },
  {
    question:
      "What happened to old fire certificates after the RRFSO came into force?",
    answer:
      "When the RRFSO came into force on 1 October 2006, all existing fire certificates issued under the Fire Precautions Act 1971 ceased to have effect. They were not automatically converted or carried forward. Instead, the responsible person for every premises previously covered by a fire certificate was required to carry out a fire risk assessment under Article 9 of the RRFSO and implement their own fire safety arrangements based on the findings. The shift was fundamental: under the old system, the fire authority told you what to do (via the certificate conditions); under the RRFSO, the responsible person must assess the risks and determine the appropriate precautions themselves, with the fire authority acting as an enforcer rather than a prescriber.",
  },
  {
    question:
      "Can the fire service still issue prohibition notices to close premises?",
    answer:
      "Yes. Under Article 31 of the RRFSO, an inspector from the fire and rescue authority can serve a prohibition notice if they are satisfied that the use of premises involves or will involve a risk to relevant persons so serious that use of the premises ought to be prohibited or restricted. A prohibition notice can take immediate effect if the inspector considers the risk of serious personal injury is imminent. The notice can prohibit or restrict the use of the premises until specified matters have been remedied. Failure to comply with a prohibition notice is a criminal offence carrying an unlimited fine and/or up to 2 years\u2019 imprisonment on conviction on indictment. There is a right of appeal to a magistrates\u2019 court, but the prohibition remains in effect pending the appeal unless the court orders otherwise.",
  },
  {
    question:
      "How does the Fire Safety Act 2021 change the RRFSO?",
    answer:
      "The Fire Safety Act 2021 amends the RRFSO to clarify that the Order applies to the structure, external walls (including cladding, balconies, and windows), and flat entrance doors in multi-occupied residential buildings. This was a direct response to the Grenfell Tower fire and the legal uncertainty about whether external walls fell within the scope of the RRFSO. The Act confirms that the responsible person for a multi-occupied residential building must include the external walls and flat entrance doors in their fire risk assessment and take appropriate fire precautions in relation to them. It does not create new offences but ensures that the existing enforcement powers of the RRFSO can be used in relation to these elements. The Fire Safety (England) Regulations 2022, made under the amended RRFSO, impose specific new duties on responsible persons for residential buildings, including requirements for sharing fire safety information with residents.",
  },
];

/* ──────────────────────────── Quiz questions ───────────────────────────── */

const quizQuestions = [
  {
    id: 1,
    question:
      "Which of the following premises does the RRFSO 2005 apply to?",
    options: [
      "A single private dwelling occupied by one family",
      "An offshore oil installation",
      "The common areas of a block of residential flats",
      "A coal mine regulated under specific mining legislation",
    ],
    correctAnswer: 2,
    explanation:
      "The RRFSO applies to virtually all non-domestic premises, including the common areas of residential buildings such as corridors, stairwells, and lobbies. It does not apply to single private dwellings, offshore installations, or mines (which are covered by their own specific legislation).",
  },
  {
    id: 2,
    question:
      "Which article of the RRFSO 2005 requires the responsible person to carry out a fire risk assessment?",
    options: [
      "Article 5",
      "Article 8",
      "Article 9",
      "Article 14",
    ],
    correctAnswer: 2,
    explanation:
      "Article 9 of the RRFSO places a mandatory duty on the responsible person to make a suitable and sufficient assessment of the risks to which relevant persons are exposed for the purpose of identifying the general fire precautions needed to comply with the Order. This is the cornerstone of the risk-based approach introduced by the RRFSO.",
  },
  {
    id: 3,
    question:
      "Under the RRFSO, which enforcement action can a fire inspector take if there is an imminent risk of serious personal injury?",
    options: [
      "Issue an alteration notice",
      "Issue an informal advisory letter",
      "Issue a prohibition notice with immediate effect",
      "Report the matter to the local authority housing team only",
    ],
    correctAnswer: 2,
    explanation:
      "Under Article 31 of the RRFSO, a fire inspector can serve a prohibition notice that takes immediate effect if there is, or is likely to be, a risk to relevant persons so serious that use of the premises ought to be prohibited or restricted. This is the most powerful enforcement tool available and can effectively close premises until the risk is remedied.",
  },
  {
    id: 4,
    question:
      "What is the maximum penalty for an individual convicted on indictment of an offence under the RRFSO?",
    options: [
      "A fine not exceeding \u00a35,000",
      "6 months\u2019 imprisonment and/or a fine of \u00a320,000",
      "Up to 2 years\u2019 imprisonment and/or an unlimited fine",
      "Up to 5 years\u2019 imprisonment and a fine of \u00a3100,000",
    ],
    correctAnswer: 2,
    explanation:
      "Under the RRFSO, conviction on indictment for fire safety offences can result in up to 2 years\u2019 imprisonment and/or an unlimited fine. This applies to breaches of the general fire precaution requirements, failure to comply with enforcement or prohibition notices, and related offences. On summary conviction, the maximum penalty is a fine (unlimited since the Legal Aid, Sentencing and Punishment of Offenders Act 2012 removed the cap).",
  },
  {
    id: 5,
    question:
      "Who is defined as the \u2018responsible person\u2019 under Article 5 of the RRFSO?",
    options: [
      "Any employee working in the building",
      "The local fire and rescue authority",
      "The employer (if the workplace is under their control), or the person who has control of the premises",
      "The HSE inspector assigned to the premises",
    ],
    correctAnswer: 2,
    explanation:
      "Article 5 defines the responsible person as: (a) the employer, if the workplace is to any extent under their control; (b) in relation to any other premises, the person who has control of the premises in connection with carrying on a trade, business, or other undertaking; or (c) the owner, where the person in control does not have control in connection with a trade, business, or undertaking. In many buildings, the responsible person is the employer, landlord, or managing agent.",
  },
  {
    id: 6,
    question:
      "What fundamental change did the RRFSO introduce compared to the pre-2005 fire safety regime?",
    options: [
      "It introduced a mandatory fire certificate for all premises",
      "It shifted from a prescriptive fire certificate system to a risk-based self-compliance model",
      "It transferred enforcement from the fire service to the HSE",
      "It removed the requirement for fire risk assessments",
    ],
    correctAnswer: 1,
    explanation:
      "The RRFSO fundamentally changed the approach to fire safety by replacing the prescriptive fire certificate system (where the fire authority told you what to do) with a risk-based model where the responsible person must assess the fire risks and implement appropriate precautions. Fire certificates were abolished. The responsible person has the primary duty to ensure fire safety, with the fire and rescue authority enforcing compliance.",
  },
  {
    id: 7,
    question:
      "What did the Fire Safety Act 2021 clarify about the scope of the RRFSO?",
    options: [
      "That the RRFSO now applies to single private dwellings",
      "That the RRFSO covers external walls (including cladding) and flat entrance doors in multi-occupied residential buildings",
      "That the RRFSO no longer applies to commercial premises",
      "That fire risk assessments are no longer required for residential buildings",
    ],
    correctAnswer: 1,
    explanation:
      "The Fire Safety Act 2021 amended the RRFSO to clarify that the structure, external walls (including cladding, balconies, and windows), and flat entrance doors of multi-occupied residential buildings fall within the scope of the Order. This was a direct response to the Grenfell Tower tragedy and the legal uncertainty about whether these elements were covered by the RRFSO.",
  },
  {
    id: 8,
    question:
      "Which of the following pieces of legislation does the RRFSO interact with regarding workplace health and safety?",
    options: [
      "The Countryside and Rights of Way Act 2000",
      "The Health and Safety at Work etc. Act 1974",
      "The Data Protection Act 2018",
      "The Equality Act 2010",
    ],
    correctAnswer: 1,
    explanation:
      "The RRFSO interacts directly with the Health and Safety at Work etc. Act 1974 (HASAWA). While the RRFSO covers fire safety specifically, HASAWA provides the overarching framework for workplace health and safety. Article 12 of the RRFSO requires employers to eliminate or reduce risks from dangerous substances (linking to DSEAR 2002 and COSHH 2002, both made under HASAWA). The Management of Health and Safety at Work Regulations 1999 (also under HASAWA) complement the RRFSO\u2019s risk assessment requirements.",
  },
];

/* ═══════════════════════════ COMPONENT ═══════════════════════════════════ */

export default function FireSafetyModule2Section1() {
  useSEO({
    title:
      "The Regulatory Reform (Fire Safety) Order 2005 | Fire Safety Module 2 Section 1",
    description:
      "Comprehensive coverage of the RRFSO 2005, its scope and application, key articles, risk-based approach, enforcement powers, Grenfell amendments, and interaction with other legislation.",
  });

  return (
    <div className="bg-[#1a1a1a] overflow-x-hidden">
      {/* ─── Sticky Header ─── */}
      <div className="border-b border-white/10 bg-[#1a1a1a] sticky top-0 z-50 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button
            variant="ghost"
            className="min-h-[44px] text-white hover:text-white active:text-white p-0 -ml-1 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../fire-safety-module-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 2
            </Link>
          </Button>
        </div>
      </div>

      {/* ─── Article ─── */}
      <article className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* ─── Hero ─── */}
        <div className="mb-12 text-center">
          <Scale className="h-10 w-10 text-rose-500 mx-auto mb-4" />
          <span className="inline-block bg-rose-500 text-white px-3 py-1 rounded-full text-sm font-semibold mb-4">
            MODULE 2 &middot; SECTION 1
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            The Regulatory Reform (Fire Safety) Order 2005
          </h1>
          <p className="text-white/80 max-w-xl mx-auto">
            The single most important piece of fire safety legislation in England and Wales &mdash;
            understanding its scope, key articles, enforcement powers, and post-Grenfell amendments
          </p>
        </div>

        {/* ─── 01 Why the RRFSO Was Needed ─── */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <span className="text-rose-400/80 text-sm font-normal">01</span>
            Why the RRFSO Was Needed
          </h2>
          <div className="border-l-2 border-rose-500/30 pl-4 sm:pl-6">
            <div className="space-y-4 text-white">
              <p>
                Before 2005, fire safety in England and Wales was governed by a patchwork of
                over <strong>70 separate pieces of fire safety legislation</strong>. The system
                was fragmented, confusing, and fundamentally reactive. Different types of premises
                were covered by different laws, enforced by different authorities, with different
                requirements and different penalties.
              </p>

              <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-xs sm:text-sm text-white">
                <div className="rounded-lg p-3 sm:p-4 bg-rose-500/10 border-l-2 border-l-rose-500/50 border border-rose-500/30">
                  <p className="font-semibold text-base text-rose-400 mb-2">The Old System</p>
                  <ul className="text-base text-white space-y-1.5">
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                      <span>
                        <strong>Fire Precautions Act 1971</strong> &mdash; required fire certificates
                        for certain premises, issued and enforced by the fire authority
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                      <span>
                        <strong>Fire Precautions (Workplace) Regulations 1997</strong> &mdash; separate
                        requirements overlapping with the 1971 Act
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                      <span>
                        <strong>Multiple enforcing authorities</strong> &mdash; fire authority, HSE, local
                        authority, and licensing authorities all had overlapping responsibilities
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                      <span>
                        <strong>Prescriptive approach</strong> &mdash; the fire authority told you
                        exactly what to install, rather than assessing actual risks
                      </span>
                    </li>
                  </ul>
                </div>
                <div className="rounded-lg p-3 sm:p-4 bg-rose-500/10 border-l-2 border-l-rose-500/50 border border-rose-500/30">
                  <p className="font-semibold text-base text-rose-400 mb-2">The Problems</p>
                  <ul className="text-base text-white space-y-1.5">
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                      <span>
                        Duty holders often did not know which legislation applied to their premises
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                      <span>
                        Fire certificates created a false sense of security &mdash; once obtained,
                        many premises owners did nothing further
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                      <span>
                        The system was reactive rather than preventative &mdash; compliance was
                        checked only when certificates were applied for or renewed
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                      <span>
                        Many premises (especially smaller workplaces) fell through the gaps
                        between different pieces of legislation
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              <p>
                The <strong>Regulatory Reform (Fire Safety) Order 2005</strong> replaced all of this
                with a single, risk-based framework. It received Royal Assent in 2005 and came into
                force on <strong>1 October 2006</strong> in England and Wales. It consolidated and
                simplified over 70 pieces of legislation into one coherent Order.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-rose-400 font-medium mb-3">
                  <Building className="inline h-4 w-4 mr-1.5 -mt-0.5" />
                  Devolved Nations
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-rose-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Scotland:</strong> Fire (Scotland) Act 2005 &mdash; similar risk-based
                      approach, enforced by the Scottish Fire and Rescue Service
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-rose-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Northern Ireland:</strong> Fire and Rescue Services (Northern Ireland)
                      Order 2006 &mdash; separate but equivalent legislation
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-rose-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Wales:</strong> Covered by the RRFSO (England and Wales). Fire safety
                      is not a devolved matter, so the RRFSO applies in full
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 02 Scope & Application ─── */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <span className="text-rose-400/80 text-sm font-normal">02</span>
            Scope &amp; Application
          </h2>
          <div className="border-l-2 border-rose-500/30 pl-4 sm:pl-6">
            <div className="space-y-4 text-white">
              <p>
                The RRFSO applies to virtually <strong>all non-domestic premises</strong> in
                England and Wales. Its scope is deliberately broad to ensure that no workplace or
                public building falls outside the fire safety framework. Understanding what is
                and is not covered is essential for the responsible person.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-rose-400 font-medium mb-3">
                  <CheckCircle className="inline h-4 w-4 mr-1.5 -mt-0.5" />
                  Premises Covered by the RRFSO
                </h3>
                <div className="grid sm:grid-cols-2 gap-3 text-sm">
                  <ul className="text-white space-y-2">
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                      <span>Workplaces (offices, factories, warehouses)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                      <span>Commercial premises (shops, restaurants, pubs)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                      <span>Industrial premises (manufacturing, processing)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                      <span>Hospitals, care homes, and healthcare facilities</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                      <span>Educational establishments (schools, colleges, universities)</span>
                    </li>
                  </ul>
                  <ul className="text-white space-y-2">
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                      <span>Places of assembly (theatres, cinemas, sports grounds)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                      <span>Common areas of residential buildings (corridors, stairwells, lobbies)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                      <span>Hotels, hostels, and boarding houses</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                      <span>Places of worship (churches, mosques, temples)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                      <span>Outdoor events, tents, marquees, and temporary structures</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <h3 className="text-red-400 font-medium mb-3">
                  <AlertTriangle className="inline h-4 w-4 mr-1.5 -mt-0.5" />
                  Premises NOT Covered by the RRFSO
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-red-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Domestic premises</strong> occupied as a single private dwelling &mdash;
                      this is the most significant exclusion. A house or flat occupied by a single
                      household is not covered
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-red-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Ships</strong> (covered by maritime legislation and the Maritime and
                      Coastguard Agency)
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-red-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Offshore installations</strong> (covered by the Offshore Installations
                      (Prevention of Fire and Explosion, and Emergency Response) Regulations 1995)
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-red-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Mines</strong> within the meaning of the Mines and Quarries Act 1954
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-red-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Construction sites</strong> where the Construction (Design and Management)
                      Regulations 2015 apply (fire safety during the construction phase falls under CDM)
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-rose-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-rose-300">Important Distinction</h3>
                </div>
                <p className="text-white/80 text-sm">
                  The RRFSO applies to the <strong className="text-white">common areas</strong> of
                  blocks of flats (corridors, stairwells, lobbies, car parks) but <strong className="text-white">not</strong> to
                  individual flats themselves. This distinction became critically important after
                  the Grenfell Tower fire and was subsequently clarified by the Fire Safety Act 2021.
                  The responsible person (typically the building owner, landlord, or management company)
                  must ensure fire safety in the common parts.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* ─── 03 Key Articles of the RRFSO ─── */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <span className="text-rose-400/80 text-sm font-normal">03</span>
            Key Articles of the RRFSO
          </h2>
          <div className="border-l-2 border-rose-500/30 pl-4 sm:pl-6">
            <div className="space-y-4 text-white">
              <p>
                The RRFSO is structured as a series of articles, each imposing specific duties on
                the responsible person. Understanding these key articles is fundamental to
                compliance and to the fire marshal role.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-rose-400 font-medium mb-3">
                  <FileText className="inline h-4 w-4 mr-1.5 -mt-0.5" />
                  Article 5 &mdash; The Responsible Person
                </h3>
                <div className="space-y-2 text-sm">
                  <p className="text-white/80">
                    Article 5 defines who bears the primary duty for fire safety:
                  </p>
                  <ul className="text-white space-y-2">
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                      <span>
                        <strong>(a) The employer</strong>, if the workplace is to any extent under
                        their control
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                      <span>
                        <strong>(b) Any person who has control</strong> of the premises in connection
                        with carrying on a trade, business, or other undertaking (for profit or not)
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                      <span>
                        <strong>(c) The owner</strong>, where the person in control of the premises
                        does not have control in connection with a trade, business, or undertaking
                      </span>
                    </li>
                  </ul>
                  <p className="text-white/80 mt-2">
                    In practice, the responsible person is usually the employer, the building
                    owner, the landlord, or the managing agent. In multi-tenanted buildings, there
                    may be more than one responsible person, each responsible for the areas under
                    their control.
                  </p>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-rose-400 font-medium mb-3">
                  <FileText className="inline h-4 w-4 mr-1.5 -mt-0.5" />
                  Article 8 &mdash; Duty to Take General Fire Precautions
                </h3>
                <div className="space-y-2 text-sm text-white/80">
                  <p>
                    The responsible person must take such general fire precautions as will ensure,
                    so far as is reasonably practicable, the safety of any of their employees and,
                    in relation to relevant persons who are not employees, take such general fire
                    precautions as may reasonably be required to ensure that the premises are safe.
                  </p>
                  <p>
                    &ldquo;General fire precautions&rdquo; is broadly defined and includes measures
                    to reduce the risk of fire, measures to reduce the risk of the spread of fire,
                    and measures to secure the means of escape in case of fire.
                  </p>
                </div>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <h3 className="text-rose-400 font-medium mb-3">
                  <ClipboardList className="inline h-4 w-4 mr-1.5 -mt-0.5" />
                  Article 9 &mdash; Fire Risk Assessment (Mandatory)
                </h3>
                <div className="space-y-2 text-sm text-white/80">
                  <p className="text-rose-300 font-semibold text-xs uppercase tracking-wider mb-2">
                    The Cornerstone of the RRFSO
                  </p>
                  <p>
                    The responsible person must make a <strong className="text-white">suitable and
                    sufficient assessment</strong> of the risks to which relevant persons are
                    exposed for the purpose of identifying the general fire precautions they need
                    to take. This fire risk assessment must be:
                  </p>
                  <ul className="text-white space-y-2 mt-2">
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                      <span>Carried out by a competent person (or with the help of a competent person)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                      <span>Recorded in writing if the employer employs 5 or more employees</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                      <span>Reviewed regularly and updated whenever there is reason to suspect it is no longer valid</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                      <span>Implemented &mdash; the findings must be acted upon, not just documented</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-rose-400 font-medium mb-3">
                  <FileText className="inline h-4 w-4 mr-1.5 -mt-0.5" />
                  Article 11 &mdash; Fire Safety Arrangements
                </h3>
                <p className="text-white/80 text-sm">
                  The responsible person must make and give effect to appropriate arrangements for
                  the effective planning, organisation, control, monitoring, and review of fire
                  safety measures. Where 5 or more employees, these arrangements must be recorded
                  in writing. This covers everything from fire detection and alarm systems to
                  evacuation procedures, fire warden rotas, and maintenance schedules.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                  <p className="text-rose-400 font-semibold text-sm mb-1">
                    Article 13 &mdash; Fire-Fighting &amp; Detection
                  </p>
                  <p className="text-white/80 text-xs">
                    Premises must be equipped with appropriate fire-fighting equipment and fire
                    detection and warning systems. Equipment must be easily accessible, simple to
                    use, and indicated by signs.
                  </p>
                </div>
                <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                  <p className="text-rose-400 font-semibold text-sm mb-1">
                    Article 14 &mdash; Emergency Routes &amp; Exits
                  </p>
                  <p className="text-white/80 text-xs">
                    Routes to emergency exits and the exits themselves must be kept clear at all
                    times. Emergency doors must open in the direction of escape. Routes and exits
                    must be indicated by signs and adequately illuminated.
                  </p>
                </div>
                <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                  <p className="text-rose-400 font-semibold text-sm mb-1">
                    Article 15 &mdash; Serious &amp; Imminent Danger
                  </p>
                  <p className="text-white/80 text-xs">
                    Procedures must be established for serious and imminent danger and for danger
                    areas. Nominated competent persons must implement evacuation procedures.
                    Persons must be able to stop work and proceed to a place of safety immediately.
                  </p>
                </div>
                <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                  <p className="text-rose-400 font-semibold text-sm mb-1">
                    Article 17 &mdash; Maintenance
                  </p>
                  <p className="text-white/80 text-xs">
                    All facilities, equipment, and devices provided for fire safety must be
                    maintained in an efficient state, in efficient working order, and in good
                    repair. This includes fire alarms, emergency lighting, fire doors, and
                    extinguishers.
                  </p>
                </div>
                <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                  <p className="text-rose-400 font-semibold text-sm mb-1">
                    Article 18 &mdash; Safety Assistance
                  </p>
                  <p className="text-white/80 text-xs">
                    The responsible person must appoint one or more competent persons to assist
                    them in implementing the fire safety measures required by the Order. A person
                    is competent if they have sufficient training, experience, and knowledge.
                  </p>
                </div>
                <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                  <p className="text-rose-400 font-semibold text-sm mb-1">
                    Article 21 &mdash; Training
                  </p>
                  <p className="text-white/80 text-xs">
                    The responsible person must ensure that employees are provided with adequate
                    fire safety training at the time they are first employed, and whenever exposed
                    to new or increased risks. Training must be repeated periodically and adapted
                    to take account of any new or changed risks.
                  </p>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                <p className="text-rose-400 font-semibold text-sm mb-1">
                  Article 22 &mdash; Cooperation &amp; Coordination
                </p>
                <p className="text-white/80 text-xs">
                  Where two or more responsible persons share or have duties in respect of the
                  same premises, they must cooperate with each other, coordinate their fire safety
                  measures, and inform each other of the risks they have identified. This is
                  particularly important in multi-tenanted buildings, shared commercial units, and
                  shopping centres where multiple businesses occupy the same structure.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 04 The Risk-Based Approach ─── */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <span className="text-rose-400/80 text-sm font-normal">04</span>
            The Risk-Based Approach
          </h2>
          <div className="border-l-2 border-rose-500/30 pl-4 sm:pl-6">
            <div className="space-y-4 text-white">
              <p>
                The RRFSO introduced a fundamental shift in how fire safety is managed in England
                and Wales: from a <strong>prescriptive</strong> system to a <strong>risk-based</strong> one.
                This is the single most important conceptual change to understand.
              </p>

              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                  <h3 className="text-red-400 font-semibold mb-2">
                    Old System (Pre-2005): Prescriptive
                  </h3>
                  <ul className="text-white space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-red-400" />
                      <span>Fire authority inspected premises and issued a fire certificate</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-red-400" />
                      <span>Certificate specified exact requirements (number of extinguishers, type of alarm, etc.)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-red-400" />
                      <span>Duty holder simply had to comply with the certificate conditions</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-red-400" />
                      <span>No requirement for the duty holder to understand fire risks</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
                  <h3 className="text-green-400 font-semibold mb-2">
                    New System (RRFSO): Risk-Based
                  </h3>
                  <ul className="text-white space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                      <span>No more fire certificates &mdash; abolished completely</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                      <span>Responsible person must carry out their own fire risk assessment</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                      <span>Responsible person decides what precautions are needed based on the assessment</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                      <span>Fire and rescue authority enforces compliance (self-compliance model with oversight)</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <ShieldCheck className="h-5 w-5 text-rose-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-rose-300">Self-Compliance Model</h3>
                </div>
                <p className="text-white/80 text-sm">
                  The RRFSO places the primary responsibility for fire safety on the
                  <strong className="text-white"> responsible person</strong>, not on the fire
                  authority. The responsible person must assess, plan, implement, and monitor fire
                  safety measures. The fire and rescue authority&rsquo;s role is to
                  <strong className="text-white"> enforce compliance</strong> through inspections,
                  audits, and (where necessary) enforcement action. This model requires the
                  responsible person to be proactive and knowledgeable about fire risks, rather
                  than passively waiting for the fire authority to tell them what to do.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-rose-400 font-medium mb-3">
                  The Five-Step Fire Risk Assessment Process
                </h3>
                <div className="space-y-3">
                  {[
                    {
                      step: "1",
                      title: "Identify Fire Hazards",
                      desc: "Sources of ignition, sources of fuel, sources of oxygen",
                    },
                    {
                      step: "2",
                      title: "Identify People at Risk",
                      desc: "Employees, visitors, disabled persons, sleeping occupants, lone workers",
                    },
                    {
                      step: "3",
                      title: "Evaluate, Remove, Reduce, and Protect",
                      desc: "Evaluate the risk, remove or reduce hazards, protect people from remaining risk",
                    },
                    {
                      step: "4",
                      title: "Record, Plan, Inform, Instruct, and Train",
                      desc: "Document findings, create emergency plan, train all staff",
                    },
                    {
                      step: "5",
                      title: "Review",
                      desc: "Keep assessment under review; update when premises, activities, or occupants change",
                    },
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="w-7 h-7 rounded-full bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-400 font-bold text-xs flex-shrink-0">
                        {item.step}
                      </div>
                      <div className="flex-1 bg-white/5 border border-white/10 p-2.5 rounded-lg">
                        <p className="text-rose-400 font-semibold text-sm">{item.title}</p>
                        <p className="text-white/70 text-xs">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* ─── 05 Enforcement & Penalties ─── */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <span className="text-rose-400/80 text-sm font-normal">05</span>
            Enforcement &amp; Penalties
          </h2>
          <div className="border-l-2 border-rose-500/30 pl-4 sm:pl-6">
            <div className="space-y-4 text-white">
              <p>
                The RRFSO is enforced by <strong>fire and rescue authorities</strong> in England
                and Wales. Fire safety inspectors (often called enforcing officers) have extensive
                powers to enter premises, inspect fire safety measures, and take enforcement action
                where they find non-compliance.
              </p>

              <div className="space-y-3">
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <h3 className="text-rose-400 font-semibold mb-2">
                    Informal Advice &amp; Education
                  </h3>
                  <p className="text-white/80 text-sm">
                    The first response to minor non-compliance is typically informal advice. The
                    fire inspector may advise the responsible person of areas for improvement and
                    provide guidance on how to comply. This is not a formal enforcement action but
                    is recorded and may be followed up on subsequent visits.
                  </p>
                </div>

                <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-lg">
                  <h3 className="text-amber-400 font-semibold mb-2">
                    <Gavel className="inline h-4 w-4 mr-1.5 -mt-0.5" />
                    Alteration Notice (Article 29)
                  </h3>
                  <p className="text-white/80 text-sm">
                    An alteration notice may be served where the premises constitute a serious risk
                    or may constitute such a risk if there is a change in the use of the premises
                    or an increase in the quantities of dangerous substances stored. The notice
                    requires the responsible person to <strong className="text-white">notify the
                    fire authority before making specified changes</strong> to the premises or their
                    use. It does not require immediate remedial action but restricts future changes.
                  </p>
                </div>

                <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-lg">
                  <h3 className="text-amber-400 font-semibold mb-2">
                    <Gavel className="inline h-4 w-4 mr-1.5 -mt-0.5" />
                    Enforcement Notice (Article 30)
                  </h3>
                  <p className="text-white/80 text-sm">
                    An enforcement notice is served where the inspector is of the opinion that the
                    responsible person has failed to comply with any provision of the Order. The
                    notice specifies the steps that must be taken to remedy the failure and sets a
                    <strong className="text-white"> time limit for compliance</strong>. Failure to
                    comply with an enforcement notice is a criminal offence.
                  </p>
                </div>

                <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                  <h3 className="text-red-400 font-semibold mb-2">
                    <AlertTriangle className="inline h-4 w-4 mr-1.5 -mt-0.5" />
                    Prohibition Notice (Article 31)
                  </h3>
                  <p className="text-white/80 text-sm">
                    The most serious enforcement action. A prohibition notice can be served where
                    the use of premises involves or will involve a <strong className="text-white">risk
                    to relevant persons so serious that use of the premises ought to be prohibited
                    or restricted</strong>. If the risk is imminent, the notice takes
                    <strong className="text-white"> immediate effect</strong> &mdash; effectively
                    closing the premises or restricting their use until the specified matters are
                    remedied. There is a right of appeal, but the prohibition remains in force
                    during the appeal process unless the court directs otherwise.
                  </p>
                </div>
              </div>

              <div className="bg-red-500/15 border border-red-500/40 p-4 rounded-lg">
                <h3 className="text-red-300 font-semibold mb-2">Criminal Offences &amp; Penalties</h3>
                <p className="text-white/80 text-sm mb-3">
                  Breach of the RRFSO constitutes a criminal offence. The penalties are severe:
                </p>
                <ul className="text-white space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong>On summary conviction (magistrates&rsquo; court):</strong> unlimited
                      fine (since the Legal Aid, Sentencing and Punishment of Offenders Act 2012
                      removed the statutory cap)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong>On indictment (Crown Court):</strong> unlimited fine and/or up to
                      <strong> 2 years&rsquo; imprisonment</strong>
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong>Corporate manslaughter:</strong> where a gross management failure
                      causes death, the Corporate Manslaughter and Corporate Homicide Act 2007
                      may apply, with unlimited fines and mandatory publicity orders
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong>Individual liability:</strong> where an offence is committed with
                      the consent, connivance, or neglect of a director, manager, or similar
                      officer, that individual can be prosecuted personally under Article 32
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-rose-400 font-medium mb-3">
                  <Gavel className="inline h-4 w-4 mr-1.5 -mt-0.5" />
                  Notable Prosecutions
                </h3>
                <div className="space-y-4 text-sm">
                  <div className="border-b border-white/10 pb-3">
                    <p className="text-rose-300 font-semibold mb-1">
                      R v. Knaresborough Properties Ltd (2020)
                    </p>
                    <p className="text-white/80">
                      A residential landlord was fined <strong className="text-white">&pound;150,000</strong> after
                      a fire and rescue authority audit found no fire risk assessment, no fire
                      detection system in common areas, blocked escape routes, and fire doors
                      propped open in a large HMO. The court noted that the failings were
                      &ldquo;systemic and long-standing&rdquo;.
                    </p>
                  </div>
                  <div className="border-b border-white/10 pb-3">
                    <p className="text-rose-300 font-semibold mb-1">
                      LFB v. Shepherd&rsquo;s Bush Housing Group (2019)
                    </p>
                    <p className="text-white/80">
                      A housing association was fined <strong className="text-white">&pound;270,000</strong> following
                      a fire in a block of flats where the fire risk assessment had not been reviewed
                      for over five years, compartmentation was breached, and fire doors were missing
                      or defective. The case demonstrated that responsible persons must keep
                      assessments <strong className="text-white">under active review</strong>.
                    </p>
                  </div>
                  <div>
                    <p className="text-rose-300 font-semibold mb-1">
                      R v. Horizon Housing Group (2021)
                    </p>
                    <p className="text-white/80">
                      A care home operator received a fine of <strong className="text-white">&pound;400,000</strong> after
                      an inspection revealed failures in fire detection, staff training, and
                      personal emergency evacuation plans (PEEPs) for residents with mobility
                      impairments. The judge emphasised the particular vulnerability of care home
                      residents and the heightened duty of care owed to them.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 06 The Grenfell Factor ─── */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <span className="text-rose-400/80 text-sm font-normal">06</span>
            The Grenfell Factor
          </h2>
          <div className="border-l-2 border-rose-500/30 pl-4 sm:pl-6">
            <div className="space-y-4 text-white">
              <p>
                The Grenfell Tower fire on 14 June 2017, which killed 72 people, was the most
                significant event in UK fire safety in a generation. It exposed fundamental
                failures in the building safety regime and led to major legislative changes that
                amended and strengthened the RRFSO.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-rose-400 font-medium mb-3">
                  <Flame className="inline h-4 w-4 mr-1.5 -mt-0.5" />
                  Fire Safety Act 2021 (Amendment to RRFSO)
                </h3>
                <div className="space-y-3 text-sm">
                  <p className="text-white/80">
                    The Fire Safety Act 2021 was a direct response to the legal ambiguity exposed
                    by the Grenfell Tower fire. Before this Act, there was uncertainty about whether
                    the <strong className="text-white">external walls</strong> and
                    <strong className="text-white"> flat entrance doors</strong> of multi-occupied
                    residential buildings fell within the scope of the RRFSO. The Act clarified that:
                  </p>
                  <ul className="text-white space-y-2">
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                      <span>
                        The RRFSO applies to the <strong>structure and external walls</strong> of
                        multi-occupied residential buildings, including cladding, balconies, and
                        windows
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                      <span>
                        The RRFSO applies to <strong>flat entrance doors</strong> in such buildings
                        (the doors between individual flats and the common parts)
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                      <span>
                        The responsible person must include these elements in their
                        <strong> fire risk assessment</strong> and take appropriate precautions
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-rose-400 font-medium mb-3">
                  <Building className="inline h-4 w-4 mr-1.5 -mt-0.5" />
                  Building Safety Act 2022
                </h3>
                <div className="space-y-2 text-sm text-white/80">
                  <p>
                    The Building Safety Act 2022 introduced a comprehensive new regime for
                    higher-risk buildings (defined as residential buildings at least 18 metres in
                    height or with at least 7 storeys, and containing at least 2 residential units).
                    Key provisions include:
                  </p>
                  <ul className="text-white space-y-2">
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                      <span>
                        Creation of the <strong>Building Safety Regulator</strong> (within the HSE)
                        to oversee the safety of higher-risk buildings
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                      <span>
                        <strong>Accountable persons</strong> and <strong>principal accountable
                        persons</strong> with duties to assess and manage building safety risks
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                      <span>
                        Mandatory <strong>safety case</strong> regime for higher-risk buildings
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                      <span>
                        <strong>Golden thread</strong> of building information that must be maintained
                        throughout the building&rsquo;s lifecycle
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-rose-400 font-medium mb-3">
                  <FileText className="inline h-4 w-4 mr-1.5 -mt-0.5" />
                  Fire Safety (England) Regulations 2022
                </h3>
                <div className="space-y-2 text-sm text-white/80">
                  <p>
                    Made under the RRFSO (as amended by the Fire Safety Act 2021), these
                    regulations impose <strong className="text-white">specific new duties</strong> on
                    responsible persons for multi-occupied residential buildings:
                  </p>
                  <ul className="text-white space-y-2">
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                      <span>
                        Responsible persons must share <strong>fire safety information</strong> with
                        residents, including fire risk assessment findings and fire safety instructions
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                      <span>
                        In buildings over 11 metres: quarterly checks of all <strong>fire doors</strong> in
                        common parts and annual checks of flat entrance doors
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                      <span>
                        In buildings over 18 metres: provide <strong>floor plans</strong> to the fire
                        service, install <strong>wayfinding signage</strong>, and provide information
                        about the building&rsquo;s design and the materials used in external walls
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                      <span>
                        Report fire safety deficiencies in the <strong>external wall system</strong> to
                        the fire and rescue authority
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-rose-400 font-medium mb-3">
                  Grenfell Tower Inquiry Recommendations
                </h3>
                <div className="space-y-2 text-sm text-white/80">
                  <p>
                    The Grenfell Tower Inquiry (Phase 1 and Phase 2 reports) made numerous
                    recommendations affecting fire safety, including:
                  </p>
                  <ul className="text-white space-y-2">
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                      <span>
                        Mandatory <strong>personal emergency evacuation plans (PEEPs)</strong> for
                        disabled residents in high-rise residential buildings
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                      <span>
                        Regular testing and <strong>inspection of fire doors</strong> in all
                        multi-occupied residential buildings
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                      <span>
                        The fire and rescue service to be given access to <strong>building plans
                        and information</strong> about external wall materials before any fire
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                      <span>
                        Review of the &ldquo;<strong>stay put</strong>&rdquo; policy in high-rise
                        buildings, with clear guidance on when and how to move to simultaneous
                        evacuation
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* ─── 07 Interaction with Other Legislation ─── */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <span className="text-rose-400/80 text-sm font-normal">07</span>
            Interaction with Other Legislation
          </h2>
          <div className="border-l-2 border-rose-500/30 pl-4 sm:pl-6">
            <div className="space-y-4 text-white">
              <p>
                The RRFSO does not operate in isolation. It sits within a wider framework of
                health, safety, building, and housing legislation. A fire marshal must understand
                how these different pieces of legislation interact and complement each other.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-rose-400 font-medium mb-3">
                  <Scale className="inline h-4 w-4 mr-1.5 -mt-0.5" />
                  Key Legislative Interactions
                </h3>
                <div className="grid sm:grid-cols-2 gap-3 text-sm">
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-rose-400 font-semibold text-sm mb-1">
                      HASAWA 1974
                    </p>
                    <p className="text-white/80 text-xs">
                      The overarching health and safety framework. The RRFSO is the fire-specific
                      legislation, but HASAWA still applies to workplace fire safety in terms of
                      the employer&rsquo;s general duty of care (Section 2) and the duty to
                      non-employees (Section 3). Article 12 of the RRFSO links to HASAWA through
                      dangerous substance requirements.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-rose-400 font-semibold text-sm mb-1">
                      Management of H&amp;S at Work Regs 1999
                    </p>
                    <p className="text-white/80 text-xs">
                      The general risk assessment duty under Regulation 3 complements the fire
                      risk assessment under RRFSO Article 9. The principles of competent assistance
                      (Reg 7), information to employees (Reg 10), and cooperation and coordination
                      between employers sharing a workplace (Reg 11) all align with RRFSO
                      requirements.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-rose-400 font-semibold text-sm mb-1">
                      CDM 2015
                    </p>
                    <p className="text-white/80 text-xs">
                      During the construction phase, fire safety falls under CDM 2015, not the
                      RRFSO. The principal contractor is responsible for fire safety on the
                      construction site. However, once the building is handed over and occupied,
                      the RRFSO applies. The health and safety file under CDM should contain fire
                      safety information to assist the responsible person.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-rose-400 font-semibold text-sm mb-1">
                      Building Regulations Part B
                    </p>
                    <p className="text-white/80 text-xs">
                      Part B of the Building Regulations (Fire Safety) sets the standards for
                      fire safety in the design and construction of buildings. It covers means of
                      warning, means of escape, internal fire spread (linings and structure),
                      external fire spread, and access and facilities for the fire service. The
                      RRFSO applies to fire safety <em>in use</em>, while Part B applies at the
                      <em> design and build</em> stage.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-rose-400 font-semibold text-sm mb-1">
                      Housing Act 2004
                    </p>
                    <p className="text-white/80 text-xs">
                      For HMOs (houses in multiple occupation), the Housing Act 2004 provides
                      additional fire safety requirements through the HMO licensing regime. The
                      Housing Health and Safety Rating System (HHSRS) assesses fire as a Category 1
                      hazard. Both the fire and rescue authority (under RRFSO) and the local
                      housing authority (under the Housing Act) may enforce fire safety in HMOs.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-rose-400 font-semibold text-sm mb-1">
                      Licensing Act 2003
                    </p>
                    <p className="text-white/80 text-xs">
                      Premises licensed for the sale of alcohol or the provision of entertainment
                      are subject to licensing conditions, which may include fire safety
                      requirements. The fire and rescue authority is a responsible authority
                      under the Licensing Act and can make representations about fire safety
                      when licences are granted or reviewed.
                    </p>
                  </div>
                </div>
              </div>

              {/* Legislative Timeline Diagram */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-rose-400 font-medium mb-4 text-centre">
                  Legislative Timeline &mdash; Fire Safety in England &amp; Wales
                </h3>
                <div className="space-y-2">
                  {[
                    {
                      year: "1971",
                      title: "Fire Precautions Act",
                      desc: "Fire certificate system introduced &mdash; prescriptive approach",
                      colour: "bg-white/20 border-white/30",
                      textColour: "text-white/60",
                    },
                    {
                      year: "1974",
                      title: "HASAWA",
                      desc: "Overarching health and safety framework established",
                      colour: "bg-white/20 border-white/30",
                      textColour: "text-white/60",
                    },
                    {
                      year: "1997",
                      title: "Fire Precautions (Workplace) Regs",
                      desc: "Additional layer of workplace fire safety regulations",
                      colour: "bg-white/20 border-white/30",
                      textColour: "text-white/60",
                    },
                    {
                      year: "2005",
                      title: "RRFSO Enacted",
                      desc: "Single risk-based framework consolidating 70+ pieces of legislation",
                      colour: "bg-rose-500/20 border-rose-500/40",
                      textColour: "text-rose-400",
                    },
                    {
                      year: "2006",
                      title: "RRFSO In Force (1 Oct)",
                      desc: "Fire certificates abolished, self-compliance model begins",
                      colour: "bg-rose-500/20 border-rose-500/40",
                      textColour: "text-rose-400",
                    },
                    {
                      year: "2017",
                      title: "Grenfell Tower Fire (14 Jun)",
                      desc: "72 deaths expose systemic failures in building and fire safety",
                      colour: "bg-red-500/20 border-red-500/40",
                      textColour: "text-red-400",
                    },
                    {
                      year: "2021",
                      title: "Fire Safety Act",
                      desc: "Amends RRFSO to cover external walls and flat entrance doors",
                      colour: "bg-rose-500/20 border-rose-500/40",
                      textColour: "text-rose-400",
                    },
                    {
                      year: "2022",
                      title: "Building Safety Act / FS(E) Regs",
                      desc: "New building safety regime + specific duties for residential buildings",
                      colour: "bg-rose-500/20 border-rose-500/40",
                      textColour: "text-rose-400",
                    },
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className={`w-14 text-right flex-shrink-0 ${item.textColour} font-bold text-xs pt-2`}>
                        {item.year}
                      </div>
                      <div className="flex flex-col items-center">
                        <div className={`w-3 h-3 rounded-full border-2 flex-shrink-0 ${item.colour}`} />
                        {idx < 7 && <div className="w-0.5 flex-1 bg-white/10 mt-0.5" />}
                      </div>
                      <div className={`flex-1 border p-2.5 rounded-lg mb-1 ${item.colour}`}>
                        <p className={`font-semibold text-sm ${item.textColour}`}>{item.title}</p>
                        <p className="text-white/60 text-xs">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Regulatory Interaction Diagram */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-rose-400 font-medium mb-4 text-centre">
                  Regulatory Framework &mdash; How the Legislation Connects
                </h3>
                <div className="flex flex-col items-center gap-2">
                  {/* Top Level */}
                  <div className="bg-rose-500/20 border border-rose-500/40 px-4 py-2 rounded-lg text-centre w-full max-w-md">
                    <p className="text-rose-400 font-bold text-sm">HASAWA 1974</p>
                    <p className="text-white/60 text-xs">
                      Overarching health and safety framework
                    </p>
                  </div>
                  <div className="w-0.5 h-4 bg-rose-500/30" />

                  {/* RRFSO Level */}
                  <div className="bg-rose-500/15 border-2 border-rose-500/50 px-4 py-3 rounded-lg text-centre w-full max-w-md">
                    <p className="text-rose-400 font-bold text-sm">
                      RRFSO 2005 (as amended)
                    </p>
                    <p className="text-white/60 text-xs">
                      Fire Safety Act 2021 + Fire Safety (England) Regulations 2022
                    </p>
                  </div>
                  <div className="w-0.5 h-4 bg-rose-500/30" />

                  {/* Supporting Level */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 w-full max-w-lg">
                    {[
                      { name: "MHSWR 1999", desc: "Risk assessment" },
                      { name: "CDM 2015", desc: "Construction phase" },
                      { name: "Building Regs Part B", desc: "Design & build" },
                      { name: "Housing Act 2004", desc: "HMO licensing" },
                      { name: "Licensing Act 2003", desc: "Licensed premises" },
                      { name: "BSA 2022", desc: "Higher-risk buildings" },
                    ].map((reg, idx) => (
                      <div
                        key={idx}
                        className="bg-white/5 border border-white/15 px-2 py-2 rounded-lg text-centre"
                      >
                        <p className="text-rose-400 font-semibold text-xs">{reg.name}</p>
                        <p className="text-white/50 text-[10px]">{reg.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <ShieldCheck className="h-5 w-5 text-rose-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-rose-300">For Electricians &amp; Fire Marshals</h3>
                </div>
                <p className="text-white/80 text-sm">
                  As an electrician working as a fire marshal, understanding the RRFSO is essential
                  because your electrical work directly affects fire safety. Electrical faults are
                  one of the most common causes of workplace fires. Your knowledge of
                  BS 7671 (wiring regulations), circuit protection, cable selection, and fire-rated
                  installations must be combined with an understanding of the RRFSO requirements for
                  fire detection, emergency lighting, fire alarm systems, and the maintenance
                  obligations under Article 17. The responsible person relies on competent persons
                  like you to ensure that electrical installations do not create fire hazards and
                  that fire safety systems are properly installed and maintained.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Key Takeaways ─── */}
        <section className="mb-10">
          <div className="border-l-2 border-rose-500/30 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-rose-400/80 text-sm font-normal">08</span>
              Key Takeaways
            </h2>
            <div className="space-y-4 text-white">
              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <ul className="text-white space-y-3 text-sm">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-rose-500 mt-0.5 flex-shrink-0" />
                    <span>
                      The <strong>RRFSO 2005</strong> replaced over 70 pieces of fire safety
                      legislation with a single risk-based framework, coming into force on
                      <strong> 1 October 2006</strong> in England and Wales.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-rose-500 mt-0.5 flex-shrink-0" />
                    <span>
                      It applies to virtually <strong>all non-domestic premises</strong>, including
                      the common areas of residential buildings, but not to individual private
                      dwellings.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-rose-500 mt-0.5 flex-shrink-0" />
                    <span>
                      The <strong>responsible person</strong> (employer, building owner, or managing
                      agent) has the primary duty to carry out a fire risk assessment and implement
                      appropriate fire precautions.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-rose-500 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Article 9</strong> (fire risk assessment) is the cornerstone of the
                      Order &mdash; the shift from prescriptive fire certificates to risk-based
                      self-compliance is the fundamental change.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-rose-500 mt-0.5 flex-shrink-0" />
                    <span>
                      Enforcement by the <strong>fire and rescue authority</strong> includes alteration
                      notices, enforcement notices, and prohibition notices (which can take
                      immediate effect).
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-rose-500 mt-0.5 flex-shrink-0" />
                    <span>
                      Penalties include <strong>unlimited fines</strong> and up to
                      <strong> 2 years&rsquo; imprisonment</strong> on conviction on indictment.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-rose-500 mt-0.5 flex-shrink-0" />
                    <span>
                      The <strong>Fire Safety Act 2021</strong> and <strong>Fire Safety (England)
                      Regulations 2022</strong> strengthened the RRFSO following the Grenfell Tower
                      tragedy, clarifying its application to external walls and flat entrance doors.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-rose-500 mt-0.5 flex-shrink-0" />
                    <span>
                      The RRFSO interacts with <strong>HASAWA 1974</strong>, MHSWR 1999, CDM 2015,
                      Building Regulations Part B, the Housing Act 2004, and the Licensing Act 2003.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ─── FAQs ─── */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-6 flex items-center gap-2">
            <span className="text-rose-400/80 text-sm font-normal">09</span>
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border-b border-white/10 pb-4 last:border-b-0 last:pb-0"
              >
                <h3 className="font-semibold text-white mb-2">{faq.question}</h3>
                <p className="text-white/80 text-sm leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ─── Quiz ─── */}
        <div className="mt-12">
          <Quiz
            title="The RRFSO 2005 Quiz"
            questions={quizQuestions}
          />
        </div>

        {/* ─── Bottom Navigation ─── */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[44px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../fire-safety-module-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 2
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[44px] bg-rose-500 text-white hover:bg-rose-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../fire-safety-module-2-section-2">
              The Responsible Person
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
