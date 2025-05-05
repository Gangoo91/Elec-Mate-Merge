
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Award, Calendar, Eye, Trash2 } from "lucide-react";
import { Certificate } from "@/types/certificates";

interface CertificateCardProps {
  certificate: Certificate;
  onDelete: (id: string) => void;
}

const CertificateCard = ({ certificate, onDelete }: CertificateCardProps) => {
  return (
    <Card className="border-elec-yellow/20 bg-elec-dark">
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Award className="h-8 w-8 text-elec-yellow" />
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
              onClick={() => onDelete(certificate.id)}
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
  );
};

export default CertificateCard;
