import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.04 } } };
const itemVariants = { hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0, transition: { duration: 0.25 } } };

interface Props { onBack: () => void }

const locations = [
  {
    title: 'Bathrooms & Showers (Section 701)',
    zones: [
      { zone: 'Zone 0', area: 'Inside the bath or shower tray', rules: 'Only SELV at max 12V AC / 30V DC. IPX7 minimum. No switches, sockets or accessories.' },
      { zone: 'Zone 1', area: 'Above bath/shower to 2.25m height', rules: 'IPX4 minimum (IPX5 if jets). Only fixed equipment suitable for the zone. Switches permitted if SELV only.' },
      { zone: 'Zone 2', area: '0.6m beyond Zone 1', rules: 'IPX4 minimum. Shaver sockets to BS EN 61558-2-5 permitted. Luminaires, fans, and heaters if suitable IP rating.' },
      { zone: 'Outside zones', area: 'Beyond Zone 2', rules: 'Standard requirements apply. Normal socket outlets permitted (with 30mA RCD). Switches for bathroom circuits located here.' },
    ],
    keyRules: [
      '30mA RCD protection required on ALL circuits in the bathroom — including circuits that pass through',
      'No socket outlets in Zones 0, 1 or 2 (except shaver sockets in Zone 2)',
      'Switches: ceiling pull switches inside, plate switches outside zones only',
      'Supplementary bonding: only required where disconnection times cannot be met',
      'Extractor fans: must be IP rated for their zone location',
      'Electric showers: ceiling-mounted isolator, dedicated circuit, RCD protected',
    ],
  },
  {
    title: 'EV Charging (Section 722)',
    zones: [],
    keyRules: [
      'Dedicated circuit from consumer unit — not shared with other loads',
      'RCD: Type A with 6mA DC detection (Type A-EV) or Type B — check charger manufacturer requirements',
      'PME earthing: risk assessment required (Reg 411.4.2). Galvanic isolation in charger may satisfy this. If not, separate TT electrode may be needed',
      'Cable sizing: typically 6mm² for 7kW (32A), 10mm² for longer runs. Account for continuous duty — no diversity',
      'SPD: Type 2 at origin recommended',
      'Labelling: warning notices at origin, CU, and charging point',
      'DNO notification: G98 for ≤3.68kW single phase, G99 for larger or export-capable installations',
      'V2G (vehicle-to-grid): falls under new Chapter 82 prosumer requirements (A3)',
      'AFDD: not specifically required for EV circuits but consider for domestic installations',
      'Outdoor installations: IP-rated enclosure, cable protection, RCBO or dedicated RCD',
    ],
  },
  {
    title: 'Construction Sites (Section 704)',
    zones: [],
    keyRules: [
      '30mA RCD protection on ALL socket outlet circuits — no exceptions',
      'Reduced low voltage (110V CTE) required for portable hand tools and hand lamps',
      'SELV (typically 25V) required for portable hand lamps in confined spaces',
      'Temporary supplies must be inspected and tested before use',
      'Supply cables: SWA or equivalent mechanical protection required',
      'Distribution equipment: robust, IP-rated for the site environment',
      'Regular periodic inspection required — typically every 3 months',
      'Emergency switching must be readily accessible on site',
    ],
  },
  {
    title: 'Agricultural Premises (Section 705)',
    zones: [],
    keyRules: [
      '30mA RCD protection on ALL circuits accessible to livestock',
      'Supplementary bonding: to all simultaneously accessible extraneous-conductive-parts in livestock areas',
      'Cable protection: enhanced mechanical protection required — livestock damage is common',
      'Socket outlets: IPX4 minimum in areas subject to washdown',
      'Switching devices: located outside reach of livestock',
      'Earthing: TT systems common — earth electrode testing essential',
      'Fire risk: hay storage areas require enhanced fire protection measures',
      'Recommended inspection interval: 3 years',
    ],
  },
  {
    title: 'Swimming Pools (Section 702)',
    zones: [],
    keyRules: [
      'Zone 0 (pool basin): only SELV ≤12V AC. Equipment rated for immersion.',
      'Zone 1 (up to 2m from pool edge, 2.5m height): only SELV or equipment specifically designed for the zone',
      'Zone 2 (1.5m beyond Zone 1): IPX4 minimum. Socket outlets permitted with 30mA RCD.',
      'Supplementary bonding: mandatory — connect all extraneous-conductive-parts within Zones 0, 1 and 2',
      'Underwater lighting: SELV only. Transformer located outside Zone 2.',
      'Pool pump motors: mechanical protection, correct IP rating for location',
      'Recommended inspection interval: 1 year',
    ],
  },
  {
    title: 'Medical Locations (Section 710)',
    zones: [],
    keyRules: [
      'Group 0 (no contact with patients): standard requirements — no special measures',
      'Group 1 (body contact with patients): additional requirements for earth bonding and RCD selection',
      'Group 2 (life-support equipment): IT systems with IMD, enhanced bonding, specific RCD/AFDD considerations',
      'Supplementary bonding: mandatory in Group 1 and Group 2 areas',
      'RCDs: must not compromise life-support — some circuits exempt from RCD protection',
      'AFDDs: not required in Group 1 ward areas (A3) — continuity takes priority',
      'Standby supplies: automatic transfer within specified times for critical circuits',
      'Testing: enhanced periodic inspection intervals — typically annually',
    ],
  },
];

const SpecialLocationsPage = ({ onBack }: Props) => {
  return (
    <div>
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-white/[0.06] -mx-4 px-4 mb-5">
        <div className="py-2">
          <div className="flex items-center gap-3 h-11">
            <Button variant="ghost" size="icon" onClick={onBack} className="text-white hover:text-white hover:bg-white/10 rounded-xl h-11 w-11 touch-manipulation active:scale-[0.98]">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-base font-semibold text-white">Special Locations</h1>
          </div>
        </div>
      </div>

      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-5">
        <motion.div variants={itemVariants}>
          <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4">
            <p className="text-sm text-white leading-relaxed">
              Part 7 of BS 7671 covers special installations and locations that require additional or modified rules beyond the general requirements. These are the locations electricians encounter most often.
            </p>
          </div>
        </motion.div>

        {locations.map((loc, i) => (
          <motion.div key={i} variants={itemVariants}>
            <div className="rounded-2xl bg-white/[0.03] border border-white/10 overflow-hidden">
              <div className="px-4 py-3 bg-yellow-400/5 border-b border-white/[0.06]">
                <p className="text-sm font-semibold text-white">{loc.title}</p>
              </div>
              <div className="p-4 space-y-3">
                {/* Zones if applicable */}
                {loc.zones.length > 0 && (
                  <div className="space-y-1.5">
                    <p className="text-xs font-semibold text-white/60 mb-2">Zones</p>
                    {loc.zones.map((z, j) => (
                      <div key={j} className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-3">
                        <div className="flex items-center justify-between mb-1">
                          <p className="text-xs font-bold text-yellow-400">{z.zone}</p>
                          <p className="text-[10px] text-white/40">{z.area}</p>
                        </div>
                        <p className="text-xs text-white">{z.rules}</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Key rules */}
                <div className="space-y-1.5">
                  {loc.zones.length > 0 && <p className="text-xs font-semibold text-white/60 mb-1">Key Rules</p>}
                  {loc.keyRules.map((rule, j) => (
                    <div key={j} className="flex items-start gap-2">
                      <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-yellow-400 mt-1.5" />
                      <p className="text-xs text-white leading-relaxed">{rule}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default SpecialLocationsPage;
