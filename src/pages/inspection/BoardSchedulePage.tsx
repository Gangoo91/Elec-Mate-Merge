import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { generateCUDoorLabel, generateFullBoardSchedule, type BoardCircuit, type BoardScheduleData } from '@/utils/generate-board-schedule-pdf';

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.04 } } };
const itemVariants = { hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0, transition: { duration: 0.25 } } };
const inputCn = 'input-underline h-11 w-full rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 text-base md:text-base font-medium text-white placeholder:font-normal placeholder:text-white/25 caret-elec-yellow transition-colors duration-150 hover:border-white/[0.3] focus:border-elec-yellow focus-visible:ring-0 focus:ring-0 focus:outline-none focus:shadow-none !leading-[2.75rem] [color-scheme:dark] touch-manipulation';
const labelCn = 'text-[12px] font-medium text-white mb-1 block';
const cardCn = '-mx-4 rounded-none border-y border-white/[0.12] bg-gradient-to-b from-white/[0.07] to-white/[0.03] sm:mx-0 sm:rounded-2xl sm:border-x p-4 sm:p-5 space-y-4';

export default function BoardSchedulePage() {
  const navigate = useNavigate();

  const [board, setBoard] = useState<BoardScheduleData>({
    boardRef: '', location: '', mainSwitchRating: '', rcdDetails: '',
    circuits: [{ id: crypto.randomUUID(), circuitNumber: '1', description: '', rating: '', type: 'MCB' }],
    companyName: '', notes: '',
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
        <div className="px-4 pt-3 pb-3 lg:px-8">
          <div className="mx-auto max-w-3xl lg:max-w-[1600px]">
            <button onClick={() => navigate(-1)} className="h-11 pr-2 text-[13px] font-semibold text-white/90 transition-colors hover:text-white touch-manipulation">Back</button>
            <div className="flex items-end justify-between gap-3">
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-white sm:text-[28px]">Board Schedule</h1>
                <p className="text-[13px] text-white/50 mt-0.5">Create a CU door sticker label or a full A4 board schedule document.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <motion.main variants={containerVariants} initial="hidden" animate="visible" className="px-4 py-4 space-y-5 mx-auto max-w-3xl lg:max-w-[1600px] lg:px-8 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-4">
        {/* Board details */}
        <motion.section variants={itemVariants} className={cardCn}>
          <h2 className="text-[15px] font-semibold tracking-tight text-white">Board details</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div><Label className={labelCn}>Board Reference *</Label><Input value={board.boardRef} onChange={(e) => updateBoard('boardRef', e.target.value)} className={inputCn} placeholder="e.g. DB1" /></div>
            <div><Label className={labelCn}>Location</Label><Input value={board.location} onChange={(e) => updateBoard('location', e.target.value)} className={inputCn} placeholder="e.g. Plant room" /></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div><Label className={labelCn}>Main Switch</Label><Input value={board.mainSwitchRating} onChange={(e) => updateBoard('mainSwitchRating', e.target.value)} className={inputCn} placeholder="e.g. 100A DP" /></div>
            <div><Label className={labelCn}>RCD Details</Label><Input value={board.rcdDetails} onChange={(e) => updateBoard('rcdDetails', e.target.value)} className={inputCn} placeholder="e.g. 63A 30mA" /></div>
          </div>
        </motion.section>

        {/* Circuits */}
        <motion.section variants={itemVariants} className={cn(cardCn, 'space-y-3 lg:col-span-2')}>
          <div className="flex items-center justify-between">
            <h2 className="text-[15px] font-semibold tracking-tight text-white">Circuits</h2>
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
                <button onClick={() => removeCircuit(circuit.id)} aria-label="Remove circuit" className="w-11 h-11 rounded-lg flex items-center justify-center text-[18px] leading-none text-red-400 hover:bg-red-500 hover:text-white transition-colors touch-manipulation flex-shrink-0">
                  ×
                </button>
              )}
            </div>
          ))}
          <button onClick={addCircuit} className="h-11 w-full rounded-xl border border-dashed border-white/[0.2] text-[13px] font-semibold text-white hover:border-white/[0.35] transition-colors touch-manipulation active:scale-[0.98]">
            Add Circuit
          </button>
        </motion.section>

        {/* Notes */}
        <motion.section variants={itemVariants} className={cn(cardCn, 'space-y-3')}>
          <h2 className="text-[15px] font-semibold tracking-tight text-white">Notes</h2>
          <Textarea value={board.notes || ''} onChange={(e) => updateBoard('notes', e.target.value)} className="rounded-lg border-0 bg-white/[0.04] text-base text-white placeholder:text-white/30 focus:ring-1 focus:ring-elec-yellow/40 focus-visible:ring-1 focus-visible:ring-elec-yellow/40 focus:outline-none focus:shadow-none min-h-[90px] touch-manipulation" placeholder="Additional notes..." />
        </motion.section>

        {/* Generate buttons */}
        <motion.div variants={itemVariants} className="space-y-3 pt-2 lg:col-span-2 lg:flex lg:flex-row-reverse lg:items-center lg:justify-start lg:gap-3 lg:space-y-0">
          <button className="h-12 w-full rounded-xl bg-elec-yellow text-[15px] font-semibold text-black hover:bg-elec-yellow/90 active:scale-[0.99] touch-manipulation lg:w-auto lg:px-10" onClick={() => handleGenerate('door')}>
            Generate CU Door Label
          </button>
          <button className="h-12 w-full rounded-xl border border-white/[0.12] bg-white/[0.04] text-[14px] font-medium text-white hover:bg-white/[0.08] touch-manipulation active:scale-[0.99] lg:w-auto lg:px-8" onClick={() => handleGenerate('full')}>
            Generate Full A4 Schedule
          </button>
        </motion.div>
      </motion.main>
    </div>
  );
}
