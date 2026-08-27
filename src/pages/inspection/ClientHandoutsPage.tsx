import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

/*
 * Page styling comes from the shared kit. These were local copies that had
 * drifted from every other Notices & Labels page — see components/forms/pageStyles.
 */
import { pageInputCn as inputCn } from '@/components/forms/pageStyles';

import { PageHeader } from '@/components/forms/PageHeader';

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
      <PageHeader
        eyebrow="Printable"
        title="Client Handouts"
        lead={`${handouts.length} branded PDF templates.`}
        description={`${' '}
                  Your company name, logo, phone and email are added automatically from Business Settings — leave them with clients after jobs.`}
      />


      <motion.main
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mx-auto max-w-3xl px-4 py-4 space-y-4 lg:max-w-none xl:max-w-[1700px] lg:px-8"
      >
        {/* Handout cards */}
        <motion.section variants={itemVariants} className="space-y-3">
          <h2 className="text-[15px] font-semibold tracking-tight text-white">{handouts.length} templates</h2>

          <div className="grid grid-cols-1 gap-3 lg:grid-cols-2 lg:gap-4">
            {handouts.map((handout) => (
              <motion.div key={handout.id} variants={itemVariants} className="h-full">
                <div className="flex h-full flex-col -mx-4 rounded-none border-y border-white/[0.12] bg-gradient-to-b from-white/[0.07] to-white/[0.03] sm:mx-0 sm:rounded-2xl sm:border-x p-4 sm:p-5">
                  {/* Title row */}
                  <div className="mb-2 flex items-start justify-between gap-3">
                    <h3 className="min-w-0 flex-1 text-[15px] font-semibold leading-tight text-white">
                      {handout.title}
                    </h3>
                    <span className="flex-shrink-0 rounded border border-white/[0.1] bg-white/[0.06] px-2 py-0.5 text-[11px] font-medium text-white">
                      {handout.pages}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="mb-3 text-[12.5px] leading-relaxed text-white">{handout.description}</p>

                  {/* Location fields for New Build Handover */}
                  {handout.id === 'new-build-handover' && (
                    <div className="mb-3">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowLocationFields(!showLocationFields);
                        }}
                        className="h-11 text-[13px] font-semibold text-elec-yellow touch-manipulation active:scale-[0.98]"
                      >
                        {showLocationFields ? 'Hide location fields' : 'Add isolator locations (optional)'}
                      </button>
                      {showLocationFields && (
                        <div className="mt-2 grid grid-cols-1 gap-3 sm:grid-cols-2">
                          {[
                            { key: 'cu_location', label: 'Consumer unit location', placeholder: 'e.g. Under stairs cupboard' },
                            { key: 'main_switch_rating', label: 'Main switch rating', placeholder: 'e.g. 100A' },
                            { key: 'gas_valve_location', label: 'Gas valve location', placeholder: 'e.g. Next to gas meter' },
                            { key: 'water_stopcock_location', label: 'Water stopcock location', placeholder: 'e.g. Under kitchen sink' },
                            { key: 'boiler_location', label: 'Boiler isolator location', placeholder: 'e.g. Airing cupboard' },
                            { key: 'immersion_location', label: 'Immersion heater (if fitted)', placeholder: 'e.g. Hot press, landing' },
                          ].map(({ key, label, placeholder }) => (
                            <div key={key}>
                              <Label className="mb-1.5 block text-[13px] font-medium text-white">{label}</Label>
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
                      'mt-auto h-11 w-full rounded-xl text-[14px] font-medium touch-manipulation active:scale-[0.99] transition-colors',
                      handout.category === 'coming-soon'
                        ? 'cursor-not-allowed border border-white/[0.08] bg-white/[0.04] text-white/90'
                        : 'border border-white/[0.12] bg-white/[0.06] text-white hover:bg-white/[0.1]'
                    )}
                    onClick={() => handleGenerate(handout)}
                    disabled={generatingId === handout.id || handout.category === 'coming-soon'}
                  >
                    {generatingId === handout.id ? (
                      <span className="flex items-center justify-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin text-elec-yellow" />
                        Generating...
                      </span>
                    ) : handout.category === 'coming-soon' ? (
                      'Coming Soon'
                    ) : (
                      'Download PDF'
                    )}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </motion.main>
    </div>
  );
}
