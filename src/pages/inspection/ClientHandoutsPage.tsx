import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Zap, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
// PDF Monkey handouts — no jsPDF imports needed

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.04 } } };
const itemVariants = { hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0, transition: { duration: 0.25 } } };

interface HandoutDef {
  id: string;
  title: string;
  description: string;
  accentColor: string;
  filename: string;
  category: 'essential' | 'coming-soon';
}

const handouts: HandoutDef[] = [
  {
    id: 'electrical-safety',
    title: 'Electrical Safety Guide',
    description: '4-page guide — consumer unit explained, RCD testing, warning signs, socket safety, wattage guide, bathroom/outdoor rules, smoke alarms, children\'s safety, emergencies, Amendment 4 updates.',
    accentColor: 'from-emerald-500 to-green-400',
    filename: 'Electrical-Safety-Guide',
    category: 'essential',
  },
  {
    id: 'energy-saving',
    title: 'Energy Saving Tips',
    description: '3-page guide — LED savings, heating tips, standby costs, kitchen appliances, smart home tech, solar PV, battery storage, EV charging, tariff advice. Real numbers on every tip.',
    accentColor: 'from-elec-yellow to-amber-400',
    filename: 'Energy-Saving-Tips',
    category: 'essential',
  },
  {
    id: 'eicr-explained',
    title: 'Your EICR Explained',
    description: '2-page guide — classification codes explained, satisfactory vs unsatisfactory, landlord legal obligations, common findings in plain English, what to do next.',
    accentColor: 'from-blue-500 to-cyan-400',
    filename: 'Your-EICR-Explained',
    category: 'essential',
  },
  {
    id: 'landlord-guide',
    title: 'Landlord EICR Guide',
    description: '3-page guide — legal obligations, £30k penalties, 28-day rule, HMO requirements, smoke/CO alarms, insurance, managing agents, tenant changeover checklist, Scotland/Wales/NI.',
    accentColor: 'from-amber-500 to-yellow-400',
    filename: 'Landlord-EICR-Guide',
    category: 'essential',
  },
  {
    id: 'new-build-handover',
    title: 'New Build Handover',
    description: '4-page guide — consumer unit explained, isolator locations, socket/lighting/alarm guidance, maintenance schedule, future-proofing (EV/solar/smart), troubleshooting, emergencies.',
    accentColor: 'from-cyan-500 to-blue-400',
    filename: 'New-Build-Handover',
    category: 'essential',
  },
  {
    id: 'ev-charging-guide',
    title: 'EV Charging Guide',
    description: '3-page guide — smart charging, tariff comparison, LED indicators, maintenance, troubleshooting, cold weather care, OZEV grants April 2026, solar + EV, public charging apps.',
    accentColor: 'from-emerald-500 to-teal-400',
    filename: 'EV-Charging-Guide',
    category: 'essential',
  },
  {
    id: 'fire-safety-tenants',
    title: 'Fire Safety for Tenants',
    description: '3-page guide — alarm testing, fire prevention (cooking, e-bikes, candles), escape planning, fire doors, CO poisoning, night-time checklist, your legal rights, fire extinguisher use.',
    accentColor: 'from-red-500 to-rose-400',
    filename: 'Fire-Safety-Tenants',
    category: 'essential',
  },
  {
    id: 'fire-alarm-guide',
    title: 'Fire Alarm System Guide',
    description: '4-page commercial guide — panel signals, system categories (L1-M), BS 5839-1:2025 changes, detector types, weekly testing, log book, false alarms, premises-specific guidance, emergency lighting.',
    accentColor: 'from-red-500 to-orange-400',
    filename: 'Fire-Alarm-Guide',
    category: 'essential',
  },
  {
    id: 'pat-testing-explained',
    title: 'PAT Testing Explained',
    description: '3-page guide — equipment classes, test types, label meanings, frequency table by environment, legal duties, daily user checks, common failures, personal items policy.',
    accentColor: 'from-cyan-500 to-blue-400',
    filename: 'PAT-Testing-Explained',
    category: 'essential',
  },
];

const categories = [
  { key: 'essential' as const, title: 'Ready to Download', description: 'Professionally branded with your company details' },
  { key: 'coming-soon' as const, title: 'Coming Soon', description: 'More templates being added' },
];

const inputCn = 'h-12 text-base touch-manipulation bg-white/[0.06] border-white/[0.08] text-white focus:border-yellow-500 focus:ring-yellow-500';

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
      // Get company branding
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

      // Add location fields for new-build-handover
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
        console.error('PDF generation error:', pdfError);
        toast.error('Failed to generate — please try again');
        return;
      }

      // Download via native-aware utility (Capacitor share sheet / browser download)
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
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-white/[0.06]">
        <div className="px-4 py-2">
          <div className="flex items-center gap-3 h-11">
            <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="text-white hover:text-white hover:bg-white/10 rounded-xl h-11 w-11 touch-manipulation active:scale-[0.98]">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                <Zap className="h-4 w-4 text-emerald-400" />
              </div>
              <h1 className="text-base font-semibold text-white">Client Handouts</h1>
            </div>
          </div>
        </div>
      </div>

      <motion.main variants={containerVariants} initial="hidden" animate="visible" className="px-4 py-4 space-y-5 max-w-3xl mx-auto">
        <motion.div variants={itemVariants} className="border-b border-white/[0.06] pb-3">
          <p className="text-sm font-semibold text-white">Professional Client Handouts</p>
          <p className="text-xs text-white mt-1">Branded documents to leave with your clients. Your company name, logo, phone, and email are added automatically from your Business Settings. Leave them after jobs — it builds trust and keeps your details to hand.</p>
        </motion.div>

        {categories.map((cat) => {
          const catHandouts = handouts.filter((h) => h.category === cat.key);
          return (
            <motion.section key={cat.key} variants={itemVariants} className="space-y-3">
              <div className="border-b border-white/[0.06] pb-1">
                <h2 className="text-xs font-medium text-white uppercase tracking-wider">{cat.title}</h2>
                <p className="text-[11px] text-white mt-0.5">{cat.description}</p>
              </div>
              {catHandouts.map((handout) => (
                <motion.div key={handout.id} variants={itemVariants}>
                  <div className={cn('rounded-2xl border overflow-hidden', handout.category === 'coming-soon' ? 'border-white/[0.04] opacity-60' : 'border-white/[0.06]')}>
                    <div className="p-4 space-y-3">
                      <div>
                        <div className={cn('h-[2px] w-full rounded-full bg-gradient-to-r mb-3', handout.accentColor)} />
                        <h3 className="text-sm font-semibold text-white">{handout.title}</h3>
                        <p className="text-xs text-white mt-1 leading-relaxed">{handout.description}</p>
                      </div>
                      {/* Location fields for New Build Handover */}
                      {handout.id === 'new-build-handover' && handout.category === 'essential' && (
                        <div className="space-y-3 mt-2">
                          <button
                            onClick={(e) => { e.stopPropagation(); setShowLocationFields(!showLocationFields); }}
                            className="text-[11px] font-medium text-elec-yellow touch-manipulation"
                          >
                            {showLocationFields ? 'Hide location fields' : 'Add isolator locations (optional)'}
                          </button>
                          {showLocationFields && (
                            <div className="space-y-2">
                              <div><Label className="text-white text-[10px]">Consumer unit location</Label><Input value={locations.cu_location} onChange={(e) => setLocations(p => ({ ...p, cu_location: e.target.value }))} className={inputCn} placeholder="e.g. Under stairs cupboard" /></div>
                              <div><Label className="text-white text-[10px]">Main switch rating</Label><Input value={locations.main_switch_rating} onChange={(e) => setLocations(p => ({ ...p, main_switch_rating: e.target.value }))} className={inputCn} placeholder="e.g. 100A" /></div>
                              <div><Label className="text-white text-[10px]">Gas valve location</Label><Input value={locations.gas_valve_location} onChange={(e) => setLocations(p => ({ ...p, gas_valve_location: e.target.value }))} className={inputCn} placeholder="e.g. Next to gas meter, utility room" /></div>
                              <div><Label className="text-white text-[10px]">Water stopcock location</Label><Input value={locations.water_stopcock_location} onChange={(e) => setLocations(p => ({ ...p, water_stopcock_location: e.target.value }))} className={inputCn} placeholder="e.g. Under kitchen sink" /></div>
                              <div><Label className="text-white text-[10px]">Boiler isolator location</Label><Input value={locations.boiler_location} onChange={(e) => setLocations(p => ({ ...p, boiler_location: e.target.value }))} className={inputCn} placeholder="e.g. Airing cupboard, first floor" /></div>
                              <div><Label className="text-white text-[10px]">Immersion heater location (if fitted)</Label><Input value={locations.immersion_location} onChange={(e) => setLocations(p => ({ ...p, immersion_location: e.target.value }))} className={inputCn} placeholder="e.g. Hot press, landing" /></div>
                            </div>
                          )}
                        </div>
                      )}
                      <Button
                        className={cn(
                          'w-full h-11 text-sm font-medium touch-manipulation active:scale-[0.98]',
                          handout.category === 'coming-soon'
                            ? 'bg-white/[0.06] border border-white/[0.08] text-white cursor-not-allowed'
                            : 'bg-white/[0.06] border border-white/[0.08] text-white hover:bg-white/[0.1]'
                        )}
                        onClick={() => handleGenerate(handout)}
                        disabled={generatingId === handout.id || handout.category === 'coming-soon'}
                      >
                        {generatingId === handout.id ? (
                          <><Loader2 className="h-4 w-4 animate-spin mr-2" />Generating...</>
                        ) : handout.category === 'coming-soon' ? (
                          'Coming Soon'
                        ) : (
                          'Download PDF'
                        )}
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.section>
          );
        })}
      </motion.main>
    </div>
  );
}
