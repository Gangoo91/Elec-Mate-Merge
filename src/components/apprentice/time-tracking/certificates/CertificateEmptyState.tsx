
import { Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import CertificateForm from "./CertificateForm";
import { Certificate } from "@/types/certificates";

interface CertificateEmptyStateProps {
  onAddCertificate: (certificate: Omit<Certificate, "id" | "fileUrl">) => void;
  isUploading: boolean;
}

const CertificateEmptyState = ({ onAddCertificate, isUploading }: CertificateEmptyStateProps) => {
  return (
    <Card className="border-dashed border-2 border-elec-yellow/20 bg-elec-dark">
      <CardContent className="flex flex-col items-center justify-center py-10">
        <Award className="h-12 w-12 text-elec-yellow/40 mb-4" />
        <h3 className="text-xl font-medium mb-2">No certificates yet</h3>
        <p className="text-muted-foreground text-center max-w-md mb-4">
          Upload your professional certificates and qualifications to keep track of them in one place.
        </p>
        <Dialog>
          <DialogTrigger asChild>
            <Button>Upload Your First Certificate</Button>
          </DialogTrigger>
          <DialogContent>
            <CertificateForm onSubmit={onAddCertificate} isUploading={isUploading} />
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default CertificateEmptyState;
