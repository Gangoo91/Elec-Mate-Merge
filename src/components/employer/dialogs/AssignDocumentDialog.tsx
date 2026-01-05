import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useIsMobile } from "@/hooks/use-mobile";
import { useEmployer, type Employee } from "@/contexts/EmployerContext";
import { toast } from "@/hooks/use-toast";
import { FileText, Calendar, Check, AlertTriangle, Shield, ClipboardList, FileCheck } from "lucide-react";

const DOCUMENT_TYPES = [
  { id: "rams", label: "RAMS", description: "Risk Assessment & Method Statement", icon: Shield },
  { id: "tbt", label: "Toolbox Talk", description: "Safety briefing document", icon: ClipboardList },
  { id: "method_statement", label: "Method Statement", description: "Work procedure document", icon: FileText },
  { id: "site_induction", label: "Site Induction", description: "Site-specific safety induction", icon: AlertTriangle },
  { id: "permit_to_work", label: "Permit to Work", description: "Hot works, confined spaces, etc.", icon: FileCheck },
  { id: "coshh", label: "COSHH Assessment", description: "Hazardous substances assessment", icon: AlertTriangle },
];

interface AssignDocumentDialogProps {
  employee: Employee | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AssignDocumentDialog({ employee, open, onOpenChange }: AssignDocumentDialogProps) {
  const isMobile = useIsMobile();
  const { assignDocument } = useEmployer();
  const [selectedDocType, setSelectedDocType] = useState<string | null>(null);
  const [documentName, setDocumentName] = useState("");
  const [dueDate, setDueDate] = useState(
    new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  );
  const [notes, setNotes] = useState("");

  if (!employee) return null;

  const handleAssign = () => {
    if (!selectedDocType) {
      toast({
        title: "Select Document Type",
        description: "Please select a document type to assign.",
        variant: "destructive",
      });
      return;
    }

    const docType = DOCUMENT_TYPES.find(d => d.id === selectedDocType);
    
    assignDocument(
      employee.id,
      selectedDocType,
      documentName || docType?.label || selectedDocType,
      dueDate
    );

    toast({
      title: "Document Assigned",
      description: `${documentName || docType?.label} has been assigned to ${employee.name}.`,
    });

    // Reset and close
    setSelectedDocType(null);
    setDocumentName("");
    setNotes("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={isMobile ? "max-w-[95vw] max-h-[90vh] p-4" : "sm:max-w-lg max-h-[85vh]"}>
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-warning via-warning to-warning/50 rounded-t-lg" />
        
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-warning" />
            Assign Document
          </DialogTitle>
        </DialogHeader>

        <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
          <div className="w-10 h-10 rounded-full bg-elec-yellow/20 flex items-center justify-center font-bold text-elec-yellow flex-shrink-0">
            {employee.avatar}
          </div>
          <div className="min-w-0">
            <p className="font-medium truncate">{employee.name}</p>
            <p className="text-sm text-muted-foreground">{employee.role}</p>
          </div>
        </div>

        <div className="space-y-4">
          {/* Document Type Selection */}
          <div className="space-y-2">
            <Label>Document Type *</Label>
            <ScrollArea className={isMobile ? "h-[180px]" : "h-[200px]"}>
              <div className="space-y-2 pr-2">
                {DOCUMENT_TYPES.map((doc) => {
                  const IconComponent = doc.icon;
                  return (
                    <Card 
                      key={doc.id}
                      className={`cursor-pointer transition-all ${
                        selectedDocType === doc.id 
                          ? 'border-warning bg-warning/5 ring-1 ring-warning' 
                          : 'hover:border-border/80'
                      }`}
                      onClick={() => setSelectedDocType(doc.id)}
                    >
                      <CardContent className="p-3">
                        <div className="flex items-start gap-3">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                            selectedDocType === doc.id ? 'bg-warning/20' : 'bg-muted'
                          }`}>
                            <IconComponent className={`h-4 w-4 ${
                              selectedDocType === doc.id ? 'text-warning' : 'text-muted-foreground'
                            }`} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <p className="font-medium text-sm">{doc.label}</p>
                              {selectedDocType === doc.id && (
                                <Check className="h-4 w-4 text-warning flex-shrink-0" />
                              )}
                            </div>
                            <p className="text-xs text-muted-foreground">{doc.description}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </ScrollArea>
          </div>

          {/* Document Name (optional) */}
          <div className="space-y-2">
            <Label htmlFor="docName">Document Name (optional)</Label>
            <Input
              id="docName"
              placeholder="E.g., 'Site A RAMS' or leave blank for default"
              value={documentName}
              onChange={(e) => setDocumentName(e.target.value)}
            />
          </div>

          {/* Due Date */}
          <div className="space-y-2">
            <Label htmlFor="dueDate">Due Date *</Label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="dueDate"
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes">Notes (optional)</Label>
            <Textarea
              id="notes"
              placeholder="Add any notes about this document assignment..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={2}
            />
          </div>
        </div>

        <div className="flex gap-2 pt-2">
          <Button variant="outline" className="flex-1" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button 
            className="flex-1" 
            onClick={handleAssign}
            disabled={!selectedDocType}
          >
            Assign Document
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
