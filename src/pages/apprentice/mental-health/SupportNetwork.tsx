/**
 * SupportNetwork — editorial apprentice support network page.
 *
 * Newsletter signup + events + support groups + talk-to-someone + community
 * resources. Composes shared mental-health components.
 */

import { useState } from 'react';
import MentalHealthPageLayout from '@/components/mental-health/MentalHealthPageLayout';
import { Mail } from 'lucide-react';
import EventsList from '@/components/mental-health/support-network/EventsList';
import SupportGroups from '@/components/mental-health/support-network/SupportGroups';
import TalkToSomeone from '@/components/mental-health/support-network/TalkToSomeone';
import CommunityResourcesList from '@/components/mental-health/support-network/CommunityResourcesList';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import {
  Eyebrow,
} from '@/components/apprentice-hub/portfolio/PortfolioPrimitives';

const upcomingEvents = [
  {
    name: 'Apprentice Wellbeing Social',
    date: '18 May 2025',
    time: '18:30 - 20:30',
    location: 'The Training Center, 45 Industrial Way, London',
    url: 'https://www.electricalcareers.co.uk/events',
  },
  {
    name: 'Peer Support Group Meeting',
    date: '22 May 2025',
    time: '12:00 - 13:00',
    location: 'Online (Zoom)',
    url: 'https://andysmanclub.co.uk/find-a-club/',
  },
  {
    name: 'Mental Health First Aid Training',
    date: '1 June 2025',
    time: '09:00 - 17:00',
    location: 'Madison Training Hub, 22 Commerce Road, Birmingham',
    url: 'https://mhfaengland.org/book-a-course/',
  },
];

const supportGroups = [
  {
    name: 'First Year Apprentices',
    members: 24,
    meetings: 'Weekly',
    format: 'Hybrid (In-person & Online)',
    url: 'https://www.electricalcareers.co.uk/support-groups',
  },
  {
    name: 'Women in Electrical Trades',
    members: 18,
    meetings: 'Bi-weekly',
    format: 'Online',
    url: 'https://www.wes.org.uk/content/get-involved',
  },
  {
    name: 'Mature-Age Apprentices',
    members: 12,
    meetings: 'Monthly',
    format: 'In-person',
    url: 'https://www.electricalcareers.co.uk/mature-apprentices',
  },
];

const communityResources = [
  {
    title: 'Building Your Support Network',
    description: 'Strategies for creating connections with fellow apprentices',
    type: 'document' as const,
    url: 'https://www.mentalhealth.org.uk/publications/guide-investing-your-relationships',
  },
  {
    title: 'Mentorship Program Information',
    description: 'Learn about our industry mentorship opportunities',
    type: 'article' as const,
    url: 'https://www.electricalcareers.co.uk/mentoring',
  },
  {
    title: 'CALM - Campaign Against Living Miserably',
    description: 'Support specifically for men facing difficult times',
    type: 'website' as const,
    url: 'https://www.thecalmzone.net/',
  },
  {
    title: 'Electrical Industries Charity',
    description: 'Practical, emotional and financial support',
    type: 'website' as const,
    url: 'https://www.electricalcharity.org/',
  },
];

const SupportNetwork = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error('Please enter your email address');
      return;
    }
    setIsSubscribed(true);
    toast.success("You've subscribed to the apprentice newsletter!");
  };

  return (
    <MentalHealthPageLayout
      title="Apprentice support network"
      description="Connect with fellow apprentices in a supportive environment. Events, support groups, mentorship, and someone to talk to when you need it."
    >
      <div className="space-y-7 sm:space-y-8">
        {/* ── Newsletter ─────────────────────────────────────────── */}
        <div className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] p-4 sm:p-5 space-y-3">
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4 text-elec-yellow/85 flex-shrink-0" />
            <Eyebrow>Support network newsletter</Eyebrow>
          </div>
          <p className="text-[13px] text-white/85 leading-relaxed">
            Stay informed about upcoming events, support groups, and mental
            health resources specific to electrical apprentices.
          </p>
          {!isSubscribed ? (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
              <Input
                type="email"
                placeholder="Enter your email address"
                className="flex-grow h-11 bg-[hsl(0_0%_8%)] border border-white/[0.08] text-[13px] focus:border-elec-yellow/40 focus:ring-1 focus:ring-elec-yellow/20 placeholder:text-white/40"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button
                type="submit"
                className="inline-flex items-center justify-center h-11 px-5 rounded-md bg-elec-yellow text-black text-[13px] font-semibold hover:bg-elec-yellow/90 active:scale-[0.98] transition-all touch-manipulation"
              >
                Subscribe
              </button>
            </form>
          ) : (
            <div className="rounded-md border border-elec-yellow/25 bg-elec-yellow/[0.04] p-3 text-center">
              <p className="text-[13px] text-elec-yellow">
                You're subscribed. Updates will land in your inbox.
              </p>
            </div>
          )}
        </div>

        <EventsList events={upcomingEvents} />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="col-span-1 sm:col-span-2">
            <SupportGroups groups={supportGroups} />
          </div>
          <TalkToSomeone />
        </div>

        <CommunityResourcesList resources={communityResources} />
      </div>
    </MentalHealthPageLayout>
  );
};

export default SupportNetwork;
