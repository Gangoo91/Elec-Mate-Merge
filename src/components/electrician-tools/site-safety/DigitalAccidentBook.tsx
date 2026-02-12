import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { toast } from 'sonner';
import {
  ArrowLeft,
  Plus,
  BookOpen,
  AlertTriangle,
  ChevronRight,
  Clock,
  MapPin,
  User,
  Calendar,
  Search,
  Shield,
  Phone,
  FileText,
  Heart,
  Activity,
  CheckCircle2,
  XCircle,
  Info,
} from 'lucide-react';

// ─── Types ───

type InjuryType =
  | 'cut-laceration'
  | 'burn'
  | 'electric-shock'
  | 'fracture'
  | 'sprain-strain'
  | 'bruise-contusion'
  | 'eye-injury'
  | 'chemical-exposure'
  | 'fall-injury'
  | 'crush-injury'
  | 'head-injury'
  | 'respiratory'
  | 'other';

type BodyPart =
  | 'head'
  | 'face'
  | 'eyes'
  | 'neck'
  | 'shoulder'
  | 'arm'
  | 'hand-fingers'
  | 'chest'
  | 'back'
  | 'abdomen'
  | 'hip'
  | 'leg'
  | 'knee'
  | 'foot-toes'
  | 'multiple';

type Severity = 'minor' | 'moderate' | 'major' | 'fatal';

interface AccidentRecord {
  id: string;
  // Injured person
  injured_name: string;
  injured_role: string;
  injured_employer: string;
  injured_address: string;
  // Incident
  incident_date: string;
  incident_time: string;
  location: string;
  location_detail: string;
  // Injury
  injury_type: InjuryType;
  body_part: BodyPart;
  severity: Severity;
  injury_description: string;
  // How it happened
  incident_description: string;
  activity_at_time: string;
  cause: string;
  // Witnesses
  witnesses: string;
  // Treatment
  first_aid_given: boolean;
  first_aid_details: string;
  first_aider_name: string;
  hospital_visit: boolean;
  hospital_name: string;
  // Aftermath
  time_off_work: boolean;
  days_off: number;
  return_date: string;
  // Reporting
  reported_to: string;
  reported_date: string;
  // RIDDOR
  is_riddor_reportable: boolean;
  riddor_category: string;
  riddor_reference: string;
  riddor_reported: boolean;
  // Meta
  recorded_by: string;
  additional_notes: string;
  corrective_actions: string;
  created_at: string;
}

// ─── Constants ───

const INJURY_TYPES: { id: InjuryType; label: string }[] = [
  { id: 'cut-laceration', label: 'Cut / Laceration' },
  { id: 'burn', label: 'Burn (thermal/chemical)' },
  { id: 'electric-shock', label: 'Electric Shock' },
  { id: 'fracture', label: 'Fracture / Break' },
  { id: 'sprain-strain', label: 'Sprain / Strain' },
  { id: 'bruise-contusion', label: 'Bruise / Contusion' },
  { id: 'eye-injury', label: 'Eye Injury' },
  { id: 'chemical-exposure', label: 'Chemical Exposure' },
  { id: 'fall-injury', label: 'Fall Injury' },
  { id: 'crush-injury', label: 'Crush Injury' },
  { id: 'head-injury', label: 'Head Injury' },
  { id: 'respiratory', label: 'Respiratory Issue' },
  { id: 'other', label: 'Other' },
];

const BODY_PARTS: { id: BodyPart; label: string }[] = [
  { id: 'head', label: 'Head' },
  { id: 'face', label: 'Face' },
  { id: 'eyes', label: 'Eyes' },
  { id: 'neck', label: 'Neck' },
  { id: 'shoulder', label: 'Shoulder' },
  { id: 'arm', label: 'Arm / Elbow' },
  { id: 'hand-fingers', label: 'Hand / Fingers' },
  { id: 'chest', label: 'Chest' },
  { id: 'back', label: 'Back' },
  { id: 'abdomen', label: 'Abdomen' },
  { id: 'hip', label: 'Hip / Pelvis' },
  { id: 'leg', label: 'Leg / Thigh' },
  { id: 'knee', label: 'Knee' },
  { id: 'foot-toes', label: 'Foot / Toes' },
  { id: 'multiple', label: 'Multiple Areas' },
];

const SEVERITY_CONFIG: Record<Severity, { label: string; colour: string; bg: string }> = {
  minor: { label: 'Minor', colour: 'text-green-400', bg: 'bg-green-500/15' },
  moderate: { label: 'Moderate', colour: 'text-amber-400', bg: 'bg-amber-500/15' },
  major: { label: 'Major', colour: 'text-orange-400', bg: 'bg-orange-500/15' },
  fatal: { label: 'Fatal', colour: 'text-red-400', bg: 'bg-red-500/15' },
};

const RIDDOR_SPECIFIED_INJURIES = [
  'Fracture (other than fingers/thumbs/toes)',
  'Amputation of arm, hand, finger, thumb, leg, foot or toe',
  'Permanent loss of sight or reduction of sight',
  'Crush injury leading to internal organ damage',
  'Serious burn covering >10% of body or affecting eyes/respiratory system/vital organs',
  'Scalping requiring hospital treatment',
  'Loss of consciousness from head injury or asphyxia',
  'Hypothermia/heat-induced illness requiring resuscitation or hospital admission',
];

const RIDDOR_DANGEROUS_OCCURRENCES = [
  'Collapse, overturning or failure of load-bearing equipment',
  'Plant/equipment contact with overhead power line',
  'Electrical short circuit or overload with fire or explosion',
  'Accidental release of biological agent',
  'Collapse or partial collapse of scaffold over 5m',
  'Unintended collapse of any building under construction',
];

// ─── RIDDOR Check ───

function checkRIDDOR(record: Partial<AccidentRecord>): { reportable: boolean; reasons: string[] } {
  const reasons: string[] = [];

  // Fatal
  if (record.severity === 'fatal') {
    reasons.push('Fatal injury — must be reported immediately by phone');
  }

  // Major/specified injuries
  if (record.severity === 'major') {
    reasons.push('Major/specified injury');
  }

  // Electric shock leading to loss of consciousness or requiring resuscitation
  if (record.injury_type === 'electric-shock') {
    reasons.push(
      'Electric shock — potentially reportable if causing loss of consciousness or requiring resuscitation'
    );
  }

  // Over 7 days incapacitation
  if (record.time_off_work && record.days_off >= 7) {
    reasons.push(
      `Over 7 consecutive days incapacitation (${record.days_off} days) — must be reported within 15 days`
    );
  }

  // Hospital visit from workplace accident
  if (record.hospital_visit) {
    reasons.push('Hospital attendance — review if this constitutes a "specified injury"');
  }

  return {
    reportable: reasons.length > 0,
    reasons,
  };
}

// ─── Main Component ───

export function DigitalAccidentBook({ onBack }: { onBack: () => void }) {
  const [records, setRecords] = useState<AccidentRecord[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [viewingRecord, setViewingRecord] = useState<AccidentRecord | null>(null);
  const [formStep, setFormStep] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [showRIDDORGuide, setShowRIDDORGuide] = useState(false);

  // Form state
  const [form, setForm] = useState<Partial<AccidentRecord>>({
    injured_name: '',
    injured_role: '',
    injured_employer: '',
    injured_address: '',
    incident_date: new Date().toISOString().split('T')[0],
    incident_time: '',
    location: '',
    location_detail: '',
    injury_type: undefined,
    body_part: undefined,
    severity: undefined,
    injury_description: '',
    incident_description: '',
    activity_at_time: '',
    cause: '',
    witnesses: '',
    first_aid_given: false,
    first_aid_details: '',
    first_aider_name: '',
    hospital_visit: false,
    hospital_name: '',
    time_off_work: false,
    days_off: 0,
    return_date: '',
    reported_to: '',
    reported_date: new Date().toISOString().split('T')[0],
    is_riddor_reportable: false,
    riddor_category: '',
    riddor_reference: '',
    riddor_reported: false,
    recorded_by: '',
    additional_notes: '',
    corrective_actions: '',
  });

  const updateForm = (updates: Partial<AccidentRecord>) => {
    setForm((prev) => ({ ...prev, ...updates }));
  };

  const resetForm = () => {
    setFormStep(0);
    setForm({
      injured_name: '',
      injured_role: '',
      injured_employer: '',
      injured_address: '',
      incident_date: new Date().toISOString().split('T')[0],
      incident_time: '',
      location: '',
      location_detail: '',
      injury_type: undefined,
      body_part: undefined,
      severity: undefined,
      injury_description: '',
      incident_description: '',
      activity_at_time: '',
      cause: '',
      witnesses: '',
      first_aid_given: false,
      first_aid_details: '',
      first_aider_name: '',
      hospital_visit: false,
      hospital_name: '',
      time_off_work: false,
      days_off: 0,
      return_date: '',
      reported_to: '',
      reported_date: new Date().toISOString().split('T')[0],
      is_riddor_reportable: false,
      riddor_category: '',
      riddor_reference: '',
      riddor_reported: false,
      recorded_by: '',
      additional_notes: '',
      corrective_actions: '',
    });
  };

  const riddorCheck = useMemo(() => checkRIDDOR(form), [form]);

  const saveRecord = () => {
    const record: AccidentRecord = {
      id: `acc-${Date.now()}`,
      injured_name: form.injured_name || '',
      injured_role: form.injured_role || '',
      injured_employer: form.injured_employer || '',
      injured_address: form.injured_address || '',
      incident_date: form.incident_date || '',
      incident_time: form.incident_time || '',
      location: form.location || '',
      location_detail: form.location_detail || '',
      injury_type: form.injury_type || 'other',
      body_part: form.body_part || 'multiple',
      severity: form.severity || 'minor',
      injury_description: form.injury_description || '',
      incident_description: form.incident_description || '',
      activity_at_time: form.activity_at_time || '',
      cause: form.cause || '',
      witnesses: form.witnesses || '',
      first_aid_given: form.first_aid_given || false,
      first_aid_details: form.first_aid_details || '',
      first_aider_name: form.first_aider_name || '',
      hospital_visit: form.hospital_visit || false,
      hospital_name: form.hospital_name || '',
      time_off_work: form.time_off_work || false,
      days_off: form.days_off || 0,
      return_date: form.return_date || '',
      reported_to: form.reported_to || '',
      reported_date: form.reported_date || '',
      is_riddor_reportable: riddorCheck.reportable,
      riddor_category: riddorCheck.reasons.join('; '),
      riddor_reference: form.riddor_reference || '',
      riddor_reported: form.riddor_reported || false,
      recorded_by: form.recorded_by || '',
      additional_notes: form.additional_notes || '',
      corrective_actions: form.corrective_actions || '',
      created_at: new Date().toISOString(),
    };

    setRecords((prev) => [record, ...prev]);
    setShowForm(false);
    resetForm();

    if (riddorCheck.reportable) {
      toast.warning('RIDDOR: This incident may be reportable — review the RIDDOR guidance');
    } else {
      toast.success('Accident record saved');
    }
  };

  const filteredRecords = records.filter(
    (r) =>
      r.injured_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.incident_description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const riddorCount = records.filter((r) => r.is_riddor_reportable).length;

  // ─── Form Steps ───

  const renderFormStep = () => {
    switch (formStep) {
      case 0:
        return (
          <div className="space-y-4">
            <h3 className="text-base font-bold text-white">Injured Person</h3>
            <div className="space-y-3">
              <div>
                <Label className="text-white/80 text-sm">Full Name *</Label>
                <Input
                  value={form.injured_name}
                  onChange={(e) => updateForm({ injured_name: e.target.value })}
                  className="h-11 text-base touch-manipulation border-white/30 focus:border-yellow-500 focus:ring-yellow-500 mt-1"
                  placeholder="Name of injured person"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-white/80 text-sm">Role / Job Title</Label>
                  <Input
                    value={form.injured_role}
                    onChange={(e) => updateForm({ injured_role: e.target.value })}
                    className="h-11 text-base touch-manipulation border-white/30 focus:border-yellow-500 focus:ring-yellow-500 mt-1"
                    placeholder="e.g. Electrician"
                  />
                </div>
                <div>
                  <Label className="text-white/80 text-sm">Employer</Label>
                  <Input
                    value={form.injured_employer}
                    onChange={(e) => updateForm({ injured_employer: e.target.value })}
                    className="h-11 text-base touch-manipulation border-white/30 focus:border-yellow-500 focus:ring-yellow-500 mt-1"
                    placeholder="Company name"
                  />
                </div>
              </div>
              <div>
                <Label className="text-white/80 text-sm">Address (for RIDDOR records)</Label>
                <Input
                  value={form.injured_address}
                  onChange={(e) => updateForm({ injured_address: e.target.value })}
                  className="h-11 text-base touch-manipulation border-white/30 focus:border-yellow-500 focus:ring-yellow-500 mt-1"
                  placeholder="Home address"
                />
              </div>
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-4">
            <h3 className="text-base font-bold text-white">Incident Details</h3>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-white/80 text-sm">Date of Incident *</Label>
                  <Input
                    type="date"
                    value={form.incident_date}
                    onChange={(e) => updateForm({ incident_date: e.target.value })}
                    className="h-11 text-base touch-manipulation border-white/30 focus:border-yellow-500 focus:ring-yellow-500 mt-1"
                  />
                </div>
                <div>
                  <Label className="text-white/80 text-sm">Time</Label>
                  <Input
                    type="time"
                    value={form.incident_time}
                    onChange={(e) => updateForm({ incident_time: e.target.value })}
                    className="h-11 text-base touch-manipulation border-white/30 focus:border-yellow-500 focus:ring-yellow-500 mt-1"
                  />
                </div>
              </div>
              <div>
                <Label className="text-white/80 text-sm">Location *</Label>
                <Input
                  value={form.location}
                  onChange={(e) => updateForm({ location: e.target.value })}
                  className="h-11 text-base touch-manipulation border-white/30 focus:border-yellow-500 focus:ring-yellow-500 mt-1"
                  placeholder="Site name / address"
                />
              </div>
              <div>
                <Label className="text-white/80 text-sm">Specific Location</Label>
                <Input
                  value={form.location_detail}
                  onChange={(e) => updateForm({ location_detail: e.target.value })}
                  className="h-11 text-base touch-manipulation border-white/30 focus:border-yellow-500 focus:ring-yellow-500 mt-1"
                  placeholder="e.g. Plant room, Level 2, Riser 3"
                />
              </div>
              <div>
                <Label className="text-white/80 text-sm">Activity at Time of Incident</Label>
                <Input
                  value={form.activity_at_time}
                  onChange={(e) => updateForm({ activity_at_time: e.target.value })}
                  className="h-11 text-base touch-manipulation border-white/30 focus:border-yellow-500 focus:ring-yellow-500 mt-1"
                  placeholder="e.g. Installing containment at height"
                />
              </div>
              <div>
                <Label className="text-white/80 text-sm">How Did the Incident Happen? *</Label>
                <Textarea
                  value={form.incident_description}
                  onChange={(e) => updateForm({ incident_description: e.target.value })}
                  className="touch-manipulation text-base min-h-[100px] focus:ring-2 focus:ring-elec-yellow/20 border-white/30 focus:border-yellow-500 mt-1"
                  placeholder="Describe exactly what happened, including what the person was doing..."
                />
              </div>
              <div>
                <Label className="text-white/80 text-sm">Cause / Contributing Factors</Label>
                <Input
                  value={form.cause}
                  onChange={(e) => updateForm({ cause: e.target.value })}
                  className="h-11 text-base touch-manipulation border-white/30 focus:border-yellow-500 focus:ring-yellow-500 mt-1"
                  placeholder="e.g. Wet floor, faulty equipment, inadequate PPE"
                />
              </div>
              <div>
                <Label className="text-white/80 text-sm">Witnesses</Label>
                <Input
                  value={form.witnesses}
                  onChange={(e) => updateForm({ witnesses: e.target.value })}
                  className="h-11 text-base touch-manipulation border-white/30 focus:border-yellow-500 focus:ring-yellow-500 mt-1"
                  placeholder="Names and contact details of witnesses"
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <h3 className="text-base font-bold text-white">Injury Details</h3>
            <div className="space-y-3">
              <div>
                <Label className="text-white/80 text-sm">Type of Injury *</Label>
                <Select
                  value={form.injury_type}
                  onValueChange={(v) => updateForm({ injury_type: v as InjuryType })}
                >
                  <SelectTrigger className="h-11 touch-manipulation bg-elec-gray border-elec-gray focus:border-elec-yellow focus:ring-elec-yellow mt-1">
                    <SelectValue placeholder="Select injury type..." />
                  </SelectTrigger>
                  <SelectContent className="z-[100] bg-elec-gray border-elec-gray text-foreground max-h-[300px]">
                    {INJURY_TYPES.map((type) => (
                      <SelectItem key={type.id} value={type.id}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-white/80 text-sm">Body Part Injured *</Label>
                <Select
                  value={form.body_part}
                  onValueChange={(v) => updateForm({ body_part: v as BodyPart })}
                >
                  <SelectTrigger className="h-11 touch-manipulation bg-elec-gray border-elec-gray focus:border-elec-yellow focus:ring-elec-yellow mt-1">
                    <SelectValue placeholder="Select body part..." />
                  </SelectTrigger>
                  <SelectContent className="z-[100] bg-elec-gray border-elec-gray text-foreground max-h-[300px]">
                    {BODY_PARTS.map((part) => (
                      <SelectItem key={part.id} value={part.id}>
                        {part.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-white/80 text-sm">Severity *</Label>
                <div className="grid grid-cols-4 gap-2 mt-1">
                  {(['minor', 'moderate', 'major', 'fatal'] as Severity[]).map((level) => {
                    const config = SEVERITY_CONFIG[level];
                    return (
                      <button
                        key={level}
                        onClick={() => updateForm({ severity: level })}
                        className={`p-2.5 rounded-xl border text-center touch-manipulation transition-all active:scale-[0.98] ${
                          form.severity === level
                            ? `${config.bg} border-current ring-1 ring-offset-0 ${config.colour}`
                            : 'border-white/10 bg-white/[0.03] text-white/50'
                        }`}
                      >
                        <span className="text-xs font-bold">{config.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <Label className="text-white/80 text-sm">Injury Description</Label>
                <Textarea
                  value={form.injury_description}
                  onChange={(e) => updateForm({ injury_description: e.target.value })}
                  className="touch-manipulation text-base min-h-[80px] focus:ring-2 focus:ring-elec-yellow/20 border-white/30 focus:border-yellow-500 mt-1"
                  placeholder="Describe the injury in detail..."
                />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <h3 className="text-base font-bold text-white">Treatment & Aftermath</h3>
            <div className="space-y-3">
              {/* First Aid */}
              <div className="flex items-center gap-3 p-3 rounded-xl border border-white/10 bg-white/[0.03]">
                <Checkbox
                  checked={form.first_aid_given}
                  onCheckedChange={(v) => updateForm({ first_aid_given: !!v })}
                  className="border-white/40 data-[state=checked]:bg-elec-yellow data-[state=checked]:border-elec-yellow data-[state=checked]:text-black"
                />
                <Label className="text-white/80 text-sm">First aid given</Label>
              </div>

              {form.first_aid_given && (
                <>
                  <div>
                    <Label className="text-white/80 text-sm">First Aid Details</Label>
                    <Textarea
                      value={form.first_aid_details}
                      onChange={(e) => updateForm({ first_aid_details: e.target.value })}
                      className="touch-manipulation text-base min-h-[60px] focus:ring-2 focus:ring-elec-yellow/20 border-white/30 focus:border-yellow-500 mt-1"
                      placeholder="Treatment administered..."
                    />
                  </div>
                  <div>
                    <Label className="text-white/80 text-sm">First Aider Name</Label>
                    <Input
                      value={form.first_aider_name}
                      onChange={(e) => updateForm({ first_aider_name: e.target.value })}
                      className="h-11 text-base touch-manipulation border-white/30 focus:border-yellow-500 focus:ring-yellow-500 mt-1"
                    />
                  </div>
                </>
              )}

              {/* Hospital */}
              <div className="flex items-center gap-3 p-3 rounded-xl border border-white/10 bg-white/[0.03]">
                <Checkbox
                  checked={form.hospital_visit}
                  onCheckedChange={(v) => updateForm({ hospital_visit: !!v })}
                  className="border-white/40 data-[state=checked]:bg-elec-yellow data-[state=checked]:border-elec-yellow data-[state=checked]:text-black"
                />
                <Label className="text-white/80 text-sm">Hospital visit required</Label>
              </div>

              {form.hospital_visit && (
                <div>
                  <Label className="text-white/80 text-sm">Hospital Name</Label>
                  <Input
                    value={form.hospital_name}
                    onChange={(e) => updateForm({ hospital_name: e.target.value })}
                    className="h-11 text-base touch-manipulation border-white/30 focus:border-yellow-500 focus:ring-yellow-500 mt-1"
                  />
                </div>
              )}

              {/* Time off work */}
              <div className="flex items-center gap-3 p-3 rounded-xl border border-white/10 bg-white/[0.03]">
                <Checkbox
                  checked={form.time_off_work}
                  onCheckedChange={(v) => updateForm({ time_off_work: !!v })}
                  className="border-white/40 data-[state=checked]:bg-elec-yellow data-[state=checked]:border-elec-yellow data-[state=checked]:text-black"
                />
                <Label className="text-white/80 text-sm">Time off work required</Label>
              </div>

              {form.time_off_work && (
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label className="text-white/80 text-sm">Days Off</Label>
                    <Input
                      type="number"
                      value={form.days_off}
                      onChange={(e) => updateForm({ days_off: parseInt(e.target.value) || 0 })}
                      className="h-11 text-base touch-manipulation border-white/30 focus:border-yellow-500 focus:ring-yellow-500 mt-1"
                    />
                  </div>
                  <div>
                    <Label className="text-white/80 text-sm">Expected Return</Label>
                    <Input
                      type="date"
                      value={form.return_date}
                      onChange={(e) => updateForm({ return_date: e.target.value })}
                      className="h-11 text-base touch-manipulation border-white/30 focus:border-yellow-500 focus:ring-yellow-500 mt-1"
                    />
                  </div>
                </div>
              )}

              {/* RIDDOR Alert */}
              {riddorCheck.reportable && (
                <div className="p-3 rounded-xl border border-red-500/30 bg-red-500/10">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-bold text-red-300">RIDDOR Reportable</p>
                      <p className="text-xs text-red-200/70 mt-1">
                        This incident may need to be reported to the HSE under RIDDOR:
                      </p>
                      <ul className="mt-1.5 space-y-1">
                        {riddorCheck.reasons.map((reason, i) => (
                          <li key={i} className="text-xs text-red-200/70 flex items-start gap-1.5">
                            <span className="text-red-400 mt-0.5">•</span>
                            {reason}
                          </li>
                        ))}
                      </ul>
                      <div className="mt-2 p-2 rounded-lg bg-red-500/10 border border-red-500/20">
                        <p className="text-xs text-red-200/70">
                          <strong>Report online:</strong> www.hse.gov.uk/riddor
                        </p>
                        <p className="text-xs text-red-200/70">
                          <strong>Fatal/major:</strong> Call 0345 300 9923 immediately
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div>
                <Label className="text-white/80 text-sm">Reported To</Label>
                <Input
                  value={form.reported_to}
                  onChange={(e) => updateForm({ reported_to: e.target.value })}
                  className="h-11 text-base touch-manipulation border-white/30 focus:border-yellow-500 focus:ring-yellow-500 mt-1"
                  placeholder="Supervisor / manager name"
                />
              </div>

              <div>
                <Label className="text-white/80 text-sm">Corrective Actions Taken</Label>
                <Textarea
                  value={form.corrective_actions}
                  onChange={(e) => updateForm({ corrective_actions: e.target.value })}
                  className="touch-manipulation text-base min-h-[80px] focus:ring-2 focus:ring-elec-yellow/20 border-white/30 focus:border-yellow-500 mt-1"
                  placeholder="Actions taken to prevent recurrence..."
                />
              </div>

              <div>
                <Label className="text-white/80 text-sm">Recorded By *</Label>
                <Input
                  value={form.recorded_by}
                  onChange={(e) => updateForm({ recorded_by: e.target.value })}
                  className="h-11 text-base touch-manipulation border-white/30 focus:border-yellow-500 focus:ring-yellow-500 mt-1"
                  placeholder="Your full name"
                />
              </div>

              <div>
                <Label className="text-white/80 text-sm">Additional Notes</Label>
                <Textarea
                  value={form.additional_notes}
                  onChange={(e) => updateForm({ additional_notes: e.target.value })}
                  className="touch-manipulation text-base min-h-[60px] focus:ring-2 focus:ring-elec-yellow/20 border-white/30 focus:border-yellow-500 mt-1"
                  placeholder="Any additional notes..."
                />
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const canProceed = () => {
    switch (formStep) {
      case 0:
        return (form.injured_name || '').trim().length > 0;
      case 1:
        return (
          (form.location || '').trim().length > 0 &&
          (form.incident_description || '').trim().length > 0
        );
      case 2:
        return form.injury_type && form.body_part && form.severity;
      case 3:
        return (form.recorded_by || '').trim().length > 0;
      default:
        return true;
    }
  };

  // ─── Render ───

  return (
    <div className="bg-background min-h-screen animate-fade-in">
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-white/10">
        <div className="px-4 py-2 flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-white active:opacity-70 active:scale-[0.98] transition-all touch-manipulation h-11 -ml-2 px-2 rounded-lg"
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="text-sm font-medium">Site Safety</span>
          </button>
          {riddorCount > 0 && (
            <Badge className="bg-red-500/15 text-red-400 border-red-500/20">
              {riddorCount} RIDDOR
            </Badge>
          )}
        </div>
      </div>

      <div className="px-4 py-4 space-y-4">
        {/* Hero */}
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20">
            <BookOpen className="h-6 w-6 text-red-400" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">Accident Book</h1>
            <p className="text-sm text-white/70">RIDDOR-compliant incident records</p>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-2">
          <Button
            onClick={() => {
              resetForm();
              setShowForm(true);
            }}
            className="flex-1 h-12 bg-elec-yellow text-black font-bold rounded-xl touch-manipulation active:scale-[0.98]"
          >
            <Plus className="h-5 w-5 mr-2" />
            Record Accident
          </Button>
          <Button
            onClick={() => setShowRIDDORGuide(true)}
            variant="outline"
            className="h-12 border-red-500/30 text-red-400 rounded-xl touch-manipulation px-4"
          >
            <Info className="h-5 w-5" />
          </Button>
        </div>

        {/* Legal notice */}
        <div className="p-3 rounded-xl border border-amber-500/20 bg-amber-500/5">
          <div className="flex items-start gap-2">
            <Shield className="h-4 w-4 text-amber-400 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-xs text-amber-300 font-medium">Legal Requirement</p>
              <p className="text-xs text-white/60 mt-0.5">
                Under the Social Security (Claims and Payments) Regulations 1979 and RIDDOR 2013,
                employers must keep records of workplace accidents. Records must be kept for at
                least 3 years.
              </p>
            </div>
          </div>
        </div>

        {/* Search */}
        {records.length > 0 && (
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-10 pl-9 text-sm border-white/20 focus:border-yellow-500"
              placeholder="Search records..."
            />
          </div>
        )}

        {/* Records List */}
        {filteredRecords.length === 0 && records.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 rounded-full bg-white/[0.05] flex items-center justify-center mx-auto mb-4">
              <BookOpen className="h-8 w-8 text-white/30" />
            </div>
            <h3 className="text-base font-bold text-white/70 mb-1">No Records</h3>
            <p className="text-sm text-white/50">No accidents recorded — good safety record!</p>
          </div>
        ) : (
          <div className="space-y-2 pb-20">
            {filteredRecords.map((record) => {
              const sevConfig = SEVERITY_CONFIG[record.severity];
              return (
                <motion.button
                  key={record.id}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setViewingRecord(record)}
                  className="w-full text-left rounded-xl border border-white/[0.08] bg-white/[0.03] active:bg-white/[0.06] p-4 touch-manipulation"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-11 h-11 rounded-xl flex items-center justify-center ${sevConfig.bg} flex-shrink-0`}
                    >
                      <Activity className={`h-5 w-5 ${sevConfig.colour}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-[15px] font-bold text-white truncate">
                        {record.injured_name}
                      </h4>
                      <div className="flex items-center gap-2 text-xs text-white/60 mt-0.5">
                        <Calendar className="h-3 w-3" />
                        <span>{record.incident_date}</span>
                        <span>•</span>
                        <MapPin className="h-3 w-3" />
                        <span className="truncate">{record.location}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge
                          className={`${sevConfig.bg} ${sevConfig.colour} border-none text-[10px]`}
                        >
                          {sevConfig.label}
                        </Badge>
                        <Badge className="bg-white/5 text-white/60 border-none text-[10px]">
                          {INJURY_TYPES.find((t) => t.id === record.injury_type)?.label ||
                            record.injury_type}
                        </Badge>
                        {record.is_riddor_reportable && (
                          <Badge className="bg-red-500/15 text-red-400 border-none text-[10px]">
                            RIDDOR
                          </Badge>
                        )}
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-white/30 flex-shrink-0" />
                  </div>
                </motion.button>
              );
            })}
          </div>
        )}
      </div>

      {/* Form Sheet */}
      <Sheet open={showForm} onOpenChange={setShowForm}>
        <SheetContent side="bottom" className="h-[85vh] p-0 rounded-t-2xl overflow-hidden">
          <div className="flex flex-col h-full bg-background">
            <div className="px-4 py-3 border-b border-white/10 flex items-center gap-2">
              {formStep > 0 && (
                <button
                  onClick={() => setFormStep((s) => s - 1)}
                  className="h-9 w-9 rounded-full bg-white/[0.08] flex items-center justify-center touch-manipulation"
                >
                  <ArrowLeft className="h-4 w-4 text-white" />
                </button>
              )}
              <h2 className="text-base font-bold text-white">
                Record Accident — Step {formStep + 1} of 4
              </h2>
            </div>

            <div className="h-1 bg-white/[0.05]">
              <motion.div
                className="h-full bg-red-400"
                initial={{ width: 0 }}
                animate={{ width: `${((formStep + 1) / 4) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-4">{renderFormStep()}</div>

            <div className="px-4 py-3 border-t border-white/10 safe-area-bottom">
              <Button
                onClick={() => {
                  if (formStep < 3) {
                    setFormStep((s) => s + 1);
                  } else {
                    saveRecord();
                  }
                }}
                disabled={!canProceed()}
                className="w-full h-12 bg-elec-yellow text-black font-bold rounded-xl touch-manipulation active:scale-[0.98] disabled:opacity-50"
              >
                {formStep === 3 ? 'Save Record' : 'Continue'}
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Record Detail Sheet */}
      <Sheet open={!!viewingRecord} onOpenChange={() => setViewingRecord(null)}>
        <SheetContent side="bottom" className="h-[85vh] p-0 rounded-t-2xl overflow-hidden">
          {viewingRecord && (
            <div className="flex flex-col h-full bg-background">
              <div className="px-4 py-3 border-b border-white/10">
                <h2 className="text-base font-bold text-white">{viewingRecord.injured_name}</h2>
                <div className="flex items-center gap-2 mt-1">
                  <Badge
                    className={`${SEVERITY_CONFIG[viewingRecord.severity].bg} ${SEVERITY_CONFIG[viewingRecord.severity].colour} border-none text-xs`}
                  >
                    {SEVERITY_CONFIG[viewingRecord.severity].label}
                  </Badge>
                  {viewingRecord.is_riddor_reportable && (
                    <Badge className="bg-red-500/15 text-red-400 border-none text-xs">
                      RIDDOR Reportable
                    </Badge>
                  )}
                  <span className="text-xs text-white/50">{viewingRecord.incident_date}</span>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
                {/* Person Details */}
                <div>
                  <h4 className="text-sm font-bold text-white mb-2">Injured Person</h4>
                  <div className="space-y-1 text-sm text-white/70">
                    <p>
                      <span className="text-white/40">Name:</span> {viewingRecord.injured_name}
                    </p>
                    {viewingRecord.injured_role && (
                      <p>
                        <span className="text-white/40">Role:</span> {viewingRecord.injured_role}
                      </p>
                    )}
                    {viewingRecord.injured_employer && (
                      <p>
                        <span className="text-white/40">Employer:</span>{' '}
                        {viewingRecord.injured_employer}
                      </p>
                    )}
                  </div>
                </div>

                {/* Incident */}
                <div>
                  <h4 className="text-sm font-bold text-white mb-2">Incident</h4>
                  <div className="space-y-1 text-sm text-white/70">
                    <p>
                      <span className="text-white/40">Location:</span> {viewingRecord.location}{' '}
                      {viewingRecord.location_detail && `— ${viewingRecord.location_detail}`}
                    </p>
                    <p>
                      <span className="text-white/40">Date/Time:</span>{' '}
                      {viewingRecord.incident_date} {viewingRecord.incident_time}
                    </p>
                    {viewingRecord.activity_at_time && (
                      <p>
                        <span className="text-white/40">Activity:</span>{' '}
                        {viewingRecord.activity_at_time}
                      </p>
                    )}
                    <p className="mt-2">{viewingRecord.incident_description}</p>
                    {viewingRecord.cause && (
                      <p>
                        <span className="text-white/40">Cause:</span> {viewingRecord.cause}
                      </p>
                    )}
                  </div>
                </div>

                {/* Injury */}
                <div>
                  <h4 className="text-sm font-bold text-white mb-2">Injury</h4>
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    <Badge className="bg-white/5 text-white/70 border-none text-xs">
                      {INJURY_TYPES.find((t) => t.id === viewingRecord.injury_type)?.label}
                    </Badge>
                    <Badge className="bg-white/5 text-white/70 border-none text-xs">
                      {BODY_PARTS.find((p) => p.id === viewingRecord.body_part)?.label}
                    </Badge>
                  </div>
                  {viewingRecord.injury_description && (
                    <p className="text-sm text-white/70">{viewingRecord.injury_description}</p>
                  )}
                </div>

                {/* Treatment */}
                {(viewingRecord.first_aid_given || viewingRecord.hospital_visit) && (
                  <div>
                    <h4 className="text-sm font-bold text-white mb-2">Treatment</h4>
                    <div className="space-y-1 text-sm text-white/70">
                      {viewingRecord.first_aid_given && (
                        <>
                          <p>
                            <CheckCircle2 className="h-3.5 w-3.5 text-green-400 inline mr-1" />
                            First aid given
                          </p>
                          {viewingRecord.first_aid_details && (
                            <p className="ml-5">{viewingRecord.first_aid_details}</p>
                          )}
                          {viewingRecord.first_aider_name && (
                            <p className="ml-5 text-white/40">
                              By: {viewingRecord.first_aider_name}
                            </p>
                          )}
                        </>
                      )}
                      {viewingRecord.hospital_visit && (
                        <p>
                          <Activity className="h-3.5 w-3.5 text-amber-400 inline mr-1" />
                          Hospital: {viewingRecord.hospital_name || 'Yes'}
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {/* Time off */}
                {viewingRecord.time_off_work && (
                  <div>
                    <h4 className="text-sm font-bold text-white mb-1">Time Off Work</h4>
                    <p className="text-sm text-white/70">
                      {viewingRecord.days_off} days
                      {viewingRecord.return_date ? ` — Return: ${viewingRecord.return_date}` : ''}
                    </p>
                  </div>
                )}

                {/* RIDDOR */}
                {viewingRecord.is_riddor_reportable && (
                  <div className="p-3 rounded-xl border border-red-500/20 bg-red-500/5">
                    <h4 className="text-sm font-bold text-red-300 mb-1">RIDDOR Status</h4>
                    <p className="text-xs text-red-200/70">{viewingRecord.riddor_category}</p>
                    {viewingRecord.riddor_reference && (
                      <p className="text-xs text-white/50 mt-1">
                        Reference: {viewingRecord.riddor_reference}
                      </p>
                    )}
                  </div>
                )}

                {/* Corrective Actions */}
                {viewingRecord.corrective_actions && (
                  <div>
                    <h4 className="text-sm font-bold text-white mb-1">Corrective Actions</h4>
                    <p className="text-sm text-white/70">{viewingRecord.corrective_actions}</p>
                  </div>
                )}

                <div className="p-3 rounded-xl border border-white/10 bg-white/[0.03] mt-4">
                  <div className="flex justify-between text-xs text-white/50">
                    <span>Recorded by: {viewingRecord.recorded_by}</span>
                    <span>Reported to: {viewingRecord.reported_to}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>

      {/* RIDDOR Guide Sheet */}
      <Sheet open={showRIDDORGuide} onOpenChange={setShowRIDDORGuide}>
        <SheetContent side="bottom" className="h-[85vh] p-0 rounded-t-2xl overflow-hidden">
          <div className="flex flex-col h-full bg-background">
            <div className="px-4 py-3 border-b border-white/10">
              <h2 className="text-base font-bold text-white">RIDDOR Reporting Guide</h2>
              <p className="text-xs text-white/50 mt-0.5">
                Reporting of Injuries, Diseases and Dangerous Occurrences Regulations 2013
              </p>
            </div>
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
              {/* When to report */}
              <div>
                <h4 className="text-sm font-bold text-red-300 mb-2">When Must You Report?</h4>
                <div className="space-y-2">
                  <div className="p-3 rounded-lg border border-red-500/20 bg-red-500/5">
                    <p className="text-xs font-bold text-red-300">IMMEDIATELY (by phone)</p>
                    <p className="text-xs text-white/60 mt-1">
                      Deaths and specified injuries — call 0345 300 9923
                    </p>
                  </div>
                  <div className="p-3 rounded-lg border border-orange-500/20 bg-orange-500/5">
                    <p className="text-xs font-bold text-orange-300">Within 15 days</p>
                    <p className="text-xs text-white/60 mt-1">Over-7-day incapacitation injuries</p>
                  </div>
                  <div className="p-3 rounded-lg border border-amber-500/20 bg-amber-500/5">
                    <p className="text-xs font-bold text-amber-300">Within 10 days</p>
                    <p className="text-xs text-white/60 mt-1">
                      Dangerous occurrences and occupational diseases
                    </p>
                  </div>
                </div>
              </div>

              {/* Specified Injuries */}
              <div>
                <h4 className="text-sm font-bold text-white mb-2">Specified Injuries</h4>
                <div className="space-y-1.5">
                  {RIDDOR_SPECIFIED_INJURIES.map((injury, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <AlertTriangle className="h-3 w-3 text-red-400 mt-0.5 flex-shrink-0" />
                      <span className="text-xs text-white/70">{injury}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Dangerous Occurrences */}
              <div>
                <h4 className="text-sm font-bold text-white mb-2">
                  Dangerous Occurrences (Electrical)
                </h4>
                <div className="space-y-1.5">
                  {RIDDOR_DANGEROUS_OCCURRENCES.map((occurrence, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <AlertTriangle className="h-3 w-3 text-amber-400 mt-0.5 flex-shrink-0" />
                      <span className="text-xs text-white/70">{occurrence}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* How to report */}
              <div className="p-3 rounded-xl border border-blue-500/20 bg-blue-500/5">
                <h4 className="text-sm font-bold text-blue-300 mb-2">How to Report</h4>
                <div className="space-y-1 text-xs text-white/70">
                  <p>
                    <strong>Online:</strong> www.hse.gov.uk/riddor
                  </p>
                  <p>
                    <strong>Phone (fatal/specified):</strong> 0345 300 9923
                  </p>
                  <p>
                    <strong>Record keeping:</strong> Keep records for minimum 3 years
                  </p>
                  <p>
                    <strong>Who reports:</strong> The responsible person (employer, self-employed
                    person, or person in control of premises)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default DigitalAccidentBook;
