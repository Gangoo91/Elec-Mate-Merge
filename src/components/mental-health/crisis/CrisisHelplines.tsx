
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Phone, Clock, Heart } from "lucide-react";

interface EmergencyContact {
  name: string;
  phone: string;
  hours: string;
  description: string;
  type: 'emergency' | 'crisis' | 'support' | 'specialty';
}

interface CrisisHelplinesProps {
  emergencyContacts: EmergencyContact[];
}

const CrisisHelplines = ({ emergencyContacts }: CrisisHelplinesProps) => {
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'emergency': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'crisis': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'support': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'specialty': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'emergency': return '🚨';
      case 'crisis': return '📞';
      case 'support': return '💬';
      case 'specialty': return '🏥';
      default: return '📱';
    }
  };

  return (
    <Card className="border-red-500/50 bg-red-500/10">
      <CardHeader>
        <CardTitle className="text-red-300 flex items-center gap-2">
          <Phone className="h-5 w-5" />
          Crisis Helplines & Emergency Support
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4">
          {emergencyContacts.map((contact, index) => (
            <div 
              key={index}
              className={`p-4 rounded-lg border transition-all hover:scale-[1.02] ${
                contact.type === 'emergency' 
                  ? 'border-red-500/30 bg-red-500/5 shadow-md' 
                  : 'border-gray-600/30 bg-gray-800/30'
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-lg">{getTypeIcon(contact.type)}</span>
                    <h4 className="font-semibold text-white">{contact.name}</h4>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{contact.description}</p>
                  
                  <div className="flex items-center gap-3 text-sm">
                    <div className="flex items-center gap-1 text-elec-yellow">
                      <Phone className="h-3 w-3" />
                      <span className="font-mono font-semibold">{contact.phone}</span>
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span>{contact.hours}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col items-end gap-2">
                  <Badge className={getTypeColor(contact.type)}>
                    {contact.type}
                  </Badge>
                  <Button 
                    size="sm"
                    className={contact.type === 'emergency' ? 'bg-red-600 hover:bg-red-700' : ''}
                    asChild
                  >
                    <a href={`tel:${contact.phone.replace(/\s/g, '')}`}>
                      <Phone className="h-3 w-3 mr-1" />
                      Call Now
                    </a>
                  </Button>
                </div>
              </div>
              
              {contact.type === 'emergency' && (
                <div className="mt-3 p-2 bg-red-500/10 rounded border-l-4 border-red-500">
                  <p className="text-xs text-red-200 flex items-center gap-1">
                    <Heart className="h-3 w-3" />
                    For immediate danger to life - call 999 first
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="mt-6 p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
          <h4 className="font-medium text-blue-300 mb-2">Text Support Options</h4>
          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Text SHOUT to 85258</span>
              <Badge className="bg-blue-500/20 text-blue-400">Free 24/7</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Crisis Text Line - trained volunteers</span>
              <Badge className="bg-green-500/20 text-green-400">Confidential</Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CrisisHelplines;
