import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/hooks/use-toast";
import { 
  FileText, 
  Building, 
  Send,
  Shield,
  AlertCircle
} from "lucide-react";

interface TrainingRecord {
  id: string;
  name: string;
  provider: string;
  fundedBy?: string;
  completedDate: string;
  hasDocument: boolean;
}

interface RequestTrainingTransferDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  profileName: string;
  trainingRecords: TrainingRecord[];
}

export const RequestTrainingTransferDialog = ({ 
  open, 
  onOpenChange, 
  profileName,
  trainingRecords 
}: RequestTrainingTransferDialogProps) => {
  const [selectedRecords, setSelectedRecords] = useState<string[]>([]);
  const [employerEmail, setEmployerEmail] = useState("");
  const [message, setMessage] = useState(
    `Dear Former Employer,\n\nI am writing to request copies of training certificates completed during my employment with your company.\n\nUnder data protection regulations, I am entitled to copies of my personal training records.\n\nThank you for your assistance.`
  );

  const handleToggleRecord = (id: string) => {
    setSelectedRecords(prev => 
      prev.includes(id) ? prev.filter(r => r !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedRecords.length === trainingRecords.length) {
      setSelectedRecords([]);
    } else {
      setSelectedRecords(trainingRecords.map(r => r.id));
    }
  };

  const handleSendRequest = () => {
    if (selectedRecords.length === 0) {
      toast({
        title: "No Records Selected",
        description: "Please select at least one training record to request.",
        variant: "destructive",
      });
      return;
    }

    if (!employerEmail) {
      toast({
        title: "Email Required",
        description: "Please enter the employer's email address.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Request Sent",
      description: `Training transfer request sent to ${employerEmail} for ${selectedRecords.length} record(s).`,
    });

    setSelectedRecords([]);
    setEmployerEmail("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-elec-yellow" />
            Request Training Transfer
          </DialogTitle>
          <DialogDescription>
            Request training certificates from previous employers for {profileName}'s Elec-ID
          </DialogDescription>
        </DialogHeader>
        
        {/* Info Banner */}
        <Card className="bg-elec-yellow/5 border-elec-yellow/20">
          <CardContent className="p-3 flex items-start gap-3">
            <Shield className="h-5 w-5 text-elec-yellow flex-shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="font-medium text-foreground">Your Training, Your Records</p>
              <p className="text-muted-foreground mt-1">
                Under GDPR and data protection law, you have the right to request copies of 
                training records completed during your employment. These belong to you.
              </p>
            </div>
          </CardContent>
        </Card>
        
        <div className="space-y-4 py-4">
          {/* Training Records to Request */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Select Training Records to Request</Label>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleSelectAll}
                className="text-xs h-7"
              >
                {selectedRecords.length === trainingRecords.length ? "Deselect All" : "Select All"}
              </Button>
            </div>
            
            <div className="space-y-2 max-h-48 overflow-y-auto border border-border rounded-lg p-2">
              {trainingRecords.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-4">
                  No training records available to request
                </p>
              ) : (
                trainingRecords.map((record) => (
                  <div 
                    key={record.id}
                    className={`flex items-center gap-3 p-2 rounded-lg border transition-colors cursor-pointer ${
                      selectedRecords.includes(record.id) 
                        ? "border-elec-yellow bg-elec-yellow/5" 
                        : "border-border hover:border-elec-yellow/50"
                    }`}
                    onClick={() => handleToggleRecord(record.id)}
                  >
                    <Checkbox 
                      checked={selectedRecords.includes(record.id)}
                      onCheckedChange={() => handleToggleRecord(record.id)}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{record.name}</p>
                      <p className="text-xs text-muted-foreground flex items-center gap-2">
                        <Building className="h-3 w-3" />
                        {record.provider}
                        <span>•</span>
                        {new Date(record.completedDate).toLocaleDateString('en-GB', { 
                          month: 'short', 
                          year: 'numeric' 
                        })}
                      </p>
                    </div>
                    {!record.hasDocument && (
                      <AlertCircle className="h-4 w-4 text-warning flex-shrink-0" />
                    )}
                  </div>
                ))
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              <AlertCircle className="h-3 w-3 inline mr-1" />
              Records without certificates are marked with a warning icon
            </p>
          </div>
          
          {/* Employer Email */}
          <div className="space-y-2">
            <Label htmlFor="employerEmail">Former Employer Email *</Label>
            <Input
              id="employerEmail"
              type="email"
              placeholder="hr@formeremployer.com"
              value={employerEmail}
              onChange={(e) => setEmployerEmail(e.target.value)}
            />
          </div>
          
          {/* Request Message */}
          <div className="space-y-2">
            <Label htmlFor="message">Request Message</Label>
            <Textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={6}
            />
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSendRequest} className="gap-2">
            <Send className="h-4 w-4" />
            Send Request
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
