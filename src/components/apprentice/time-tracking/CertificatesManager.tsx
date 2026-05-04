import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Upload } from 'lucide-react';
import CertificatesList from './certificates/CertificatesList';
import CertificateForm from './certificates/CertificateForm';
import useCertificates from '@/hooks/certificates/useCertificates';

const CertificatesManager = () => {
  const { certificates, addCertificate, deleteCertificate, isUploading } = useCertificates();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="space-y-1">
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
            Certificates and qualifications
          </span>
          <p className="text-[14px] text-white/85 leading-relaxed">
            Keep track of your professional certificates, qualifications and achievements
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="gap-2 h-11 bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold touch-manipulation">
              <Upload className="h-4 w-4" />
              Upload new certificate
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Upload certificate</DialogTitle>
            </DialogHeader>
            <CertificateForm onSubmit={addCertificate} isUploading={isUploading} />
          </DialogContent>
        </Dialog>
      </div>

      <CertificatesList
        certificates={certificates}
        onDelete={deleteCertificate}
        onAddCertificate={addCertificate}
        isUploading={isUploading}
      />
    </div>
  );
};

export default CertificatesManager;
