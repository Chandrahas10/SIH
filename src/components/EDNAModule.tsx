import { useState } from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { 
  Upload, 
  Dna, 
  FileText, 
  Search, 
  Download, 
  Share2,
  Eye,
  Zap,
  Database,
  CheckCircle,
  AlertTriangle,
  Clock,
  Microscope,
  Shield,
  TrendingDown,
  TrendingUp,
  Activity
} from 'lucide-react';

interface EDNAModuleProps {
  userType?: string | null;
}

export function EDNAModule({ userType }: EDNAModuleProps) {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(true); // Set to true for demo

  // Enhanced mock data for species distribution
  const speciesDistribution = [
    { name: 'Fish', value: 45, color: '#3b82f6' },
    { name: 'Crustaceans', value: 28, color: '#f59e0b' },
    { name: 'Mollusks', value: 15, color: '#10b981' },
    { name: 'Corals', value: 8, color: '#ef4444' },
    { name: 'Others', value: 4, color: '#8b5cf6' }
  ];

  const sequenceMatches = [
    { species: 'Lutjanus argentimaculatus', reads: 1247, percentage: 18.5, confidence: 98.2, status: 'abundant', threatLevel: 'low' },
    { species: 'Epinephelus malabaricus', reads: 1089, percentage: 16.1, confidence: 96.7, status: 'stable', threatLevel: 'medium' },
    { species: 'Scomberomorus commerson', reads: 892, percentage: 13.2, confidence: 94.3, status: 'declining', threatLevel: 'high' },
    { species: 'Rastrelliger kanagurta', reads: 745, percentage: 11.0, confidence: 97.1, status: 'abundant', threatLevel: 'low' },
    { species: 'Sardinella longiceps', reads: 623, percentage: 9.2, confidence: 95.8, status: 'stable', threatLevel: 'low' },
    { species: 'Decapterus russelli', reads: 456, percentage: 6.8, confidence: 93.4, status: 'declining', threatLevel: 'medium' },
    { species: 'Thunnus albacares', reads: 392, percentage: 5.8, confidence: 95.1, status: 'critical', threatLevel: 'high' },
    { species: 'Pristis pristis', reads: 234, percentage: 3.5, confidence: 97.8, status: 'endangered', threatLevel: 'critical' },
    { species: 'Carcharhinus amblyrhynchos', reads: 187, percentage: 2.8, confidence: 96.4, status: 'vulnerable', threatLevel: 'high' },
    { species: 'Other species', reads: 1200, percentage: 17.8, confidence: 91.2, status: 'mixed', threatLevel: 'varied' }
  ];

  // Enhanced conservation data for policy makers
  const conservationAlerts = [
    {
      species: 'Pristis pristis',
      commonName: 'Largetooth Sawfish',
      status: 'Critically Endangered',
      trend: 'declining',
      lastDetected: '2024-01-15',
      recommendedAction: 'Immediate habitat protection required',
      priority: 'critical'
    },
    {
      species: 'Thunnus albacares',
      commonName: 'Yellowfin Tuna',
      status: 'Near Threatened',
      trend: 'declining',
      lastDetected: '2024-01-20',
      recommendedAction: 'Implement fishing quotas in key areas',
      priority: 'high'
    },
    {
      species: 'Scomberomorus commerson',
      commonName: 'Spanish Mackerel',
      status: 'Vulnerable',
      trend: 'stable',
      lastDetected: '2024-01-22',
      recommendedAction: 'Monitor spawning grounds',
      priority: 'medium'
    }
  ];

  // Genetic diversity data
  const geneticDiversityData = [
    { location: 'Lakshadweep', diversity: 0.85, samples: 45, uniqueHaplotypes: 23 },
    { location: 'Andaman', diversity: 0.78, samples: 38, uniqueHaplotypes: 19 },
    { location: 'Arabian Sea', diversity: 0.72, samples: 52, uniqueHaplotypes: 26 },
    { location: 'Bay of Bengal', diversity: 0.81, samples: 41, uniqueHaplotypes: 21 },
    { location: 'Western Ghats', diversity: 0.69, samples: 29, uniqueHaplotypes: 15 }
  ];

  const monthlyTrends = [
    { month: 'Jan', diversity: 42, abundance: 2156 },
    { month: 'Feb', diversity: 38, abundance: 1987 },
    { month: 'Mar', diversity: 51, abundance: 2834 },
    { month: 'Apr', diversity: 47, abundance: 2567 },
    { month: 'May', diversity: 55, abundance: 3124 },
    { month: 'Jun', diversity: 49, abundance: 2789 }
  ];

  const uploadedFiles = [
    {
      name: 'LKS_Site1_16S_R1.fastq',
      size: '145.2 MB',
      status: 'processed',
      uploadTime: '2 hours ago',
      sequences: 15678,
      matches: 234
    },
    {
      name: 'LKS_Site1_16S_R2.fastq',
      size: '142.8 MB',
      status: 'processed',
      uploadTime: '2 hours ago',
      sequences: 15234,
      matches: 228
    },
    {
      name: 'LKS_Site2_COI_R1.fastq',
      size: '98.4 MB',
      status: 'processing',
      uploadTime: '45 minutes ago',
      sequences: 12456,
      matches: 0
    },
    {
      name: 'LKS_Site3_18S_R1.fastq',
      size: '156.7 MB',
      status: 'queued',
      uploadTime: '10 minutes ago',
      sequences: 0,
      matches: 0
    }
  ];

  const handleFileUpload = () => {
    setIsUploading(true);
    setUploadProgress(0);

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          return 100;
        }
        return prev + 5;
      });
    }, 100);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'processed': return 'bg-green-500';
      case 'processing': return 'bg-yellow-500';
      case 'queued': return 'bg-blue-500';
      case 'error': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'processed': return <CheckCircle className="w-4 h-4" />;
      case 'processing': return <Clock className="w-4 h-4" />;
      case 'queued': return <Database className="w-4 h-4" />;
      case 'error': return <AlertTriangle className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
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
          <h1 className="mb-4 text-4xl font-bold text-white">eDNA & Molecular Data Module</h1>
          <p className="text-xl text-blue-200">
            Environmental DNA analysis and molecular species identification platform
            {userType === 'policy' && ' with conservation management insights'}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Upload & Analysis Section */}
          <motion.div
            className="xl:col-span-2 space-y-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Tabs defaultValue="upload" className="space-y-6">
              <TabsList className="bg-blue-900/50 border border-blue-700/50">
                <TabsTrigger value="upload" className="data-[state=active]:bg-cyan-500 data-[state=active]:text-white">
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Sequences
                </TabsTrigger>
                <TabsTrigger value="analysis" className="data-[state=active]:bg-cyan-500 data-[state=active]:text-white">
                  <Dna className="w-4 h-4 mr-2" />
                  Analysis Results
                </TabsTrigger>
                <TabsTrigger value="trends" className="data-[state=active]:bg-cyan-500 data-[state=active]:text-white">
                  <Microscope className="w-4 h-4 mr-2" />
                  Temporal Trends
                </TabsTrigger>
                {userType === 'policy' && (
                  <TabsTrigger value="conservation" className="data-[state=active]:bg-cyan-500 data-[state=active]:text-white">
                    <Shield className="w-4 h-4 mr-2" />
                    Conservation
                  </TabsTrigger>
                )}
              </TabsList>

              <TabsContent value="upload">
                <Card className="bg-blue-900/30 border-blue-700/50">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <FileText className="w-5 h-5 mr-2" />
                      Sequence File Upload
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Upload Area */}
                    <div className="border-2 border-dashed border-blue-600/50 rounded-lg p-8 text-center bg-blue-800/20 hover:border-cyan-400/50 hover:bg-cyan-400/5 transition-all duration-300">
                      <Upload className="w-16 h-16 mx-auto text-blue-400 mb-4" />
                      <h3 className="text-lg font-semibold text-white mb-2">
                        Upload FASTQ/FASTA Files
                      </h3>
                      <p className="text-blue-300 mb-4">
                        Supports FASTQ, FASTA, and compressed formats (.gz, .zip)
                      </p>
                      <Button
                        onClick={handleFileUpload}
                        disabled={isUploading}
                        className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white"
                      >
                        <Upload className="w-4 h-4 mr-2" />
                        {isUploading ? 'Uploading...' : 'Select Files'}
                      </Button>
                    </div>

                    {/* Upload Progress */}
                    {isUploading && (
                      <motion.div
                        className="p-4 bg-blue-800/30 rounded-lg"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-white font-medium">Uploading sequence files...</span>
                          <span className="text-cyan-400">{uploadProgress}%</span>
                        </div>
                        <Progress value={uploadProgress} className="mb-2" />
                        <p className="text-sm text-blue-300">
                          Processing and validating sequence data
                        </p>
                      </motion.div>
                    )}

                    {/* Metadata Form */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-blue-200 mb-2">
                          Sample Location
                        </label>
                        <Input
                          placeholder="e.g., Lakshadweep Site 1"
                          className="bg-blue-800/50 border-blue-600 text-white placeholder:text-blue-300"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-blue-200 mb-2">
                          Collection Date
                        </label>
                        <Input
                          type="date"
                          className="bg-blue-800/50 border-blue-600 text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-blue-200 mb-2">
                          Primer Set
                        </label>
                        <Input
                          placeholder="e.g., 16S V4"
                          className="bg-blue-800/50 border-blue-600 text-white placeholder:text-blue-300"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-blue-200 mb-2">
                          Sequencing Platform
                        </label>
                        <Input
                          placeholder="e.g., Illumina MiSeq"
                          className="bg-blue-800/50 border-blue-600 text-white placeholder:text-blue-300"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-blue-200 mb-2">
                        Sample Description
                      </label>
                      <Textarea
                        placeholder="Additional notes about the sample collection..."
                        className="bg-blue-800/50 border-blue-600 text-white placeholder:text-blue-300"
                        rows={3}
                      />
                    </div>

                    {/* Auto-tagging */}
                    <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                      <div className="flex items-center text-green-400 mb-2">
                        <Zap className="w-5 h-5 mr-2" />
                        <span className="font-medium">Auto-tagging enabled</span>
                      </div>
                      <p className="text-sm text-green-300">
                        Metadata will be automatically extracted from file headers and sequence information.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* File Queue */}
                <Card className="bg-blue-900/30 border-blue-700/50">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <Database className="w-5 h-5 mr-2" />
                      Processing Queue
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {uploadedFiles.map((file, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                          className="flex items-center justify-between p-3 bg-blue-800/30 rounded-lg"
                        >
                          <div className="flex items-center space-x-3">
                            <div className={`p-2 rounded ${getStatusColor(file.status)} text-white`}>
                              {getStatusIcon(file.status)}
                            </div>
                            <div>
                              <div className="text-white font-medium text-sm">{file.name}</div>
                              <div className="text-blue-300 text-xs">
                                {file.size} • {file.uploadTime}
                                {file.sequences > 0 && ` • ${file.sequences.toLocaleString()} sequences`}
                                {file.matches > 0 && ` • ${file.matches} matches`}
                              </div>
                            </div>
                          </div>
                          <Badge className={getStatusColor(file.status)}>
                            {file.status}
                          </Badge>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="analysis">
                <Card className="bg-blue-900/30 border-blue-700/50">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <Search className="w-5 h-5 mr-2" />
                      Species Identification Results
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Species Distribution Chart */}
                    <div className="bg-slate-900/50 rounded-lg p-4">
                      <h4 className="text-lg font-semibold text-white mb-4">Species Distribution</h4>
                      <ResponsiveContainer width="100%" height={250}>
                        <PieChart>
                          <Pie
                            data={speciesDistribution}
                            cx="50%"
                            cy="50%"
                            outerRadius={80}
                            dataKey="value"
                            label={({ name, value }) => `${name}: ${value}%`}
                          >
                            {speciesDistribution.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip
                            contentStyle={{ 
                              backgroundColor: '#1e293b', 
                              border: '1px solid #334155',
                              borderRadius: '8px',
                              color: '#f1f5f9'
                            }}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>

                    {/* Top Species Matches */}
                    <div className="space-y-3">
                      <h4 className="text-lg font-semibold text-white">Top Species Matches</h4>
                      {sequenceMatches.map((match, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.05 }}
                          className="flex items-center justify-between p-3 bg-blue-800/30 rounded-lg hover:bg-blue-800/50 transition-colors"
                        >
                          <div className="flex-1">
                            <div className="text-white font-medium text-sm">{match.species}</div>
                            <div className="text-blue-300 text-xs">
                              {match.reads.toLocaleString()} reads • {match.percentage}% of total
                            </div>
                            {userType === 'policymaker' && (
                              <div className="flex items-center gap-2 mt-1">
                                <Badge 
                                  className={
                                    match.status === 'abundant' ? 'bg-green-500' :
                                    match.status === 'stable' ? 'bg-blue-500' :
                                    match.status === 'declining' ? 'bg-yellow-500' :
                                    match.status === 'critical' ? 'bg-red-500' :
                                    match.status === 'endangered' ? 'bg-red-600' :
                                    'bg-gray-500'
                                  }
                                >
                                  {match.status}
                                </Badge>
                                <Badge 
                                  variant="outline"
                                  className={
                                    match.threatLevel === 'critical' ? 'border-red-500 text-red-400' :
                                    match.threatLevel === 'high' ? 'border-orange-500 text-orange-400' :
                                    match.threatLevel === 'medium' ? 'border-yellow-500 text-yellow-400' :
                                    'border-green-500 text-green-400'
                                  }
                                >
                                  {match.threatLevel} threat
                                </Badge>
                              </div>
                            )}
                          </div>
                          <div className="text-right">
                            <Badge
                              className={
                                match.confidence > 95
                                  ? "bg-green-500"
                                  : match.confidence > 90
                                  ? "bg-yellow-500"
                                  : "bg-orange-500"
                              }
                            >
                              {match.confidence}%
                            </Badge>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    {/* Conservation Alerts for Policy Makers */}
                    {userType === 'policy' && (
                      <div className="space-y-3 mt-6">
                        <h4 className="text-lg font-semibold text-white flex items-center">
                          <AlertTriangle className="w-5 h-5 mr-2 text-red-400" />
                          Conservation Alerts
                        </h4>
                        {conservationAlerts.map((alert, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                            className={`p-4 rounded-lg border ${
                              alert.priority === 'critical' ? 'border-red-500 bg-red-500/10' :
                              alert.priority === 'high' ? 'border-orange-500 bg-orange-500/10' :
                              'border-yellow-500 bg-yellow-500/10'
                            }`}
                          >
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <h5 className="font-semibold text-white text-sm">{alert.commonName}</h5>
                                <p className="text-xs italic text-blue-300">{alert.species}</p>
                              </div>
                              <Badge className={
                                alert.priority === 'critical' ? 'bg-red-500' :
                                alert.priority === 'high' ? 'bg-orange-500' :
                                'bg-yellow-500'
                              }>
                                {alert.priority}
                              </Badge>
                            </div>
                            <div className="text-sm text-blue-200 mb-2">
                              Status: <span className="text-white">{alert.status}</span> | 
                              Trend: <span className={alert.trend === 'declining' ? 'text-red-400' : 'text-green-400'}> {alert.trend}</span>
                            </div>
                            <div className="text-sm text-blue-300 mb-2">
                              Last detected: {alert.lastDetected}
                            </div>
                            <div className="text-sm text-yellow-300 bg-yellow-500/20 p-2 rounded">
                              <strong>Recommended Action:</strong> {alert.recommendedAction}
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    )}

                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        className="border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-blue-950"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Export Results
                      </Button>
                      <Button
                        variant="outline"
                        className="border-blue-600 text-blue-200"
                      >
                        <Share2 className="w-4 h-4 mr-2" />
                        Share Analysis
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="trends">
                <Card className="bg-blue-900/30 border-blue-700/50">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <Microscope className="w-5 h-5 mr-2" />
                      Temporal Biodiversity Trends
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-slate-900/50 rounded-lg p-4">
                      <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={monthlyTrends}>
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
                          <Bar dataKey="diversity" fill="#22c55e" name="Species Diversity" radius={[2, 2, 0, 0]} />
                          <Bar dataKey="abundance" fill="#3b82f6" name="Total Abundance" radius={[2, 2, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                      <Card className="bg-blue-800/30 border-blue-600/50">
                        <CardContent className="p-4 text-center">
                          <div className="text-2xl font-bold text-cyan-400">55</div>
                          <div className="text-sm text-blue-200">Peak Diversity</div>
                          <div className="text-xs text-blue-300">May 2024</div>
                        </CardContent>
                      </Card>
                      <Card className="bg-blue-800/30 border-blue-600/50">
                        <CardContent className="p-4 text-center">
                          <div className="text-2xl font-bold text-green-400">3,124</div>
                          <div className="text-sm text-blue-200">Max Abundance</div>
                          <div className="text-xs text-blue-300">May 2024</div>
                        </CardContent>
                      </Card>
                      <Card className="bg-blue-800/30 border-blue-600/50">
                        <CardContent className="p-4 text-center">
                          <div className="text-2xl font-bold text-yellow-400">+12%</div>
                          <div className="text-sm text-blue-200">Trend</div>
                          <div className="text-xs text-blue-300">vs. last year</div>
                        </CardContent>
                      </Card>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {userType === 'policy' && (
                <TabsContent value="conservation">
                  <div className="space-y-6">
                    {/* Genetic Diversity Analysis */}
                    <Card className="bg-blue-900/30 border-blue-700/50">
                      <CardHeader>
                        <CardTitle className="text-white flex items-center">
                          <Activity className="w-5 h-5 mr-2" />
                          Genetic Diversity Assessment
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="bg-slate-900/50 rounded-lg p-4 mb-4">
                          <ResponsiveContainer width="100%" height={250}>
                            <LineChart data={geneticDiversityData}>
                              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                              <XAxis dataKey="location" stroke="#94a3b8" />
                              <YAxis domain={[0.6, 0.9]} stroke="#94a3b8" />
                              <Tooltip
                                contentStyle={{ 
                                  backgroundColor: '#1e293b', 
                                  border: '1px solid #334155',
                                  borderRadius: '8px',
                                  color: '#f1f5f9'
                                }}
                              />
                              <Line 
                                type="monotone" 
                                dataKey="diversity" 
                                stroke="#22c55e" 
                                strokeWidth={3}
                                dot={{ r: 6, fill: '#22c55e' }}
                              />
                            </LineChart>
                          </ResponsiveContainer>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {geneticDiversityData.map((location, index) => (
                            <Card key={index} className="bg-blue-800/30 border-blue-600/50">
                              <CardContent className="p-4">
                                <h5 className="font-semibold text-white mb-2">{location.location}</h5>
                                <div className="space-y-2 text-sm">
                                  <div className="flex justify-between">
                                    <span className="text-blue-200">Diversity Index:</span>
                                    <span className={`font-semibold ${
                                      location.diversity > 0.8 ? 'text-green-400' :
                                      location.diversity > 0.75 ? 'text-yellow-400' :
                                      'text-red-400'
                                    }`}>
                                      {location.diversity.toFixed(2)}
                                    </span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-blue-200">Samples:</span>
                                    <span className="text-white">{location.samples}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-blue-200">Haplotypes:</span>
                                    <span className="text-cyan-400">{location.uniqueHaplotypes}</span>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    {/* Policy Recommendations */}
                    <Card className="bg-blue-900/30 border-blue-700/50">
                      <CardHeader>
                        <CardTitle className="text-white flex items-center">
                          <Shield className="w-5 h-5 mr-2" />
                          Policy Recommendations
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                            <div className="flex items-center text-red-400 mb-2">
                              <TrendingDown className="w-5 h-5 mr-2" />
                              <span className="font-medium">Critical Action Required</span>
                            </div>
                            <p className="text-sm text-red-300 mb-2">
                              Sawfish populations show critically low genetic diversity. Immediate habitat protection and breeding program implementation recommended.
                            </p>
                            <Button size="sm" className="bg-red-500 hover:bg-red-600 text-white">
                              Implement Emergency Measures
                            </Button>
                          </div>

                          <div className="p-4 bg-orange-500/10 border border-orange-500/30 rounded-lg">
                            <div className="flex items-center text-orange-400 mb-2">
                              <AlertTriangle className="w-5 h-5 mr-2" />
                              <span className="font-medium">High Priority</span>
                            </div>
                            <p className="text-sm text-orange-300 mb-2">
                              Tuna populations declining in key spawning areas. Consider implementing seasonal fishing restrictions and quotas.
                            </p>
                            <Button size="sm" variant="outline" className="border-orange-500 text-orange-400">
                              Review Fishing Quotas
                            </Button>
                          </div>

                          <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                            <div className="flex items-center text-green-400 mb-2">
                              <TrendingUp className="w-5 h-5 mr-2" />
                              <span className="font-medium">Positive Outcomes</span>
                            </div>
                            <p className="text-sm text-green-300">
                              Lakshadweep marine reserves show highest genetic diversity. Continue current conservation strategies and consider expansion.
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
              )}
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
              {/* Current Analysis */}
              <Card className="bg-blue-900/30 border-blue-700/50">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Eye className="w-5 h-5 mr-2" />
                    Current Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-cyan-400 mb-2">6,740</div>
                      <div className="text-sm text-blue-200">Total Sequences</div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3 text-center">
                      <div>
                        <div className="text-xl font-semibold text-white">234</div>
                        <div className="text-xs text-blue-300">Species Matched</div>
                      </div>
                      <div>
                        <div className="text-xl font-semibold text-white">97.2%</div>
                        <div className="text-xs text-blue-300">Match Quality</div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-blue-200">Processing Progress</span>
                        <span className="text-cyan-400">Complete</span>
                      </div>
                      <Progress value={100} />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Database Stats */}
              <Card className="bg-blue-900/30 border-blue-700/50">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Database className="w-5 h-5 mr-2" />
                    Reference Database
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-blue-200">Fish Species</span>
                      <span className="text-white font-semibold">15,234</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-200">Invertebrates</span>
                      <span className="text-white font-semibold">8,567</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-200">Marine Plants</span>
                      <span className="text-white font-semibold">2,891</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-200">Total Sequences</span>
                      <span className="text-cyan-400 font-semibold">1.2M</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Updates */}
              <Card className="bg-blue-900/30 border-blue-700/50">
                <CardHeader>
                  <CardTitle className="text-white">Recent Updates</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center text-green-400">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      <span>Database updated with 234 new sequences</span>
                    </div>
                    <div className="flex items-center text-blue-300">
                      <Zap className="w-4 h-4 mr-2" />
                      <span>Processing speed improved by 15%</span>
                    </div>
                    <div className="flex items-center text-cyan-400">
                      <Dna className="w-4 h-4 mr-2" />
                      <span>New primer set support added</span>
                    </div>
                    {userType === 'policy' && (
                      <div className="flex items-center text-red-400">
                        <AlertTriangle className="w-4 h-4 mr-2" />
                        <span>3 conservation alerts active</span>
                      </div>
                    )}
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