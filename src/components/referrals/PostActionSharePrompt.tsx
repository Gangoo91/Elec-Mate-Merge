/**
 * PostActionSharePrompt
 * Shows a contextual referral prompt after key actions (certificates, quotes, milestones).
 * Renders as an inline card with a share CTA.
 */

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Users } from 'lucide-react';
import ReferralShareSheet from './ReferralShareSheet';

type TriggerType = 'post_certificate' | 'post_quote' | 'milestone';

interface PostActionSharePromptProps {
  trigger: TriggerType;
  milestoneCount?: number;
  milestoneType?: string;
}

const MESSAGES: Record<TriggerType, { headline: string; subline: string; cta: string }> = {
  post_certificate: {
    headline: 'Cert done. Your mates are still on paper.',
    subline: 'Share Elec-Mate — free month for both of you.',
    cta: 'Share with a Mate',
  },
  post_quote: {
    headline: 'That quote got you the job.',
    subline: "Know a sparky still doing quotes on napkins? They'll get a free month.",
    cta: 'Refer a Mate',
  },
  milestone: {
    headline: 'Milestone unlocked!',
    subline: 'Share the love — invite your network.',
    cta: 'Share Now',
  },
};

const PostActionSharePrompt: React.FC<PostActionSharePromptProps> = ({
  trigger,
  milestoneCount,
  milestoneType,
}) => {
  const [shareSheetOpen, setShareSheetOpen] = useState(false);
  const config = MESSAGES[trigger];

  const headline =
    trigger === 'milestone' && milestoneCount && milestoneType
      ? `${milestoneCount} ${milestoneType} and counting!`
      : config.headline;

  return (
    <>
      <ReferralShareSheet
        open={shareSheetOpen}
        onOpenChange={setShareSheetOpen}
        headline={headline}
        subline={config.subline}
        context={trigger}
      />

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06]"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-elec-yellow/15 flex items-center justify-center flex-shrink-0">
            <Users className="h-5 w-5 text-elec-yellow" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white">{headline}</p>
            <p className="text-xs text-white mt-0.5">{config.subline}</p>
          </div>
          <Button
            onClick={() => setShareSheetOpen(true)}
            size="sm"
            className="bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold h-11 px-4 rounded-xl touch-manipulation active:scale-[0.97] flex-shrink-0"
          >
            {config.cta}
          </Button>
        </div>
      </motion.div>
    </>
  );
};

export default PostActionSharePrompt;
