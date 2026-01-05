import React from 'react';
import { BookOpen } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const ZsReferenceValuesCard = () => (
  <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
    <div className="flex items-center gap-2 mb-3">
      <BookOpen className="h-4 w-4 text-blue-400" />
      <h4 className="font-medium text-blue-400">Maximum Zs Values (BS 7671 Tables 41.2, 41.3, 41.4)</h4>
    </div>
    
    <Tabs defaultValue="mcb" className="w-full">
      <TabsList className="grid w-full grid-cols-3 mb-3">
        <TabsTrigger value="mcb" className="text-xs">MCB/RCBO</TabsTrigger>
        <TabsTrigger value="fuse04" className="text-xs">Fuses 0.4s</TabsTrigger>
        <TabsTrigger value="fuse5" className="text-xs">Fuses 5s</TabsTrigger>
      </TabsList>
      
      <TabsContent value="mcb" className="space-y-3">
        <p className="text-xs text-muted-foreground mb-2">Table 41.3 - 0.4s disconnection (final circuits)</p>
        
        <div className="space-y-2">
          <div className="text-xs">
            <strong className="text-blue-400">Type B:</strong>
            <div className="grid grid-cols-4 gap-1 mt-1 text-white">
              <span>6A: 7.28Ω</span>
              <span>10A: 4.37Ω</span>
              <span>16A: 2.73Ω</span>
              <span>20A: 2.19Ω</span>
              <span>25A: 1.75Ω</span>
              <span>32A: 1.37Ω</span>
              <span>40A: 1.09Ω</span>
              <span>50A: 0.87Ω</span>
            </div>
          </div>
          
          <div className="text-xs">
            <strong className="text-yellow-400">Type C:</strong>
            <div className="grid grid-cols-4 gap-1 mt-1 text-white">
              <span>6A: 3.64Ω</span>
              <span>10A: 2.19Ω</span>
              <span>16A: 1.37Ω</span>
              <span>20A: 1.09Ω</span>
              <span>25A: 0.87Ω</span>
              <span>32A: 0.68Ω</span>
              <span>40A: 0.55Ω</span>
              <span>50A: 0.44Ω</span>
            </div>
          </div>
          
          <div className="text-xs">
            <strong className="text-red-400">Type D:</strong>
            <div className="grid grid-cols-4 gap-1 mt-1 text-white">
              <span>6A: 1.82Ω</span>
              <span>10A: 1.09Ω</span>
              <span>16A: 0.68Ω</span>
              <span>20A: 0.55Ω</span>
              <span>25A: 0.44Ω</span>
              <span>32A: 0.34Ω</span>
              <span>40A: 0.27Ω</span>
              <span>50A: 0.22Ω</span>
            </div>
          </div>
        </div>
      </TabsContent>
      
      <TabsContent value="fuse04" className="space-y-3">
        <p className="text-xs text-muted-foreground mb-2">Table 41.2 - 0.4s disconnection (final circuits)</p>
        
        <div className="space-y-2">
          <div className="text-xs">
            <strong className="text-blue-400">BS 88-2 gG (HRC):</strong>
            <div className="grid grid-cols-4 gap-1 mt-1 text-white">
              <span>6A: 7.80Ω</span>
              <span>10A: 4.65Ω</span>
              <span>16A: 2.43Ω</span>
              <span>20A: 1.68Ω</span>
              <span>25A: 1.29Ω</span>
              <span>32A: 0.99Ω</span>
              <span>40A: 0.75Ω</span>
              <span>50A: 0.57Ω</span>
            </div>
          </div>
          
          <div className="text-xs">
            <strong className="text-yellow-400">BS 3036 (Rewirable):</strong>
            <div className="grid grid-cols-4 gap-1 mt-1 text-white">
              <span>5A: 9.10Ω</span>
              <span>15A: 2.43Ω</span>
              <span>20A: 1.68Ω</span>
              <span>30A: 1.04Ω</span>
              <span>45A: 0.56Ω</span>
              <span>60A: 0.40Ω</span>
            </div>
          </div>
          
          <div className="text-xs">
            <strong className="text-green-400">BS 1362 (Plug-Top):</strong>
            <div className="grid grid-cols-4 gap-1 mt-1 text-white">
              <span>3A: 15.6Ω</span>
              <span>13A: 2.30Ω</span>
            </div>
          </div>
        </div>
      </TabsContent>
      
      <TabsContent value="fuse5" className="space-y-3">
        <p className="text-xs text-muted-foreground mb-2">Table 41.4 - 5s disconnection (distribution circuits)</p>
        
        <div className="space-y-2">
          <div className="text-xs">
            <strong className="text-blue-400">BS 88-2 gG (HRC):</strong>
            <div className="grid grid-cols-4 gap-1 mt-1 text-white">
              <span>16A: 4.0Ω</span>
              <span>20A: 2.8Ω</span>
              <span>25A: 2.2Ω</span>
              <span>32A: 1.7Ω</span>
              <span>40A: 1.3Ω</span>
              <span>50A: 0.99Ω</span>
              <span>63A: 0.78Ω</span>
              <span>80A: 0.55Ω</span>
            </div>
          </div>
          
          <div className="text-xs">
            <strong className="text-yellow-400">BS 3036 (Rewirable):</strong>
            <div className="grid grid-cols-4 gap-1 mt-1 text-white">
              <span>5A: 16.8Ω</span>
              <span>15A: 5.08Ω</span>
              <span>20A: 3.64Ω</span>
              <span>30A: 2.51Ω</span>
              <span>45A: 1.51Ω</span>
              <span>60A: 1.07Ω</span>
            </div>
          </div>
          
          <div className="text-xs">
            <strong className="text-green-400">BS 1362 (Plug-Top):</strong>
            <div className="grid grid-cols-4 gap-1 mt-1 text-white">
              <span>3A: 22.0Ω</span>
              <span>13A: 3.64Ω</span>
            </div>
          </div>
        </div>
      </TabsContent>
    </Tabs>
    
    <p className="text-xs text-muted-foreground mt-3 border-t border-border/30 pt-2">
      Note: Values include Cmin = 0.95 as per BS 7671 Table Notes
    </p>
  </div>
);

export default ZsReferenceValuesCard;
