import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import { Sheet } from '@/components/ui/sheet';
import SettingsSheetContent from '@/components/settings/SettingsSheetContent';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { UK_ELECTRICAL_SKILLS, SKILL_LEVELS, SkillLevel } from '@/data/uk-electrician-constants';
import { useNotifications } from '@/components/notifications/NotificationProvider';
import ConfirmDeleteDialog from './ConfirmDeleteDialog';
import { useElecIdProfile } from '@/hooks/useElecIdProfile';
import {
  getSkillsByProfileId,
  addElecIdSkill,
  updateElecIdSkill,
  deleteElecIdSkill,
  ElecIdSkill,
} from '@/services/elecIdService';
import {
  Eyebrow,
  SectionHeader,
  EmptyState,
  StatStrip,
  toneText,
  type Tone,
} from '@/components/college/primitives';
import { chipBase, chipOff, chipOn, inputCn } from '@/components/settings/formStyles';

interface Skill {
  id: string;
  skillName: string;
  category: string;
  level: SkillLevel;
  yearsExperience: number;
  isVerified: boolean;
}

const LEVEL_TONE: Record<SkillLevel, Tone> = {
  beginner: 'blue',
  intermediate: 'emerald',
  advanced: 'orange',
  expert: 'yellow',
};

const SkillsSkeleton = () => (
  <div className="space-y-5">
    <div className="flex items-center justify-between px-1">
      <div>
        <Skeleton className="h-6 w-28 bg-white/[0.04]" />
        <Skeleton className="h-4 w-20 mt-1 bg-white/[0.04]" />
      </div>
      <Skeleton className="h-11 w-28 rounded-xl bg-white/[0.04]" />
    </div>
    <div className="grid grid-cols-4 gap-2">
      {[1, 2, 3, 4].map((i) => (
        <Skeleton key={i} className="h-20 rounded-2xl bg-white/[0.04]" />
      ))}
    </div>
  </div>
);

const ElecIdSkills = () => {
  const { addNotification } = useNotifications();
  const { profile } = useElecIdProfile();

  const [isAddSheetOpen, setIsAddSheetOpen] = useState(false);
  const [isEditSheetOpen, setIsEditSheetOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<{ open: boolean; id: string | null }>({
    open: false,
    id: null,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedSkill, setSelectedSkill] = useState<string>('');
  const [formData, setFormData] = useState({
    level: '' as SkillLevel | '',
    yearsExperience: '',
  });

  const [skills, setSkills] = useState<Skill[]>([]);

  useEffect(() => {
    const fetchSkills = async () => {
      if (!profile?.id) {
        setIsFetching(false);
        return;
      }

      try {
        const data = await getSkillsByProfileId(profile.id);
        const mapped = data.map((s: ElecIdSkill) => ({
          id: s.id,
          skillName: s.skill_name,
          category: 'installation',
          level: (s.skill_level || 'intermediate') as SkillLevel,
          yearsExperience: s.years_experience || 0,
          isVerified: s.is_verified,
        }));
        setSkills(mapped);
      } catch (error) {
        console.error('Error fetching skills:', error);
        addNotification({
          title: 'Error',
          message: 'Failed to load skills',
          type: 'error',
        });
      } finally {
        setIsFetching(false);
      }
    };

    fetchSkills();
  }, [profile?.id]);

  const handleAddSkill = async () => {
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
      const newDbSkill = await addElecIdSkill({
        profile_id: profile.id,
        skill_name: selectedSkill,
        skill_level: formData.level as SkillLevel,
        years_experience: parseInt(formData.yearsExperience) || 0,
        is_verified: false,
      });

      const newSkill: Skill = {
        id: newDbSkill.id,
        skillName: selectedSkill,
        category: selectedCategory,
        level: formData.level as SkillLevel,
        yearsExperience: parseInt(formData.yearsExperience) || 0,
        isVerified: false,
      };

      setSkills((prev) => [...prev, newSkill]);
      setIsAddSheetOpen(false);
      resetForm();

      addNotification({
        title: 'Skill added',
        message: `${selectedSkill} has been added to your profile.`,
        type: 'success',
      });
    } catch (error) {
      console.error('Error adding skill:', error);
      addNotification({
        title: 'Error',
        message: 'Failed to add skill. Please try again.',
        type: 'error',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditSkill = async () => {
    if (!editingSkill) return;
    setIsLoading(true);

    try {
      await updateElecIdSkill(editingSkill.id, {
        skill_level: formData.level as SkillLevel,
        years_experience: parseInt(formData.yearsExperience) || 0,
      });

      setSkills((prev) =>
        prev.map((s) =>
          s.id === editingSkill.id
            ? {
                ...s,
                level: formData.level as SkillLevel,
                yearsExperience: parseInt(formData.yearsExperience) || 0,
              }
            : s
        )
      );

      setIsEditSheetOpen(false);
      setEditingSkill(null);
      resetForm();

      addNotification({
        title: 'Skill updated',
        message: 'Your skill details have been updated.',
        type: 'success',
      });
    } catch (error) {
      console.error('Error updating skill:', error);
      addNotification({
        title: 'Error',
        message: 'Failed to update skill. Please try again.',
        type: 'error',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteSkill = async () => {
    if (!deleteConfirm.id) return;
    setIsLoading(true);

    try {
      await deleteElecIdSkill(deleteConfirm.id);

      const deletedSkill = skills.find((s) => s.id === deleteConfirm.id);
      setSkills((prev) => prev.filter((s) => s.id !== deleteConfirm.id));
      setDeleteConfirm({ open: false, id: null });

      addNotification({
        title: 'Skill removed',
        message: deletedSkill
          ? `${deletedSkill.skillName} has been removed.`
          : 'Skill has been removed.',
        type: 'info',
      });
    } catch (error) {
      console.error('Error deleting skill:', error);
      addNotification({
        title: 'Error',
        message: 'Failed to delete skill. Please try again.',
        type: 'error',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const openEditSheet = (skill: Skill) => {
    setEditingSkill(skill);
    setSelectedCategory(skill.category);
    setSelectedSkill(skill.skillName);
    setFormData({
      level: skill.level,
      yearsExperience: skill.yearsExperience.toString(),
    });
    setIsEditSheetOpen(true);
  };

  const resetForm = () => {
    setSelectedCategory('');
    setSelectedSkill('');
    setFormData({
      level: '',
      yearsExperience: '',
    });
  };

  const getCategorySkills = (categoryKey: string) => {
    return UK_ELECTRICAL_SKILLS[categoryKey as keyof typeof UK_ELECTRICAL_SKILLS]?.skills || [];
  };

  const getLevelInfo = (level: SkillLevel) => SKILL_LEVELS.find((l) => l.value === level);

  const renderFormContent = (isEdit = false) => (
    <div className="space-y-5">
      <div className="space-y-2">
        <Eyebrow>01 · Select category</Eyebrow>
        <div className="grid grid-cols-2 gap-2">
          {Object.entries(UK_ELECTRICAL_SKILLS).map(([key, cat]) => {
            const isSelected = selectedCategory === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => {
                  if (!isEdit) {
                    setSelectedCategory(key);
                    setSelectedSkill('');
                  }
                }}
                disabled={isEdit}
                className={cn(
                  chipBase,
                  'h-auto flex-none px-3 py-3 text-left',
                  isSelected ? chipOn : chipOff,
                  isEdit && 'opacity-50 cursor-not-allowed'
                )}
                aria-pressed={isSelected}
              >
                <span className="text-sm font-medium">{cat.label}</span>
                <p className="text-[10px] mt-1">{cat.skills.length} skills</p>
              </button>
            );
          })}
        </div>
      </div>

      {selectedCategory && (
        <div className="space-y-2">
          <Eyebrow>02 · Select skill</Eyebrow>
          <div className="max-h-[200px] overflow-y-auto rounded-xl border border-elec-yellow/35 bg-white/[0.02]">
            {getCategorySkills(selectedCategory).map((skill) => {
              const isSelected = selectedSkill === skill;
              return (
                <button
                  key={skill}
                  type="button"
                  onClick={() => !isEdit && setSelectedSkill(skill)}
                  disabled={isEdit}
                  className={cn(
                    'w-full flex items-center gap-3 p-3 border-b border-white/[0.04] last:border-0 transition-all touch-manipulation text-left',
                    isSelected ? 'bg-white/[0.06]' : 'hover:bg-white/[0.04]',
                    isEdit && 'opacity-50 cursor-not-allowed'
                  )}
                >
                  <span
                    aria-hidden
                    className={cn(
                      'h-4 w-4 rounded-full border flex items-center justify-center shrink-0',
                      isSelected ? 'bg-elec-yellow border-elec-yellow' : 'border-white/[0.2]'
                    )}
                  >
                    {isSelected && <span className="h-1.5 w-1.5 rounded-full bg-black" />}
                  </span>
                  <span
                    className={cn(
                      'text-sm',
                      isSelected ? 'text-elec-yellow font-medium' : 'text-white'
                    )}
                  >
                    {skill}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      <div className="space-y-2">
        <Eyebrow>03 · Your proficiency</Eyebrow>
        <div className="grid grid-cols-2 gap-2">
          {SKILL_LEVELS.map((level) => {
            const isSelected = formData.level === level.value;
            return (
              <button
                key={level.value}
                type="button"
                onClick={() => setFormData({ ...formData, level: level.value })}
                className={cn(
                  chipBase,
                  'h-auto flex-none px-4 py-3 text-left',
                  isSelected ? chipOn : chipOff
                )}
                aria-pressed={isSelected}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className={cn(
                      'text-[10px] font-medium uppercase tracking-[0.15em]',
                      isSelected ? 'text-black' : toneText[LEVEL_TONE[level.value]]
                    )}
                  >
                    {level.label}
                  </span>
                </div>
                <p className="text-xs leading-relaxed">{level.description}</p>
              </button>
            );
          })}
        </div>
      </div>

      <div className="space-y-2">
        <Eyebrow>04 · Years of experience</Eyebrow>
        <div className="relative">
          <Input
            type="number"
            min="0"
            max="50"
            value={formData.yearsExperience}
            onChange={(e) => setFormData({ ...formData, yearsExperience: e.target.value })}
            placeholder="Years"
            className={cn(inputCn, 'pr-14')}
          />
          <div className="absolute right-1 top-1/2 -translate-y-1/2 text-white text-sm">years</div>
        </div>

        <div className="grid grid-cols-6 gap-2">
          {[1, 2, 5, 10, 15, 20].map((years) => (
            <button
              key={years}
              type="button"
              onClick={() => setFormData({ ...formData, yearsExperience: years.toString() })}
              className={cn(
                chipBase,
                'flex-none',
                formData.yearsExperience === years.toString() ? chipOn : chipOff
              )}
              aria-pressed={formData.yearsExperience === years.toString()}
            >
              {years}y
            </button>
          ))}
        </div>
      </div>

      {selectedSkill && formData.level && (
        <div className="p-4 rounded-xl bg-white/[0.04] border border-elec-yellow/35">
          <Eyebrow>Preview</Eyebrow>
          <div className="mt-2 space-y-2">
            <p className="font-medium text-white text-sm">{selectedSkill}</p>
            <div className="flex items-center gap-2">
              <span
                className={cn(
                  'text-[10px] font-medium uppercase tracking-[0.15em]',
                  toneText[LEVEL_TONE[formData.level as SkillLevel]]
                )}
              >
                {getLevelInfo(formData.level as SkillLevel)?.label}
              </span>
              {formData.yearsExperience && (
                <span className="text-xs text-white">{formData.yearsExperience} years</span>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderFooter = (isEdit: boolean, onClose: () => void) => (
    <div className="flex gap-3">
      <button
        className="flex-1 h-11 rounded-xl border border-elec-yellow/35 text-white touch-manipulation disabled:opacity-60"
        onClick={() => {
          onClose();
          resetForm();
        }}
        disabled={isLoading}
      >
        Cancel
      </button>
      <button
        className="flex-1 h-11 rounded-xl bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold touch-manipulation disabled:bg-white/[0.08] disabled:text-white"
        onClick={isEdit ? handleEditSkill : handleAddSkill}
        disabled={(!isEdit && (!selectedCategory || !selectedSkill || !formData.level)) || isLoading}
      >
        {isLoading ? (isEdit ? 'Saving…' : 'Adding…') : isEdit ? 'Save changes' : 'Add skill'}
      </button>
    </div>
  );

  if (isFetching) return <SkillsSkeleton />;

  const totalYears = skills.reduce((sum, s) => sum + s.yearsExperience, 0);

  return (
    <div className="space-y-5">
      <ConfirmDeleteDialog
        open={deleteConfirm.open}
        onOpenChange={(open) => setDeleteConfirm({ ...deleteConfirm, open })}
        title="Delete skill?"
        description="This will permanently remove this skill from your Elec-ID profile. This action cannot be undone."
        onConfirm={handleDeleteSkill}
        isLoading={isLoading}
      />

      {/* Add */}
      <Sheet open={isAddSheetOpen} onOpenChange={setIsAddSheetOpen}>
        <SettingsSheetContent title="Add skill" className="bg-elec-dark flex flex-col">
          <div className="lg:hidden flex justify-center pt-3 pb-2">
            <div className="w-12 h-1.5 rounded-full bg-white/[0.15]" />
          </div>
          <div className="flex items-center justify-between px-5 pt-4 lg:pt-6 pb-4 border-b border-white/[0.06]">
            <h3 className="text-lg font-semibold text-white">Add skill</h3>
            <button
              onClick={() => {
                setIsAddSheetOpen(false);
                resetForm();
              }}
              className="h-11 w-11 -mr-2 rounded-full text-white hover:bg-white/[0.04] touch-manipulation text-xl leading-none"
              aria-label="Close"
            >
              ×
            </button>
          </div>
          <div className="flex-1 overflow-y-auto px-5 py-5">{renderFormContent(false)}</div>
          <div className="p-5 border-t border-white/[0.06]">
            {renderFooter(false, () => setIsAddSheetOpen(false))}
          </div>
        </SettingsSheetContent>
      </Sheet>

      {/* Edit */}
      <Sheet open={isEditSheetOpen} onOpenChange={setIsEditSheetOpen}>
        <SettingsSheetContent title="Edit skill" className="bg-elec-dark flex flex-col">
          <div className="lg:hidden flex justify-center pt-3 pb-2">
            <div className="w-12 h-1.5 rounded-full bg-white/[0.15]" />
          </div>
          <div className="flex items-center justify-between px-5 pt-4 lg:pt-6 pb-4 border-b border-white/[0.06]">
            <h3 className="text-lg font-semibold text-white">Edit skill</h3>
            <button
              onClick={() => {
                setIsEditSheetOpen(false);
                resetForm();
              }}
              className="h-11 w-11 -mr-2 rounded-full text-white hover:bg-white/[0.04] touch-manipulation text-xl leading-none"
              aria-label="Close"
            >
              ×
            </button>
          </div>
          <div className="flex-1 overflow-y-auto px-5 py-5">{renderFormContent(true)}</div>
          <div className="p-5 border-t border-white/[0.06]">
            {renderFooter(true, () => setIsEditSheetOpen(false))}
          </div>
        </SettingsSheetContent>
      </Sheet>

      <SectionHeader
        eyebrow="Expertise"
        title="Your skills"
        action="Add skill"
        onAction={() => setIsAddSheetOpen(true)}
      />

      {skills.length > 0 ? (
        <>
          <StatStrip
            columns={2}
            stats={[
              { value: skills.length, label: 'Total skills', accent: true },
              { value: totalYears, label: 'Combined years', tone: 'purple' },
            ]}
          />

          <div>
            <Eyebrow>Level distribution</Eyebrow>
            <div className="mt-2 grid grid-cols-2 sm:grid-cols-4 gap-px bg-white/[0.06] border border-elec-yellow/35 rounded-2xl overflow-hidden">
              {SKILL_LEVELS.map((level) => {
                const count = skills.filter((s) => s.level === level.value).length;
                const tone = LEVEL_TONE[level.value];
                return (
                  <div
                    key={level.value}
                    className="bg-white/[0.05] px-4 py-5 text-center"
                  >
                    <span
                      className={cn(
                        'text-[10px] font-medium uppercase tracking-[0.15em]',
                        toneText[tone]
                      )}
                    >
                      {level.label}
                    </span>
                    <div
                      className={cn(
                        'mt-3 text-3xl font-semibold tabular-nums',
                        count > 0
                          ? tone === 'yellow'
                            ? 'text-elec-yellow'
                            : `text-${tone}-400`
                          : 'text-white'
                      )}
                    >
                      {count}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="space-y-6">
            {Object.entries(UK_ELECTRICAL_SKILLS).map(([catKey, category]) => {
              const categorySkills = skills.filter((s) => s.category === catKey);
              if (categorySkills.length === 0) return null;

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
                      {categorySkills.length} skill{categorySkills.length !== 1 ? 's' : ''}
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    <AnimatePresence mode="popLayout">
                      {categorySkills.map((skill) => {
                        const levelInfo = getLevelInfo(skill.level);
                        return (
                          <motion.div
                            key={skill.id}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            className="bg-white/[0.05] rounded-2xl border border-elec-yellow/35 overflow-hidden"
                          >
                            <button
                              onClick={() => openEditSheet(skill)}
                              className="w-full p-4 text-left touch-manipulation hover:bg-white/[0.06] transition-colors"
                            >
                              <div className="flex items-start justify-between gap-3">
                                <div className="flex-1 min-w-0">
                                  <h5 className="font-semibold text-white text-sm truncate">
                                    {skill.skillName}
                                  </h5>
                                  <div className="flex items-center gap-3 mt-2 flex-wrap">
                                    <span
                                      className={cn(
                                        'text-[10px] font-medium uppercase tracking-[0.15em]',
                                        toneText[LEVEL_TONE[skill.level]]
                                      )}
                                    >
                                      {levelInfo?.label}
                                    </span>
                                    <span className="text-xs text-white">
                                      {skill.yearsExperience} year
                                      {skill.yearsExperience !== 1 ? 's' : ''}
                                    </span>
                                    {skill.isVerified && (
                                      <span className="text-[10px] font-medium uppercase tracking-[0.15em] text-emerald-400">
                                        Verified
                                      </span>
                                    )}
                                  </div>
                                </div>
                                <span aria-hidden className="text-sm text-elec-yellow shrink-0">
                                  →
                                </span>
                              </div>
                            </button>

                            <div className="flex items-center justify-between px-3 py-1 border-t border-white/[0.06]">
                              <button
                                onClick={() => openEditSheet(skill)}
                                className="h-11 px-3 text-xs text-white hover:bg-white/[0.04] rounded-lg touch-manipulation"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => setDeleteConfirm({ open: true, id: skill.id })}
                                className="h-11 px-3 text-xs text-red-400 hover:bg-red-500/10 rounded-lg touch-manipulation"
                              >
                                Remove
                              </button>
                            </div>
                          </motion.div>
                        );
                      })}
                    </AnimatePresence>
                  </div>
                </motion.div>
              );
            })}

            {skills.filter((s) => !Object.keys(UK_ELECTRICAL_SKILLS).includes(s.category)).length >
              0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-2"
              >
                <Eyebrow>Other skills</Eyebrow>
                <div className="space-y-1.5">
                  {skills
                    .filter((s) => !Object.keys(UK_ELECTRICAL_SKILLS).includes(s.category))
                    .map((skill) => {
                      const levelInfo = getLevelInfo(skill.level);
                      return (
                        <button
                          key={skill.id}
                          onClick={() => openEditSheet(skill)}
                          className="w-full p-4 rounded-2xl bg-white/[0.05] border border-elec-yellow/35 text-left touch-manipulation hover:bg-white/[0.06]"
                        >
                          <p className="font-medium text-white text-sm">{skill.skillName}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span
                              className={cn(
                                'text-[10px] font-medium uppercase tracking-[0.15em]',
                                toneText[LEVEL_TONE[skill.level]]
                              )}
                            >
                              {levelInfo?.label}
                            </span>
                            <span className="text-xs text-white">{skill.yearsExperience}y</span>
                          </div>
                        </button>
                      );
                    })}
                </div>
              </motion.div>
            )}
          </div>
        </>
      ) : (
        <EmptyState
          title="Showcase your expertise"
          description="Add your electrical skills to build a comprehensive profile that employers can trust."
          action="Add your first skill"
          onAction={() => setIsAddSheetOpen(true)}
        />
      )}
    </div>
  );
};

export default ElecIdSkills;
