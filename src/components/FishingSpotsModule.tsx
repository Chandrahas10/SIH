import { useState } from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Textarea } from './ui/textarea';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { 
  MapPin, 
  Fish, 
  Search, 
  Map,
  AlertTriangle,
  Ban,
  CheckCircle,
  Clock,
  Eye,
  Shield,
  Anchor,
  Navigation,
  Info,
  Calendar,
  Users,
  FileText,
  Download,
  Share2,
  Settings
} from 'lucide-react';

interface FishingSpotsModuleProps {
  userType: string | null;
}

export function FishingSpotsModule({ userType }: FishingSpotsModuleProps) {
  const [searchFish, setSearchFish] = useState('');
  const [selectedFish, setSelectedFish] = useState<string | null>(null);
  const [selectedZone, setSelectedZone] = useState<string | null>(null);
  const [mapView, setMapView] = useState('satellite');
  const [selectedZoneForBlock, setSelectedZoneForBlock] = useState<string | null>(null);
  const [selectedFishForBlock, setSelectedFishForBlock] = useState<string | null>(null);
  const [blockingReason, setBlockingReason] = useState('');
  const [showBlockDialog, setShowBlockDialog] = useState(false);
  const [newZoneName, setNewZoneName] = useState('');
  const [newZoneCoords, setNewZoneCoords] = useState('');
  const [newZoneArea, setNewZoneArea] = useState('');

  // Mock fishing zones and fish data
  const fishingZones = [
    {
      id: 'zone-1',
      name: 'Lakshadweep Marine Zone',
      coordinates: '10.5667° N, 72.6417° E',
      status: 'open',
      area: '15,420 km²',
      maxDepth: '4,200m',
      restrictions: 'Seasonal restrictions apply from June-August',
      lastUpdated: '2024-01-15',
      image: 'https://images.unsplash.com/photo-1630516467783-718bdd4bd06b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXNoaW5nJTIwYm9hdCUyMG9jZWFuJTIwbWFwfGVufDF8fHx8MTc1ODc4MjE0OHww&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
      id: 'zone-2',
      name: 'Arabian Sea Shelf',
      coordinates: '15.2834° N, 69.7892° E',
      status: 'restricted',
      area: '28,750 km²',
      maxDepth: '2,800m',
      restrictions: 'Limited fishing - conservation zone',
      lastUpdated: '2024-01-20',
      image: 'https://images.unsplash.com/photo-1652188992774-7bf13d6a0807?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXJpbmUlMjBmaXNoaW5nJTIwYXJlYXN8ZW58MXx8fHwxNzU4NzgyMTUxfDA&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
      id: 'zone-3',
      name: 'Bay of Bengal Deep Waters',
      coordinates: '12.9716° N, 87.0824° E',
      status: 'closed',
      area: '42,180 km²',
      maxDepth: '5,500m',
      restrictions: 'Temporarily closed for stock recovery',
      lastUpdated: '2024-01-18',
      image: 'https://images.unsplash.com/photo-1562252521-d54eb17b4499?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvY2VhbiUyMGNvbnNlcnZhdGlvbiUyMG1hcmluZSUyMHByb3RlY3Rpb258ZW58MXx8fHwxNzU4NzgyMTU1fDA&ixlib=rb-4.1.0&q=80&w=1080'
    }
  ];

  // Species-specific zone restrictions for policy management
  const speciesZoneRestrictions = [
    {
      species: 'Red Snapper',
      restrictedZones: ['zone-1'],
      reason: 'Overfishing concerns - population recovery needed',
      implementedDate: '2024-01-15',
      reviewDate: '2024-06-15',
      status: 'active'
    },
    {
      species: 'Tuna',
      restrictedZones: ['zone-2'],
      reason: 'Spawning season protection',
      implementedDate: '2024-01-10',
      reviewDate: '2024-04-10',
      status: 'active'
    },
    {
      species: 'Kingfish',
      restrictedZones: ['zone-2'],
      reason: 'Migration route protection',
      implementedDate: '2024-01-12',
      reviewDate: '2024-05-12',
      status: 'active'
    },
    {
      species: 'Pomfret',
      restrictedZones: ['zone-3'],
      reason: 'Coral ecosystem protection',
      implementedDate: '2024-01-20',
      reviewDate: '2024-07-20',
      status: 'active'
    }
  ];

  const fishDatabase = [
    {
      name: 'Indian Mackerel',
      scientificName: 'Rastrelliger kanagurta',
      zones: ['zone-1', 'zone-2'],
      abundance: 'High',
      season: 'October - March',
      minDepth: '10m',
      maxDepth: '200m',
      conservationStatus: 'Least Concern',
      image: 'https://images.unsplash.com/photo-1609529666856-eeb9e407c437?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXNoJTIwbWFyaW5lJTIwYmlvbG9neXxlbnwxfHx8fDE3NTg3MzAzNTJ8MA&ixlib=rb-4.1.0&q=80&w=400'
    },
    {
      name: 'Pomfret',
      scientificName: 'Pampus argenteus',
      zones: ['zone-1', 'zone-3'],
      abundance: 'Medium',
      season: 'November - April',
      minDepth: '20m',
      maxDepth: '100m',
      conservationStatus: 'Near Threatened',
      image: 'https://images.unsplash.com/photo-1609529666856-eeb9e407c437?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXNoJTIwbWFyaW5lJTIwYmlvbG9neXxlbnwxfHx8fDE3NTg3MzAzNTJ8MA&ixlib=rb-4.1.0&q=80&w=400'
    },
    {
      name: 'Kingfish',
      scientificName: 'Scomberomorus commerson',
      zones: ['zone-2', 'zone-3'],
      abundance: 'Medium',
      season: 'December - May',
      minDepth: '50m',
      maxDepth: '300m',
      conservationStatus: 'Least Concern',
      image: 'https://images.unsplash.com/photo-1609529666856-eeb9e407c437?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXNoJTIwbWFyaW5lJTIwYmlvbG9neXxlbnwxfHx8fDE3NTg3MzAzNTJ8MA&ixlib=rb-4.1.0&q=80&w=400'
    },
    {
      name: 'Red Snapper',
      scientificName: 'Lutjanus malabaricus',
      zones: ['zone-1'],
      abundance: 'Low',
      season: 'January - June',
      minDepth: '30m',
      maxDepth: '150m',
      conservationStatus: 'Vulnerable',
      image: 'https://images.unsplash.com/photo-1609529666856-eeb9e407c437?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXNoJTIwbWFyaW5lJTIwYmlvbG9neXxlbnwxfHx8fDE3NTg3MzAzNTJ8MA&ixlib=rb-4.1.0&q=80&w=400'
    },
    {
      name: 'Tuna',
      scientificName: 'Thunnus albacares',
      zones: ['zone-2', 'zone-3'],
      abundance: 'High',
      season: 'September - February',
      minDepth: '100m',
      maxDepth: '800m',
      conservationStatus: 'Near Threatened',
      image: 'https://images.unsplash.com/photo-1609529666856-eeb9e407c437?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXNoJTIwbWFyaW5lJTIwYmlvbG9neXxlbnwxfHx8fDE3NTg3MzAzNTJ8MA&ixlib=rb-4.1.0&q=80&w=400'
    }
  ];

  const filteredFish = fishDatabase.filter(fish => 
    fish.name.toLowerCase().includes(searchFish.toLowerCase()) ||
    fish.scientificName.toLowerCase().includes(searchFish.toLowerCase())
  );

  const getZoneStatus = (status: string) => {
    switch (status) {
      case 'open':
        return { color: 'bg-green-500', icon: CheckCircle, text: 'Open for Fishing' };
      case 'restricted':
        return { color: 'bg-yellow-500', icon: AlertTriangle, text: 'Restricted Access' };
      case 'closed':
        return { color: 'bg-red-500', icon: Ban, text: 'Temporarily Closed' };
      default:
        return { color: 'bg-gray-500', icon: Clock, text: 'Status Unknown' };
    }
  };

  const handleFishSelect = (fishName: string) => {
    setSelectedFish(fishName);
  };

  const handleZoneUpdate = (zoneId: string, newStatus: string) => {
    // This would update the zone status in the backend
    console.log(`Updating zone ${zoneId} to status: ${newStatus}`);
  };

  const handleBlockFishInZone = (zoneId: string, fishName: string, reason: string) => {
    // This would implement the fish blocking logic in the backend
    console.log(`Blocking ${fishName} in zone ${zoneId}. Reason: ${reason}`);
    setShowBlockDialog(false);
    setBlockingReason('');
    setSelectedZoneForBlock(null);
    setSelectedFishForBlock(null);
  };

  const handleAddNewZone = () => {
    // This would add a new zone to the backend
    console.log(`Adding new zone: ${newZoneName} at ${newZoneCoords}`);
    setNewZoneName('');
    setNewZoneCoords('');
    setNewZoneArea('');
  };

  const openBlockDialog = (zoneId: string, fishName: string) => {
    setSelectedZoneForBlock(zoneId);
    setSelectedFishForBlock(fishName);
    setShowBlockDialog(true);
  };

  const selectedFishData = fishDatabase.find(fish => fish.name === selectedFish);
  const availableZones = selectedFishData ? 
    fishingZones.filter(zone => selectedFishData.zones.includes(zone.id)) : [];

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
          <h1 className="mb-4 text-4xl font-bold text-white">
            {userType === 'public' ? 'Fishing Spots Finder' : 'Fishing Zones Management'}
          </h1>
          <p className="text-xl text-blue-200">
            {userType === 'public' 
              ? 'Discover the best fishing locations for your favorite species'
              : userType === 'policy' 
                ? 'Manage fishing areas and conservation zones for sustainable marine resources'
                : 'Advanced fishing zone analytics and species distribution mapping'
            }
          </p>
        </motion.div>

        {userType === 'public' ? (
          // Public User Interface - Fish Finder
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <motion.div
              className="xl:col-span-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="bg-blue-900/30 border-blue-700/50 mb-6">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Search className="w-5 h-5 mr-2" />
                    Find Fishing Spots
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="relative mb-6">
                    <Search className="absolute left-3 top-3 w-5 h-5 text-blue-400" />
                    <Input
                      placeholder="Search for fish species (e.g., Indian Mackerel, Tuna, Pomfret...)"
                      value={searchFish}
                      onChange={(e) => setSearchFish(e.target.value)}
                      className="pl-10 bg-blue-800/50 border-blue-600 text-white placeholder:text-blue-300"
                    />
                  </div>

                  {/* Fish Results */}
                  <div className="space-y-3">
                    {filteredFish.map((fish, index) => (
                      <motion.div
                        key={fish.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 ${
                          selectedFish === fish.name
                            ? 'border-cyan-400 bg-cyan-400/10'
                            : 'border-blue-600/50 bg-blue-800/20 hover:border-cyan-400/50'
                        }`}
                        onClick={() => handleFishSelect(fish.name)}
                      >
                        <div className="flex items-center space-x-4">
                          <ImageWithFallback
                            src={fish.image}
                            alt={fish.name}
                            className="w-16 h-16 rounded-lg object-cover"
                          />
                          <div className="flex-1">
                            <h3 className="font-semibold text-white">{fish.name}</h3>
                            <p className="text-sm italic text-blue-300">{fish.scientificName}</p>
                            <div className="flex items-center gap-2 mt-2">
                              <Badge variant="outline" className="border-blue-600 text-blue-300">
                                {fish.abundance} abundance
                              </Badge>
                              <Badge variant="outline" className="border-green-600 text-green-300">
                                {fish.season}
                              </Badge>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm text-blue-200">Available in</div>
                            <div className="text-lg font-semibold text-cyan-400">
                              {fish.zones.length} zones
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Interactive Map Placeholder */}
              <Card className="bg-blue-900/30 border-blue-700/50">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Map className="w-5 h-5 mr-2" />
                    Interactive Fishing Map
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-96 bg-slate-900/50 rounded-lg flex items-center justify-center mb-4">
                    <div className="text-center text-blue-300">
                      <Map className="w-16 h-16 mx-auto mb-4 opacity-50" />
                      <h3 className="text-xl font-semibold mb-2">Interactive Map View</h3>
                      <p>
                        {selectedFish 
                          ? `Showing fishing zones for ${selectedFish}`
                          : 'Select a fish species to view available fishing zones'
                        }
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button
                      variant={mapView === 'satellite' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setMapView('satellite')}
                      className="border-blue-600 text-blue-200"
                    >
                      Satellite
                    </Button>
                    <Button
                      variant={mapView === 'nautical' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setMapView('nautical')}
                      className="border-blue-600 text-blue-200"
                    >
                      Nautical
                    </Button>
                    <Button
                      variant={mapView === 'depth' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setMapView('depth')}
                      className="border-blue-600 text-blue-200"
                    >
                      Depth Chart
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Right Sidebar - Zone Details */}
            <motion.div
              className="xl:col-span-1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card className="bg-blue-900/30 border-blue-700/50 sticky top-24">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <MapPin className="w-5 h-5 mr-2" />
                    Fishing Zone Details
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {selectedFish && availableZones.length > 0 ? (
                    <div className="space-y-4">
                      <div className="mb-4">
                        <h3 className="font-semibold text-cyan-400 mb-2">{selectedFish}</h3>
                        <p className="text-sm text-blue-300">Available in {availableZones.length} fishing zones</p>
                      </div>

                      {availableZones.map((zone, index) => {
                        const statusInfo = getZoneStatus(zone.status);
                        const StatusIcon = statusInfo.icon;
                        
                        return (
                          <motion.div
                            key={zone.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                            className="border border-blue-600/50 rounded-lg p-4"
                          >
                            <div className="flex items-start justify-between mb-3">
                              <div>
                                <h4 className="font-semibold text-white text-sm">{zone.name}</h4>
                                <p className="text-xs text-blue-300">{zone.coordinates}</p>
                              </div>
                              <Badge className={statusInfo.color}>
                                <StatusIcon className="w-3 h-3 mr-1" />
                                {zone.status}
                              </Badge>
                            </div>

                            <ImageWithFallback
                              src={zone.image}
                              alt={zone.name}
                              className="w-full h-20 object-cover rounded mb-3"
                            />

                            <div className="space-y-1 text-xs text-blue-200">
                              <div className="flex justify-between">
                                <span>Area:</span>
                                <span className="text-cyan-400">{zone.area}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Max Depth:</span>
                                <span className="text-cyan-400">{zone.maxDepth}</span>
                              </div>
                              <div className="pt-2 border-t border-blue-700/50">
                                <div className="flex items-center text-yellow-400">
                                  <Info className="w-3 h-3 mr-1" />
                                  <span className="font-medium">Restrictions</span>
                                </div>
                                <p className="text-yellow-300 mt-1">{zone.restrictions}</p>
                              </div>
                            </div>

                            <Button
                              size="sm"
                              variant="outline"
                              className="w-full mt-3 border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-blue-950"
                            >
                              <Navigation className="w-3 h-3 mr-1" />
                              Navigate to Zone
                            </Button>
                          </motion.div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Fish className="w-12 h-12 mx-auto text-blue-400 opacity-50 mb-4" />
                      <p className="text-blue-300">Select a fish species to view available fishing zones</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        ) : (
          // Policy Maker Interface - Zone Management
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <motion.div
              className="xl:col-span-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Tabs defaultValue="zones" className="space-y-6">
                <TabsList className="bg-blue-900/50 border border-blue-700/50">
                  <TabsTrigger value="zones" className="data-[state=active]:bg-cyan-500 data-[state=active]:text-white">
                    <Shield className="w-4 h-4 mr-2" />
                    Zone Management
                  </TabsTrigger>
                  <TabsTrigger value="fish-search" className="data-[state=active]:bg-cyan-500 data-[state=active]:text-white">
                    <Search className="w-4 h-4 mr-2" />
                    Fish Distribution
                  </TabsTrigger>
                  <TabsTrigger value="reports" className="data-[state=active]:bg-cyan-500 data-[state=active]:text-white">
                    <FileText className="w-4 h-4 mr-2" />
                    Conservation Reports
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="zones">
                  <Card className="bg-blue-900/30 border-blue-700/50">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center">
                        <Shield className="w-5 h-5 mr-2" />
                        Marine Conservation Zones
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {fishingZones.map((zone, index) => {
                          const statusInfo = getZoneStatus(zone.status);
                          const StatusIcon = statusInfo.icon;
                          
                          return (
                            <motion.div
                              key={zone.id}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3, delay: index * 0.1 }}
                              className="border border-blue-600/50 rounded-lg p-4 bg-blue-800/20"
                            >
                              <div className="flex items-start justify-between mb-4">
                                <div className="flex-1">
                                  <h3 className="font-semibold text-white mb-1">{zone.name}</h3>
                                  <p className="text-sm text-blue-300">{zone.coordinates}</p>
                                  <p className="text-xs text-blue-400 mt-1">
                                    Last updated: {zone.lastUpdated}
                                  </p>
                                </div>
                                <Badge className={statusInfo.color}>
                                  <StatusIcon className="w-3 h-3 mr-1" />
                                  {statusInfo.text}
                                </Badge>
                              </div>

                              <div className="grid grid-cols-2 gap-4 mb-4">
                                <div>
                                  <div className="text-sm text-blue-200">Area Coverage</div>
                                  <div className="text-lg font-semibold text-white">{zone.area}</div>
                                </div>
                                <div>
                                  <div className="text-sm text-blue-200">Maximum Depth</div>
                                  <div className="text-lg font-semibold text-white">{zone.maxDepth}</div>
                                </div>
                              </div>

                              <div className="mb-4 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded">
                                <div className="flex items-center text-yellow-400 mb-1">
                                  <AlertTriangle className="w-4 h-4 mr-2" />
                                  <span className="font-medium">Current Restrictions</span>
                                </div>
                                <p className="text-sm text-yellow-300">{zone.restrictions}</p>
                              </div>

                              <div className="flex gap-2">
                                <Select onValueChange={(value) => handleZoneUpdate(zone.id, value)}>
                                  <SelectTrigger className="bg-blue-800/50 border-blue-600">
                                    <SelectValue placeholder="Update Status" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="open">Open for Fishing</SelectItem>
                                    <SelectItem value="restricted">Restricted Access</SelectItem>
                                    <SelectItem value="closed">Temporarily Closed</SelectItem>
                                  </SelectContent>
                                </Select>
                                <Button size="sm" variant="outline" className="border-cyan-400 text-cyan-400">
                                  <Eye className="w-4 h-4 mr-1" />
                                  View Details
                                </Button>
                                <Button size="sm" variant="outline" className="border-blue-600 text-blue-200">
                                  <Settings className="w-4 h-4 mr-1" />
                                  Configure
                                </Button>
                              </div>
                            </motion.div>
                          );
                        })}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="fish-search">
                  {/* Include the public fish search interface here but with admin controls */}
                  <Card className="bg-blue-900/30 border-blue-700/50">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center">
                        <Fish className="w-5 h-5 mr-2" />
                        Fish Distribution Analysis
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="relative mb-6">
                        <Search className="absolute left-3 top-3 w-5 h-5 text-blue-400" />
                        <Input
                          placeholder="Analyze distribution for fish species..."
                          value={searchFish}
                          onChange={(e) => setSearchFish(e.target.value)}
                          className="pl-10 bg-blue-800/50 border-blue-600 text-white placeholder:text-blue-300"
                        />
                      </div>
                      <p className="text-blue-300 text-sm">
                        Search for fish species to analyze their distribution across managed zones and identify areas needing protection.
                      </p>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="reports">
                  <Card className="bg-blue-900/30 border-blue-700/50">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center">
                        <FileText className="w-5 h-5 mr-2" />
                        Conservation Impact Reports
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <Card className="bg-blue-800/30 border-blue-600/50">
                            <CardContent className="p-4 text-center">
                              <div className="text-2xl font-bold text-green-400">78%</div>
                              <div className="text-sm text-blue-200">Zones Protected</div>
                            </CardContent>
                          </Card>
                          <Card className="bg-blue-800/30 border-blue-600/50">
                            <CardContent className="p-4 text-center">
                              <div className="text-2xl font-bold text-yellow-400">22</div>
                              <div className="text-sm text-blue-200">Active Restrictions</div>
                            </CardContent>
                          </Card>
                          <Card className="bg-blue-800/30 border-blue-600/50">
                            <CardContent className="p-4 text-center">
                              <div className="text-2xl font-bold text-cyan-400">95%</div>
                              <div className="text-sm text-blue-200">Compliance Rate</div>
                            </CardContent>
                          </Card>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" className="border-cyan-400 text-cyan-400">
                            <Download className="w-4 h-4 mr-2" />
                            Export Report
                          </Button>
                          <Button variant="outline" className="border-blue-600 text-blue-200">
                            <Share2 className="w-4 h-4 mr-2" />
                            Share with Agencies
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </motion.div>

            {/* Policy Maker Sidebar */}
            <motion.div
              className="xl:col-span-1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="space-y-6">
                <Card className="bg-blue-900/30 border-blue-700/50">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <Anchor className="w-5 h-5 mr-2" />
                      Quick Actions
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white">
                      <Ban className="w-4 h-4 mr-2" />
                      Emergency Zone Closure
                    </Button>
                    <Button className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-white">
                      <AlertTriangle className="w-4 h-4 mr-2" />
                      Issue Restriction Alert
                    </Button>
                    <Button className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Lift Restrictions
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-blue-900/30 border-blue-700/50">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <Users className="w-5 h-5 mr-2" />
                      Stakeholder Alerts
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 text-sm">
                      <div className="flex items-center text-yellow-400">
                        <AlertTriangle className="w-4 h-4 mr-2" />
                        <span>3 pending zone reviews</span>
                      </div>
                      <div className="flex items-center text-green-400">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        <span>2 new compliance reports</span>
                      </div>
                      <div className="flex items-center text-blue-400">
                        <Calendar className="w-4 h-4 mr-2" />
                        <span>Meeting scheduled for tomorrow</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}