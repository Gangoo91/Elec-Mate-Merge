import { CheckCircle2, ExternalLink, Shield, Zap, Award, ArrowRight, Clock, BadgeCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { PORTAL_LINKS } from '@/utils/portalLinks';

interface RegisteredUserGuideProps {
  showNiceic: boolean;
  showNapit: boolean;
}

export const RegisteredUserGuide = ({ showNiceic, showNapit }: RegisteredUserGuideProps) => {
  return (
    <div className="space-y-4 mb-6">
      {/* Main Card */}
      <Card className="border-green-500/40 bg-gradient-to-br from-green-500/15 via-green-500/10 to-emerald-500/5 shadow-lg shadow-green-500/5">
        <CardContent className="pt-5 pb-6">
          {/* Header */}
          <div className="flex items-start gap-4 mb-6">
            <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl shadow-lg shadow-green-500/30">
              <Shield className="w-7 h-7 text-white" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-xl font-bold text-foreground">Scheme Member</h2>
                <div className="flex items-center gap-1 px-2 py-0.5 bg-green-500/20 rounded-full border border-green-500/30">
                  <BadgeCheck className="w-3 h-3 text-green-400" />
                  <span className="text-xs font-semibold text-green-400">Verified</span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                Self-certify and submit directly through your scheme portal
              </p>
            </div>
          </div>

          {/* Benefits */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="p-3 bg-green-500/10 rounded-xl border border-green-500/20 text-center">
              <CheckCircle2 className="w-5 h-5 text-green-400 mx-auto mb-1" />
              <p className="text-xs font-medium text-green-300">No Building Control fees</p>
            </div>
            <div className="p-3 bg-green-500/10 rounded-xl border border-green-500/20 text-center">
              <Clock className="w-5 h-5 text-green-400 mx-auto mb-1" />
              <p className="text-xs font-medium text-green-300">Submit within 30 days</p>
            </div>
          </div>

          {/* Portal Buttons */}
          <div className="space-y-3">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              Open Your Scheme Portal
            </p>

            {/* NICEIC Button */}
            {showNiceic && (
              <Button
                onClick={() => window.open(PORTAL_LINKS.niceic.url, '_blank')}
                className="w-full h-16 text-base font-bold bg-gradient-to-r from-yellow-500 via-amber-500 to-orange-500 hover:from-yellow-600 hover:via-amber-600 hover:to-orange-600 text-black border-0 touch-manipulation shadow-lg shadow-yellow-500/30 transition-all hover:shadow-xl hover:shadow-yellow-500/40 hover:scale-[1.02] active:scale-[0.98]"
                size="lg"
              >
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-black/10 rounded-xl flex items-center justify-center">
                      <Zap className="w-6 h-6" />
                    </div>
                    <div className="text-left">
                      <span className="block text-lg font-bold">NICEIC Online</span>
                      <span className="block text-xs font-medium opacity-70">Certification Portal</span>
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 opacity-60" />
                </div>
              </Button>
            )}

            {/* NAPIT Button */}
            {showNapit && (
              <Button
                onClick={() => window.open(PORTAL_LINKS.napit.url, '_blank')}
                className="w-full h-16 text-base font-bold bg-gradient-to-r from-blue-600 via-blue-600 to-indigo-600 hover:from-blue-700 hover:via-blue-700 hover:to-indigo-700 text-white border-0 touch-manipulation shadow-lg shadow-blue-500/30 transition-all hover:shadow-xl hover:shadow-blue-500/40 hover:scale-[1.02] active:scale-[0.98]"
                size="lg"
              >
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                      <Award className="w-6 h-6" />
                    </div>
                    <div className="text-left">
                      <span className="block text-lg font-bold">NAPIT Direct</span>
                      <span className="block text-xs font-medium opacity-70">Certification Portal</span>
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 opacity-60" />
                </div>
              </Button>
            )}

            {/* Show both if no specific scheme */}
            {!showNiceic && !showNapit && (
              <>
                <Button
                  onClick={() => window.open(PORTAL_LINKS.niceic.url, '_blank')}
                  className="w-full h-14 text-base font-bold bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 text-black border-0 touch-manipulation shadow-lg shadow-yellow-500/20"
                  size="lg"
                >
                  <Zap className="w-5 h-5 mr-2" />
                  Open NICEIC Portal
                  <ExternalLink className="w-4 h-4 ml-2 opacity-60" />
                </Button>
                <Button
                  onClick={() => window.open(PORTAL_LINKS.napit.url, '_blank')}
                  className="w-full h-14 text-base font-bold bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white border-0 touch-manipulation shadow-lg shadow-blue-500/20"
                  size="lg"
                >
                  <Award className="w-5 h-5 mr-2" />
                  Open NAPIT Portal
                  <ExternalLink className="w-4 h-4 ml-2 opacity-60" />
                </Button>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Scheme Badges */}
      {(showNiceic || showNapit) && (
        <div className="flex items-center justify-center gap-3">
          {showNiceic && (
            <div className="flex items-center gap-2 px-4 py-2 bg-yellow-500/10 rounded-full border border-yellow-500/30">
              <Zap className="w-4 h-4 text-yellow-400" />
              <span className="text-sm font-semibold text-yellow-300">NICEIC Registered</span>
            </div>
          )}
          {showNapit && (
            <div className="flex items-center gap-2 px-4 py-2 bg-blue-500/10 rounded-full border border-blue-500/30">
              <Award className="w-4 h-4 text-blue-400" />
              <span className="text-sm font-semibold text-blue-300">NAPIT Registered</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
