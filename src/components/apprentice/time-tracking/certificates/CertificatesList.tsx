
import { Certificate } from "@/types/certificates";
import CertificateCard from "./CertificateCard";
import CertificateEmptyState from "./CertificateEmptyState";

interface CertificatesListProps {
  certificates: Certificate[];
  onDelete: (id: string) => void;
  onAddCertificate: (certificate: Omit<Certificate, "id" | "fileUrl">) => void;
  isUploading: boolean;
}

const CertificatesList = ({ 
  certificates, 
  onDelete, 
  onAddCertificate, 
  isUploading 
}: CertificatesListProps) => {
  if (certificates.length === 0) {
    return (
      <CertificateEmptyState 
        onAddCertificate={onAddCertificate}
        isUploading={isUploading}
      />
    );
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {certificates.map((certificate) => (
        <CertificateCard 
          key={certificate.id} 
          certificate={certificate} 
          onDelete={onDelete} 
        />
      ))}
    </div>
  );
};

export default CertificatesList;
