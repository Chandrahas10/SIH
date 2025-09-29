import { useState } from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Input } from './ui/input';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { 
  Users, 
  Key, 
  FileText, 
  Copy, 
  Eye, 
  EyeOff, 
  Plus, 
  Edit, 
  Trash2, 
  Shield, 
  Crown, 
  User,
  Settings,
  Activity,
  Code,
  Globe,
  Database,
  Clock
} from 'lucide-react';

export function UserManagement() {
  const [showApiKey, setShowApiKey] = useState(false);
  const [selectedTab, setSelectedTab] = useState('users');

  const users = [
    {
      id: 1,
      name: 'Dr. Rajesh Kumar',
      email: 'rajesh.kumar@cmlre.gov.in',
      role: 'admin',
      institution: 'CMLRE',
      lastActive: '2 hours ago',
      status: 'active',
      projects: 12,
      avatar: null
    },
    {
      id: 2,
      name: 'Prof. Priya Sharma',
      email: 'priya.sharma@niof.org.in',
      role: 'researcher',
      institution: 'NIO Goa',
      lastActive: '1 day ago',
      status: 'active',
      projects: 8,
      avatar: null
    },
    {
      id: 3,
      name: 'Dr. Mohammed Ali',
      email: 'm.ali@iisc.ac.in',
      role: 'collaborator',
      institution: 'IISc Bangalore',
      lastActive: '3 days ago',
      status: 'active',
      projects: 5,
      avatar: null
    },
    {
      id: 4,
      name: 'Sarah Johnson',
      email: 'sarah.j@whoi.edu',
      role: 'external',
      institution: 'Woods Hole',
      lastActive: '1 week ago',
      status: 'inactive',
      projects: 2,
      avatar: null
    }
  ];

  const roles = [
    {
      name: 'Admin',
      description: 'Full system access and user management',
      permissions: ['All data access', 'User management', 'System configuration', 'Export controls'],
      count: 3,
      color: 'bg-red-500'
    },
    {
      name: 'Researcher',
      description: 'Full research data access',
      permissions: ['Data analysis', 'Report generation', 'API access', 'Collaboration tools'],
      count: 15,
      color: 'bg-blue-500'
    },
    {
      name: 'Collaborator',
      description: 'Limited data access for specific projects',
      permissions: ['Project data', 'Basic analysis', 'Report viewing'],
      count: 28,
      color: 'bg-green-500'
    },
    {
      name: 'External',
      description: 'Guest access for international collaborators',
      permissions: ['Public data', 'Basic reports', 'Limited API'],
      count: 7,
      color: 'bg-orange-500'
    }
  ];

  const apiKeys = [
    {
      name: 'Data Access API',
      key: 'cmlre_da_7x9k2m8n4p6q1r5s',
      created: '2024-01-15',
      lastUsed: '2 hours ago',
      requests: 15234,
      status: 'active'
    },
    {
      name: 'Analysis API',
      key: 'cmlre_an_3b7c9d2f4g8h1j5k',
      created: '2024-01-10',
      lastUsed: '1 day ago',
      requests: 8945,
      status: 'active'
    },
    {
      name: 'Export API',
      key: 'cmlre_ex_9z8y7x6w5v4u3t2s',
      created: '2024-01-05',
      lastUsed: '3 days ago',
      requests: 2156,
      status: 'inactive'
    }
  ];

  const apiEndpoints = [
    {
      method: 'GET',
      endpoint: '/api/v1/datasets',
      description: 'Retrieve list of available datasets',
      auth: 'API Key required'
    },
    {
      method: 'GET',
      endpoint: '/api/v1/datasets/{id}',
      description: 'Get specific dataset details',
      auth: 'API Key required'
    },
    {
      method: 'POST',
      endpoint: '/api/v1/analysis',
      description: 'Submit data for analysis',
      auth: 'API Key + Researcher role'
    },
    {
      method: 'GET',
      endpoint: '/api/v1/species',
      description: 'Search species database',
      auth: 'Public access'
    },
    {
      method: 'POST',
      endpoint: '/api/v1/upload',
      description: 'Upload new dataset',
      auth: 'API Key + Admin role'
    }
  ];

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin': return <Crown className="w-4 h-4" />;
      case 'researcher': return <Shield className="w-4 h-4" />;
      case 'collaborator': return <Users className="w-4 h-4" />;
      case 'external': return <Globe className="w-4 h-4" />;
      default: return <User className="w-4 h-4" />;
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-red-500';
      case 'researcher': return 'bg-blue-500';
      case 'collaborator': return 'bg-green-500';
      case 'external': return 'bg-orange-500';
      default: return 'bg-gray-500';
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
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
          <h1 className="mb-4 text-4xl font-bold text-white">User Management & API Documentation</h1>
          <p className="text-xl text-blue-200">
            Manage user accounts, roles, and API access for the CMLRE platform
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
            <TabsList className="bg-blue-900/50 border border-blue-700/50">
              <TabsTrigger value="users" className="data-[state=active]:bg-cyan-500 data-[state=active]:text-white">
                <Users className="w-4 h-4 mr-2" />
                Users
              </TabsTrigger>
              <TabsTrigger value="roles" className="data-[state=active]:bg-cyan-500 data-[state=active]:text-white">
                <Shield className="w-4 h-4 mr-2" />
                Roles
              </TabsTrigger>
              <TabsTrigger value="keys" className="data-[state=active]:bg-cyan-500 data-[state=active]:text-white">
                <Key className="w-4 h-4 mr-2" />
                API Keys
              </TabsTrigger>
              <TabsTrigger value="docs" className="data-[state=active]:bg-cyan-500 data-[state=active]:text-white">
                <FileText className="w-4 h-4 mr-2" />
                API Documentation
              </TabsTrigger>
            </TabsList>

            <TabsContent value="users">
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                <div className="xl:col-span-2">
                  <Card className="bg-blue-900/30 border-blue-700/50">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-white flex items-center">
                          <Users className="w-5 h-5 mr-2" />
                          Platform Users
                        </CardTitle>
                        <Button size="sm" className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white">
                          <Plus className="w-4 h-4 mr-2" />
                          Add User
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {users.map((user, index) => (
                          <motion.div
                            key={user.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                            className="flex items-center justify-between p-4 bg-blue-800/30 rounded-lg hover:bg-blue-800/50 transition-colors"
                          >
                            <div className="flex items-center space-x-4">
                              <Avatar className="h-10 w-10">
                                <AvatarImage src={user.avatar || undefined} />
                                <AvatarFallback className="bg-cyan-500 text-white">
                                  {user.name.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="text-white font-medium">{user.name}</div>
                                <div className="text-sm text-blue-300">{user.email}</div>
                                <div className="text-xs text-blue-400">{user.institution}</div>
                              </div>
                            </div>
                            
                            <div className="flex items-center space-x-4">
                              <div className="text-right">
                                <Badge className={getRoleColor(user.role)}>
                                  {getRoleIcon(user.role)}
                                  <span className="ml-1 capitalize">{user.role}</span>
                                </Badge>
                                <div className="text-xs text-blue-300 mt-1">
                                  {user.projects} projects • {user.lastActive}
                                </div>
                              </div>
                              
                              <div className="flex space-x-1">
                                <Button size="sm" variant="ghost" className="text-blue-400 hover:text-white">
                                  <Edit className="w-4 h-4" />
                                </Button>
                                <Button size="sm" variant="ghost" className="text-blue-400 hover:text-red-400">
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="xl:col-span-1">
                  <Card className="bg-blue-900/30 border-blue-700/50">
                    <CardHeader>
                      <CardTitle className="text-white">User Statistics</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="text-center">
                          <div className="text-3xl font-bold text-cyan-400">{users.length}</div>
                          <div className="text-sm text-blue-200">Total Users</div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-3">
                          <div className="text-center">
                            <div className="text-xl font-semibold text-green-400">
                              {users.filter(u => u.status === 'active').length}
                            </div>
                            <div className="text-xs text-blue-300">Active</div>
                          </div>
                          <div className="text-center">
                            <div className="text-xl font-semibold text-yellow-400">
                              {users.filter(u => u.status === 'inactive').length}
                            </div>
                            <div className="text-xs text-blue-300">Inactive</div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          {roles.map((role, index) => (
                            <div key={index} className="flex justify-between text-sm">
                              <span className="text-blue-200 capitalize">{role.name}</span>
                              <span className="text-white font-medium">{role.count}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="roles">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {roles.map((role, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <Card className="bg-blue-900/30 border-blue-700/50 h-full">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className={`p-2 rounded ${role.color} text-white mr-3`}>
                              {getRoleIcon(role.name.toLowerCase())}
                            </div>
                            <div>
                              <CardTitle className="text-white">{role.name}</CardTitle>
                              <p className="text-sm text-blue-300">{role.count} users</p>
                            </div>
                          </div>
                          <Button size="sm" variant="outline" className="border-blue-600 text-blue-200">
                            <Settings className="w-4 h-4" />
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-blue-200 mb-4">{role.description}</p>
                        <div className="space-y-2">
                          <h4 className="font-medium text-white">Permissions:</h4>
                          <ul className="space-y-1">
                            {role.permissions.map((permission, pIndex) => (
                              <li key={pIndex} className="text-sm text-blue-300 flex items-center">
                                <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full mr-2" />
                                {permission}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="keys">
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                <div className="xl:col-span-2">
                  <Card className="bg-blue-900/30 border-blue-700/50">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-white flex items-center">
                          <Key className="w-5 h-5 mr-2" />
                          API Keys
                        </CardTitle>
                        <Button size="sm" className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white">
                          <Plus className="w-4 h-4 mr-2" />
                          Generate Key
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {apiKeys.map((apiKey, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                            className="p-4 bg-blue-800/30 rounded-lg"
                          >
                            <div className="flex items-center justify-between mb-3">
                              <div>
                                <h3 className="font-medium text-white">{apiKey.name}</h3>
                                <div className="text-sm text-blue-300">
                                  Created {apiKey.created} • Last used {apiKey.lastUsed}
                                </div>
                              </div>
                              <Badge className={apiKey.status === 'active' ? 'bg-green-500' : 'bg-gray-500'}>
                                {apiKey.status}
                              </Badge>
                            </div>
                            
                            <div className="flex items-center space-x-2 mb-3">
                              <Input
                                type={showApiKey ? 'text' : 'password'}
                                value={apiKey.key}
                                readOnly
                                className="bg-blue-700/50 border-blue-600 text-white font-mono text-sm"
                              />
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => setShowApiKey(!showApiKey)}
                                className="border-blue-600 text-blue-200"
                              >
                                {showApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => copyToClipboard(apiKey.key)}
                                className="border-blue-600 text-blue-200"
                              >
                                <Copy className="w-4 h-4" />
                              </Button>
                            </div>
                            
                            <div className="flex items-center justify-between text-sm">
                              <div className="flex items-center text-blue-300">
                                <Activity className="w-4 h-4 mr-1" />
                                {apiKey.requests.toLocaleString()} requests
                              </div>
                              <div className="flex space-x-2">
                                <Button size="sm" variant="ghost" className="text-blue-400 hover:text-white">
                                  <Edit className="w-3 h-3" />
                                </Button>
                                <Button size="sm" variant="ghost" className="text-blue-400 hover:text-red-400">
                                  <Trash2 className="w-3 h-3" />
                                </Button>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="xl:col-span-1">
                  <Card className="bg-blue-900/30 border-blue-700/50">
                    <CardHeader>
                      <CardTitle className="text-white">API Usage</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="text-center">
                          <div className="text-3xl font-bold text-cyan-400">26,335</div>
                          <div className="text-sm text-blue-200">Total Requests</div>
                        </div>
                        
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-blue-200">Today</span>
                            <span className="text-white font-medium">1,247</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-blue-200">This Week</span>
                            <span className="text-white font-medium">8,932</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-blue-200">This Month</span>
                            <span className="text-white font-medium">26,335</span>
                          </div>
                        </div>

                        <div className="border-t border-blue-700 pt-4">
                          <h4 className="font-medium text-white mb-2">Rate Limits</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-blue-200">Per minute</span>
                              <span className="text-cyan-400">1000</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-blue-200">Per hour</span>
                              <span className="text-cyan-400">10,000</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-blue-200">Per day</span>
                              <span className="text-cyan-400">100,000</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="docs">
              <Card className="bg-blue-900/30 border-blue-700/50">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Code className="w-5 h-5 mr-2" />
                    API Documentation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="space-y-4">
                    <AccordionItem value="overview" className="border-blue-700">
                      <AccordionTrigger className="text-white hover:text-cyan-400">
                        API Overview
                      </AccordionTrigger>
                      <AccordionContent className="text-blue-200">
                        <div className="space-y-4">
                          <p>
                            The CMLRE API provides programmatic access to marine research data, 
                            analysis tools, and species information. All API requests require authentication 
                            using an API key.
                          </p>
                          <div className="bg-blue-800/30 p-4 rounded-lg">
                            <h4 className="font-medium text-white mb-2">Base URL</h4>
                            <code className="text-cyan-400">https://api.cmlre.gov.in/v1</code>
                          </div>
                          <div className="bg-blue-800/30 p-4 rounded-lg">
                            <h4 className="font-medium text-white mb-2">Authentication</h4>
                            <code className="text-cyan-400">Authorization: Bearer YOUR_API_KEY</code>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="endpoints" className="border-blue-700">
                      <AccordionTrigger className="text-white hover:text-cyan-400">
                        API Endpoints
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-4">
                          {apiEndpoints.map((endpoint, index) => (
                            <div key={index} className="bg-blue-800/30 p-4 rounded-lg">
                              <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center">
                                  <Badge className={
                                    endpoint.method === 'GET' ? 'bg-green-500' : 
                                    endpoint.method === 'POST' ? 'bg-blue-500' : 'bg-orange-500'
                                  }>
                                    {endpoint.method}
                                  </Badge>
                                  <code className="ml-3 text-cyan-400">{endpoint.endpoint}</code>
                                </div>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="border-blue-600 text-blue-200"
                                  onClick={() => copyToClipboard(endpoint.endpoint)}
                                >
                                  <Copy className="w-3 h-3" />
                                </Button>
                              </div>
                              <p className="text-blue-200 text-sm mb-2">{endpoint.description}</p>
                              <div className="text-xs text-blue-300">{endpoint.auth}</div>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="examples" className="border-blue-700">
                      <AccordionTrigger className="text-white hover:text-cyan-400">
                        Code Examples
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-4">
                          <div className="bg-slate-900 p-4 rounded-lg">
                            <h4 className="font-medium text-white mb-2">Python Example</h4>
                            <pre className="text-cyan-400 text-sm overflow-x-auto">
{`import requests

headers = {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
}

response = requests.get(
    'https://api.cmlre.gov.in/v1/datasets',
    headers=headers
)

data = response.json()
print(data)`}
                            </pre>
                          </div>

                          <div className="bg-slate-900 p-4 rounded-lg">
                            <h4 className="font-medium text-white mb-2">JavaScript Example</h4>
                            <pre className="text-cyan-400 text-sm overflow-x-auto">
{`fetch('https://api.cmlre.gov.in/v1/datasets', {
    headers: {
        'Authorization': 'Bearer YOUR_API_KEY',
        'Content-Type': 'application/json'
    }
})
.then(response => response.json())
.then(data => console.log(data));`}
                            </pre>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="errors" className="border-blue-700">
                      <AccordionTrigger className="text-white hover:text-cyan-400">
                        Error Handling
                      </AccordionTrigger>
                      <AccordionContent className="text-blue-200">
                        <div className="space-y-4">
                          <p>The API uses standard HTTP status codes to indicate success or failure.</p>
                          <div className="space-y-2">
                            <div className="flex items-center">
                              <Badge className="bg-green-500 mr-3">200</Badge>
                              <span>Success</span>
                            </div>
                            <div className="flex items-center">
                              <Badge className="bg-yellow-500 mr-3">401</Badge>
                              <span>Unauthorized - Invalid API key</span>
                            </div>
                            <div className="flex items-center">
                              <Badge className="bg-orange-500 mr-3">403</Badge>
                              <span>Forbidden - Insufficient permissions</span>
                            </div>
                            <div className="flex items-center">
                              <Badge className="bg-red-500 mr-3">429</Badge>
                              <span>Rate limit exceeded</span>
                            </div>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
}