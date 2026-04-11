import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.04 } } };
const itemVariants = { hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0, transition: { duration: 0.25 } } };

interface Props { onBack: () => void }

const parts = [
  { part: 'Part 1', title: 'Scope, Object and Fundamental Principles', chapters: 'Chapters 11-13', summary: 'Defines what BS 7671 covers, its objectives, and the fundamental principles of electrical safety — protection against electric shock, fire, thermal effects, overcurrent, and fault current. Sets the framework for everything that follows.', keyRegs: ['Reg 120.1 — Scope of BS 7671', 'Reg 131.2 — Protection against electric shock', 'Reg 132.2 — Determination of fault current', 'Reg 133.2 — Switching and isolation'] },
  { part: 'Part 2', title: 'Definitions', chapters: 'Chapter 21', summary: 'Definitions of all technical terms used throughout BS 7671. If you are unsure what a term means in context, Part 2 is the authoritative source.', keyRegs: ['All defined terms used in BS 7671'] },
  { part: 'Part 3', title: 'Assessment of General Characteristics', chapters: 'Chapters 31-34', summary: 'Requirements for assessing the installation before design — supply characteristics, nature of demand, compatibility, and maintainability. This is the design stage.', keyRegs: ['Reg 311 — Purpose and supply', 'Reg 313 — Supply characteristics', 'Reg 314 — Division of installation'] },
  { part: 'Part 4', title: 'Protection for Safety', chapters: 'Chapters 41-44', summary: 'The core safety requirements — protection against electric shock (ADS, basic, fault), thermal effects, overcurrent, and voltage disturbances. This is where disconnection times, Zs limits, and RCD requirements live.', keyRegs: ['Reg 411.3.2 — Disconnection times', 'Reg 411.3.3 — Additional RCD protection', 'Reg 434 — Fault current protection'] },
  { part: 'Part 5', title: 'Selection and Erection of Equipment', chapters: 'Chapters 51-56', summary: 'Requirements for selecting and installing all electrical equipment — wiring systems, switchgear, earthing, surge protection, generators, and low voltage generation.', keyRegs: ['Reg 521 — Wiring systems', 'Reg 531 — RCD selection', 'Reg 534 — SPD requirements', 'Reg 543 — Earthing conductors'] },
  { part: 'Part 6', title: 'Inspection and Testing', chapters: 'Chapters 61-64', summary: 'ALL testing requirements — initial verification, periodic inspection, the test sequence, acceptance criteria, and certification. This is the part that governs everything in our I&T Hub.', keyRegs: ['Reg 612 — All test requirements', 'Reg 643 — Periodic inspection', 'Appendix 6 — Model certificates'] },
  { part: 'Part 7', title: 'Special Installations or Locations', chapters: 'Sections 701-753', summary: 'Additional requirements for specific locations — bathrooms, swimming pools, construction sites, medical locations, EV charging, solar PV, and more. Part 7 modifies or adds to the general requirements of Parts 1-6.', keyRegs: ['Section 701 — Bathrooms', 'Section 704 — Construction sites', 'Section 710 — Medical locations', 'Section 722 — EV charging'] },
  { part: 'Part 8', title: 'Prosumer Installations (NEW — A3:2024)', chapters: 'Chapters 82-83', summary: 'NEW in A3. Covers prosumer electrical installations — consumers who also generate or store energy. Solar PV, battery storage, V2G, EEMS, anti-islanding, operating modes, and interaction with the DNO network.', keyRegs: ['Chapter 82 — Prosumer scope', 'Reg 825 — EEMS requirements', 'Reg 826 — Protection coordination'] },
];

const BS7671StructurePage = ({ onBack }: Props) => {
  return (
    <div>
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-white/[0.06] -mx-4 px-4 mb-5">
        <div className="py-2">
          <div className="flex items-center gap-3 h-11">
            <Button variant="ghost" size="icon" onClick={onBack} className="text-white hover:text-white hover:bg-white/10 rounded-xl h-11 w-11 touch-manipulation active:scale-[0.98]">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-base font-semibold text-white">BS 7671 Structure</h1>
          </div>
        </div>
      </div>

      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-5">
        <motion.div variants={itemVariants}>
          <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4">
            <p className="text-sm text-white leading-relaxed">
              BS 7671 is organised into 8 Parts, each covering a different aspect of electrical installation. Parts 1-6 are general requirements. Part 7 covers special locations. Part 8 (new in A3) covers prosumer installations.
            </p>
          </div>
        </motion.div>

        {parts.map((p, i) => (
          <motion.div key={i} variants={itemVariants}>
            <div className="rounded-2xl bg-white/[0.03] border border-white/10 overflow-hidden">
              <div className="flex items-stretch">
                <div className={`w-14 ${i === 7 ? 'bg-yellow-400/15' : 'bg-white/[0.04]'} flex items-center justify-center border-r border-white/[0.06] shrink-0`}>
                  <span className={`text-lg font-black ${i === 7 ? 'text-yellow-400' : 'text-white'}`}>{i + 1}</span>
                </div>
                <div className="flex-1 p-4 space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-semibold text-white">{p.title}</p>
                    <span className="text-[10px] text-white shrink-0">{p.chapters}</span>
                  </div>
                  <p className="text-sm text-white leading-relaxed">{p.summary}</p>
                  <div className="space-y-1">
                    {p.keyRegs.map((reg, j) => (
                      <div key={j} className="flex items-start gap-2">
                        <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-yellow-400 mt-1.5" />
                        <p className="text-xs text-white">{reg}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default BS7671StructurePage;
