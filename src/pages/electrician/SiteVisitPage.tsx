import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { ArrowLeft, ClipboardList } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SiteVisitWizard } from '@/components/site-visit/SiteVisitWizard';
import { useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

const SiteVisitPage = () => {
  const navigate = useNavigate();
  const [showExitDialog, setShowExitDialog] = useState(false);

  const handleBack = () => {
    setShowExitDialog(true);
  };

  const confirmExit = () => {
    navigate('/electrician/business');
  };

  const handleComplete = () => {
    navigate('/electrician/business');
  };

  const canonical = `${window.location.origin}/electrician/site-visit/new`;

  return (
    <motion.div
      className="min-h-screen bg-background pb-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <Helmet>
        <title>New Site Visit | Elec-Mate</title>
        <meta
          name="description"
          content="Capture room-by-room scope during a site visit with the Elec-Mate field capture tool."
        />
        <link rel="canonical" href={canonical} />
      </Helmet>

      {/* iOS-style Header */}
      <header className="sticky top-0 z-50 bg-white/[0.02] backdrop-blur-xl border-b border-white/[0.06]">
        <div className="flex items-center gap-3 px-4 h-14">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleBack}
            className="h-10 w-10 -ml-2 touch-manipulation active:scale-95 hover:bg-white/5"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="w-9 h-9 rounded-xl bg-emerald-500 flex items-center justify-center">
            <ClipboardList className="h-5 w-5 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-base font-semibold text-white truncate">New Site Visit</h1>
            <p className="text-[11px] text-white">Capture scope room-by-room</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 py-4">
        <SiteVisitWizard onComplete={handleComplete} />
      </main>

      {/* Exit Confirmation Dialog */}
      <AlertDialog open={showExitDialog} onOpenChange={setShowExitDialog}>
        <AlertDialogContent className="rounded-2xl">
          <AlertDialogHeader>
            <AlertDialogTitle>Leave site visit?</AlertDialogTitle>
            <AlertDialogDescription>
              Your progress is auto-saved locally and can be recovered later.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="rounded-xl">Keep Editing</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmExit}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90 rounded-xl"
            >
              Leave
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </motion.div>
  );
};

export default SiteVisitPage;
