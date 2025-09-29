import { useState } from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Checkbox } from './ui/checkbox';
import { Switch } from './ui/switch';
import { 
  FileText, 
  Download, 
  Share2, 
  BarChart3, 
  Map, 
  Table, 
  Eye, 
  Settings,
  Calendar,
  Database,
  Filter,
  Zap,
  Clock,
  CheckCircle
} from 'lucide-react';

export function ReportsModule() {
  const [selectedDatasets, setSelectedDatasets] = useState<string[]>(['oceanography', 'biodiversity']);
  const [reportType, setReportType] = useState('comprehensive');
  const [viewMode, setViewMode] = useState('preview');
  const [includeCharts, setIncludeCharts] = useState(true);
  const [includeMaps, setIncludeMaps] = useState(true);
  const [includeStatistics, setIncludeStatistics] = useState(true);

  const availableDatasets = [
    { id: 'oceanography', name: 'Oceanographic Parameters', records: '15,234', status: 'active' },
    { id: 'biodiversity', name: 'Biodiversity Assessment', records: '8,567', status: 'active' },
    { id: 'fisheries', name: 'Fisheries Data', records: '12,891', status: 'active' },
    { id: 'edna', name: 'eDNA Analysis', records: '2,456', status: 'active' },
    { id: 'taxonomy', name: 'Taxonomy & Morphology', records: '5,678', status: 'active' }
  ];

  const recentReports = [
    {
      title: 'Arabian Sea Biodiversity Assessment 2024',
      type: 'Comprehensive Report',
      date: '2024-01-15',
      status: 'published',
      downloads: 1247,
      datasets: ['oceanography', 'biodiversity', 'fisheries']
    },
    {
      title: 'Mumbai Coast Fish Stock Analysis',
      type: 'Fisheries Report',
      date: '2024-01-10',
      status: 'published',
      downloads: 892,
      datasets: ['fisheries', 'taxonomy']
    },
    {
      title: 'Lakshadweep Coral Health Monitoring',
      type: 'Environmental Report',
      date: '2024-01-08',
      status: 'draft',
      downloads: 0,
      datasets: ['biodiversity', 'edna', 'oceanography']
    },
    {
      title: 'Indian Ocean Temperature Trends',
      type: 'Climate Report',
      date: '2024-01-05',
      status: 'published',
      downloads: 1563,
      datasets: ['oceanography']
    }
  ];

  const reportTemplates = [
    {
      id: 'comprehensive',
      name: 'Comprehensive Analysis',
      description: 'Full ecosystem assessment with all available data',
      sections: ['Executive Summary', 'Methodology', 'Data Analysis', 'Species Assessment', 'Environmental Factors', 'Conclusions', 'Recommendations']
    },
    {
      id: 'fisheries',
      name: 'Fisheries Assessment',
      description: 'Focus on fish stocks and commercial species',
      sections: ['Stock Status', 'Catch Analysis', 'Population Dynamics', 'Management Recommendations']
    },
    {
      id: 'environmental',
      name: 'Environmental Impact',
      description: 'Environmental conditions and ecosystem health',
      sections: ['Environmental Parameters', 'Ecosystem Health', 'Trend Analysis', 'Impact Assessment']
    },
    {
      id: 'biodiversity',
      name: 'Biodiversity Report',
      description: 'Species diversity and distribution analysis',
      sections: ['Species Inventory', 'Diversity Indices', 'Distribution Patterns', 'Conservation Status']
    }
  ];

  const handleDatasetToggle = (datasetId: string) => {
    setSelectedDatasets(prev => 
      prev.includes(datasetId) 
        ? prev.filter(id => id !== datasetId)
        : [...prev, datasetId]
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-500';
      case 'draft': return 'bg-yellow-500';
      case 'processing': return 'bg-blue-500';
      default: return 'bg-gray-500';
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
          <h1 className="mb-4 text-4xl font-bold text-white">Reports & Insights</h1>
          <p className="text-xl text-blue-200">
            Generate and export integrated reports from marine research data
          </p>
        </motion.div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Report Builder */}
          <motion.div
            className="xl:col-span-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Tabs defaultValue="builder" className="space-y-6">
              <TabsList className="bg-blue-900/50 border border-blue-700/50">
                <TabsTrigger value="builder" className="data-[state=active]:bg-cyan-500 data-[state=active]:text-white">
                  <Settings className="w-4 h-4 mr-2" />
                  Report Builder
                </TabsTrigger>
                <TabsTrigger value="preview" className="data-[state=active]:bg-cyan-500 data-[state=active]:text-white">
                  <Eye className="w-4 h-4 mr-2" />
                  Preview
                </TabsTrigger>
                <TabsTrigger value="history" className="data-[state=active]:bg-cyan-500 data-[state=active]:text-white">
                  <Clock className="w-4 h-4 mr-2" />
                  Recent Reports
                </TabsTrigger>
              </TabsList>

              <TabsContent value="builder">
                <Card className="bg-blue-900/30 border-blue-700/50">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <Zap className="w-5 h-5 mr-2" />
                      Interactive Report Wizard
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Step 1: Report Type */}
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-4">1. Select Report Template</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {reportTemplates.map((template) => (
                          <motion.div
                            key={template.id}
                            className={`p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
                              reportType === template.id
                                ? 'border-cyan-400 bg-cyan-400/10'
                                : 'border-blue-600/50 bg-blue-800/20 hover:border-cyan-400/50'
                            }`}
                            onClick={() => setReportType(template.id)}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <h4 className="font-semibold text-white mb-2">{template.name}</h4>
                            <p className="text-sm text-blue-200 mb-3">{template.description}</p>
                            <div className="text-xs text-blue-300">
                              {template.sections.length} sections included
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Step 2: Data Selection */}
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-4">2. Select Datasets</h3>
                      <div className="space-y-3">
                        {availableDatasets.map((dataset) => (
                          <div key={dataset.id} className="flex items-center justify-between p-3 bg-blue-800/30 rounded-lg">
                            <div className="flex items-center space-x-3">
                              <Checkbox
                                id={dataset.id}
                                checked={selectedDatasets.includes(dataset.id)}
                                onCheckedChange={() => handleDatasetToggle(dataset.id)}
                                className="border-cyan-400"
                              />
                              <label htmlFor={dataset.id} className="text-white cursor-pointer">
                                {dataset.name}
                              </label>
                            </div>
                            <div className="text-right">
                              <div className="text-sm text-cyan-400">{dataset.records} records</div>
                              <Badge className={getStatusColor(dataset.status)}>
                                {dataset.status}
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Step 3: Content Options */}
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-4">3. Content Options</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="flex items-center justify-between p-3 bg-blue-800/30 rounded-lg">
                          <div className="flex items-center">
                            <BarChart3 className="w-5 h-5 mr-2 text-cyan-400" />
                            <span className="text-white">Include Charts</span>
                          </div>
                          <Switch
                            checked={includeCharts}
                            onCheckedChange={setIncludeCharts}
                          />
                        </div>
                        <div className="flex items-center justify-between p-3 bg-blue-800/30 rounded-lg">
                          <div className="flex items-center">
                            <Map className="w-5 h-5 mr-2 text-cyan-400" />
                            <span className="text-white">Include Maps</span>
                          </div>
                          <Switch
                            checked={includeMaps}
                            onCheckedChange={setIncludeMaps}
                          />
                        </div>
                        <div className="flex items-center justify-between p-3 bg-blue-800/30 rounded-lg">
                          <div className="flex items-center">
                            <Table className="w-5 h-5 mr-2 text-cyan-400" />
                            <span className="text-white">Include Statistics</span>
                          </div>
                          <Switch
                            checked={includeStatistics}
                            onCheckedChange={setIncludeStatistics}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Step 4: Time Range */}
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-4">4. Time Range</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-blue-200 mb-2">
                            Start Date
                          </label>
                          <input
                            type="date"
                            className="w-full px-3 py-2 bg-blue-800/50 border border-blue-600 rounded-md text-white"
                            defaultValue="2024-01-01"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-blue-200 mb-2">
                            End Date
                          </label>
                          <input
                            type="date"
                            className="w-full px-3 py-2 bg-blue-800/50 border border-blue-600 rounded-md text-white"
                            defaultValue="2024-12-31"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <Button
                        className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white"
                        onClick={() => setViewMode('preview')}
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        Preview Report
                      </Button>
                      <Button
                        variant="outline"
                        className="border-green-500 text-green-400 hover:bg-green-500 hover:text-white"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Generate PDF
                      </Button>
                      <Button
                        variant="outline"
                        className="border-blue-600 text-blue-200"
                      >
                        <Share2 className="w-4 h-4 mr-2" />
                        Share Link
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="preview">
                <Card className="bg-blue-900/30 border-blue-700/50">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-white flex items-center">
                        <Eye className="w-5 h-5 mr-2" />
                        Report Preview
                      </CardTitle>
                      <div className="flex gap-2">
                        <Select value={viewMode} onValueChange={setViewMode}>
                          <SelectTrigger className="w-32 bg-blue-800/50 border-blue-600 text-white">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="preview">Preview</SelectItem>
                            <SelectItem value="table">Table View</SelectItem>
                            <SelectItem value="chart">Chart View</SelectItem>
                            <SelectItem value="map">Map View</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-white rounded-lg p-6 text-gray-900 min-h-96">
                      {/* Mock Report Preview */}
                      <div className="border-b border-gray-200 pb-4 mb-6">
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">
                          Arabian Sea Marine Ecosystem Assessment 2024
                        </h1>
                        <p className="text-gray-600">
                          Generated on {new Date().toLocaleDateString()} | {selectedDatasets.length} datasets analyzed
                        </p>
                      </div>

                      <div className="space-y-6">
                        <section>
                          <h2 className="text-xl font-semibold text-gray-900 mb-3">Executive Summary</h2>
                          <p className="text-gray-700 leading-relaxed">
                            This comprehensive analysis covers oceanographic parameters, biodiversity assessment, 
                            and ecosystem health indicators across the Arabian Sea region. Data from {selectedDatasets.length} primary 
                            datasets spanning January to December 2024 reveals significant patterns in marine ecosystem dynamics.
                          </p>
                        </section>

                        {includeStatistics && (
                          <section>
                            <h2 className="text-xl font-semibold text-gray-900 mb-3">Key Statistics</h2>
                            <div className="grid grid-cols-3 gap-4">
                              <div className="bg-blue-50 p-4 rounded">
                                <div className="text-2xl font-bold text-blue-600">15,234</div>
                                <div className="text-sm text-gray-600">Total Records</div>
                              </div>
                              <div className="bg-green-50 p-4 rounded">
                                <div className="text-2xl font-bold text-green-600">234</div>
                                <div className="text-sm text-gray-600">Species Identified</div>
                              </div>
                              <div className="bg-orange-50 p-4 rounded">
                                <div className="text-2xl font-bold text-orange-600">24.5°C</div>
                                <div className="text-sm text-gray-600">Avg Temperature</div>
                              </div>
                            </div>
                          </section>
                        )}

                        {includeCharts && (
                          <section>
                            <h2 className="text-xl font-semibold text-gray-900 mb-3">Data Visualization</h2>
                            <div className="bg-gray-100 h-48 rounded flex items-center justify-center">
                              <BarChart3 className="w-16 h-16 text-gray-400" />
                              <span className="ml-4 text-gray-500">Interactive charts will be included here</span>
                            </div>
                          </section>
                        )}

                        {includeMaps && (
                          <section>
                            <h2 className="text-xl font-semibold text-gray-900 mb-3">Spatial Analysis</h2>
                            <div className="bg-gray-100 h-48 rounded flex items-center justify-center">
                              <Map className="w-16 h-16 text-gray-400" />
                              <span className="ml-4 text-gray-500">Interactive maps will be included here</span>
                            </div>
                          </section>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="history">
                <Card className="bg-blue-900/30 border-blue-700/50">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <Clock className="w-5 h-5 mr-2" />
                      Recent Reports
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentReports.map((report, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                          className="p-4 bg-blue-800/30 rounded-lg hover:bg-blue-800/50 transition-colors"
                        >
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h3 className="font-semibold text-white">{report.title}</h3>
                              <p className="text-sm text-blue-300">{report.type}</p>
                            </div>
                            <Badge className={getStatusColor(report.status)}>
                              {report.status}
                            </Badge>
                          </div>
                          
                          <div className="flex items-center justify-between text-sm text-blue-200">
                            <div className="flex items-center">
                              <Calendar className="w-4 h-4 mr-1" />
                              {new Date(report.date).toLocaleDateString()}
                            </div>
                            {report.status === 'published' && (
                              <div className="flex items-center">
                                <Download className="w-4 h-4 mr-1" />
                                {report.downloads} downloads
                              </div>
                            )}
                          </div>

                          <div className="flex flex-wrap gap-1 mt-2">
                            {report.datasets.map((dataset, dsIndex) => (
                              <Badge key={dsIndex} variant="outline" className="text-xs border-blue-600 text-blue-300">
                                {availableDatasets.find(d => d.id === dataset)?.name.split(' ')[0]}
                              </Badge>
                            ))}
                          </div>

                          <div className="flex gap-2 mt-3">
                            <Button size="sm" variant="outline" className="border-blue-600 text-blue-200">
                              <Eye className="w-3 h-3 mr-1" />
                              View
                            </Button>
                            <Button size="sm" variant="outline" className="border-blue-600 text-blue-200">
                              <Download className="w-3 h-3 mr-1" />
                              Download
                            </Button>
                            <Button size="sm" variant="outline" className="border-blue-600 text-blue-200">
                              <Share2 className="w-3 h-3 mr-1" />
                              Share
                            </Button>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </motion.div>

          {/* Summary Panel */}
          <motion.div
            className="xl:col-span-1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="space-y-6">
              {/* Current Configuration */}
              <Card className="bg-blue-900/30 border-blue-700/50">
                <CardHeader>
                  <CardTitle className="text-white">Current Configuration</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <span className="text-sm text-blue-200">Report Type:</span>
                      <div className="text-white font-medium">
                        {reportTemplates.find(t => t.id === reportType)?.name}
                      </div>
                    </div>
                    <div>
                      <span className="text-sm text-blue-200">Datasets Selected:</span>
                      <div className="text-cyan-400 font-medium">{selectedDatasets.length}</div>
                    </div>
                    <div>
                      <span className="text-sm text-blue-200">Content Options:</span>
                      <div className="space-y-1 mt-1">
                        {includeCharts && <div className="text-xs text-green-400">✓ Charts included</div>}
                        {includeMaps && <div className="text-xs text-green-400">✓ Maps included</div>}
                        {includeStatistics && <div className="text-xs text-green-400">✓ Statistics included</div>}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Export Options */}
              <Card className="bg-blue-900/30 border-blue-700/50">
                <CardHeader>
                  <CardTitle className="text-white">Export Options</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Button 
                      className="w-full bg-gradient-to-r from-red-500 to-pink-500 text-white"
                    >
                      <FileText className="w-4 h-4 mr-2" />
                      Export as PDF
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full border-green-500 text-green-400 hover:bg-green-500 hover:text-white"
                    >
                      <Table className="w-4 h-4 mr-2" />
                      Export as Excel
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full border-blue-600 text-blue-200"
                    >
                      <Share2 className="w-4 h-4 mr-2" />
                      Generate Share Link
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <Card className="bg-blue-900/30 border-blue-700/50">
                <CardHeader>
                  <CardTitle className="text-white">Report Statistics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-blue-200">Total Reports</span>
                      <span className="text-white font-semibold">247</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-200">Published</span>
                      <span className="text-green-400 font-semibold">198</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-200">Drafts</span>
                      <span className="text-yellow-400 font-semibold">49</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-200">Downloads</span>
                      <span className="text-cyan-400 font-semibold">12,847</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}