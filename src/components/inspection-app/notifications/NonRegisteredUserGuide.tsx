import { AlertTriangle, MapPin, ExternalLink, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface NonRegisteredUserGuideProps {
  onFindBuildingControl: () => void;
}

export const NonRegisteredUserGuide = ({ onFindBuildingControl }: NonRegisteredUserGuideProps) => {
  return (
    <Card className="mb-6 border-amber-500/30 bg-amber-500/5">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-amber-400">
          <AlertTriangle className="w-5 h-5" />
          Not Registered with a Scheme?
        </CardTitle>
        <CardDescription>
          You must notify Building Control directly for notifiable electrical work
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Step-by-step workflow */}
        <div className="space-y-3">
          <h4 className="font-semibold text-sm">How to Submit to Building Control:</h4>

          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center flex-shrink-0">
              <span className="text-xs font-bold text-amber-400">1</span>
            </div>
            <div>
              <p className="font-medium text-sm">Find Your Local Authority</p>
              <p className="text-xs text-muted-foreground">Use your postcode to find your council's Building Control office</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center flex-shrink-0">
              <span className="text-xs font-bold text-amber-400">2</span>
            </div>
            <div>
              <p className="font-medium text-sm">Submit a Building Notice</p>
              <p className="text-xs text-muted-foreground">Apply before work begins (fee typically £100-£300)</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center flex-shrink-0">
              <span className="text-xs font-bold text-amber-400">3</span>
            </div>
            <div>
              <p className="font-medium text-sm">Provide Your Certificate</p>
              <p className="text-xs text-muted-foreground">Submit your EIC or Minor Works certificate upon completion</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center flex-shrink-0">
              <span className="text-xs font-bold text-amber-400">4</span>
            </div>
            <div>
              <p className="font-medium text-sm">Building Control Inspection</p>
              <p className="text-xs text-muted-foreground">An inspector will verify compliance with BS 7671</p>
            </div>
          </div>
        </div>

        {/* Quick action button */}
        <Button
          onClick={onFindBuildingControl}
          className="w-full sm:w-auto mt-4 min-h-[44px] touch-manipulation"
        >
          <MapPin className="w-4 h-4 mr-2" />
          Find Your Local Building Control Office
        </Button>

        {/* Helpful links */}
        <div className="pt-4 border-t border-border">
          <p className="text-xs text-muted-foreground mb-2">Helpful Resources:</p>
          <div className="flex flex-wrap gap-3">
            <a
              href="https://www.labc.co.uk/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-primary hover:underline flex items-center gap-1 min-h-[44px] py-2 touch-manipulation"
            >
              <ExternalLink className="w-3 h-3" />
              LABC - Local Authority Building Control
            </a>
            <a
              href="https://www.gov.uk/building-regulations-approval"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-primary hover:underline flex items-center gap-1 min-h-[44px] py-2 touch-manipulation"
            >
              <ExternalLink className="w-3 h-3" />
              Gov.uk Building Regulations Guide
            </a>
          </div>
        </div>

        {/* Consider joining a scheme */}
        <Alert className="border-blue-500/20 bg-blue-500/10">
          <Info className="h-4 w-4 text-blue-400 flex-shrink-0" />
          <AlertDescription className="text-blue-400 text-xs">
            <strong>Tip:</strong> Consider joining NICEIC or NAPIT. Scheme members can self-certify work,
            avoiding Building Control fees and inspections for each job.
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  );
};
