import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Loader2, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.04 } } };
const itemVariants = { hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0, transition: { duration: 0.25 } } };

interface HandoutDef {
  id: string;
  title: string;
  description: string;
  accentColor: string;
  filename: string;
  pages: string;
  category: 'essential' | 'coming-soon';
}

const handouts: HandoutDef[] = [
  {
    id: 'electrical-safety',
    title: 'Electrical Safety Guide',
    description: 'Consumer unit explained, RCD testing, warning signs, socket safety, wattage guide, bathroom/outdoor rules, smoke alarms, emergencies.',
    accentColor: 'from-emerald-500 via-emerald-400 to-green-400',
    filename: 'Electrical-Safety-Guide',
    pages: '4 pages',
    category: 'essential',
  },
  {
    id: 'energy-saving',
    title: 'Energy Saving Tips',
    description: 'LED savings, heating tips, standby costs, smart home tech, solar PV, battery storage, EV charging, tariff advice.',
    accentColor: 'from-elec-yellow via-amber-400 to-orange-400',
    filename: 'Energy-Saving-Tips',
    pages: '3 pages',
    category: 'essential',
  },
  {
    id: 'eicr-explained',
    title: 'Your EICR Explained',
    description: 'Classification codes, satisfactory vs unsatisfactory, landlord obligations, common findings in plain English.',
    accentColor: 'from-blue-500 via-blue-400 to-cyan-400',
    filename: 'Your-EICR-Explained',
    pages: '2 pages',
    category: 'essential',
  },
  {
    id: 'landlord-guide',
    title: 'Landlord EICR Guide',
    description: 'Legal obligations, £30k penalties, 28-day rule, HMO requirements, smoke/CO alarms, insurance, tenant changeover checklist.',
    accentColor: 'from-amber-500 via-amber-400 to-yellow-400',
    filename: 'Landlord-EICR-Guide',
    pages: '3 pages',
    category: 'essential',
  },
  {
    id: 'new-build-handover',
    title: 'New Build Handover',
    description: 'Consumer unit explained, isolator locations, socket/lighting/alarm guidance, maintenance schedule, future-proofing, troubleshooting.',
    accentColor: 'from-cyan-500 via-cyan-400 to-blue-400',
    filename: 'New-Build-Handover',
    pages: '4 pages',
    category: 'essential',
  },
  {
    id: 'ev-charging-guide',
    title: 'EV Charging Guide',
    description: 'Smart charging, tariff comparison, LED indicators, maintenance, troubleshooting, cold weather care, OZEV grants, solar + EV.',
    accentColor: 'from-emerald-500 via-teal-400 to-cyan-400',
    filename: 'EV-Charging-Guide',
    pages: '3 pages',
    category: 'essential',
  },
  {
    id: 'fire-safety-tenants',
    title: 'Fire Safety for Tenants',
    description: 'Alarm testing, fire prevention, escape planning, fire doors, CO poisoning, night-time checklist, legal rights.',
    accentColor: 'from-red-500 via-rose-400 to-pink-400',
    filename: 'Fire-Safety-Tenants',
    pages: '3 pages',
    category: 'essential',
  },
  {
    id: 'fire-alarm-guide',
    title: 'Fire Alarm System Guide',
    description: 'Panel signals, system categories L1-M, BS 5839-1:2025 changes, detector types, weekly testing, log book, false alarms.',
    accentColor: 'from-red-500 via-orange-400 to-amber-400',
    filename: 'Fire-Alarm-Guide',
    pages: '4 pages',
    category: 'essential',
  },
  {
    id: 'pat-testing-explained',
    title: 'PAT Testing Explained',
    description: 'Equipment classes, test types, label meanings, frequency table, legal duties, daily user checks, common failures.',
    accentColor: 'from-violet-500 via-purple-400 to-indigo-400',
    filename: 'PAT-Testing-Explained',
    pages: '3 pages',
    category: 'essential',
  },
];

const inputCn = 'h-11 text-base touch-manipulation bg-white/[0.06] border-white/[0.08] text-white placeholder:text-white/30 focus:border-yellow-500 focus:ring-yellow-500';

export default function ClientHandoutsPage() {
  const navigate = useNavigate();
  const [generatingId, setGeneratingId] = useState<string | null>(null);
  const [showLocationFields, setShowLocationFields] = useState(false);
  const [locations, setLocations] = useState({
    cu_location: '',
    main_switch_rating: '',
    gas_valve_location: '',
    water_stopcock_location: '',
    boiler_location: '',
    immersion_location: '',
  });

  const handleGenerate = async (handout: HandoutDef) => {
    if (handout.category === 'coming-soon') {
      toast.info('This template is coming soon');
      return;
    }

    setGeneratingId(handout.id);
    try {
      const { data: cpData } = await supabase.rpc('get_my_company_profile');
      const cp = Array.isArray(cpData) ? cpData[0] : cpData;

      const payload: Record<string, string> = {
        company_name: cp?.company_name || '',
        company_phone: cp?.company_phone || '',
        company_email: cp?.company_email || '',
        company_website: cp?.company_website || '',
        company_address: cp?.company_address || '',
        company_logo: cp?.logo_data_url || cp?.logo_url || '',
        scheme_logo: cp?.scheme_logo_data_url || '',
        registration_scheme: cp?.registration_scheme || '',
        registration_number: cp?.registration_number || '',
      };

      if (handout.id === 'new-build-handover') {
        Object.entries(locations).forEach(([key, value]) => {
          if (value) payload[key] = value;
        });
      }

      toast.success('Generating PDF...');

      const { data: pdfResult, error: pdfError } = await supabase.functions.invoke(
        'generate-client-handout-pdf',
        { body: { formData: payload, handoutType: handout.id } }
      );

      if (pdfError || !pdfResult?.download_url) {
        toast.error('Failed to generate — please try again');
        return;
      }

      const { openOrDownloadPdf } = await import('@/utils/pdf-download');
      await openOrDownloadPdf(pdfResult.download_url, `${handout.filename}.pdf`);
      toast.success(`${handout.title} ready`);
    } catch (err) {
      console.error('Handout error:', err);
      toast.error('Failed to generate handout');
    } finally {
      setGeneratingId(null);
    }
  };

  return (
    <div className="-mt-3 sm:-mt-4 md:-mt-6 bg-background pb-24">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm">
        <div className="px-4 py-2">
          <div className="flex items-center gap-3 h-11">
            <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="text-white hover:text-white hover:bg-white/10 rounded-lg w-9 h-9 flex-shrink-0 touch-manipulation active:scale-[0.98]">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-sm font-bold text-white tracking-wide uppercase">Client Handouts</h1>
          </div>
        </div>
        <div className="h-[2px] bg-gradient-to-r from-emerald-500/40 via-emerald-500/20 to-transparent" />
      </div>

      <motion.main variants={containerVariants} initial="hidden" animate="visible" className="px-4 py-4 space-y-4 max-w-3xl mx-auto">
        {/* Intro */}
        <motion.div variants={itemVariants} className="relative overflow-hidden card-surface-interactive rounded-2xl">
          <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-emerald-500/50 via-emerald-500/25 to-transparent" />
          <div className="relative z-10 p-4">
            <p className="text-sm font-bold text-white">Professional branded documents</p>
            <p className="text-xs text-white mt-1 leading-relaxed">
              Your company name, logo, phone and email are added automatically from Business Settings. Leave them with clients after jobs.
            </p>
          </div>
        </motion.div>

        {/* Handout cards */}
        <motion.section variants={itemVariants} className="space-y-3">
          <div className="border-b border-white/[0.06] pb-1">
            <div className="h-[2px] w-full rounded-full bg-gradient-to-r from-emerald-500/40 to-emerald-500/10 mb-2" />
            <h2 className="text-xs font-medium text-white uppercase tracking-wider">
              {handouts.length} Templates
            </h2>
          </div>

          {handouts.map((handout) => (
            <motion.div key={handout.id} variants={itemVariants}>
              <div className="group relative overflow-hidden card-surface-interactive rounded-2xl">
                <div className={cn('absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r opacity-40 group-hover:opacity-100 transition-opacity', handout.accentColor)} />
                <div className="relative z-10 p-4">
                  {/* Title row */}
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-[15px] font-semibold text-white leading-tight group-hover:text-elec-yellow transition-colors">
                        {handout.title}
                      </h3>
                    </div>
                    <span className="text-[10px] font-bold text-white/30 bg-white/[0.04] border border-white/[0.06] px-2 py-0.5 rounded flex-shrink-0">
                      {handout.pages}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-[12px] text-white leading-relaxed mb-3">{handout.description}</p>

                  {/* Location fields for New Build Handover */}
                  {handout.id === 'new-build-handover' && (
                    <div className="mb-3">
                      <button
                        onClick={(e) => { e.stopPropagation(); setShowLocationFields(!showLocationFields); }}
                        className="text-[11px] font-medium text-elec-yellow touch-manipulation active:scale-[0.98]"
                      >
                        {showLocationFields ? 'Hide location fields' : 'Add isolator locations (optional)'}
                      </button>
                      {showLocationFields && (
                        <div className="space-y-2 mt-2">
                          {[
                            { key: 'cu_location', label: 'Consumer unit location', placeholder: 'e.g. Under stairs cupboard' },
                            { key: 'main_switch_rating', label: 'Main switch rating', placeholder: 'e.g. 100A' },
                            { key: 'gas_valve_location', label: 'Gas valve location', placeholder: 'e.g. Next to gas meter' },
                            { key: 'water_stopcock_location', label: 'Water stopcock location', placeholder: 'e.g. Under kitchen sink' },
                            { key: 'boiler_location', label: 'Boiler isolator location', placeholder: 'e.g. Airing cupboard' },
                            { key: 'immersion_location', label: 'Immersion heater (if fitted)', placeholder: 'e.g. Hot press, landing' },
                          ].map(({ key, label, placeholder }) => (
                            <div key={key}>
                              <Label className="text-white text-[10px] mb-1 block">{label}</Label>
                              <Input
                                value={locations[key as keyof typeof locations]}
                                onChange={(e) => setLocations(p => ({ ...p, [key]: e.target.value }))}
                                className={inputCn}
                                placeholder={placeholder}
                              />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Download button */}
                  <button
                    className={cn(
                      'w-full flex items-center justify-between h-11 px-4 rounded-xl text-sm font-medium touch-manipulation active:scale-[0.98] transition-all',
                      handout.category === 'coming-soon'
                        ? 'bg-white/[0.04] border border-white/[0.06] text-white/40 cursor-not-allowed'
                        : 'bg-white/[0.06] border border-white/[0.08] text-white hover:bg-white/[0.1]'
                    )}
                    onClick={() => handleGenerate(handout)}
                    disabled={generatingId === handout.id || handout.category === 'coming-soon'}
                  >
                    <span>
                      {generatingId === handout.id ? (
                        <span className="flex items-center gap-2">
                          <Loader2 className="h-4 w-4 animate-spin text-elec-yellow" />
                          Generating...
                        </span>
                      ) : handout.category === 'coming-soon' ? (
                        'Coming Soon'
                      ) : (
                        'Download PDF'
                      )}
                    </span>
                    {handout.category !== 'coming-soon' && generatingId !== handout.id && (
                      <ChevronRight className="h-4 w-4 text-white/30" />
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.section>
      </motion.main>
    </div>
  );
}
