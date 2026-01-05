import { Card, CardContent } from '@/components/ui/card';
import { Link, Settings, Zap } from 'lucide-react';

const SmartHomeModule6Section4Intro = () => {
  return (
    <section className="space-y-6">
      <Card className="bg-elec-gray border-transparent">
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold text-foreground mb-4">Introduction</h2>
          <p className="text-foreground leading-relaxed">
            Not every home starts with brand-new smart devices. Many clients already have older systems such as wired alarms, 
            thermostats, or proprietary lighting controls. A big part of smart home installation is bridging these legacy systems 
            with modern hubs and platforms so everything works together. For electricians, this means understanding how to integrate, 
            adapt, or replace older technology while keeping costs manageable and ensuring reliability.
          </p>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-3 gap-4">
        <Card className="bg-elec-gray border-transparent hover:border-elec-yellow/20 transition-all duration-300">
          <CardContent className="p-4 text-center">
            <h3 className="text-lg font-semibold text-foreground mb-2">Compatibility</h3>
            <p className="text-foreground text-sm">Connect old and new systems seamlessly</p>
          </CardContent>
        </Card>

        <Card className="bg-elec-gray border-transparent hover:border-elec-yellow/20 transition-all duration-300">
          <CardContent className="p-4 text-center">
            <h3 className="text-lg font-semibold text-foreground mb-2">Integration</h3>
            <p className="text-foreground text-sm">Bridge hardware and software solutions</p>
          </CardContent>
        </Card>

        <Card className="bg-elec-gray border-transparent hover:border-elec-yellow/20 transition-all duration-300">
          <CardContent className="p-4 text-center">
            <h3 className="text-lg font-semibold text-foreground mb-2">Future-Proofing</h3>
            <p className="text-foreground text-sm">Extend system lifespan while adding smart features</p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default SmartHomeModule6Section4Intro;