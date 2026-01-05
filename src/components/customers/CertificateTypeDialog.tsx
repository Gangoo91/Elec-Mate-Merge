import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { FileCheck, Zap, Wrench } from 'lucide-react';

interface CertificateTypeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelectType: (type: 'eicr' | 'eic' | 'minor-works') => void;
  customerName: string;
}

export const CertificateTypeDialog = ({
  open,
  onOpenChange,
  onSelectType,
  customerName
}: CertificateTypeDialogProps) => {
  const certificateTypes = [
    {
      type: 'eicr' as const,
      title: 'EICR',
      description: 'Electrical Installation Condition Report',
      icon: FileCheck,
      color: 'from-blue-500 to-blue-600'
    },
    {
      type: 'eic' as const,
      title: 'EIC',
      description: 'Electrical Installation Certificate',
      icon: Zap,
      color: 'from-yellow-500 to-yellow-600'
    },
    {
      type: 'minor-works' as const,
      title: 'Minor Works',
      description: 'Minor Works Certificate',
      icon: Wrench,
      color: 'from-green-500 to-green-600'
    }
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-xl sm:text-2xl">Create Report for {customerName}</DialogTitle>
          <DialogDescription>
            Select the type of certificate you want to create
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4">
          {certificateTypes.map(({ type, title, description, icon: Icon, color }) => (
            <button
              key={type}
              onClick={() => onSelectType(type)}
              className="group relative overflow-hidden rounded-lg border border-border bg-card p-6 text-left transition-all hover:border-primary hover:shadow-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              <div className="flex flex-col items-center text-center space-y-3">
                <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${color} flex items-center justify-center transition-transform group-hover:scale-110`}>
                  <Icon className="h-8 w-8 text-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">{title}</h3>
                  <p className="text-sm text-muted-foreground">{description}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};
