import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle2, AlertTriangle, Shield } from 'lucide-react';
import { PageFrame, PageHero, itemVariants } from '@/components/college/primitives';

const PPEEquipmentPage = () => {
  const navigate = useNavigate();
  return (
    <PageFrame className="px-4 sm:px-6 lg:px-8">
      <motion.div variants={itemVariants}>
        <button
          onClick={() => navigate('/apprentice/safety-fundamentals')}
          className="inline-flex items-center gap-2 h-11 -ml-2 px-2 rounded-md text-[12px] uppercase tracking-[0.18em] text-white/55 hover:text-white/85 transition-colors touch-manipulation"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>
      </motion.div>

      <motion.div variants={itemVariants}>
        <PageHero
          eyebrow="Apprentice · Safety"
          title="PPE & equipment"
          description="What to wear, what to test before you wear it, and what your employer has to provide. The kit that's between you and a serious incident — treat it accordingly."
          tone="yellow"
        />
      </motion.div>

      {/* Intro */}
      <div className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)]">
        <div className="p-4 sm:p-5 space-y-4">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-elec-yellow" />
            <h2 className="text-lg font-semibold text-white">Your Last Line of Defence</h2>
          </div>
          <p className="text-white text-sm leading-relaxed">
            Personal protective equipment is the{' '}
            <span className="font-bold text-elec-yellow">last resort</span> in the hierarchy of
            control — it only protects you when every other control has failed. Eliminate the
            hazard, isolate the supply, guard the work and organise the task first; PPE comes last
            because it does nothing to remove the danger, it only reduces the harm if something goes
            wrong. But when you need it, it must be right.
          </p>
          <p className="text-white text-sm leading-relaxed">
            Your employer must provide suitable PPE free of charge under the{' '}
            <span className="font-semibold text-white">
              Personal Protective Equipment at Work Regulations 1992
            </span>
            , as amended by the{' '}
            <span className="font-semibold text-white">
              Personal Protective Equipment at Work (Amendment) Regulations 2022
            </span>
            . The 2022 amendment extended those duties so they now cover "limb (b)" workers — agency
            staff and many self-employed and casual workers — not just directly employed staff. You
            are legally required to wear the PPE provided, look after it, and report any defects.
          </p>
        </div>
      </div>

      {/* Hierarchy of control */}
      <div className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)]">
        <div className="p-4 sm:p-5 space-y-4">
          <h2 className="text-lg font-semibold text-white">
            Where PPE Sits in the Hierarchy of Control
          </h2>
          <p className="text-white text-sm leading-relaxed">
            The law requires you to control a hazard from the top of this list down. PPE is only
            chosen for the risk that is left after everything above it has been applied. If you find
            yourself relying on PPE alone, stop — a higher control has probably been missed.
          </p>
          <div className="space-y-2">
            {[
              {
                rank: '1',
                name: 'Eliminate',
                desc: 'Remove the hazard entirely — design it out, or do the job a different way so the danger never exists.',
              },
              {
                rank: '2',
                name: 'Substitute',
                desc: 'Replace it with something less dangerous — for example a battery tool instead of a 230V mains tool.',
              },
              {
                rank: '3',
                name: 'Engineering controls / isolate',
                desc: 'Isolate and lock off the supply, use guards, barriers, RCDs and 110V transformers to keep the danger away from people.',
              },
              {
                rank: '4',
                name: 'Administrative controls',
                desc: 'Safe systems of work, permits, training, signage, supervision and rotating tasks to limit exposure.',
              },
              {
                rank: '5',
                name: 'PPE — last resort',
                desc: 'Only what is left over is controlled by PPE. It protects one person, only if worn and worn correctly, and does nothing to remove the hazard.',
                last: true,
              },
            ].map((level) => (
              <div
                key={level.rank}
                className={`flex items-start gap-3 rounded-md border p-3 ${
                  level.last
                    ? 'border-elec-yellow/25 bg-elec-yellow/[0.04]'
                    : 'border-white/[0.08] bg-white/[0.02]'
                }`}
              >
                <span
                  className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                    level.last
                      ? 'bg-elec-yellow/20 text-elec-yellow'
                      : 'bg-white/[0.06] text-white/70'
                  }`}
                >
                  {level.rank}
                </span>
                <div>
                  <p
                    className={`text-sm font-semibold ${
                      level.last ? 'text-elec-yellow' : 'text-white'
                    }`}
                  >
                    {level.name}
                  </p>
                  <p className="text-white text-xs mt-0.5">{level.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* PPE Items */}
      <div className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)]">
        <div className="p-4 sm:p-5 space-y-4">
          <h2 className="text-lg font-semibold text-white">Essential PPE for Electricians</h2>

          <div className="space-y-4">
            {[
              {
                item: 'Safety Boots',
                standard: 'BS EN ISO 20345 — S3 or S1P',
                purpose:
                  'Protection from falling objects, penetration by sharp objects (nails, screws), slip resistance, and ankle support.',
                electrical:
                  'For electrical work choose footwear with electrical-hazard properties and an insulating, non-conductive sole. Composite (non-metallic) toe caps and midsoles avoid introducing metal near live work — useful in higher-risk electrical environments. Safety footwear is not a substitute for safe isolation.',
                inspection: [
                  'Check soles for wear, splits, or separation from the upper',
                  'Inspect toe cap for damage or deformation',
                  'Check laces and eyelets are secure',
                  'Ensure soles still have adequate grip pattern',
                  'Replace when worn, damaged, or when the sole is smooth',
                ],
                replace: 'Every 6–12 months with daily use, or immediately if damaged.',
              },
              {
                item: 'Hard Hat / Safety Helmet',
                standard: 'BS EN 397 (industrial) or BS EN 12492 (climbing)',
                purpose:
                  'Protects against falling objects, impact with fixed structures, and bumps. Required on all construction sites and most industrial sites.',
                electrical:
                  'Helmets electrically insulated to BS EN 50365 (Class 0, for low-voltage installations up to 1,000V AC) are available, but they only guard against brief incidental head contact — they are never a substitute for safe isolation.',
                inspection: [
                  'Check shell for cracks, deep scratches, or UV degradation (chalky appearance)',
                  'Check harness webbing for fraying, tears, or loss of elasticity',
                  'Ensure adjustment mechanism works correctly',
                  'Check chin strap if fitted',
                  'Look for the date of manufacture stamp inside — replace after 5 years',
                ],
                replace:
                  'Every 5 years from date of manufacture (stamped inside), or immediately if it takes a significant impact.',
              },
              {
                item: 'Hi-Vis Clothing',
                standard: 'BS EN ISO 20471 — Class 2 or Class 3',
                purpose:
                  'Makes you visible to vehicle operators, plant machinery, and other workers. Class 3 (vest + trousers or full suit) provides the highest visibility.',
                electrical:
                  'No specific electrical requirement, but choose flame-retardant hi-vis if working near arc flash risks (IEC 61482-2 rated).',
                inspection: [
                  'Check fluorescent material has not faded significantly',
                  'Check retro-reflective strips are intact and not peeling',
                  'Ensure the garment is clean enough to be visible',
                  'Check fastenings (zips, velcro) work correctly',
                  'Replace when faded, torn, or when reflective strips no longer reflect',
                ],
                replace:
                  'When fluorescent material fades noticeably or reflective strips deteriorate. Typically 6–12 months with daily use.',
              },
              {
                item: 'Safety Glasses / Goggles',
                standard: 'BS EN 166 (eye protection)',
                purpose:
                  'Protection from flying debris (drilling, chasing, cutting), dust, chemical splashes, and arc flash. Side protection recommended for general site work.',
                electrical:
                  'Ordinary safety glasses protect against flying debris only. Where an arc flash risk has been identified you need a dedicated arc-rated face shield or visor (BS EN 166 marking 8, short-circuit arc) — not standard spectacles.',
                inspection: [
                  'Check lenses for scratches that impair vision',
                  'Check frames and side shields for damage',
                  'Ensure they fit securely and comfortably',
                  'Check anti-fog coating is still effective',
                  'Clean regularly — dirty lenses reduce visibility and increase risk',
                ],
                replace:
                  'When scratched to the point of impairing vision, or when frames are damaged.',
              },
              {
                item: 'Protective Gloves',
                standard: 'BS EN 388 (mechanical) / BS EN 60903 (electrical insulating)',
                purpose:
                  'Mechanical gloves protect against cuts, abrasions, and punctures when handling cable, trunking, and sharp metal. Electrical insulating gloves provide protection against electric shock during live testing.',
                electrical:
                  'Electrical insulating gloves (BS EN 60903) are rated by class: Class 00 (500V), Class 0 (1,000V). For most electrical apprentice work, Class 0 gloves are appropriate for testing activities. Always wear leather over-gloves to protect the rubber from damage.',
                inspection: [
                  'Inflate electrical gloves to check for pin holes (roll top and squeeze)',
                  'Check for cracks, cuts, or embedded objects in the rubber',
                  'Check the date stamp — electrical gloves must be retested every 6 months',
                  'For mechanical gloves, check for worn-through areas',
                  'Ensure gloves still fit properly and allow adequate dexterity',
                ],
                replace:
                  'Electrical insulating gloves: retest every 6 months, replace if they fail. Mechanical gloves: replace when worn through or damaged.',
              },
              {
                item: 'Hearing Protection',
                standard: 'BS EN 352 (ear muffs and ear plugs)',
                purpose:
                  'Required when noise levels exceed 85 dB(A) (daily or weekly average). Common on construction sites near drilling, cutting, and plant machinery.',
                electrical:
                  'No specific electrical requirements. Choose ear plugs or ear muffs based on the noise level and the SNR (Single Number Rating) needed.',
                inspection: [
                  'Check ear muff seals for cracks or hardening',
                  'Ensure headband tension is adequate',
                  'For disposable ear plugs, use a fresh pair each time',
                  'For reusable ear plugs, clean regularly and check for damage',
                  'Check the SNR rating is appropriate for the noise level',
                ],
                replace: 'Ear muff seals every 6–12 months. Disposable plugs are single use only.',
              },
              {
                item: 'Dust Masks / RPE',
                standard: 'BS EN 149 (filtering face pieces — FFP1, FFP2, FFP3)',
                purpose:
                  'Protection from dust when chasing walls, drilling into concrete or brick, or working in dusty environments. FFP3 is required for respirable crystalline silica dust (from concrete, mortar, brick and stone) which can cause silicosis and lung cancer.',
                electrical:
                  'No specific electrical requirements. If working in confined spaces, a powered respirator may be required.',
                inspection: [
                  'Disposable masks: check the mask is not damp, damaged, or blocked',
                  'Check the nose clip provides a good seal',
                  'Perform a face-fit check every time you put on a mask',
                  'FFP3 masks with valves last longer but are single-shift use',
                  'Reusable half-masks: check filters are in date and seals are intact',
                ],
                replace:
                  'Disposable masks are single-shift use. Replace when breathing becomes difficult or the mask is damp.',
              },
              {
                item: 'Knee Pads',
                standard: 'BS EN 14404 (Type 2 recommended)',
                purpose:
                  'Protection when working at floor level — installing sockets, floor boxes, under-floor wiring, and any kneeling work. Prevents knee injuries and long-term joint damage.',
                electrical: 'No specific electrical requirements.',
                inspection: [
                  'Check padding is not compressed or hardened',
                  'Check straps are secure and not frayed',
                  'Ensure knee pads stay in position during movement',
                  'Check outer shell for cracks (hard-shell types)',
                ],
                replace: 'When padding is compressed and no longer provides cushioning.',
              },
            ].map((ppe) => (
              <div
                key={ppe.item}
                className="rounded-md border border-elec-yellow/20 bg-elec-yellow/[0.04] p-3 sm:p-4 space-y-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-semibold text-white">{ppe.item}</h3>
                  <span className="text-elec-yellow/85 text-xs font-mono text-right">
                    {ppe.standard}
                  </span>
                </div>
                <p className="text-white text-sm">{ppe.purpose}</p>

                <div className="rounded-md border border-white/[0.08] bg-white/[0.02] p-3">
                  <p className="text-white text-xs">
                    <span className="font-semibold text-elec-yellow">Electrical note: </span>
                    {ppe.electrical}
                  </p>
                </div>

                <div>
                  <h4 className="text-white font-medium text-sm mb-2">Inspection Checklist</h4>
                  <div className="space-y-1">
                    {ppe.inspection.map((check) => (
                      <div key={check} className="flex items-start gap-2 text-xs text-white">
                        <CheckCircle2 className="h-3.5 w-3.5 text-elec-yellow/85 flex-shrink-0 mt-0.5" />
                        {check}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-md border border-elec-yellow/20 bg-elec-yellow/[0.04] p-2">
                  <p className="text-white text-xs">
                    <span className="font-semibold text-elec-yellow">Replace: </span>
                    {ppe.replace}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Arc Flash */}
      <div className="rounded-xl border border-red-500/25 bg-red-500/[0.04]">
        <div className="p-4 sm:p-5 space-y-4">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-red-400" />
            <h2 className="text-lg font-semibold text-red-400">Arc Flash Protection</h2>
          </div>
          <p className="text-white text-sm leading-relaxed">
            An arc flash can produce temperatures up to 19,000°C and cause severe burns, blindness,
            and blast injuries. While arc flash is more common in high-voltage and industrial
            environments, it can occur at any voltage level. Special arc-rated PPE is required where
            arc flash risk has been identified.
          </p>

          <div className="space-y-2">
            <h3 className="font-semibold text-white text-sm">Arc-Rated PPE</h3>
            {[
              'Arc-rated face shield or visor (tested to BS EN 166 8-1-0 / GS-ET 29) — not an ordinary safety visor',
              'Arc-rated clothing tested to BS EN IEC 61482-1-2 (box test, APC class) or BS EN IEC 61482-1-1 (open-arc, ATPV/EBT) — inherently flame-retardant overalls or jacket and trousers',
              'Class 00 or Class 0 electrical insulating gloves (BS EN 60903) worn with leather over-gloves',
              'Safety footwear with electrical-hazard properties',
              'Arc-rated balaclava and hard hat for higher-energy environments',
            ].map((item) => (
              <div key={item} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle2 className="h-4 w-4 text-red-400 flex-shrink-0 mt-0.5" />
                {item}
              </div>
            ))}
          </div>

          <div className="rounded-md border border-red-500/25 bg-red-500/[0.04] p-3">
            <p className="text-white text-xs">
              <span className="font-semibold text-red-400">As an apprentice: </span>
              You should not be working in arc flash risk zones without specific training, PPE, and
              close supervision. If you are asked to work on high-energy systems, speak to your
              supervisor about the arc flash risk assessment.
            </p>
          </div>
        </div>
      </div>

      {/* Tool Safety */}
      <div className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)]">
        <div className="p-4 sm:p-5 space-y-4">
          <h2 className="text-lg font-semibold text-white">Tool Safety and Inspection</h2>
          <p className="text-white text-sm leading-relaxed">
            Your tools are your livelihood — and they can be dangerous if not maintained properly.
            All electrical hand tools must be inspected before use. Power tools must have a current
            PAT test label and be appropriate for the environment.
          </p>

          <div className="space-y-3">
            <h3 className="font-semibold text-white text-sm">Before Using Any Tool</h3>
            {[
              'Visual inspection for damage, cracks, or exposed metal',
              "Check insulation on electrician's screwdrivers and pliers (rated to 1,000V AC, marked with VDE symbol)",
              'Check that power tool leads, plugs, and PAT labels are in order',
              'On construction sites, use 110V tools (yellow plugs) fed from a centre-tapped transformer (55V to earth) — only use 230V tools where 110V is not reasonably practicable, and always through RCD protection',
              'Check drill bits, saw blades, and cutting tools for damage',
              'Ensure the right tool for the job — never improvise',
            ].map((item) => (
              <div key={item} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle2 className="h-3.5 w-3.5 text-elec-yellow/85 flex-shrink-0 mt-0.5" />
                {item}
              </div>
            ))}
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold text-white text-sm">VDE Insulated Tools</h3>
            <p className="text-white text-sm leading-relaxed">
              VDE-certified tools are individually tested to 10,000V AC and rated for working up to
              1,000V AC. They are identified by the VDE triangle symbol and orange/red insulation.
              As an electrician, your core hand tools (screwdrivers, pliers, side cutters,
              strippers) should all be VDE-rated.
            </p>
            <div className="rounded-md border border-elec-yellow/20 bg-elec-yellow/[0.04] p-3">
              <p className="text-white text-xs">
                <span className="font-semibold text-elec-yellow">Note: </span>
                VDE insulation is a backup safety measure — it does not replace safe isolation.
                Always isolate the circuit before working on it. VDE tools protect you in case of
                accidental contact with an unexpected live conductor.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Your Responsibilities */}
      <div className="rounded-xl border border-elec-yellow/25 bg-elec-yellow/[0.04]">
        <div className="p-4 sm:p-5 space-y-3">
          <h2 className="text-sm font-semibold text-elec-yellow">Your PPE Responsibilities</h2>
          <div className="space-y-2">
            {[
              'Wear the PPE provided by your employer whenever required',
              'Inspect your PPE before every use',
              'Report any damage or defects immediately',
              'Store PPE correctly — keep it clean, dry, and in its bag or case',
              'Never modify or alter PPE',
              'Attend any PPE training or face-fit testing provided',
              'If PPE does not fit properly, tell your employer — they must provide alternatives',
            ].map((item) => (
              <div key={item} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle2 className="h-3.5 w-3.5 text-elec-yellow/85 flex-shrink-0 mt-0.5" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)]">
        <div className="p-4 sm:p-5">
          <p className="text-white text-xs leading-relaxed">
            PPE standards and requirements based on the Personal Protective Equipment at Work
            Regulations 1992 (as amended by the PPE at Work (Amendment) Regulations 2022), the BS EN
            standards cited above, and HSE guidance. Your employer must assess the risk, select
            suitable PPE and provide it free of charge. Check with your employer for site-specific
            PPE requirements.
          </p>
        </div>
      </div>
    </PageFrame>
  );
};

export default PPEEquipmentPage;
