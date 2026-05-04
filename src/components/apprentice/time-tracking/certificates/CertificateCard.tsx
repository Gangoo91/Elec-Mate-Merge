import { Button } from '@/components/ui/button';
import { Calendar, Eye, Trash2 } from 'lucide-react';
import { Certificate } from '@/types/certificates';

interface CertificateCardProps {
  certificate: Certificate;
  onDelete: (id: string) => void;
}

const CertificateCard = ({ certificate, onDelete }: CertificateCardProps) => {
  return (
    <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <h4 className="text-[15px] font-medium text-white">{certificate.name}</h4>
          <p className="text-[13px] text-white/55 mt-0.5">{certificate.issuedBy}</p>
        </div>
        <div className="flex gap-1">
          <Button
            size="sm"
            variant="ghost"
            className="h-9 w-9 p-0 text-white/55 hover:text-white hover:bg-white/[0.05] touch-manipulation"
          >
            <Eye className="h-4 w-4" />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            className="h-9 w-9 p-0 text-red-300 hover:text-red-200 hover:bg-red-500/[0.08] touch-manipulation"
            onClick={() => onDelete(certificate.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mt-4">
        <div className="space-y-1">
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
            Issue date
          </span>
          <div className="flex items-center gap-1.5 text-[13px] text-white/85 font-mono">
            <Calendar className="h-3.5 w-3.5 text-white/55" />
            {certificate.issueDate}
          </div>
        </div>
        <div className="space-y-1">
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
            Expiry date
          </span>
          <div className="flex items-center gap-1.5 text-[13px] text-white/85 font-mono">
            <Calendar className="h-3.5 w-3.5 text-white/55" />
            {certificate.expiryDate}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificateCard;
