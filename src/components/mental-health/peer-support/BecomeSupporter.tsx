import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Heart, Award, CheckCircle, Loader2, ArrowLeft, Shield } from 'lucide-react';
import {
  PeerSupporter,
  peerSupporterService,
  supportTopics,
  TrainingLevel,
  trainingLevelLabels,
} from '@/services/peerSupportService';
import { useToast } from '@/hooks/use-toast';

interface BecomeSupporterProps {
  onSuccess: () => void;
  onBack: () => void;
  /** When set, the form edits this existing profile instead of registering. */
  existing?: PeerSupporter;
}

const BecomeSupporter: React.FC<BecomeSupporterProps> = ({ onSuccess, onBack, existing }) => {
  const { toast } = useToast();
  const isEditing = !!existing;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [displayName, setDisplayName] = useState(existing?.display_name ?? '');
  const [bio, setBio] = useState(existing?.bio ?? '');
  const [trainingLevel, setTrainingLevel] = useState<TrainingLevel>(
    existing?.training_level ?? 'peer'
  );
  const [selectedTopics, setSelectedTopics] = useState<string[]>(
    existing?.topics_comfortable_with ?? []
  );
  // Editors already agreed to the ground rules when they signed up.
  const [agreedToGuidelines, setAgreedToGuidelines] = useState(isEditing);

  const toggleTopic = (topic: string) => {
    setSelectedTopics((prev) =>
      prev.includes(topic) ? prev.filter((t) => t !== topic) : [...prev, topic]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!displayName.trim()) {
      toast({
        title: 'Name required',
        description: 'Please enter a display name',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      if (isEditing) {
        await peerSupporterService.updateProfile({
          display_name: displayName.trim(),
          bio: bio.trim() || undefined,
          training_level: trainingLevel,
          topics_comfortable_with: selectedTopics,
        });
        toast({
          title: 'Profile updated',
          description: 'Your changes are live for anyone looking for support.',
        });
      } else {
        await peerSupporterService.register({
          display_name: displayName.trim(),
          bio: bio.trim() || undefined,
          training_level: trainingLevel,
          topics_comfortable_with: selectedTopics,
        });
        toast({
          title: 'Welcome aboard!',
          description:
            "You're now registered as a Mental Health Mate. Toggle your availability when you're ready to help.",
        });
      }

      onSuccess();
    } catch (error: unknown) {
      console.error('Registration error:', error);
      toast({
        title: 'Registration failed',
        description: error instanceof Error ? error.message : 'Please try again',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h2 className="text-xl font-bold text-white">
            {isEditing ? 'Edit your profile' : 'Become a Mental Health Mate'}
          </h2>
          <p className="text-sm text-white">
            {isEditing
              ? 'Update what people see when they look for support'
              : 'Help others by being there to listen'}
          </p>
        </div>
      </div>

      {/* Info Card */}
      <Card className="bg-[hsl(0_0%_12%)] border-white/[0.06]">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-rose-500/10 border border-rose-500/25">
              <Heart className="h-5 w-5 text-white/85" />
            </div>
            <div className="space-y-1">
              <h4 className="font-medium text-white">What is a Mental Health Mate?</h4>
              <p className="text-sm text-white">
                Mental Health Mates are fellow tradespeople who volunteer their time to listen and
                chat with others who might be struggling. You don't need to be a professional - just
                someone who cares.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Registration Form */}
      <Card className="bg-[hsl(0_0%_12%)] border-white/10">
        <CardHeader>
          <CardTitle className="text-lg">Your Profile</CardTitle>
          <CardDescription>
            This information will be visible to people looking for support
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Display Name */}
            <div className="space-y-2">
              <Label htmlFor="displayName">Display Name *</Label>
              <Input
                id="displayName"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="How you'd like to be known (e.g., Sarah T.)"
                className="bg-white/5 border-white/20"
                maxLength={50}
              />
              <p className="text-xs text-white">
                Use your first name or a nickname - whatever you're comfortable with
              </p>
            </div>

            {/* Bio */}
            <div className="space-y-2">
              <Label htmlFor="bio">A bit about you (optional)</Label>
              <Textarea
                id="bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Share a bit about yourself and why you want to help..."
                className="bg-white/5 border-white/20 min-h-[100px]"
                maxLength={300}
              />
              <p className="text-xs text-white">{bio.length}/300 characters</p>
            </div>

            {/* Training Level */}
            <div className="space-y-2">
              <Label>Your Experience</Label>
              <Select
                value={trainingLevel}
                onValueChange={(v) => setTrainingLevel(v as TrainingLevel)}
              >
                <SelectTrigger className="bg-white/5 border-white/20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="peer">
                    <div className="flex items-center gap-2">
                      <Award className="h-4 w-4 text-white/85" />
                      <span>{trainingLevelLabels.peer}</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="trained">
                    <div className="flex items-center gap-2">
                      <Award className="h-4 w-4 text-white/85" />
                      <span>{trainingLevelLabels.trained}</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="mhfa_certified">
                    <div className="flex items-center gap-2">
                      <Award className="h-4 w-4 text-white/85" />
                      <span>{trainingLevelLabels.mhfa_certified}</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-white">MHFA = Mental Health First Aid certification</p>
            </div>

            {/* Topics */}
            <div className="space-y-3">
              <Label>Topics you're comfortable discussing</Label>
              <p className="text-xs text-white">
                Select any topics you feel able to chat about (optional)
              </p>
              <div className="flex flex-wrap gap-2">
                {supportTopics.map((topic) => {
                  const isSelected = selectedTopics.includes(topic);
                  return (
                    <button
                      key={topic}
                      type="button"
                      onClick={() => toggleTopic(topic)}
                      className={`
                        px-3 py-1.5 rounded-full text-sm border transition-all
                        ${
                          isSelected
                            ? 'bg-elec-yellow/15 border-elec-yellow/40 text-elec-yellow'
                            : 'bg-white/5 border-white/20 text-white hover:bg-white/10'
                        }
                      `}
                    >
                      {isSelected && <CheckCircle className="w-3.5 h-3.5 inline mr-1.5" />}
                      {topic}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Ground rules — must be read and agreed before joining */}
            <Card className="bg-[hsl(0_0%_12%)] border-white/[0.08]">
              <CardContent className="p-4 space-y-3">
                <div className="flex items-start gap-3">
                  <Shield className="h-5 w-5 text-elec-yellow flex-shrink-0 mt-0.5" />
                  <div className="space-y-2 text-sm">
                    <p className="font-semibold text-white">The ground rules</p>
                    <ul className="text-white/85 space-y-1.5 list-disc list-inside leading-relaxed">
                      <li>
                        You're a mate who listens — not a counsellor. Never diagnose or give
                        professional advice.
                      </li>
                      <li>
                        If someone talks about suicide or self-harm: stay calm, take it seriously,
                        and point them to Samaritans (116 123) or 999. The chat shows these options
                        to you both when things get heavy — use them.
                      </li>
                      <li>What's shared in a chat stays in the chat.</li>
                      <li>
                        Look after yourself too — go unavailable whenever you need to, and end a
                        chat that's too much for you. That's the right call, not a failure.
                      </li>
                      <li>Abuse or unsafe behaviour can be reported and will be reviewed.</li>
                    </ul>
                  </div>
                </div>
                {!isEditing && (
                  <label className="flex items-start gap-3 pt-1 cursor-pointer touch-manipulation">
                    <input
                      type="checkbox"
                      checked={agreedToGuidelines}
                      onChange={(e) => setAgreedToGuidelines(e.target.checked)}
                      className="mt-0.5 h-5 w-5 rounded border-white/40 bg-transparent accent-[#eab308]"
                    />
                    <span className="text-[13px] text-white leading-snug">
                      I've read the ground rules and understand I'm offering a listening ear, not
                      professional support.
                    </span>
                  </label>
                )}
              </CardContent>
            </Card>

            {/* Submit */}
            <Button
              type="submit"
              disabled={isSubmitting || !displayName.trim() || !agreedToGuidelines}
              className="w-full h-11 bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold touch-manipulation disabled:opacity-40"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  {isEditing ? 'Saving...' : 'Registering...'}
                </>
              ) : (
                <>
                  <Heart className="w-4 h-4 mr-2" />
                  {isEditing ? 'Save changes' : 'Become a Mental Health Mate'}
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default BecomeSupporter;
