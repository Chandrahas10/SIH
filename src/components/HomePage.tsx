import { useState } from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { ImageWithFallback } from './figma/ImageWithFallback';

import { 
  Search, 
  Database, 
  Fish, 
  Waves, 
  TrendingUp, 
  Users, 
  Activity,
  BarChart3,
  Compass,
  Droplets,
  Shield,
  MapPin,
  Dna,
  AlertTriangle,
  Settings,
  Eye
} from 'lucide-react';

interface HomePageProps {
  isLoggedIn?: boolean;
  userType?: string | null;
  setCurrentPage?: (page: string) => void;
}

export function HomePage({ isLoggedIn = false, userType = null, setCurrentPage }: HomePageProps = {}) {
  const [searchQuery, setSearchQuery] = useState('');

  const stats = [
    { label: 'Active Datasets', value: '2,847', change: '+12%', icon: Database },
    { label: 'Species Catalogued', value: '15,234', change: '+8%', icon: Fish },
    { label: 'Research Projects', value: '342', change: '+23%', icon: Activity },
    { label: 'Active Users', value: '1,289', change: '+15%', icon: Users },
  ];

  const modules = [
    {
      title: 'Oceanography',
      description: 'Temperature, salinity, currents, and physical ocean parameters',
      stats: '1,245 datasets • Updated daily',
      icon: Waves,
      gradient: 'from-blue-500 to-cyan-500',
      image: 'https://images.unsplash.com/photo-1708864163871-311332fb9d5e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvY2VhbiUyMHVuZGVyd2F0ZXIlMjBibHVlJTIwbWFyaW5lfGVufDF8fHx8MTc1ODczMDM1MHww&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
      title: 'Fisheries',
      description: 'Stock assessments, catch data, and fisheries management',
      stats: '892 datasets • 156 species tracked',
      icon: Fish,
      gradient: 'from-emerald-500 to-teal-500',
      image: 'https://images.unsplash.com/photo-1609529666856-eeb9e407c437?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXNoJTIwbWFyaW5lJTIwYmlvbG9neXxlbnwxfHx8fDE3NTg3MzAzNTJ8MA&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
      title: 'Biodiversity',
      description: 'Species distribution, abundance, and ecosystem health',
      stats: '710 datasets • 2,847 species records',
      icon: Compass,
      gradient: 'from-orange-500 to-red-500',
      image: 'https://images.unsplash.com/photo-1745917783787-ae46517f7f78?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3JhbCUyMHJlZWYlMjBiaW9kaXZlcnNpdHl8ZW58MXx8fHwxNzU4NzMwMzU1fDA&ixlib=rb-4.1.0&q=80&w=1080'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Policy Maker Dashboard - Show modules directly */}
      {isLoggedIn && userType === 'policymaker' && (
        <section className="py-8 lg:py-12 px-6 lg:px-8 xl:px-12">
          <div className="max-w-8xl mx-auto">
            <motion.div
              className="mb-10 lg:mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="mb-6 text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight">
                Policy Maker Dashboard
              </h1>
              <p className="text-xl lg:text-2xl xl:text-3xl text-blue-200 max-w-4xl">
                Comprehensive marine conservation and fishing zone management
              </p>
            </motion.div>

            {/* Quick Stats for Policy Makers */}
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 lg:gap-8 mb-10 lg:mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="bg-blue-900/30 border-blue-700/50">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Shield className="w-8 h-8 text-cyan-400" />
                    <span className="text-sm text-green-400">+78%</span>
                  </div>
                  <div className="text-3xl font-bold text-white mb-2">5</div>
                  <div className="text-blue-200">Protected Zones</div>
                </CardContent>
              </Card>
              
              <Card className="bg-blue-900/30 border-blue-700/50">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <AlertTriangle className="w-8 h-8 text-orange-400" />
                    <span className="text-sm text-yellow-400">Active</span>
                  </div>
                  <div className="text-3xl font-bold text-white mb-2">22</div>
                  <div className="text-blue-200">Species Restrictions</div>
                </CardContent>
              </Card>
              
              <Card className="bg-blue-900/30 border-blue-700/50">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Dna className="w-8 h-8 text-purple-400" />
                    <span className="text-sm text-blue-400">Updated</span>
                  </div>
                  <div className="text-3xl font-bold text-white mb-2">847</div>
                  <div className="text-blue-200">eDNA Samples</div>
                </CardContent>
              </Card>
              
              <Card className="bg-blue-900/30 border-blue-700/50">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <TrendingUp className="w-8 h-8 text-green-400" />
                    <span className="text-sm text-green-400">+95%</span>
                  </div>
                  <div className="text-3xl font-bold text-white mb-2">95%</div>
                  <div className="text-blue-200">Compliance Rate</div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Dashboard Modules for Policy Makers */}
            <motion.div
              className="grid grid-cols-1 xl:grid-cols-2 gap-8 lg:gap-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {/* Fishing Spots Dashboard Card */}
              <Card className="bg-blue-900/30 border-blue-700/50 hover:border-cyan-400/50 transition-all duration-300 cursor-pointer group"
                    onClick={() => setCurrentPage && setCurrentPage('fishing-spots')}>
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <MapPin className="w-5 h-5 mr-2 text-cyan-400" />
                    Fishing Zone Management
                  </CardTitle>
                  <CardDescription className="text-blue-200">
                    Manage fishing areas, implement restrictions, and monitor conservation zones
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {/* Quick Stats */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-blue-800/30 rounded-lg p-4">
                      <div className="text-2xl font-bold text-white">5</div>
                      <div className="text-sm text-blue-300">Active Zones</div>
                    </div>
                    <div className="bg-blue-800/30 rounded-lg p-4">
                      <div className="text-2xl font-bold text-yellow-400">22</div>
                      <div className="text-sm text-blue-300">Restrictions</div>
                    </div>
                  </div>
                  
                  {/* Recent Activity */}
                  <div className="space-y-2 mb-4">
                    <div className="text-sm font-medium text-blue-200">Recent Activity</div>
                    <div className="space-y-1">
                      <div className="flex items-center text-xs text-blue-300">
                        <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                        Red Snapper restricted in Zone 1
                      </div>
                      <div className="flex items-center text-xs text-blue-300">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
                        Tuna monitoring in Zone 2
                      </div>
                      <div className="flex items-center text-xs text-blue-300">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                        Zone 5 status updated
                      </div>
                    </div>
                  </div>

                  <Button 
                    className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white group-hover:from-cyan-600 group-hover:to-blue-600"
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentPage && setCurrentPage('fishing-spots');
                    }}
                  >
                    <MapPin className="w-4 h-4 mr-2" />
                    Open Zone Manager
                  </Button>
                </CardContent>
              </Card>

              {/* eDNA Dashboard Card */}
              <Card className="bg-blue-900/30 border-blue-700/50 hover:border-purple-400/50 transition-all duration-300 cursor-pointer group"
                    onClick={() => setCurrentPage && setCurrentPage('edna')}>
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Dna className="w-5 h-5 mr-2 text-purple-400" />
                    eDNA Conservation Analytics
                  </CardTitle>
                  <CardDescription className="text-blue-200">
                    Monitor genetic diversity, track species populations, and conservation alerts
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {/* Quick Stats */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-blue-800/30 rounded-lg p-4">
                      <div className="text-2xl font-bold text-white">847</div>
                      <div className="text-sm text-blue-300">DNA Samples</div>
                    </div>
                    <div className="bg-blue-800/30 rounded-lg p-4">
                      <div className="text-2xl font-bold text-red-400">3</div>
                      <div className="text-sm text-blue-300">Critical Alerts</div>
                    </div>
                  </div>
                  
                  {/* Conservation Alerts */}
                  <div className="space-y-2 mb-4">
                    <div className="text-sm font-medium text-blue-200">Conservation Alerts</div>
                    <div className="space-y-1">
                      <div className="flex items-center text-xs text-red-300">
                        <AlertTriangle className="w-3 h-3 mr-2" />
                        Sawfish critically endangered
                      </div>
                      <div className="flex items-center text-xs text-orange-300">
                        <AlertTriangle className="w-3 h-3 mr-2" />
                        Yellowfin Tuna declining
                      </div>
                      <div className="flex items-center text-xs text-yellow-300">
                        <Eye className="w-3 h-3 mr-2" />
                        Mackerel monitoring required
                      </div>
                    </div>
                  </div>

                  <Button 
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white group-hover:from-purple-600 group-hover:to-pink-600"
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentPage && setCurrentPage('edna');
                    }}
                  >
                    <Dna className="w-4 h-4 mr-2" />
                    Open eDNA Analytics
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* Quick Actions for Policy Makers */}
            <motion.div
              className="mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Card className="bg-blue-900/30 border-blue-700/50">
                <CardHeader>
                  <CardTitle className="text-white">Quick Policy Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Button className="bg-gradient-to-r from-red-500 to-red-600 text-white">
                      <AlertTriangle className="w-4 h-4 mr-2" />
                      Emergency Zone Closure
                    </Button>
                    <Button className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white">
                      <Shield className="w-4 h-4 mr-2" />
                      Implement Species Ban
                    </Button>
                    <Button className="bg-gradient-to-r from-green-500 to-emerald-500 text-white">
                      <TrendingUp className="w-4 h-4 mr-2" />
                      Generate Conservation Report
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>
      )}

      {/* Standard Hero Section for other users */}
      {(!isLoggedIn || userType !== 'policymaker') && (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-6 lg:px-8 xl:px-12">
          {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-950 via-blue-900 to-slate-900" />
          <motion.div
            className="absolute inset-0 opacity-20"
            animate={{
              background: [
                'radial-gradient(circle at 20% 50%, cyan 0%, transparent 50%)',
                'radial-gradient(circle at 80% 50%, cyan 0%, transparent 50%)',
                'radial-gradient(circle at 40% 80%, cyan 0%, transparent 50%)',
                'radial-gradient(circle at 60% 20%, cyan 0%, transparent 50%)',
              ]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          {/* Floating particles */}
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-cyan-400 rounded-full opacity-30"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -100, 0],
                opacity: [0.3, 0.7, 0.3],
              }}
              transition={{
                duration: 4 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 4,
              }}
            />
          ))}
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-4 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="mb-6 text-6xl md:text-8xl lg:text-9xl xl:text-[10rem] font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent leading-tight">
              BLUESPHERE
            </h1>
            <h2 className="mb-8 text-2xl md:text-4xl lg:text-5xl xl:text-6xl text-blue-100">
              {isLoggedIn && userType ? (
                <>Welcome back, {userType}!</>
              ) : (
                <>Marine Data Research Platform</>
              )}
            </h2>
            <p className="mb-12 text-lg md:text-xl lg:text-2xl xl:text-3xl text-blue-200 max-w-5xl mx-auto leading-relaxed">
              {isLoggedIn ? (
                <>Access your premium marine research tools, analyze comprehensive datasets, and collaborate with the global research community. Your {userType} subscription gives you full access to our advanced features.</>
              ) : (
                <>Advancing marine science through comprehensive data integration, analysis, and visualization. 
                Explore oceanographic parameters, biodiversity assessments, and fisheries data in one unified platform.</>
              )}
            </p>

            {/* Search Bar */}
            <motion.div
              className="relative max-w-2xl mx-auto mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Search species, parameters, or datasets..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-4 py-4 text-lg bg-blue-900/50 border-blue-700 text-white placeholder:text-blue-300 focus:ring-cyan-400 focus:border-cyan-400"
                />
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <Button 
                size="lg"
                className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-8 py-4 text-lg"
              >
                <Database className="w-5 h-5 mr-2" />
                Explore Data
              </Button>
              <Button 
                variant="outline"
                size="lg"
                className="border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-blue-950 px-8 py-4 text-lg"
              >
                <BarChart3 className="w-5 h-5 mr-2" />
                Visualization Studio
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-cyan-400 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-cyan-400 rounded-full mt-2"></div>
          </div>
        </motion.div>
      </section>
      )}

      {/* Stats Section - for non-policy users */}
      {(!isLoggedIn || userType !== 'policymaker') && (
        <>
          <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="bg-blue-900/30 border-blue-700/50 hover:bg-blue-900/50 transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <Icon className="w-8 h-8 text-cyan-400" />
                        <span className="text-sm text-emerald-400">{stat.change}</span>
                      </div>
                      <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                      <div className="text-blue-200">{stat.label}</div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Module Cards */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {modules.map((module, index) => {
              const Icon = module.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="group cursor-pointer"
                >
                  <Card className="overflow-hidden bg-blue-900/30 border-blue-700/50 hover:border-cyan-400/50 transition-all duration-300 h-full">
                    <div className="relative h-48 overflow-hidden">
                      <ImageWithFallback
                        src={module.image}
                        alt={module.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className={`absolute inset-0 bg-gradient-to-t ${module.gradient} opacity-60`} />
                      <div className="absolute top-4 left-4">
                        <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                      </div>
                    </div>
                    
                    <CardContent className="p-6">
                      <CardTitle className="text-xl text-white mb-3">{module.title}</CardTitle>
                      <CardDescription className="text-blue-200 mb-4 leading-relaxed">
                        {module.description}
                      </CardDescription>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-cyan-400">{module.stats}</span>
                        <TrendingUp className="w-4 h-4 text-emerald-400" />
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

          {/* Quick Actions */}
          <section className="py-20 px-4 bg-blue-950/50">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="mb-8 text-4xl font-bold text-white">
              Ready to Dive In?
            </h2>
            <p className="mb-12 text-xl text-blue-200 max-w-3xl mx-auto">
              Access comprehensive marine datasets, advanced visualization tools, and collaborative research platforms.
            </p>
            
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
  {[
    { title: 'Data Explorer', icon: Database, desc: 'Browse all datasets' },
    { title: 'Visualizations', icon: BarChart3, desc: 'Create interactive charts' },
    { title: 'Species ID', icon: Fish, desc: 'Identify marine species' },
    { title: 'eDNA Analysis', icon: Droplets, desc: 'Molecular data tools' },
  ].map((action, index) => {
    const Icon = action.icon;
    return (
      <motion.div
        key={index}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        viewport={{ once: true }}
      >
        <Button
          variant="outline"
          className="w-full h-32 flex-col border-blue-600 text-[#14224d] hover:bg-blue-800/50 hover:border-cyan-400 hover:text-white group"
        >
          <Icon className="w-8 h-8 mb-2 group-hover:text-cyan-300 transition-colors duration-200" />
          <span className="font-semibold group-hover:font-bold group-hover:text-white transition-all duration-200">
            {action.title}
          </span>
          <span className="text-sm opacity-75 group-hover:opacity-100 group-hover:text-blue-100 group-hover:font-medium transition-all duration-200">
            {action.desc}
          </span>
        </Button>
      </motion.div>
    );
  })}
</div>


          </motion.div>
          </div>
          </section>
        </>
      )}
    </div>
  );
}