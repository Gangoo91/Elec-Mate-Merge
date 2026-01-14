import { CheckCircle2, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface RegisteredUserGuideProps {
  showNiceic: boolean;
  showNapit: boolean;
}

export const RegisteredUserGuide = ({ showNiceic, showNapit }: RegisteredUserGuideProps) => {
  return (
    <Card className="mb-6 border-green-500/30 bg-green-500/5">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-green-400 text-base">
          <CheckCircle2 className="w-5 h-5" />
          Competent Person Scheme Member
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-muted-foreground">
          Submit your certificates through your scheme portal. They handle Building Control notification automatically.
        </p>

        <div className="flex flex-wrap gap-2">
          {showNiceic && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.open('https://www.niceiconline.com/login', '_blank')}
              className="min-h-[44px] touch-manipulation"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Open NICEIC Portal
            </Button>
          )}
          {showNapit && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.open('https://www.napitdirect.co.uk/login', '_blank')}
              className="min-h-[44px] touch-manipulation"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Open NAPIT Portal
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
