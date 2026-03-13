import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
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
import {
  Plus,
  GraduationCap,
  Calendar,
  Building2,
  CheckCircle2,
  Clock,
  Trash2,
  Edit2,
  Loader2,
  Camera,
  ChevronRight,
  AlertCircle,
  ClipboardCheck,
  BookOpen,
  CreditCard,
  Shield,
  Zap,
  Bell,
  Network,
  Factory,
} from 'lucide-react';
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

// Skeleton loader for qualifications
const QualificationSkeleton = () => (
  <div className="space-y-4">
    <div className="bg-white/[0.04] rounded-2xl border border-white/[0.06] overflow-hidden">
      <div className="p-4 border-b border-white/[0.06]">
        <Skeleton className="h-5 w-32 bg-white/10" />
      </div>
      <div className="p-4 space-y-3">
        {[1, 2].map((i) => (
          <div key={i} className="p-4 rounded-xl bg-white/[0.04]">
            <Skeleton className="h-5 w-48 mb-2 bg-white/10" />
            <Skeleton className="h-4 w-32 mb-1 bg-white/10" />
            <Skeleton className="h-3 w-24 bg-white/10" />
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

  // Fetch qualifications from database
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
        title: 'Qualification Added',
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
        title: 'Qualification Updated',
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
        title: 'Qualification Removed',
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

  // Get icon for category
  const getCategoryIcon = (categoryKey: string) => {
    const iconMap: Record<string, React.ComponentType<any>> = {
      core: GraduationCap,
      testing: ClipboardCheck,
      regulations: BookOpen,
      cards: CreditCard,
      specialist: Shield,
      renewable: Zap,
      fire_security: Bell,
      data_comms: Network,
      industrial: Factory,
    };
    return iconMap[categoryKey] || GraduationCap;
  };

  // Get color for category
  const getCategoryColor = (categoryKey: string) => {
    const colorMap: Record<string, { bg: string; text: string; border: string }> = {
      core: { bg: 'bg-purple-500/20', text: 'text-purple-400', border: 'border-purple-500/30' },
      testing: { bg: 'bg-blue-500/20', text: 'text-blue-400', border: 'border-blue-500/30' },
      regulations: { bg: 'bg-amber-500/20', text: 'text-amber-400', border: 'border-amber-500/30' },
      cards: { bg: 'bg-emerald-500/20', text: 'text-emerald-400', border: 'border-emerald-500/30' },
      specialist: { bg: 'bg-red-500/20', text: 'text-red-400', border: 'border-red-500/30' },
      renewable: { bg: 'bg-green-500/20', text: 'text-green-400', border: 'border-green-500/30' },
      fire_security: {
        bg: 'bg-orange-500/20',
        text: 'text-orange-400',
        border: 'border-orange-500/30',
      },
      data_comms: { bg: 'bg-cyan-500/20', text: 'text-cyan-400', border: 'border-cyan-500/30' },
      industrial: { bg: 'bg-slate-500/20', text: 'text-slate-400', border: 'border-slate-500/30' },
    };
    return colorMap[categoryKey] || colorMap.core;
  };

  // Form content - shared between sheet and dialog
  const FormContent = ({ isEdit = false }: { isEdit?: boolean }) => (
    <div className="space-y-4">
      {/* Category Selection - Compact horizontal pills */}
      {!isEdit && (
        <div className="space-y-2">
          <Label className="text-xs text-white">Category</Label>
          <div className="flex flex-wrap gap-1.5">
            {Object.entries(UK_QUALIFICATIONS).map(([key, cat]) => {
              const colors = getCategoryColor(key);
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
                    'px-3 py-1.5 rounded-lg text-xs font-medium transition-all touch-manipulation active:scale-[0.97]',
                    isSelected
                      ? `${colors.bg} ${colors.text} ${colors.border} border`
                      : 'bg-white/[0.06] text-white hover:bg-white/[0.1]'
                  )}
                >
                  {shortLabel}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Edit mode - show locked category */}
      {isEdit && (
        <div className="space-y-1.5">
          <Label className="text-xs text-white">Category</Label>
          <div className="h-10 bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 flex items-center text-sm text-white">
            {UK_QUALIFICATIONS[selectedCategory]?.label || selectedCategory}
          </div>
        </div>
      )}

      {/* Qualification Selection */}
      {selectedCategory && (
        <div className="space-y-1.5">
          <Label className="text-xs text-white">Qualification</Label>
          {isEdit ? (
            <div className="h-10 bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 flex items-center text-sm text-white">
              {getQualificationLabel(selectedQual)}
            </div>
          ) : (
            <Select value={selectedQual} onValueChange={setSelectedQual}>
              <SelectTrigger className="h-10 bg-white/[0.06] border-white/[0.1] rounded-lg touch-manipulation text-sm">
                <SelectValue placeholder="Select qualification..." />
              </SelectTrigger>
              <SelectContent className="bg-elec-dark border-white/[0.1] max-h-[280px]">
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
            <p className="text-[11px] text-amber-400 flex items-center gap-1 mt-1">
              <Clock className="h-3 w-3" />
              Renews every {selectedQualInfo.expiryYears}yr
            </p>
          )}
        </div>
      )}

      {/* Certificate Details - Compact grid */}
      {(selectedQualInfo || isEdit) && (
        <div className="grid grid-cols-2 gap-3 pt-3 border-t border-white/[0.06]">
          <div className="space-y-1.5">
            <Label className="text-xs text-white">Date Achieved</Label>
            <Input
              type="date"
              value={formData.dateAchieved}
              onChange={(e) => setFormData({ ...formData, dateAchieved: e.target.value })}
              className="h-10 bg-white/[0.06] border-white/[0.1] rounded-lg touch-manipulation text-sm"
            />
          </div>
          {(selectedQualInfo?.hasExpiry || formData.expiryDate || isEdit) && (
            <div className="space-y-1.5">
              <Label className="text-xs text-white">Expiry Date</Label>
              <Input
                type="date"
                value={formData.expiryDate}
                onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                className="h-10 bg-white/[0.06] border-white/[0.1] rounded-lg touch-manipulation text-sm"
              />
            </div>
          )}
          <div className="space-y-1.5 col-span-2">
            <Label className="text-xs text-white">
              Certificate No. <span className="text-white">(optional)</span>
            </Label>
            <Input
              value={formData.certificateNumber}
              onChange={(e) => setFormData({ ...formData, certificateNumber: e.target.value })}
              placeholder="e.g., CG-2382-123456"
              className="h-10 bg-white/[0.06] border-white/[0.1] rounded-lg touch-manipulation text-sm"
            />
          </div>
        </div>
      )}
    </div>
  );

  // Form footer with buttons
  const FormFooter = ({ isEdit = false, onClose }: { isEdit?: boolean; onClose: () => void }) => (
    <div className="flex gap-3 pt-2">
      <Button
        variant="outline"
        className="flex-1 h-12 rounded-xl border-white/[0.1] touch-manipulation active:scale-[0.98]"
        onClick={() => {
          onClose();
          resetForm();
        }}
        disabled={isLoading}
      >
        Cancel
      </Button>
      <Button
        className="flex-1 h-12 rounded-xl bg-elec-yellow hover:bg-elec-yellow/90 text-elec-dark font-semibold touch-manipulation active:scale-[0.98]"
        onClick={isEdit ? handleEditQualification : handleAddQualification}
        disabled={
          (!isEdit && (!selectedCategory || !selectedQual || !formData.dateAchieved)) || isLoading
        }
      >
        {isLoading ? (
          <>
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            {isEdit ? 'Saving...' : 'Adding...'}
          </>
        ) : isEdit ? (
          'Save Changes'
        ) : (
          'Add Qualification'
        )}
      </Button>
    </div>
  );

  // Loading state
  if (isFetching) {
    return <QualificationSkeleton />;
  }

  return (
    <div className="space-y-4">
      {/* Delete Confirmation */}
      <ConfirmDeleteDialog
        open={deleteConfirm.open}
        onOpenChange={(open) => setDeleteConfirm({ ...deleteConfirm, open })}
        title="Delete Qualification?"
        description="This will permanently remove this qualification from your Elec-ID profile. This action cannot be undone."
        onConfirm={handleDeleteQualification}
        isLoading={isLoading}
      />

      {/* Mobile Bottom Sheet for Add */}
      {isMobile ? (
        <Drawer.Root
          open={isAddSheetOpen}
          onOpenChange={setIsAddSheetOpen}
          shouldScaleBackground={false}
          noBodyStyles
        >
          <Drawer.Portal>
            <Drawer.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50" />
            <Drawer.Content className="fixed bottom-0 left-0 right-0 z-50 flex flex-col max-h-[90vh] bg-background rounded-t-[20px] border-t border-white/[0.08]">
              <div className="flex justify-center pt-3 pb-2">
                <div className="w-12 h-1.5 rounded-full bg-white/20" />
              </div>
              <div className="px-5 pb-2">
                <h3 className="text-lg font-bold text-white">Add Qualification</h3>
                <p className="text-sm text-white">Add a new credential to your profile</p>
              </div>
              <div className="flex-1 overflow-y-auto px-5 pb-4">{FormContent({})}</div>
              <div className="p-5 border-t border-white/[0.08] bg-background/95 backdrop-blur-sm">
                {FormFooter({ onClose: () => setIsAddSheetOpen(false) })}
              </div>
            </Drawer.Content>
          </Drawer.Portal>
        </Drawer.Root>
      ) : (
        <Dialog open={isAddSheetOpen} onOpenChange={setIsAddSheetOpen}>
          <DialogContent className="bg-elec-gray border-white/20 max-w-md">
            <DialogHeader>
              <DialogTitle className="text-white">Add Qualification</DialogTitle>
            </DialogHeader>
            {FormContent({})}
            {FormFooter({ onClose: () => setIsAddSheetOpen(false) })}
          </DialogContent>
        </Dialog>
      )}

      {/* Mobile Bottom Sheet for Edit */}
      {isMobile ? (
        <Drawer.Root
          open={isEditSheetOpen}
          onOpenChange={setIsEditSheetOpen}
          shouldScaleBackground={false}
          noBodyStyles
        >
          <Drawer.Portal>
            <Drawer.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50" />
            <Drawer.Content className="fixed bottom-0 left-0 right-0 z-50 flex flex-col max-h-[90vh] bg-background rounded-t-[20px] border-t border-white/[0.08]">
              <div className="flex justify-center pt-3 pb-2">
                <div className="w-12 h-1.5 rounded-full bg-white/20" />
              </div>
              <div className="px-5 pb-2">
                <h3 className="text-lg font-bold text-white">Edit Qualification</h3>
                <p className="text-sm text-white">Update your credential details</p>
              </div>
              <div className="flex-1 overflow-y-auto px-5 pb-4">
                {FormContent({ isEdit: true })}
              </div>
              <div className="p-5 border-t border-white/[0.08] bg-background/95 backdrop-blur-sm">
                {FormFooter({ isEdit: true, onClose: () => setIsEditSheetOpen(false) })}
              </div>
            </Drawer.Content>
          </Drawer.Portal>
        </Drawer.Root>
      ) : (
        <Dialog open={isEditSheetOpen} onOpenChange={setIsEditSheetOpen}>
          <DialogContent className="bg-elec-gray border-white/20 max-w-md">
            <DialogHeader>
              <DialogTitle className="text-white">Edit Qualification</DialogTitle>
            </DialogHeader>
            {FormContent({ isEdit: true })}
            {FormFooter({ isEdit: true, onClose: () => setIsEditSheetOpen(false) })}
          </DialogContent>
        </Dialog>
      )}

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-white">Qualifications</h3>
          <p className="text-sm text-white">
            {qualifications.length} credential{qualifications.length !== 1 ? 's' : ''} recorded
          </p>
        </div>
        <Button
          className="h-11 px-4 bg-elec-yellow hover:bg-elec-yellow/90 text-elec-dark font-semibold rounded-xl touch-manipulation active:scale-[0.97]"
          onClick={() => setIsAddSheetOpen(true)}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add
        </Button>
      </div>

      {/* Qualifications List */}
      {qualifications.length > 0 ? (
        <div className="space-y-4">
          {Object.entries(UK_QUALIFICATIONS).map(([catKey, category]) => {
            const categoryQuals = qualifications.filter((q) => q.category === catKey);
            if (categoryQuals.length === 0) return null;

            return (
              <motion.div
                key={catKey}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {/* Category Header — lightweight label */}
                <div className="flex items-center gap-2 mb-1.5">
                  {(() => {
                    const IconComponent = getCategoryIcon(catKey);
                    const colors = getCategoryColor(catKey);
                    return <IconComponent className={cn('h-4 w-4', colors.text)} />;
                  })()}
                  <span className="font-medium text-white text-xs uppercase tracking-wide">
                    {category.label}
                  </span>
                  <span className="text-[10px] text-white ml-auto">{categoryQuals.length}</span>
                </div>

                {/* Qualification Cards - Collapsible Rows */}
                <div className="space-y-1.5">
                  {categoryQuals.map((qual, index) => {
                    const expiryStatus = qual.expiryDate ? getExpiryStatus(qual.expiryDate) : null;
                    const daysUntil = qual.expiryDate ? getDaysUntilExpiry(qual.expiryDate) : null;
                    const colors = getCategoryColor(catKey);
                    const IconComponent = getCategoryIcon(catKey);
                    const isExpanded = expandedId === qual.id;

                    // Expiry badge config
                    const expiryBadge =
                      expiryStatus?.status === 'expired'
                        ? {
                            text: 'Expired',
                            className: 'bg-red-500/20 text-red-400 border-red-500/30',
                          }
                        : expiryStatus?.status === 'expiring'
                          ? {
                              text: `${daysUntil}d`,
                              className: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
                            }
                          : qual.expiryDate
                            ? {
                                text: 'Valid',
                                className: 'bg-green-500/20 text-green-400 border-green-500/30',
                              }
                            : {
                                text: 'Lifetime',
                                className: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
                              };

                    return (
                      <motion.div
                        key={qual.id}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.03 }}
                      >
                        <Collapsible
                          open={isExpanded}
                          onOpenChange={(open) => setExpandedId(open ? qual.id : null)}
                        >
                          {/* Collapsed Row — always visible */}
                          <CollapsibleTrigger asChild>
                            <button
                              className={cn(
                                'w-full flex items-center gap-3 p-3 rounded-xl transition-all touch-manipulation active:scale-[0.98]',
                                isExpanded
                                  ? 'bg-white/[0.06] border border-white/[0.1]'
                                  : 'bg-white/[0.03] hover:bg-white/[0.05]'
                              )}
                            >
                              {/* Category icon */}
                              <div
                                className={cn(
                                  'w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0',
                                  colors.bg
                                )}
                              >
                                <IconComponent className={cn('h-5 w-5', colors.text)} />
                              </div>

                              {/* Name + awarding body */}
                              <div className="flex-1 min-w-0 text-left">
                                <h4 className="font-semibold text-white text-sm leading-tight truncate">
                                  {getQualificationLabel(qual.qualificationValue)}
                                </h4>
                                {qual.awardingBody && (
                                  <p className="text-xs text-white mt-0.5 truncate">
                                    {qual.awardingBody}
                                  </p>
                                )}
                              </div>

                              {/* Expiry badge */}
                              <Badge
                                className={cn(
                                  'text-[10px] font-medium flex-shrink-0',
                                  expiryBadge.className
                                )}
                              >
                                {expiryBadge.text}
                              </Badge>

                              {/* Chevron */}
                              <ChevronRight
                                className={cn(
                                  'h-4 w-4 text-white flex-shrink-0 transition-transform',
                                  isExpanded && 'rotate-90'
                                )}
                              />
                            </button>
                          </CollapsibleTrigger>

                          {/* Expanded Details */}
                          <CollapsibleContent>
                            <div className="ml-14 mr-3 mt-1 mb-2 pl-3 border-l-2 border-white/[0.08] space-y-2">
                              {/* Date Achieved */}
                              <div className="flex items-center gap-2 text-xs">
                                <Calendar className="h-3.5 w-3.5 text-white flex-shrink-0" />
                                <span className="text-white">Achieved:</span>
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

                              {/* Expiry */}
                              <div className="flex items-center gap-2 text-xs">
                                <Clock
                                  className={cn(
                                    'h-3.5 w-3.5 flex-shrink-0',
                                    expiryStatus?.status === 'expired'
                                      ? 'text-red-400'
                                      : expiryStatus?.status === 'expiring'
                                        ? 'text-orange-400'
                                        : 'text-white'
                                  )}
                                />
                                <span className="text-white">Expires:</span>
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

                              {/* Certificate Number */}
                              {qual.certificateNumber && (
                                <div className="flex items-center gap-2 text-xs">
                                  <span className="text-[10px] font-bold text-white w-3.5 text-center flex-shrink-0">
                                    #
                                  </span>
                                  <span className="text-white">Certificate:</span>
                                  <span className="text-white font-mono font-medium">
                                    {qual.certificateNumber}
                                  </span>
                                </div>
                              )}

                              {/* Verified badge */}
                              {qual.isVerified && (
                                <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-[10px] w-fit">
                                  <CheckCircle2 className="h-3 w-3 mr-1" />
                                  Verified
                                </Badge>
                              )}

                              {/* Action buttons */}
                              <div className="flex items-center gap-2 pt-1">
                                <Button
                                  variant="ghost"
                                  className="h-11 px-3 text-xs rounded-lg hover:bg-white/[0.08] touch-manipulation"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    openEditSheet(qual);
                                  }}
                                >
                                  <Edit2 className="h-3.5 w-3.5 mr-1.5" />
                                  Edit
                                </Button>
                                <Button
                                  variant="ghost"
                                  className="h-11 px-3 text-xs rounded-lg hover:bg-red-500/10 text-red-400 touch-manipulation"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setDeleteConfirm({ open: true, id: qual.id });
                                  }}
                                >
                                  <Trash2 className="h-3.5 w-3.5 mr-1.5" />
                                  Delete
                                </Button>
                              </div>
                            </div>
                          </CollapsibleContent>
                        </Collapsible>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            );
          })}
        </div>
      ) : (
        /* Empty State */
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gradient-to-br from-white/[0.06] to-white/[0.02] rounded-2xl border border-white/[0.08] p-8 text-center"
        >
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
            <GraduationCap className="h-8 w-8 text-purple-400" />
          </div>
          <h4 className="text-lg font-semibold text-white mb-2">No qualifications yet</h4>
          <p className="text-sm text-white mb-6 max-w-xs mx-auto">
            Add your electrical qualifications to build your verified professional profile.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              className="h-12 px-6 bg-elec-yellow hover:bg-elec-yellow/90 text-elec-dark font-semibold rounded-xl touch-manipulation active:scale-[0.97]"
              onClick={() => setIsAddSheetOpen(true)}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Qualification
            </Button>
            <Button
              variant="outline"
              className="h-12 px-6 border-white/[0.1] rounded-xl touch-manipulation active:scale-[0.97]"
            >
              <Camera className="h-4 w-4 mr-2" />
              Scan Certificate
            </Button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default ElecIdQualifications;
