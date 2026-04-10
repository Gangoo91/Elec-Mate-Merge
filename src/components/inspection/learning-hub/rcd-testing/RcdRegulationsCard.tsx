import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.04 } } };
const itemVariants = { hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0, transition: { duration: 0.25 } } };

interface Props {
  onBack: () => void;
}

const coreRegulations = [
  { number: 'Reg 411.3.3', title: 'Additional Protection by RCD', description: 'RCD protection with rated residual operating current not exceeding 30mA shall be provided for socket outlets with rated current not exceeding 32A, and for mobile equipment with current rating not exceeding 32A for use outdoors.' },
  { number: 'Reg 514.12.2', title: 'RCD Test Notice', description: 'Where an RCD is installed, a durable notice shall be fixed in a prominent position at or near the origin of the installation. It must state that the RCD should be tested at regular intervals (recommended quarterly, minimum six-monthly).' },
  { number: 'Reg 531.2', title: 'RCD Selection', description: 'The type of RCD shall be selected according to the characteristics of the installation and the loads. Type A minimum for circuits likely to produce pulsating DC residual currents. Type B where smooth DC residual currents are possible.' },
  { number: 'Reg 612.13', title: 'RCD Testing — Initial Verification', description: 'During initial verification, each RCD shall be tested to verify correct operation. Tests include verification at rated residual operating current and at the test current for additional protection.' },
  { number: 'Reg 643.7/643.8', title: 'RCD Testing — Periodic Inspection', description: 'During periodic inspection, the operation of each RCD shall be tested by means of the integral test device and by use of appropriate test equipment to verify operating times.' },
  { number: 'Section 701', title: 'Bathrooms & Shower Rooms', description: 'All circuits in locations containing a bath or shower require 30mA RCD protection. This applies to circuits supplying equipment in zones and circuits passing through zones.' },
  { number: 'Section 702', title: 'Swimming Pools', description: 'All circuits serving swimming pool and fountain installations require RCD protection with appropriate sensitivity ratings.' },
  { number: 'Section 704', title: 'Construction Sites', description: 'All socket outlet circuits on construction sites require RCD protection not exceeding 30mA for portable equipment.' },
  { number: 'Reg 411.3.4', title: 'Cables in Walls (Shallow Depth)', description: 'Where a cable is concealed in a wall or partition at a depth of less than 50mm, additional 30mA RCD protection is required unless the cable is mechanically protected or enclosed in earthed metallic containment.' },
  { number: 'Reg 131.2', title: 'RCD for Socket Circuits', description: 'Requirement for residual current device protection on final socket-outlet circuits in domestic dwellings to reduce electric shock risk, specifying sensitivity thresholds.' },
];

const otherStandards = [
  { standard: 'IET Guidance Note 3', detail: 'Table 2.17 — definitive RCD test acceptance criteria. Covers all test currents, timing limits, and phase angle requirements for all RCD types.' },
  { standard: 'BS EN 61008/61009', detail: 'Product standard for RCCBs and RCBOs. Defines manufacturing requirements, type testing, and performance characteristics.' },
  { standard: 'GS38', detail: 'HSE guidance on test equipment. Applies to RCD testers — probes, fusing, and connection safety requirements.' },
  { standard: 'Electricity at Work Regulations 1989', detail: 'Regulation 4 — duty to maintain systems to prevent danger. An RCD that fails to operate breaches this requirement. Regulation 14 — adequate precautions must be taken against electric shock.' },
  { standard: 'Building Regulations Part P', detail: 'RCD protection is mandatory for notifiable work in dwellings. Missing RCD protection on applicable circuits prevents self-certification.' },
];

const specialLocations = [
  'Bathrooms and shower rooms (Section 701) — all circuits require 30mA RCD',
  'Swimming pools and fountains (Section 702) — RCD protection mandatory',
  'Saunas (Section 703) — RCD required for all circuits in sauna zones',
  'Construction sites (Section 704) — 30mA RCD for all socket outlets',
  'Agricultural premises (Section 705) — RCD for all circuits accessible to livestock',
  'Restricted conductive locations (Section 706) — enhanced protection requirements',
  'Temporary installations at events (Section 740) — RCD for all final circuits',
  'EV charging installations (Section 722) — Type A with DC detection or Type B',
  'Medical locations (Section 710) — specific RCD requirements by group classification',
];

const RcdRegulationsCard = ({ onBack }: Props) => {
  return (
    <div>
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-white/[0.06] -mx-4 px-4 mb-5">
        <div className="py-2">
          <div className="flex items-center gap-3 h-11">
            <Button variant="ghost" size="icon" onClick={onBack} className="text-white hover:text-white hover:bg-white/10 rounded-xl h-11 w-11 touch-manipulation active:scale-[0.98]">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-base font-semibold text-white">Regulations</h1>
          </div>
        </div>
      </div>

      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-5">
        <motion.div variants={itemVariants}>
          <p className="text-xs font-medium text-yellow-400 uppercase tracking-wider mb-3">BS 7671:2018+A3:2024</p>
        </motion.div>

        {coreRegulations.map((reg, i) => (
          <motion.div key={i} variants={itemVariants}>
            <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 rounded-xl bg-yellow-400/10 border border-yellow-400/20 px-2.5 py-1.5">
                  <span className="text-xs font-bold text-yellow-400 whitespace-nowrap">{reg.number}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-white">{reg.title}</p>
                  <p className="text-sm text-white mt-1 leading-relaxed">{reg.description}</p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}

        <motion.div variants={itemVariants}>
          <p className="text-xs font-medium text-yellow-400 uppercase tracking-wider mb-3">Other Standards</p>
        </motion.div>

        {otherStandards.map((item, i) => (
          <motion.div key={i} variants={itemVariants}>
            <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4">
              <p className="text-sm font-semibold text-white">{item.standard}</p>
              <p className="text-sm text-white mt-1 leading-relaxed">{item.detail}</p>
            </div>
          </motion.div>
        ))}

        {/* Special locations */}
        <motion.div variants={itemVariants}>
          <p className="text-xs font-medium text-yellow-400 uppercase tracking-wider mb-3">Special Locations Requiring RCD Protection</p>
          <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4">
            <div className="space-y-1.5">
              {specialLocations.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-yellow-400 mt-2" />
                  <p className="text-sm text-white">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Periodic verification */}
        <motion.div variants={itemVariants}>
          <p className="text-xs font-medium text-yellow-400 uppercase tracking-wider mb-3">Periodic Verification (Reg 643.11)</p>
        </motion.div>

        <motion.div variants={itemVariants}>
          <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4">
            <div className="flex items-start gap-3 mb-3">
              <div className="flex-shrink-0 rounded-xl bg-yellow-400/10 border border-yellow-400/20 px-2.5 py-1.5">
                <span className="text-xs font-bold text-yellow-400">Reg 643.11</span>
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Periodic RCD Verification</p>
                <p className="text-sm text-white mt-1 leading-relaxed">Periodic inspection must verify RCD functionality, trip time and sensitivity, including testing for correct selectivity in cascaded RCD arrangements. Test results must be documented for comparison with previous inspections and remedial action.</p>
              </div>
            </div>
            <div className="space-y-1.5 mt-3">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-yellow-400 mt-2" />
                <p className="text-sm text-white">Compare current trip times with previous EICR results — increasing times indicate deterioration</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-yellow-400 mt-2" />
                <p className="text-sm text-white">Verify selectivity between cascaded RCDs still operates correctly — upstream S-type must not trip before downstream general type</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-yellow-400 mt-2" />
                <p className="text-sm text-white">Recommended intervals: domestic 5 years, commercial 3-5 years, industrial 1-3 years, special locations annually</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Non-compliance */}
        <motion.div variants={itemVariants}>
          <div className="rounded-2xl bg-orange-400/10 border border-orange-400/20 p-4">
            <p className="text-sm font-semibold text-white mb-2">Consequences of Non-Compliance</p>
            <div className="space-y-1.5">
              {[
                'Fatal accident liability under Health and Safety at Work Act 1974',
                'Prosecution under Electricity at Work Regulations 1989',
                'Insurance claims may be invalidated if RCD protection was absent or not tested',
                'Professional negligence for electrical contractors — competent person scheme sanctions',
                'Building control non-compliance (Part P) — unable to self-certify',
                'Landlord liability — failure to maintain electrical safety in rental properties',
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-orange-400 mt-2" />
                  <p className="text-sm text-white">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default RcdRegulationsCard;
