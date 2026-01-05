import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, Plus, X } from 'lucide-react';
import { TestResult } from '@/types/testResult';
import { parseCircuitText } from '@/utils/circuitTextParser';
import { useToast } from '@/hooks/use-toast';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface ScribbleToTableDialogProps {
  onCircuitsAdded: (circuits: TestResult[]) => void;
  onClose: () => void;
}

const ScribbleToTableDialog = ({ onCircuitsAdded, onClose }: ScribbleToTableDialogProps) => {
  const [text, setText] = useState('');
  const [parsedCircuits, setParsedCircuits] = useState<TestResult[]>([]);
  const [isParsing, setIsParsing] = useState(false);
  const { toast } = useToast();

  const handleParse = async () => {
    if (!text.trim()) {
      toast({
        title: "No Text Entered",
        description: "Please enter circuit information to parse",
        variant: "destructive"
      });
      return;
    }

    setIsParsing(true);
    try {
      const circuits = await parseCircuitText(text);
      setParsedCircuits(circuits);
      
      if (circuits.length === 0) {
        toast({
          title: "No Circuits Found",
          description: "Unable to parse circuit information from the text",
          variant: "destructive"
        });
      } else {
        toast({
          title: "Circuits Parsed",
          description: `Successfully detected ${circuits.length} circuit(s)`,
        });
      }
    } catch (error) {
      toast({
        title: "Parse Failed",
        description: error instanceof Error ? error.message : "Failed to parse circuits",
        variant: "destructive"
      });
    } finally {
      setIsParsing(false);
    }
  };

  const handleAddCircuits = () => {
    if (parsedCircuits.length > 0) {
      onCircuitsAdded(parsedCircuits);
    }
  };

  const exampleText = `Examples:
C1 Kitchen Lights 1.5mm 10A Type B
Circuit 2: Downstairs Sockets, 2.5mm², 32A, Type B MCB
C3 - Cooker - 6.0/2.5 - 40A - RCBO`;

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-[95vw] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Text to Circuits</DialogTitle>
          <DialogDescription>
            Enter circuit details in natural language or structured format. AI will parse and extract the information.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Circuit Information</label>
            <Textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder={exampleText}
              className="min-h-[200px] font-mono text-sm"
            />
          </div>

          <Button 
            onClick={handleParse} 
            disabled={isParsing || !text.trim()}
            className="w-full"
          >
            {isParsing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Parsing Circuits...
              </>
            ) : (
              'Parse Circuits'
            )}
          </Button>

          {parsedCircuits.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-sm font-semibold">Detected Circuits ({parsedCircuits.length})</h3>
              <div className="border rounded-lg overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-xs">Circuit</TableHead>
                      <TableHead className="text-xs">Description</TableHead>
                      <TableHead className="text-xs">Live</TableHead>
                      <TableHead className="text-xs">CPC</TableHead>
                      <TableHead className="text-xs">Rating</TableHead>
                      <TableHead className="text-xs">Type</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {parsedCircuits.map((circuit, idx) => (
                      <TableRow key={idx}>
                        <TableCell className="text-xs">{circuit.circuitDesignation}</TableCell>
                        <TableCell className="text-xs">{circuit.circuitDescription}</TableCell>
                        <TableCell className="text-xs">{circuit.liveSize}</TableCell>
                        <TableCell className="text-xs">{circuit.cpcSize}</TableCell>
                        <TableCell className="text-xs">{circuit.protectiveDeviceRating}</TableCell>
                        <TableCell className="text-xs">{circuit.protectiveDeviceType}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <div className="flex gap-2">
                <Button onClick={handleAddCircuits} className="flex-1 gap-2">
                  <Plus className="h-4 w-4" />
                  Add {parsedCircuits.length} Circuit{parsedCircuits.length !== 1 ? 's' : ''} to Table
                </Button>
                <Button onClick={onClose} variant="outline">
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ScribbleToTableDialog;
