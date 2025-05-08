
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue, 
} from "@/components/ui/select";
import { DatePicker } from "./DatePicker";
import { Project } from "@/types/project";
import { toast } from "@/hooks/use-toast";
import { Checkbox } from "@/components/ui/checkbox";

type ProjectFormProps = {
  initialData?: Partial<Project>;
  onSubmit: (data: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onCancel: () => void;
};

export const ProjectForm = ({ initialData, onSubmit, onCancel }: ProjectFormProps) => {
  const [formData, setFormData] = useState<Partial<Project>>({
    name: initialData?.name || '',
    clientName: initialData?.clientName || '',
    clientContact: initialData?.clientContact || '',
    startDate: initialData?.startDate || new Date().toISOString().split('T')[0],
    dueDate: initialData?.dueDate || '',
    status: initialData?.status || 'planning',
    budget: initialData?.budget || 0,
    description: initialData?.description || '',
    materials: initialData?.materials || [],
    timeEntries: initialData?.timeEntries || [],
    notes: initialData?.notes || '',
    priority: initialData?.priority || 'medium',
    location: initialData?.location || '',
    certificateType: initialData?.certificateType || 'none',
    certificateIssued: initialData?.certificateIssued || false,
    invoiceIssued: initialData?.invoiceIssued || false,
    invoiceAmount: initialData?.invoiceAmount || 0,
    invoicePaid: initialData?.invoicePaid || false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: parseFloat(value) || 0 }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.clientName || !formData.startDate) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    
    onSubmit(formData as Omit<Project, 'id' | 'createdAt' | 'updatedAt'>);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Project Name *</Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Kitchen Rewire"
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="clientName">Client Name *</Label>
          <Input
            id="clientName"
            name="clientName"
            value={formData.clientName}
            onChange={handleChange}
            placeholder="John Smith"
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="clientContact">Client Contact</Label>
          <Input
            id="clientContact"
            name="clientContact"
            value={formData.clientContact}
            onChange={handleChange}
            placeholder="07700 900000"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="123 High Street, London"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="budget">Budget (£)</Label>
          <Input
            id="budget"
            name="budget"
            type="number"
            value={formData.budget}
            onChange={handleNumberChange}
            placeholder="1000"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="priority">Priority</Label>
          <Select 
            value={formData.priority} 
            onValueChange={(value) => 
              setFormData(prev => ({ 
                ...prev, 
                priority: value as Project['priority']
              }))
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="urgent">Urgent</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="startDate">Start Date *</Label>
          <DatePicker
            date={formData.startDate ? new Date(formData.startDate) : undefined}
            onSelect={(date) => 
              setFormData(prev => ({ 
                ...prev, 
                startDate: date ? date.toISOString().split('T')[0] : '' 
              }))
            }
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="dueDate">Due Date</Label>
          <DatePicker
            date={formData.dueDate ? new Date(formData.dueDate) : undefined}
            onSelect={(date) => 
              setFormData(prev => ({ 
                ...prev, 
                dueDate: date ? date.toISOString().split('T')[0] : '' 
              }))
            }
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <Select 
            value={formData.status} 
            onValueChange={(value) => 
              setFormData(prev => ({ 
                ...prev, 
                status: value as Project['status']
              }))
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="planning">Planning</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="on-hold">On Hold</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="certificateType">Certificate Type</Label>
          <Select 
            value={formData.certificateType} 
            onValueChange={(value) => 
              setFormData(prev => ({ 
                ...prev, 
                certificateType: value as Project['certificateType']
              }))
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select certificate type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">None Required</SelectItem>
              <SelectItem value="minor-works">Minor Works</SelectItem>
              <SelectItem value="eicr">EICR</SelectItem>
              <SelectItem value="installation">Installation Certificate</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="certificateIssued"
            checked={formData.certificateIssued}
            onCheckedChange={(checked) => 
              setFormData(prev => ({ 
                ...prev, 
                certificateIssued: !!checked
              }))
            }
          />
          <Label htmlFor="certificateIssued">Certificate Issued</Label>
        </div>
        
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="invoiceIssued"
            checked={formData.invoiceIssued}
            onCheckedChange={(checked) => 
              setFormData(prev => ({ 
                ...prev, 
                invoiceIssued: !!checked
              }))
            }
          />
          <Label htmlFor="invoiceIssued">Invoice Issued</Label>
        </div>
        
        {formData.invoiceIssued && (
          <>
            <div className="space-y-2">
              <Label htmlFor="invoiceAmount">Invoice Amount (£)</Label>
              <Input
                id="invoiceAmount"
                name="invoiceAmount"
                type="number"
                value={formData.invoiceAmount}
                onChange={handleNumberChange}
                placeholder="1200"
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="invoicePaid"
                checked={formData.invoicePaid}
                onCheckedChange={(checked) => 
                  setFormData(prev => ({ 
                    ...prev, 
                    invoicePaid: !!checked
                  }))
                }
              />
              <Label htmlFor="invoicePaid">Invoice Paid</Label>
            </div>
          </>
        )}
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Details of the electrical work required..."
          rows={3}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="notes">Notes</Label>
        <Textarea
          id="notes"
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          placeholder="Any additional notes..."
          rows={3}
        />
      </div>
      
      <div className="flex justify-end gap-2 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          {initialData?.id ? 'Update Project' : 'Create Project'}
        </Button>
      </div>
    </form>
  );
};
