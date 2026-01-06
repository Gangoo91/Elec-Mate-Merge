import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import {
  Zap,
  GraduationCap,
  Wrench,
  Building2,
  ChevronRight,
  Sparkles,
  BookOpen,
  Calculator,
  FileCheck,
  Users,
  Bot,
  Clock,
  CheckCircle2
} from 'lucide-react';

interface WelcomeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const roleContent = {
  apprentice: {
    icon: GraduationCap,
    title: 'Welcome, Future Electrician!',
    subtitle: 'Your journey to becoming a qualified electrician starts here',
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/20',
    borderColor: 'border-blue-500/30',
    features: [
      { icon: BookOpen, text: '2,000+ Practice Questions', desc: 'Master your theory exams' },
      { icon: Calculator, text: '50+ Calculators', desc: 'Cable sizing, Zs, voltage drop & more' },
      { icon: FileCheck, text: 'AM2 Preparation', desc: 'Mock tests and practical guides' },
      { icon: Clock, text: 'OJT Tracking', desc: 'Log your on-the-job training hours' },
    ],
    cta: 'Start Learning',
    ctaPath: '/study-centre/apprentice',
  },
  electrician: {
    icon: Wrench,
    title: 'Welcome, Professional!',
    subtitle: 'Your toolkit for electrical excellence',
    color: 'text-elec-yellow',
    bgColor: 'bg-elec-yellow/20',
    borderColor: 'border-elec-yellow/30',
    features: [
      { icon: Bot, text: '8 AI Specialist Agents', desc: 'BS7671, solar, EV charging & more' },
      { icon: FileCheck, text: 'Inspection Suite', desc: 'EICR, EIC, Minor Works certificates' },
      { icon: Calculator, text: 'Pro Calculators', desc: 'All calculations at your fingertips' },
      { icon: Sparkles, text: 'RAMS Generator', desc: 'AI-powered risk assessments' },
    ],
    cta: 'Explore Tools',
    ctaPath: '/electrician',
  },
  employer: {
    icon: Building2,
    title: 'Welcome, Team Leader!',
    subtitle: 'Manage your electrical workforce with ease',
    color: 'text-purple-400',
    bgColor: 'bg-purple-500/20',
    borderColor: 'border-purple-500/30',
    features: [
      { icon: Users, text: 'Team GPS Tracking', desc: 'Real-time engineer locations' },
      { icon: FileCheck, text: 'Job Pack Management', desc: 'Assign and track jobs' },
      { icon: Clock, text: 'Timesheet System', desc: 'Automated time tracking' },
      { icon: Sparkles, text: 'Safety Hub', desc: 'Compliance documentation' },
    ],
    cta: 'Setup Team',
    ctaPath: '/employer',
  },
  visitor: {
    icon: Zap,
    title: 'Welcome to Elec-Mate!',
    subtitle: 'The all-in-one platform for electrical professionals',
    color: 'text-elec-yellow',
    bgColor: 'bg-elec-yellow/20',
    borderColor: 'border-elec-yellow/30',
    features: [
      { icon: BookOpen, text: 'Learning Resources', desc: 'Study materials and guides' },
      { icon: Calculator, text: 'Calculators', desc: 'Essential electrical calculations' },
      { icon: Bot, text: 'AI Assistant', desc: 'Get help with regulations' },
      { icon: Sparkles, text: 'Much More', desc: 'Explore all our features' },
    ],
    cta: 'Get Started',
    ctaPath: '/dashboard',
  },
};

const WelcomeModal = ({ isOpen, onClose }: WelcomeModalProps) => {
  const { profile, user, updateProfile } = useAuth();
  const navigate = useNavigate();
  const [isCompleting, setIsCompleting] = useState(false);

  const role = (profile?.role || 'visitor') as keyof typeof roleContent;
  const content = roleContent[role] || roleContent.visitor;
  const Icon = content.icon;

  const handleGetStarted = async () => {
    if (!user) return;

    setIsCompleting(true);
    try {
      await updateProfile(user.id, { onboarding_completed: true });
      onClose();
      navigate(content.ctaPath);
    } catch (error) {
      console.error('Error completing onboarding:', error);
      onClose();
    } finally {
      setIsCompleting(false);
    }
  };

  const handleSkip = async () => {
    if (!user) {
      onClose();
      return;
    }

    try {
      await updateProfile(user.id, { onboarding_completed: true });
    } catch (error) {
      console.error('Error skipping onboarding:', error);
    }
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleSkip}>
      <DialogContent className="max-w-md sm:max-w-lg p-0 gap-0 bg-neutral-900 border-white/10 overflow-hidden">
        {/* Header with gradient */}
        <div className={`relative px-6 pt-8 pb-6 ${content.bgColor}`}>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-neutral-900" />
          <div className="relative z-10 text-center">
            <div className={`inline-flex p-4 rounded-2xl ${content.bgColor} ${content.borderColor} border mb-4`}>
              <Icon className={`h-10 w-10 ${content.color}`} />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">{content.title}</h2>
            <p className="text-white/60">{content.subtitle}</p>
          </div>
        </div>

        {/* Features */}
        <div className="px-6 py-6 space-y-3">
          <p className="text-xs font-medium text-white/40 uppercase tracking-wider mb-4">
            What you get with your 7-day free trial
          </p>
          {content.features.map((feature, index) => {
            const FeatureIcon = feature.icon;
            return (
              <div
                key={index}
                className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/5 transition-colors hover:border-white/10"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className={`p-2 rounded-lg ${content.bgColor}`}>
                  <FeatureIcon className={`h-4 w-4 ${content.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-white text-sm">{feature.text}</p>
                  <p className="text-xs text-white/50">{feature.desc}</p>
                </div>
                <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0 mt-1" />
              </div>
            );
          })}
        </div>

        {/* Trial info */}
        <div className="px-6 py-3 bg-green-500/10 border-t border-b border-green-500/20">
          <div className="flex items-center justify-center gap-2 text-sm text-green-400">
            <Sparkles className="h-4 w-4" />
            <span>7-day free trial active - No credit card required</span>
          </div>
        </div>

        {/* Actions */}
        <div className="px-6 py-6 space-y-3">
          <Button
            onClick={handleGetStarted}
            disabled={isCompleting}
            className="w-full h-12 bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold text-base"
          >
            {isCompleting ? (
              'Setting up...'
            ) : (
              <>
                {content.cta}
                <ChevronRight className="ml-2 h-5 w-5" />
              </>
            )}
          </Button>
          <Button
            variant="ghost"
            onClick={handleSkip}
            className="w-full text-white/50 hover:text-white/70"
          >
            I'll explore on my own
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WelcomeModal;
