import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useEmployer } from "@/contexts/EmployerContext";
import { toast } from "@/hooks/use-toast";
import { Award, Plus } from "lucide-react";
import { useOptionalVoiceFormContext } from "@/contexts/VoiceFormContext";

const CERT_TYPES = [
  "18th Edition Wiring Regulations",
  "ECS Gold Card",
  "ECS Apprentice Card",
  "ECS Supervisor Card",
  "Part P Certification",
  "IPAF Licence",
  "First Aid at Work",
  "Asbestos Awareness",
  "PASMA",
  "SMSTS",
  "SSSTS",
  "CSCS Card",
  "Other",
];

const ISSUERS = [
  "City & Guilds",
  "JIB",
  "NICEIC",
  "IPAF",
  "St John Ambulance",
  "UKATA",
  "CITB",
  "PASMA",
  "Other",
];

interface AddCertificationDialogProps {
  trigger?: React.ReactNode;
  preselectedEmployeeId?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function AddCertificationDialog({ trigger, preselectedEmployeeId, open: controlledOpen, onOpenChange }: AddCertificationDialogProps) {
  const { addCertification, employees } = useEmployer();
  const [internalOpen, setInternalOpen] = useState(false);
  
  const open = controlledOpen ?? internalOpen;
  const setOpen = onOpenChange ?? setInternalOpen;
  const [formData, setFormData] = useState({
    employeeId: preselectedEmployeeId || "",
    name: "",
    issuer: "",
    certNumber: "",
    expiryDate: "",
  });

  // Voice form registration
  const voiceContext = useOptionalVoiceFormContext();
  
  useEffect(() => {
    if (!open || !voiceContext) return;
    
    voiceContext.registerForm({
      formId: 'add-certification',
      formName: 'Add Certification',
      fields: [
        { name: 'employee', label: 'Employee', type: 'text', required: true },
        { name: 'name', label: 'Certification Type', type: 'text', required: true },
        { name: 'issuer', label: 'Issuing Body', type: 'text', required: true },
        { name: 'certNumber', label: 'Certificate Number', type: 'text' },
        { name: 'expiryDate', label: 'Expiry Date', type: 'text', required: true },
      ],
      onFillField: (field, value) => {
        const strValue = String(value);
        switch (field) {
          case 'employee':
            const emp = employees.find(e => e.name.toLowerCase().includes(strValue.toLowerCase()));
            if (emp) setFormData(prev => ({ ...prev, employeeId: emp.id }));
            break;
          case 'name': setFormData(prev => ({ ...prev, name: strValue })); break;
          case 'issuer': setFormData(prev => ({ ...prev, issuer: strValue })); break;
          case 'certNumber': setFormData(prev => ({ ...prev, certNumber: strValue })); break;
          case 'expiryDate': setFormData(prev => ({ ...prev, expiryDate: strValue })); break;
        }
      },
      onSubmit: () => {
        const form = document.getElementById('certification-form') as HTMLFormElement;
        if (form) form.requestSubmit();
      },
      onCancel: () => setOpen(false),
    });
    
    return () => voiceContext.unregisterForm('add-certification');
  }, [open, voiceContext, employees]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.employeeId || !formData.name || !formData.issuer || !formData.expiryDate) {
      toast({
        title: "Missing Fields",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const employee = employees.find(e => e.id === formData.employeeId);
    if (!employee) return;

    addCertification({
      name: formData.name,
      employee: employee.name,
      employeeId: formData.employeeId,
      expiryDate: formData.expiryDate,
      issuer: formData.issuer,
      certNumber: formData.certNumber || `CERT-${Date.now()}`,
      status: "Active",
    });

    toast({
      title: "Certification Added",
      description: `${formData.name} has been added for ${employee.name}.`,
    });

    setFormData({
      employeeId: preselectedEmployeeId || "",
      name: "",
      issuer: "",
      certNumber: "",
      expiryDate: "",
    });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {trigger !== null && (
        <DialogTrigger asChild>
          {trigger || (
            <Button variant="outline" size="sm" className="touch-feedback">
              <Award className="h-4 w-4 mr-2" />
              Add Cert
            </Button>
          )}
        </DialogTrigger>
      )}
      <DialogContent className="max-w-[95vw] sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Award className="h-5 w-5 text-elec-yellow" />
            Add Certification
          </DialogTitle>
        </DialogHeader>
        <form id="certification-form" onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="employee">Employee *</Label>
            <Select 
              value={formData.employeeId} 
              onValueChange={(val) => setFormData(prev => ({ ...prev, employeeId: val }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select employee..." />
              </SelectTrigger>
              <SelectContent>
                {employees.filter(e => e.status !== 'Archived').map(emp => (
                  <SelectItem key={emp.id} value={emp.id}>{emp.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="certType">Certification Type *</Label>
            <Select 
              value={formData.name} 
              onValueChange={(val) => setFormData(prev => ({ ...prev, name: val }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select certification..." />
              </SelectTrigger>
              <SelectContent>
                {CERT_TYPES.map(cert => (
                  <SelectItem key={cert} value={cert}>{cert}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="issuer">Issuing Body *</Label>
              <Select 
                value={formData.issuer} 
                onValueChange={(val) => setFormData(prev => ({ ...prev, issuer: val }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select issuer..." />
                </SelectTrigger>
                <SelectContent>
                  {ISSUERS.map(issuer => (
                    <SelectItem key={issuer} value={issuer}>{issuer}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="certNumber">Certificate Number</Label>
              <Input
                id="certNumber"
                value={formData.certNumber}
                onChange={(e) => setFormData(prev => ({ ...prev, certNumber: e.target.value }))}
                placeholder="e.g. CG-18ED-2024-001"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="expiryDate">Expiry Date *</Label>
            <Input
              id="expiryDate"
              type="date"
              value={formData.expiryDate}
              onChange={(e) => setFormData(prev => ({ ...prev, expiryDate: e.target.value }))}
            />
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="button" variant="outline" className="flex-1" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" className="flex-1">
              Add Certification
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
