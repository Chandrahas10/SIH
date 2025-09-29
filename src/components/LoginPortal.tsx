import { useState } from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Checkbox } from './ui/checkbox';
import { 
  LogIn, 
  UserPlus, 
  Mail, 
  Lock, 
  User, 
  Crown, 
  Microscope, 
  Users, 
  Building,
  Check,
  Star,
  CreditCard,
  Shield,
  Loader2
} from 'lucide-react';
import blueSphereLogoImage from 'figma:asset/a8586a467674fa5556f8b8908ea79aaa013549b7.png';

interface LoginPortalProps {
  setIsLoggedIn: (value: boolean) => void;
  setUserType: (type: string) => void;
  setCurrentPage: (page: string) => void;
}

export function LoginPortal({ setIsLoggedIn, setUserType, setCurrentPage }: LoginPortalProps) {
  const [activeTab, setActiveTab] = useState('login');
  const [selectedUserType, setSelectedUserType] = useState('');
  const [selectedPlan, setSelectedPlan] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    institution: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const userTypes = [
    {
      id: 'public',
      name: 'General Public',
      description: 'Marine enthusiasts and general users',
      icon: Users,
      color: 'bg-blue-500',
      price: 1,
      features: ['Basic dataset access', 'Public reports', 'Community forum', 'Basic visualizations']
    },
    {
      id: 'researcher',
      name: 'Researcher & Scientist',
      description: 'Academic researchers, students, and professional marine scientists',
      icon: Microscope,
      color: 'bg-gradient-to-r from-green-500 to-purple-500',
      price: 8,
      features: ['Premium datasets', 'Advanced analytics', 'Analysis tools', 'API access', 'Research collaboration', 'Export capabilities', 'Custom reports', 'Data upload', 'AI tools', 'Priority support']
    },
    {
      id: 'policymaker',
      name: 'Policy Maker',
      description: 'Government officials and policy makers',
      icon: Building,
      color: 'bg-orange-500',
      price: 15,
      features: ['All features', 'Policy insights', 'Regulatory reports', 'Stakeholder dashboard', 'Priority processing', 'Dedicated support']
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.email && formData.password && selectedUserType) {
      setIsLoading(true);
      
      // Simulate API call delay
      setTimeout(() => {
        setUserType(selectedUserType);
        setIsLoggedIn(true);
        setCurrentPage('home'); // Redirect to homepage after login
        setIsLoading(false);
      }, 1500);
    }
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedUserType && formData.email && formData.password && formData.firstName && formData.lastName) {
      setIsLoading(true);
      
      // Simulate account creation and payment processing
      setTimeout(() => {
        setIsLoading(false);
        setShowSuccess(true);
        
        // Show success message then redirect
        setTimeout(() => {
          setUserType(selectedUserType);
          setIsLoggedIn(true);
          setCurrentPage('home'); // Redirect to homepage after successful signup
        }, 1500);
      }, 2000);
    }
  };

  const selectedUserTypeData = userTypes.find(type => type.id === selectedUserType);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-blue-900 to-slate-900 flex items-center justify-center p-6">
      {/* Success Modal */}
      {showSuccess && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
        >
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="bg-blue-900/95 border border-cyan-400/50 rounded-xl p-8 text-center max-w-md mx-4"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", duration: 0.5 }}
              className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <Check className="w-8 h-8 text-white" />
            </motion.div>
            <h3 className="text-xl font-semibold text-white mb-2">Welcome to BLUESPHERE!</h3>
            <p className="text-blue-200 mb-4">
              Your {selectedUserTypeData?.name} account has been created successfully. 
              You now have access to all premium features.
            </p>
            <div className="text-cyan-400">Redirecting to your dashboard...</div>
          </motion.div>
        </motion.div>
      )}
      
      <div className="w-full max-w-6xl">
        {/* Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center mb-4">
            <img 
              src={blueSphereLogoImage} 
              alt="Blue Sphere Logo" 
              className="w-16 h-16 mr-4 rounded-full border-4 border-cyan-400/50"
            />
            <div>
              <h1 className="text-4xl font-bold text-white">BLUESPHERE</h1>
              <p className="text-cyan-300">Marine Data Platform</p>
            </div>
          </div>
          <p className="text-xl text-blue-200">
            Access comprehensive marine research data and advanced analytics
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 bg-blue-900/50 border border-blue-700/50">
              <TabsTrigger value="login" className="data-[state=active]:bg-cyan-500 data-[state=active]:text-white">
                <LogIn className="w-4 h-4 mr-2" />
                Login
              </TabsTrigger>
              <TabsTrigger value="signup" className="data-[state=active]:bg-cyan-500 data-[state=active]:text-white">
                <UserPlus className="w-4 h-4 mr-2" />
                Sign Up
              </TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Login Form */}
                <Card className="bg-blue-900/30 border-blue-700/50">
                  <CardHeader>
                    <CardTitle className="text-white">Welcome Back</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleLogin} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-blue-200 mb-2">
                          Email Address
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400 w-4 h-4" />
                          <Input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="your.email@example.com"
                            className="pl-10 bg-blue-800/50 border-blue-600 text-white placeholder:text-blue-300"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-blue-200 mb-2">
                          Password
                        </label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400 w-4 h-4" />
                          <Input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            placeholder="Enter your password"
                            className="pl-10 bg-blue-800/50 border-blue-600 text-white placeholder:text-blue-300"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-blue-200 mb-2">
                          User Type
                        </label>
                        <Select value={selectedUserType} onValueChange={setSelectedUserType}>
                          <SelectTrigger className="bg-blue-800/50 border-blue-600 text-white">
                            <SelectValue placeholder="Select your user type" />
                          </SelectTrigger>
                          <SelectContent>
                            {userTypes.map((type) => (
                              <SelectItem key={type.id} value={type.id}>
                                <div className="flex items-center">
                                  <type.icon className="w-4 h-4 mr-2" />
                                  {type.name}
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Checkbox id="remember" className="border-cyan-400" />
                          <label htmlFor="remember" className="ml-2 text-sm text-blue-200">
                            Remember me
                          </label>
                        </div>
                        <Button variant="link" className="text-cyan-400 hover:text-cyan-300 p-0">
                          Forgot password?
                        </Button>
                      </div>

                      <Button 
                        type="submit" 
                        className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white"
                        disabled={!selectedUserType || isLoading}
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Signing In...
                          </>
                        ) : (
                          <>
                            <LogIn className="w-4 h-4 mr-2" />
                            Sign In
                          </>
                        )}
                      </Button>

                      <div className="text-center">
                        <div className="text-xs text-blue-400 mb-2">Quick Demo Login:</div>
                        <div className="grid grid-cols-2 gap-2">
                         <Button
  type="button"
  variant="outline"
  size="sm"
  onClick={() => {
    setFormData({ ...formData, email: 'demo@researcher.com', password: 'demo123' });
    setSelectedUserType('researcher');
  }}
  className="text-xs border-blue-600 text-[#14224d]"
>
  Demo Researcher
</Button>

<Button
  type="button"
  variant="outline"
  size="sm"
  onClick={() => {
    setFormData({ ...formData, email: 'demo@scientist.com', password: 'demo123' });
    setSelectedUserType('scientist');
  }}
  className="text-xs border-blue-600 text-[#14224d]"
>
  Demo Scientist
</Button>

                        </div>
                      </div>
                    </form>
                  </CardContent>
                </Card>

                {/* User Type Preview */}
                {selectedUserTypeData && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <Card className="bg-blue-900/30 border-blue-700/50">
                      <CardHeader>
                        <div className="flex items-center">
                          <div className={`p-3 rounded-lg ${selectedUserTypeData.color} mr-4`}>
                            <selectedUserTypeData.icon className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <CardTitle className="text-white">{selectedUserTypeData.name}</CardTitle>
                            <p className="text-blue-300">{selectedUserTypeData.description}</p>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="mb-4">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-blue-200">Monthly Subscription</span>
                            <span className="text-2xl font-bold text-cyan-400">
                              ${selectedUserTypeData.price}
                            </span>
                          </div>
                          <p className="text-sm text-blue-300">Per month, billed monthly</p>
                        </div>

                        <div className="space-y-2">
                          <h4 className="font-medium text-white">Features included:</h4>
                          {selectedUserTypeData.features.map((feature, index) => (
                            <div key={index} className="flex items-center text-blue-200">
                              <Check className="w-4 h-4 text-green-400 mr-2" />
                              <span className="text-sm">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="signup">
              <div className="space-y-8">
                {/* User Type Selection */}
                <div>
                  <h3 className="text-xl font-semibold text-white mb-6 text-center">
                    Choose Your Account Type
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {userTypes.map((type, index) => (
                      <motion.div
                        key={type.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        className={`cursor-pointer transition-all duration-200 ${
                          selectedUserType === type.id ? 'transform scale-105' : ''
                        }`}
                        onClick={() => setSelectedUserType(type.id)}
                      >
                        <Card className={`${
                          selectedUserType === type.id 
                            ? 'border-cyan-400 bg-cyan-400/10' 
                            : 'bg-blue-900/30 border-blue-700/50 hover:border-cyan-400/50'
                        } h-full`}>
                          <CardContent className="p-6 text-center">
                            <div className={`w-16 h-16 mx-auto rounded-lg ${type.color} flex items-center justify-center mb-4`}>
                              <type.icon className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="font-semibold text-white mb-2">{type.name}</h3>
                            <p className="text-sm text-blue-300 mb-4">{type.description}</p>
                            <div className="text-2xl font-bold text-cyan-400 mb-2">
                              ${type.price}/mo
                            </div>
                            <div className="space-y-1">
                              {type.features.slice(0, 3).map((feature, fIndex) => (
                                <div key={fIndex} className="text-xs text-blue-200 flex items-center">
                                  <Check className="w-3 h-3 text-green-400 mr-1" />
                                  {feature}
                                </div>
                              ))}
                              {type.features.length > 3 && (
                                <div className="text-xs text-blue-400">
                                  +{type.features.length - 3} more features
                                </div>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Registration Form */}
                {selectedUserType && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="grid grid-cols-1 lg:grid-cols-2 gap-8"
                  >
                    <Card className="bg-blue-900/30 border-blue-700/50">
                      <CardHeader>
                        <CardTitle className="text-white">Create Your Account</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <form onSubmit={handleSignup} className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-blue-200 mb-2">
                                First Name
                              </label>
                              <Input
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleInputChange}
                                placeholder="John"
                                className="bg-blue-800/50 border-blue-600 text-white placeholder:text-blue-300"
                                required
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-blue-200 mb-2">
                                Last Name
                              </label>
                              <Input
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleInputChange}
                                placeholder="Doe"
                                className="bg-blue-800/50 border-blue-600 text-white placeholder:text-blue-300"
                                required
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-blue-200 mb-2">
                              Email Address
                            </label>
                            <div className="relative">
                              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400 w-4 h-4" />
                              <Input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                placeholder="your.email@example.com"
                                className="pl-10 bg-blue-800/50 border-blue-600 text-white placeholder:text-blue-300"
                                required
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-blue-200 mb-2">
                              Institution/Organization
                            </label>
                            <Input
                              type="text"
                              name="institution"
                              value={formData.institution}
                              onChange={handleInputChange}
                              placeholder="Your organization"
                              className="bg-blue-800/50 border-blue-600 text-white placeholder:text-blue-300"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-blue-200 mb-2">
                              Password
                            </label>
                            <div className="relative">
                              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400 w-4 h-4" />
                              <Input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                placeholder="Create a strong password"
                                className="pl-10 bg-blue-800/50 border-blue-600 text-white placeholder:text-blue-300"
                                required
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-blue-200 mb-2">
                              Confirm Password
                            </label>
                            <div className="relative">
                              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400 w-4 h-4" />
                              <Input
                                type="password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleInputChange}
                                placeholder="Confirm your password"
                                className="pl-10 bg-blue-800/50 border-blue-600 text-white placeholder:text-blue-300"
                                required
                              />
                            </div>
                          </div>

                          <div className="flex items-center">
                            <Checkbox id="terms" className="border-cyan-400" required />
                            <label htmlFor="terms" className="ml-2 text-sm text-blue-200">
                              I agree to the Terms of Service and Privacy Policy
                            </label>
                          </div>

                          <Button 
                            type="submit" 
                            className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white"
                            disabled={isLoading}
                          >
                            {isLoading ? (
                              <>
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                Creating Account...
                              </>
                            ) : (
                              <>
                                <CreditCard className="w-4 h-4 mr-2" />
                                Create Account & Subscribe
                              </>
                            )}
                          </Button>
                        </form>
                      </CardContent>
                    </Card>

                    {/* Subscription Summary */}
                    <Card className="bg-blue-900/30 border-blue-700/50">
                      <CardHeader>
                        <CardTitle className="text-white flex items-center">
                          <Shield className="w-5 h-5 mr-2" />
                          Subscription Summary
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        {selectedUserTypeData && (
                          <div className="space-y-4">
                            <div className="flex items-center">
                              <div className={`p-3 rounded-lg ${selectedUserTypeData.color} mr-4`}>
                                <selectedUserTypeData.icon className="w-6 h-6 text-white" />
                              </div>
                              <div>
                                <h3 className="font-semibold text-white">{selectedUserTypeData.name}</h3>
                                <p className="text-blue-300">{selectedUserTypeData.description}</p>
                              </div>
                            </div>

                            <div className="bg-blue-800/30 p-4 rounded-lg">
                              <div className="flex items-center justify-between mb-4">
                                <span className="text-blue-200">Monthly Subscription</span>
                                <span className="text-2xl font-bold text-cyan-400">
                                  ${selectedUserTypeData.price}
                                </span>
                              </div>
                              
                              <div className="space-y-2">
                                <h4 className="font-medium text-white">What's included:</h4>
                                {selectedUserTypeData.features.map((feature, index) => (
                                  <div key={index} className="flex items-center text-blue-200">
                                    <Check className="w-4 h-4 text-green-400 mr-2" />
                                    <span className="text-sm">{feature}</span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            <div className="text-center">
                              <div className="flex items-center justify-center text-cyan-400 mb-2">
                                <Star className="w-4 h-4 mr-1" />
                                <span className="text-sm">30-day free trial</span>
                              </div>
                              <p className="text-xs text-blue-300">
                                Cancel anytime. No long-term commitment.
                              </p>
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
}