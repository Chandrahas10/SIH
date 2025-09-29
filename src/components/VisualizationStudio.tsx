import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Slider } from './ui/slider';
import { Label } from './ui/label';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ScatterChart, Scatter } from 'recharts';
import { 
  BarChart3, 
  Map, 
  LineChart as LineIcon, 
  PieChart, 
  Layers, 
  Download, 
  Share2, 
  Settings,
  Plus,
  X,
  Move,
  TrendingUp,
  Sliders,
  Play,
  Pause,
  RotateCcw,
  Eye,
  EyeOff
} from 'lucide-react';

export function VisualizationStudio() {
  // Mock data for charts - Define data first
  const temperatureData = [
    { month: 'Jan', temperature: 24.5, depth: 10, salinity: 35.2 },
    { month: 'Feb', temperature: 25.1, depth: 15, salinity: 35.1 },
    { month: 'Mar', temperature: 26.3, depth: 20, salinity: 35.0 },
    { month: 'Apr', temperature: 27.8, depth: 25, salinity: 34.9 },
    { month: 'May', temperature: 28.9, depth: 30, salinity: 34.8 },
    { month: 'Jun', temperature: 29.5, depth: 35, salinity: 34.7 },
    { month: 'Jul', temperature: 29.2, depth: 40, salinity: 34.8 },
    { month: 'Aug', temperature: 28.7, depth: 45, salinity: 34.9 },
    { month: 'Sep', temperature: 28.1, depth: 50, salinity: 35.0 },
    { month: 'Oct', temperature: 27.2, depth: 45, salinity: 35.1 },
    { month: 'Nov', temperature: 26.0, depth: 40, salinity: 35.2 },
    { month: 'Dec', temperature: 25.2, depth: 35, salinity: 35.3 }
  ];

  const fishAbundanceData = [
    { month: 'Jan', tuna: 45, sardine: 120, mackerel: 85 },
    { month: 'Feb', tuna: 52, sardine: 135, mackerel: 92 },
    { month: 'Mar', tuna: 48, sardine: 142, mackerel: 78 },
    { month: 'Apr', tuna: 61, sardine: 158, mackerel: 95 },
    { month: 'May', tuna: 73, sardine: 175, mackerel: 112 },
    { month: 'Jun', tuna: 89, sardine: 145, mackerel: 125 },
    { month: 'Jul', tuna: 95, sardine: 132, mackerel: 138 },
    { month: 'Aug', tuna: 87, sardine: 128, mackerel: 142 },
    { month: 'Sep', tuna: 76, sardine: 156, mackerel: 118 },
    { month: 'Oct', tuna: 68, sardine: 168, mackerel: 105 },
    { month: 'Nov', tuna: 59, sardine: 151, mackerel: 98 },
    { month: 'Dec', tuna: 51, sardine: 138, mackerel: 88 }
  ];

  const correlationData = temperatureData.map((temp, index) => ({
    temperature: temp.temperature,
    fishAbundance: fishAbundanceData[index].tuna + fishAbundanceData[index].sardine + fishAbundanceData[index].mackerel,
    month: temp.month
  }));

  const availableVariables = [
    { id: 'temperature', label: 'Sea Surface Temperature', category: 'Physical', color: '#ef4444' },
    { id: 'salinity', label: 'Salinity', category: 'Physical', color: '#3b82f6' },
    { id: 'chlorophyll', label: 'Chlorophyll-a', category: 'Biological', color: '#22c55e' },
    { id: 'fish-abundance', label: 'Fish Abundance', category: 'Biological', color: '#f59e0b' },
    { id: 'depth', label: 'Depth', category: 'Physical', color: '#8b5cf6' },
    { id: 'current-speed', label: 'Current Speed', category: 'Physical', color: '#06b6d4' },
  ];

  // State declarations after data definitions
  const [selectedDatasets, setSelectedDatasets] = useState<string[]>(['temp-data', 'fish-abundance']);
  const [chartType, setChartType] = useState('line');
  const [mapLayers, setMapLayers] = useState(['temperature', 'chlorophyll']);
  
  // Interactive Controls State
  const [temperatureRange, setTemperatureRange] = useState([24, 30]);
  const [depthRange, setDepthRange] = useState([0, 100]);
  const [timeRange, setTimeRange] = useState([1, 12]);
  const [salinityRange, setSalinityRange] = useState([34, 36]);
  const [fishAbundanceThreshold, setFishAbundanceThreshold] = useState([0, 400]);
  
  // Animation and display controls
  const [isAnimating, setIsAnimating] = useState(false);
  const [showCorrelation, setShowCorrelation] = useState(true);
  const [animationSpeed, setAnimationSpeed] = useState([1]);
  const [dataOpacity, setDataOpacity] = useState([80]);
  
  // Filtered data based on controls
  const [filteredData, setFilteredData] = useState(temperatureData);
  const [selectedVariables, setSelectedVariables] = useState(['temperature', 'fish-abundance']);

  // Filter data based on control parameters
  useEffect(() => {
    const filtered = temperatureData.filter((dataPoint, index) => {
      const monthIndex = index + 1; // Jan = 1, Feb = 2, etc.
      const fishData = fishAbundanceData[index];
      const totalFish = fishData ? fishData.tuna + fishData.sardine + fishData.mackerel : 0;
      
      return (
        dataPoint.temperature >= temperatureRange[0] && 
        dataPoint.temperature <= temperatureRange[1] &&
        dataPoint.depth >= depthRange[0] && 
        dataPoint.depth <= depthRange[1] &&
        monthIndex >= timeRange[0] && 
        monthIndex <= timeRange[1] &&
        dataPoint.salinity >= salinityRange[0] && 
        dataPoint.salinity <= salinityRange[1] &&
        totalFish >= fishAbundanceThreshold[0] && 
        totalFish <= fishAbundanceThreshold[1]
      );
    });
    setFilteredData(filtered);
  }, [temperatureRange, depthRange, timeRange, salinityRange, fishAbundanceThreshold]);

  const handleVariableDrop = (variableId: string, dropZone: string) => {
    if (dropZone === 'compare' && !selectedVariables.includes(variableId)) {
      setSelectedVariables([...selectedVariables, variableId]);
    }
  };

  const removeVariable = (variableId: string) => {
    setSelectedVariables(selectedVariables.filter(id => id !== variableId));
  };

  const renderChart = () => {
    const chartData = filteredData.length > 0 ? filteredData : temperatureData;
    const opacity = dataOpacity[0] / 100;
    
    switch (chartType) {
      case 'line':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="month" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1e293b', 
                  border: '1px solid #334155',
                  borderRadius: '8px',
                  color: '#f1f5f9'
                }} 
              />
              <Legend />
              <Line type="monotone" dataKey="temperature" stroke="#ef4444" strokeWidth={3} strokeOpacity={opacity} dot={{ fill: '#ef4444', strokeWidth: 2, r: 4 }} />
              <Line type="monotone" dataKey="salinity" stroke="#3b82f6" strokeWidth={3} strokeOpacity={opacity} dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        );
      case 'area':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <AreaChart data={fishAbundanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="month" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1e293b', 
                  border: '1px solid #334155',
                  borderRadius: '8px',
                  color: '#f1f5f9'
                }} 
              />
              <Legend />
              <Area type="monotone" dataKey="tuna" stackId="1" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.7} />
              <Area type="monotone" dataKey="sardine" stackId="1" stroke="#22c55e" fill="#22c55e" fillOpacity={0.7} />
              <Area type="monotone" dataKey="mackerel" stackId="1" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.7} />
            </AreaChart>
          </ResponsiveContainer>
        );
      case 'scatter':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <ScatterChart data={correlationData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="temperature" name="Temperature" unit="°C" stroke="#94a3b8" />
              <YAxis dataKey="fishAbundance" name="Fish Abundance" stroke="#94a3b8" />
              <Tooltip 
                cursor={{ strokeDasharray: '3 3' }}
                contentStyle={{ 
                  backgroundColor: '#1e293b', 
                  border: '1px solid #334155',
                  borderRadius: '8px',
                  color: '#f1f5f9'
                }} 
              />
              <Scatter dataKey="fishAbundance" fill="#06b6d4" />
            </ScatterChart>
          </ResponsiveContainer>
        );
      default:
        return (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={fishAbundanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="month" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1e293b', 
                  border: '1px solid #334155',
                  borderRadius: '8px',
                  color: '#f1f5f9'
                }} 
              />
              <Legend />
              <Bar dataKey="tuna" fill="#f59e0b" radius={[2, 2, 0, 0]} />
              <Bar dataKey="sardine" fill="#22c55e" radius={[2, 2, 0, 0]} />
              <Bar dataKey="mackerel" fill="#8b5cf6" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-blue-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="mb-4 text-4xl font-bold text-white">Visualization Studio</h1>
          <p className="text-xl text-blue-200">
            Create interactive charts and maps for cross-disciplinary correlation analysis
          </p>
        </motion.div>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          {/* Variables Panel */}
          <motion.div
            className="xl:col-span-1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="bg-blue-900/30 border-blue-700/50 mb-6">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <BarChart3 className="w-5 h-5 mr-2" />
                  Variables
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {availableVariables.map((variable) => (
                    <motion.div
                      key={variable.id}
                      className="p-3 bg-blue-800/30 border border-blue-600/50 rounded-lg cursor-move hover:bg-blue-800/50 transition-colors"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      draggable
                      onDragStart={(e) => {
                        e.dataTransfer.setData('text/plain', variable.id);
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm font-medium text-white">{variable.label}</div>
                          <div className="text-xs text-blue-300">{variable.category}</div>
                        </div>
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: variable.color }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Compare Box */}
            <Card className="bg-blue-900/30 border-blue-700/50 mb-6">
              <CardHeader>
                <CardTitle className="text-white text-sm">Compare Variables</CardTitle>
              </CardHeader>
              <CardContent>
                <div
                  className="min-h-24 p-4 border-2 border-dashed border-cyan-400/50 rounded-lg bg-cyan-400/5"
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    e.preventDefault();
                    const variableId = e.dataTransfer.getData('text/plain');
                    handleVariableDrop(variableId, 'compare');
                  }}
                >
                  {selectedVariables.length === 0 ? (
                    <div className="text-center text-cyan-400/70 text-sm">
                      Drag variables here to compare
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {selectedVariables.map((variableId) => {
                        const variable = availableVariables.find(v => v.id === variableId);
                        if (!variable) return null;
                        return (
                          <div key={variableId} className="flex items-center justify-between bg-blue-800/50 p-2 rounded">
                            <span className="text-sm text-white">{variable.label}</span>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => removeVariable(variableId)}
                              className="h-6 w-6 p-0 text-blue-300 hover:text-red-400"
                            >
                              <X className="w-3 h-3" />
                            </Button>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Interactive Controls */}
            <Card className="bg-blue-900/30 border-blue-700/50">
              <CardHeader>
                <CardTitle className="text-white text-sm flex items-center">
                  <Sliders className="w-4 h-4 mr-2" />
                  Interactive Controls
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Temperature Range */}
                <div>
                  <Label className="text-blue-200 text-sm">Temperature Range (°C)</Label>
                  <div className="mt-2 px-2">
                    <Slider
                      value={temperatureRange}
                      onValueChange={setTemperatureRange}
                      min={20}
                      max={35}
                      step={0.5}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-blue-300 mt-1">
                      <span>{temperatureRange[0]}°C</span>
                      <span>{temperatureRange[1]}°C</span>
                    </div>
                  </div>
                </div>

                {/* Depth Range */}
                <div>
                  <Label className="text-blue-200 text-sm">Depth Range (m)</Label>
                  <div className="mt-2 px-2">
                    <Slider
                      value={depthRange}
                      onValueChange={setDepthRange}
                      min={0}
                      max={200}
                      step={5}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-blue-300 mt-1">
                      <span>{depthRange[0]}m</span>
                      <span>{depthRange[1]}m</span>
                    </div>
                  </div>
                </div>

                {/* Time Range */}
                <div>
                  <Label className="text-blue-200 text-sm">Time Period (Months)</Label>
                  <div className="mt-2 px-2">
                    <Slider
                      value={timeRange}
                      onValueChange={setTimeRange}
                      min={1}
                      max={12}
                      step={1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-blue-300 mt-1">
                      <span>Month {timeRange[0]}</span>
                      <span>Month {timeRange[1]}</span>
                    </div>
                  </div>
                </div>

                {/* Fish Abundance Threshold */}
                <div>
                  <Label className="text-blue-200 text-sm">Fish Abundance</Label>
                  <div className="mt-2 px-2">
                    <Slider
                      value={fishAbundanceThreshold}
                      onValueChange={setFishAbundanceThreshold}
                      min={0}
                      max={500}
                      step={10}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-blue-300 mt-1">
                      <span>{fishAbundanceThreshold[0]}</span>
                      <span>{fishAbundanceThreshold[1]}</span>
                    </div>
                  </div>
                </div>

                {/* Data Opacity */}
                <div>
                  <Label className="text-blue-200 text-sm">Data Opacity</Label>
                  <div className="mt-2 px-2">
                    <Slider
                      value={dataOpacity}
                      onValueChange={setDataOpacity}
                      min={10}
                      max={100}
                      step={5}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-blue-300 mt-1">
                      <span>10%</span>
                      <span>{dataOpacity[0]}%</span>
                      <span>100%</span>
                    </div>
                  </div>
                </div>

                {/* Animation Controls */}
                <div className="space-y-3">
                  <Label className="text-blue-200 text-sm">Animation</Label>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setIsAnimating(!isAnimating)}
                      className="border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-blue-950"
                    >
                      {isAnimating ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setTemperatureRange([24, 30]);
                        setDepthRange([0, 100]);
                        setTimeRange([1, 12]);
                        setSalinityRange([34, 36]);
                        setFishAbundanceThreshold([0, 400]);
                        setDataOpacity([80]);
                      }}
                      className="border-blue-600 text-blue-200"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  <div>
                    <Label className="text-blue-200 text-xs">Speed</Label>
                    <div className="mt-1 px-2">
                      <Slider
                        value={animationSpeed}
                        onValueChange={setAnimationSpeed}
                        min={0.1}
                        max={3}
                        step={0.1}
                        className="w-full"
                      />
                    </div>
                  </div>
                </div>

                {/* Toggle Controls */}
                <div className="space-y-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setShowCorrelation(!showCorrelation)}
                    className={`w-full ${showCorrelation ? 'border-cyan-400 text-cyan-400' : 'border-blue-600 text-blue-200'}`}
                  >
                    {showCorrelation ? <Eye className="w-4 h-4 mr-2" /> : <EyeOff className="w-4 h-4 mr-2" />}
                    Correlation Analysis
                  </Button>
                </div>

                {/* Data Summary */}
                <div className="pt-3 border-t border-blue-700/50">
                  <div className="text-xs text-blue-300 space-y-1">
                    <div className="flex justify-between">
                      <span>Filtered Points:</span>
                      <span className="text-cyan-400">{filteredData.length}/12</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Variables:</span>
                      <span className="text-cyan-400">{selectedVariables.length}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Main Visualization Area */}
          <motion.div
            className="xl:col-span-3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Tabs defaultValue="charts" className="space-y-6">
              <div className="flex items-center justify-between">
                <TabsList className="bg-blue-900/50 border border-blue-700/50">
                  <TabsTrigger value="charts" className="data-[state=active]:bg-cyan-500 data-[state=active]:text-white">
                    <LineIcon className="w-4 h-4 mr-2" />
                    Charts
                  </TabsTrigger>
                  <TabsTrigger value="maps" className="data-[state=active]:bg-cyan-500 data-[state=active]:text-white">
                    <Map className="w-4 h-4 mr-2" />
                    Maps
                  </TabsTrigger>
                </TabsList>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="border-blue-600 text-blue-200">
                    <Settings className="w-4 h-4 mr-2" />
                    Settings
                  </Button>
                  <Button variant="outline" size="sm" className="border-blue-600 text-blue-200">
                    <Share2 className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                  <Button variant="outline" size="sm" className="border-blue-600 text-blue-200">
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                </div>
              </div>

              <TabsContent value="charts">
                <Card className="bg-blue-900/30 border-blue-700/50">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-white">Interactive Charts</CardTitle>
                      <div className="flex gap-2">
                        <Select value={chartType} onValueChange={setChartType}>
                          <SelectTrigger className="w-40 bg-blue-800/50 border-blue-600 text-white">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="line">Line Chart</SelectItem>
                            <SelectItem value="area">Area Chart</SelectItem>
                            <SelectItem value="bar">Bar Chart</SelectItem>
                            <SelectItem value="scatter">Scatter Plot</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-slate-900/50 rounded-lg p-4">
                      {renderChart()}
                    </div>
                    
                    {/* Chart Controls */}
                    <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
                      <Card className="bg-blue-800/30 border-blue-600/50">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-blue-200">Zoom & Pan</span>
                            <Button size="sm" variant="outline" className="border-blue-600 text-blue-200">
                              <Move className="w-4 h-4" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="bg-blue-800/30 border-blue-600/50">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-blue-200">Correlation</span>
                            <div className="flex items-center text-cyan-400">
                              <TrendingUp className="w-4 h-4 mr-1" />
                              <span className="text-sm font-semibold">
                                {showCorrelation ? '0.78' : '--'}
                              </span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="bg-blue-800/30 border-blue-600/50">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-blue-200">Data Points</span>
                            <span className="text-sm font-semibold text-white">{filteredData.length}</span>
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="bg-blue-800/30 border-blue-600/50">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-blue-200">Animation</span>
                            <Badge className={isAnimating ? 'bg-green-500' : 'bg-gray-500'}>
                              {isAnimating ? 'Active' : 'Paused'}
                            </Badge>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Advanced Analytics Panel */}
                    {showCorrelation && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="mt-6 p-4 bg-green-500/10 border border-green-500/30 rounded-lg"
                      >
                        <h4 className="text-green-400 font-semibold mb-3 flex items-center">
                          <TrendingUp className="w-4 h-4 mr-2" />
                          Correlation Analysis Results
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                          <div>
                            <span className="text-green-300">Temperature vs Fish Abundance:</span>
                            <div className="text-white font-semibold">r = 0.78 (Strong positive)</div>
                          </div>
                          <div>
                            <span className="text-green-300">Depth vs Salinity:</span>
                            <div className="text-white font-semibold">r = -0.45 (Moderate negative)</div>
                          </div>
                          <div>
                            <span className="text-green-300">Seasonal Variance:</span>
                            <div className="text-white font-semibold">σ² = 2.34 (Low)</div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="maps">
                <Card className="bg-blue-900/30 border-blue-700/50">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-white">Layered Map Visualization</CardTitle>
                      <Button size="sm" className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Layer
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {/* Map Placeholder */}
                    <div className="h-96 bg-slate-900/50 rounded-lg flex items-center justify-center mb-6">
                      <div className="text-center text-blue-300">
                        <Map className="w-16 h-16 mx-auto mb-4 opacity-50" />
                        <h3 className="text-xl font-semibold mb-2">Interactive Map</h3>
                        <p>Temperature, chlorophyll, and fish abundance layers</p>
                      </div>
                    </div>

                    {/* Layer Controls */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="text-lg font-semibold text-white flex items-center">
                          <Layers className="w-5 h-5 mr-2" />
                          Interactive Map Layers
                        </h4>
                        <Badge className="bg-blue-500">
                          Real-time Data
                        </Badge>
                      </div>
                      
                      {[
                        { id: 'temperature', name: 'Sea Surface Temperature', color: '#ef4444', opacity: 0.7, active: true },
                        { id: 'chlorophyll', name: 'Chlorophyll-a Concentration', color: '#22c55e', opacity: 0.6, active: true },
                        { id: 'fish-abundance', name: 'Fish Abundance', color: '#f59e0b', opacity: 0.8, active: false },
                        { id: 'fishing-zones', name: 'Fishing Zone Boundaries', color: '#8b5cf6', opacity: 0.5, active: false },
                        { id: 'currents', name: 'Ocean Currents', color: '#06b6d4', opacity: 0.9, active: false }
                      ].map((layer) => (
                        <motion.div 
                          key={layer.id} 
                          className={`p-3 rounded-lg border transition-all duration-200 ${
                            layer.active 
                              ? 'bg-blue-800/30 border-cyan-400/50' 
                              : 'bg-blue-800/10 border-blue-600/30'
                          }`}
                          whileHover={{ scale: 1.02 }}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center">
                              <div 
                                className="w-4 h-4 rounded mr-3" 
                                style={{ backgroundColor: layer.color, opacity: layer.active ? layer.opacity : 0.3 }}
                              />
                              <span className={layer.active ? 'text-white' : 'text-blue-300'}>{layer.name}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button 
                                size="sm" 
                                variant="ghost" 
                                className={layer.active ? 'text-cyan-400' : 'text-blue-400'}
                              >
                                {layer.active ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                              </Button>
                              <Button size="sm" variant="ghost" className="text-blue-400 hover:text-red-400">
                                <Settings className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                          
                          {layer.active && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              className="space-y-2"
                            >
                              <div>
                                <Label className="text-xs text-blue-200">Opacity: {Math.round(layer.opacity * 100)}%</Label>
                                <Slider
                                  value={[layer.opacity * 100]}
                                  onValueChange={(value) => {
                                    // Update layer opacity
                                    console.log(`Update ${layer.id} opacity to ${value[0]}%`);
                                  }}
                                  min={10}
                                  max={100}
                                  step={5}
                                  className="mt-1"
                                />
                              </div>
                              
                              <div className="flex gap-2 text-xs">
                                <Badge variant="outline" className="border-blue-600 text-blue-300">
                                  {layer.id === 'temperature' ? '24-30°C' : 
                                   layer.id === 'chlorophyll' ? '0.1-2.5 mg/m³' :
                                   layer.id === 'fish-abundance' ? 'High density' :
                                   layer.id === 'fishing-zones' ? '12 zones' :
                                   '0.2-1.8 m/s'}
                                </Badge>
                                <Badge variant="outline" className="border-green-600 text-green-300">
                                  Live
                                </Badge>
                              </div>
                            </motion.div>
                          )}
                        </motion.div>
                      ))}
                      
                      {/* Map View Controls */}
                      <div className="pt-4 border-t border-blue-700/50">
                        <h5 className="text-white font-semibold mb-3">Map View Options</h5>
                        <div className="grid grid-cols-2 gap-2">
                          <Button variant="outline" size="sm" className="border-blue-600 text-blue-200">
                            Satellite
                          </Button>
                          <Button variant="outline" size="sm" className="border-blue-600 text-blue-200">
                            Bathymetry
                          </Button>
                          <Button variant="outline" size="sm" className="border-blue-600 text-blue-200">
                            Navigation
                          </Button>
                          <Button variant="outline" size="sm" className="border-cyan-400 text-cyan-400">
                            Analysis
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </div>
    </div>
  );
}