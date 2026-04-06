import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Zap, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { generateCUDoorLabel, generateFullBoardSchedule, type BoardCircuit, type BoardScheduleData } from '@/utils/generate-board-schedule-pdf';

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.04 } } };
const itemVariants = { hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0, transition: { duration: 0.25 } } };
const inputCn = 'h-12 text-base touch-manipulation bg-white/[0.06] border-white/[0.08] text-white focus:border-yellow-500 focus:ring-yellow-500';

export default function BoardSchedulePage() {
  const navigate = useNavigate();

  const [board, setBoard] = useState<BoardScheduleData>({
    boardRef: '', location: '', mainSwitchRating: '', rcdDetails: '',
    circuits: [{ id: crypto.randomUUID(), circuitNumber: '1', description: '', rating: '', type: 'MCB' }],
    companyName: '', notes: '',
  });

  const updateBoard = useCallback((field: keyof BoardScheduleData, value: any) => {
    setBoard((prev) => ({ ...prev, [field]: value }));
  }, []);

  const addCircuit = () => {
    const nextNum = String(board.circuits.length + 1);
    setBoard((prev) => ({
      ...prev,
      circuits: [...prev.circuits, { id: crypto.randomUUID(), circuitNumber: nextNum, description: '', rating: '', type: 'MCB' }],
    }));
  };

  const updateCircuit = (id: string, field: keyof BoardCircuit, value: string) => {
    setBoard((prev) => ({ ...prev, circuits: prev.circuits.map((c) => c.id === id ? { ...c, [field]: value } : c) }));
  };

  const removeCircuit = (id: string) => {
    if (board.circuits.length <= 1) return;
    setBoard((prev) => ({ ...prev, circuits: prev.circuits.filter((c) => c.id !== id) }));
  };

  const handleGenerate = async (type: 'door' | 'full') => {
    if (!board.boardRef) { toast.error('Enter a board reference'); return; }
    if (!board.circuits.some((c) => c.description)) { toast.error('Add at least one circuit'); return; }
    try {
      const blob = type === 'door' ? generateCUDoorLabel(board) : generateFullBoardSchedule(board);
      const { openOrDownloadPdf } = await import('@/utils/pdf-download');
      const url = URL.createObjectURL(blob);
      await openOrDownloadPdf(url, `Board-Schedule-${board.boardRef}-${type === 'door' ? 'Door' : 'Full'}.pdf`);
      URL.revokeObjectURL(url);
      toast.success(type === 'door' ? 'CU door label generated' : 'Full board schedule generated');
    } catch (err) {
      console.error('Board schedule error:', err);
      toast.error('Failed to generate');
    }
  };

  return (
    <div className="-mt-3 sm:-mt-4 md:-mt-6 bg-background pb-24">
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-white/[0.06]">
        <div className="px-4 py-2">
          <div className="flex items-center gap-3 h-11">
            <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="text-white hover:text-white hover:bg-white/10 rounded-xl h-11 w-11 touch-manipulation active:scale-[0.98]">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 rounded-lg bg-orange-500/10 border border-orange-500/20">
                <Zap className="h-4 w-4 text-orange-400" />
              </div>
              <h1 className="text-base font-semibold text-white">Board Schedule</h1>
            </div>
          </div>
        </div>
      </div>

      <motion.main variants={containerVariants} initial="hidden" animate="visible" className="px-4 py-4 space-y-5 max-w-3xl mx-auto">
        <motion.div variants={itemVariants} className="border-b border-white/[0.06] pb-3">
          <p className="text-sm font-semibold text-white">Board Schedule Generator</p>
          <p className="text-xs text-white mt-1">Create a CU door sticker label or a full A4 board schedule document.</p>
        </motion.div>

        {/* Board details */}
        <motion.section variants={itemVariants} className="space-y-4">
          <div className="border-b border-white/[0.06] pb-1 mb-3">
            <div className="h-[2px] w-full rounded-full bg-gradient-to-r from-orange-500 to-amber-400 mb-2" />
            <h2 className="text-xs font-medium text-white uppercase tracking-wider">Board Details</h2>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div><Label className="text-white text-xs mb-1.5 block">Board Reference *</Label><Input value={board.boardRef} onChange={(e) => updateBoard('boardRef', e.target.value)} className={inputCn} placeholder="e.g. DB1" /></div>
            <div><Label className="text-white text-xs mb-1.5 block">Location</Label><Input value={board.location} onChange={(e) => updateBoard('location', e.target.value)} className={inputCn} placeholder="e.g. Plant room" /></div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div><Label className="text-white text-xs mb-1.5 block">Main Switch</Label><Input value={board.mainSwitchRating} onChange={(e) => updateBoard('mainSwitchRating', e.target.value)} className={inputCn} placeholder="e.g. 100A DP" /></div>
            <div><Label className="text-white text-xs mb-1.5 block">RCD Details</Label><Input value={board.rcdDetails} onChange={(e) => updateBoard('rcdDetails', e.target.value)} className={inputCn} placeholder="e.g. 63A 30mA" /></div>
          </div>
        </motion.section>

        {/* Circuits */}
        <motion.section variants={itemVariants} className="space-y-3">
          <div className="border-b border-white/[0.06] pb-1 mb-3 flex items-center justify-between">
            <div>
              <div className="h-[2px] w-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 mb-2" />
              <h2 className="text-xs font-medium text-white uppercase tracking-wider">Circuits</h2>
            </div>
            <span className="text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-white/[0.06] text-white">{board.circuits.length} ways</span>
          </div>
          {board.circuits.map((circuit) => (
            <div key={circuit.id} className="flex items-start gap-2">
              <div className="flex-1 grid grid-cols-12 gap-2">
                <Input value={circuit.circuitNumber} onChange={(e) => updateCircuit(circuit.id, 'circuitNumber', e.target.value)} className={cn(inputCn, 'col-span-2 text-center font-bold')} placeholder="#" />
                <Input value={circuit.description} onChange={(e) => updateCircuit(circuit.id, 'description', e.target.value)} className={cn(inputCn, 'col-span-5')} placeholder="Description" />
                <Input value={circuit.rating} onChange={(e) => updateCircuit(circuit.id, 'rating', e.target.value)} className={cn(inputCn, 'col-span-2 text-center')} placeholder="A" />
                <Input value={circuit.type} onChange={(e) => updateCircuit(circuit.id, 'type', e.target.value)} className={cn(inputCn, 'col-span-3')} placeholder="MCB" />
              </div>
              {board.circuits.length > 1 && (
                <button onClick={() => removeCircuit(circuit.id)} className="w-10 h-12 rounded-lg flex items-center justify-center text-white hover:text-red-400 hover:bg-red-500/10 transition-colors touch-manipulation flex-shrink-0">
                  <Trash2 className="h-4 w-4" />
                </button>
              )}
            </div>
          ))}
          <button onClick={addCircuit} className="w-full h-11 rounded-xl border-2 border-dashed border-white/[0.15] flex items-center justify-center gap-2 text-sm text-white touch-manipulation active:scale-[0.98] hover:border-white/[0.25] transition-colors">
            <Plus className="h-4 w-4" /> Add Circuit
          </button>
        </motion.section>

        {/* Notes */}
        <motion.section variants={itemVariants} className="space-y-3">
          <div className="border-b border-white/[0.06] pb-1 mb-3">
            <div className="h-[2px] w-full rounded-full bg-gradient-to-r from-white/20 to-white/5 mb-2" />
            <h2 className="text-xs font-medium text-white uppercase tracking-wider">Notes</h2>
          </div>
          <Textarea value={board.notes || ''} onChange={(e) => updateBoard('notes', e.target.value)} className="touch-manipulation text-base min-h-[80px] bg-white/[0.06] border-white/[0.08] text-white focus:border-yellow-500 focus:ring-yellow-500" placeholder="Additional notes..." />
        </motion.section>

        {/* Generate buttons */}
        <motion.div variants={itemVariants} className="space-y-3 pt-2">
          <Button className="w-full h-12 text-sm font-medium touch-manipulation active:scale-[0.98] bg-amber-500 text-black hover:bg-amber-600" onClick={() => handleGenerate('door')}>
            Generate CU Door Label
          </Button>
          <Button variant="outline" className="w-full h-12 text-sm font-medium touch-manipulation active:scale-[0.98] border-white/[0.08] text-white hover:bg-white/[0.06]" onClick={() => handleGenerate('full')}>
            Generate Full A4 Schedule
          </Button>
        </motion.div>
      </motion.main>
    </div>
  );
}
