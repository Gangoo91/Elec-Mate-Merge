/**
 * Plug-in solar and RCDs — cluster spoke 1 (ELE-1661)
 *
 * 🔴 READ BEFORE EDITING. This page exists because the question is genuinely
 * two questions, and because both of the obvious answers are wrong:
 *
 *  - "A Type A bidirectional RCD is legally required" — it is not. Mandating
 *    bi-directional residual current protection in the product was put to DESNZ
 *    in consultation and declined for want of evidence (Government Response,
 *    Annex B, "Plug Specification").
 *  - "The Type A recommendation is a myth" — it is not that either. It is
 *    Electrical Safety First's own published advice ("Plug-in Solar Panels: What
 *    to Know Before Buying", v1.0, August 2026). Never dismiss it.
 *
 * Both are true at once. Keep recommendation and requirement visually and
 * verbally separate on this page, and never state that the law requires a
 * particular circuit RCD type — there is no such requirement.
 */

import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInlineLeadMagnet } from '@/components/seo/SEOInlineLeadMagnet';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import { PLUG_IN_SOLAR_FACTS as F } from '@/lib/plugInSolarAssessment';
import { ShieldCheck, Sun, Zap, FileCheck2 } from 'lucide-react';

const breadcrumbs = [
  { label: 'Plug-in Solar UK', href: '/plug-in-solar-uk' },
  { label: 'RCD Requirements', href: '/plug-in-solar-rcd-requirements' },
];

const tocItems = [
  { id: 'short-answer', label: 'The Short Answer' },
  { id: 'two-questions', label: 'It Is Two Questions, Not One' },
  { id: 'check-one-type', label: 'Check One — Is It the Right Type?' },
  { id: 'check-two-bidirectional', label: 'Check Two — Is It Bidirectional?' },
  { id: 'what-the-law-says', label: 'What the Law Actually Requires' },
  { id: 'old-fuseboard', label: 'If You Have an Old Fuseboard' },
  { id: 'test-button', label: 'The Test Button Nobody Mentions' },
  { id: 'what-to-do', label: 'What to Do About It' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Electrical Safety First recommend at least a Type A, bidirectionally capable RCD on circuits intended for use with plug-in solar, and say homes with Type AC should not use plug-in solar without upgrading first.',
  'No law requires any particular circuit RCD type for plug-in solar. Mandating bi-directional residual current protection in the product was put to the government in consultation and declined for want of evidence.',
  'Those two statements are both true. Recommendation and requirement are different things, and conflating them in either direction is the mistake.',
  'It is two separate checks. The type marking (AC, A, B or F) and whether the device is suitable for bidirectional energy flow are different properties — "Type A bidirectional" runs them together.',
  'Per ESF, Type AC is unsuitable; Types A, B and F are all suitable. So the advice is Type A or better, not Type A specifically.',
  'BS 7671 531.3.3 independently confines Type AC to fixed equipment where it is known the load current contains no DC components — which is the real basis for advising an upgrade.',
  'BS 7671 551.7.1(c) requires a protective device suitable where energy flow is bidirectional. Most RCDs and RCBOs are built for one-way flow and few are marked either way.',
];

const faqs = [
  {
    question: 'Do I need a Type A bidirectional RCD for plug-in solar?',
    answer:
      'It is recommended, but not legally required. Electrical Safety First recommend that circuits intended for use with plug-in solar have at least a Type A bidirectional RCD, and that homes with Type AC RCDs should not use plug-in solar without first upgrading. That is published safety guidance from a credible body. It is not law: mandating bi-directional residual current protection in the product was put to the government during the consultation and expressly declined for want of sufficient evidence. Anyone telling you the law requires it is wrong, and anyone telling you the recommendation does not exist is also wrong.',
  },
  {
    question: 'Is a Type AC RCD suitable for plug-in solar?',
    answer:
      'No. Electrical Safety First describe Type AC as not designed or tested to function in the presence of any levels of DC residual current, and as unsuitable for the addition of plug-in solar. BS 7671 Regulation 531.3.3 gets to the same place independently: it confines Type AC to fixed equipment where it is known that the load current contains no DC components. A grid-following inverter is a power electronic converter, so that knowledge is not available and Type AC is not appropriate.',
  },
  {
    question: 'Does it have to be Type A, or will Type B or F do?',
    answer:
      'Type A, B and F are all suitable. ESF publish a table of types: AC is unsuitable; Type A tolerates moderate DC residual current above 6 mA; Type B tolerates varying levels and types; Type F tolerates varying levels above 10 mA. All three of A, B and F are marked as suitable for the addition of plug-in solar on the circuits they protect. So the recommendation is properly read as Type A or better. The government has gone further, saying that in the longer term it welcomes the industry moving to Type B or F devices that do not have this issue at all.',
  },
  {
    question: 'What does "bidirectional" mean and how do I check it?',
    answer:
      'It is a separate property from the type marking. Most RCDs and RCBOs are designed assuming energy flows in one direction, from the supply towards the load. A plug-in solar device makes the final circuit carry energy in both directions, and ESF are explicit that unidirectional devices are not suitable for plug-in solar because they may fail to operate in the event of a fault. Some manufacturers use a suffix such as BD or Bi-dir on the model number to show bidirectional suitability, but many give no marking at all. Where there is no obvious marking, note the manufacturer and model number from the front of the device and ask the manufacturer, or ask an electrician to assess it. Never remove the consumer unit cover to look.',
  },
  {
    question: 'Do I need a new consumer unit for plug-in solar?',
    answer:
      'Not necessarily, and not as a legal requirement. What the specification actually says is that users should be advised to check the installation has modern residual current protection and is in good condition, and that where it uses older fuse protection without RCBOs it should be checked and, where necessary, upgraded by a professional electrician. Often the proportionate answer is a single RCBO change on the circuit the device will be plugged into, rather than a whole board. Where the consumer unit is unlabelled or of unknown condition, the specification does say to seek inspection and assessment by a qualified electrician before installing.',
  },
  {
    question: 'I have an old fuseboard — will plug-in solar damage it?',
    answer:
      'No, and it is worth being accurate about this. Electrical Safety First are clear that rewirable or cartridge fuses will not be impaired through the addition of plug-in solar panels. Nothing is being made worse. The point is different: an installation on fuses does not have the protection that a modern RCD or RCBO would give it in the first place, whether or not you add solar. That is a conversation about the installation, not about the panel.',
  },
  {
    question: 'Does the plug-in solar device itself put DC onto my circuit?',
    answer: `A very small amount, which is capped. The specification requires that any smooth DC residual current the device injects does not exceed ${F.maxResidualDcMa} mA under normal operation and relevant fault conditions, tested at maximum apparent power output, specifically so it does not adversely affect the operation of upstream residual current devices. That is a limit on the product, not a statement about what is in your consumer unit. The government has also said it is undertaking further testing to assess whether injection at that level could still desensitise older Type AC RCBOs under UK installation configurations, and that the ${F.maxResidualDcMa} mA figure will be reviewed once those results are available.`,
  },
];

const relatedPages: RelatedPage[] = [
  {
    title: 'Plug-in Solar UK: The Rules From 27 August 2026',
    description: 'The limits, the prohibitions, notification and where an electrician is needed.',
    href: '/plug-in-solar-uk',
    icon: Sun,
    category: 'Plug-in Solar',
  },
  {
    title: 'RCD Types Explained',
    description: 'AC, A, F and B — what each tolerates and where BS 7671 permits it.',
    href: '/guides/rcd-types-explained',
    icon: ShieldCheck,
    category: 'Protection',
  },
  {
    title: 'Consumer Unit Replacement',
    description: 'When a board change is proportionate and what certification it needs.',
    href: '/consumer-unit-replacement',
    icon: Zap,
    category: 'Installation',
  },
  {
    title: 'EICR Certificate',
    description: 'Condition reporting on the existing installation.',
    href: '/tools/eicr-certificate',
    icon: FileCheck2,
    category: 'Certificates',
  },
];

const sections = [
  {
    id: 'short-answer',
    heading: 'The Short Answer',
    content: (
      <>
        <p>
          <strong>Recommended: yes. Legally required: no.</strong> Both halves of that matter, and
          most of the argument happening about this comes from people holding one half and assuming
          the other is settled.
        </p>
        <p>
          <strong>Electrical Safety First</strong> — the UK charity whose consumer guidance
          retailers are pointing buyers at — recommend that households have “at least a Type A
          bidirectional RCD protecting circuits intended for use with plug-in solar panels”, and
          that homes with “Type AC RCDs should not use plug-in solar systems without first
          upgrading”. That is real, published, credible safety advice, and dismissing it as a myth
          is wrong.
        </p>
        <p>
          It is also <strong>not a legal requirement</strong>. A respondent to the government’s
          consultation suggested the plug should incorporate bi-directional residual current
          protection. The response was that the government “has not identified sufficient evidence
          to justify mandating a specific plug design incorporating bi-directional residual current
          protection”. No circuit RCD type is mandated in law for plug-in solar.
        </p>
      </>
    ),
  },
  {
    id: 'two-questions',
    heading: 'It Is Two Questions, Not One',
    content: (
      <>
        <p>
          The phrase “Type A bidirectional” reads like a single property of a single device. It is
          two, and they are checked differently:
        </p>
        <ul>
          <li>
            <strong>The type marking</strong> — AC, A, F or B — which describes what kind of
            residual current the device can detect.
          </li>
          <li>
            <strong>Bidirectional capability</strong> — whether the device is built to work with
            energy flowing in both directions through it.
          </li>
        </ul>
        <p>
          A device can be Type A and still be unidirectional. Because the two get run together in
          one phrase, the second check is the one that gets skipped — and it is the one ESF say most
          devices fail.
        </p>
      </>
    ),
  },
  {
    id: 'check-one-type',
    heading: 'Check One — Is It the Right Type?',
    content: (
      <>
        <p>
          A plug-in solar device puts a small DC component onto the circuit. Different types of RCD
          and RCBO are designed, tested and certified for different kinds of residual current, and
          the type is usually marked with a symbol on the front of the device. ESF summarise them:
        </p>
        <ul>
          <li>
            <strong>Type AC</strong> — “Not designed or tested to function in the presence of any
            levels of DC residual current.” <strong>Unsuitable</strong> for the addition of plug-in
            solar.
          </li>
          <li>
            <strong>Type A</strong> — tolerates moderate DC residual current (above 6 mA).{' '}
            <strong>Suitable</strong> on the circuits it protects.
          </li>
          <li>
            <strong>Type B</strong> — tolerates varying levels and types of DC residual current.{' '}
            <strong>Suitable.</strong>
          </li>
          <li>
            <strong>Type F</strong> — tolerates varying levels of DC residual current (above 10 mA).{' '}
            <strong>Suitable.</strong>
          </li>
        </ul>
        <p>
          So the recommendation is properly read as <strong>Type A or better</strong>, not Type A
          specifically. A common confusion worth heading off: the RCD or RCBO “type” is not the same
          as the B, C or D marking on a circuit breaker, which describes its tripping characteristic
          — a Type B MCB tells you nothing about residual current.
        </p>
        <p>
          BS 7671 arrives at the same place independently. <strong>Regulation 531.3.3</strong>
          confines Type AC to fixed equipment where it is <em>known</em> that the load current
          contains no DC components. A grid-following inverter is a power electronic converter, so
          that positive knowledge is not available. That is the real technical basis for advising an
          upgrade, and it does not depend on anybody’s guidance.
        </p>
        <p>
          The direction of travel goes further still. The government’s response notes that DC
          leakage reducing the effectiveness of older, mostly AC-type RCDs “is a problem not unique
          to plug-in solar devices”, and says that “in the longer term, we welcome the industry
          moving to type B or F RCD devices that don’t have this issue”.
        </p>
      </>
    ),
  },
  {
    id: 'check-two-bidirectional',
    heading: 'Check Two — Is It Bidirectional?',
    content: (
      <>
        <p>This is the check that gets missed, and it is not the same question as the type.</p>
        <p>
          Most UK homes were wired on the assumption that electricity flows one way: from the
          socket-outlet to an appliance. A plug-in solar device introduces a source into the
          circuit, so energy flows in both directions. ESF are blunt about what that means for
          protective devices: most are designed for unidirectional flow, and those “are{' '}
          <strong>NOT</strong> suitable for plug-in solar panels as they may fail to operate or
          ‘trip’ (in the event of a fault)”.
        </p>
        <p>
          The practical difficulty is identification. ESF note that “few RCD/RCBOs can be easily
          identified as being bidirectionally capable by the consumer”. Some manufacturers use a
          suffix such as <strong>BD</strong> or <strong>Bi-dir</strong> on the model number, but
          many give no marking at all. Where there is nothing visible on the front of the device,
          the answer is to note the manufacturer and model number and ask the manufacturer, or have
          an electrician assess it. <strong>Never remove the consumer unit cover to look.</strong>
        </p>
        <p>
          BS 7671 backs this up: <strong>Regulation 551.7.1(c)</strong> requires a protective device
          suitable for the purpose where energy flow is bidirectional, and 551.7.1(d) restricts
          connecting a source to the load side of an RCD. Regulation 551.7.2 was redrafted and split
          by A4:2026, and the product specification names it as the reference for replacing the
          overcurrent protective device of the circuit concerned — work that can only be done by a
          qualified electrician.
        </p>
      </>
    ),
  },
  {
    id: 'what-the-law-says',
    heading: 'What the Law Actually Requires',
    content: (
      <>
        <p>
          Four separate propositions get conflated in this discussion. They carry very different
          force, and keeping them apart is most of the skill:
        </p>
        <ul>
          <li>
            <strong>
              The device must not exceed {F.maxResidualDcMa} mA of smooth DC residual current
            </strong>{' '}
            (specification §5.7). This is a limit on the <em>product</em>, so it does not impair an
            upstream RCD. It says nothing about what is in your consumer unit.
          </li>
          <li>
            <strong>
              Consumers should be advised to check for modern residual current protection in good
              condition
            </strong>{' '}
            (specification §8.3.2). This names RCBOs, and is footnoted: installations using MCBs
            with residual current protection provided upstream “may also be acceptable, subject to
            verification through further testing now being undertaken by DESNZ”. Genuinely
            unresolved.
          </li>
          <li>
            <strong>Type AC is not appropriate here</strong> (BS 7671 531.3.3). A standard, not
            guidance — and the strongest basis for recommending a change.
          </li>
          <li>
            <strong>Energy flow becomes bidirectional</strong> (BS 7671 551.7.1). A suitable
            protective device is required where that is the case.
          </li>
        </ul>
        <p>
          What none of them do is mandate a circuit RCD type for plug-in solar. If you are quoting
          for this work, recommend it as good practice with the reasoning above — that position
          holds up. Asserting a legal duty that a customer can look up and find does not exist does
          not.
        </p>
      </>
    ),
  },
  {
    id: 'old-fuseboard',
    heading: 'If You Have an Old Fuseboard',
    content: (
      <>
        <p>
          Worth being accurate, because the honest version of this is more persuasive than the scary
          version. ESF state that if a home is protected by rewirable or cartridge fuses, these{' '}
          <strong>“will not be impaired through the addition of plug-in solar panels”</strong>.
          Adding a panel does not make an old fuseboard worse.
        </p>
        <p>
          The point is a different one: an installation on fuses does not have the potentially
          life-saving protection that modern RCDs and RCBOs provide, whether or not anything is
          plugged into it. That is a conversation about the installation, and it was true before the
          solar arrived.
        </p>
        <p>
          Where the consumer unit uses older fuse protection, is not clearly labelled, or is of
          unknown condition, the specification does say users should seek inspection and assessment
          by a qualified electrician before installing the product.
        </p>
      </>
    ),
  },
  {
    id: 'test-button',
    heading: 'The Test Button Nobody Mentions',
    content: (
      <>
        <p>
          There is a clause in the specification that almost no coverage has picked up, and it
          matters more over time than anything else on this page.
        </p>
        <p>
          Older residual current devices can be <strong>desensitised</strong> by equipment leaking
          small amounts of DC into the AC circuit — not just solar, but plug-in EV chargers, IT
          equipment and switch-mode power supplies, and it is the cumulative effect of several
          devices that does it. The specification therefore requires that the customer be instructed
          to test the RCD or RCBO periodically by pressing its test button{' '}
          <strong>while the plug-in solar unit is producing power</strong>.
        </p>
        <p>
          And if it does not trip immediately, consumers “should be instructed to contact a
          competent professional electrician to discuss replacing the RCBO with a more modern unit”.
          ESF publish the same advice.
        </p>
        <p>
          This came out of the consultation directly: because DC injection desensitising RCDs is not
          confined to plug-in solar, the government said consumers would be reminded to test their
          protective devices periodically, and the specification was amended accordingly.
        </p>
      </>
    ),
  },
  {
    id: 'what-to-do',
    heading: 'What to Do About It',
    content: (
      <>
        <p>
          For a householder, in order: identify what is protecting the circuit you intend to use;
          check the type marking on the front of the device without removing any covers; establish
          whether it is bidirectionally capable, which usually means asking the manufacturer with
          the model number to hand; and if either answer is wrong or unknown, get it assessed before
          you buy rather than after.
        </p>
        <p>
          For an electrician, the proportionate remedy is usually a single RCBO change on the target
          circuit rather than a full board replacement — and it carries its own certification
          exactly as it always did. Replacing the overcurrent protective device of the circuit
          concerned is named in the specification as work that only a qualified electrician does,
          pointing at BS 7671 551.7.2.
        </p>
        <p>
          A word on how to sell it. Nothing legally obliges a householder to involve you, and saying
          otherwise will be found out.{' '}
          <SEOInternalLink href="/plug-in-solar-uk">
            The wider rules are on the plug-in solar hub page
          </SEOInternalLink>
          , and they point people at an electrician often enough without anyone needing to overstate
          it.
        </p>
      </>
    ),
  },
];

export default function PlugInSolarRCDPage() {
  return (
    <GuideTemplate
      title="Plug-in Solar and RCDs: What Is Recommended, What Is Required"
      description="Do you need a Type A bidirectional RCD for plug-in solar? Recommended by Electrical Safety First — not legally required. Type AC, A, B and F compared, why bidirectional is a separate check, and what BS 7671 531.3.3 and 551.7.1 actually say."
      datePublished="2026-08-31"
      dateModified="2026-08-31"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Plug-in Solar"
      badgeIcon={ShieldCheck}
      heroTitle={
        <>
          Plug-in Solar and RCDs:{' '}
          <span className="text-yellow-400">What Is Recommended, What Is Required</span>
        </>
      }
      heroSubtitle="Electrical Safety First recommend at least a Type A, bidirectionally capable RCD on circuits used with plug-in solar. The law requires no particular type. Both are true, and it is two separate checks rather than one — this page separates them, cited to the specification, the Government Response and BS 7671."
      readingTime={9}
      answerBox={{
        question: 'Do I need a Type A bidirectional RCD for plug-in solar?',
        answer:
          'It is recommended but not legally required. Electrical Safety First advise at least a Type A bidirectional RCD on circuits used with plug-in solar, and say homes with Type AC should upgrade first. No law mandates a circuit RCD type: bi-directional protection was proposed to the government and declined for want of evidence.',
        detail:
          'Per ESF, Type AC is unsuitable and Types A, B and F are all suitable — so it is Type A or better. Bidirectional capability is a separate check from the type marking, and most devices are unidirectional.',
      }}
      keyTakeaways={keyTakeaways}
      sections={sections}
      leadMagnet={
        <SEOInlineLeadMagnet
          headline="Plug-in Solar — What Actually Changed. Free 8-page guide"
          description="The RCD question answered from the source, the full checklist of what has to be in place, where the work is, and what the box is legally required to tell your customer. Written for electricians and apprentices."
          bullets={[
            'Recommended vs required, with the citation against each',
            `Every limit — ${F.maxApparentPowerVA} VA, ${F.maxPvModuleDcW} W DC, ${F.professionalAssessmentThresholdW} W`,
            'Free PDF — print it, share it, pin it up',
          ]}
          source="lead_magnet_plug_in_solar"
          analyticsLabel="plug_in_solar_guide_seo_rcd"
        />
      }
      faqs={faqs}
      faqHeading="Plug-in Solar and RCDs — Frequently Asked Questions"
      relatedPages={relatedPages}
      ctaHeading="Recording the Answer, Not Just Knowing It"
      ctaSubheading="Elec-Mate's Plug-in Solar Suitability & Commissioning Certificate checks the RCD type and bidirectional capability as separate questions, marks every finding as a requirement or as advice with the source against each, and turns them into a remedial list you can quote from. Join 1,600+ UK electricians. 7-day free trial."
    />
  );
}
