import { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Input } from './ui/input';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { 
  Upload, 
  Fish, 
  Camera, 
  RotateCcw, 
  ZoomIn, 
  ZoomOut, 
  Download, 
  Share2,
  Eye,
  Microscope,
  Ruler,
  Search,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

export function TaxonomyModule() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [uploadedOtolithImage, setUploadedOtolithImage] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isOtolithDragging, setIsOtolithDragging] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [otolithAnalysisProgress, setOtolithAnalysisProgress] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isOtolithAnalyzing, setIsOtolithAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [otolithAnalysisComplete, setOtolithAnalysisComplete] = useState(false);
  const [activeTab, setActiveTab] = useState('fish');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const otolithFileInputRef = useRef<HTMLInputElement>(null);

  const mockResults = [
    {
      species: 'Pomfret (Pampus argenteus)',
      confidence: 94,
      family: 'Stromateidae',
      habitat: 'Coastal waters, 20-100m depth',
      characteristics: ['Silvery body', 'Compressed laterally', 'Small mouth'],
      image: 'https://images.unsplash.com/photo-1609529666856-eeb9e407c437?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXNoJTIwbWFyaW5lJTIwYmlvbG9neXxlbnwxfHx8fDE3NTg3MzAzNTJ8MA&ixlib=rb-4.1.0&q=80&w=400'
    },
    {
      species: 'Indian Mackerel (Rastrelliger kanagurta)',
      confidence: 87,
      family: 'Scombridae',
      habitat: 'Pelagic, surface to 200m depth',
      characteristics: ['Dark wavy lines', 'Forked tail', 'Streamlined body'],
      image: 'https://images.unsplash.com/photo-1609529666856-eeb9e407c437?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXNoJTIwbWFyaW5lJTIwYmlvbG9neXxlbnwxfHx8fDE3NTg3MzAzNTJ8MA&ixlib=rb-4.1.0&q=80&w=400'
    },
    {
      species: 'Oil Sardine (Sardinella longiceps)',
      confidence: 72,
      family: 'Clupeidae',
      habitat: 'Coastal waters, schooling fish',
      characteristics: ['Elongated body', 'Golden spot behind gill', 'Small scales'],
      image: 'https://images.unsplash.com/photo-1609529666856-eeb9e407c437?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXNoJTIwbWFyaW5lJTIwYmlvbG9neXxlbnwxfHx8fDE3NTg3MzAzNTJ8MA&ixlib=rb-4.1.0&q=80&w=400'
    }
  ];

  // Mock otolith database for matching
  const otolithDatabase = [
    {
      id: 'OTL001',
      species: 'Pomfret (Pampus argenteus)',
      similarity: 96,
      image: 'https://images.unsplash.com/photo-1694184889674-2df26d350072?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXNoJTIwb3RvbGl0aCUyMGVhciUyMHN0b25lJTIwbWljcm9zY29wZXxlbnwxfHx8fDE3NTg3MzUyNTB8MA&ixlib=rb-4.1.0&q=80&w=1080',
      morphometrics: {
        length: 12.8,
        width: 8.9,
        area: 89.2,
        perimeter: 36.4,
        roundness: 0.76,
        rectangularity: 0.68,
        circularity: 0.84,
        ellipticity: 1.44
      },
      region: 'Arabian Sea',
      ageRange: '2-4 years',
      sampleSize: 'n=45'
    },
    {
      id: 'OTL002',
      species: 'Indian Mackerel (Rastrelliger kanagurta)',
      similarity: 91,
      image: 'https://images.unsplash.com/photo-1587302601241-ecfecde2b986?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaWNyb3Njb3BlJTIwc2NpZW50aWZpYyUyMHNwZWNpbWVufGVufDF8fHx8MTc1ODczNTI1M3ww&ixlib=rb-4.1.0&q=80&w=1080',
      morphometrics: {
        length: 8.4,
        width: 5.2,
        area: 34.6,
        perimeter: 21.8,
        roundness: 0.72,
        rectangularity: 0.61,
        circularity: 0.91,
        ellipticity: 1.62
      },
      region: 'West Coast India',
      ageRange: '1-3 years',
      sampleSize: 'n=67'
    },
    {
      id: 'OTL003',
      species: 'Oil Sardine (Sardinella longiceps)',
      similarity: 88,
      image: 'https://images.unsplash.com/photo-1747769005071-00e8d3ff79c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXJpbmUlMjBiaW9sb2d5JTIwc3BlY2ltZW4lMjBhbmFseXNpc3xlbnwxfHx8fDE3NTg3MzUyNTZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
      morphometrics: {
        length: 6.7,
        width: 4.1,
        area: 21.3,
        perimeter: 18.9,
        roundness: 0.69,
        rectangularity: 0.58,
        circularity: 0.89,
        ellipticity: 1.63
      },
      region: 'Kerala Coast',
      ageRange: '1-2 years',
      sampleSize: 'n=89'
    },
    {
      id: 'OTL004',
      species: 'Snapper (Lutjanus malabaricus)',
      similarity: 82,
      image: 'https://images.unsplash.com/photo-1675899043736-287294b6616a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHhmaXNoJTIwc2NhbGVzJTIwbWljcm9zY29waWN8ZW58MXx8fHwxNzU4NjUwNDUwfDA&ixlib=rb-4.1.0&q=80&w=1080',
      morphometrics: {
        length: 15.2,
        width: 11.3,
        area: 134.7,
        perimeter: 45.6,
        roundness: 0.81,
        rectangularity: 0.72,
        circularity: 0.85,
        ellipticity: 1.35
      },
      region: 'Bay of Bengal',
      ageRange: '3-5 years',
      sampleSize: 'n=34'
    },
    {
      id: 'OTL005',
      species: 'Kingfish (Scomberomorus commerson)',
      similarity: 76,
      image: 'https://images.unsplash.com/photo-1618053238059-cc7761222f2a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY2llbnRpZmljJTIwbGFib3JhdG9yeSUyMHJlc2VhcmNofGVufDF8fHx8MTc1ODczNTI2M3ww&ixlib=rb-4.1.0&q=80&w=1080',
      morphometrics: {
        length: 18.9,
        width: 12.7,
        area: 187.3,
        perimeter: 52.8,
        roundness: 0.78,
        rectangularity: 0.69,
        circularity: 0.82,
        ellipticity: 1.49
      },
      region: 'Arabian Sea',
      ageRange: '4-7 years',
      sampleSize: 'n=28'
    }
  ];

  const handleImageUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setUploadedImage(e.target?.result as string);
      startAnalysis();
    };
    reader.readAsDataURL(file);
  };

  const handleOtolithImageUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setUploadedOtolithImage(e.target?.result as string);
      startOtolithAnalysis();
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleImageUpload(files[0]);
    }
  };

  const handleOtolithDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsOtolithDragging(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleOtolithImageUpload(files[0]);
    }
  };

  const startAnalysis = () => {
    setIsAnalyzing(true);
    setAnalysisProgress(0);
    setAnalysisComplete(false);

    const interval = setInterval(() => {
      setAnalysisProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsAnalyzing(false);
          setAnalysisComplete(true);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const startOtolithAnalysis = () => {
    setIsOtolithAnalyzing(true);
    setOtolithAnalysisProgress(0);
    setOtolithAnalysisComplete(false);

    const interval = setInterval(() => {
      setOtolithAnalysisProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsOtolithAnalyzing(false);
          setOtolithAnalysisComplete(true);
          return 100;
        }
        return prev + 12;
      });
    }, 250);
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
          <h1 className="mb-4 text-4xl font-bold text-white">Taxonomy & Otolith Module</h1>
          <p className="text-xl text-blue-200">
            Species identification and morphometric analysis using AI-powered image recognition
          </p>
        </motion.div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Upload Section */}
          <motion.div
            className="xl:col-span-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Tabs defaultValue="fish" onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="bg-blue-900/50 border border-blue-700/50">
                <TabsTrigger value="fish" className="data-[state=active]:bg-cyan-500 data-[state=active]:text-white">
                  <Fish className="w-4 h-4 mr-2" />
                  Fish Identification
                </TabsTrigger>
                <TabsTrigger value="otolith" className="data-[state=active]:bg-cyan-500 data-[state=active]:text-white">
                  <Microscope className="w-4 h-4 mr-2" />
                  Otolith Analysis
                </TabsTrigger>
              </TabsList>

              <TabsContent value="fish">
                <Card className="bg-blue-900/30 border-blue-700/50">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <Camera className="w-5 h-5 mr-2" />
                      Upload Fish Image
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {/* Upload Area */}
                    <div
                      className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-all duration-300 ${
                        isDragging
                          ? 'border-cyan-400 bg-cyan-400/10'
                          : uploadedImage
                          ? 'border-green-400 bg-green-400/5'
                          : 'border-blue-600/50 bg-blue-800/20 hover:border-cyan-400/50 hover:bg-cyan-400/5'
                      }`}
                      onDragOver={(e) => {
                        e.preventDefault();
                        setIsDragging(true);
                      }}
                      onDragLeave={() => setIsDragging(false)}
                      onDrop={handleDrop}
                    >
                      {uploadedImage ? (
                        <div className="space-y-4">
                          <ImageWithFallback
                            src={uploadedImage}
                            alt="Uploaded fish"
                            className="max-h-64 mx-auto rounded-lg shadow-lg"
                          />
                          <div className="flex justify-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setUploadedImage(null)}
                              className="border-blue-600 text-blue-200"
                            >
                              <Upload className="w-4 h-4 mr-2" />
                              Upload New
                            </Button>
                            <Button
                              size="sm"
                              onClick={startAnalysis}
                              disabled={isAnalyzing}
                              className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white"
                            >
                              <Eye className="w-4 h-4 mr-2" />
                              Analyze
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <Upload className="w-16 h-16 mx-auto text-blue-400" />
                          <div>
                            <h3 className="text-lg font-semibold text-white mb-2">
                              Drop fish image here or click to upload
                            </h3>
                            <p className="text-blue-300">
                              Supports JPG, PNG, WebP formats up to 10MB
                            </p>
                          </div>
                          <Button
                            onClick={() => fileInputRef.current?.click()}
                            className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white"
                          >
                            <Camera className="w-4 h-4 mr-2" />
                            Select Image
                          </Button>
                          <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) handleImageUpload(file);
                            }}
                            className="hidden"
                          />
                        </div>
                      )}
                    </div>

                    {/* Analysis Progress */}
                    {isAnalyzing && (
                      <motion.div
                        className="mt-6 p-4 bg-blue-800/30 rounded-lg"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-white font-medium">Analyzing image...</span>
                          <span className="text-cyan-400">{analysisProgress}%</span>
                        </div>
                        <Progress value={analysisProgress} className="mb-2" />
                        <p className="text-sm text-blue-300">
                          {analysisProgress < 30 && 'Processing image...'}
                          {analysisProgress >= 30 && analysisProgress < 60 && 'Extracting features...'}
                          {analysisProgress >= 60 && analysisProgress < 90 && 'Comparing with database...'}
                          {analysisProgress >= 90 && 'Generating results...'}
                        </p>
                      </motion.div>
                    )}

                    {/* Analysis Complete */}
                    {analysisComplete && (
                      <motion.div
                        className="mt-6 p-4 bg-green-500/10 border border-green-500/30 rounded-lg"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        <div className="flex items-center text-green-400 mb-2">
                          <CheckCircle className="w-5 h-5 mr-2" />
                          <span className="font-medium">Analysis completed successfully!</span>
                        </div>
                        <p className="text-sm text-green-300">
                          Found {mockResults.length} potential matches. View results in the sidebar.
                        </p>
                      </motion.div>
                    )}

                    {/* Image Viewer Controls */}
                    {uploadedImage && (
                      <div className="mt-6 flex justify-center gap-2">
                        <Button variant="outline" size="sm" className="border-blue-600 text-blue-200">
                          <ZoomIn className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm" className="border-blue-600 text-blue-200">
                          <ZoomOut className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm" className="border-blue-600 text-blue-200">
                          <RotateCcw className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm" className="border-blue-600 text-blue-200">
                          <Ruler className="w-4 h-4" />
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="otolith">
                <Card className="bg-blue-900/30 border-blue-700/50">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <Microscope className="w-5 h-5 mr-2" />
                      Otolith Shape Analysis & Matching
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {/* Upload Area for Otolith */}
                    <div
                      className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-all duration-300 mb-6 ${
                        isOtolithDragging
                          ? 'border-cyan-400 bg-cyan-400/10'
                          : uploadedOtolithImage
                          ? 'border-green-400 bg-green-400/5'
                          : 'border-blue-600/50 bg-blue-800/20 hover:border-cyan-400/50 hover:bg-cyan-400/5'
                      }`}
                      onDragOver={(e) => {
                        e.preventDefault();
                        setIsOtolithDragging(true);
                      }}
                      onDragLeave={() => setIsOtolithDragging(false)}
                      onDrop={handleOtolithDrop}
                    >
                      {uploadedOtolithImage ? (
                        <div className="space-y-4">
                          <ImageWithFallback
                            src={uploadedOtolithImage}
                            alt="Uploaded otolith"
                            className="max-h-48 mx-auto rounded-lg shadow-lg"
                          />
                          <div className="flex justify-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                setUploadedOtolithImage(null);
                                setOtolithAnalysisComplete(false);
                              }}
                              className="border-blue-600 text-blue-200"
                            >
                              <Upload className="w-4 h-4 mr-2" />
                              Upload New
                            </Button>
                            <Button
                              size="sm"
                              onClick={startOtolithAnalysis}
                              disabled={isOtolithAnalyzing}
                              className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white"
                            >
                              <Microscope className="w-4 h-4 mr-2" />
                              Analyze
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <Microscope className="w-16 h-16 mx-auto text-blue-400" />
                          <div>
                            <h3 className="text-lg font-semibold text-white mb-2">
                              Drop otolith image here or click to upload
                            </h3>
                            <p className="text-blue-300">
                              Supports JPG, PNG, WebP formats. Best results with microscope images
                            </p>
                          </div>
                          <Button
                            onClick={() => otolithFileInputRef.current?.click()}
                            className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white"
                          >
                            <Camera className="w-4 h-4 mr-2" />
                            Select Otolith Image
                          </Button>
                          <input
                            ref={otolithFileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) handleOtolithImageUpload(file);
                            }}
                            className="hidden"
                          />
                        </div>
                      )}
                    </div>

                    {/* Otolith Analysis Progress */}
                    {isOtolithAnalyzing && (
                      <motion.div
                        className="mb-6 p-4 bg-blue-800/30 rounded-lg"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-white font-medium">Analyzing otolith morphometry...</span>
                          <span className="text-cyan-400">{otolithAnalysisProgress}%</span>
                        </div>
                        <Progress value={otolithAnalysisProgress} className="mb-2" />
                        <p className="text-sm text-blue-300">
                          {otolithAnalysisProgress < 25 && 'Preprocessing image and detecting edges...'}
                          {otolithAnalysisProgress >= 25 && otolithAnalysisProgress < 50 && 'Extracting morphometric features...'}
                          {otolithAnalysisProgress >= 50 && otolithAnalysisProgress < 75 && 'Calculating shape indices...'}
                          {otolithAnalysisProgress >= 75 && otolithAnalysisProgress < 95 && 'Matching against otolith database...'}
                          {otolithAnalysisProgress >= 95 && 'Generating species predictions...'}
                        </p>
                      </motion.div>
                    )}

                    {/* Analysis Complete */}
                    {otolithAnalysisComplete && (
                      <motion.div
                        className="mb-6 p-4 bg-green-500/10 border border-green-500/30 rounded-lg"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        <div className="flex items-center text-green-400 mb-2">
                          <CheckCircle className="w-5 h-5 mr-2" />
                          <span className="font-medium">Otolith analysis completed!</span>
                        </div>
                        <p className="text-sm text-green-300">
                          Found {otolithDatabase.length} matching otoliths from database. View morphometric comparisons in the sidebar.
                        </p>
                      </motion.div>
                    )}

                    {/* Morphometric Data Display */}
                    {otolithAnalysisComplete && (
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <Card className="bg-blue-800/30 border-blue-600/50">
                          <CardContent className="p-4">
                            <h4 className="font-semibold text-white mb-3 flex items-center">
                              <Ruler className="w-4 h-4 mr-2" />
                              Extracted Measurements
                            </h4>
                            <div className="space-y-2 text-sm text-blue-200">
                              <div className="flex justify-between">
                                <span>Length:</span>
                                <span className="text-cyan-400 font-medium">12.8 mm</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Width:</span>
                                <span className="text-cyan-400 font-medium">8.9 mm</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Area:</span>
                                <span className="text-cyan-400 font-medium">89.2 mm²</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Perimeter:</span>
                                <span className="text-cyan-400 font-medium">36.4 mm</span>
                              </div>
                            </div>
                          </CardContent>
                        </Card>

                        <Card className="bg-blue-800/30 border-blue-600/50">
                          <CardContent className="p-4">
                            <h4 className="font-semibold text-white mb-3 flex items-center">
                              <Eye className="w-4 h-4 mr-2" />
                              Shape Descriptors
                            </h4>
                            <div className="space-y-2 text-sm text-blue-200">
                              <div className="flex justify-between">
                                <span>Roundness:</span>
                                <span className="text-cyan-400 font-medium">0.76</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Rectangularity:</span>
                                <span className="text-cyan-400 font-medium">0.68</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Circularity:</span>
                                <span className="text-cyan-400 font-medium">0.84</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Ellipticity:</span>
                                <span className="text-cyan-400 font-medium">1.44</span>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    )}

                    {/* Image Processing Controls */}
                    {uploadedOtolithImage && (
                      <div className="flex justify-center gap-2">
                        <Button variant="outline" size="sm" className="border-blue-600 text-blue-200">
                          <ZoomIn className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm" className="border-blue-600 text-blue-200">
                          <ZoomOut className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm" className="border-blue-600 text-blue-200">
                          <RotateCcw className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm" className="border-blue-600 text-blue-200">
                          <Ruler className="w-4 h-4" />
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </motion.div>

          {/* Results Panel */}
          <motion.div
            className="xl:col-span-1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card className="bg-blue-900/30 border-blue-700/50 sticky top-24">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Search className="w-5 h-5 mr-2" />
                  {activeTab === 'fish' ? 'Fish Identification Results' : 'Otolith Matching Results'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {activeTab === 'fish' ? (
                  // Fish Results
                  !analysisComplete ? (
                    <div className="text-center py-8">
                      <Fish className="w-12 h-12 mx-auto text-blue-400 opacity-50 mb-4" />
                      <p className="text-blue-300">Upload a fish image to see identification results</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {mockResults.map((result, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: index * 0.1 }}
                          className="border border-blue-600/50 rounded-lg p-4 hover:border-cyan-400/50 transition-colors cursor-pointer"
                        >
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex-1">
                              <h3 className="font-semibold text-white text-sm">{result.species}</h3>
                              <p className="text-xs text-blue-300">{result.family}</p>
                            </div>
                            <div className="flex items-center">
                              <Badge
                                variant={result.confidence > 90 ? "default" : result.confidence > 70 ? "secondary" : "outline"}
                                className={
                                  result.confidence > 90
                                    ? "bg-green-500"
                                    : result.confidence > 70
                                    ? "bg-yellow-500"
                                    : "border-orange-500 text-orange-400"
                                }
                              >
                                {result.confidence}%
                              </Badge>
                            </div>
                          </div>

                          <ImageWithFallback
                            src={result.image}
                            alt={result.species}
                            className="w-full h-20 object-cover rounded mb-3"
                          />

                          <div className="space-y-2 text-xs text-blue-200">
                            <div>
                              <span className="font-medium">Habitat:</span> {result.habitat}
                            </div>
                            <div>
                              <span className="font-medium">Key features:</span>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {result.characteristics.map((char, charIndex) => (
                                  <Badge key={charIndex} variant="outline" className="text-xs border-blue-600 text-blue-300">
                                    {char}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>

                          <div className="flex gap-2 mt-3">
                            <Button size="sm" variant="outline" className="flex-1 border-blue-600 text-blue-200 text-xs">
                              <Eye className="w-3 h-3 mr-1" />
                              Details
                            </Button>
                            <Button size="sm" variant="outline" className="border-blue-600 text-blue-200">
                              <Share2 className="w-3 h-3" />
                            </Button>
                          </div>
                        </motion.div>
                      ))}

                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-blue-950"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Export Results
                      </Button>
                    </div>
                  )
                ) : (
                  // Otolith Results
                  !otolithAnalysisComplete ? (
                    <div className="text-center py-8">
                      <Microscope className="w-12 h-12 mx-auto text-blue-400 opacity-50 mb-4" />
                      <p className="text-blue-300">Upload an otolith image to see matching results from database</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {otolithDatabase.map((otolith, index) => (
                        <motion.div
                          key={otolith.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: index * 0.1 }}
                          className="border border-blue-600/50 rounded-lg p-4 hover:border-cyan-400/50 transition-colors cursor-pointer"
                        >
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex-1">
                              <h3 className="font-semibold text-white text-sm">{otolith.species}</h3>
                              <p className="text-xs text-blue-300">ID: {otolith.id}</p>
                            </div>
                            <div className="flex items-center">
                              <Badge
                                variant={otolith.similarity > 90 ? "default" : otolith.similarity > 80 ? "secondary" : "outline"}
                                className={
                                  otolith.similarity > 90
                                    ? "bg-green-500"
                                    : otolith.similarity > 80
                                    ? "bg-yellow-500"
                                    : "border-orange-500 text-orange-400"
                                }
                              >
                                {otolith.similarity}% match
                              </Badge>
                            </div>
                          </div>

                          <ImageWithFallback
                            src={otolith.image}
                            alt={`Otolith ${otolith.id}`}
                            className="w-full h-20 object-cover rounded mb-3"
                          />

                          <div className="space-y-2 text-xs text-blue-200">
                            <div className="grid grid-cols-2 gap-2">
                              <div>
                                <span className="font-medium">Length:</span> {otolith.morphometrics.length}mm
                              </div>
                              <div>
                                <span className="font-medium">Width:</span> {otolith.morphometrics.width}mm
                              </div>
                              <div>
                                <span className="font-medium">Area:</span> {otolith.morphometrics.area}mm²
                              </div>
                              <div>
                                <span className="font-medium">Roundness:</span> {otolith.morphometrics.roundness}
                              </div>
                            </div>
                            <div className="pt-2 border-t border-blue-700/50">
                              <div className="flex justify-between items-center">
                                <span className="font-medium">Region:</span>
                                <span className="text-cyan-400">{otolith.region}</span>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="font-medium">Age Range:</span>
                                <span className="text-cyan-400">{otolith.ageRange}</span>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="font-medium">Sample Size:</span>
                                <span className="text-cyan-400">{otolith.sampleSize}</span>
                              </div>
                            </div>
                          </div>

                          <div className="flex gap-2 mt-3">
                            <Button size="sm" variant="outline" className="flex-1 border-blue-600 text-blue-200 text-xs">
                              <Eye className="w-3 h-3 mr-1" />
                              Compare
                            </Button>
                            <Button size="sm" variant="outline" className="border-blue-600 text-blue-200">
                              <Download className="w-3 h-3" />
                            </Button>
                          </div>
                        </motion.div>
                      ))}

                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-blue-950"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Export Otolith Report
                      </Button>
                    </div>
                  )
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}