import { Card, CardContent } from '@/components/ui/card';

const SmartHomeModule6Section5Intro = () => {
  return (
    <section className="space-y-6">
      <Card className="bg-elec-gray border-transparent">
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold text-foreground mb-4">Introduction</h2>
          <p className="text-foreground leading-relaxed mb-4">
            Smart homes often combine devices from multiple brands, hubs, and platforms. While this flexibility is powerful, 
            it can also cause ecosystem conflicts — where devices don't talk to each other properly, routines fail, or 
            apps overlap. For electricians, troubleshooting these issues is key to delivering a reliable installation 
            and keeping clients confident in their system.
          </p>
          <p className="text-foreground leading-relaxed">
            Understanding how different smart home ecosystems interact, identifying potential conflict points, and having 
            a systematic approach to resolving issues will help you maintain client satisfaction and system reliability.
          </p>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-3 gap-4">
        <Card className="bg-elec-gray border-transparent hover:border-elec-yellow/20 transition-all duration-300">
          <CardContent className="p-4 text-center">
            <h3 className="text-lg font-semibold text-foreground mb-2">Multi-Brand Systems</h3>
            <p className="text-foreground text-sm">Navigate compatibility challenges across different manufacturers</p>
          </CardContent>
        </Card>

        <Card className="bg-elec-gray border-transparent hover:border-elec-yellow/20 transition-all duration-300">
          <CardContent className="p-4 text-center">
            <h3 className="text-lg font-semibold text-foreground mb-2">Systematic Diagnosis</h3>
            <p className="text-foreground text-sm">Apply structured troubleshooting methods to resolve conflicts</p>
          </CardContent>
        </Card>

        <Card className="bg-elec-gray border-transparent hover:border-elec-yellow/20 transition-all duration-300">
          <CardContent className="p-4 text-center">
            <h3 className="text-lg font-semibold text-foreground mb-2">Client Confidence</h3>
            <p className="text-foreground text-sm">Maintain system reliability and user satisfaction</p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default SmartHomeModule6Section5Intro;