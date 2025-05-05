
import { Phone } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface EmergencyContact {
  name: string;
  phone: string;
  hours: string;
  description: string;
}

interface CrisisHelplinesProps {
  emergencyContacts: EmergencyContact[];
}

const CrisisHelplines = ({ emergencyContacts }: CrisisHelplinesProps) => {
  const handleCopyNumber = (phone: string) => {
    navigator.clipboard.writeText(phone);
    toast.success("Phone number copied to clipboard");
  };

  return (
    <div>
      <h3 className="text-lg font-medium mb-3 flex items-center gap-2">
        <Phone className="h-5 w-5 text-red-500" />
        Crisis Helplines
      </h3>
      <div className="space-y-3">
        {emergencyContacts.map((contact, index) => (
          <Card 
            key={index}
            className="border-red-500/20 hover:border-red-500/40 transition-colors shadow-sm hover:shadow-md"
          >
            <CardContent className="p-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-red-500 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-base">{contact.name}</h4>
                    <p className="text-lg font-bold text-red-500">{contact.phone}</p>
                    <p className="text-xs text-muted-foreground">Hours: {contact.hours}</p>
                    <p className="text-sm mt-1">{contact.description}</p>
                  </div>
                </div>
                <Button 
                  className="bg-red-500 hover:bg-red-600 text-white flex items-center gap-2 w-full sm:w-auto"
                  onClick={() => handleCopyNumber(contact.phone)}
                >
                  <Phone className="h-4 w-4" /> Copy Number
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CrisisHelplines;
