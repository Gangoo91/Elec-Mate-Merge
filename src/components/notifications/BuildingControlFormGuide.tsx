import { FileText, Download, CheckCircle2, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export const BuildingControlFormGuide = () => {
  return (
    <Card className="bg-card/50 border-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-primary" />
          What to Submit to Building Control
        </CardTitle>
        <CardDescription>
          Required documentation alongside your electrical certificates
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Competent Person Scheme Alert */}
        <Alert className="border-green-500/20 bg-green-500/10">
          <CheckCircle2 className="h-4 w-4 text-green-400 flex-shrink-0" />
          <AlertDescription className="text-green-400 text-sm">
            <strong>Competent Person Scheme Members:</strong> If you're registered with NICEIC or NAPIT,
            they handle Building Control notifications automatically when you submit certificates through their portals.
          </AlertDescription>
        </Alert>

        {/* Direct Submission Requirements */}
        <div className="space-y-3">
          <h4 className="font-semibold text-sm flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-amber-400" />
            Direct Building Control Submission (Non-Scheme Members)
          </h4>
          
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>If submitting directly to your local authority, you'll typically need:</p>
            
            <div className="space-y-2 pl-4">
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                <div>
                  <strong className="text-foreground">Building Notice Application</strong> - Submit before work begins
                  (or at completion if emergency work)
                </div>
              </div>
              
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                <div>
                  <strong className="text-foreground">Electrical Installation Certificate (EIC)</strong> - For new circuits or consumer unit changes
                </div>
              </div>
              
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                <div>
                  <strong className="text-foreground">Minor Electrical Installation Works Certificate (MEIWC)</strong> - For additions/alterations to existing circuits
                </div>
              </div>
              
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                <div>
                  <strong className="text-foreground">Supplementary Electrical Form</strong> - Additional details (required by some local authorities)
                </div>
              </div>
              
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                <div>
                  <strong className="text-foreground">Building Control Fee</strong> - Varies by local authority and work scope
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Important Notes */}
        <Alert className="border-amber-500/20 bg-amber-500/10">
          <AlertCircle className="h-4 w-4 text-amber-400 flex-shrink-0" />
          <AlertDescription className="text-amber-400 text-xs">
            <strong>Important:</strong> Requirements vary by local authority. Contact your Building Control office
            for their specific forms and fee structure. The Building Control Finder above can help you locate their contact details.
          </AlertDescription>
        </Alert>

        {/* Helpful Links */}
        <div className="pt-2 border-t border-border">
          <p className="text-xs text-muted-foreground mb-2">Helpful Resources:</p>
          <div className="space-y-1">
            <a
              href="https://www.labc.co.uk/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs text-primary hover:text-primary/80 transition-colors"
            >
              <Download className="w-3 h-3" />
              LABC - Find Local Authority Forms
            </a>
            <a
              href="https://www.gov.uk/building-regulations-approval"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs text-primary hover:text-primary/80 transition-colors"
            >
              <Download className="w-3 h-3" />
              Gov.uk - Building Regulations Guidance
            </a>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};