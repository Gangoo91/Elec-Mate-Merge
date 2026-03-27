/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { saveOrSharePdf } from '@/utils/save-or-share-pdf';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  MoreVertical,
  Eye,
  Download,
  Trash2,
  Zap,
  Calculator,
  Shield,
  Wrench,
  Settings,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { toast } from 'sonner';
import { formatDistanceToNow } from 'date-fns';
import { SavedAgentResult, AgentType } from '@/hooks/useSavedAgentResults';
import { supabase } from '@/integrations/supabase/client';
import { cn } from '@/lib/utils';
import {
  generateDesignerPDF,
  generateRAMSFromAgents,
  generateMethodStatementFromInstaller,
} from '@/utils/agent-pdf-generator';
import { openOrDownloadPdf } from '@/utils/pdf-download';

interface SavedResultItemProps {
  result: SavedAgentResult;
  onClose?: () => void;
  onDelete?: (id: string, agentType: AgentType) => Promise<boolean>;
}

// Per-agent accent colours
const AGENT_COLOURS: Record<AgentType, string> = {
  'circuit-designer': 'blue-500',
  'cost-engineer': 'green-500',
  'health-safety': 'red-500',
  installer: 'orange-500',
  maintenance: 'slate-400',
};

// Agent styling configuration
const AGENT_CONFIG: Record<
  AgentType,
  {
    icon: React.ComponentType<{ className?: string }>;
    route: string;
  }
> = {
  'circuit-designer': {
    icon: Zap,
    route: '/electrician/circuit-designer',
  },
  'cost-engineer': {
    icon: Calculator,
    route: '/electrician/cost-engineer',
  },
  'health-safety': {
    icon: Shield,
    route: '/electrician/health-safety',
  },
  installer: {
    icon: Wrench,
    route: '/electrician/installation-specialist',
  },
  maintenance: {
    icon: Settings,
    route: '/electrician/maintenance',
  },
};

export const SavedResultItem: React.FC<SavedResultItemProps> = ({ result, onClose, onDelete }) => {
  const navigate = useNavigate();
  const [isDownloading, setIsDownloading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const config = AGENT_CONFIG[result.agentType];
  const IconComponent = config.icon;

  // Format the date
  const relativeDate = result.completedAt
    ? formatDistanceToNow(new Date(result.completedAt), { addSuffix: true })
    : 'Unknown date';

  const handleViewResults = () => {
    // Navigate to the agent page with the job ID in state
    navigate(config.route, {
      state: {
        fromSavedResults: true,
        jobId: result.id,
        outputData: result.outputData,
        inputData: result.inputData,
      },
    });
    onClose?.();
  };

  const handleDownloadPDF = async () => {
    setIsDownloading(true);

    try {
      switch (result.agentType) {
        case 'circuit-designer': {
          const projectName =
            result.inputData?.projectInfo?.projectName ||
            result.inputData?.projectName ||
            'Circuit Design';
          const response =
            typeof result.outputData === 'string'
              ? result.outputData
              : JSON.stringify(result.outputData, null, 2);
          const pdf = generateDesignerPDF(response, projectName);
          await saveOrSharePdf(pdf, `${projectName.replace(/\s+/g, '_')}_Design.pdf`);
          toast.success('PDF downloaded successfully');
          break;
        }

        case 'cost-engineer': {
          // Use edge function to generate quote PDF
          const { data, error } = await supabase.functions.invoke('generate-quote-pdf', {
            body: {
              quoteData: result.outputData,
              projectName: result.title,
            },
          });

          if (error) throw error;

          // Handle base64 PDF response
          if (data?.pdf) {
            const binaryData = atob(data.pdf);
            const bytes = new Uint8Array(binaryData.length);
            for (let i = 0; i < binaryData.length; i++) {
              bytes[i] = binaryData.charCodeAt(i);
            }
            const blob = new Blob([bytes], { type: 'application/pdf' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${result.title.replace(/\s+/g, '_')}_Quote.pdf`;
            a.click();
            URL.revokeObjectURL(url);
            toast.success('Quote PDF downloaded');
          }
          break;
        }

        case 'health-safety': {
          const response =
            typeof result.outputData === 'string'
              ? result.outputData
              : JSON.stringify(result.outputData, null, 2);
          const pdfUrl = generateRAMSFromAgents(
            response,
            '', // installer response (optional)
            result.title,
            'Site Location',
            'Risk Assessor'
          );
          // Open the PDF URL in new tab (it's a data URL or blob URL)
          await openOrDownloadPdf(pdfUrl, 'Saved-Result.pdf');
          toast.success('RAMS PDF generated');
          break;
        }

        case 'installer':
        case 'maintenance': {
          const response =
            typeof result.outputData === 'string'
              ? result.outputData
              : JSON.stringify(result.outputData, null, 2);
          const pdfBytes = generateMethodStatementFromInstaller(
            response,
            result.title,
            'Site Location',
            'Supervisor'
          );
          const blob = new Blob([pdfBytes], { type: 'application/pdf' });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `${result.title.replace(/\s+/g, '_')}_Method_Statement.pdf`;
          a.click();
          URL.revokeObjectURL(url);
          toast.success('Method Statement PDF downloaded');
          break;
        }
      }
    } catch (error: any) {
      console.error('Error generating PDF:', error);
      toast.error('Failed to generate PDF');
    } finally {
      setIsDownloading(false);
    }
  };

  // Get per-agent colour classes
  const agentColour = AGENT_COLOURS[result.agentType];
  const colourMap: Record<
    string,
    { bgLight: string; text: string; border: string; leftBar: string }
  > = {
    'blue-500': {
      bgLight: 'bg-blue-500/10',
      text: 'text-blue-400',
      border: 'border-blue-500/20',
      leftBar: 'bg-blue-500',
    },
    'green-500': {
      bgLight: 'bg-green-500/10',
      text: 'text-green-400',
      border: 'border-green-500/20',
      leftBar: 'bg-green-500',
    },
    'red-500': {
      bgLight: 'bg-red-500/10',
      text: 'text-red-400',
      border: 'border-red-500/20',
      leftBar: 'bg-red-500',
    },
    'orange-500': {
      bgLight: 'bg-orange-500/10',
      text: 'text-orange-400',
      border: 'border-orange-500/20',
      leftBar: 'bg-orange-500',
    },
    'slate-400': {
      bgLight: 'bg-slate-400/10',
      text: 'text-slate-300',
      border: 'border-slate-400/20',
      leftBar: 'bg-slate-400',
    },
  };
  const cc = colourMap[agentColour] || colourMap['blue-500'];

  return (
    <motion.div
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.15] ring-1 ring-white/[0.15] active:bg-white/[0.15] transition-colors"
    >
      {/* Coloured left accent */}
      <div className={cn('w-1 self-stretch rounded-full -ml-1', cc.leftBar, 'opacity-50')} />

      {/* Agent Icon */}
      <div
        className={cn(
          'flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center ring-1',
          cc.bgLight,
          cc.border
        )}
      >
        <IconComponent className={cn('h-5 w-5', cc.text)} />
      </div>

      {/* Content */}
      <button onClick={handleViewResults} className="flex-1 min-w-0 text-left touch-manipulation">
        <h4 className="text-[14px] font-medium text-white truncate">{result.title}</h4>
        <p className="text-[11px] text-white mt-0.5">{relativeDate}</p>
      </button>

      {/* Actions Menu */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex-shrink-0 w-11 h-11 rounded-lg flex items-center justify-center text-white hover:bg-white/[0.08] transition-colors touch-manipulation">
            <MoreVertical className="h-5 w-5" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="bg-elec-dark border-white/[0.1] min-w-[160px]">
          <DropdownMenuItem
            onClick={handleViewResults}
            className="gap-2 text-white focus:bg-white/[0.08] focus:text-white"
          >
            <Eye className="h-4 w-4" />
            View Results
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={handleDownloadPDF}
            disabled={isDownloading}
            className="gap-2 text-white focus:bg-white/[0.08] focus:text-white"
          >
            <Download className="h-4 w-4" />
            {isDownloading ? 'Generating...' : 'Download PDF'}
          </DropdownMenuItem>
          {onDelete && (
            <DropdownMenuItem
              onClick={async () => {
                setIsDeleting(true);
                const success = await onDelete(result.id, result.agentType);
                if (success) {
                  toast.success('Result deleted');
                } else {
                  toast.error('Failed to delete');
                  setIsDeleting(false);
                }
              }}
              disabled={isDeleting}
              className="gap-2 text-red-400 focus:bg-red-500/10 focus:text-red-400"
            >
              <Trash2 className="h-4 w-4" />
              {isDeleting ? 'Deleting...' : 'Delete'}
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </motion.div>
  );
};

export default SavedResultItem;
