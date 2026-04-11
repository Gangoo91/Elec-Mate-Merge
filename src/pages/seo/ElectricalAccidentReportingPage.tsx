import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  ShieldCheck,
  AlertTriangle,
  ClipboardCheck,
  FileCheck2,
  Scale,
  Clock,
  HardHat,
  CheckCircle,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Health & Safety', href: '/guides/electrical-safety-guide' },
  { label: 'Electrical Accident Reporting', href: '/electrical-accident-reporting' },
];

const tocItems = [
  { id: 'riddor-overview', label: 'RIDDOR 2013 Overview' },
  { id: 'what-must-be-reported', label: 'What Must Be Reported' },
  { id: 'electrical-dangerous-occurrences', label: 'Electrical Dangerous Occurrences' },
  { id: 'how-to-report', label: 'How to Report to the HSE' },
  { id: 'reporting-deadlines', label: 'Reporting Deadlines' },
  { id: 'near-miss', label: 'Near Miss Reporting' },
  { id: 'accident-investigation', label: 'Accident Investigation' },
  { id: 'self-employed', label: 'Self-Employed Electricians' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'RIDDOR 2013 (Reporting of Injuries, Diseases and Dangerous Occurrences Regulations 2013) places a legal duty on employers, the self-employed, and persons in control of premises to report certain work-related accidents, diseases, and dangerous occurrences to the HSE. Failure to report a RIDDOR-reportable incident is a criminal offence.',
  'For electrical work, the specific dangerous occurrences that must be reported under RIDDOR 2013 include: electrical short circuit or overload accompanied by fire or explosion resulting in stoppage of plant for more than 24 hours, explosion or fire caused by an electrical ignition, and unintended ignition of explosive materials.',
  'Over-seven-day injuries (where a worker is incapacitated for more than seven consecutive days following a work-related accident, not counting the day of the accident) must be reported within 15 days. Fatalities and specified injuries (including unconsciousness from electric shock) must be reported without delay.',
  'Near miss reporting is not required under RIDDOR for most incidents, but is strongly recommended internally as part of a positive safety culture. Near misses involving electrical isolation failures, accidental contact with live conductors, and LOTO failures are especially important to investigate — they are precursors to serious accidents.',
  'RIDDOR reports are submitted online via the HSE website at riddor.hse.gov.uk. Employers can also use the reporting service by telephone (0345 300 9923) for fatal and specified injuries. Records of all reportable incidents must be kept for a minimum of three years.',
];

const faqs = [
  {
    question: 'What is RIDDOR 2013?',
    answer:
      'RIDDOR 2013 stands for the Reporting of Injuries, Diseases and Dangerous Occurrences Regulations 2013. These regulations place a legal duty on employers, the self-employed (where their own work activity causes an injury to themselves or others), and persons in control of work premises to report certain work-related accidents, occupational diseases, and dangerous occurrences (near misses) to the Health and Safety Executive (HSE) or the relevant enforcing authority. RIDDOR replaced earlier reporting regulations and updated the list of specified injuries and dangerous occurrences. The purpose is to enable the HSE to identify trends, target inspection activity, and improve workplace safety.',
  },
  {
    question: 'Does an electric shock have to be reported under RIDDOR?',
    answer:
      'Yes, if the electric shock results in a specified injury. RIDDOR Schedule 1 lists specified injuries, which include: unconsciousness caused by asphyxia or by exposure to harmful substance or biological agent. Unconsciousness from electric shock falls within this category and must be reported without delay. Any electric shock that results in hospitalisation, loss of consciousness, or incapacity for more than seven days must also be reported. If a worker receives a shock but recovers immediately with no loss of consciousness and no absence from work exceeding seven days, it may not be RIDDOR reportable — but it should still be recorded in the accident book and investigated.',
  },
  {
    question: 'What electrical dangerous occurrences must be reported under RIDDOR?',
    answer:
      'RIDDOR 2013 Schedule 2 specifies dangerous occurrences that must be reported even if no injury occurs. For electrical work, the key dangerous occurrences are: (1) Electrical short circuit or overload accompanied by fire or explosion which results in the stoppage of the plant involved for more than 24 hours or which has the potential to cause the death of any person. (2) An explosion or fire caused by the ignition of material, where the fire or explosion results in the stoppage of plant for more than 24 hours or has the potential to cause death. These cover scenarios such as an arc flash in a switchboard that stops a process, or an electrical fire in a plant room.',
  },
  {
    question: 'How do I report a RIDDOR incident as a self-employed electrician?',
    answer:
      "As a self-employed electrician, you are required to report incidents under RIDDOR when your work activities cause a death or specified injury to yourself or any other person, or when a dangerous occurrence arises from your work. Reports are made online at riddor.hse.gov.uk. For fatalities and specified injuries, you can also call 0345 300 9923. If you are working on a client's premises, the client (as the person in control of the premises) may also have reporting duties — but this does not remove your own obligations. Keep records of any RIDDOR reports you make for at least three years.",
  },
  {
    question: 'What should I include in an accident book entry?',
    answer:
      'The accident book entry (or equivalent written record) should include: the date and time of the accident, the full name of the injured person, their job title and employer, the location where the accident occurred, a description of what happened (including what the person was doing at the time), the nature of any injury sustained, any witnesses, the first aid treatment given, and the name of the person completing the record. For electrical accidents, also record whether the circuit was isolated at the time, what electrical system was involved (voltage, circuit type), and whether LOTO procedures were in place. This record is separate from the RIDDOR report but is required by law under the Social Security (Claims and Payments) Regulations 1979.',
  },
  {
    question: 'What is the deadline for reporting a RIDDOR incident?',
    answer:
      'The deadline depends on the type of incident. Fatalities and specified injuries must be reported as soon as practicable (without delay). Over-seven-day incapacitation injuries must be reported within 15 days of the accident. Dangerous occurrences must be reported without delay. Occupational diseases (such as occupational dermatitis from chemical exposure) must be reported when a written diagnosis is received from a doctor. For electrical accidents, fatalities and serious injuries such as unconsciousness from electric shock must always be treated as urgent — report immediately.',
  },
  {
    question: 'Is a near miss reportable under RIDDOR?',
    answer:
      'Most near misses are not RIDDOR reportable unless they fall within the specific list of dangerous occurrences in Schedule 2. However, near miss reporting is strongly encouraged as a matter of good safety practice and is required under the Management of Health and Safety at Work Regulations 1999 through the duty to establish and maintain a suitable safety management system. For electrical near misses — such as an isolation failure that was discovered before anyone was injured, or a live conductor exposed in a location where workers were present — internal reporting and investigation are essential. These incidents indicate systemic safety failures that, if unaddressed, will result in a RIDDOR-reportable accident.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/electrical-rescue-procedure',
    title: 'Electrical Rescue Procedure',
    description: 'Electric shock first aid — know what to do before an incident occurs.',
    icon: AlertTriangle,
    category: 'Safety',
  },
  {
    href: '/lockout-tagout-guide',
    title: 'Lockout Tagout Guide',
    description: 'Safe isolation — the primary prevention measure against electrical accidents.',
    icon: ShieldCheck,
    category: 'Safety',
  },
  {
    href: '/electrical-fire-safety',
    title: 'Electrical Fire Safety',
    description: 'Preventing electrical fires — reducing the risk of RIDDOR dangerous occurrences.',
    icon: AlertTriangle,
    category: 'Safety',
  },
  {
    href: '/guides/electrical-safety-guide',
    title: 'Electrical Safety Guide',
    description: 'Complete UK electrical safety reference for qualified electricians.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/tools/rams',
    title: 'RAMS Generator',
    description: 'Generate site-specific risk assessments to prevent reportable accidents.',
    icon: FileCheck2,
    category: 'Tool',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'riddor-overview',
    heading: 'RIDDOR 2013 — Overview and Legal Duties',
    content: (
      <>
        <p>
          The Reporting of Injuries, Diseases and Dangerous Occurrences Regulations 2013 (RIDDOR
          2013) came into force on 1 October 2013, replacing earlier reporting regulations. They are
          made under the Health and Safety at Work etc. Act 1974 and are enforced by the HSE and
          local authorities.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Who has a duty to report</strong> — the duty rests primarily on the
                "responsible person": the employer (where the injured person is an employee), the
                self-employed person (for their own injuries and injuries to others arising from
                their work), and the person in control of the premises (where the injured person is
                not an employee of the responsible person, e.g., a member of the public or a
                contractor injured on a client's site).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Criminal offence</strong> — failure to report a RIDDOR-reportable incident
                is a criminal offence under the Health and Safety at Work etc. Act 1974. The HSE can
                prosecute, and convictions can result in fines. Beyond the legal obligation, failure
                to report denies the HSE data needed to identify industry hazards and target
                enforcement activity.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Record keeping</strong> — all RIDDOR-reportable incidents must be recorded
                and the records must be kept for three years. The record must include the date and
                method of reporting, the date, time, and place of the event, personal details of
                those involved, a brief description of the nature of the event.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Accident book</strong> — employers with 10 or more employees must keep an
                accident book (BI 510 or equivalent) under the Social Security (Claims and Payments)
                Regulations 1979. The accident book is separate from RIDDOR reporting but
                complements it. All incidents should be entered in the accident book regardless of
                whether they are RIDDOR reportable.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'what-must-be-reported',
    heading: 'What Must Be Reported Under RIDDOR 2013',
    content: (
      <>
        <p>
          RIDDOR 2013 specifies several categories of event that must be reported to the HSE. For
          electrical contractors, the most relevant categories are specified injuries and
          over-seven-day injuries to workers, and dangerous occurrences.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Fatalities</strong> — any work-related death must be reported without delay.
                This includes deaths resulting from electric shock, electrical burns, falls caused
                by electrical faults, and explosions caused by electrical ignition. Report
                immediately on the HSE website or by calling 0345 300 9923.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Specified injuries to workers</strong> — RIDDOR Schedule 1 lists specified
                injuries including: fractures (excluding fingers, thumbs, and toes); amputation; any
                injury leading to loss of sight; crush injuries causing internal organ damage;
                serious burns covering more than 10% of the body or causing damage to the eyes,
                lungs, or other organs; loss of consciousness caused by asphyxia or by exposure to
                harmful substance (including electric shock). All must be reported without delay.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Over-seven-day incapacitation injuries</strong> — injuries that result in
                the worker being incapacitated for more than seven consecutive days (not counting
                the day of the accident) must be reported within 15 days. Incapacitation means
                unable to carry out their normal range of work duties — it is not limited to
                complete absence from work.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Injuries to non-workers</strong> — injuries to members of the public,
                clients, or visitors that result in them being taken from the scene to a hospital
                for treatment must be reported. "Treatment" means actual medical treatment, not
                simply examination.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'electrical-dangerous-occurrences',
    heading: 'Electrical Dangerous Occurrences Under RIDDOR',
    content: (
      <>
        <p>
          RIDDOR Schedule 2 lists specific dangerous occurrences — events that are near misses or
          incidents with the potential to cause death or serious injury — that must be reported even
          if no injury occurs. Several are directly relevant to electrical work.
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Electrical short circuit or overload with fire or explosion</strong> —
                paragraph 14 of Schedule 2: "The unintended collapse or failure of any closed vessel
                or associated pipework which forms part of a pressure system" and the specified
                electrical incident — an electrical short circuit or overload accompanied by fire or
                explosion which results in the stoppage of the plant for more than 24 hours or which
                has the potential to cause death.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Arc flash incidents</strong> — an arc flash event in a switchboard, motor
                control centre, or distribution panel that results in an explosion, fire, or
                stoppage of plant for more than 24 hours is a reportable dangerous occurrence. Arc
                flash incidents have the potential to cause death and are taken very seriously by
                the HSE.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Unintended ignition of explosives</strong> — where electrical ignition
                causes the unintended detonation or ignition of explosive materials, this is a
                RIDDOR dangerous occurrence regardless of whether anyone was injured.
              </span>
            </li>
          </ul>
        </div>
        <p>
          When in doubt about whether an incident is RIDDOR reportable, report it. The HSE would
          rather receive an unnecessary report than not receive a required one. An unreported RIDDOR
          event discovered later during HSE investigation significantly aggravates any enforcement
          action.
        </p>
      </>
    ),
  },
  {
    id: 'how-to-report',
    heading: 'How to Report to the HSE',
    content: (
      <>
        <p>
          All RIDDOR reports for electrical contractors in Great Britain are made to the HSE. The
          HSE provides an online reporting service and a telephone service for urgent reports.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Online reporting — riddor.hse.gov.uk</strong> — the primary method for all
                RIDDOR reports. The online form requires: the nature of the event, details of the
                injured person or the dangerous occurrence, the location and date, a description of
                what happened, and your contact details. Save a copy of the completed report for
                your records.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Telephone — 0345 300 9923</strong> — for fatalities and specified injuries,
                the HSE also operates a telephone reporting line. This is available during working
                hours. For out-of-hours reporting of fatalities, emergency services (999) will
                notify the relevant authority. Follow up with a formal RIDDOR report as soon as
                practicable.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>What information to prepare</strong> — before reporting, gather: the date,
                time, and precise location of the incident; the full name and contact details of the
                injured person; their employer; a clear description of what happened and how; the
                nature and extent of any injuries; details of any witnesses; and details of any
                plant or equipment involved.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Preserve the scene</strong> — where possible, preserve the scene of a
                serious electrical accident until the HSE has been notified and had the opportunity
                to inspect. Do not move or remove equipment, tools, or materials that may be
                evidence unless necessary for ongoing safety or medical treatment. Photograph the
                scene before anything is disturbed.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'reporting-deadlines',
    heading: 'Reporting Deadlines',
    content: (
      <>
        <p>
          Missing RIDDOR reporting deadlines is itself an offence. Understanding the correct
          deadline for each type of incident is important.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Fatalities — immediately (without delay)</strong> — report as soon as
                practicable after the incident. In practice, this means the same day. Fatalities
                also trigger an HSE investigation — do not move the scene unless required for
                ongoing safety or medical treatment.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Specified injuries — immediately (without delay)</strong> — report as soon
                as practicable. Where the injury requires hospitalisation, report while the person
                is receiving treatment — do not wait until they are discharged.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Over-seven-day injuries — within 15 days</strong> — the 15-day clock starts
                from the day of the accident (not the day the seventh day of absence is reached). If
                an injury that initially appeared minor results in absence exceeding seven days,
                report it as soon as this becomes apparent.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Dangerous occurrences — immediately (without delay)</strong> — report as
                soon as practicable. Even if there is uncertainty about whether the event qualifies
                as a dangerous occurrence, err on the side of reporting.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'near-miss',
    heading: 'Near Miss Reporting — Building a Safety Culture',
    content: (
      <>
        <p>
          Near misses (sometimes called "close calls") are events that had the potential to cause
          injury or damage but did not. In electrical work, near misses often precede serious
          accidents. Reporting and investigating them is one of the most effective ways to prevent
          future injuries.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <HardHat className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Electrical near misses to report internally</strong> — isolation failures
                discovered before contact; live conductors found exposed in accessible locations;
                tools or equipment contacting live conductors without injury; incorrect isolation of
                the wrong circuit discovered before work began; lockout tagout breaches.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <HardHat className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>No blame culture</strong> — near miss reporting only works if workers can
                report without fear of punishment for honest mistakes. Establish a no-blame
                reporting culture where near misses are investigated constructively to identify
                systemic improvements, not to assign individual blame.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <HardHat className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Heinrich's triangle</strong> — for every fatal accident, research suggests
                there are approximately 29 serious injuries, 300 minor injuries, and 3,000 near
                misses. Reducing near misses reduces serious accidents. Each near miss is a free
                lesson about what could go wrong.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <HardHat className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>RIDDOR-reportable near misses</strong> — some near misses are RIDDOR
                dangerous occurrences (see above). These must be formally reported to the HSE.
                Internal near miss reporting does not substitute for RIDDOR reporting where it is
                required.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'accident-investigation',
    heading: 'Accident Investigation',
    content: (
      <>
        <p>
          Following any significant electrical accident or near miss, an internal investigation
          should be carried out to understand what happened and why, and to implement measures to
          prevent recurrence. This is required by the Management of Health and Safety at Work
          Regulations 1999.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Immediate actions</strong> — make the site safe, provide first aid, call
                emergency services if needed, preserve the scene, notify the HSE if RIDDOR
                reportable, and notify the employer and next of kin if a worker is seriously
                injured.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Investigation team</strong> — assign a competent person to lead the
                investigation. For serious accidents, this may include a senior manager, a health
                and safety advisor, and an elected employee representative. The investigation should
                be independent of those directly involved.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Root cause analysis</strong> — identify not just the immediate cause (e.g.,
                worker touched a live conductor) but the underlying causes (e.g., safe isolation
                procedure was not followed; isolation procedure was not adequately communicated;
                supervision was insufficient). Use the "5 Whys" method to trace causes to their
                root.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Corrective actions</strong> — document and implement corrective actions with
                specific owners and deadlines. Review and update risk assessments and method
                statements. Brief all affected workers on the findings and actions. Record the
                investigation and actions taken.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'self-employed',
    heading: 'RIDDOR Duties for Self-Employed Electricians',
    content: (
      <>
        <p>
          Self-employed electricians have RIDDOR reporting duties that differ slightly from those of
          employers. Understanding your obligations as a sole trader or director of a small company
          is essential.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Injuries to yourself</strong> — if you are self-employed and suffer a
                specified injury or are incapacitated for more than seven days as a result of a
                work-related accident, you must report it yourself under RIDDOR. There is no
                employer to report on your behalf.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Injuries to others from your work</strong> — if your work activities cause a
                specified injury, over-seven-day injury, or death to another person (including a
                client, a member of the public, or a co-worker), you must report it under RIDDOR.
                The client (as person in control of the premises) may also have a reporting duty —
                but their duty does not remove yours.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Dangerous occurrences from your work</strong> — dangerous occurrences
                arising from your work activity must be reported regardless of whether you are
                employed or self-employed. An arc flash or electrical explosion resulting from your
                work must be reported to the HSE.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: RAMS and Accident Prevention',
    content: (
      <>
        <p>
          The best RIDDOR report is the one you never have to make. Comprehensive risk assessment
          and safe working procedures — including safe isolation, LOTO, and RAMS — are the most
          effective way to prevent reportable accidents.
        </p>
        <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5 my-4">
          <div className="flex items-start gap-4">
            <FileCheck2 className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
            <div>
              <h4 className="font-bold text-white mb-1">
                Generate Site RAMS to Prevent Reportable Accidents
              </h4>
              <p className="text-white text-sm leading-relaxed">
                Use the{' '}
                <SEOInternalLink href="/tools/rams">Elec-Mate RAMS generator</SEOInternalLink> to
                create site-specific risk assessments and method statements for electrical work.
                Including safe isolation procedures, electrical hazard identification, PPE
                requirements, and emergency procedures — the documentation required by law and
                demonstrated to clients. Reduce accident risk and protect yourself legally if an
                incident does occur.
              </p>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Professional H&S documentation for UK electricians"
          description="Join 1,000+ UK electricians using Elec-Mate for RAMS generation, risk assessment, and health and safety documentation. AI-generated, site-specific, and compliant with UK regulations. 7-day free trial."
          icon={HardHat}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function ElectricalAccidentReportingPage() {
  return (
    <GuideTemplate
      title="Electrical Accident Reporting UK | RIDDOR & Near Miss Guide"
      description="UK guide to electrical accident reporting under RIDDOR 2013. What must be reported including electric shock and arc flash, how to report to the HSE, reporting deadlines, near miss reporting, accident investigation, and duties for self-employed electricians."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Legal Compliance"
      badgeIcon={Scale}
      heroTitle={
        <>
          Electrical Accident Reporting UK:{' '}
          <span className="text-yellow-400">RIDDOR 2013 Guide</span>
        </>
      }
      heroSubtitle="Complete UK guide to reporting electrical accidents under RIDDOR 2013. Covers what must be reported (fatalities, specified injuries, arc flash dangerous occurrences), how and when to report to the HSE, near miss reporting, accident investigation, and RIDDOR duties for self-employed electricians."
      readingTime={14}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Electrical Accident Reporting"
      relatedPages={relatedPages}
      ctaHeading="Generate RAMS to Prevent Reportable Accidents"
      ctaSubheading="Elec-Mate's AI RAMS generator creates site-specific risk assessments and method statements that reduce electrical accident risk and demonstrate legal compliance. 7-day free trial."
    />
  );
}
