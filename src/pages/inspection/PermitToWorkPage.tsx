import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import SignatureInput from '@/components/signature/SignatureInput';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { storageGetJSONSync, storageSetJSONSync, storageRemoveSync } from '@/utils/storage';
import { reportCloud } from '@/utils/reportCloud';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.04 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.25 } },
};

interface PermitData {
  permitNumber: string;
  descriptionOfWork: string;
  equipmentToBeWorkedOn: string;
  locationOfWork: string;
  pointsOfIsolation: string;
  equipmentIsolated: string;
  safetyPrecautions: string;
  authorisedByName: string;
  authorisedBySignature: string;
  issuedToName: string;
  issuedToSignature: string;
  dateIssued: string;
  timeIssued: string;
  validUntil: string;
  cancelled: boolean;
  cancellationDate: string;
  cancellationTime: string;
  cancelledByName: string;
  cancelledBySignature: string;
  workComplete: boolean;
  notes: string;
}

const defaultData = (): PermitData => ({
  permitNumber: `PTW-${Date.now().toString(36).toUpperCase()}`,
  descriptionOfWork: '',
  equipmentToBeWorkedOn: '',
  locationOfWork: '',
  pointsOfIsolation: '',
  equipmentIsolated: '',
  safetyPrecautions: '',
  authorisedByName: '',
  authorisedBySignature: '',
  issuedToName: '',
  issuedToSignature: '',
  dateIssued: new Date().toISOString().split('T')[0],
  timeIssued: new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }),
  validUntil: '',
  cancelled: false,
  cancellationDate: '',
  cancellationTime: '',
  cancelledByName: '',
  cancelledBySignature: '',
  workComplete: false,
  notes: '',
});

const DRAFT_KEY = 'elec-mate-draft-permit-to-work';

export default function PermitToWorkPage() {
  const navigate = useNavigate();
  const { id: editId } = useParams<{ id: string }>();
  const [isSaving, setIsSaving] = useState(false);
  const [existingReportId, setExistingReportId] = useState<string | null>(null);
  const [data, setData] = useState<PermitData>(() => {
    const saved = storageGetJSONSync<Partial<PermitData>>(DRAFT_KEY, null);
    return saved ? { ...defaultData(), ...saved } : defaultData();
  });

  useEffect(() => {
    if (!editId) return;
    supabase.auth.getUser().then(async ({ data: { user } }) => {
      if (!user) return;
      const result = await reportCloud.getReportData(editId, user.id);
      if (result) { setData((prev) => ({ ...prev, ...(result as any) })); setExistingReportId(editId); }
    });
  }, [editId]);

  useEffect(() => {
    if (editId) return;
    const timer = setTimeout(() => {
      storageSetJSONSync(DRAFT_KEY, data);
    }, 2000);
    return () => clearTimeout(timer);
  }, [data, editId]);

  useEffect(() => {
    supabase.auth.getUser().then(async ({ data: { user } }) => {
      if (!user) return;
      const { data: profile } = await supabase.from('profiles').select('full_name').eq('id', user.id).single();
      if (profile && !data.authorisedByName) {
        setData((prev) => ({ ...prev, authorisedByName: prev.authorisedByName || profile.full_name || '' }));
      }
    });
  }, []);

  const update = useCallback((field: keyof PermitData, value: any) => {
    setData((prev) => ({ ...prev, [field]: value }));
  }, []);

  const handleSave = async () => {
    if (!data.descriptionOfWork) { toast.error('Please describe the work'); return; }
    setIsSaving(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { toast.error('Please sign in'); return; }
      if (existingReportId) {
        await reportCloud.updateReport(existingReportId, user.id, data as any);
      } else {
        const result = await reportCloud.createReport(user.id, 'permit-to-work', data as any);
        if (!result.success) { toast.error('Failed to save'); return; }
      }
      storageRemoveSync(DRAFT_KEY);
      toast.success('Permit to work issued');
      navigate(-1);
    } catch { toast.error('Failed to save'); } finally { setIsSaving(false); }
  };

  const inputCn = "h-11 text-base touch-manipulation bg-white/[0.06] border-white/[0.08] text-white focus:border-yellow-500 focus:ring-yellow-500";
  const textareaCn = "touch-manipulation text-base min-h-[80px] bg-white/[0.06] border-white/[0.08] text-white focus:border-yellow-500 focus:ring-yellow-500";

  return (
    <div className="-mt-3 sm:-mt-4 md:-mt-6 bg-background pb-24">
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-white/[0.06]">
        <div className="px-4 py-2">
          <div className="flex items-center gap-3 h-11">
            <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="text-white hover:text-white hover:bg-white/10 rounded-xl h-11 w-11 touch-manipulation active:scale-[0.98]">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 rounded-lg bg-orange-500/10 border border-orange-500/20">
                <Zap className="h-4 w-4 text-orange-400" />
              </div>
              <h1 className="text-base font-semibold text-white">Permit to Work</h1>
            </div>
          </div>
        </div>
      </div>

      <motion.main variants={containerVariants} initial="hidden" animate="visible" className="px-4 py-4 space-y-5 max-w-2xl mx-auto">
        <motion.div variants={itemVariants} className="rounded-2xl bg-orange-500/8 border border-orange-500/20 p-4">
          <p className="text-sm font-semibold text-orange-400">Electrical Permit to Work</p>
          <p className="text-xs text-white mt-1">Formal authorisation to carry out work on electrical systems. Required on commercial and industrial sites before any electrical work commences.</p>
        </motion.div>

        {/* Work Details */}
        <motion.section variants={itemVariants} className="space-y-3">
          <h2 className="text-xs font-medium text-white uppercase tracking-wider px-0.5">Work Details</h2>
          <div className="grid grid-cols-2 gap-3">
            <div><Label className="text-white text-xs">Permit Number</Label><Input value={data.permitNumber} onChange={(e) => update('permitNumber', e.target.value)} className={inputCn} /></div>
            <div><Label className="text-white text-xs">Location</Label><Input value={data.locationOfWork} onChange={(e) => update('locationOfWork', e.target.value)} className={inputCn} placeholder="e.g. Plant room, Floor 2" /></div>
          </div>
          <div><Label className="text-white text-xs">Description of Work *</Label><Textarea value={data.descriptionOfWork} onChange={(e) => update('descriptionOfWork', e.target.value)} className={textareaCn} placeholder="Describe the electrical work to be carried out..." /></div>
          <div><Label className="text-white text-xs">Equipment to Be Worked On</Label><Input value={data.equipmentToBeWorkedOn} onChange={(e) => update('equipmentToBeWorkedOn', e.target.value)} className={inputCn} placeholder="e.g. Distribution board DB1" /></div>
        </motion.section>

        {/* Safety */}
        <motion.section variants={itemVariants} className="space-y-3">
          <h2 className="text-xs font-medium text-white uppercase tracking-wider px-0.5">Isolation & Safety</h2>
          <div><Label className="text-white text-xs">Points of Isolation</Label><Textarea value={data.pointsOfIsolation} onChange={(e) => update('pointsOfIsolation', e.target.value)} className={textareaCn} placeholder="List all isolation points..." /></div>
          <div><Label className="text-white text-xs">Equipment Isolated</Label><Input value={data.equipmentIsolated} onChange={(e) => update('equipmentIsolated', e.target.value)} className={inputCn} placeholder="e.g. Main isolator, DB1 MCB 5" /></div>
          <div><Label className="text-white text-xs">Safety Precautions</Label><Textarea value={data.safetyPrecautions} onChange={(e) => update('safetyPrecautions', e.target.value)} className={textareaCn} placeholder="e.g. Locked off, warning notices posted, proved dead..." /></div>
        </motion.section>

        {/* Authorisation */}
        <motion.section variants={itemVariants} className="space-y-3">
          <h2 className="text-xs font-medium text-white uppercase tracking-wider px-0.5">Authorisation</h2>
          <div className="grid grid-cols-2 gap-3">
            <div><Label className="text-white text-xs">Date Issued</Label><Input type="date" value={data.dateIssued} onChange={(e) => update('dateIssued', e.target.value)} className={inputCn} /></div>
            <div><Label className="text-white text-xs">Time Issued</Label><Input type="time" value={data.timeIssued} onChange={(e) => update('timeIssued', e.target.value)} className={inputCn} /></div>
          </div>
          <div><Label className="text-white text-xs">Valid Until</Label><Input type="datetime-local" value={data.validUntil} onChange={(e) => update('validUntil', e.target.value)} className={inputCn} /></div>
          <div><Label className="text-white text-xs">Authorised By</Label><Input value={data.authorisedByName} onChange={(e) => update('authorisedByName', e.target.value)} className={inputCn} /></div>
          <SignatureInput label="Authorised By Signature" value={data.authorisedBySignature} onChange={(sig) => update('authorisedBySignature', sig || '')} />
          <div><Label className="text-white text-xs">Issued To</Label><Input value={data.issuedToName} onChange={(e) => update('issuedToName', e.target.value)} className={inputCn} /></div>
          <SignatureInput label="Issued To Signature" value={data.issuedToSignature} onChange={(sig) => update('issuedToSignature', sig || '')} />
        </motion.section>

        {/* Cancellation */}
        <motion.section variants={itemVariants} className="space-y-3">
          <h2 className="text-xs font-medium text-white uppercase tracking-wider px-0.5">Cancellation / Completion</h2>
          <div className="flex items-center gap-3">
            <Checkbox checked={data.workComplete} onCheckedChange={(c) => update('workComplete', !!c)} className="border-white/40 data-[state=checked]:bg-emerald-500 data-[state=checked]:border-emerald-500" />
            <Label className="text-white text-sm">Work complete</Label>
          </div>
          <div className="flex items-center gap-3">
            <Checkbox checked={data.cancelled} onCheckedChange={(c) => update('cancelled', !!c)} className="border-white/40 data-[state=checked]:bg-red-500 data-[state=checked]:border-red-500" />
            <Label className="text-white text-sm">Permit cancelled</Label>
          </div>
          {data.cancelled && (
            <div className="space-y-3 rounded-2xl bg-red-500/8 border border-red-500/20 p-4">
              <div className="grid grid-cols-2 gap-3">
                <div><Label className="text-white text-xs">Date</Label><Input type="date" value={data.cancellationDate} onChange={(e) => update('cancellationDate', e.target.value)} className={inputCn} /></div>
                <div><Label className="text-white text-xs">Time</Label><Input type="time" value={data.cancellationTime} onChange={(e) => update('cancellationTime', e.target.value)} className={inputCn} /></div>
              </div>
              <div><Label className="text-white text-xs">Cancelled By</Label><Input value={data.cancelledByName} onChange={(e) => update('cancelledByName', e.target.value)} className={inputCn} /></div>
              <SignatureInput label="Cancelled By Signature" value={data.cancelledBySignature} onChange={(sig) => update('cancelledBySignature', sig || '')} />
            </div>
          )}
        </motion.section>

        {/* Notes */}
        <motion.section variants={itemVariants} className="space-y-3">
          <h2 className="text-xs font-medium text-white uppercase tracking-wider px-0.5">Notes</h2>
          <Textarea value={data.notes} onChange={(e) => update('notes', e.target.value)} className={textareaCn} placeholder="Additional notes..." />
        </motion.section>

        {/* Actions */}
        <motion.div variants={itemVariants} className="flex gap-3 pt-2">
          <Button variant="outline" className="flex-1 h-12 text-sm font-medium touch-manipulation active:scale-[0.98] border-white/[0.08] text-white hover:bg-white/[0.06]" onClick={() => { storageSetJSONSync(DRAFT_KEY, data); toast.success('Draft saved'); }}>Save Draft</Button>
          <Button className="flex-1 h-12 text-sm font-medium touch-manipulation active:scale-[0.98] bg-orange-500 text-white hover:bg-orange-600" onClick={handleSave} disabled={isSaving}>{isSaving ? 'Saving...' : existingReportId ? 'Update Permit' : 'Issue Permit'}</Button>
        </motion.div>
      </motion.main>
    </div>
  );
}
