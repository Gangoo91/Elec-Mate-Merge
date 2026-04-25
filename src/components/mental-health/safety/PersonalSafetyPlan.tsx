import { useState, useEffect } from 'react';
import {
  Shield,
  AlertTriangle,
  Heart,
  Users,
  Phone,
  Sparkles,
  Plus,
  X,
  ChevronLeft,
  ChevronRight,
  Edit2,
  Save,
  Trash2,
  CheckCircle,
  Star,
  MessageCircle,
  Home,
  Cloud,
  CloudOff,
  Download,
  Award,
} from 'lucide-react';
import { useSafetyPlan } from '@/hooks/useMentalHealthSync';
import { useAuth } from '@/contexts/AuthContext';
import {
  Eyebrow,
  PrimaryButton,
  SecondaryButton,
  IconButton,
  Field,
  FormCard,
  ListCard,
  ListRow,
  EmptyState,
  inputClass,
} from '@/components/college/primitives';

interface SafetyPlan {
  warning_signs: string[];
  coping_strategies: string[];
  distractions: string[];
  support_people: { name: string; phone: string }[];
  professionals: { name: string; phone: string; role: string }[];
  safe_environment: string[];
  reasons_for_living: string[];
}

const defaultPlan: SafetyPlan = {
  warning_signs: [],
  coping_strategies: [],
  distractions: [],
  support_people: [],
  professionals: [],
  safe_environment: [],
  reasons_for_living: [],
};

const sections = [
  {
    id: 'warning_signs',
    title: 'Warning signs',
    description: 'Thoughts, feelings, or situations that signal a crisis may be developing',
    icon: AlertTriangle,
    placeholder: 'e.g., Not sleeping well, feeling hopeless, isolating myself',
  },
  {
    id: 'coping_strategies',
    title: 'Coping strategies',
    description: 'Things I can do to help myself feel better',
    icon: Sparkles,
    placeholder: 'e.g., Go for a walk, listen to music, take deep breaths',
  },
  {
    id: 'distractions',
    title: 'Healthy distractions',
    description: 'Activities that help take my mind off difficult thoughts',
    icon: Star,
    placeholder: 'e.g., Watch a film, play games, exercise, cook',
  },
  {
    id: 'support_people',
    title: 'People I can reach out to',
    description: 'Friends or family who can help during difficult times',
    icon: Users,
    isContact: true,
  },
  {
    id: 'professionals',
    title: 'Professional support',
    description: 'Healthcare professionals or helplines I can contact',
    icon: Phone,
    isContact: true,
    hasRole: true,
  },
  {
    id: 'safe_environment',
    title: 'Making my environment safe',
    description: 'Steps to remove or limit access to things that could harm me',
    icon: Home,
    placeholder: 'e.g., Give medication to someone to hold, remove sharp objects',
  },
  {
    id: 'reasons_for_living',
    title: 'Reasons for living',
    description: 'What matters most to me and keeps me going',
    icon: Heart,
    placeholder: 'e.g., My family, my goals, my pets, seeing my niece grow up',
  },
];

const PersonalSafetyPlan = () => {
  const { user } = useAuth();
  const { plan: cloudPlan, savePlan: saveToCloud, isLoading } = useSafetyPlan();
  const [plan, setPlan] = useState<SafetyPlan>(defaultPlan);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [newItem, setNewItem] = useState('');
  const [newContact, setNewContact] = useState({ name: '', phone: '', role: '' });
  const [isEditing, setIsEditing] = useState(false);

  // Sync with cloud plan when available
  useEffect(() => {
    if (cloudPlan) {
      setPlan(cloudPlan);
    }
  }, [cloudPlan]);

  // Save plan to cloud/localStorage
  const savePlan = async (updatedPlan: SafetyPlan) => {
    setPlan(updatedPlan);
    await saveToCloud(updatedPlan);
  };

  const addItem = (sectionId: string) => {
    if (!newItem.trim()) return;
    const updated = {
      ...plan,
      [sectionId]: [...(plan[sectionId as keyof SafetyPlan] as string[]), newItem.trim()],
    };
    savePlan(updated);
    setNewItem('');
  };

  const removeItem = (sectionId: string, index: number) => {
    const items = [...(plan[sectionId as keyof SafetyPlan] as string[])];
    items.splice(index, 1);
    savePlan({ ...plan, [sectionId]: items });
  };

  const addContact = (sectionId: string, hasRole: boolean) => {
    if (!newContact.name.trim()) return;
    const contacts = [...(plan[sectionId as keyof SafetyPlan] as any[])];
    contacts.push(hasRole ? { ...newContact } : { name: newContact.name, phone: newContact.phone });
    savePlan({ ...plan, [sectionId]: contacts });
    setNewContact({ name: '', phone: '', role: '' });
  };

  const removeContact = (sectionId: string, index: number) => {
    const contacts = [...(plan[sectionId as keyof SafetyPlan] as any[])];
    contacts.splice(index, 1);
    savePlan({ ...plan, [sectionId]: contacts });
  };

  const getCompletionCount = () => {
    let filled = 0;
    if ((plan.warning_signs?.length || 0) > 0) filled++;
    if ((plan.coping_strategies?.length || 0) > 0) filled++;
    if ((plan.distractions?.length || 0) > 0) filled++;
    if ((plan.support_people?.length || 0) > 0) filled++;
    if ((plan.professionals?.length || 0) > 0) filled++;
    if ((plan.safe_environment?.length || 0) > 0) filled++;
    if ((plan.reasons_for_living?.length || 0) > 0) filled++;
    return filled;
  };

  const isComplete = getCompletionCount() === 7;

  const exportSafetyPlan = () => {
    const text = `PERSONAL SAFETY PLAN
Created: ${new Date().toLocaleDateString('en-GB')}

${'='.repeat(50)}

1. WARNING SIGNS
Thoughts, feelings, or situations that signal a crisis may be developing:
${plan.warning_signs.map((s) => `• ${s}`).join('\n')}

2. COPING STRATEGIES
Things I can do to help myself feel better:
${plan.coping_strategies.map((s) => `• ${s}`).join('\n')}

3. HEALTHY DISTRACTIONS
Activities that help take my mind off difficult thoughts:
${plan.distractions.map((s) => `• ${s}`).join('\n')}

4. PEOPLE I CAN REACH OUT TO
Friends or family who can help during difficult times:
${plan.support_people.map((c) => `• ${c.name}${c.phone ? ` - ${c.phone}` : ''}`).join('\n')}

5. PROFESSIONAL SUPPORT
Healthcare professionals or helplines I can contact:
${plan.professionals.map((c) => `• ${c.name}${c.role ? ` (${c.role})` : ''}${c.phone ? ` - ${c.phone}` : ''}`).join('\n')}

6. MAKING MY ENVIRONMENT SAFE
Steps to remove or limit access to things that could harm me:
${plan.safe_environment.map((s) => `• ${s}`).join('\n')}

7. REASONS FOR LIVING
What matters most to me and keeps me going:
${plan.reasons_for_living.map((s) => `• ${s}`).join('\n')}

${'='.repeat(50)}

EMERGENCY CONTACTS
• Emergency Services: 999
• Samaritans: 116 123 (24/7)
• Shout Crisis Text Line: Text SHOUT to 85258

This plan is a support tool, not a replacement for professional help.
Share this plan with someone you trust.
Review and update it regularly, especially when you're feeling well.
`;

    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `personal-safety-plan-${new Date().toISOString().split('T')[0]}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Section detail view
  if (activeSection) {
    const section = sections.find((s) => s.id === activeSection)!;
    const Icon = section.icon;
    const items = plan[activeSection as keyof SafetyPlan] || [];

    return (
      <div className="space-y-4 pb-24 sm:pb-4">
        {/* Sticky Header */}
        <div className="sticky top-0 z-40 bg-[hsl(0_0%_8%)]/95 backdrop-blur-xl border-b border-white/[0.06] -mx-4 px-4 py-3 mb-2">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setActiveSection(null)}
              className="inline-flex items-center gap-1 h-11 px-3 rounded-full text-[13px] font-medium text-white hover:bg-white/[0.06] transition-colors touch-manipulation"
            >
              <ChevronLeft className="h-5 w-5" />
              Back
            </button>
            <IconButton
              onClick={() => setIsEditing(!isEditing)}
              aria-label={isEditing ? 'Done editing' : 'Edit'}
              className={isEditing ? 'text-emerald-400' : ''}
            >
              {isEditing ? <CheckCircle className="h-5 w-5" /> : <Edit2 className="h-5 w-5" />}
            </IconButton>
          </div>
        </div>

        {/* Section Header */}
        <div className="text-center py-2">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[hsl(0_0%_12%)] border border-white/[0.08] mb-3">
            <Icon className="h-7 w-7 text-elec-yellow" />
          </div>
          <Eyebrow>Mental health</Eyebrow>
          <h2 className="mt-1.5 text-xl font-semibold text-white tracking-tight">
            {section.title}
          </h2>
          <p className="mt-1.5 text-[13px] text-white">{section.description}</p>
        </div>

        {/* Items List */}
        {section.isContact ? (
          // Contact list
          <div className="space-y-2">
            {(items as any[]).length > 0 && (
              <ListCard>
                {(items as any[]).map((contact, index) => (
                  <ListRow
                    key={index}
                    lead={
                      <div className="w-10 h-10 rounded-full bg-[hsl(0_0%_15%)] border border-white/[0.08] flex items-center justify-center">
                        <span className="text-white font-medium">
                          {contact.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    }
                    title={contact.name}
                    subtitle={
                      <div>
                        {contact.role && <div>{contact.role}</div>}
                        {contact.phone && (
                          <a
                            href={`tel:${contact.phone}`}
                            className="text-elec-yellow inline-flex items-center gap-1.5 mt-1 h-9 px-3 rounded-full bg-elec-yellow/15 border border-elec-yellow/25 text-[12.5px] font-semibold touch-manipulation"
                          >
                            <Phone className="h-3.5 w-3.5" />
                            {contact.phone}
                          </a>
                        )}
                      </div>
                    }
                    trailing={
                      isEditing ? (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            removeContact(activeSection, index);
                          }}
                          aria-label="Remove contact"
                          className="h-9 w-9 rounded-full text-red-400 hover:bg-red-500/10 flex items-center justify-center touch-manipulation"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      ) : undefined
                    }
                  />
                ))}
              </ListCard>
            )}

            {/* Add new contact */}
            {isEditing && (
              <FormCard eyebrow="Add contact">
                <Field label="Name">
                  <input
                    value={newContact.name}
                    onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
                    placeholder="Name"
                    className={inputClass}
                  />
                </Field>
                <Field label="Phone number">
                  <input
                    value={newContact.phone}
                    onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
                    placeholder="Phone number"
                    className={inputClass}
                  />
                </Field>
                {section.hasRole && (
                  <Field label="Role">
                    <input
                      value={newContact.role}
                      onChange={(e) => setNewContact({ ...newContact, role: e.target.value })}
                      placeholder="Role (e.g., GP, Therapist)"
                      className={inputClass}
                    />
                  </Field>
                )}
                <PrimaryButton
                  onClick={() => addContact(activeSection, !!section.hasRole)}
                  disabled={!newContact.name.trim()}
                  fullWidth
                >
                  <Plus className="h-5 w-5 mr-2" />
                  Add contact
                </PrimaryButton>
              </FormCard>
            )}

            {(items as any[]).length === 0 && !isEditing && (
              <EmptyState
                title="No contacts added yet"
                action="Add contact"
                onAction={() => setIsEditing(true)}
              />
            )}
          </div>
        ) : (
          // Regular items list
          <div className="space-y-2">
            {(items as string[]).length > 0 && (
              <ListCard>
                {(items as string[]).map((item, index) => (
                  <ListRow
                    key={index}
                    lead={<span className="w-2 h-2 rounded-full bg-elec-yellow" />}
                    title={<span className="text-[13px] text-white">{item}</span>}
                    trailing={
                      isEditing ? (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            removeItem(activeSection, index);
                          }}
                          aria-label="Remove item"
                          className="h-9 w-9 rounded-full text-red-400 hover:bg-red-500/10 flex items-center justify-center touch-manipulation"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      ) : undefined
                    }
                  />
                ))}
              </ListCard>
            )}

            {/* Add new item */}
            {isEditing && (
              <div className="flex gap-2">
                <input
                  value={newItem}
                  onChange={(e) => setNewItem(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && addItem(activeSection)}
                  placeholder={section.placeholder}
                  className={`${inputClass} flex-1`}
                />
                <button
                  onClick={() => addItem(activeSection)}
                  disabled={!newItem.trim()}
                  aria-label="Add item"
                  className="h-11 w-11 rounded-full bg-elec-yellow text-black flex items-center justify-center hover:bg-elec-yellow/90 active:scale-[0.98] disabled:opacity-40 transition-all touch-manipulation"
                >
                  <Plus className="h-5 w-5" />
                </button>
              </div>
            )}

            {(items as string[]).length === 0 && !isEditing && (
              <EmptyState
                title="No items added yet"
                action="Add item"
                onAction={() => setIsEditing(true)}
              />
            )}
          </div>
        )}

        {/* Sticky Save Button */}
        {isEditing && (
          <div className="fixed bottom-0 left-0 right-0 z-50 p-4 pb-6 bg-[hsl(0_0%_8%)]/95 backdrop-blur-xl border-t border-white/[0.06] sm:static sm:bg-transparent sm:border-none sm:p-0">
            <PrimaryButton onClick={() => setIsEditing(false)} fullWidth>
              <Save className="h-5 w-5 mr-2" />
              Done editing
            </PrimaryButton>
          </div>
        )}
      </div>
    );
  }

  // Main overview
  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="text-center py-2">
        <Eyebrow>Mental health</Eyebrow>
        <h2 className="mt-1.5 text-xl font-semibold text-white tracking-tight">
          Personal safety plan
        </h2>
        <p className="mt-1 text-[13px] text-white">Your personal guide for difficult moments</p>
      </div>

      {/* Cloud Sync Status */}
      <div className="flex items-center justify-center gap-2 text-[12px]">
        {user ? (
          <span className="flex items-center gap-1 text-emerald-400">
            <Cloud className="h-3 w-3" />
            Synced to cloud
          </span>
        ) : (
          <span className="flex items-center gap-1 text-white">
            <CloudOff className="h-3 w-3" />
            Local only — sign in to sync
          </span>
        )}
      </div>

      {/* Progress */}
      <FormCard>
        <div className="flex items-center justify-between">
          <Eyebrow>Plan completion</Eyebrow>
          <span className="text-[13px] font-medium text-white tabular-nums">
            {getCompletionCount()}/7 sections
          </span>
        </div>
        <div className="h-2 bg-[hsl(0_0%_9%)] border border-white/[0.08] rounded-full overflow-hidden">
          <div
            className="h-full bg-elec-yellow rounded-full transition-all"
            style={{ width: `${(getCompletionCount() / 7) * 100}%` }}
          />
        </div>
      </FormCard>

      {/* Completion Celebration */}
      {isComplete && (
        <FormCard className="border-emerald-500/30">
          <div className="flex items-start gap-3">
            <div className="w-12 h-12 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center flex-shrink-0">
              <Award className="h-6 w-6 text-emerald-400" />
            </div>
            <div className="flex-1">
              <Eyebrow className="text-emerald-400">Plan complete</Eyebrow>
              <h3 className="mt-1 text-lg font-semibold text-white">Well done</h3>
              <p className="mt-1 text-[13px] text-white leading-relaxed">
                Well done for completing your personal safety plan. This is an important step in
                taking care of your mental health.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-start gap-2 text-[13px]">
              <CheckCircle className="h-4 w-4 text-emerald-400 flex-shrink-0 mt-0.5" />
              <span className="text-white">Save a copy to share with someone you trust</span>
            </div>
            <div className="flex items-start gap-2 text-[13px]">
              <CheckCircle className="h-4 w-4 text-emerald-400 flex-shrink-0 mt-0.5" />
              <span className="text-white">Keep it accessible for when you need it</span>
            </div>
            <div className="flex items-start gap-2 text-[13px]">
              <CheckCircle className="h-4 w-4 text-emerald-400 flex-shrink-0 mt-0.5" />
              <span className="text-white">Review and update it regularly</span>
            </div>
          </div>

          <PrimaryButton onClick={exportSafetyPlan} fullWidth>
            <Download className="h-4 w-4 mr-2" />
            Download your plan
          </PrimaryButton>
          <p className="text-[11px] text-center text-white">
            Saves as a text file you can print, email, or share
          </p>
        </FormCard>
      )}

      {/* Important Note */}
      <div className="bg-[hsl(0_0%_12%)] border border-red-500/25 rounded-2xl p-5">
        <div className="flex items-start gap-3">
          <Phone className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
          <div>
            <Eyebrow className="text-red-400">In an emergency, call 999</Eyebrow>
            <p className="mt-2 text-[13px] text-white leading-relaxed">
              This plan is a support tool, not a replacement for professional help. If you're in
              immediate danger, please call emergency services.
            </p>
          </div>
        </div>
      </div>

      {/* Sections Grid */}
      <ListCard>
        {sections.map((section) => {
          const Icon = section.icon;
          const items = plan[section.id as keyof SafetyPlan];
          const itemCount = Array.isArray(items) ? items.length : 0;

          return (
            <ListRow
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              lead={
                <div className="w-10 h-10 rounded-xl bg-[hsl(0_0%_15%)] border border-white/[0.08] flex items-center justify-center">
                  <Icon className="h-5 w-5 text-elec-yellow" />
                </div>
              }
              title={
                <div className="flex items-center gap-2">
                  <span>{section.title}</span>
                  {itemCount > 0 && <CheckCircle className="h-4 w-4 text-emerald-400" />}
                </div>
              }
              subtitle={
                itemCount > 0
                  ? `${itemCount} item${itemCount !== 1 ? 's' : ''} added`
                  : 'Tap to add'
              }
              trailing={<ChevronRight className="h-5 w-5 text-white" />}
            />
          );
        })}
      </ListCard>

      {/* Helplines Quick Access */}
      <FormCard eyebrow="24/7 helplines">
        <div className="flex items-center gap-2 text-white">
          <MessageCircle className="h-4 w-4 text-elec-yellow" />
          <span className="text-[13px]">Reach a real person, anytime</span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <a
            href="tel:116123"
            className="inline-flex items-center gap-2 h-11 px-4 rounded-full bg-elec-yellow/15 text-elec-yellow border border-elec-yellow/25 text-[13px] font-semibold touch-manipulation"
          >
            <Phone className="h-4 w-4" />
            <span className="flex-1 min-w-0">
              <span className="block text-[12.5px] font-semibold text-white">Samaritans</span>
              <span className="block text-[11px] text-elec-yellow">116 123</span>
            </span>
          </a>
          <a
            href="sms:85258"
            className="inline-flex items-center gap-2 h-11 px-4 rounded-full bg-white/[0.06] text-white border border-white/[0.1] text-[13px] font-semibold touch-manipulation"
          >
            <MessageCircle className="h-4 w-4" />
            <span className="flex-1 min-w-0">
              <span className="block text-[12.5px] font-semibold text-white">Shout</span>
              <span className="block text-[11px] text-white">Text 85258</span>
            </span>
          </a>
        </div>
      </FormCard>

      {/* Tip */}
      <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl p-5">
        <Eyebrow>Tip</Eyebrow>
        <p className="mt-2 text-[13px] text-white leading-relaxed">
          Review and update your safety plan regularly, especially when you're feeling well. Share
          it with someone you trust.
        </p>
      </div>
    </div>
  );
};

export default PersonalSafetyPlan;
