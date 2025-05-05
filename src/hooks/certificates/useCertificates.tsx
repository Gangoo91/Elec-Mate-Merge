
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Certificate } from "@/types/certificates";

// Mock data for certificates
const mockCertificates = [
  {
    id: "cert1",
    name: "Health and Safety Level 2",
    issueDate: "2024-04-10",
    expiryDate: "2026-04-10",
    fileUrl: "#",
    issuedBy: "EAL",
  },
  {
    id: "cert2",
    name: "18th Edition Wiring Regulations",
    issueDate: "2023-11-15",
    expiryDate: "2025-11-15",
    fileUrl: "#",
    issuedBy: "City & Guilds",
  },
];

export const useCertificates = () => {
  const { toast } = useToast();
  const [certificates, setCertificates] = useState<Certificate[]>(mockCertificates);
  const [isUploading, setIsUploading] = useState(false);

  const addCertificate = (certificate: Omit<Certificate, "id" | "fileUrl">) => {
    setIsUploading(true);
    
    // Simulate upload delay
    setTimeout(() => {
      const newCertificate: Certificate = {
        ...certificate,
        id: `cert${Date.now()}`,
        fileUrl: "#"
      };
      
      setCertificates(prev => [newCertificate, ...prev]);
      setIsUploading(false);
      
      toast({
        title: "Certificate uploaded",
        description: "Your certificate has been successfully uploaded and saved.",
      });
    }, 1500);
  };

  const deleteCertificate = (id: string) => {
    setCertificates(certificates.filter(cert => cert.id !== id));
    
    toast({
      title: "Certificate deleted",
      description: "The certificate has been removed from your records.",
    });
  };

  return {
    certificates,
    addCertificate,
    deleteCertificate,
    isUploading,
    setIsUploading
  };
};

export default useCertificates;
