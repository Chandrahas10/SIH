import { useState } from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Slider } from './ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { HoverCard, HoverCardContent, HoverCardTrigger } from './ui/hover-card';
import { 
  Search, 
  Filter, 
  Download, 
  Eye, 
  Calendar, 
  MapPin, 
  Thermometer,
  Waves,
  Fish,
  MoreVertical,
  ChevronRight
} from 'lucide-react';

export function DataExplorer() {
  const [searchQuery, setSearchQuery] = useState('');
  const [depthRange, setDepthRange] = useState([0, 1000]);
  const [temperatureRange, setTemperatureRange] = useState([0, 30]);
  const [selectedYear, setSelectedYear] = useState('all');
  const [selectedSpecies, setSelectedSpecies] = useState('all');

  // Mock dataset data
  const datasets = [
    {
      id: 'OCN-2024-001',
      title: 'Arabian Sea Temperature Profiles',
      type: 'Oceanography',
      location: 'Arabian Sea',
      depth: '0-500m',
      temperature: '18-28°C',
      dateRange: 'Jan 2024 - Dec 2024',
      records: 15234,
      lastUpdated: '2 hours ago',
      species: null,
      description: 'High-resolution temperature and salinity measurements from CTD deployments across the Arabian Sea.',
      tags: ['CTD', 'Temperature', 'Salinity', 'Physical Oceanography']
    },
    {
      id: 'BIO-2023-045',
      title: 'Mumbai Coast Fish Diversity',
      type: 'Biodiversity',
      location: 'Mumbai Coast',
      depth: '5-200m',
      temperature: '22-26°C',
      dateRange: 'Mar 2023 - Nov 2023',
      records: 2847,
      lastUpdated: '1 day ago',
      species: 'Pomfret, Mackerel, Sardine',
      description: 'Comprehensive fish species survey along Mumbai coastal waters with abundance data.',
      tags: ['Fish', 'Biodiversity', 'Coastal', 'Species Count']
    },
    {
      id: 'FISH-2024-012',
      title: 'Tuna Stock Assessment - Indian Ocean',
      type: 'Fisheries',
      location: 'Indian Ocean',
      depth: '50-300m',
      temperature: '24-28°C',
      dateRange: 'Jun 2024 - Present',
      records: 8956,
      lastUpdated: '6 hours ago',
      species: 'Yellowfin Tuna, Bigeye Tuna',
      description: 'Population dynamics and catch data for commercial tuna species in Indian Ocean waters.',
      tags: ['Tuna', 'Stock Assessment', 'Commercial', 'CPUE']
    },
    {
      id: 'DNA-2024-008',
      title: 'Coral Reef eDNA Metabarcoding',
      type: 'eDNA',
      location: 'Lakshadweep',
      depth: '1-30m',
      temperature: '26-29°C',
      dateRange: 'Feb 2024 - Aug 2024',
      records: 1456,
      lastUpdated: '3 days ago',
      species: 'Multiple coral and fish species',
      description: 'Environmental DNA sampling to assess coral reef biodiversity and health status.',
      tags: ['eDNA', 'Coral', 'Metabarcoding', 'Biodiversity']
    },
    {
      id: 'OCN-2023-078',
      title: 'Monsoon Current Dynamics',
      type: 'Oceanography',
      location: 'Bay of Bengal',
      depth: '0-1000m',
      temperature: '16-30°C',
      dateRange: 'May 2023 - Oct 2023',
      records: 23456,
      lastUpdated: '5 days ago',
      species: null,
      description: 'ADCP measurements of current velocity and direction during monsoon season.',
      tags: ['Current', 'ADCP', 'Monsoon', 'Physical Oceanography']
    },
    {
      id: 'BIO-2024-023',
      title: 'Deep Sea Benthic Survey',
      type: 'Biodiversity',
      location: 'Arabian Sea',
      depth: '500-2000m',
      temperature: '4-12°C',
      dateRange: 'Apr 2024 - Sep 2024',
      records: 934,
      lastUpdated: '1 week ago',
      species: 'Various benthic organisms',
      description: 'ROV-based survey of deep sea benthic communities and habitat mapping.',
      tags: ['Deep Sea', 'Benthic', 'ROV', 'Habitat']
    }
  ];

  const filteredDatasets = datasets.filter(dataset => {
    const matchesSearch = dataset.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         dataset.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         dataset.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesSearch;
  });

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Oceanography': return 'bg-blue-500';
      case 'Biodiversity': return 'bg-green-500';
      case 'Fisheries': return 'bg-orange-500';
      case 'eDNA': return 'bg-purple-500';
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
          <h1 className="mb-4 text-4xl font-bold text-white">Data Explorer</h1>
          <p className="text-xl text-blue-200">
            Unified access to oceanographic, biodiversity, fisheries, and molecular datasets
          </p>
        </motion.div>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          {/* Filter Panel */}
          <motion.div
            className="xl:col-span-1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="bg-blue-900/30 border-blue-700/50 sticky top-24">
              <CardHeader>
                <CardTitle className="flex items-center text-white">
                  <Filter className="w-5 h-5 mr-2" />
                  Filters
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Search */}
                <div>
                  <label className="block text-sm font-medium text-blue-200 mb-2">
                    Search Datasets
                  </label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400 w-4 h-4" />
                    <Input
                      type="text"
                      placeholder="Search by title, type, location..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 bg-blue-800/50 border-blue-600 text-white placeholder:text-blue-300"
                    />
                  </div>
                </div>

                {/* Depth Range */}
                <div>
                  <label className="block text-sm font-medium text-blue-200 mb-2">
                    Depth Range (m)
                  </label>
                  <div className="px-2">
                    <Slider
                      value={depthRange}
                      onValueChange={setDepthRange}
                      max={2000}
                      min={0}
                      step={10}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-blue-300 mt-1">
                      <span>{depthRange[0]}m</span>
                      <span>{depthRange[1]}m</span>
                    </div>
                  </div>
                </div>

                {/* Temperature Range */}
                <div>
                  <label className="block text-sm font-medium text-blue-200 mb-2">
                    Temperature Range (°C)
                  </label>
                  <div className="px-2">
                    <Slider
                      value={temperatureRange}
                      onValueChange={setTemperatureRange}
                      max={35}
                      min={0}
                      step={1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-blue-300 mt-1">
                      <span>{temperatureRange[0]}°C</span>
                      <span>{temperatureRange[1]}°C</span>
                    </div>
                  </div>
                </div>

                {/* Year Filter */}
                <div>
                  <label className="block text-sm font-medium text-blue-200 mb-2">
                    Year
                  </label>
                  <Select value={selectedYear} onValueChange={setSelectedYear}>
                    <SelectTrigger className="bg-blue-800/50 border-blue-600 text-white">
                      <SelectValue placeholder="Select year" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Years</SelectItem>
                      <SelectItem value="2024">2024</SelectItem>
                      <SelectItem value="2023">2023</SelectItem>
                      <SelectItem value="2022">2022</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Species Filter */}
                <div>
                  <label className="block text-sm font-medium text-blue-200 mb-2">
                    Species
                  </label>
                  <Select value={selectedSpecies} onValueChange={setSelectedSpecies}>
                    <SelectTrigger className="bg-blue-800/50 border-blue-600 text-white">
                      <SelectValue placeholder="Select species" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Species</SelectItem>
                      <SelectItem value="tuna">Tuna</SelectItem>
                      <SelectItem value="sardine">Sardine</SelectItem>
                      <SelectItem value="mackerel">Mackerel</SelectItem>
                      <SelectItem value="coral">Coral</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button 
                  variant="outline" 
                  className="w-full border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-blue-950"
                >
                  Reset Filters
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Results Section */}
          <motion.div
            className="xl:col-span-3 space-y-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {/* Results Header */}
            <div className="flex items-center justify-between bg-blue-900/30 border border-blue-700/50 rounded-lg p-4">
              <div className="text-white">
                <span className="text-lg font-semibold">{filteredDatasets.length} datasets found</span>
                <span className="text-blue-300 ml-2">• Total {datasets.reduce((sum, d) => sum + d.records, 0).toLocaleString()} records</span>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="border-blue-600 text-blue-200">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>

            {/* Dataset Cards */}
            <div className="space-y-4">
              {filteredDatasets.map((dataset, index) => (
                <motion.div
                  key={dataset.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ scale: 1.01, y: -2 }}
                >
                  <HoverCard>
                    <HoverCardTrigger asChild>
                      <Card className="bg-blue-900/30 border-blue-700/50 hover:border-cyan-400/50 transition-all duration-300 cursor-pointer">
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <Badge className={`${getTypeColor(dataset.type)} text-white`}>
                                  {dataset.type}
                                </Badge>
                                <span className="text-blue-300 text-sm font-mono">{dataset.id}</span>
                              </div>
                              <h3 className="text-xl font-semibold text-white mb-2">{dataset.title}</h3>
                              <p className="text-blue-200 mb-3 line-clamp-2">{dataset.description}</p>
                            </div>
                            <Button variant="ghost" size="sm" className="text-blue-400 hover:text-white">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </div>

                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                            <div className="flex items-center text-blue-300">
                              <MapPin className="w-4 h-4 mr-2" />
                              <span className="text-sm">{dataset.location}</span>
                            </div>
                            <div className="flex items-center text-blue-300">
                              <Waves className="w-4 h-4 mr-2" />
                              <span className="text-sm">{dataset.depth}</span>
                            </div>
                            <div className="flex items-center text-blue-300">
                              <Thermometer className="w-4 h-4 mr-2" />
                              <span className="text-sm">{dataset.temperature}</span>
                            </div>
                            <div className="flex items-center text-blue-300">
                              <Calendar className="w-4 h-4 mr-2" />
                              <span className="text-sm">{dataset.dateRange}</span>
                            </div>
                          </div>

                          {dataset.species && (
                            <div className="flex items-center mb-4 text-blue-300">
                              <Fish className="w-4 h-4 mr-2" />
                              <span className="text-sm">{dataset.species}</span>
                            </div>
                          )}

                          <div className="flex flex-wrap gap-2 mb-4">
                            {dataset.tags.map((tag, tagIndex) => (
                              <Badge key={tagIndex} variant="outline" className="border-blue-600 text-blue-300">
                                {tag}
                              </Badge>
                            ))}
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="text-sm text-blue-300">
                              <span className="font-semibold text-cyan-400">{dataset.records.toLocaleString()}</span> records
                              <span className="ml-3">Updated {dataset.lastUpdated}</span>
                            </div>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm" className="border-blue-600 text-blue-200">
                                <Eye className="w-4 h-4 mr-2" />
                                Preview
                              </Button>
                              <Button size="sm" className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white">
                                Open Dataset
                                <ChevronRight className="w-4 h-4 ml-2" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-80 bg-blue-900 border-blue-700 text-white">
                      <div className="space-y-2">
                        <h4 className="font-semibold">{dataset.title}</h4>
                        <p className="text-sm text-blue-200">{dataset.description}</p>
                        <div className="text-xs text-blue-300">
                          <div>Dataset ID: {dataset.id}</div>
                          <div>Records: {dataset.records.toLocaleString()}</div>
                          <div>Last updated: {dataset.lastUpdated}</div>
                        </div>
                      </div>
                    </HoverCardContent>
                  </HoverCard>
                </motion.div>
              ))}
            </div>

            {/* Load More */}
            <div className="text-center pt-8">
              <Button 
                variant="outline" 
                className="border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-blue-950"
              >
                Load More Datasets
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}