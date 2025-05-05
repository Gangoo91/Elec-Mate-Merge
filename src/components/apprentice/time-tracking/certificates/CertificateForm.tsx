
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Certificate } from "@/types/certificates";

interface CertificateFormProps {
  onSubmit: (certificate: Omit<Certificate, "id" | "fileUrl">) => void;
  isUploading: boolean;
}

const CertificateForm = ({ onSubmit, isUploading }: CertificateFormProps) => {
  const [name, setName] = useState("");
  const [issueDate, setIssueDate] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [issuedBy, setIssuedBy] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (name && issueDate && issuedBy) {
      onSubmit({
        name,
        issueDate,
        expiryDate,
        issuedBy
      });
      
      // Reset form
      setName("");
      setIssueDate("");
      setExpiryDate("");
      setIssuedBy("");
      setFile(null);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="certificate-name">Certificate Name</Label>
        <Input 
          id="certificate-name" 
          placeholder="E.g., Health and Safety Level 2" 
          required 
          className="bg-elec-dark"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="issue-date">Issue Date</Label>
          <Input 
            id="issue-date" 
            type="date" 
            required 
            className="bg-elec-dark"
            value={issueDate}
            onChange={(e) => setIssueDate(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="expiry-date">Expiry Date (Optional)</Label>
          <Input 
            id="expiry-date" 
            type="date" 
            className="bg-elec-dark"
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="issued-by">Issued By</Label>
        <Input 
          id="issued-by" 
          placeholder="E.g., City & Guilds, EAL" 
          required 
          className="bg-elec-dark"
          value={issuedBy}
          onChange={(e) => setIssuedBy(e.target.value)}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="certificate-file">Certificate File</Label>
        <Input 
          id="certificate-file" 
          type="file" 
          accept=".pdf,.jpg,.jpeg,.png" 
          required 
          className="bg-elec-dark"
          onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
        />
        <p className="text-xs text-muted-foreground">
          Accepted formats: PDF, JPG, PNG. Max size: 5MB
        </p>
      </div>
      
      <Button type="submit" className="w-full" disabled={isUploading}>
        {isUploading ? 'Uploading...' : 'Upload Certificate'}
      </Button>
    </form>
  );
};

export default CertificateForm;
