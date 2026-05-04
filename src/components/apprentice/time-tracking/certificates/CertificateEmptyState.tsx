import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import CertificateForm from './CertificateForm';
import { Certificate } from '@/types/certificates';

interface CertificateEmptyStateProps {
  onAddCertificate: (certificate: Omit<Certificate, 'id' | 'fileUrl'>) => void;
  isUploading: boolean;
}

const CertificateEmptyState = ({ onAddCertificate, isUploading }: CertificateEmptyStateProps) => {
  return (
    <div className="rounded-xl border border-dashed border-white/[0.08] bg-white/[0.02] flex flex-col items-center justify-center py-10 px-4">
      <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55 mb-2">
        No certificates yet
      </span>
      <p className="text-[14px] text-white/70 leading-relaxed text-center max-w-md mb-4">
        Upload your professional certificates and qualifications to keep track of them in one place.
      </p>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="h-11 bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold touch-manipulation">
            Upload your first certificate
          </Button>
        </DialogTrigger>
        <DialogContent>
          <CertificateForm onSubmit={onAddCertificate} isUploading={isUploading} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CertificateEmptyState;
