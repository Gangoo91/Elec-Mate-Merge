import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MapPin, ExternalLink, Loader2 } from 'lucide-react';
import { useGoogleMaps } from '@/contexts/GoogleMapsContext';
import { useToast } from '@/hooks/use-toast';

interface GoogleMapsApiKeyInputProps {
  title?: string;
  description?: string;
}

export function GoogleMapsApiKeyInput({ 
  title = "Enable Map View",
  description = "Enter your Google Maps API key to enable the map."
}: GoogleMapsApiKeyInputProps) {
  const [tokenInput, setTokenInput] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const { setApiKey } = useGoogleMaps();
  const { toast } = useToast();

  const handleSave = async () => {
    if (tokenInput.trim()) {
      setIsSaving(true);
      try {
        await setApiKey(tokenInput.trim());
        toast({
          title: 'Saved',
          description: 'Google Maps API key has been saved',
        });
      } catch (error) {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Failed to save API key',
        });
      } finally {
        setIsSaving(false);
      }
    }
  };

  return (
    <Card className="bg-elec-gray border-border">
      <CardContent className="p-6 space-y-4">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 bg-elec-yellow/10 rounded-full flex items-center justify-center mx-auto">
            <MapPin className="h-6 w-6 text-elec-yellow" />
          </div>
          <h3 className="font-semibold text-lg">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
        
        <div className="space-y-3">
          <Input
            placeholder="AIza..."
            value={tokenInput}
            onChange={(e) => setTokenInput(e.target.value)}
            className="h-12"
          />
          <Button 
            className="w-full h-12" 
            onClick={handleSave}
            disabled={!tokenInput.trim() || isSaving}
          >
            {isSaving ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              'Save API Key'
            )}
          </Button>
        </div>
        
        <a 
          href="https://console.cloud.google.com/google/maps-apis" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 text-sm text-elec-yellow hover:underline"
        >
          Get a Google Maps API key
          <ExternalLink className="h-3 w-3" />
        </a>
      </CardContent>
    </Card>
  );
}