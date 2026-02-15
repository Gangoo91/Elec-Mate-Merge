import { Card, CardContent } from '@/components/ui/card';
import { SmartBackButton } from '@/components/ui/smart-back-button';
import { CheckCircle, AlertTriangle, Shield } from 'lucide-react';

const PPEEquipmentPage = () => {
  return (
    <div className="animate-fade-in max-w-2xl mx-auto px-4 pb-20 space-y-6 text-left">
      {/* Header */}
      <div className="flex items-center gap-3">
        <SmartBackButton />
        <h1 className="text-2xl font-bold tracking-tight text-white">
          PPE & Equipment
        </h1>
      </div>

      {/* Intro */}
      <Card className="border-blue-500/20 bg-white/5">
        <CardContent className="p-4 space-y-4">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-blue-400" />
            <h2 className="text-lg font-semibold text-white">
              Your Last Line of Defence
            </h2>
          </div>
          <p className="text-white text-sm leading-relaxed">
            Personal Protective Equipment is the{' '}
            <span className="font-bold text-blue-400">last resort</span> in the
            hierarchy of controls — it only protects you when everything else has
            failed. But when you need it, it must be right. Your employer is
            legally required to provide PPE free of charge under the Personal
            Protective Equipment at Work Regulations 2022. You are legally required
            to wear it and look after it.
          </p>
        </CardContent>
      </Card>

      {/* PPE Items */}
      <Card className="border-blue-500/20 bg-white/5">
        <CardContent className="p-4 space-y-4">
          <h2 className="text-lg font-semibold text-blue-400">
            Essential PPE for Electricians
          </h2>

          <div className="space-y-4">
            {[
              {
                item: 'Safety Boots',
                standard: 'BS EN ISO 20345 — S3 or S1P',
                purpose: 'Protection from falling objects, penetration by sharp objects (nails, screws), slip resistance, and ankle support.',
                electrical: 'Composite or rubber-soled boots provide some insulation. Steel toe caps are standard but can conduct — look for composite toe caps if working in high-risk electrical environments.',
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
                purpose: 'Protects against falling objects, impact with fixed structures, and bumps. Required on all construction sites and most industrial sites.',
                electrical: 'Optional electrical insulation to BS EN 50365 is available but not a substitute for safe isolation. The electrical rating protects against incidental brief contact at up to 440V AC.',
                inspection: [
                  'Check shell for cracks, deep scratches, or UV degradation (chalky appearance)',
                  'Check harness webbing for fraying, tears, or loss of elasticity',
                  'Ensure adjustment mechanism works correctly',
                  'Check chin strap if fitted',
                  'Look for the date of manufacture stamp inside — replace after 5 years',
                ],
                replace: 'Every 5 years from date of manufacture (stamped inside), or immediately if it takes a significant impact.',
              },
              {
                item: 'Hi-Vis Clothing',
                standard: 'BS EN ISO 20471 — Class 2 or Class 3',
                purpose: 'Makes you visible to vehicle operators, plant machinery, and other workers. Class 3 (vest + trousers or full suit) provides the highest visibility.',
                electrical: 'No specific electrical requirement, but choose flame-retardant hi-vis if working near arc flash risks (IEC 61482-2 rated).',
                inspection: [
                  'Check fluorescent material has not faded significantly',
                  'Check retro-reflective strips are intact and not peeling',
                  'Ensure the garment is clean enough to be visible',
                  'Check fastenings (zips, velcro) work correctly',
                  'Replace when faded, torn, or when reflective strips no longer reflect',
                ],
                replace: 'When fluorescent material fades noticeably or reflective strips deteriorate. Typically 6–12 months with daily use.',
              },
              {
                item: 'Safety Glasses / Goggles',
                standard: 'BS EN 166 (eye protection)',
                purpose: 'Protection from flying debris (drilling, chasing, cutting), dust, chemical splashes, and arc flash. Side protection recommended for general site work.',
                electrical: 'For arc flash protection, use safety glasses rated to GS-ET (short circuit arc) under BS EN 166. Regular safety glasses protect against debris only.',
                inspection: [
                  'Check lenses for scratches that impair vision',
                  'Check frames and side shields for damage',
                  'Ensure they fit securely and comfortably',
                  'Check anti-fog coating is still effective',
                  'Clean regularly — dirty lenses reduce visibility and increase risk',
                ],
                replace: 'When scratched to the point of impairing vision, or when frames are damaged.',
              },
              {
                item: 'Protective Gloves',
                standard: 'BS EN 388 (mechanical) / BS EN 60903 (electrical insulating)',
                purpose: 'Mechanical gloves protect against cuts, abrasions, and punctures when handling cable, trunking, and sharp metal. Electrical insulating gloves provide protection against electric shock during live testing.',
                electrical: 'Electrical insulating gloves (BS EN 60903) are rated by class: Class 00 (500V), Class 0 (1,000V). For most electrical apprentice work, Class 0 gloves are appropriate for testing activities. Always wear leather over-gloves to protect the rubber from damage.',
                inspection: [
                  'Inflate electrical gloves to check for pin holes (roll top and squeeze)',
                  'Check for cracks, cuts, or embedded objects in the rubber',
                  'Check the date stamp — electrical gloves must be retested every 6 months',
                  'For mechanical gloves, check for worn-through areas',
                  'Ensure gloves still fit properly and allow adequate dexterity',
                ],
                replace: 'Electrical insulating gloves: retest every 6 months, replace if they fail. Mechanical gloves: replace when worn through or damaged.',
              },
              {
                item: 'Hearing Protection',
                standard: 'BS EN 352 (ear muffs and ear plugs)',
                purpose: 'Required when noise levels exceed 85 dB(A) (daily or weekly average). Common on construction sites near drilling, cutting, and plant machinery.',
                electrical: 'No specific electrical requirements. Choose ear plugs or ear muffs based on the noise level and the SNR (Single Number Rating) needed.',
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
                purpose: 'Protection from dust when chasing walls, drilling into concrete or brick, or working in dusty environments. FFP3 is required for silica dust (from concrete and morite) which can cause silicosis.',
                electrical: 'No specific electrical requirements. If working in confined spaces, a powered respirator may be required.',
                inspection: [
                  'Disposable masks: check the mask is not damp, damaged, or blocked',
                  'Check the nose clip provides a good seal',
                  'Perform a face-fit check every time you put on a mask',
                  'FFP3 masks with valves last longer but are single-shift use',
                  'Reusable half-masks: check filters are in date and seals are intact',
                ],
                replace: 'Disposable masks are single-shift use. Replace when breathing becomes difficult or the mask is damp.',
              },
              {
                item: 'Knee Pads',
                standard: 'BS EN 14404 (Type 2 recommended)',
                purpose: 'Protection when working at floor level — installing sockets, floor boxes, under-floor wiring, and any kneeling work. Prevents knee injuries and long-term joint damage.',
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
                className="border border-blue-500/20 rounded-lg p-4 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-white">{ppe.item}</h3>
                  <span className="text-blue-400 text-xs font-mono">
                    {ppe.standard}
                  </span>
                </div>
                <p className="text-white text-sm">{ppe.purpose}</p>

                <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
                  <p className="text-white text-xs">
                    <span className="font-semibold text-blue-400">
                      Electrical note:{' '}
                    </span>
                    {ppe.electrical}
                  </p>
                </div>

                <div>
                  <h4 className="text-white font-medium text-sm mb-2">
                    Inspection Checklist
                  </h4>
                  <div className="space-y-1">
                    {ppe.inspection.map((check) => (
                      <div
                        key={check}
                        className="flex items-start gap-2 text-xs text-white"
                      >
                        <CheckCircle className="h-3 w-3 text-green-400 flex-shrink-0 mt-0.5" />
                        {check}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-2">
                  <p className="text-white text-xs">
                    <span className="font-semibold text-amber-400">
                      Replace:{' '}
                    </span>
                    {ppe.replace}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Arc Flash */}
      <Card className="border-red-500/20 bg-white/5">
        <CardContent className="p-4 space-y-4">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-red-400" />
            <h2 className="text-lg font-semibold text-red-400">
              Arc Flash Protection
            </h2>
          </div>
          <p className="text-white text-sm leading-relaxed">
            An arc flash can produce temperatures up to 19,000°C and cause severe
            burns, blindness, and blast injuries. While arc flash is more common in
            high-voltage and industrial environments, it can occur at any voltage
            level. Special arc-rated PPE is required where arc flash risk has been
            identified.
          </p>

          <div className="space-y-2">
            <h3 className="font-semibold text-white text-sm">Arc-Rated PPE</h3>
            {[
              'Arc-rated face shield (BS EN 166 GS-ET)',
              'Arc-rated clothing (IEC 61482-2) — flame-retardant overalls or jacket/trousers',
              'Class 0 or Class 00 electrical insulating gloves with leather over-gloves',
              'Safety boots with electrical hazard rating',
              'Arc-rated balaclava for high-energy environments',
            ].map((item) => (
              <div
                key={item}
                className="flex items-start gap-2 text-sm text-white"
              >
                <CheckCircle className="h-4 w-4 text-red-400 flex-shrink-0 mt-0.5" />
                {item}
              </div>
            ))}
          </div>

          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
            <p className="text-white text-xs">
              <span className="font-semibold text-red-400">As an apprentice: </span>
              You should not be working in arc flash risk zones without
              specific training, PPE, and close supervision. If you are asked to
              work on high-energy systems, speak to your supervisor about the arc
              flash risk assessment.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Tool Safety */}
      <Card className="border-green-500/20 bg-white/5">
        <CardContent className="p-4 space-y-4">
          <h2 className="text-lg font-semibold text-green-400">
            Tool Safety and Inspection
          </h2>
          <p className="text-white text-sm leading-relaxed">
            Your tools are your livelihood — and they can be dangerous if not
            maintained properly. All electrical hand tools must be inspected before
            use. Power tools must have a current PAT test label and be appropriate
            for the environment.
          </p>

          <div className="space-y-3">
            <h3 className="font-semibold text-white text-sm">
              Before Using Any Tool
            </h3>
            {[
              'Visual inspection for damage, cracks, or exposed metal',
              "Check insulation on electrician's screwdrivers and pliers (rated to 1,000V AC, marked with VDE symbol)",
              'Check that power tool leads, plugs, and PAT labels are in order',
              'On construction sites, 110V tools (yellow plugs) are required — never use 230V tools unless through an RCD-protected outlet',
              'Check drill bits, saw blades, and cutting tools for damage',
              'Ensure the right tool for the job — never improvise',
            ].map((item) => (
              <div
                key={item}
                className="flex items-start gap-2 text-sm text-white"
              >
                <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0 mt-0.5" />
                {item}
              </div>
            ))}
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold text-white text-sm">
              VDE Insulated Tools
            </h3>
            <p className="text-white text-sm leading-relaxed">
              VDE-certified tools are individually tested to 10,000V AC and rated
              for working up to 1,000V AC. They are identified by the VDE triangle
              symbol and orange/red insulation. As an electrician, your core hand
              tools (screwdrivers, pliers, side cutters, strippers) should all be
              VDE-rated.
            </p>
            <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3">
              <p className="text-white text-xs">
                <span className="font-semibold text-green-400">Note: </span>
                VDE insulation is a backup safety measure — it does not replace
                safe isolation. Always isolate the circuit before working on it.
                VDE tools protect you in case of accidental contact with an
                unexpected live conductor.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Your Responsibilities */}
      <Card className="border-amber-500/20 bg-amber-500/10">
        <CardContent className="p-4 space-y-3">
          <h2 className="text-sm font-semibold text-amber-400">
            Your PPE Responsibilities
          </h2>
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
              <div
                key={item}
                className="flex items-start gap-2 text-sm text-white"
              >
                <CheckCircle className="h-4 w-4 text-amber-400 flex-shrink-0 mt-0.5" />
                {item}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Footer */}
      <Card className="border-white/10 bg-white/5">
        <CardContent className="p-4">
          <p className="text-white text-xs leading-relaxed">
            PPE standards and requirements based on the Personal Protective
            Equipment at Work Regulations 2022, BS EN standards as cited, and HSE
            guidance. Your employer must carry out a PPE risk assessment and provide
            suitable equipment free of charge. Check with your employer for
            site-specific PPE requirements.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default PPEEquipmentPage;
