
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Certificate, Upload, Calendar, Trash2, Eye } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

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

const CertificatesManager = () => {
  const { toast } = useToast();
  const [certificates, setCertificates] = useState(mockCertificates);
  const [isUploading, setIsUploading] = useState(false);

  const handleUploadCertificate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);
    
    // Simulate upload delay
    setTimeout(() => {
      setIsUploading(false);
      toast({
        title: "Certificate uploaded",
        description: "Your certificate has been successfully uploaded and saved.",
      });
    }, 1500);
  };

  const handleDeleteCertificate = (id: string) => {
    setCertificates(certificates.filter(cert => cert.id !== id));
    toast({
      title: "Certificate deleted",
      description: "The certificate has been removed from your records.",
    });
  };

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
            <form onSubmit={handleUploadCertificate} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="certificate-name">Certificate Name</Label>
                <Input 
                  id="certificate-name" 
                  placeholder="E.g., Health and Safety Level 2" 
                  required 
                  className="bg-elec-dark"
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
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="expiry-date">Expiry Date (Optional)</Label>
                  <Input 
                    id="expiry-date" 
                    type="date" 
                    className="bg-elec-dark"
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
                />
                <p className="text-xs text-muted-foreground">
                  Accepted formats: PDF, JPG, PNG. Max size: 5MB
                </p>
              </div>
              
              <Button type="submit" className="w-full" disabled={isUploading}>
                {isUploading ? 'Uploading...' : 'Upload Certificate'}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {certificates.length === 0 ? (
        <Card className="border-dashed border-2 border-elec-yellow/20 bg-elec-dark">
          <CardContent className="flex flex-col items-center justify-center py-10">
            <Certificate className="h-12 w-12 text-elec-yellow/40 mb-4" />
            <h3 className="text-xl font-medium mb-2">No certificates yet</h3>
            <p className="text-muted-foreground text-center max-w-md mb-4">
              Upload your professional certificates and qualifications to keep track of them in one place.
            </p>
            <Dialog>
              <DialogTrigger asChild>
                <Button>Upload Your First Certificate</Button>
              </DialogTrigger>
              <DialogContent>
                {/* Same form content as above */}
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {certificates.map((certificate) => (
            <Card key={certificate.id} className="border-elec-yellow/20 bg-elec-dark">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Certificate className="h-8 w-8 text-elec-yellow" />
                    <div>
                      <h4 className="font-medium">{certificate.name}</h4>
                      <p className="text-sm text-muted-foreground">{certificate.issuedBy}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      className="h-8 w-8 p-0 text-red-400 hover:text-red-300"
                      onClick={() => handleDeleteCertificate(certificate.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-2 mt-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Issue Date</p>
                    <div className="flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5" />
                      {certificate.issueDate}
                    </div>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Expiry Date</p>
                    <div className="flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5" />
                      {certificate.expiryDate}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default CertificatesManager;
