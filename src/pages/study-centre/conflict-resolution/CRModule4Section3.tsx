import {
  ArrowLeft,
  Scale,
  CheckCircle,
  HelpCircle,
  Gavel,
  FileText,
  Clock,
  PauseCircle,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import useSEO from '@/hooks/useSEO';

const quickCheckQuestions = [
  {
    id: 'cr-4-3-check1',
    question:
      'Under the Construction Act, what is the maximum time allowed for an adjudicator to reach a decision after being appointed?',
    options: [
      '7 days',
      '14 days',
      "28 days (extendable by 14 days with the referring party's consent)",
      '56 days',
    ],
    correctIndex: 2,
    explanation:
      "The adjudicator must reach a decision within 28 days of referral, which can be extended by up to 14 days with the consent of the referring party (the party who started the adjudication). The parties can also agree to a longer period by mutual consent. This tight timescale is one of the key strengths of adjudication — it provides a rapid, binding decision rather than the months or years that court proceedings can take. The adjudicator's decision is binding until the dispute is finally determined by court proceedings, arbitration, or agreement between the parties.",
  },
  {
    id: 'cr-4-3-check2',
    question:
      'What must happen before you can lawfully suspend performance for non-payment under the Construction Act?',
    options: [
      'You can suspend immediately without any notice',
      "You must give at least 7 days' written notice of your intention to suspend, specifying the ground for suspension",
      'You must first obtain a court order authorising suspension',
      'You must wait 90 days after the payment was due',
    ],
    correctIndex: 1,
    explanation:
      "Section 112 of the Construction Act requires you to give at least 7 days' written notice of your intention to suspend performance. The notice must state the ground or grounds for suspension — specifically, that the notified sum has not been paid by the final date for payment and no effective pay-less notice has been served. You cannot suspend without this notice period, even if the non-payment is clear-cut. The 7-day notice gives the paying party one final opportunity to make the payment before suspension takes effect. If they pay during the notice period, you cannot suspend.",
  },
  {
    id: 'cr-4-3-check3',
    question:
      'The Construction Act applies to "construction contracts." Which of the following is specifically excluded from its scope?',
    options: [
      'Electrical installation work on a commercial building',
      'A domestic client having their house rewired',
      'Mechanical and electrical services on a new hospital',
      'Fit-out works in a retail unit',
    ],
    correctIndex: 1,
    explanation:
      'The Construction Act specifically excludes construction contracts with residential occupiers — meaning a homeowner who lives in (or intends to live in) the property. This is the "domestic client" exclusion. If you are working directly for a homeowner on their own home, the Construction Act does not apply to your contract. However, if you are working as a subcontractor on a domestic property (where the MC has the contract with the homeowner), the Construction Act does apply to your subcontract with the MC. The Act also applies to all commercial construction work regardless of scale.',
  },
];

const faqs = [
  {
    question: 'Do I need a solicitor to start an adjudication?',
    answer:
      'No, you do not need a solicitor. Adjudication was specifically designed to be accessible without legal representation, and many successful adjudications are conducted by the parties themselves (known as "party-managed" adjudications). To start an adjudication, you need to prepare a Notice of Adjudication identifying the dispute, the parties, and the redress sought, and send it to the other party and the relevant nominating body (such as the RICS, RIBA, CIArb or the Technology and Construction Solicitors\' Association). The nominating body will appoint an adjudicator within 7 days. You then have 7 days to prepare and submit your Referral Notice, which sets out your case in detail with supporting evidence. That said, for larger or more complex disputes (above approximately £10,000), professional advice can be valuable to ensure your case is presented effectively. Some quantity surveyors and construction consultants specialise in adjudication support at a fraction of solicitor rates.',
  },
  {
    question: "What happens if the other party ignores the adjudicator's decision?",
    answer:
      'An adjudicator\'s decision is binding and must be complied with immediately. If the losing party refuses to pay the amount awarded, the winning party can enforce the decision through the Technology and Construction Court (TCC) using a procedure called "summary judgement." The courts have consistently enforced adjudicators\' decisions, even when the losing party argues the decision was wrong, because the policy of the Construction Act is "pay now, argue later." Enforcement through the TCC is usually straightforward and quick — typically a matter of weeks rather than months. The court will only refuse to enforce a decision in very limited circumstances, such as where the adjudicator did not have jurisdiction over the dispute or where there was a serious breach of natural justice.',
  },
  {
    question:
      'Can I still go to adjudication if my contract does not include an adjudication clause?',
    answer:
      "Yes. The right to adjudication under Section 108 of the Construction Act is a statutory right that exists regardless of what your contract says. If your contract does not include an adjudication clause, or includes a clause that does not comply with the Act's requirements, the Scheme for Construction Contracts 1998 implies compliant adjudication provisions into your contract automatically. This means you always have the right to refer a dispute to adjudication, at any time, on any construction contract (excluding domestic client contracts). The other party cannot prevent you from exercising this right, even if the contract expressly excludes adjudication.",
  },
  {
    question: 'How much does adjudication typically cost?',
    answer:
      'The costs of adjudication vary depending on the complexity of the dispute and whether you use professional representation. The adjudicator\'s fees typically range from £2,000 to £8,000 for a straightforward payment dispute, though complex technical disputes can cost significantly more. If you manage the adjudication yourself without legal representation, the adjudicator\'s fee will be your main cost. If you engage a solicitor or construction consultant, their fees will be additional. Unlike court proceedings, there is generally no "loser pays" rule in adjudication — each party bears their own costs regardless of the outcome (unless the contract specifies otherwise). For a clear-cut payment dispute of £5,000 or more with good documentation, adjudication is usually cost-effective. For smaller amounts, the costs may outweigh the recovery.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'What is the full title of the legislation commonly known as "the Construction Act"?',
    options: [
      'The Construction Industry Payment Act 1996',
      'The Housing Grants, Construction and Regeneration Act 1996',
      'The Building and Construction Disputes Act 1996',
      'The Construction Contracts and Adjudication Act 1996',
    ],
    correctAnswer: 1,
    explanation:
      'The full title is the Housing Grants, Construction and Regeneration Act 1996 (HGCRA 1996). It is commonly referred to as "the Construction Act" within the industry. The Act was significantly amended by Part 8 of the Local Democracy, Economic Development and Construction Act 2009 (LDEDCA 2009), which came into force on 1 October 2011. The 2009 amendments strengthened payment provisions, extended coverage to oral contracts, and enhanced the right to suspend performance.',
  },
  {
    id: 2,
    question:
      'Which of the following disputes can be referred to adjudication under the Construction Act?',
    options: [
      'Only payment disputes',
      'Only disputes about workmanship quality',
      'Any dispute arising under a construction contract',
      'Only disputes worth more than £10,000',
    ],
    correctAnswer: 2,
    explanation:
      'Section 108 of the Construction Act gives any party to a construction contract the right to refer "a dispute arising under the contract" to adjudication at any time. This is not limited to payment disputes — it includes disputes about quality, programme, variations, extensions of time, damages, termination, and any other matter arising from the contract. There is no minimum value threshold. However, in practice, payment disputes are the most common type of dispute referred to adjudication because the payment provisions of the Act create clear, enforceable rights.',
  },
  {
    id: 3,
    question:
      'If the paying party fails to issue a payment notice within the required timeframe, what happens?',
    options: [
      'The payment application is automatically rejected',
      'The paying party has an additional 14 days to issue the notice',
      "The amount stated in the payee's payment application becomes the notified sum and must be paid in full",
      'The contract is automatically terminated',
    ],
    correctAnswer: 2,
    explanation:
      'If the paying party (usually the main contractor) fails to issue a payment notice within 5 days of the due date, the amount stated in the payee\'s (subcontractor\'s) own payment application becomes the "notified sum." This is a powerful default mechanism — it means that if the MC ignores your payment application, the full amount you applied for becomes payable. The MC can still issue a pay-less notice to reduce the amount, but only if they do so within the required timeframe (at least 7 days before the final date for payment). If they miss both deadlines, they must pay the full amount of your application.',
  },
  {
    id: 4,
    question: 'What is the purpose of a pay-less notice under the Construction Act?',
    options: [
      'To confirm the full amount of the payment application will be paid',
      'To notify the payee that the paying party intends to pay less than the notified sum, stating the amount and the basis for the reduction',
      'To terminate the construction contract',
      "To suspend the payee's right to adjudication",
    ],
    correctAnswer: 1,
    explanation:
      'A pay-less notice is the mechanism by which the paying party notifies the payee that they intend to pay less than the notified sum. The pay-less notice must state the sum considered due by the payer and the basis on which that sum is calculated. It must be served no later than a prescribed period before the final date for payment (typically 7 days, though the contract may specify a different period, provided it is no less than the statutory minimum). Without a valid pay-less notice, the paying party must pay the full notified sum, even if they genuinely believe a lower amount is due.',
  },
  {
    id: 5,
    question: 'Under the Construction Act, when can a "pay when paid" clause be relied upon?',
    options: [
      'Whenever the MC has not been paid by the client',
      "When the MC has provided 30 days' notice",
      'Only when the party from whom payment is due has become insolvent',
      'Never — they are always ineffective',
    ],
    correctAnswer: 2,
    explanation:
      'Section 113 of the Construction Act renders "pay when paid" clauses ineffective, with one exception: the clause can be relied upon if the party from whom payment is due under the upstream contract has become insolvent. "Insolvent" is defined in the Act and includes administration, liquidation, and certain other insolvency processes. The insolvency exception recognises that if the ultimate source of funding has collapsed, it may be impossible for the MC to pay. In all other circumstances, the MC\'s obligation to pay you is independent of whether they have been paid themselves.',
  },
  {
    id: 6,
    question:
      'What costs can you claim if you exercise your right to suspend performance for non-payment?',
    options: [
      'No additional costs — suspension is at your own expense',
      'Only the cost of materials left on site',
      'Reasonable costs of exercising the right of suspension, including an appropriate extension of time',
      'Unlimited damages including lost future profits',
    ],
    correctAnswer: 2,
    explanation:
      'Section 112(3A) of the Construction Act (inserted by the 2009 amendments) provides that where the right to suspend performance is exercised, the party exercising it is entitled to an extension of time for the period of suspension and to recover any reasonable costs incurred as a consequence of the suspension. Reasonable costs include costs of standing down labour, securing the site, and demobilisation/remobilisation. This provision was added by the 2009 amendments to address the concern that subcontractors were reluctant to exercise the suspension right because they feared absorbing the costs.',
  },
  {
    id: 7,
    question:
      'A nominating body has 7 days to appoint an adjudicator after receiving a Notice of Adjudication. What happens next?',
    options: [
      'The adjudicator visits the site and inspects the work',
      'The referring party submits their Referral Notice to the adjudicator within 7 days of appointment',
      'The responding party submits their defence within 7 days',
      "Both parties attend a hearing at the nominating body's offices",
    ],
    correctAnswer: 1,
    explanation:
      "After the adjudicator is appointed, the referring party (the party who started the adjudication) has 7 days to prepare and submit their Referral Notice. The Referral Notice is the detailed statement of the referring party's case, including all relevant facts, arguments, and supporting evidence (documents, photographs, calculations, etc.). This is the referring party's opportunity to present their full case. The responding party then typically has 14 days to submit their Response. The adjudicator may request further information, hold a meeting, or visit the site if they consider it necessary — but they are not required to do any of these things.",
  },
  {
    id: 8,
    question:
      'You are owed £8,000 for completed electrical work. The MC has not paid and did not issue a valid pay-less notice. Is adjudication a suitable option?',
    options: [
      'No — adjudication is only for disputes over £50,000',
      'Yes — this is a clear-cut payment dispute with strong grounds, and the amount justifies the cost of adjudication',
      'No — you should wait at least 6 months before considering adjudication',
      'Yes — but only if you hire a barrister to represent you',
    ],
    correctAnswer: 1,
    explanation:
      'This is an ideal case for adjudication. The dispute is straightforward (non-payment of a notified sum without a valid pay-less notice), the evidence is clear (your payment application, the absence of a payment notice, the absence of a pay-less notice, the missed final date for payment), and the amount (£8,000) justifies the cost of adjudication (typically £2,000-£5,000 in adjudicator fees for a case of this nature). You do not need legal representation for a case this clear. The adjudicator will examine the payment notices (or lack thereof), apply the Construction Act provisions, and in most cases will order payment of the full notified sum plus interest.',
  },
];

export default function CRModule4Section3() {
  useSEO({
    title: 'The Construction Act & Your Rights | Conflict Resolution Module 4.3',
    description:
      'Housing Grants, Construction and Regeneration Act 1996, adjudication, payment provisions, suspension rights, and practical guidance for electrical subcontractors.',
  });

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../cr-module-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-6xl mx-auto">
        {/* Page Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-rose-500/20 to-rose-400/20 border border-rose-500/30 mb-4">
            <Scale className="h-7 w-7 text-rose-400" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 mb-3 mx-auto">
            <span className="text-rose-400 text-xs font-semibold">MODULE 4 &middot; SECTION 3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            The Construction Act &amp; Your Rights
          </h1>
          <p className="text-white text-sm sm:text-base max-w-2xl mx-auto">
            Understanding the Housing Grants, Construction and Regeneration Act 1996, your right to
            adjudication, payment provisions, and the right to suspend for non-payment
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>The Act:</strong> HGCRA 1996 (amended 2011) &mdash; the most important law
                for subcontractor disputes
              </li>
              <li>
                <strong>Adjudication:</strong> Any dispute, any time, decision within 28 days,
                binding immediately
              </li>
              <li>
                <strong>Payment:</strong> 30-day maximum intervals, mandatory notices, ban on
                &ldquo;pay when paid&rdquo;
              </li>
              <li>
                <strong>Suspension:</strong> 7 days&rsquo; notice, then you can stop work for
                non-payment
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">Why It Matters</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Statutory rights:</strong> These rights cannot be contracted out of &mdash;
                they override unfair contract terms
              </li>
              <li>
                <strong>Speed:</strong> Adjudication gives you a binding decision in weeks, not
                years
              </li>
              <li>
                <strong>Power balance:</strong> The Act was specifically designed to protect
                subcontractors from MC abuse
              </li>
              <li>
                <strong>Practical protection:</strong> Understanding these rights transforms your
                negotiating position
              </li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              'State the full title, scope and key provisions of the Construction Act 1996 (as amended 2011)',
              'Explain the right to adjudication, including the process, timescales and enforceability of decisions',
              'Describe the payment notice and pay-less notice requirements and explain the consequences of non-compliance',
              'Apply the right to suspend performance for non-payment, including the 7-day notice requirement',
              'Assess when adjudication is cost-effective and appropriate for a given dispute',
              "Explain the domestic client exclusion and identify which contracts fall within the Act's scope",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: The Construction Act */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">01</span>
            The Construction Act
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The Housing Grants, Construction and Regeneration Act 1996 (HGCRA 1996), commonly
                known as the Construction Act, is the single most important piece of legislation for
                anyone involved in construction dispute resolution in the United Kingdom. It was
                introduced following the 1994 Latham Report, <em>Constructing the Team</em>, which
                identified widespread problems with payment practices and dispute resolution in the
                construction industry. The Report found that subcontractors were routinely subjected
                to late payment, unfair deductions, and contract terms that made it virtually
                impossible to challenge the paying party without expensive and time-consuming
                litigation.
              </p>

              <p>
                The Act was significantly amended by Part 8 of the Local Democracy, Economic
                Development and Construction Act 2009, which came into force on 1 October 2011. The
                2009 amendments strengthened the payment provisions, extended coverage to oral
                contracts (previously excluded), enhanced the right to suspend performance, and
                closed various loopholes that had been exploited by paying parties to circumvent the
                Act&rsquo;s protections.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Scale className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">Scope of the Construction Act</p>
                </div>
                <div className="space-y-3">
                  <div className="bg-white/5 border border-white/10 p-3 rounded">
                    <p className="text-sm font-medium text-white mb-1">Covered</p>
                    <p className="text-xs text-white">
                      All construction contracts (written, oral or partly written) for the carrying
                      out of construction operations in England, Wales and Scotland. This includes
                      building, civil engineering, mechanical and electrical installation, fit-out,
                      decoration, demolition, site clearance, and professional services (design,
                      surveying, project management). Both main contracts and subcontracts are
                      covered.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded">
                    <p className="text-sm font-medium text-white mb-1">Excluded</p>
                    <p className="text-xs text-white">
                      Contracts with residential occupiers (domestic clients who live in or intend
                      to live in the property). Note: if you are a subcontractor working for a main
                      contractor on a domestic property, your subcontract with the MC <em>is</em>{' '}
                      covered &mdash; only the contract between the MC and the homeowner is
                      excluded. Also excluded: extraction of natural resources, supply-only
                      contracts (without installation), and artistic works.
                    </p>
                  </div>
                </div>
              </div>

              <p>
                The Act operates alongside the Scheme for Construction Contracts 1998 (as amended).
                The Scheme provides default terms that are implied into any construction contract
                that does not comply with the Act&rsquo;s requirements. If your contract does not
                contain compliant adjudication provisions, or does not contain adequate payment
                terms, the Scheme fills the gaps automatically. This means you always have the
                statutory protections, regardless of what your contract says.
              </p>
            </div>
          </div>
        </section>

        {/* Section 02: Right to Adjudication */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">02</span>
            Right to Adjudication
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Section 108 of the Construction Act gives every party to a construction contract the
                right to refer any dispute arising under the contract to adjudication at any time.
                This is a statutory right that cannot be contracted out of &mdash; even if your
                contract expressly excludes adjudication, you still have the right to use it.
                Adjudication was designed to be a rapid, interim dispute resolution mechanism that
                provides a binding decision within weeks rather than the months or years that court
                proceedings typically require.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Gavel className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">The Adjudication Timeline</p>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      1
                    </span>
                    <div>
                      <p className="text-sm font-medium text-white">
                        Notice of Adjudication (Day 0)
                      </p>
                      <p className="text-xs text-white mt-1">
                        The referring party (you) sends a Notice of Adjudication to the other party
                        and the nominating body. The notice must identify the dispute, the parties,
                        the contract, and the redress sought. This triggers the process.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      2
                    </span>
                    <div>
                      <p className="text-sm font-medium text-white">
                        Adjudicator Appointed (Within 7 Days)
                      </p>
                      <p className="text-xs text-white mt-1">
                        The nominating body (such as RICS, RIBA, CIArb or TeCSA) appoints an
                        adjudicator within 7 days of receiving the notice. The adjudicator is an
                        independent construction professional with relevant expertise.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      3
                    </span>
                    <div>
                      <p className="text-sm font-medium text-white">
                        Referral Notice (Within 7 Days of Appointment)
                      </p>
                      <p className="text-xs text-white mt-1">
                        The referring party submits their Referral Notice to the adjudicator. This
                        is the detailed statement of your case, including all facts, arguments and
                        supporting evidence (documents, photographs, calculations, contract terms).
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      4
                    </span>
                    <div>
                      <p className="text-sm font-medium text-white">Response (Typically 14 Days)</p>
                      <p className="text-xs text-white mt-1">
                        The responding party submits their Response to the adjudicator, setting out
                        their defence and supporting evidence. The adjudicator may also request
                        additional information or hold a meeting.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      5
                    </span>
                    <div>
                      <p className="text-sm font-medium text-white">
                        Decision (Within 28 Days of Referral)
                      </p>
                      <p className="text-xs text-white mt-1">
                        The adjudicator reaches a decision within 28 days of referral. This can be
                        extended by 14 days with the referring party&rsquo;s consent, or longer by
                        mutual agreement. The decision is immediately binding on both parties.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <p>
                The adjudicator&rsquo;s decision is binding and enforceable immediately. It remains
                binding until the dispute is finally determined by court proceedings, arbitration,
                or agreement between the parties. In practice, the vast majority of adjudication
                decisions are complied with and never challenged further. The courts have
                consistently upheld the principle of &ldquo;pay now, argue later&rdquo; &mdash; even
                if the losing party believes the decision was wrong, they must comply with it while
                pursuing any further legal challenge.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: Payment Provisions */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">03</span>
            Payment Provisions
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The payment provisions of the Construction Act create a structured mechanism for
                determining what is due and when it must be paid. These provisions are arguably more
                important than the adjudication right, because they provide the framework that
                prevents payment disputes from arising in the first place &mdash; and when they do
                arise, they give the unpaid party a clear, enforceable position.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Clock className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">Payment Notice Timeline</p>
                </div>
                <div className="space-y-3">
                  <div className="bg-white/5 border border-white/10 p-3 rounded">
                    <p className="text-sm font-medium text-white mb-1">Due Date</p>
                    <p className="text-xs text-white">
                      The date on which payment becomes due. Determined by the contract &mdash;
                      typically aligned with your payment application date or the valuation date. If
                      the contract does not specify, the Scheme provides default due dates.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded">
                    <p className="text-sm font-medium text-white mb-1">
                      Payment Notice (Within 5 Days of Due Date)
                    </p>
                    <p className="text-xs text-white">
                      The paying party must issue a payment notice within 5 days of the due date.
                      The notice must state the sum considered due and the basis on which it was
                      calculated. If no payment notice is issued, your payment application becomes
                      the &ldquo;notified sum&rdquo; &mdash; the amount that must be paid.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded">
                    <p className="text-sm font-medium text-white mb-1">
                      Pay-Less Notice (At Least 7 Days Before Final Date)
                    </p>
                    <p className="text-xs text-white">
                      If the paying party intends to pay less than the notified sum, they must issue
                      a pay-less notice at least 7 days before the final date for payment. The
                      notice must state the amount considered due and the basis for the calculation.
                      Without this notice, the full notified sum must be paid.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded">
                    <p className="text-sm font-medium text-white mb-1">Final Date for Payment</p>
                    <p className="text-xs text-white">
                      The date by which payment must actually reach you. Determined by the contract
                      &mdash; typically 14 to 30 days after the due date. If the paying party fails
                      to pay the notified sum (or the amount stated in a valid pay-less notice) by
                      the final date, you may exercise your right to suspend performance.
                    </p>
                  </div>
                </div>
              </div>

              <p>
                The practical importance of this timeline cannot be overstated. If the main
                contractor misses any of the notice deadlines, the consequences are immediate and
                significant. Missing the payment notice deadline means your application becomes the
                notified sum. Missing the pay-less notice deadline means the full notified sum must
                be paid. Missing the final date for payment triggers your right to suspend. Each
                missed deadline strengthens your position and weakens the MC&rsquo;s.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">Practical tip:</strong> Keep a payment notice
                  tracker for every project. Record the due date, the deadline for the MC&rsquo;s
                  payment notice (due date + 5 days), the deadline for a pay-less notice (final date
                  &minus; 7 days), and the final date for payment. When the MC misses a deadline,
                  write to them immediately pointing out the missed deadline and its consequences.
                  This demonstrates that you understand your rights and are monitoring compliance.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 04: The Right to Suspend */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">04</span>
            The Right to Suspend
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Section 112 of the Construction Act gives you the right to suspend performance of
                your obligations under the contract if the paying party fails to pay the sum due by
                the final date for payment. This is one of the most powerful tools available to a
                subcontractor, but it must be exercised correctly to be effective and lawful.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <PauseCircle className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">
                    How to Exercise the Right to Suspend
                  </p>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      1
                    </span>
                    <div>
                      <p className="text-sm font-medium text-white">Confirm Non-Payment</p>
                      <p className="text-xs text-white mt-1">
                        Verify that the notified sum has not been paid by the final date for payment
                        and that no effective pay-less notice has been served. Check your bank
                        account, not just the MC&rsquo;s verbal assurances.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      2
                    </span>
                    <div>
                      <p className="text-sm font-medium text-white">
                        Give 7 Days&rsquo; Written Notice
                      </p>
                      <p className="text-xs text-white mt-1">
                        Send a written notice to the paying party stating your intention to suspend
                        performance. The notice must specify the ground for suspension &mdash;
                        namely, that the sum due has not been paid by the final date and no
                        effective pay-less notice has been served. Send the notice by recorded
                        delivery or email with read receipt.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      3
                    </span>
                    <div>
                      <p className="text-sm font-medium text-white">
                        Wait for the 7-Day Period to Expire
                      </p>
                      <p className="text-xs text-white mt-1">
                        Continue working during the 7-day notice period. If the paying party makes
                        full payment during this period, you cannot suspend. If they pay part of the
                        amount, you can still suspend for the unpaid balance.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      4
                    </span>
                    <div>
                      <p className="text-sm font-medium text-white">Suspend Performance</p>
                      <p className="text-xs text-white mt-1">
                        If the payment is not made within the 7-day notice period, you may suspend
                        performance. You are entitled to an extension of time for the period of
                        suspension and to claim reasonable costs arising from the suspension
                        (including standing down labour, securing the site, and
                        demobilisation/remobilisation).
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      5
                    </span>
                    <div>
                      <p className="text-sm font-medium text-white">Resume When Paid</p>
                      <p className="text-xs text-white mt-1">
                        You must resume performance once the payment is made in full. The Act does
                        not give you the right to terminate the contract for non-payment &mdash;
                        only to suspend. Resumption should be within a reasonable period after
                        payment.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <p>
                The right to suspend is a powerful weapon, but it should be used as a last resort.
                It will almost certainly damage the commercial relationship with the MC, and in some
                cases may affect your relationships with other parties on the project. Before
                suspending, ensure you have exhausted the escalation process described in Section 2,
                and consider whether adjudication might be a more effective route. However, if you
                are genuinely not being paid and the MC is ignoring your correspondence, suspension
                sends an unmistakable signal that you are aware of your rights and prepared to
                enforce them.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">
                    The Scheme for Construction Contracts 1998:
                  </strong>{' '}
                  Where the Construction Act requires certain provisions but the contract does not
                  contain them, the Scheme fills the gap. Key Scheme provisions include default
                  payment intervals of 30 days, default due dates, default payment notice and
                  pay-less notice periods, and compliant adjudication provisions. The Scheme acts as
                  a safety net &mdash; no matter how badly drafted your contract is, the Scheme
                  ensures you have the minimum statutory protections.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 05: Cost and When to Use */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">05</span>
            Cost &amp; When to Use Adjudication
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Adjudication is a cost-effective dispute resolution mechanism, but it is not free.
                Understanding the costs and when adjudication is appropriate will help you make
                informed decisions about whether to proceed. The wrong decision &mdash; either
                pursuing adjudication when the costs exceed the likely recovery, or failing to
                adjudicate when you have a strong case &mdash; can be equally damaging to your
                business.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <FileText className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">Adjudication Cost Breakdown</p>
                </div>
                <div className="space-y-3">
                  <div className="bg-white/5 border border-white/10 p-3 rounded">
                    <p className="text-sm font-medium text-white mb-1">Adjudicator Fees</p>
                    <p className="text-xs text-white">
                      Typically £2,000&ndash;£8,000 for a straightforward payment dispute. Complex
                      technical disputes may cost significantly more. The adjudicator&rsquo;s fees
                      are usually shared equally between the parties (unless the contract or the
                      adjudicator&rsquo;s decision specifies otherwise).
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded">
                    <p className="text-sm font-medium text-white mb-1">
                      Legal or Professional Support (Optional)
                    </p>
                    <p className="text-xs text-white">
                      If you engage a solicitor, barrister or construction consultant to help
                      prepare your case, their fees will be additional. For a straightforward
                      payment dispute, you may not need professional support. For more complex
                      disputes, a construction consultant or quantity surveyor who specialises in
                      adjudication may be more cost-effective than a solicitor.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded">
                    <p className="text-sm font-medium text-white mb-1">Your Own Time</p>
                    <p className="text-xs text-white">
                      Preparing the Referral Notice, gathering evidence and responding to the
                      adjudicator&rsquo;s directions takes time. For a well-documented dispute, this
                      might be 2&ndash;3 days of work. For a poorly documented dispute, it could be
                      significantly more.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">
                    When Adjudication Is Appropriate
                  </p>
                </div>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Claim value over £5,000:</strong> Below this amount, the costs of
                      adjudication may not be justified relative to the potential recovery
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Strong documentation:</strong> You have contemporaneous records,
                      payment applications, evidence of missing notices, photographs and
                      correspondence
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Negotiation has failed:</strong> You have exhausted the escalation
                      process (site level, written correspondence, senior management) without
                      resolution
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Clear contractual or statutory breach:</strong> The MC has failed to
                      issue payment notices, issued invalid pay-less notices, or withheld payment
                      without proper procedure
                    </span>
                  </li>
                </ul>
              </div>

              <p>
                Common examples where adjudication is likely to succeed include: the MC failed to
                issue a payment notice and your application became the notified sum but was not
                paid; the MC issued a pay-less notice that was late, did not state the basis for the
                calculation, or was otherwise invalid; completed work was not included in the
                valuation without explanation; and contra charges were deducted without following
                the contractual procedure. In all these cases, the Construction Act provides clear,
                enforceable rights that an adjudicator can apply.
              </p>
            </div>
          </div>
        </section>

        {/* Section 06: Section Summary */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">06</span>
            Section Summary
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The Construction Act is the cornerstone of subcontractor protection in the UK
                construction industry. Its three key provisions &mdash; the right to adjudication,
                mandatory payment notice requirements, and the right to suspend for non-payment
                &mdash; provide a statutory framework that overrides unfair contract terms and
                addresses the structural power imbalance between main contractors and
                subcontractors. Understanding and exercising these rights transforms your
                negotiating position and ensures you are not left unpaid for work you have
                completed.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">Key Principles</p>
                </div>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Adjudication:</strong> Any dispute, any time, decision within 28 days,
                      immediately binding and enforceable
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Payment notices:</strong> 5 days after due date; miss it and your
                      application becomes the notified sum
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Pay-less notices:</strong> At least 7 days before final date; miss it
                      and the full notified sum must be paid
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Suspension:</strong> 7 days&rsquo; written notice, then you can
                      lawfully stop work for non-payment with cost recovery
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Costs:</strong> Adjudicator fees £2,000&ndash;£8,000; appropriate for
                      claims over £5,000 with strong documentation
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  Coming Next: Team Conflicts &amp; Apprentice Management
                </p>
                <p className="text-sm text-white">
                  Not all workplace conflicts involve other companies. Section 4 addresses the
                  internal conflicts you will face as your career progresses &mdash; giving feedback
                  to team members, managing apprentices, handling grievances, and addressing
                  bullying and harassment. These are the leadership skills that separate good
                  electricians from great supervisors.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
            <HelpCircle className="h-5 w-5 text-rose-400" />
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="pb-4 border-b border-white/5 last:border-0">
                <h3 className="text-sm font-medium text-white mb-1">{faq.question}</h3>
                <p className="text-sm text-white leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Quiz */}
        <Quiz title="Section 3 Knowledge Check" questions={quizQuestions} />

        {/* Bottom Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../cr-module-4-section-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              MC &amp; Commercial Conflicts
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-rose-500 text-white hover:bg-rose-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../cr-module-4-section-4">
              Team Conflicts &amp; Apprentice Management
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
