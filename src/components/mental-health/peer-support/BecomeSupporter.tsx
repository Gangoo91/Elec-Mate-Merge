import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Heart, Award, CheckCircle, Loader2, ArrowLeft, Shield } from 'lucide-react';
import { peerSupporterService, supportTopics, TrainingLevel, trainingLevelLabels } from '@/services/peerSupportService';
import { useToast } from '@/hooks/use-toast';

interface BecomeSupporterProps {
  onSuccess: () => void;
  onBack: () => void;
}

const BecomeSupporter: React.FC<BecomeSupporterProps> = ({ onSuccess, onBack }) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [displayName, setDisplayName] = useState('');
  const [bio, setBio] = useState('');
  const [trainingLevel, setTrainingLevel] = useState<TrainingLevel>('peer');
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);

  const toggleTopic = (topic: string) => {
    setSelectedTopics(prev =>
      prev.includes(topic)
        ? prev.filter(t => t !== topic)
        : [...prev, topic]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!displayName.trim()) {
      toast({
        title: "Name required",
        description: "Please enter a display name",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      await peerSupporterService.register({
        display_name: displayName.trim(),
        bio: bio.trim() || undefined,
        training_level: trainingLevel,
        topics_comfortable_with: selectedTopics,
      });

      toast({
        title: "Welcome aboard!",
        description: "You're now registered as a Mental Health Mate. Toggle your availability when you're ready to help.",
      });

      onSuccess();
    } catch (error: unknown) {
      console.error('Registration error:', error);
      toast({
        title: "Registration failed",
        description: error instanceof Error ? error.message : "Please try again",
        variant: "destructive",
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
          <h2 className="text-xl font-bold text-white">Become a Mental Health Mate</h2>
          <p className="text-sm text-white/80">Help others by being there to listen</p>
        </div>
      </div>

      {/* Info Card */}
      <Card className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/30">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-purple-500/20">
              <Heart className="h-5 w-5 text-purple-400" />
            </div>
            <div className="space-y-1">
              <h4 className="font-medium text-white">What is a Mental Health Mate?</h4>
              <p className="text-sm text-white/80">
                Mental Health Mates are fellow tradespeople who volunteer their time to listen
                and chat with others who might be struggling. You don't need to be a professional -
                just someone who cares.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Registration Form */}
      <Card className="bg-white/[0.02] border-white/10">
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
              <p className="text-xs text-white/70">
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
              <p className="text-xs text-white/70">
                {bio.length}/300 characters
              </p>
            </div>

            {/* Training Level */}
            <div className="space-y-2">
              <Label>Your Experience</Label>
              <Select value={trainingLevel} onValueChange={(v) => setTrainingLevel(v as TrainingLevel)}>
                <SelectTrigger className="bg-white/5 border-white/20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="peer">
                    <div className="flex items-center gap-2">
                      <Award className="h-4 w-4 text-blue-400" />
                      <span>{trainingLevelLabels.peer}</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="trained">
                    <div className="flex items-center gap-2">
                      <Award className="h-4 w-4 text-green-400" />
                      <span>{trainingLevelLabels.trained}</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="mhfa_certified">
                    <div className="flex items-center gap-2">
                      <Award className="h-4 w-4 text-purple-400" />
                      <span>{trainingLevelLabels.mhfa_certified}</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-white/70">
                MHFA = Mental Health First Aid certification
              </p>
            </div>

            {/* Topics */}
            <div className="space-y-3">
              <Label>Topics you're comfortable discussing</Label>
              <p className="text-xs text-white/70">
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
                        ${isSelected
                          ? 'bg-purple-500/30 border-purple-500/50 text-purple-200'
                          : 'bg-white/5 border-white/20 text-white/80 hover:bg-white/10'
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

            {/* Guidelines Notice */}
            <Card className="bg-amber-500/10 border-amber-500/30">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <Shield className="h-5 w-5 text-amber-400 flex-shrink-0 mt-0.5" />
                  <div className="space-y-2 text-sm">
                    <p className="font-medium text-amber-300">Important Guidelines</p>
                    <ul className="text-white/80 space-y-1 list-disc list-inside">
                      <li>You're here to listen, not to give professional advice</li>
                      <li>If someone is in crisis, direct them to professional help</li>
                      <li>Keep conversations confidential</li>
                      <li>Look after your own wellbeing too</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Submit */}
            <Button
              type="submit"
              disabled={isSubmitting || !displayName.trim()}
              className="w-full bg-purple-500 hover:bg-purple-600 text-white shadow-lg shadow-purple-500/25"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Registering...
                </>
              ) : (
                <>
                  <Heart className="w-4 h-4 mr-2" />
                  Become a Mental Health Mate
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
