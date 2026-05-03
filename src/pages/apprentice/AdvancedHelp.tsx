import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  PageFrame,
  PageHero,
  itemVariants,
} from '@/components/college/primitives';
import DailyAITipsTab from '@/components/apprentice/ojt/enhanced/DailyAITipsTab';
import HelpBotTab from '@/components/apprentice/ojt/enhanced/HelpBotTab';

export default function AdvancedHelp() {
  const navigate = useNavigate();

  return (
    <PageFrame className="px-4 sm:px-6 lg:px-8">
      <motion.div variants={itemVariants}>
        <Button
          variant="ghost"
          onClick={() => navigate('/apprentice')}
          className="text-white hover:text-white hover:bg-white/[0.05] active:bg-white/[0.08] -ml-2 h-11 touch-manipulation"
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          Back
        </Button>
      </motion.div>

      <motion.div variants={itemVariants}>
        <PageHero
          eyebrow="Apprentice · AI Study Centre"
          title="Ask Dave, your AI mentor"
          description="20-year veteran electrical mentor on tap. Get expert guidance on theory, exams, BS 7671 and the things you can't ask your supervisor twice."
          tone="yellow"
        />
      </motion.div>

      <motion.div variants={itemVariants}>
        <Tabs defaultValue="helpbot" className="w-full">
          <TabsList className="grid w-full grid-cols-2 h-11 bg-white/[0.04] border border-white/[0.08] rounded-2xl p-1">
            <TabsTrigger
              value="helpbot"
              className="text-[12.5px] font-medium data-[state=active]:bg-elec-yellow data-[state=active]:text-black h-9 rounded-xl touch-manipulation"
            >
              Ask Dave
            </TabsTrigger>
            <TabsTrigger
              value="tips"
              className="text-[12.5px] font-medium data-[state=active]:bg-elec-yellow data-[state=active]:text-black h-9 rounded-xl touch-manipulation"
            >
              Daily tips
            </TabsTrigger>
          </TabsList>

          <TabsContent
            value="helpbot"
            className="mt-5 sm:mt-6 rounded-2xl border border-white/[0.08] bg-[hsl(0_0%_10%)] overflow-hidden"
          >
            <HelpBotTab />
          </TabsContent>

          <TabsContent value="tips" className="mt-5 sm:mt-6">
            <DailyAITipsTab />
          </TabsContent>
        </Tabs>
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="rounded-2xl border border-elec-yellow/20 bg-gradient-to-br from-elec-yellow/[0.06] via-amber-500/[0.02] to-transparent px-5 py-4 sm:px-6 sm:py-5"
      >
        <div className="flex items-baseline gap-2 mb-2">
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-elec-yellow/80">
            Note
          </span>
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
            · Learning support, not replacement
          </span>
        </div>
        <p className="text-[12.5px] leading-relaxed text-white/70 max-w-3xl">
          These AI tools complement your apprenticeship training — they don't replace it. Always
          verify safety-critical information with your supervisor or the official BS 7671 / IET
          guidance.
        </p>
      </motion.div>
    </PageFrame>
  );
}
