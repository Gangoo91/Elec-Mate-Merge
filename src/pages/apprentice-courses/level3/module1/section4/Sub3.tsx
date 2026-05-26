/**
 * Module 1 · Section 4 · Subsection 3 — Specific electrical hazards
 * Maps to City & Guilds 2365-03 / Unit 201 / LO4 / AC 4.3
 *   AC 4.3 — "identify specific hazards associated with the installation and maintenance
 *            of electrical systems and equipment"
 */

import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { PageFrame, PageHero } from '@/components/college/primitives';
import { TLDR, ConceptBlock, RegsCallout, CommonMistake, Scenario, KeyTakeaways, FAQ, LearningOutcomes, ContentEyebrow, SectionRule } from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Specific electrical hazards (4.3) | Level 3 Module 1.4.3 | Elec-Mate';
const DESCRIPTION = 'L3 specific electrical hazards — shock, burn, arc-flash, fire, secondary injury — mapped to regulation and control.';

const checks = [
  { id: 'l3-m1-s4-sub3-arc', question: 'What\'s arc-flash?', options: [
    'An explosive release of energy when a fault current ionises air between conductors. Temperatures reach 19,000°C+. Pressure wave + thermal radiation + molten metal projectiles. Survivable injuries common; fatalities occur. Predictable in commercial / industrial switchgear; PPE rated by ATPV (cal/cm²).',
    'A combined RCD and MCB in a single device — provides both overcurrent (BS EN 60898 characteristics) and earth fault (BS EN 61009 characteristics) protection on a per-circuit basis. Used in modern consumer units to provide circuit-by-circuit RCD protection rather than RCD-banked CUs.',
    'Because the PEN conductor carries normal neutral current — in an open-circuit fault on the PEN, the consumer’s earthing terminal can rise toward line voltage, and oversized bonding conductors limit the resulting current and voltage on extraneous parts.',
    'FFP3 dust mask (sand-and-cement chasing produces respirable crystalline silica), eye protection (impact-rated, Z87 / EN 166 F or higher), hearing protection (chasers run at 95-105 dB), cut-resistant gloves (debris and the chaser wheel), and ideally on-tool dust extraction (Class M for masonry dust). Boots and hi-vis are baseline site PPE on top of the task PPE.',
  ], correctIndex: 0, explanation: 'Arc-flash is one of the highest-consequence electrical hazards in commercial/industrial work. EN 61482 PPE; design controls (remote racking) preferred.' },
  { id: 'l3-m1-s4-sub3-second', question: 'What\'s a "secondary injury" in electrical incidents?', options: [
    'Injury arising from the consequences of an electrical event rather than the electricity itself — e.g. fall from a step-up after a startle from a shock; tool drop from height; burn from hot equipment after fire; collision while running from smoke. Often more severe than the primary electrical injury.',
    'Activate the emergency stop, attempt to restart the engine and retry the auxiliary lowering system, communicate the situation to the ground operative, and if all machine-based recovery fails, initiate the rescue plan which may involve the emergency services',
    'Inspect the complete system including: module condition (cracking, delamination, snail trails), mounting frame integrity and corrosion, DC cable condition and connections, isolator switch operation, inverter performance data, and earthing continuity',
    'Stop work, leave tools, follow the planned escape route (identified during your dynamic risk assessment on arrival) to the muster point, ensure non-employees evacuate with you, await account-for and the all-clear from the responsible person.',
  ], correctIndex: 0, explanation: 'Secondary injuries are common and often more serious than the primary shock. Risk assessment should consider the full consequence chain, not just the electrical event.' },
  { id: 'l3-m1-s4-sub3-fire', question: 'What\'s the most common cause of electrical fire on installed equipment?', options: [
    'Loose connections — high resistance generates heat; oxidation accelerates; eventually flashover. Other common causes: overloaded circuits, damaged cables, water ingress, manufacturing defects (counterfeit kit), inadequate cooling.',
    'EVCP loads are continuous and high-utilisation — apply appropriate Cg and Ca correction factors, consider cumulative diversity for multiple chargers, and ensure final-circuit protective device rating coordinates with both EVCP rating and DNO supply capacity',
    'Approaching tasks willingly, being open to learning from challenges and mistakes, supporting colleagues constructively, and maintaining motivation even when work is routine or difficult',
    'Most witnesses are unfamiliar with apprenticeship evidence requirements, so prompts help them produce specific, structured statements that cover the information the assessor needs',
  ], correctIndex: 0, explanation: 'Loose connections cause more electrical fires than any other single cause. Periodic inspection (EICR) catches them; installation discipline (proper torque, periodic re-tightening at high-current terminations) prevents them.' },
];

const quizQuestions = [
  { id: 1, question: 'What\'s the threshold above which AC voltage is considered "dangerous" under HSE guidance?', options: [
    'Part 1 (Reg 110) covers the LV installation up to and including the main switchgear; the HV side and the supply transformer are excluded because they are the property and responsibility of the DNO or private network operator.',
    '50V AC RMS / 120V DC ripple-free is the threshold for "danger" in EAWR / HSE practice. Below = ELV (Extra-Low Voltage) generally not considered shock-hazardous in normal conditions. Above = LV (Low Voltage), routinely shock-hazardous and full EAWR controls apply.',
    'Operating manuals, maintenance instructions, inspection and testing schedule, schematic diagrams, manufacturer instructions for installed equipment, and the means to identify circuits — sufficient to enable safe operation, maintenance, and future inspection.',
    'Model inclusive language; identify and accommodate reasonable adjustments where colleagues need them; ensure PEEPs are in place where required; intervene against discriminatory behaviour; document; escalate persistent issues.',
  ], correctAnswer: 1, explanation: '50V AC threshold. Below = ELV; above = LV. Mains 230V is well into LV territory.' },
  { id: 2, question: 'What\'s "shock"?', options: [
    'Yes — design Zs ≤ Table 41.3 max, ADS will clear in time. The design should still target lower Zs (under 0.8 × 2.73 = 2.18 Ω) to leave headroom for measurement uncertainty and operating-temperature confidence at handover.',
    'A poor termination somewhere along the circuit — a loose neutral block, a poorly tightened CPC, or a corroded joint adding extra resistance to the fault loop. Check every termination, retest after re-making.',
    'Physiological response to electric current passing through the body. Effects scale with current (mA): perception (1mA), pain (5-10mA), can\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'t-let-go (10-20mA), respiratory paralysis (20-50mA), ventricular fibrillation (50-100mA+). Duration matters — long exposure at lower current can be lethal.',
    'Step 1: end-to-end resistance of each conductor (r1, rn, r2). Step 2: cross-connect L outgoing to N return; measure L-N at each socket — should be ~constant. Step 3: cross-connect L outgoing to cpc return; measure L-cpc at each socket — gives R1+R2 for the ring',
  ], correctAnswer: 2, explanation: 'Current matters more than voltage; mains 230V routinely produces enough current through the body to cause cardiac arrest. Knowing the rough thresholds informs the urgency.' },
  { id: 3, question: 'What\'s an "electrical burn"?', options: [
    'Causing additional heating in cables, transformers and generators, reducing their effective capacity and potentially causing nuisance tripping of protection devices',
    'The 5 s operating current of the device — the current that causes the device to operate within 5 seconds (typically the current at the magnetic-trip threshold for an MCB, or the BS 88 fuse 5 s curve current).',
    'Call for emergency assistance immediately, ensure the area is safe, provide first aid if trained, and initiate the rescue plan to bring the casualty safely to ground level',
    'Tissue damage caused by current passing through the body OR by arc / flash heating the skin. Internal burns can be severe with small surface marking. Different from thermal burns (cooler at surface; hotter at depth).',
  ], correctAnswer: 3, explanation: 'Electrical burns deceptive — small surface, deep internal damage. Always assume worse than it looks.' },
  { id: 4, question: 'What\'s arc-flash temperature?', options: [
    '~19,000°C — far hotter than the surface of the sun. The thermal radiation alone causes severe burns at distance; the pressure wave injuries; molten metal projectiles. PPE rated by ATPV (cal/cm²).',
    'Clear goals, immediate feedback, and a balance between the perceived challenge of the task and one\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s perceived skills — with both challenge and skill at a relatively high level',
    'The team leader assigns positions, the person at the top bears more weight, and clear commands are used throughout with the route checked beforehand',
    'To ensure that conditions are periodically reassessed and the permit is not left open beyond the period for which hazards have been evaluated',
  ], correctAnswer: 0, explanation: 'Arc-flash is extreme. EN 61482 ATPV-rated PPE; design controls (remote racking, arc-resistant switchgear) preferred where reasonably practicable.' },
  { id: 5, question: 'What\'s "step potential"?', options: [
    'You forgot to disconnect the CPC from the earth bar — your meter is reading the parallel path through the earth bar and main bonding rather than the circuit CPC alone, masking a possible break in the circuit CPC.',
    'Voltage difference between feet planted on the ground in the vicinity of an earth fault — current flowing through the ground creates voltage gradient; a person standing across that gradient experiences step potential. Significant near HV faults; can cause shock through the legs.',
    'Apprentices complete practical tasks (Concrete Experience), reflect during the task (reflection-in-action), discuss afterwards (reflection-on-action and Reflective Observation), draw conclusions (Abstract Conceptualisation), and apply improvements on the next task (Active Experimentation)',
    'The person responsible for the design of the installation — this might be a separate consulting engineer on a large project, or the same electrician as construction/test on a small domestic job. The signature confirms responsibility for design compliance.',
  ], correctAnswer: 1, explanation: 'Step potential is an HV-systems hazard. Generally not a domestic / LV concern but the L3 should know the term.' },
  { id: 6, question: 'What\'s "touch potential"?', options: [
    'Cut back to clean, undamaged conductor; use a new correctly sized lug; crimp with the correct tool and die; and verify with pull test and visual inspection',
    'The operative must stop work immediately, be assisted to descend safely while still conscious, moved to a cool shaded area, given fluids and monitored — if symptoms worsen, call emergency services',
    'Voltage between the hand touching an energised object and the feet on the ground. Drives current through the body if the object is energised by fault. Reason for equipotential bonding and protective conductor sizing.',
    'Disconnect/unplug sensitive electronics, link out (or accept loss of) MOVs, and test L+N joined to earth (rather than between L and N) to avoid damaging equipment',
  ], correctAnswer: 2, explanation: 'Touch potential is the headline LV hazard from earth faults. BS 7671 disconnection times and bonding addresses it.' },
  { id: 7, question: 'What\'s "induced voltage"?', options: [
    'Because maintenance technicians are uniquely positioned to identify and implement energy efficiency improvements during routine work, contributing to organisational sustainability and cost reduction',
    'Scope 1 = direct emissions (vans, gas heating); Scope 2 = indirect from purchased electricity; Scope 3 = value-chain (materials, subcontractors, waste, business travel) — usually the largest',
    'A notice served by the fire authority requiring the responsible person to notify them before making changes to the premises or its use that could increase fire risk or affect fire safety measures',
    'Voltage induced in a conductor by electromagnetic field from a nearby live conductor. Particularly relevant for cables in trefoil arrangement, parallel cable runs, and in metallic conduit / armouring. Can give shock or false-live readings on otherwise dead conductors.',
  ], correctAnswer: 3, explanation: 'Induced voltage explains why some "dead" conductors give a tingle or a low reading. Bond and isolate; understand the source.' },
  { id: 8, question: 'How does the L3 supervisor map a hazard to the relevant regulation?', options: [
    'Shock / direct contact → EAWR Reg 4 / 13 + BS 7671. Arc-flash → EAWR Reg 4 + 14 + COSHH (combustion products) + EN 61482 PPE. Fire → EAWR + RRFSO 2005 + Approved Doc B. Secondary injury → MHSWR Reg 3 (assessment of consequence chain). Each hazard has its regulatory home.',
    'Within 15 days of the incident — Reg 4(2). The over-7-day injury is one where the worker is incapacitated for more than 7 consecutive days (excluding the day of the accident) and unable to perform their normal duties. The day-of-incident counting trips firms up — the count starts the day AFTER.',
    'To take reasonable care for the health and safety of self and others, and to co-operate with the employer\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s safety arrangements. In RAMS terms that means reading the document, following the written method, raising defects in the document, and not working outside the documented controls. \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'Following orders\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\' is no defence to an s.7 prosecution.',
    'Assess the maximum demand under the failure-mode condition, document the manufacturer fall-back behaviour (typically a fixed reduced current or full-rate), and confirm the supply still survives or specify additional protection.',
  ], correctAnswer: 0, explanation: 'Mapping hazard to regulation lets the L3 supervisor cite chapter and verse in conversations. Strengthens the safety argument and demonstrates competence.' },
];

const faqs = [
  { question: 'Are LV (50-1,000V AC) and HV (&gt;1kV AC) hazards different?', answer: 'Yes — LV mostly shock and burn (touch potential); HV adds step potential, arc flashover at distance, much higher consequence arc events. HV requires separate competence (SAP appointment).' },
  { question: 'What\'s the difference between RCBO trip and arc-fault detection?', answer: 'RCBO detects earth-leakage (residual current); AFDD (Arc Fault Detection Device, BS 7671 A4:2026 expansion) detects the signature of arc faults that don\'t trip RCBOs. Both required in some installations under A4:2026; complementary protection.' },
  { question: 'What\'s "back-EMF" and why does it matter?', answer: 'Back-EMF is voltage induced by collapsing magnetic field in inductive load (motor, transformer) when supply is removed. Can reach high voltages briefly; can give shock; reason for caution before touching disconnected motor terminals.' },
  { question: 'Why is the second prove on the voltage indicator critical for arc-flash safety?', answer: 'A faulty indicator giving false dead can lead to operator approach and contact with live high-energy switchgear. Arc-flash incidents from approach to falsely-presumed-dead equipment are some of the most severe.' },
  { question: 'What\'s the difference between AC and DC shock effects?', answer: 'AC at mains frequency (50-60Hz) is particularly hazardous because it can lock muscles in contraction (50Hz is in the resonant range for cardiac muscle). DC tends to throw the casualty clear in shorter contact. Both lethal at higher currents; AC at LV is the everyday hazard.' },
  { question: 'How does L3 hazard awareness change post-BSA 2022?', answer: 'Higher accountability + golden thread + 30-year retrospective Defective Premises liability mean records and design integrity matter much more. Hazards from inadequate design now travel forward in time more clearly.' },
];

export default function Sub3() {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);
  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button onClick={() => navigate('/study-centre/apprentice/level3-module1-section4')} className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"><ArrowLeft className="h-4 w-4" /> Section 4</button>
          <PageHero eyebrow="Module 1 · Section 4 · Subsection 3" title="Specific electrical hazards" description="Remember from L2 — shock, burn, fire are the headline electrical hazards. At L3 you map each to regulation, understand arc-flash and secondary injury, and apply control hierarchies." tone="emerald" />
          <TLDR points={[
            "Five primary electrical hazards: shock, burn, arc-flash, fire, secondary injury. Each has its regulatory home.",
            "Shock thresholds: perception 1mA, pain 5-10mA, can't-let-go 10-20mA, respiratory 20-50mA, ventricular fibrillation 50-100mA+.",
            "Arc-flash temperatures ~19,000°C. EN 61482 PPE rated by ATPV (cal/cm²). Design controls (remote racking, arc-resistant switchgear) preferred.",
          ]} />
          <LearningOutcomes outcomes={[
            "Identify specific hazards associated with installation and maintenance of electrical systems and equipment.",
            "Distinguish shock, burn, arc-flash, fire and secondary injury hazards.",
            "Map each hazard to the relevant regulation (EAWR, BS 7671, RRFSO, COSHH, MHSWR).",
            "Apply hierarchy of control to electrical hazards with engineering / administrative / PPE responses.",
            "Recognise step potential, touch potential and induced voltage concepts.",
            "Recognise arc-flash as a high-consequence commercial / industrial hazard requiring specific PPE.",
          ]} initialVisibleCount={3} />

          <ContentEyebrow>The five primary electrical hazards</ContentEyebrow>
          <ConceptBlock title="Shock" plainEnglish="Current passing through the body causes physiological effects. Effects scale with current magnitude and duration. Mains 230V routinely delivers enough current through a person to cause cardiac arrest." onSite="Control: isolation (EAWR Reg 13), insulation, RCD protection (BS 7671), competence (Reg 16), PPE as last line. The L3 supervisor verifies controls are in place AND working.">
            <p>Current effects (rough thresholds, AC at mains frequency):</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>1 mA — perception (tingle).</li>
              <li>5-10 mA — pain.</li>
              <li>10-20 mA — &quot;can&apos;t let go&quot; (sustained muscle contraction).</li>
              <li>20-50 mA — respiratory paralysis if sustained.</li>
              <li>50-100 mA+ — ventricular fibrillation possible; cardiac arrest.</li>
              <li>1A+ — sustained cardiac arrest, severe burns.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Burn — direct and arc" plainEnglish="Two burn mechanisms. Direct contact = current heating tissue along its path; small surface mark, deep internal damage. Arc = thermal radiation from electrical arc, can burn at distance, can be severe over large body area." onSite="Both burn types require medical assessment regardless of how they look. Direct contact burns commonly underestimated by casualty because the surface is small.">
            <p>Burn-related considerations:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Direct contact = entry / exit wounds along the current path.</li>
              <li>Arc = surface burns over body area exposed to the radiation.</li>
              <li>Both can cause cardiac arrest, muscle damage (rhabdomyolysis), nerve damage.</li>
              <li>Mandatory A&amp;E assessment.</li>
              <li>RIDDOR specified injury for serious burns &gt;10% body / vital organ damage.</li>
            </ul>
          </ConceptBlock>

          <RegsCallout source="EAWR 1989 — Reg 4(1) and Reg 14" clause={<>Reg 4(1): "All systems shall at all times be of such construction as to prevent, so far as is reasonably practicable, danger." Reg 14: live working only via the three-test (unreasonable to be dead AND reasonable to be live AND suitable precautions).</>} meaning={<>The legal framework for electrical hazard control. Reg 4 = system level (design and maintain safe). Reg 14 = work activity level (default to dead-working; live only via three-test). Reg 13 = isolation. Reg 16 = competence. Together they cover the electrical hazard system.</>} cite="Source: Electricity at Work Regulations 1989 (SI 1989/635), Regs 4, 13, 14, 16." />

          <InlineCheck {...checks[0]} />

          <SectionRule />
          <ContentEyebrow>Arc-flash, fire and secondary injury</ContentEyebrow>
          <ConceptBlock title="Arc-flash — the catastrophic electrical event" plainEnglish="Fault current ionises air between conductors; explosive energy release; temperatures ~19,000°C; pressure wave; thermal radiation; molten metal projectiles. Survivable injuries common; fatalities occur. Predictable in commercial / industrial switchgear and DBs." onSite="Design controls: remote racking, arc-resistant switchgear, arc-fault detection. PPE: EN 61482 with ATPV cal/cm² rating matched to incident energy. EAWR Reg 14 three-test should rule out unnecessary live work that creates arc-flash exposure.">
            <p>Arc-flash hierarchy of control:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Eliminate</strong> — de-energise (always preferred).</li>
              <li><strong>Substitute</strong> — design with arc-resistant switchgear.</li>
              <li><strong>Engineer</strong> — remote racking, arc-fault detection, current-limiting devices.</li>
              <li><strong>Administer</strong> — permit-to-work, restricted approach, training, competence (HV / SAP for high-energy).</li>
              <li><strong>PPE</strong> — EN 61482 ATPV-rated kit, face shield, balaclava, gloves over insulating + leather.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Fire from electrical causes" plainEnglish="Common causes: loose connections (heat from high-resistance), overloaded circuits, damaged cables, water ingress, counterfeit / sub-standard kit, inadequate cooling. Most common single cause = loose connections at high-current terminations." onSite="Control: installation discipline (proper torque), inspection (EICR), maintenance, AFDD where appropriate (BS 7671 A4:2026 expansion), proper cable rating and protection. Periodic re-tightening at high-current terminations recommended for industrial switchgear.">
            <p>Fire hazard categories:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Loose connection → high resistance → heat → ignition of insulation / surrounding materials.</li>
              <li>Overload → cable insulation failure → short circuit → arc.</li>
              <li>Cable damage (chasing, vermin, age) → short to ground / between phases.</li>
              <li>Water ingress → tracking → arcing → ignition.</li>
              <li>Counterfeit components → undersized / mis-rated → fail under fault.</li>
              <li>Inadequate cooling (transformer rooms, switchrooms) → thermal runaway.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Secondary injury" plainEnglish="Injury arising from the consequences of an electrical event rather than the electricity itself. Fall after a startle shock. Tool drop from height. Burn from hot equipment after fire. Collision while running. Often more severe than the primary electrical event." onSite="Risk assessment should consider the consequence chain, not just the immediate electrical event. Working at height + electrical work compounds the secondary injury risk; the WaH controls and the electrical controls both matter.">
            <p>Common secondary injuries:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Fall from ladder / step-up after shock startle.</li>
              <li>Tool drop from height after shock or arc.</li>
              <li>Cut from broken glass / cover after explosion.</li>
              <li>Smoke inhalation when escaping fire.</li>
              <li>Crush injury from falling debris.</li>
              <li>Heart attack triggered by stress of incident.</li>
              <li>Hearing damage from arc-flash pressure wave.</li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...checks[1]} />
          <InlineCheck {...checks[2]} />

          <SectionRule />
          <ContentEyebrow>Step, touch and induced voltage</ContentEyebrow>
          <ConceptBlock title="Three voltage-gradient hazards" plainEnglish="Step potential = voltage difference between feet planted in the ground near an earth fault. Touch potential = voltage between hand on energised object and feet on ground. Induced voltage = voltage induced in nearby conductors by electromagnetic field." onSite="Step potential mostly HV concern. Touch potential = headline LV hazard; addressed by bonding and disconnection times. Induced voltage explains why &quot;dead&quot; conductors near live ones can still give a reading or a tingle; bond and isolate.">
            <p>Mitigation:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Step potential — restricted approach to HV faults; insulating barriers; equipotential mats.</li>
              <li>Touch potential — equipotential bonding (BS 7671 Section 411), disconnection times, RCD protection.</li>
              <li>Induced voltage — bond conductors at both ends; understand parallel runs; verify dead with proper indicator.</li>
            </ul>
          </ConceptBlock>

          <SectionRule />
          <ContentEyebrow>BS 7671 protection, RCD/AFDD and post-incident response</ContentEyebrow>
          <ConceptBlock title="BS 7671 protective measures — engineered shock prevention" plainEnglish="Chapter 41 of BS 7671 sets out protection against electric shock. Two layers: basic protection (against direct contact — insulation, barriers, enclosures, obstacles, placing out of reach) and fault protection (against indirect contact — automatic disconnection of supply via protective earthing + bonding + ADS, or alternative methods like SELV / electrical separation / Class II)." onSite="The L3 supervisor verifies both layers exist on every install. Basic protection is the design / installation discipline; fault protection is the earthing / bonding / disconnection time discipline. Together they remove most LV shock risk before PPE is needed.">
            <p>Protection layers per BS 7671 Chapter 41:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Basic protection (s.416)</strong> — insulation, barriers / enclosures (IP2X / IPXXB minimum), obstacles, placing out of reach, additional RCD ≤30mA.</li>
              <li><strong>Fault protection (s.411)</strong> — automatic disconnection of supply (ADS) via protective earthing, bonding, ADS within disconnection times.</li>
              <li><strong>Disconnection times (Table 41.1)</strong> — TN system 0.4s for final circuits ≤32A; TT system 0.2s.</li>
              <li><strong>Additional protection (s.415)</strong> — RCD ≤30mA for sockets up to 32A in domestic; certain locations.</li>
              <li><strong>SELV / PELV (s.414)</strong> — Separated Extra Low Voltage; alternative to ADS.</li>
              <li><strong>Electrical separation (s.413)</strong> — single isolated supply circuit.</li>
              <li><strong>Class II equipment (s.412)</strong> — double / reinforced insulation; no protective earth required.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="RCDs, AFDDs and BS 7671 A4:2026 expansion" plainEnglish="RCDs detect earth-leakage current and disconnect within tens of milliseconds — life-saving for direct contact. AFDDs (Arc Fault Detection Devices) detect the signature of arc faults that don&apos;t trip RCDs — fire-prevention. BS 7671 A4:2026 expanded the scenarios where AFDDs are required, particularly for higher-risk premises (HMOs, sleeping accommodation, care homes)." onSite="The L3 supervisor knows the new A4:2026 scope and applies on relevant installs. Verifying RCD operation (test button + Ramp / x1 / x5 instrument testing) is part of the EICR / handover routine.">
            <p>Protection device types:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>RCD</strong> — Residual Current Device. Detects earth-leakage; trips at rated I&Delta;n (typically 30mA for additional protection).</li>
              <li><strong>RCBO</strong> — RCD + MCB combined; per-circuit protection.</li>
              <li><strong>SRCD</strong> — Socket-outlet RCD; portable.</li>
              <li><strong>AFDD</strong> — Arc Fault Detection Device. Detects arc signature; A4:2026 expansion.</li>
              <li><strong>Type AC</strong> — sinusoidal AC residual current only (largely superseded).</li>
              <li><strong>Type A</strong> — AC + pulsating DC; current standard.</li>
              <li><strong>Type F</strong> — Type A + high-frequency components (variable speed drives).</li>
              <li><strong>Type B</strong> — full DC capability (EV charging, PV, some industrial).</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Post-incident response — preserving the scene" plainEnglish="After any electrical incident with potential injury or significant equipment damage, preserve the scene for investigation. Don&apos;t restore power; don&apos;t move components; photograph extensively; document witness accounts contemporaneously. The investigation evidence comes from the scene as it was." onSite="The L3 supervisor&apos;s reflex: stop, isolate, render aid, preserve. The temptation to &apos;tidy up&apos; or &apos;just check what happened&apos; destroys evidence. Wait for the firm&apos;s investigator / HSE inspector. Only act on the casualty&apos;s welfare and the immediate hazard.">
            <p>Scene preservation steps:</p>
            <ol className="space-y-1.5 list-decimal pl-5 marker:text-elec-yellow/70">
              <li>Casualty welfare first — first aid, 999, isolation as needed.</li>
              <li>Make area safe — eliminate ongoing hazard without disturbing scene.</li>
              <li>Restrict access — barriers, signs, person on guard.</li>
              <li>Photograph — wide context shots, mid-distance, close-ups; multiple angles.</li>
              <li>Preserve equipment in place — don&apos;t open covers further, don&apos;t reset breakers.</li>
              <li>Note witness accounts contemporaneously — name, what they saw, when.</li>
              <li>Notify firm immediately — H&amp;S manager, contracts manager, director.</li>
              <li>RIDDOR notification by responsible person if specified injury / dangerous occurrence.</li>
              <li>HSE notification within statutory windows (immediate phone for fatal / specified; F2508 within 10 days for others).</li>
              <li>Don&apos;t admit liability or speculate on cause to anyone — let the investigation determine.</li>
            </ol>
          </ConceptBlock>

          <RegsCallout source="EAWR 1989 — Reg 16 (Persons to be competent to prevent danger and injury)" clause={<>"No person shall be engaged in any work activity where technical knowledge or experience is necessary to prevent danger or, where appropriate, injury, unless he possesses such knowledge or experience, or is under such degree of supervision as may be appropriate having regard to the nature of the work."</>} meaning={<>Reg 16 — competence and supervision. Technical knowledge / experience required, OR appropriate supervision. The L3 is often the &apos;appropriate supervision&apos; for L2 / apprentices. Failure to provide competent supervision where the work requires it is a Reg 16 breach.</>} cite="Source: Electricity at Work Regulations 1989 (SI 1989/635), Reg 16." />

          <RegsCallout source="RIDDOR 2013 — Reg 7 (Reportable dangerous occurrences)" clause={<>"Where an event listed in Schedule 2 (electrical short circuit / overload causing fire or explosion) occurs at any place of work which results in stoppage of the plant involved for more than 24 hours or could have caused death or serious injury, the responsible person must follow the reporting procedure."</>} meaning={<>RIDDOR Reg 7 + Sched 2 — dangerous occurrences. Electrical short circuit causing fire / explosion / 24h stoppage / could-have-caused serious injury all reportable. Even without injury, the dangerous occurrence is RIDDOR-reportable. The L3 supervisor recognises and escalates.</>} cite="Source: Reporting of Injuries, Diseases and Dangerous Occurrences Regulations 2013 (SI 2013/1471), Reg 7 + Sched 2." />

          <SectionRule />
          <CommonMistake title="Treating arc-flash as something that 'happens to other electricians'" whatHappens={<>Apprentice working on a 250A commercial DB without arc-flash PPE; assumes it&apos;s &quot;just a switchroom&quot;. Slipped screwdriver triggers phase-to-phase fault; arc-flash incident; serious burns; multi-week hospital stay; HSE prosecution; firm + supervisor liable; arc-flash PPE was available but not used.</>} doInstead={<>Treat all commercial / industrial switchgear as arc-flash hazardous until proven otherwise. EN 61482 ATPV-rated PPE for any work at the working position. Design controls (de-energise, remote racking) preferred to working live.</>} />

          <CommonMistake title="Treating loose connections as 'someone else's problem' on EICR" whatHappens={<>EICR identifies several loose terminations in a small commercial DB; codes them C2 / C3; firm reports to dutyholder; doesn&apos;t make safe on the day. Six weeks later one of the connections starts to overheat; small fire in the switchroom; significant smoke damage; insurance claim.</>} doInstead={<>Loose connections discovered during EICR should typically be re-torqued on the day where safely possible (small terminations, accessible). The EICR is the report; making safe within the visit is the operative response. Document the action.</>} />

          <Scenario title="Switchroom inspection — mapping hazards to regulations" situation={<>You're scheduled for a planned EICR + remedial visit at a small commercial switchroom: 400V three-phase distribution, 250A main switch, several sub-DBs, mid-week, customer\'s operations continuing in the building.</>} whatToDo={<>Map hazards. Shock — EAWR Reg 13 isolation. Arc-flash — EAWR Reg 14 (default to dead working; if any live work needed, three-test + permit + EN 61482 PPE). Fire — RRFSO 2005 + EAWR Reg 4 (system maintained safely); CO2 extinguisher available. Secondary injury — MHSWR Reg 3 risk assessment of consequence chain (e.g. fall from access platform if startled). Specific controls: full isolation strategy planned in advance with customer (out-of-hours window if needed); GS38 voltage indicator + proving unit; lock-off on each sub-DB worked; EN 61482 PPE + EN 60903 Class 0 gloves for any live test work; second person present for arc-flash potential; clear access route maintained for emergency egress; CO2 extinguisher within reach; first-aid kit on site; FAW first aider identified. Document on dynamic risk assessment. Brief any L2 mate on the specific hazards. Customer briefed on which areas will be isolated and when.</>} whyItMatters={<>Mapping each hazard to its regulation gives the assessment structure and demonstrates competence. The HSE inspector reviewing after any incident sees thoughtful engagement with the framework. The customer sees a professional approach. The L3 supervisor&apos;s reflex to map hazard → regulation → control is what distinguishes mature practice from intuition.</>} />

          <SectionRule />
          <ContentEyebrow>Arc-flash incident energy — the IEEE 1584 framework</ContentEyebrow>

          <ConceptBlock
            title="Why the same DB can have different arc-flash energies at different positions"
            plainEnglish="Arc-flash incident energy at a given working position depends on the available fault current, the system voltage, the protective device clearing time, the working distance from the arc, the gap between conductors, and the enclosure geometry. The IEEE 1584 method (and the simpler Lee method for higher voltages) calculates incident energy in cal/cm² for a given position. The same DB can show 8 cal/cm² at the closed cover with a quick-clearing breaker and 25+ cal/cm² with the cover open, the breaker degraded, or working close to the bus. PPE selection has to match the calculated energy at the actual working position."
            onSite="The L3 supervisor doesn&apos;t typically perform the IEEE 1584 calculation but should know it exists and should ask &apos;what is the arc-flash study at this site?&apos;. Modern industrial sites increasingly have labels on switchgear showing the incident energy and required PPE class. Where no study exists, conservative assumption (treat as 12 cal/cm² minimum for any commercial DB; 25+ for any large industrial gear) is the practical fallback."
          >
            <p>Factors driving arc-flash incident energy:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Available fault current</strong> — higher fault current = more energy
                released; depends on transformer size and impedance.
              </li>
              <li>
                <strong>Protective device clearing time</strong> — quicker disconnection = less
                energy; coordination affects the time.
              </li>
              <li>
                <strong>Working distance</strong> — incident energy reduces with distance from
                arc; closer working = higher energy.
              </li>
              <li>
                <strong>Conductor gap</strong> — wider gaps sustain longer arcs.
              </li>
              <li>
                <strong>Enclosure geometry</strong> — enclosed arcs reflect heat outward;
                higher delivered energy.
              </li>
              <li>
                <strong>System voltage</strong> — higher voltage = higher energy per second.
              </li>
              <li>
                <strong>Equipment condition</strong> — degraded contacts, contamination
                affect arc behaviour.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />
          <FAQ items={faqs} />
          <SectionRule />
          <KeyTakeaways points={[
            "Remember from L2 — shock, burn, fire are headline electrical hazards. At L3 you add arc-flash and secondary injury and map each to regulation.",
            "Shock thresholds: perception 1mA, pain 5-10mA, can't-let-go 10-20mA, ventricular fibrillation 50-100mA+.",
            "Burns deceptive — small surface, deep internal. Mandatory A&E.",
            "Arc-flash ~19,000°C. EN 61482 ATPV PPE; design controls preferred (de-energise, remote racking).",
            "Most common electrical fire cause = loose connections. Installation discipline + periodic inspection.",
            "Secondary injury (fall, tool drop, smoke inhalation) often more severe than primary shock. Risk assessment includes the consequence chain.",
            "Step / touch / induced voltage — three voltage-gradient hazards. Touch potential is the LV headline; addressed by bonding and disconnection times.",
            "Map hazard → regulation → control. EAWR + BS 7671 + RRFSO + COSHH + MHSWR each have their domain.",
          ]} />
          <Quiz title="Specific electrical hazards — knowledge check" questions={quizQuestions} />
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button onClick={() => navigate('/study-centre/apprentice/level3-module1-section4-2')} className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]">
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white"><ChevronLeft className="h-3 w-3" /> Previous</div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">4.2 Hazard definition</div>
            </button>
            <button onClick={() => navigate('/study-centre/apprentice/level3-module1-section4-4')} className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]">
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">Next subsection <ChevronRight className="h-3 w-3" /></div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">4.4 Workplace hazard situations</div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
