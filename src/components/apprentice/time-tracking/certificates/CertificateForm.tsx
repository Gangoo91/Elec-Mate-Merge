import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Certificate } from '@/types/certificates';

interface CertificateFormProps {
  onSubmit: (certificate: Omit<Certificate, 'id' | 'fileUrl'>) => void;
  isUploading: boolean;
}

const CertificateForm = ({ onSubmit, isUploading }: CertificateFormProps) => {
  const [name, setName] = useState('');
  const [issueDate, setIssueDate] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [issuedBy, setIssuedBy] = useState('');
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (name && issueDate && issuedBy) {
      onSubmit({
        name,
        issueDate,
        expiryDate,
        issuedBy,
      });

      // Reset form
      setName('');
      setIssueDate('');
      setExpiryDate('');
      setIssuedBy('');
      setFile(null);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="certificate-name" className="text-[13px] text-white/85">
          Certificate name
        </Label>
        <Input
          id="certificate-name"
          placeholder="E.g., Health and Safety Level 2"
          required
          className="h-11 text-base touch-manipulation border-white/30 focus:border-yellow-500 focus:ring-yellow-500"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="issue-date" className="text-[13px] text-white/85">
            Issue date
          </Label>
          <Input
            id="issue-date"
            type="date"
            required
            className="h-11 text-base touch-manipulation border-white/30 focus:border-yellow-500 focus:ring-yellow-500"
            value={issueDate}
            onChange={(e) => setIssueDate(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="expiry-date" className="text-[13px] text-white/85">
            Expiry date (optional)
          </Label>
          <Input
            id="expiry-date"
            type="date"
            className="h-11 text-base touch-manipulation border-white/30 focus:border-yellow-500 focus:ring-yellow-500"
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="issued-by" className="text-[13px] text-white/85">
          Issued by
        </Label>
        <Input
          id="issued-by"
          placeholder="E.g., City & Guilds, EAL"
          required
          className="h-11 text-base touch-manipulation border-white/30 focus:border-yellow-500 focus:ring-yellow-500"
          value={issuedBy}
          onChange={(e) => setIssuedBy(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="certificate-file" className="text-[13px] text-white/85">
          Certificate file
        </Label>
        <Input
          id="certificate-file"
          type="file"
          accept=".pdf,.jpg,.jpeg,.png"
          required
          className="h-11 text-base touch-manipulation border-white/30 focus:border-yellow-500 focus:ring-yellow-500"
          onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
        />
        <p className="text-[11px] text-white/55">Accepted formats: PDF, JPG, PNG. Max size: 5MB</p>
      </div>

      <Button
        type="submit"
        className="w-full h-11 bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold touch-manipulation disabled:opacity-40"
        disabled={isUploading}
      >
        {isUploading ? 'Uploading...' : 'Upload certificate'}
      </Button>
    </form>
  );
};

export default CertificateForm;
