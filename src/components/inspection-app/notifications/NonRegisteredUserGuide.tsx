import { AlertTriangle, MapPin, ExternalLink, FileText, CheckCircle, Search, ClipboardCheck, Lightbulb, ArrowRight, Building2, Clock, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface NonRegisteredUserGuideProps {
  onFindBuildingControl: () => void;
}

export const NonRegisteredUserGuide = ({ onFindBuildingControl }: NonRegisteredUserGuideProps) => {
  // Open Planning Portal council finder - official tool for finding building control
  const openCouncilFinder = () => {
    window.open('https://www.planningportal.co.uk/applications/building-control-applications/building-control/find-your-LABC/', '_blank');
  };

  return (
    <div className="space-y-4 mb-6">
      {/* Header Card */}
      <Card className="border-amber-500/40 bg-gradient-to-br from-amber-500/15 via-amber-500/10 to-orange-500/5 shadow-lg shadow-amber-500/5">
        <CardContent className="pt-5 pb-6">
          {/* Header */}
          <div className="flex items-start gap-4 mb-5">
            <div className="p-3 bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl shadow-lg shadow-amber-500/30">
              <AlertTriangle className="w-7 h-7 text-black" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-foreground">Building Control Required</h2>
              <p className="text-sm text-muted-foreground mt-1">
                Not registered with NICEIC/NAPIT? Submit directly to your local authority.
              </p>
            </div>
          </div>

          {/* Key Info Pills */}
          <div className="flex flex-wrap gap-2 mb-5">
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-500/20 rounded-full border border-amber-500/30">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-xs font-medium text-amber-300">30 days to submit</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-500/20 rounded-full border border-amber-500/30">
              <Info className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-xs font-medium text-amber-300">Fee varies by council</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-500/20 rounded-full border border-amber-500/30">
              <Building2 className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-xs font-medium text-amber-300">Inspection required</span>
            </div>
          </div>

          {/* Process Timeline - Compact aligned version */}
          <div className="relative mb-5">
            {/* Vertical line connector */}
            <div className="absolute left-[19px] top-5 bottom-5 w-0.5 bg-gradient-to-b from-amber-500/60 via-amber-500/40 to-green-500/60" />

            <div className="space-y-3">
              {/* Step 1 */}
              <div className="flex items-center gap-3 relative">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/30 z-10 flex-shrink-0">
                  <Search className="w-5 h-5 text-black" />
                </div>
                <div className="flex-1 flex items-center gap-3">
                  <span className="text-xs font-bold text-amber-400 whitespace-nowrap">STEP 1</span>
                  <span className="font-semibold text-foreground">Find Your Local Authority</span>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex items-center gap-3 relative">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500/80 to-amber-600/80 flex items-center justify-center shadow-lg shadow-amber-500/20 z-10 flex-shrink-0">
                  <FileText className="w-5 h-5 text-black" />
                </div>
                <div className="flex-1 flex items-center gap-3">
                  <span className="text-xs font-bold text-amber-400 whitespace-nowrap">STEP 2</span>
                  <span className="font-semibold text-foreground">Submit Building Notice</span>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex items-center gap-3 relative">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500/60 to-amber-600/60 flex items-center justify-center shadow-lg shadow-amber-500/10 z-10 flex-shrink-0">
                  <ClipboardCheck className="w-5 h-5 text-black" />
                </div>
                <div className="flex-1 flex items-center gap-3">
                  <span className="text-xs font-bold text-amber-400 whitespace-nowrap">STEP 3</span>
                  <span className="font-semibold text-foreground">Provide Your Certificate</span>
                </div>
              </div>

              {/* Step 4 */}
              <div className="flex items-center gap-3 relative">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-green-500/30 z-10 flex-shrink-0">
                  <CheckCircle className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 flex items-center gap-3">
                  <span className="text-xs font-bold text-green-400 whitespace-nowrap">DONE</span>
                  <span className="font-semibold text-foreground">Inspection & Approval</span>
                </div>
              </div>
            </div>
          </div>

          {/* Primary CTA - Direct to Planning Portal finder */}
          <Button
            onClick={openCouncilFinder}
            className="w-full h-14 text-base font-bold bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-black touch-manipulation shadow-lg shadow-amber-500/30 transition-all hover:shadow-xl hover:shadow-amber-500/40 hover:scale-[1.02] active:scale-[0.98]"
            size="lg"
          >
            <MapPin className="w-5 h-5 mr-2" />
            Find Your Local Council
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
          <p className="text-xs text-center text-muted-foreground mt-2">
            Opens Planning Portal council finder
          </p>
        </CardContent>
      </Card>

      {/* Secondary Card - Resources */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Gov.uk Find Council */}
        <a
          href="https://www.gov.uk/find-local-council"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 p-4 bg-card/80 rounded-2xl border border-border/50 hover:bg-card hover:border-primary/30 transition-all touch-manipulation group"
        >
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
            <Building2 className="w-5 h-5 text-primary" />
          </div>
          <div className="flex-1">
            <p className="font-semibold text-sm">Gov.uk Council Finder</p>
            <p className="text-xs text-muted-foreground">Find by postcode</p>
          </div>
          <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
        </a>

        {/* Gov.uk Building Regs */}
        <a
          href="https://www.gov.uk/building-regulations-approval"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 p-4 bg-card/80 rounded-2xl border border-border/50 hover:bg-card hover:border-primary/30 transition-all touch-manipulation group"
        >
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
            <FileText className="w-5 h-5 text-primary" />
          </div>
          <div className="flex-1">
            <p className="font-semibold text-sm">Building Regs Guide</p>
            <p className="text-xs text-muted-foreground">Official Gov.uk guidance</p>
          </div>
          <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
        </a>
      </div>

      {/* Pro Tip Card */}
      <Card className="border-blue-500/30 bg-gradient-to-r from-blue-500/10 to-indigo-500/10">
        <CardContent className="py-4">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-blue-500/20 rounded-xl">
              <Lightbulb className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <p className="font-semibold text-sm text-blue-300 mb-1">Save Money on Future Jobs</p>
              <p className="text-xs text-blue-300/80 leading-relaxed">
                Join <span className="font-semibold text-yellow-400">NICEIC</span> or <span className="font-semibold text-blue-400">NAPIT</span> to self-certify work and skip Building Control fees entirely. Membership pays for itself after just a few notifiable jobs.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
