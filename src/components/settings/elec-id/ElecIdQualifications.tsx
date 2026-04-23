import React, { useState, useEffect } from 'react';
import { Drawer } from 'vaul';
import { Skeleton } from '@/components/ui/skeleton';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { UK_QUALIFICATIONS, getQualificationLabel } from '@/data/uk-electrician-constants';
import { getExpiryStatus, getDaysUntilExpiry } from '@/utils/elecIdGenerator';
import { useNotifications } from '@/components/notifications/NotificationProvider';
import ConfirmDeleteDialog from './ConfirmDeleteDialog';
import { useElecIdProfile } from '@/hooks/useElecIdProfile';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  getQualificationsByProfileId,
  addElecIdQualification,
  updateElecIdQualification,
  deleteElecIdQualification,
  ElecIdQualification,
} from '@/services/elecIdService';
import {
  Eyebrow,
  SectionHeader,
  EmptyState,
  toneText,
  type Tone,
} from '@/components/college/primitives';

interface Qualification {
  id: string;
  qualificationValue: string;
  category: string;
  awardingBody: string;
  dateAchieved: string;
  expiryDate?: string;
  certificateNumber?: string;
  isVerified: boolean;
}

const CATEGORY_TONE: Record<string, Tone> = {
  core: 'purple',
  testing: 'blue',
  regulations: 'amber',
  cards: 'emerald',
  specialist: 'red',
  renewable: 'green',
  fire_security: 'orange',
  data_comms: 'cyan',
  industrial: 'indigo',
};

const QualificationSkeleton = () => (
  <div className="space-y-4">
    <div className="bg-[hsl(0_0%_12%)] rounded-2xl border border-white/[0.06] overflow-hidden">
      <div className="p-4 border-b border-white/[0.06]">
        <Skeleton className="h-5 w-32 bg-white/[0.04]" />
      </div>
      <div className="p-4 space-y-3">
        {[1, 2].map((i) => (
          <div key={i} className="p-4 rounded-xl bg-white/[0.04]">
            <Skeleton className="h-5 w-48 mb-2 bg-white/[0.06]" />
            <Skeleton className="h-4 w-32 mb-1 bg-white/[0.06]" />
            <Skeleton className="h-3 w-24 bg-white/[0.06]" />
          </div>
        ))}
      </div>
    </div>
  </div>
);

const ElecIdQualifications = () => {
  const { addNotification } = useNotifications();
  const { profile } = useElecIdProfile();
  const isMobile = useIsMobile();

  const [isAddSheetOpen, setIsAddSheetOpen] = useState(false);
  const [isEditSheetOpen, setIsEditSheetOpen] = useState(false);
  const [editingQual, setEditingQual] = useState<Qualification | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<{ open: boolean; id: string | null }>({
    open: false,
    id: null,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedQual, setSelectedQual] = useState<string>('');
  const [formData, setFormData] = useState({
    awardingBody: '',
    dateAchieved: '',
    expiryDate: '',
    certificateNumber: '',
  });

  const [qualifications, setQualifications] = useState<Qualification[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    const fetchQualifications = async () => {
      if (!profile?.id) {
        setIsFetching(false);
        return;
      }

      try {
        const data = await getQualificationsByProfileId(profile.id);
        const mapped = data.map((q: ElecIdQualification) => ({
          id: q.id,
          qualificationValue: q.qualification_name,
          category: q.category || q.qualification_type || 'core',
          awardingBody: q.awarding_body || '',
          dateAchieved: q.date_achieved || '',
          expiryDate: q.expiry_date || undefined,
          certificateNumber: q.certificate_number || undefined,
          isVerified: q.is_verified,
        }));
        setQualifications(mapped);
      } catch (error) {
        console.error('Error fetching qualifications:', error);
        addNotification({
          title: 'Error',
          message: 'Failed to load qualifications',
          type: 'error',
        });
      } finally {
        setIsFetching(false);
      }
    };

    fetchQualifications();
  }, [profile?.id]);

  const handleAddQualification = async () => {
    if (!profile?.id) {
      addNotification({
        title: 'Error',
        message: 'Profile not found. Please try again.',
        type: 'error',
      });
      return;
    }

    setIsLoading(true);
    try {
      const newDbQual = await addElecIdQualification({
        profile_id: profile.id,
        qualification_name: selectedQual,
        qualification_type: selectedCategory,
        category: selectedCategory,
        awarding_body: formData.awardingBody || null,
        date_achieved: formData.dateAchieved || null,
        expiry_date: formData.expiryDate || null,
        certificate_number: formData.certificateNumber || null,
        is_verified: false,
      });

      const newQual: Qualification = {
        id: newDbQual.id,
        qualificationValue: selectedQual,
        category: selectedCategory,
        awardingBody: formData.awardingBody,
        dateAchieved: formData.dateAchieved,
        expiryDate: formData.expiryDate || undefined,
        certificateNumber: formData.certificateNumber || undefined,
        isVerified: false,
      };

      setQualifications((prev) => [...prev, newQual]);
      setIsAddSheetOpen(false);
      resetForm();

      addNotification({
        title: 'Qualification added',
        message: `${getQualificationLabel(selectedQual)} has been added to your profile.`,
        type: 'success',
      });
    } catch (error) {
      console.error('Error adding qualification:', error);
      addNotification({
        title: 'Error',
        message: 'Failed to add qualification. Please try again.',
        type: 'error',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditQualification = async () => {
    if (!editingQual) return;
    setIsLoading(true);

    try {
      await updateElecIdQualification(editingQual.id, {
        awarding_body: formData.awardingBody || null,
        date_achieved: formData.dateAchieved || null,
        expiry_date: formData.expiryDate || null,
        certificate_number: formData.certificateNumber || null,
      });

      setQualifications((prev) =>
        prev.map((q) =>
          q.id === editingQual.id
            ? {
                ...q,
                awardingBody: formData.awardingBody,
                dateAchieved: formData.dateAchieved,
                expiryDate: formData.expiryDate || undefined,
                certificateNumber: formData.certificateNumber || undefined,
              }
            : q
        )
      );

      setIsEditSheetOpen(false);
      setEditingQual(null);
      resetForm();

      addNotification({
        title: 'Qualification updated',
        message: 'Your qualification details have been updated.',
        type: 'success',
      });
    } catch (error) {
      console.error('Error updating qualification:', error);
      addNotification({
        title: 'Error',
        message: 'Failed to update qualification. Please try again.',
        type: 'error',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteQualification = async () => {
    if (!deleteConfirm.id) return;
    setIsLoading(true);

    try {
      await deleteElecIdQualification(deleteConfirm.id);

      const deletedQual = qualifications.find((q) => q.id === deleteConfirm.id);
      setQualifications((prev) => prev.filter((q) => q.id !== deleteConfirm.id));
      setDeleteConfirm({ open: false, id: null });

      addNotification({
        title: 'Qualification removed',
        message: deletedQual
          ? `${getQualificationLabel(deletedQual.qualificationValue)} has been removed.`
          : 'Qualification has been removed.',
        type: 'info',
      });
    } catch (error) {
      console.error('Error deleting qualification:', error);
      addNotification({
        title: 'Error',
        message: 'Failed to delete qualification. Please try again.',
        type: 'error',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const openEditSheet = (qual: Qualification) => {
    setEditingQual(qual);
    setSelectedCategory(qual.category);
    setSelectedQual(qual.qualificationValue);
    setFormData({
      awardingBody: qual.awardingBody,
      dateAchieved: qual.dateAchieved,
      expiryDate: qual.expiryDate || '',
      certificateNumber: qual.certificateNumber || '',
    });
    setIsEditSheetOpen(true);
  };

  const resetForm = () => {
    setSelectedCategory('');
    setSelectedQual('');
    setFormData({
      awardingBody: '',
      dateAchieved: '',
      expiryDate: '',
      certificateNumber: '',
    });
  };

  const getCategoryQualifications = (categoryKey: string) => {
    return UK_QUALIFICATIONS[categoryKey]?.items || [];
  };

  const getSelectedQualInfo = () => {
    if (!selectedCategory || !selectedQual) return null;
    const items = getCategoryQualifications(selectedCategory);
    return items.find((q) => q.value === selectedQual);
  };

  const selectedQualInfo = getSelectedQualInfo();

  const FormContent = ({ isEdit = false }: { isEdit?: boolean }) => (
    <div className="space-y-4">
      {!isEdit && (
        <div className="space-y-2">
          <Label className="text-xs text-white">Category</Label>
          <div className="flex flex-wrap gap-1.5">
            {Object.entries(UK_QUALIFICATIONS).map(([key, cat]) => {
              const isSelected = selectedCategory === key;
              const shortLabel = cat.label
                .replace('Core Qualifications', 'Core')
                .replace('Testing & Inspection', 'Testing')
                .replace('Health & Safety', 'H&S')
                .replace('Data & Communications', 'Data')
                .replace('Fire & Security', 'Fire')
                .replace('Industrial & Controls', 'Industrial')
                .replace('Renewable Energy', 'Renewable')
                .replace('Industry Cards', 'Cards')
                .replace('Regulations', 'Regs');
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => {
                    setSelectedCategory(key);
                    setSelectedQual('');
                  }}
                  className={cn(
                    'px-3 py-1.5 rounded-lg text-xs font-medium transition-all touch-manipulation',
                    isSelected
                      ? 'bg-elec-yellow/10 text-elec-yellow border border-elec-yellow/20'
                      : 'bg-white/[0.04] text-white hover:bg-white/[0.08] border border-white/[0.06]'
                  )}
                >
                  {shortLabel}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {isEdit && (
        <div className="space-y-1.5">
          <Label className="text-xs text-white">Category</Label>
          <div className="h-11 bg-white/[0.04] border border-white/[0.06] rounded-xl px-3 flex items-center text-sm text-white">
            {UK_QUALIFICATIONS[selectedCategory]?.label || selectedCategory}
          </div>
        </div>
      )}

      {selectedCategory && (
        <div className="space-y-1.5">
          <Label className="text-xs text-white">Qualification</Label>
          {isEdit ? (
            <div className="h-11 bg-white/[0.04] border border-white/[0.06] rounded-xl px-3 flex items-center text-sm text-white">
              {getQualificationLabel(selectedQual)}
            </div>
          ) : (
            <Select value={selectedQual} onValueChange={setSelectedQual}>
              <SelectTrigger className="h-11 bg-white/[0.04] border-white/[0.06] rounded-xl touch-manipulation text-sm text-white">
                <SelectValue placeholder="Select qualification…" />
              </SelectTrigger>
              <SelectContent className="bg-[hsl(0_0%_12%)] border-white/[0.06] max-h-[280px]">
                {getCategoryQualifications(selectedCategory).map((qual) => (
                  <SelectItem key={qual.value} value={qual.value} className="py-2.5 text-sm">
                    <div>
                      <span className="font-medium">{qual.label}</span>
                      <span className="text-white ml-2 text-xs">{qual.awarding}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
          {selectedQualInfo?.hasExpiry && !isEdit && (
            <p className="text-[11px] text-amber-400 mt-1">
              Renews every {selectedQualInfo.expiryYears}yr
            </p>
          )}
        </div>
      )}

      {(selectedQualInfo || isEdit) && (
        <div className="grid grid-cols-2 gap-3 pt-3 border-t border-white/[0.06]">
          <div className="space-y-1.5">
            <Label className="text-xs text-white">Date achieved</Label>
            <Input
              type="date"
              value={formData.dateAchieved}
              onChange={(e) => setFormData({ ...formData, dateAchieved: e.target.value })}
              className="h-11 bg-white/[0.04] border-white/[0.06] rounded-xl touch-manipulation text-sm text-white"
            />
          </div>
          {(selectedQualInfo?.hasExpiry || formData.expiryDate || isEdit) && (
            <div className="space-y-1.5">
              <Label className="text-xs text-white">Expiry date</Label>
              <Input
                type="date"
                value={formData.expiryDate}
                onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                className="h-11 bg-white/[0.04] border-white/[0.06] rounded-xl touch-manipulation text-sm text-white"
              />
            </div>
          )}
          <div className="space-y-1.5 col-span-2">
            <Label className="text-xs text-white">
              Certificate no. <span className="text-white">(optional)</span>
            </Label>
            <Input
              value={formData.certificateNumber}
              onChange={(e) => setFormData({ ...formData, certificateNumber: e.target.value })}
              placeholder="e.g. CG-2382-123456"
              className="h-11 bg-white/[0.04] border-white/[0.06] rounded-xl touch-manipulation text-sm text-white placeholder:text-white"
            />
          </div>
        </div>
      )}
    </div>
  );

  const FormFooter = ({ isEdit = false, onClose }: { isEdit?: boolean; onClose: () => void }) => (
    <div className="flex gap-3 pt-2">
      <button
        className="flex-1 h-11 rounded-xl border border-white/[0.06] text-white touch-manipulation active:scale-[0.98] disabled:opacity-60"
        onClick={() => {
          onClose();
          resetForm();
        }}
        disabled={isLoading}
      >
        Cancel
      </button>
      <button
        className="flex-1 h-11 rounded-xl bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold touch-manipulation active:scale-[0.98] disabled:opacity-60"
        onClick={isEdit ? handleEditQualification : handleAddQualification}
        disabled={
          (!isEdit && (!selectedCategory || !selectedQual || !formData.dateAchieved)) || isLoading
        }
      >
        {isLoading
          ? isEdit
            ? 'Saving…'
            : 'Adding…'
          : isEdit
            ? 'Save changes'
            : 'Add qualification'}
      </button>
    </div>
  );

  if (isFetching) return <QualificationSkeleton />;

  return (
    <div className="space-y-5">
      <ConfirmDeleteDialog
        open={deleteConfirm.open}
        onOpenChange={(open) => setDeleteConfirm({ ...deleteConfirm, open })}
        title="Delete qualification?"
        description="This will permanently remove this qualification from your Elec-ID profile. This action cannot be undone."
        onConfirm={handleDeleteQualification}
        isLoading={isLoading}
      />

      {isMobile ? (
        <Drawer.Root
          open={isAddSheetOpen}
          onOpenChange={setIsAddSheetOpen}
          shouldScaleBackground={false}
          noBodyStyles
        >
          <Drawer.Portal>
            <Drawer.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50" />
            <Drawer.Content className="fixed bottom-0 left-0 right-0 z-50 flex flex-col max-h-[90vh] bg-[hsl(0_0%_12%)] rounded-t-2xl border-t border-white/[0.06]">
              <div className="flex justify-center pt-3 pb-2">
                <div className="w-12 h-1.5 rounded-full bg-white/[0.15]" />
              </div>
              <div className="px-5 pb-2">
                <h3 className="text-lg font-semibold text-white">Add qualification</h3>
                <p className="text-sm text-white">Add a new credential to your profile</p>
              </div>
              <div className="flex-1 overflow-y-auto px-5 pb-4">{FormContent({})}</div>
              <div className="p-5 border-t border-white/[0.06]">
                {FormFooter({ onClose: () => setIsAddSheetOpen(false) })}
              </div>
            </Drawer.Content>
          </Drawer.Portal>
        </Drawer.Root>
      ) : (
        <Dialog open={isAddSheetOpen} onOpenChange={setIsAddSheetOpen}>
          <DialogContent className="bg-[hsl(0_0%_12%)] border-white/[0.06] rounded-2xl max-w-md">
            <DialogHeader>
              <DialogTitle className="text-white">Add qualification</DialogTitle>
            </DialogHeader>
            {FormContent({})}
            {FormFooter({ onClose: () => setIsAddSheetOpen(false) })}
          </DialogContent>
        </Dialog>
      )}

      {isMobile ? (
        <Drawer.Root
          open={isEditSheetOpen}
          onOpenChange={setIsEditSheetOpen}
          shouldScaleBackground={false}
          noBodyStyles
        >
          <Drawer.Portal>
            <Drawer.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50" />
            <Drawer.Content className="fixed bottom-0 left-0 right-0 z-50 flex flex-col max-h-[90vh] bg-[hsl(0_0%_12%)] rounded-t-2xl border-t border-white/[0.06]">
              <div className="flex justify-center pt-3 pb-2">
                <div className="w-12 h-1.5 rounded-full bg-white/[0.15]" />
              </div>
              <div className="px-5 pb-2">
                <h3 className="text-lg font-semibold text-white">Edit qualification</h3>
                <p className="text-sm text-white">Update your credential details</p>
              </div>
              <div className="flex-1 overflow-y-auto px-5 pb-4">
                {FormContent({ isEdit: true })}
              </div>
              <div className="p-5 border-t border-white/[0.06]">
                {FormFooter({ isEdit: true, onClose: () => setIsEditSheetOpen(false) })}
              </div>
            </Drawer.Content>
          </Drawer.Portal>
        </Drawer.Root>
      ) : (
        <Dialog open={isEditSheetOpen} onOpenChange={setIsEditSheetOpen}>
          <DialogContent className="bg-[hsl(0_0%_12%)] border-white/[0.06] rounded-2xl max-w-md">
            <DialogHeader>
              <DialogTitle className="text-white">Edit qualification</DialogTitle>
            </DialogHeader>
            {FormContent({ isEdit: true })}
            {FormFooter({ isEdit: true, onClose: () => setIsEditSheetOpen(false) })}
          </DialogContent>
        </Dialog>
      )}

      <SectionHeader
        eyebrow="Credentials"
        title="Qualifications"
        action="Add qualification"
        onAction={() => setIsAddSheetOpen(true)}
      />

      <p className="text-sm text-white">
        {qualifications.length} credential{qualifications.length !== 1 ? 's' : ''} recorded
      </p>

      {qualifications.length > 0 ? (
        <div className="space-y-6">
          {Object.entries(UK_QUALIFICATIONS).map(([catKey, category]) => {
            const categoryQuals = qualifications.filter((q) => q.category === catKey);
            if (categoryQuals.length === 0) return null;
            const tone = CATEGORY_TONE[catKey] ?? 'purple';

            return (
              <motion.div
                key={catKey}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-2"
              >
                <div className="flex items-center justify-between">
                  <Eyebrow>{category.label}</Eyebrow>
                  <span className="text-[11px] text-white tabular-nums">
                    {categoryQuals.length}
                  </span>
                </div>

                <div className="space-y-1.5">
                  {categoryQuals.map((qual) => {
                    const expiryStatus = qual.expiryDate ? getExpiryStatus(qual.expiryDate) : null;
                    const daysUntil = qual.expiryDate ? getDaysUntilExpiry(qual.expiryDate) : null;
                    const isExpanded = expandedId === qual.id;

                    const expiryBadgeTone: Tone =
                      expiryStatus?.status === 'expired'
                        ? 'red'
                        : expiryStatus?.status === 'expiring'
                          ? 'orange'
                          : qual.expiryDate
                            ? 'emerald'
                            : 'blue';
                    const expiryBadgeText =
                      expiryStatus?.status === 'expired'
                        ? 'Expired'
                        : expiryStatus?.status === 'expiring'
                          ? `${daysUntil}d`
                          : qual.expiryDate
                            ? 'Valid'
                            : 'Lifetime';

                    return (
                      <Collapsible
                        key={qual.id}
                        open={isExpanded}
                        onOpenChange={(open) => setExpandedId(open ? qual.id : null)}
                      >
                        <CollapsibleTrigger asChild>
                          <button
                            className={cn(
                              'w-full flex items-center gap-4 px-5 py-4 rounded-2xl border transition-all touch-manipulation text-left',
                              isExpanded
                                ? 'bg-[hsl(0_0%_15%)] border-white/[0.08]'
                                : 'bg-[hsl(0_0%_12%)] border-white/[0.06] hover:bg-[hsl(0_0%_14%)]'
                            )}
                          >
                            <span
                              aria-hidden
                              className={cn(
                                'w-[3px] h-10 rounded-full shrink-0',
                                tone === 'purple'
                                  ? 'bg-purple-400'
                                  : tone === 'blue'
                                    ? 'bg-blue-400'
                                    : tone === 'amber'
                                      ? 'bg-amber-400'
                                      : tone === 'emerald'
                                        ? 'bg-emerald-400'
                                        : tone === 'red'
                                          ? 'bg-red-400'
                                          : tone === 'green'
                                            ? 'bg-green-400'
                                            : tone === 'orange'
                                              ? 'bg-orange-400'
                                              : tone === 'cyan'
                                                ? 'bg-cyan-400'
                                                : 'bg-indigo-400'
                              )}
                            />

                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-sm text-white truncate">
                                {getQualificationLabel(qual.qualificationValue)}
                              </p>
                              {qual.awardingBody && (
                                <p className="text-[11.5px] text-white/65 mt-0.5 truncate">
                                  {qual.awardingBody}
                                </p>
                              )}
                            </div>

                            <span
                              className={cn(
                                'text-[10px] font-medium uppercase tracking-[0.15em]',
                                toneText[expiryBadgeTone]
                              )}
                            >
                              {expiryBadgeText}
                            </span>

                            <span
                              aria-hidden
                              className={cn(
                                'text-sm text-elec-yellow transition-transform shrink-0',
                                isExpanded && 'rotate-90'
                              )}
                            >
                              →
                            </span>
                          </button>
                        </CollapsibleTrigger>

                        <CollapsibleContent>
                          <div className="mt-1 ml-7 mr-3 pl-3 border-l border-white/[0.06] space-y-2 py-3">
                            <div className="flex items-center gap-2 text-xs">
                              <span className="text-white/55">Achieved</span>
                              <span className="text-white font-medium">
                                {qual.dateAchieved
                                  ? new Date(qual.dateAchieved).toLocaleDateString('en-GB', {
                                      day: 'numeric',
                                      month: 'short',
                                      year: 'numeric',
                                    })
                                  : 'Not set'}
                              </span>
                            </div>

                            <div className="flex items-center gap-2 text-xs">
                              <span className="text-white/55">Expires</span>
                              <span
                                className={cn(
                                  'font-medium',
                                  expiryStatus?.status === 'expired'
                                    ? 'text-red-400'
                                    : expiryStatus?.status === 'expiring'
                                      ? 'text-orange-400'
                                      : 'text-white'
                                )}
                              >
                                {qual.expiryDate
                                  ? new Date(qual.expiryDate).toLocaleDateString('en-GB', {
                                      day: 'numeric',
                                      month: 'short',
                                      year: 'numeric',
                                    })
                                  : 'No expiry'}
                              </span>
                            </div>

                            {qual.certificateNumber && (
                              <div className="flex items-center gap-2 text-xs">
                                <span className="text-white/55">Cert no.</span>
                                <span className="text-white font-mono font-medium">
                                  {qual.certificateNumber}
                                </span>
                              </div>
                            )}

                            {qual.isVerified && (
                              <span className="text-[10px] font-medium uppercase tracking-[0.15em] text-emerald-400">
                                Verified
                              </span>
                            )}

                            <div className="flex items-center gap-2 pt-1">
                              <button
                                className="h-11 px-3 text-xs rounded-lg border border-white/[0.06] bg-white/[0.04] text-white hover:bg-white/[0.08] touch-manipulation"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  openEditSheet(qual);
                                }}
                              >
                                Edit
                              </button>
                              <button
                                className="h-11 px-3 text-xs rounded-lg text-red-400 hover:bg-red-500/10 touch-manipulation"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setDeleteConfirm({ open: true, id: qual.id });
                                }}
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        </CollapsibleContent>
                      </Collapsible>
                    );
                  })}
                </div>
              </motion.div>
            );
          })}
        </div>
      ) : (
        <EmptyState
          title="No qualifications yet"
          description="Add your electrical qualifications to build your verified professional profile."
          action="Add qualification"
          onAction={() => setIsAddSheetOpen(true)}
        />
      )}
    </div>
  );
};

export default ElecIdQualifications;
