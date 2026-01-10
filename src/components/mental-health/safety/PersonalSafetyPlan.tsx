
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  Share2,
  Award
} from "lucide-react";
import { useSafetyPlan } from "@/hooks/useMentalHealthSync";
import { useAuth } from "@/contexts/AuthContext";

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
  reasons_for_living: []
};

const sections = [
  {
    id: "warning_signs",
    title: "Warning Signs",
    description: "Thoughts, feelings, or situations that signal a crisis may be developing",
    icon: AlertTriangle,
    color: "amber",
    placeholder: "e.g., Not sleeping well, feeling hopeless, isolating myself"
  },
  {
    id: "coping_strategies",
    title: "Coping Strategies",
    description: "Things I can do to help myself feel better",
    icon: Sparkles,
    color: "purple",
    placeholder: "e.g., Go for a walk, listen to music, take deep breaths"
  },
  {
    id: "distractions",
    title: "Healthy Distractions",
    description: "Activities that help take my mind off difficult thoughts",
    icon: Star,
    color: "blue",
    placeholder: "e.g., Watch a film, play games, exercise, cook"
  },
  {
    id: "support_people",
    title: "People I Can Reach Out To",
    description: "Friends or family who can help during difficult times",
    icon: Users,
    color: "green",
    isContact: true
  },
  {
    id: "professionals",
    title: "Professional Support",
    description: "Healthcare professionals or helplines I can contact",
    icon: Phone,
    color: "cyan",
    isContact: true,
    hasRole: true
  },
  {
    id: "safe_environment",
    title: "Making My Environment Safe",
    description: "Steps to remove or limit access to things that could harm me",
    icon: Home,
    color: "rose",
    placeholder: "e.g., Give medication to someone to hold, remove sharp objects"
  },
  {
    id: "reasons_for_living",
    title: "Reasons for Living",
    description: "What matters most to me and keeps me going",
    icon: Heart,
    color: "red",
    placeholder: "e.g., My family, my goals, my pets, seeing my niece grow up"
  }
];

const getColorClasses = (color: string) => {
  const colors: Record<string, { bg: string; text: string; border: string }> = {
    amber: { bg: "bg-amber-500/20", text: "text-amber-400", border: "border-amber-500/20" },
    purple: { bg: "bg-purple-500/20", text: "text-purple-400", border: "border-purple-500/20" },
    blue: { bg: "bg-blue-500/20", text: "text-blue-400", border: "border-blue-500/20" },
    green: { bg: "bg-green-500/20", text: "text-green-400", border: "border-green-500/20" },
    cyan: { bg: "bg-cyan-500/20", text: "text-cyan-400", border: "border-cyan-500/20" },
    rose: { bg: "bg-rose-500/20", text: "text-rose-400", border: "border-rose-500/20" },
    red: { bg: "bg-red-500/20", text: "text-red-400", border: "border-red-500/20" }
  };
  return colors[color] || colors.blue;
};

const PersonalSafetyPlan = () => {
  const { user } = useAuth();
  const { plan: cloudPlan, savePlan: saveToCloud, isLoading } = useSafetyPlan();
  const [plan, setPlan] = useState<SafetyPlan>(defaultPlan);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [newItem, setNewItem] = useState("");
  const [newContact, setNewContact] = useState({ name: "", phone: "", role: "" });
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
    const updated = { ...plan, [sectionId]: [...(plan[sectionId as keyof SafetyPlan] as string[]), newItem.trim()] };
    savePlan(updated);
    setNewItem("");
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
    setNewContact({ name: "", phone: "", role: "" });
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
${plan.warning_signs.map(s => `• ${s}`).join('\n')}

2. COPING STRATEGIES
Things I can do to help myself feel better:
${plan.coping_strategies.map(s => `• ${s}`).join('\n')}

3. HEALTHY DISTRACTIONS
Activities that help take my mind off difficult thoughts:
${plan.distractions.map(s => `• ${s}`).join('\n')}

4. PEOPLE I CAN REACH OUT TO
Friends or family who can help during difficult times:
${plan.support_people.map(c => `• ${c.name}${c.phone ? ` - ${c.phone}` : ''}`).join('\n')}

5. PROFESSIONAL SUPPORT
Healthcare professionals or helplines I can contact:
${plan.professionals.map(c => `• ${c.name}${c.role ? ` (${c.role})` : ''}${c.phone ? ` - ${c.phone}` : ''}`).join('\n')}

6. MAKING MY ENVIRONMENT SAFE
Steps to remove or limit access to things that could harm me:
${plan.safe_environment.map(s => `• ${s}`).join('\n')}

7. REASONS FOR LIVING
What matters most to me and keeps me going:
${plan.reasons_for_living.map(s => `• ${s}`).join('\n')}

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
    const section = sections.find(s => s.id === activeSection)!;
    const colors = getColorClasses(section.color);
    const Icon = section.icon;
    const items = plan[activeSection as keyof SafetyPlan] || [];

    return (
      <div className="space-y-4 pb-24 sm:pb-4">
        {/* Sticky Header */}
        <div className="sticky top-0 z-40 bg-background/95 backdrop-blur-xl border-b border-white/10 -mx-4 px-4 py-3 mb-2">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={() => setActiveSection(null)}
              className="h-11 touch-manipulation active:scale-[0.98] transition-all"
            >
              <ChevronLeft className="h-5 w-5 mr-1" />
              Back
            </Button>
            <Button
              variant="ghost"
              onClick={() => setIsEditing(!isEditing)}
              className={`h-11 w-11 touch-manipulation active:scale-[0.98] transition-all ${isEditing ? "text-green-400" : ""}`}
            >
              {isEditing ? <CheckCircle className="h-5 w-5" /> : <Edit2 className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Section Header */}
        <div className="text-center py-2">
          <div className={`inline-flex items-center justify-center w-14 h-14 rounded-full ${colors.bg} mb-3`}>
            <Icon className={`h-7 w-7 ${colors.text}`} />
          </div>
          <h2 className="text-xl font-bold text-foreground">{section.title}</h2>
          <p className="text-sm text-white mt-1">{section.description}</p>
        </div>

        {/* Items List */}
        {section.isContact ? (
          // Contact list
          <div className="space-y-2">
            {(items as any[]).map((contact, index) => (
              <Card key={index} className={`${colors.border} bg-white/5`}>
                <CardContent className="p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full ${colors.bg} flex items-center justify-center`}>
                        <span className="text-foreground font-medium">
                          {contact.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <div className="font-medium text-foreground">{contact.name}</div>
                        {contact.role && (
                          <div className="text-xs text-white">{contact.role}</div>
                        )}
                        {contact.phone && (
                          <a
                            href={`tel:${contact.phone}`}
                            className={`text-sm ${colors.text}`}
                          >
                            {contact.phone}
                          </a>
                        )}
                      </div>
                    </div>
                    {isEditing && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeContact(activeSection, index)}
                        className="text-red-400 hover:text-red-300"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Add new contact */}
            {isEditing && (
              <Card className="border-dashed border-white/20 bg-white/5">
                <CardContent className="p-3 space-y-3">
                  <Input
                    value={newContact.name}
                    onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
                    placeholder="Name"
                    className="h-12 text-base touch-manipulation bg-white/5 border-white/10 focus:border-white/20 focus:ring-1 focus:ring-white/10 rounded-xl"
                  />
                  <Input
                    value={newContact.phone}
                    onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
                    placeholder="Phone number"
                    className="h-12 text-base touch-manipulation bg-white/5 border-white/10 focus:border-white/20 focus:ring-1 focus:ring-white/10 rounded-xl"
                  />
                  {section.hasRole && (
                    <Input
                      value={newContact.role}
                      onChange={(e) => setNewContact({ ...newContact, role: e.target.value })}
                      placeholder="Role (e.g., GP, Therapist)"
                      className="h-12 text-base touch-manipulation bg-white/5 border-white/10 focus:border-white/20 focus:ring-1 focus:ring-white/10 rounded-xl"
                    />
                  )}
                  <Button
                    className={`w-full h-12 ${colors.bg} ${colors.text} hover:opacity-80 touch-manipulation active:scale-95 transition-all font-medium`}
                    onClick={() => addContact(activeSection, !!section.hasRole)}
                    disabled={!newContact.name.trim()}
                  >
                    <Plus className="h-5 w-5 mr-2" />
                    Add Contact
                  </Button>
                </CardContent>
              </Card>
            )}

            {(items as any[]).length === 0 && !isEditing && (
              <Card className="border-white/10 bg-white/5">
                <CardContent className="text-center py-8">
                  <Users className="h-8 w-8 text-white mx-auto mb-2" />
                  <p className="text-sm text-white mb-3">No contacts added yet</p>
                  <Button size="sm" onClick={() => setIsEditing(true)}>
                    <Plus className="h-4 w-4 mr-1" />
                    Add Contact
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        ) : (
          // Regular items list
          <div className="space-y-2">
            {(items as string[]).map((item, index) => (
              <Card key={index} className={`${colors.border} bg-white/5`}>
                <CardContent className="p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${colors.text.replace("text-", "bg-")}`} />
                      <span className="text-sm text-foreground">{item}</span>
                    </div>
                    {isEditing && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeItem(activeSection, index)}
                        className="text-red-400 hover:text-red-300"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Add new item */}
            {isEditing && (
              <div className="flex gap-2">
                <Input
                  value={newItem}
                  onChange={(e) => setNewItem(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && addItem(activeSection)}
                  placeholder={section.placeholder}
                  className="flex-1 h-12 text-base touch-manipulation bg-white/5 border-white/10 focus:border-white/20 focus:ring-1 focus:ring-white/10 rounded-xl"
                />
                <Button
                  onClick={() => addItem(activeSection)}
                  disabled={!newItem.trim()}
                  className={`h-12 w-12 ${colors.bg} ${colors.text} touch-manipulation active:scale-95 transition-all`}
                >
                  <Plus className="h-5 w-5" />
                </Button>
              </div>
            )}

            {(items as string[]).length === 0 && !isEditing && (
              <Card className="border-white/10 bg-white/5">
                <CardContent className="text-center py-8">
                  <Icon className="h-8 w-8 text-white mx-auto mb-2" />
                  <p className="text-sm text-white mb-3">No items added yet</p>
                  <Button size="sm" onClick={() => setIsEditing(true)}>
                    <Plus className="h-4 w-4 mr-1" />
                    Add Item
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {/* Sticky Save Button */}
        {isEditing && (
          <div className="fixed bottom-0 left-0 right-0 z-50 p-4 pb-6 bg-background/95 backdrop-blur-xl border-t border-white/10 sm:static sm:bg-transparent sm:border-none sm:p-0">
            <Button
              className="w-full h-12 text-base bg-green-500 hover:bg-green-600 touch-manipulation active:scale-[0.98] transition-all"
              onClick={() => setIsEditing(false)}
            >
              <Save className="h-5 w-5 mr-2" />
              Done Editing
            </Button>
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
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-red-500/20 to-rose-500/20 mb-3">
          <Shield className="h-6 w-6 text-red-400" />
        </div>
        <h2 className="text-xl font-bold text-foreground mb-1">Personal Safety Plan</h2>
        <p className="text-sm text-white">
          Your personal guide for difficult moments
        </p>
      </div>

      {/* Cloud Sync Status */}
      <div className="flex items-center justify-center gap-2 text-xs">
        {user ? (
          <span className="flex items-center gap-1 text-green-400">
            <Cloud className="h-3 w-3" />
            Synced to cloud
          </span>
        ) : (
          <span className="flex items-center gap-1 text-white">
            <CloudOff className="h-3 w-3" />
            Local only - sign in to sync
          </span>
        )}
      </div>

      {/* Progress */}
      <Card className="border-white/10 bg-white/5">
        <CardContent className="p-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-white">Plan Completion</span>
            <span className="text-sm font-medium text-foreground">{getCompletionCount()}/7 sections</span>
          </div>
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-red-500 to-rose-500 rounded-full transition-all"
              style={{ width: `${(getCompletionCount() / 7) * 100}%` }}
            />
          </div>
        </CardContent>
      </Card>

      {/* Completion Celebration */}
      {isComplete && (
        <Card className="border-green-500/30 bg-gradient-to-br from-green-500/20 to-emerald-500/10 shadow-lg shadow-green-500/10">
          <CardContent className="p-4">
            <div className="flex items-start gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                <Award className="h-6 w-6 text-green-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-green-400 mb-1">Plan Complete! 🎉</h3>
                <p className="text-sm text-white/90 leading-relaxed">
                  Well done for completing your Personal Safety Plan. This is an important step in taking care of your mental health.
                </p>
              </div>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex items-start gap-2 text-sm">
                <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0 mt-0.5" />
                <span className="text-white/80">Save a copy to share with someone you trust</span>
              </div>
              <div className="flex items-start gap-2 text-sm">
                <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0 mt-0.5" />
                <span className="text-white/80">Keep it accessible for when you need it</span>
              </div>
              <div className="flex items-start gap-2 text-sm">
                <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0 mt-0.5" />
                <span className="text-white/80">Review and update it regularly</span>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-2">
              <Button
                onClick={exportSafetyPlan}
                className="w-full h-12 bg-green-500 hover:bg-green-600 text-white font-medium touch-manipulation active:scale-95 transition-all"
              >
                <Download className="h-4 w-4 mr-2" />
                Download Your Plan
              </Button>
              <p className="text-xs text-center text-white/60 mt-1">
                Saves as a text file you can print, email, or share
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Important Note */}
      <Card className="border-red-500/20 bg-gradient-to-br from-red-500/10 to-rose-500/5">
        <CardContent className="p-3">
          <div className="flex items-start gap-3">
            <Phone className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-foreground font-medium">In an emergency, call 999</p>
              <p className="text-xs text-white mt-1">
                This plan is a support tool, not a replacement for professional help.
                If you're in immediate danger, please call emergency services.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sections Grid */}
      <div className="space-y-2">
        {sections.map((section) => {
          const colors = getColorClasses(section.color);
          const Icon = section.icon;
          const items = plan[section.id as keyof SafetyPlan];
          const itemCount = Array.isArray(items) ? items.length : 0;

          return (
            <Card
              key={section.id}
              className={`${colors.border} cursor-pointer touch-manipulation active:scale-[0.99] transition-transform`}
              onClick={() => setActiveSection(section.id)}
            >
              <CardContent className="p-3">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl ${colors.bg} flex items-center justify-center flex-shrink-0`}>
                    <Icon className={`h-5 w-5 ${colors.text}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium text-foreground text-sm">{section.title}</h3>
                      {itemCount > 0 && (
                        <CheckCircle className="h-4 w-4 text-green-400" />
                      )}
                    </div>
                    <p className="text-xs text-white line-clamp-1">
                      {itemCount > 0
                        ? `${itemCount} item${itemCount !== 1 ? "s" : ""} added`
                        : "Tap to add"}
                    </p>
                  </div>
                  <ChevronLeft className="h-5 w-5 text-white rotate-180" />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Helplines Quick Access */}
      <Card className="border-cyan-500/20 bg-gradient-to-br from-cyan-500/10 to-blue-500/5">
        <CardContent className="p-4">
          <h3 className="text-sm font-medium text-foreground mb-3 flex items-center gap-2">
            <MessageCircle className="h-4 w-4 text-cyan-400" />
            24/7 Helplines
          </h3>
          <div className="grid grid-cols-2 gap-2">
            <a
              href="tel:116123"
              className="flex items-center gap-2 p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
            >
              <Phone className="h-4 w-4 text-green-400" />
              <div>
                <div className="text-xs font-medium text-foreground">Samaritans</div>
                <div className="text-xs text-cyan-400">116 123</div>
              </div>
            </a>
            <a
              href="sms:85258"
              className="flex items-center gap-2 p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
            >
              <MessageCircle className="h-4 w-4 text-blue-400" />
              <div>
                <div className="text-xs font-medium text-foreground">Shout</div>
                <div className="text-xs text-cyan-400">Text 85258</div>
              </div>
            </a>
          </div>
        </CardContent>
      </Card>

      {/* Tip */}
      <Card className="border-purple-500/20 bg-gradient-to-br from-purple-500/10 to-indigo-500/5">
        <CardContent className="p-4">
          <p className="text-sm text-purple-200">
            <strong className="text-purple-400">Tip:</strong> Review and update your safety plan
            regularly, especially when you're feeling well. Share it with someone you trust.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default PersonalSafetyPlan;
