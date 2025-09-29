import { useState } from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { NotificationSystem } from './NotificationSystem';
import { 
  Menu, 
  X, 
  Home, 
  Database, 
  BarChart3, 
  Fish, 
  Dna, 
  FileText, 
  Users, 
  HelpCircle,
  Bell,
  User,
  LogIn,
  MapPin
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import blueSphereLogoImg from 'figma:asset/a8586a467674fa5556f8b8908ea79aaa013549b7.png';

// BLUESPHERE Logo Component - Desktop
const BlueSphereIcon = () => (
  <div className="w-12 h-12 rounded-full overflow-hidden shadow-lg border-2 border-cyan-400/50 bg-white">
    <ImageWithFallback 
      src={blueSphereLogoImg} 
      alt="BLUESPHERE Logo"
      className="w-full h-full object-contain p-0.5"
    />
  </div>
);

// Mobile BLUESPHERE Logo Component
const MobileBlueSphereIcon = () => (
  <div className="w-8 h-8 rounded-full overflow-hidden shadow-lg border-2 border-cyan-400/50 bg-white">
    <ImageWithFallback 
      src={blueSphereLogoImg} 
      alt="BLUESPHERE Logo"
      className="w-full h-full object-contain p-0.5"
    />
  </div>
);

interface NavbarProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (loggedIn: boolean) => void;
  userType: string | null;
}

export function Navbar({ currentPage, setCurrentPage, isLoggedIn, setIsLoggedIn, userType }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const getNavItems = () => {
    const baseItems = [
      { id: 'home', label: 'Home', icon: Home },
      { id: 'data-explorer', label: 'Data Explorer', icon: Database },
      { id: 'visualization', label: 'Visualization', icon: BarChart3 },
      { id: 'taxonomy', label: 'Taxonomy', icon: Fish },
    ];

    let userSpecificItems = [];
    
    if (userType === 'public') {
      userSpecificItems = [
        { id: 'fishing-spots', label: 'Fishing Spots', icon: MapPin },
      ];
    } else if (userType === 'researcher') {
      userSpecificItems = [
        { id: 'edna', label: 'eDNA Analysis', icon: Dna },
      ];
    } else if (userType === 'policymaker') {
      userSpecificItems = [
        { id: 'edna', label: 'eDNA Analysis', icon: Dna },
        { id: 'fishing-spots', label: 'Zone Management', icon: MapPin },
      ];
    }

    const endItems = [
      { id: 'reports', label: 'Reports', icon: FileText },
      { id: 'user-management', label: 'Users', icon: Users },
      { id: 'about', label: 'About', icon: HelpCircle },
    ];

    return [...baseItems, ...userSpecificItems, ...endItems];
  };

  const navItems = getNavItems();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-blue-950/95 backdrop-blur-md border-b border-blue-800/30">
      <div className="container mx-auto px-6 lg:px-8 xl:px-12">
        {/* Single Row Layout for All Screen Sizes */}
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div 
            className="flex items-center space-x-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="lg:hidden">
              <MobileBlueSphereIcon />
            </div>
            <div className="hidden lg:block">
              <BlueSphereIcon />
            </div>
            <div className="hidden md:block">
              <h1 className="text-lg lg:text-2xl font-bold text-white">BLUESPHERE</h1>
              <p className="text-xs lg:text-sm text-cyan-300">Marine Data Platform</p>
            </div>
          </motion.div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-3">
            {isLoggedIn && (
              <div className="relative">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="text-blue-100 hover:text-white relative"
                >
                  <Bell className="w-4 h-4 lg:w-5 lg:h-5" />
                  <span className="hidden lg:inline ml-2 text-sm">Notifications</span>
                  <motion.span 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 w-3 h-3 lg:w-5 lg:h-5 bg-red-500 rounded-full text-xs flex items-center justify-center text-white font-bold"
                  >
                    {userType === 'public' ? '5' : userType === 'researcher' ? '6' : userType === 'scientist' ? '5' : '6'}
                  </motion.span>
                </Button>
                
                <NotificationSystem 
                  userType={userType}
                  isOpen={showNotifications}
                  onClose={() => setShowNotifications(false)}
                />
              </div>
            )}
            
            {/* Hamburger Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-blue-100 hover:text-white hover:bg-blue-800/50 p-3 border border-blue-700/50 hover:border-cyan-400/50 transition-all duration-200"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </Button>
          </div>
        </div>

      </div>

      {/* Left Sidebar Menu Overlay */}
      {isMenuOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMenuOpen(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          />
          
          {/* Sidebar Menu */}
          <motion.div
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed top-16 left-0 h-[calc(100vh-4rem)] w-80 bg-gradient-to-b from-blue-950/98 to-blue-900/98 backdrop-blur-md border-r border-blue-800/30 shadow-2xl z-50"
          >
            {/* Close Button Header */}
            <div className="flex items-center justify-between p-4 border-b border-blue-800/30">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full overflow-hidden shadow-lg border-2 border-cyan-400/50 bg-white">
                  <ImageWithFallback 
                    src={blueSphereLogoImg} 
                    alt="BLUESPHERE Logo"
                    className="w-full h-full object-contain p-0.5"
                  />
                </div>
                <div>
                  <div className="text-cyan-400 font-medium">Menu</div>
                  <div className="text-xs text-blue-300">Navigation</div>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsMenuOpen(false)}
                className="w-8 h-8 rounded-full bg-blue-800/50 hover:bg-blue-700/70 border border-blue-600/50 hover:border-cyan-400/50 flex items-center justify-center text-blue-200 hover:text-white transition-all duration-200"
              >
                <X className="w-4 h-4" />
              </motion.button>
            </div>

            <div className="h-full overflow-y-auto p-6 space-y-4 pb-20">
              {isLoggedIn && (
                <>
                  {/* User Info Section */}
                  <div className="px-4 py-3 bg-blue-800/30 rounded-lg border border-blue-700/30 mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-white" />
                      </div>
                      <div className="text-left">
                        <div className="text-cyan-400 capitalize">{userType}</div>
                        <div className="text-xs text-blue-300">Premium Access</div>
                      </div>
                    </div>
                  </div>

                  {/* Navigation Items */}
                  <div className="space-y-2">
                    {navItems.map((item) => {
                      const Icon = item.icon;
                      const isActive = currentPage === item.id;
                      
                      return (
                        <motion.div
                          key={item.id}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Button
                            variant={isActive ? "default" : "ghost"}
                            size="sm"
                            onClick={() => {
                              setCurrentPage(item.id);
                              setIsMenuOpen(false);
                            }}
                            className={`
                              w-full justify-start transition-all duration-200 h-12 rounded-lg
                              ${isActive 
                                ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg' 
                                : 'text-blue-100 hover:text-white hover:bg-blue-800/50 border border-transparent hover:border-cyan-400/30'
                              }
                            `}
                          >
                            <Icon className="w-5 h-5 mr-3" />
                            <span className="font-medium">{item.label}</span>
                          </Button>
                        </motion.div>
                      );
                    })}
                  </div>

                  {/* Logout Button */}
                  <div className="pt-4 border-t border-blue-800/30 mt-6">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        variant="outline"
                        onClick={() => {
                          setIsLoggedIn(false);
                          setIsMenuOpen(false);
                        }}
                        className="w-full justify-start border-blue-600 text-blue-200 hover:bg-blue-600 h-12 rounded-lg"
                      >
                        <LogIn className="w-5 h-5 mr-3 rotate-180" />
                        <span className="font-medium">Logout</span>
                      </Button>
                    </motion.div>
                  </div>
                </>
              )}
              
              {!isLoggedIn && (
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    onClick={() => {
                      setCurrentPage('login');
                      setIsMenuOpen(false);
                    }}
                    className="w-full justify-start bg-gradient-to-r from-cyan-500 to-blue-500 text-white h-12 rounded-lg shadow-lg"
                  >
                    <LogIn className="w-5 h-5 mr-3" />
                    <span className="font-medium">Login</span>
                  </Button>
                </motion.div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </nav>
  );
}