import { ArrowLeft, MapPin, Sun, Compass, BarChart3, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { section2Questions } from '@/data/upskilling/renewableEnergyModule2QuizData';
import SingleQuestionQuiz from '@/components/upskilling/quiz/SingleQuestionQuiz';

const RenewableEnergyModule2Section2 = () => {
  // Transform quiz data to match SingleQuestionQuiz format
  const quizQuestions = section2Questions.map(q => ({
    id: q.id,
    question: q.question,
    options: q.options,
    correct: q.correctAnswer,
    explanation: q.explanation
  }));

  return (
    <div className="space-y-4 sm:space-y-6 animate-fade-in">
      <div className="px-4 md:px-8 pt-8 pb-12">
        <Link to="../renewable-energy-module-2">
          <Button
            variant="ghost"
            className="text-foreground hover:bg-card hover:text-yellow-400 transition-all duration-200 mb-8 px-4 py-2 rounded-md"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 2
          </Button>
        </Link>
        
        <div className="space-y-6">
          <div>
            <h1 className="text-4xl font-bold text-white mb-4">
              Site Assessment – Orientation, Shading, and Irradiance
            </h1>
            <p className="text-xl text-gray-400 mb-6">
              Evaluating site conditions for optimal solar PV system performance
            </p>
            <div className="flex flex-wrap gap-4">
              <Badge variant="secondary" className="bg-yellow-400 text-black">
                Section 2
              </Badge>
              <Badge variant="outline" className="border-gray-600 text-gray-300">
                Site Assessment
              </Badge>
            </div>
          </div>

          {/* Learning Objectives */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Lightbulb className="h-6 w-6 text-yellow-400" />
                Learning Objectives
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <ul className="text-gray-300 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400 mt-1">•</span>
                  Understand sun-path, azimuth, and tilt angles for optimal positioning
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400 mt-1">•</span>
                  Identify and quantify shading risks throughout the year
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400 mt-1">•</span>
                  Use irradiance data for accurate yield estimates
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Introduction */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Introduction</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 leading-relaxed">
                A great panel in the wrong location is a poor investment. This section shows you how to assess your installation site properly. Site quality determines system performance — careful analysis prevents underperformance and ensures optimal return on investment.
              </p>
            </CardContent>
          </Card>

          {/* Optimal Orientation */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Compass className="h-6 w-6 text-yellow-400" />
                Optimal Orientation and Azimuth
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
                Panel orientation is critical for maximising solar energy capture. In the UK, south-facing installations typically provide optimal performance.
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="bg-blue-900/20 p-4 rounded-lg border border-yellow-400/30">
                  <h4 className="text-yellow-400 font-semibold mb-3">UK Optimal Orientations:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>South (180°):</strong> Maximum annual energy yield</li>
                    <li>• <strong>South-East (135°):</strong> 95-98% of optimal performance</li>
                    <li>• <strong>South-West (225°):</strong> 95-98% of optimal performance</li>
                    <li>• <strong>East/West (90°/270°):</strong> 85-90% of optimal performance</li>
                    <li>• <strong>North-facing:</strong> Not recommended in UK (significant losses)</li>
                  </ul>
                </div>
                <div className="bg-card p-4 rounded-lg border border-gray-600">
                  <h4 className="text-yellow-400 font-semibold mb-3">Azimuth Angle Impact:</h4>
                  <div className="text-sm space-y-2">
                    <p className="text-gray-300">
                      <strong>Definition:</strong> Compass direction the panels face (measured from true south)
                    </p>
                    <ul className="text-gray-300 space-y-1">
                      <li>• <strong>0°:</strong> True south (optimal)</li>
                      <li>• <strong>±30°:</strong> Less than 5% performance loss</li>
                      <li>• <strong>±60°:</strong> 10-15% performance loss</li>
                      <li>• <strong>±90°:</strong> 20-25% performance loss</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-card p-4 rounded-lg border border-gray-600">
                <h4 className="text-yellow-400 font-semibold mb-2">Special Considerations:</h4>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• <strong>Time-of-use tariffs:</strong> West-facing may be beneficial for evening peak rates</li>
                  <li>• <strong>Self-consumption:</strong> East-facing captures morning usage patterns</li>
                  <li>• <strong>Building constraints:</strong> Work within available roof orientations</li>
                  <li>• <strong>Ground-mount systems:</strong> Can achieve optimal orientation regardless of building</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Tilt Angles */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Sun className="h-6 w-6 text-orange-400" />
                Tilt Angles by Latitude
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
                The tilt angle determines how much solar irradiance panels receive throughout the year. Optimal angles vary by latitude and seasonal preferences.
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="bg-orange-900/20 p-4 rounded-lg border border-orange-500/30">
                  <h4 className="text-orange-400 font-semibold mb-3">UK Tilt Recommendations:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>London (51.5°N):</strong> 35-40° optimal tilt</li>
                    <li>• <strong>Birmingham (52.5°N):</strong> 35-40° optimal tilt</li>
                    <li>• <strong>Manchester (53.5°N):</strong> 35-40° optimal tilt</li>
                    <li>• <strong>Edinburgh (55.9°N):</strong> 40-45° optimal tilt</li>
                    <li>• <strong>General rule:</strong> Latitude minus 10-15° for year-round optimisation</li>
                  </ul>
                </div>
                <div className="bg-orange-900/20 p-4 rounded-lg border border-orange-500/30">
                  <h4 className="text-orange-400 font-semibold mb-3">Seasonal Optimisation:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Summer optimal:</strong> Latitude minus 20°</li>
                    <li>• <strong>Winter optimal:</strong> Latitude plus 15°</li>
                    <li>• <strong>Year-round:</strong> Latitude (51-56° in UK)</li>
                    <li>• <strong>Practical range:</strong> 30-50° works well</li>
                    <li>• <strong>Roof pitch:</strong> Often determines final tilt angle</li>
                  </ul>
                </div>
              </div>

              <div className="bg-card p-4 rounded-lg border border-gray-600">
                <h4 className="text-orange-400 font-semibold mb-2">Tilt Angle Effects:</h4>
                <div className="text-gray-300 text-sm space-y-2">
                  <p><strong>Too low (&lt; 25°):</strong> Reduced winter performance, dirt accumulation</p>
                  <p><strong>Optimal (30-45°):</strong> Maximum energy yield, self-cleaning rain effect</p>
                  <p><strong>Too high (&gt; 60°):</strong> Reduced summer performance, wind loading issues</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Shading Analysis */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <MapPin className="h-6 w-6 text-red-400" />
                Shading Analysis and Seasonal Variations
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
                Shading is one of the most critical factors affecting PV system performance. Even partial shading can dramatically reduce output due to the series-connected nature of solar cells.
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="bg-red-900/20 p-4 rounded-lg border border-red-500/30">
                  <h4 className="text-red-400 font-semibold mb-3">Common Shading Sources:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Buildings:</strong> Adjacent structures, chimneys, dormers</li>
                    <li>• <strong>Vegetation:</strong> Trees, large shrubs (consider future growth)</li>
                    <li>• <strong>Infrastructure:</strong> Pylons, telephone poles, antennas</li>
                    <li>• <strong>Roof features:</strong> Vents, satellite dishes, water tanks</li>
                    <li>• <strong>Horizon obstructions:</strong> Hills, mountains, tall buildings</li>
                  </ul>
                </div>
                <div className="bg-red-900/20 p-4 rounded-lg border border-red-500/30">
                  <h4 className="text-red-400 font-semibold mb-3">Seasonal Shading Impact:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Winter:</strong> Sun lower in sky, longer shadows</li>
                    <li>• <strong>Summer:</strong> Sun higher, shorter shadows</li>
                    <li>• <strong>Critical times:</strong> 9am-3pm for maximum impact</li>
                    <li>• <strong>Deciduous trees:</strong> Summer shading, winter clarity</li>
                    <li>• <strong>Assessment period:</strong> Full year analysis required</li>
                  </ul>
                </div>
              </div>

              <div className="bg-card p-4 rounded-lg border border-gray-600">
                <h4 className="text-red-400 font-semibold mb-3">Shading Impact on Performance:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                  <div>
                    <h5 className="text-white font-medium">Single Cell Shading:</h5>
                    <p className="text-gray-300">Can reduce entire string output by 30-50%</p>
                  </div>
                  <div>
                    <h5 className="text-white font-medium">Panel Corner Shading:</h5>
                    <p className="text-gray-300">May reduce panel output by 50-80%</p>
                  </div>
                  <div>
                    <h5 className="text-white font-medium">Partial String Shading:</h5>
                    <p className="text-gray-300">Entire string performs at level of worst panel</p>
                  </div>
                  <div>
                    <h5 className="text-white font-medium">Bypass Diodes:</h5>
                    <p className="text-gray-300">Limit shading impact to panel sub-strings</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Analysis Tools */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <BarChart3 className="h-6 w-6 text-green-400" />
                Solar Analysis Tools and Techniques
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
                Various tools and methods are available for conducting thorough site assessments, from simple manual instruments to sophisticated software simulation.
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="bg-green-900/20 p-4 rounded-lg border border-green-500/30">
                  <h4 className="text-green-400 font-semibold mb-3">Manual Tools:</h4>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• <strong>Solar pathfinder:</strong> Dome-based shading analysis</li>
                    <li>• <strong>Sun-eye:</strong> Digital shading assessment</li>
                    <li>• <strong>Compass:</strong> Azimuth measurements</li>
                    <li>• <strong>Inclinometer:</strong> Tilt angle measurement</li>
                    <li>• <strong>Irradiance meter:</strong> Real-time solar measurements</li>
                  </ul>
                </div>
                <div className="bg-green-900/20 p-4 rounded-lg border border-green-500/30">
                  <h4 className="text-green-400 font-semibold mb-3">Software Tools:</h4>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• <strong>PVsyst:</strong> Professional PV system design</li>
                    <li>• <strong>PVWatts:</strong> NREL online calculator</li>
                    <li>• <strong>SketchUp:</strong> 3D modelling with solar plugins</li>
                    <li>• <strong>PVGIS:</strong> European Commission solar tool</li>
                    <li>• <strong>Aurora Solar:</strong> Advanced sales and design platform</li>
                  </ul>
                </div>
                <div className="bg-green-900/20 p-4 rounded-lg border border-green-500/30">
                  <h4 className="text-green-400 font-semibold mb-3">Satellite-Based:</h4>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• <strong>Google Project Sunroof:</strong> Roof suitability analysis</li>
                    <li>• <strong>LiDAR data:</strong> High-resolution height mapping</li>
                    <li>• <strong>Satellite imagery:</strong> Site context analysis</li>
                    <li>• <strong>GIS mapping:</strong> Geographic information systems</li>
                    <li>• <strong>Drone surveys:</strong> Detailed site assessment</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Irradiance and Solar Resource */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Sun className="h-6 w-6 text-yellow-400" />
                Understanding Irradiance and Solar Resource Data
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
                Solar irradiance data is fundamental for accurate energy yield predictions and system sizing calculations.
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="bg-yellow-900/20 p-4 rounded-lg border border-yellow-400/30">
                  <h4 className="text-yellow-400 font-semibold mb-3">Types of Solar Radiation:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Direct Normal Irradiance (DNI):</strong> Direct sunlight component</li>
                    <li>• <strong>Diffuse Horizontal Irradiance (DHI):</strong> Scattered light from sky</li>
                    <li>• <strong>Global Horizontal Irradiance (GHI):</strong> Total solar radiation</li>
                    <li>• <strong>Global Tilted Irradiance (GTI):</strong> Total on tilted surface</li>
                    <li>• <strong>Plane of Array (POA):</strong> Irradiance on panel surface</li>
                  </ul>
                </div>
                <div className="bg-yellow-900/20 p-4 rounded-lg border border-yellow-400/30">
                  <h4 className="text-yellow-400 font-semibold mb-3">UK Solar Resource:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Annual GHI:</strong> 950-1,200 kWh/m² (varies by region)</li>
                    <li>• <strong>South England:</strong> Higher irradiance (1,100-1,200 kWh/m²)</li>
                    <li>• <strong>North Scotland:</strong> Lower irradiance (900-1,000 kWh/m²)</li>
                    <li>• <strong>Peak month:</strong> May-July (150+ kWh/m²/month)</li>
                    <li>• <strong>Low month:</strong> December-January (10-20 kWh/m²/month)</li>
                  </ul>
                </div>
              </div>

              <div className="bg-card p-4 rounded-lg border border-gray-600">
                <h4 className="text-yellow-400 font-semibold mb-2">Key Irradiance Metrics:</h4>
                <div className="text-gray-300 text-sm space-y-2">
                  <p><strong>Peak Sun Hours (PSH):</strong> Equivalent hours of 1,000 W/m² irradiance per day</p>
                  <p><strong>Standard Test Conditions (STC):</strong> 1,000 W/m², 25°C, AM 1.5 spectrum</p>
                  <p><strong>PVOUT (PV power output):</strong> Expected kWh output per kWp installed</p>
                  <p><strong>Performance Ratio (PR):</strong> Actual vs theoretical system performance</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Real World Example */}
          <Card className="bg-blue-900/20 border-yellow-400/30">
            <CardHeader>
              <CardTitle className="text-yellow-400">Site Assessment Case Study</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 leading-relaxed mb-4">
                A residential property in Manchester has a south-west facing roof (225° azimuth) with a 30° tilt. A large oak tree 15 metres to the south-east causes morning shading from November to February. Using a solar pathfinder, the installer determines the tree causes 8% annual shading losses.
              </p>
              <div className="bg-card p-4 rounded-lg">
                <h4 className="text-yellow-400 font-semibold mb-2">Assessment Results:</h4>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• <strong>Orientation penalty:</strong> 3% loss for 45° off-south orientation</li>
                  <li>• <strong>Tilt penalty:</strong> 2% loss for non-optimal tilt angle</li>
                  <li>• <strong>Shading loss:</strong> 8% annual reduction from tree</li>
                  <li>• <strong>Total site factor:</strong> 87% of optimal site performance</li>
                  <li>• <strong>Recommendation:</strong> Proceed with installation - acceptable losses</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Summary */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 leading-relaxed mb-4">
                Site quality determines system performance — careful analysis prevents underperformance. South-facing orientations with 30-45° tilt provide optimal performance in the UK. Shading analysis is critical, as even small obstructions can significantly impact output. Modern tools make accurate site assessment accessible and cost-effective.
              </p>
              <p className="text-yellow-400 font-medium">
                Remember: A thorough site assessment is the foundation of every successful solar PV installation.
              </p>
            </CardContent>
          </Card>

          {/* Advanced Assessment Tools */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <BarChart3 className="h-6 w-6 text-purple-400" />
                Advanced Site Assessment Technologies
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
                Modern assessment technologies provide unprecedented accuracy in site evaluation and performance prediction.
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/30">
                  <h4 className="text-purple-400 font-semibold mb-3">LiDAR Technology:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>3D mapping:</strong> Precise roof measurements</li>
                    <li>• <strong>Obstruction detection:</strong> Automatic shading analysis</li>
                    <li>• <strong>Roof condition:</strong> Structural integrity assessment</li>
                    <li>• <strong>Accuracy:</strong> ±2cm measurement precision</li>
                    <li>• <strong>Coverage:</strong> Large area rapid surveying</li>
                  </ul>
                </div>
                <div className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/30">
                  <h4 className="text-purple-400 font-semibold mb-3">Drone Surveying:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Photogrammetry:</strong> High-resolution 3D models</li>
                    <li>• <strong>Thermal imaging:</strong> Hot spot and defect detection</li>
                    <li>• <strong>Safety benefits:</strong> Reduced roof access requirements</li>
                    <li>• <strong>Documentation:</strong> Comprehensive visual records</li>
                    <li>• <strong>Speed:</strong> Rapid large-scale assessment</li>
                  </ul>
                </div>
                <div className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/30">
                  <h4 className="text-purple-400 font-semibold mb-3">AI-Powered Analysis:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Satellite analysis:</strong> Automated roof detection</li>
                    <li>• <strong>Shading prediction:</strong> Machine learning algorithms</li>
                    <li>• <strong>Performance modeling:</strong> Weather pattern analysis</li>
                    <li>• <strong>Defect identification:</strong> Automated quality assessment</li>
                    <li>• <strong>Optimization:</strong> Layout and tilt angle suggestions</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Microclimate Considerations */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Sun className="h-6 w-6 text-orange-400" />
                Microclimate and Local Weather Patterns
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
                Local weather patterns and microclimates can significantly impact PV system performance beyond regional averages.
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="bg-orange-900/20 p-4 rounded-lg border border-orange-500/30">
                  <h4 className="text-orange-400 font-semibold mb-3">Urban Heat Island Effects:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Temperature elevation:</strong> 2-5°C higher than rural areas</li>
                    <li>• <strong>Performance impact:</strong> Reduced voltage and efficiency</li>
                    <li>• <strong>Mitigation strategies:</strong> Enhanced ventilation and cooling</li>
                    <li>• <strong>Roof materials:</strong> Light-coloured surfaces reduce heating</li>
                    <li>• <strong>Design consideration:</strong> Temperature derating factors</li>
                  </ul>
                </div>
                <div className="bg-orange-900/20 p-4 rounded-lg border border-orange-500/30">
                  <h4 className="text-orange-400 font-semibold mb-3">Coastal and Highland Variations:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Coastal effects:</strong> Salt air, higher humidity, marine layer</li>
                    <li>• <strong>Highland conditions:</strong> Increased UV, temperature extremes</li>
                    <li>• <strong>Wind patterns:</strong> Cooling effects vs structural loading</li>
                    <li>• <strong>Fog/mist frequency:</strong> Reduced irradiance periods</li>
                    <li>• <strong>Material selection:</strong> Corrosion-resistant components</li>
                  </ul>
                </div>
              </div>

              <div className="bg-card p-4 rounded-lg border border-gray-600">
                <h4 className="text-orange-400 font-semibold mb-2">UK Regional Performance Variations:</h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-600">
                        <th className="text-left text-white p-2">Region</th>
                        <th className="text-left text-white p-2">Annual Irradiance</th>
                        <th className="text-left text-white p-2">Typical Yield (kWh/kWp)</th>
                        <th className="text-left text-white p-2">Key Factors</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-300">
                      <tr className="border-b border-gray-700">
                        <td className="p-2">South-West England</td>
                        <td className="p-2">1,200 kWh/m²</td>
                        <td className="p-2">950-1,050</td>
                        <td className="p-2">High irradiance, marine climate</td>
                      </tr>
                      <tr className="border-b border-gray-700">
                        <td className="p-2">London/South-East</td>
                        <td className="p-2">1,100 kWh/m²</td>
                        <td className="p-2">900-1,000</td>
                        <td className="p-2">Urban heat island, pollution</td>
                      </tr>
                      <tr className="border-b border-gray-700">
                        <td className="p-2">Central England</td>
                        <td className="p-2">1,050 kWh/m²</td>
                        <td className="p-2">850-950</td>
                        <td className="p-2">Continental climate influence</td>
                      </tr>
                      <tr>
                        <td className="p-2">Scotland/Northern</td>
                        <td className="p-2">900 kWh/m²</td>
                        <td className="p-2">750-850</td>
                        <td className="p-2">Lower temperatures, good summer light</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Professional Site Assessment Checklist */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <MapPin className="h-6 w-6 text-green-400" />
                Professional Site Assessment Checklist
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
                A systematic approach ensures no critical factors are overlooked during site evaluation.
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="bg-green-900/20 p-4 rounded-lg border border-green-500/30">
                  <h4 className="text-green-400 font-semibold mb-3">Pre-Visit Assessment:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Satellite imagery review:</strong> Google Earth, Bing Maps analysis</li>
                    <li>• <strong>Planning constraints:</strong> Conservation areas, listed buildings</li>
                    <li>• <strong>Grid connection:</strong> DNO capacity and connection points</li>
                    <li>• <strong>Access routes:</strong> Equipment delivery and installation access</li>
                    <li>• <strong>Neighbouring properties:</strong> Potential shading or planning issues</li>
                  </ul>
                </div>
                <div className="bg-green-900/20 p-4 rounded-lg border border-green-500/30">
                  <h4 className="text-green-400 font-semibold mb-3">On-Site Survey Requirements:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Structural assessment:</strong> Roof condition and load capacity</li>
                    <li>• <strong>Electrical infrastructure:</strong> Consumer unit and earthing systems</li>
                    <li>• <strong>Shading analysis:</strong> Seasonal obstruction mapping</li>
                    <li>• <strong>Safety considerations:</strong> Working at height and site hazards</li>
                    <li>• <strong>Measurement verification:</strong> Precise dimensional survey</li>
                  </ul>
                </div>
              </div>

              <div className="bg-card p-4 rounded-lg border border-gray-600">
                <h4 className="text-green-400 font-semibold mb-2">Documentation Requirements:</h4>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• Site photographs from multiple angles and positions</li>
                  <li>• Detailed measurements and architectural drawings</li>
                  <li>• Shading analysis results with seasonal variations</li>
                  <li>• Electrical system condition and upgrade requirements</li>
                  <li>• Planning and building regulation compliance notes</li>
                  <li>• Health and safety risk assessment documentation</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Quiz Section */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Lightbulb className="h-6 w-6 text-yellow-400" />
                Test Your Knowledge
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 mb-6">
                Test your understanding of site assessment principles and solar resource evaluation.
              </p>
              <SingleQuestionQuiz 
                questions={quizQuestions}
                title="Site Assessment Quiz"
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RenewableEnergyModule2Section2;