import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  MoreVertical,
  Eye,
  Download,
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
import {
  generateDesignerPDF,
  generateRAMSFromAgents,
  generateMethodStatementFromInstaller,
} from '@/utils/agent-pdf-generator';

interface SavedResultItemProps {
  result: SavedAgentResult;
  onClose?: () => void;
}

// Agent styling configuration
const AGENT_CONFIG: Record<
  AgentType,
  {
    icon: React.ComponentType<{ className?: string }>;
    gradient: string;
    route: string;
  }
> = {
  'circuit-designer': {
    icon: Zap,
    gradient: 'from-amber-400 to-yellow-500',
    route: '/electrician/circuit-designer',
  },
  'cost-engineer': {
    icon: Calculator,
    gradient: 'from-emerald-400 to-green-500',
    route: '/electrician/cost-engineer',
  },
  'health-safety': {
    icon: Shield,
    gradient: 'from-orange-400 to-red-500',
    route: '/electrician/health-safety',
  },
  'installer': {
    icon: Wrench,
    gradient: 'from-blue-400 to-blue-500',
    route: '/electrician/installation-specialist',
  },
  'maintenance': {
    icon: Settings,
    gradient: 'from-cyan-400 to-teal-500',
    route: '/electrician/maintenance',
  },
};

export const SavedResultItem: React.FC<SavedResultItemProps> = ({
  result,
  onClose,
}) => {
  const navigate = useNavigate();
  const [isDownloading, setIsDownloading] = useState(false);
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
          const projectName = result.inputData?.projectName || 'Circuit Design';
          const response =
            typeof result.outputData === 'string'
              ? result.outputData
              : JSON.stringify(result.outputData, null, 2);
          const pdf = generateDesignerPDF(response, projectName);
          pdf.save(`${projectName.replace(/\s+/g, '_')}_Design.pdf`);
          toast.success('PDF downloaded successfully');
          break;
        }

        case 'cost-engineer': {
          // Use edge function to generate quote PDF
          const { data, error } = await supabase.functions.invoke(
            'generate-quote-pdf',
            {
              body: {
                quoteData: result.outputData,
                projectName: result.title,
              },
            }
          );

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
          window.open(pdfUrl, '_blank');
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] active:bg-white/[0.06] transition-colors"
    >
      {/* Agent Icon */}
      <div
        className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center bg-gradient-to-br ${config.gradient}`}
      >
        <IconComponent className="h-5 w-5 text-white" />
      </div>

      {/* Content */}
      <button
        onClick={handleViewResults}
        className="flex-1 min-w-0 text-left touch-manipulation"
      >
        <h4 className="text-sm font-medium text-white truncate">{result.title}</h4>
        <p className="text-xs text-white/50">{relativeDate}</p>
      </button>

      {/* Actions Menu */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center text-white/50 hover:text-white hover:bg-white/[0.08] transition-colors touch-manipulation">
            <MoreVertical className="h-5 w-5" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="bg-elec-dark border-white/[0.1] min-w-[160px]"
        >
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
        </DropdownMenuContent>
      </DropdownMenu>
    </motion.div>
  );
};

export default SavedResultItem;
