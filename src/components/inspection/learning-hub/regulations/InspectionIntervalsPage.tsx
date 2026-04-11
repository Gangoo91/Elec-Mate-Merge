import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.04 } } };
const itemVariants = { hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0, transition: { duration: 0.25 } } };

interface Props { onBack: () => void }

const intervals = [
  { premises: 'Domestic dwellings', interval: '10 years', change: '5 years', notes: 'Recommended maximum. Change of occupancy/tenancy triggers inspection regardless of interval.' },
  { premises: 'Residential — rental (landlord)', interval: '5 years', change: 'Every change of tenancy', notes: 'Legal requirement under Electrical Safety Standards in the Private Rented Sector (England) 2020. EICR mandatory.' },
  { premises: 'Commercial offices', interval: '5 years', change: 'Change of use', notes: 'IET recommended. Insurance may require more frequent inspection.' },
  { premises: 'Shops and retail', interval: '5 years', change: 'Change of use', notes: 'Public access increases risk. Consider 3 years for high-footfall premises.' },
  { premises: 'Restaurants and hotels', interval: '5 years', change: 'Change of use', notes: 'Kitchen environments particularly harsh on electrical installations.' },
  { premises: 'Industrial', interval: '3 years', change: 'Major changes', notes: 'Harsh environments, heavy loads, and continuous operation accelerate deterioration.' },
  { premises: 'Hospitals and medical', interval: '1 year', change: 'Any modification', notes: 'Life-safety critical. Section 710 requirements. Some circuits require more frequent testing.' },
  { premises: 'Educational establishments', interval: '5 years', change: 'Change of use', notes: 'Vulnerable occupants. Consider 3 years for labs and workshops.' },
  { premises: 'Places of worship', interval: '5 years', change: 'Major changes', notes: 'Often historic buildings with aged installations. Insurance often mandates inspection.' },
  { premises: 'Leisure and entertainment', interval: '3 years', change: 'Major changes', notes: 'Public access, temporary installations, complex lighting systems.' },
  { premises: 'Agricultural', interval: '3 years', change: 'Major changes', notes: 'Harsh environment — moisture, dust, livestock damage. Earth electrodes checked annually.' },
  { premises: 'Construction sites', interval: '3 months', change: 'Relocations', notes: 'Temporary installations. Portable equipment tested more frequently (PAT).' },
  { premises: 'Swimming pools', interval: '1 year', change: 'Any modification', notes: 'High-risk special location. Supplementary bonding checked at every inspection.' },
  { premises: 'Petrol filling stations', interval: '1 year', change: 'Any modification', notes: 'Hazardous area — Zone 1/2 classifications apply. Specialist inspection required.' },
  { premises: 'Caravan parks', interval: '1 year', change: 'Seasonal', notes: 'Outdoor installations exposed to weather. Check before each season opening.' },
  { premises: 'Marinas', interval: '1 year', change: 'Any modification', notes: 'Shore supply connections. Section 709 requirements. Salt water environment accelerates corrosion.' },
];

const InspectionIntervalsPage = ({ onBack }: Props) => {
  return (
    <div>
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-white/[0.06] -mx-4 px-4 mb-5">
        <div className="py-2">
          <div className="flex items-center gap-3 h-11">
            <Button variant="ghost" size="icon" onClick={onBack} className="text-white hover:text-white hover:bg-white/10 rounded-xl h-11 w-11 touch-manipulation active:scale-[0.98]">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-base font-semibold text-white">Inspection Intervals</h1>
          </div>
        </div>
      </div>

      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-4">
        <motion.div variants={itemVariants}>
          <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4">
            <p className="text-sm text-white leading-relaxed">
              IET recommended maximum intervals between periodic inspections. These are recommendations — not legal requirements (except rental properties). Insurance policies, local authority requirements, and risk assessments may require more frequent inspection.
            </p>
          </div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <div className="rounded-2xl bg-white/[0.03] border border-white/10 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-white/[0.08]">
                    <th className="text-left p-3 font-semibold text-white/60">Premises</th>
                    <th className="text-left p-3 font-semibold text-yellow-400">Max Interval</th>
                    <th className="text-left p-3 font-semibold text-white/60">Also On</th>
                  </tr>
                </thead>
                <tbody>
                  {intervals.map((row, i) => (
                    <tr key={i} className="border-b border-white/[0.04]">
                      <td className="p-3 text-white font-medium">{row.premises}</td>
                      <td className="p-3 text-yellow-400 font-bold">{row.interval}</td>
                      <td className="p-3 text-white/60">{row.change}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>

        {/* Details for key premises */}
        <motion.div variants={itemVariants}>
          <p className="text-xs font-medium text-yellow-400 uppercase tracking-wider mb-3">Notes</p>
        </motion.div>

        {intervals.filter(i => i.notes.length > 50).map((item, i) => (
          <motion.div key={i} variants={itemVariants}>
            <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4">
              <div className="flex items-center justify-between mb-1">
                <p className="text-sm font-semibold text-white">{item.premises}</p>
                <span className="text-[10px] font-bold text-yellow-400 bg-yellow-400/10 px-2 py-0.5 rounded-lg">{item.interval}</span>
              </div>
              <p className="text-xs text-white/80">{item.notes}</p>
            </div>
          </motion.div>
        ))}

        <motion.div variants={itemVariants}>
          <div className="rounded-2xl bg-orange-400/10 border border-orange-400/20 p-4">
            <p className="text-sm font-semibold text-white mb-2">Legal Requirement — Rental Properties</p>
            <p className="text-sm text-white leading-relaxed">
              The Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020 require landlords to have the electrical installation inspected and tested by a qualified person at least every 5 years, or on change of tenancy. A valid EICR must be provided to tenants within 28 days. Failure to comply can result in fines up to £30,000.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default InspectionIntervalsPage;
