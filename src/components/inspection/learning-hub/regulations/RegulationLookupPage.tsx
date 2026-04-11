import { useState } from 'react';
import { ArrowLeft, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.04 } } };
const itemVariants = { hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0, transition: { duration: 0.25 } } };

interface Props { onBack: () => void }

const commonRegulations = [
  { number: '411.3.2', title: 'Disconnection Times', summary: '0.4s for final circuits ≤63A (sockets), 5s for distribution circuits and fixed equipment.' },
  { number: '411.3.3', title: 'Additional RCD Protection', summary: '30mA RCD required for socket outlets ≤32A and mobile equipment outdoors.' },
  { number: '411.3.4', title: 'Cables in Walls', summary: '30mA RCD required for cables concealed in walls at depth less than 50mm unless mechanically protected.' },
  { number: '434.5.2', title: 'Fault Current Calculation', summary: 'Ipf = U₀ ÷ Zs. Must not exceed breaking capacity of protective device.' },
  { number: '514.8', title: 'Circuit Chart', summary: 'Durable chart or schedule at the distribution board showing every circuit.' },
  { number: '514.12.2', title: 'RCD Test Notice', summary: 'Durable notice at origin stating RCDs should be tested quarterly/six-monthly.' },
  { number: '522.6.6', title: 'Cables in Safe Zones', summary: 'Cables in walls must be in prescribed safe zones or mechanically protected.' },
  { number: '531.2', title: 'RCD Type Selection', summary: 'Type A minimum for pulsating DC loads. Type B where smooth DC residual currents possible.' },
  { number: '612.3', title: 'Insulation Resistance', summary: 'IR test between live conductors and earth. Min 1.0MΩ at 500V DC for LV circuits.' },
  { number: '612.6', title: 'Polarity Verification', summary: 'Polarity must be verified for every circuit. Single-pole devices in line conductor only.' },
  { number: '612.11', title: 'PFC Measurement', summary: 'Prospective fault current must be measured at origin. Record higher of L-E and L-N.' },
  { number: '612.13', title: 'Functional Testing', summary: 'All assemblies and components subjected to functional test for correct operation.' },
  { number: '132.15', title: 'Isolation Provision', summary: 'Suitable means for safely isolating every installation, circuit and item of equipment.' },
  { number: '133.2', title: 'Single-Pole Devices', summary: 'Single-pole fuses, switches or circuit-breakers in line conductor only.' },
  { number: '134.2.2', title: 'Zs Definition', summary: 'Earth fault loop impedance: CPC + earthing + transformer + line conductor.' },
  { number: '643.3', title: 'IR Initial Verification', summary: 'Insulation resistance measured prior to energisation of new installations.' },
  { number: '643.7', title: 'Zs Measurement', summary: 'Earth fault loop impedance measured at furthest point of each circuit.' },
  { number: '643.10', title: 'Functional Testing', summary: 'Functional tests for domestic, commercial, industrial and medical installations.' },
  { number: '643.11', title: 'Periodic Verification', summary: 'Periodic testing of RCDs, continuity, IR, Zs with comparison to previous results.' },
  { number: '753.554.4', title: 'Prosumer Installations', summary: 'Chapter 82 — battery storage, PV, EV charging, EEMS, anti-islanding requirements.' },
  // Installation & cables
  { number: '521', title: 'Wiring Systems', summary: 'Selection and erection of wiring systems. Cable types, installation methods, and protection requirements.' },
  { number: '522.6.6', title: 'Cables in Walls', summary: 'Cables in walls must be in prescribed safe zones or mechanically protected.' },
  { number: '525', title: 'Voltage Drop', summary: 'Max 3% for lighting, 5% for other circuits from origin to load.' },
  { number: '526', title: 'Connections', summary: 'Every connection must be accessible for inspection. Soldered connections not permitted as sole means.' },
  { number: '543', title: 'Earthing Conductors', summary: 'Sizing, routing and protection of main earthing conductors and bonding conductors.' },
  { number: '544', title: 'Earth Electrodes', summary: 'Types, installation, testing and maintenance of earth electrodes for TT systems.' },
  // Protection
  { number: '421.1', title: 'Fire Protection', summary: 'Selection and installation to minimise fire risk. Non-combustible CU enclosures for domestic.' },
  { number: '433', title: 'Overload Protection', summary: 'Protection of conductors against overload. MCB/fuse selection and cable coordination.' },
  { number: '443', title: 'Overvoltage Protection', summary: 'Protection against transient and temporary overvoltages. SPD requirements.' },
  { number: '534', title: 'SPD Requirements', summary: 'Selection, installation and coordination of surge protection devices.' },
  // Earthing & bonding
  { number: '411.4.2', title: 'PME Earthing Restrictions', summary: 'Restrictions on PME earthing for caravan parks, marinas, construction sites, and PV/BESS installations.' },
  { number: '542', title: 'Earthing Arrangements', summary: 'Provision of earthing. MET, earthing conductor, bonding conductor requirements.' },
  { number: '544.1', title: 'Main Bonding', summary: 'Main protective bonding to gas, water, oil, structural steel, and other services.' },
  // Special locations
  { number: '701', title: 'Bathrooms & Showers', summary: 'Zones, IP ratings, RCD requirements, switch positioning, bonding for wet locations.' },
  { number: '702', title: 'Swimming Pools', summary: 'Zones, SELV requirements, supplementary bonding, underwater lighting.' },
  { number: '704', title: 'Construction Sites', summary: 'Reduced voltage, 30mA RCD on all sockets, temporary supply requirements.' },
  { number: '705', title: 'Agricultural Premises', summary: 'Livestock protection, enhanced mechanical protection, washdown requirements.' },
  { number: '710', title: 'Medical Locations', summary: 'Group classifications, IT systems, enhanced bonding, RCD/AFDD considerations.' },
  { number: '722', title: 'EV Charging', summary: 'RCD type selection, PME considerations, dedicated circuits, DNO notification.' },
  // Documentation & labelling
  { number: '514.11', title: 'Warning Notices', summary: 'Warning notices at isolation points, dual supplies, stored energy equipment.' },
  { number: '514.15', title: 'Labelling', summary: 'Identification of switchgear, protective devices, circuits and equipment.' },
  { number: '537', title: 'Switching & Isolation', summary: 'Requirements for isolation, switching, emergency switching and functional switching.' },
  // Testing specifics
  { number: '612.2', title: 'Continuity Testing', summary: 'Continuity of protective conductors including ring final circuits.' },
  { number: '612.4', title: 'SELV/PELV Separation', summary: 'Verification of separation between SELV/PELV and other circuits.' },
  { number: '612.9', title: 'Voltage Drop Check', summary: 'Verification of voltage drop by measurement or calculation.' },
  // A3 specific
  { number: '421.1.7', title: 'AFDD Requirements', summary: 'Arc fault detection devices for HMO/HRRB socket circuits up to 32A (A3).' },
  { number: '825', title: 'EEMS Requirements', summary: 'Electrical Energy Management System for prosumer installations (A3).' },
  { number: '826', title: 'Prosumer Protection', summary: 'Protection coordination for local generation, storage and controllable loads (A3).' },
  { number: '131.7', title: 'Continuity of Supply', summary: 'Provision for maintained supply to essential services during interruptions.' },
];

const RegulationLookupPage = ({ onBack }: Props) => {
  const [search, setSearch] = useState('');

  const filtered = search.length > 0
    ? commonRegulations.filter(r =>
        r.number.includes(search) ||
        r.title.toLowerCase().includes(search.toLowerCase()) ||
        r.summary.toLowerCase().includes(search.toLowerCase())
      )
    : commonRegulations;

  return (
    <div>
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-white/[0.06] -mx-4 px-4 mb-5">
        <div className="py-2">
          <div className="flex items-center gap-3 h-11">
            <Button variant="ghost" size="icon" onClick={onBack} className="text-white hover:text-white hover:bg-white/10 rounded-xl h-11 w-11 touch-manipulation active:scale-[0.98]">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-base font-semibold text-white">Regulation Lookup</h1>
          </div>
        </div>
      </div>

      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-4">
        {/* Search */}
        <motion.div variants={itemVariants}>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by number, title or keyword..."
              className="h-11 pl-10 text-base touch-manipulation bg-white/[0.06] border-white/[0.08] text-white placeholder:text-white/30"
            />
          </div>
        </motion.div>

        {/* Results */}
        {filtered.map((reg, i) => (
          <motion.div key={reg.number} variants={itemVariants}>
            <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 rounded-xl bg-yellow-400/10 border border-yellow-400/20 px-2.5 py-1.5">
                  <span className="text-xs font-bold text-yellow-400 whitespace-nowrap">{reg.number}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-white">{reg.title}</p>
                  <p className="text-sm text-white/80 mt-1">{reg.summary}</p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}

        {filtered.length === 0 && (
          <motion.div variants={itemVariants}>
            <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-6 text-center">
              <p className="text-sm text-white/60">No regulations match your search. Try a different number or keyword.</p>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default RegulationLookupPage;
