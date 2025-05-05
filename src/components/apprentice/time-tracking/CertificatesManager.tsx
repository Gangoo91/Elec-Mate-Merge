
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Upload } from "lucide-react";
import CertificatesList from "./certificates/CertificatesList";
import CertificateForm from "./certificates/CertificateForm";
import useCertificates from "@/hooks/certificates/useCertificates";

const CertificatesManager = () => {
  const { certificates, addCertificate, deleteCertificate, isUploading } = useCertificates();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h3 className="text-lg font-semibold">Certificates & Qualifications</h3>
          <p className="text-sm text-muted-foreground">
            Keep track of your professional certificates, qualifications and achievements
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Upload className="h-4 w-4" />
              Upload New Certificate
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Upload Certificate</DialogTitle>
            </DialogHeader>
            <CertificateForm 
              onSubmit={addCertificate} 
              isUploading={isUploading} 
            />
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
