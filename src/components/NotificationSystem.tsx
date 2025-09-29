import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { 
  Bell, 
  AlertTriangle, 
  Info, 
  CheckCircle, 
  Waves, 
  Thermometer,
  Wind,
  Fish,
  AlertCircle,
  Calendar,
  MapPin,
  Clock,
  ExternalLink,
  X
} from 'lucide-react';

interface Notification {
  id: string;
  title: string;
  description: string;
  type: 'emergency' | 'warning' | 'info' | 'success' | 'alert';
  category: 'environmental' | 'research' | 'policy' | 'system' | 'safety';
  timestamp: string;
  location?: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  source: string;
  isRead: boolean;
  actionUrl?: string;
}

interface NotificationSystemProps {
  userType: string | null;
  isOpen: boolean;
  onClose: () => void;
}

export function NotificationSystem({ userType, isOpen, onClose }: NotificationSystemProps) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [filter, setFilter] = useState<string>('all');
  const containerRef = useRef<HTMLDivElement>(null);

  // Close notifications when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  // Generate notifications based on user type
  useEffect(() => {
    const generateNotifications = () => {
      const baseNotifications: Notification[] = [];

      // Common emergency/safety notifications for all users
      const emergencyNotifications: Notification[] = [
        {
          id: '1',
          title: 'Cyclone Biparjoy Alert',
          description: 'Very Severe Cyclonic Storm approaching Gujarat coast. Expected landfall in 48 hours. All marine activities suspended.',
          type: 'emergency',
          category: 'safety',
          timestamp: '15 min ago',
          location: 'Arabian Sea, Gujarat Coast',
          severity: 'critical',
          source: 'India Meteorological Department',
          isRead: false,
          actionUrl: '#emergency'
        },
        {
          id: '2',
          title: 'Tsunami Watch Advisory',
          description: 'Earthquake magnitude 7.2 detected near Andaman Islands. Tsunami waves possible along east coast.',
          type: 'emergency',
          category: 'safety',
          timestamp: '2 hours ago',
          location: 'Bay of Bengal',
          severity: 'high',
          source: 'Indian National Centre for Ocean Information Services',
          isRead: false
        }
      ];

      // User-specific notifications
      switch (userType) {
        case 'public':
          baseNotifications.push(
            ...emergencyNotifications,
            {
              id: '3',
              title: 'Coral Bleaching Alert',
              description: 'Mass coral bleaching event observed in Lakshadweep reefs due to rising sea temperatures.',
              type: 'warning',
              category: 'environmental',
              timestamp: '4 hours ago',
              location: 'Lakshadweep Islands',
              severity: 'high',
              source: 'Ministry of Environment & Climate Change',
              isRead: false
            },
            {
              id: '4',
              title: 'Red Tide Warning',
              description: 'Harmful algal bloom detected along Kerala coastline. Avoid consuming seafood from affected areas.',
              type: 'warning',
              category: 'safety',
              timestamp: '1 day ago',
              location: 'Kerala Coast',
              severity: 'medium',
              source: 'Central Marine Fisheries Research Institute',
              isRead: true
            },
            {
              id: '5',
              title: 'Beach Safety Update',
              description: 'High tide and rough sea conditions expected. Swimming and water sports not recommended.',
              type: 'info',
              category: 'safety',
              timestamp: '6 hours ago',
              location: 'Mumbai, Goa Beaches',
              severity: 'medium',
              source: 'Coastal Security',
              isRead: false
            }
          );
          break;

        case 'researcher':
          baseNotifications.push(
            ...emergencyNotifications,
            {
              id: '6',
              title: 'New Research Grant Available',
              description: 'CMLRE announces funding for deep-sea biodiversity research. Application deadline: March 15, 2024.',
              type: 'info',
              category: 'research',
              timestamp: '3 hours ago',
              severity: 'medium',
              source: 'CMLRE Research Division',
              isRead: false,
              actionUrl: '#grants'
            },
            {
              id: '7',
              title: 'Research Vessel Schedule',
              description: 'RV Sindhu Sadhana available for booking. Next cruise: Arabian Sea survey, April 2024.',
              type: 'info',
              category: 'research',
              timestamp: '1 day ago',
              severity: 'low',
              source: 'CMLRE Fleet Management',
              isRead: false
            },
            {
              id: '8',
              title: 'Data Collection Alert',
              description: 'Automated sensors in Bay of Bengal showing unusual pH levels. Immediate analysis required.',
              type: 'warning',
              category: 'research',
              timestamp: '5 hours ago',
              location: 'Bay of Bengal',
              severity: 'high',
              source: 'Ocean Monitoring Network',
              isRead: false
            }
          );
          break;

        case 'scientist':
          baseNotifications.push(
            ...emergencyNotifications,
            {
              id: '9',
              title: 'Peer Review Request',
              description: 'Manuscript on "Marine Microplastic Distribution in Indian Ocean" requires expert review.',
              type: 'info',
              category: 'research',
              timestamp: '2 hours ago',
              severity: 'medium',
              source: 'Journal of Marine Science',
              isRead: false,
              actionUrl: '#review'
            },
            {
              id: '10',
              title: 'Laboratory Equipment Alert',
              description: 'Mass spectrometer calibration overdue. eDNA analysis may be affected.',
              type: 'warning',
              category: 'system',
              timestamp: '8 hours ago',
              severity: 'medium',
              source: 'CMLRE Laboratory Services',
              isRead: false
            },
            {
              id: '11',
              title: 'Research Collaboration',
              description: 'NIOT invites collaboration on deep-sea mining impact assessment project.',
              type: 'info',
              category: 'research',
              timestamp: '1 day ago',
              severity: 'low',
              source: 'National Institute of Ocean Technology',
              isRead: true
            }
          );
          break;

        case 'policy':
          baseNotifications.push(
            ...emergencyNotifications,
            {
              id: '12',
              title: 'Policy Review Deadline',
              description: 'Marine Pollution Control Act amendments due for review. Stakeholder comments needed by Feb 28.',
              type: 'warning',
              category: 'policy',
              timestamp: '1 hour ago',
              severity: 'high',
              source: 'Ministry of Earth Sciences',
              isRead: false,
              actionUrl: '#policy'
            },
            {
              id: '13',
              title: 'International Agreement',
              description: 'UN Ocean Treaty ratification process initiated. Impact assessment on Indian marine laws required.',
              type: 'info',
              category: 'policy',
              timestamp: '6 hours ago',
              severity: 'medium',
              source: 'External Affairs Ministry',
              isRead: false
            },
            {
              id: '14',
              title: 'Fisheries Regulation Update',
              description: 'New sustainable fishing quotas approved for 2024. Implementation guidelines published.',
              type: 'success',
              category: 'policy',
              timestamp: '2 days ago',
              severity: 'low',
              source: 'Department of Fisheries',
              isRead: true
            }
          );
          break;

        default:
          baseNotifications.push(...emergencyNotifications);
      }

      // Add system notifications for all users
      baseNotifications.push(
        {
          id: '15',
          title: 'Platform Maintenance',
          description: 'BLUESPHERE will undergo scheduled maintenance on Sunday 2 AM - 4 AM IST.',
          type: 'info',
          category: 'system',
          timestamp: '12 hours ago',
          severity: 'low',
          source: 'BLUESPHERE Team',
          isRead: false
        }
      );

      setNotifications(baseNotifications);
    };

    if (userType) {
      generateNotifications();
    }
  }, [userType]);

  const getNotificationIcon = (type: string, category: string) => {
    if (type === 'emergency') return AlertTriangle;
    if (category === 'environmental') return Waves;
    if (category === 'safety') return AlertCircle;
    if (type === 'warning') return AlertTriangle;
    if (type === 'success') return CheckCircle;
    return Info;
  };

  const getNotificationColor = (type: string, severity: string) => {
    if (type === 'emergency' || severity === 'critical') return 'bg-red-500';
    if (type === 'warning' || severity === 'high') return 'bg-orange-500';
    if (type === 'success') return 'bg-green-500';
    if (severity === 'medium') return 'bg-yellow-500';
    return 'bg-blue-500';
  };

  const getSeverityBadge = (severity: string) => {
    const colors = {
      critical: 'bg-red-500 text-white',
      high: 'bg-orange-500 text-white',
      medium: 'bg-yellow-500 text-black',
      low: 'bg-blue-500 text-white'
    };
    return colors[severity as keyof typeof colors] || colors.low;
  };

  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !notification.isRead;
    return notification.category === filter;
  });

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, isRead: true } : n)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        ref={containerRef}
        initial={{ opacity: 0, y: 10, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 10, scale: 0.95 }}
        transition={{ type: "spring", duration: 0.3 }}
        className="absolute right-0 top-full mt-2 w-96 bg-blue-900/95 border border-blue-700/50 rounded-xl shadow-2xl z-50 backdrop-blur-md"
      >
        {/* Header */}
        <div className="p-4 border-b border-blue-700/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Bell className="w-5 h-5 text-cyan-400" />
              <h3 className="font-semibold text-white">Notifications</h3>
              {unreadCount > 0 && (
                <Badge className="bg-red-500 text-white text-xs">
                  {unreadCount}
                </Badge>
              )}
            </div>
            <div className="flex items-center space-x-2">
              {unreadCount > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={markAllAsRead}
                  className="text-xs text-cyan-400 hover:text-white"
                >
                  Mark all read
                </Button>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="text-blue-300 hover:text-white"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="p-3 border-b border-blue-700/50">
          <div className="flex flex-wrap gap-1">
            {['all', 'unread', 'environmental', 'safety', 'research', 'policy', 'system'].map((filterType) => (
              <Button
                key={filterType}
                variant={filter === filterType ? "default" : "ghost"}
                size="sm"
                onClick={() => setFilter(filterType)}
                className={`text-xs capitalize ${
                  filter === filterType 
                    ? 'bg-cyan-500 text-white' 
                    : 'text-blue-300 hover:text-white hover:bg-blue-800/50'
                }`}
              >
                {filterType}
              </Button>
            ))}
          </div>
        </div>

        {/* Emergency Banner */}
        {filteredNotifications.some(n => n.type === 'emergency' && !n.isRead) && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="bg-gradient-to-r from-red-600 to-red-500 p-3 border-b border-red-400"
          >
            <div className="flex items-center space-x-2">
              <AlertTriangle className="w-4 h-4 text-white animate-pulse" />
              <span className="text-white font-semibold text-sm">Emergency Alerts Active</span>
            </div>
            <p className="text-red-100 text-xs mt-1">
              {filteredNotifications.filter(n => n.type === 'emergency' && !n.isRead).length} critical alert(s) require immediate attention
            </p>
          </motion.div>
        )}

        {/* Notifications List */}
        <div className="max-h-96 overflow-y-auto">
          {filteredNotifications.length === 0 ? (
            <div className="p-4 text-center text-blue-400">
              <Bell className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p>No notifications</p>
            </div>
          ) : (
            filteredNotifications.map((notification) => {
              const Icon = getNotificationIcon(notification.type, notification.category);
              
              return (
                <motion.div
                  key={notification.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  whileHover={{ x: 4 }}
                  className={`p-3 border-b border-blue-800/30 hover:bg-blue-800/30 cursor-pointer transition-all duration-200 ${
                    !notification.isRead ? 'bg-blue-800/20 border-l-2 border-l-cyan-400' : ''
                  }`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="flex items-start space-x-3">
                    <div className={`p-2 rounded-full ${getNotificationColor(notification.type, notification.severity)}`}>
                      <Icon className="w-3 h-3 text-white" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <h4 className={`text-sm font-medium ${
                          !notification.isRead ? 'text-white' : 'text-blue-200'
                        }`}>
                          {notification.title}
                        </h4>
                        <Badge className={`text-xs ml-2 ${getSeverityBadge(notification.severity)}`}>
                          {notification.severity}
                        </Badge>
                      </div>
                      
                      <p className="text-xs text-blue-300 mt-1 line-clamp-2">
                        {notification.description}
                      </p>
                      
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center space-x-3 text-xs text-blue-400">
                          <div className="flex items-center space-x-1">
                            <Clock className="w-3 h-3" />
                            <span>{notification.timestamp}</span>
                          </div>
                          {notification.location && (
                            <div className="flex items-center space-x-1">
                              <MapPin className="w-3 h-3" />
                              <span className="truncate">{notification.location}</span>
                            </div>
                          )}
                        </div>
                        
                        {notification.actionUrl && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-xs text-cyan-400 hover:text-white p-0 h-auto"
                          >
                            <ExternalLink className="w-3 h-3" />
                          </Button>
                        )}
                      </div>
                      
                      <div className="text-xs text-blue-500 mt-1">
                        Source: {notification.source}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-blue-700/50 bg-blue-950/50">
          <div className="text-xs text-blue-400 text-center">
            {filteredNotifications.length} notification{filteredNotifications.length !== 1 ? 's' : ''}
            {filter !== 'all' && ` in ${filter}`}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}