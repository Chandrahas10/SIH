import { useState } from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { 
  HelpCircle, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Users, 
  Award, 
  BookOpen, 
  Send,
  ChevronDown,
  ExternalLink,
  Download,
  Globe,
  Github,
  Twitter,
  Linkedin
} from 'lucide-react';

export function AboutSupport() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const milestones = [
    {
      year: '1995',
      title: 'CMLRE Establishment',
      description: 'Centre for Marine Living Resources and Ecology established under Ministry of Earth Sciences',
      type: 'foundation'
    },
    {
      year: '2001',
      title: 'First Research Vessel',
      description: 'RV Sagar Sampada commissioned for marine research expeditions',
      type: 'research'
    },
    {
      year: '2008',
      title: 'International Collaborations',
      description: 'Partnerships established with global marine research institutions',
      type: 'collaboration'
    },
    {
      year: '2015',
      title: 'Digital Data Initiative',
      description: 'Large-scale digitization of marine research data begins',
      type: 'technology'
    },
    {
      year: '2020',
      title: 'AI Integration',
      description: 'Machine learning and AI tools integrated for species identification',
      type: 'innovation'
    },
    {
      year: '2024',
      title: 'Platform Launch',
      description: 'Unified marine data platform launched for global research community',
      type: 'milestone'
    }
  ];

  const faqs = [
    {
      question: 'How do I access the marine datasets?',
      answer: 'You can access datasets through the Data Explorer module. Free accounts provide access to public datasets, while researcher accounts offer access to additional data and analysis tools. Apply for researcher access through the user management section.'
    },
    {
      question: 'What file formats are supported for data upload?',
      answer: 'The platform supports various formats including CSV, NetCDF, FASTQ/FASTA for genetic data, and standard image formats (JPG, PNG, TIFF) for taxonomic identification. Large files can be compressed using ZIP or GZ formats.'
    },
    {
      question: 'Is there an API for programmatic access?',
      answer: 'Yes, we provide a comprehensive REST API for accessing datasets, running analyses, and uploading data. API keys can be generated through the User Management section. Rate limits apply based on your account type.'
    },
    {
      question: 'How accurate is the species identification system?',
      answer: 'Our AI-powered species identification system achieves 94-98% accuracy for common marine species. The system is continuously updated with new training data and expert validation. Users can also contribute to improving accuracy through feedback.'
    },
    {
      question: 'Can I collaborate with other researchers on the platform?',
      answer: 'Absolutely! The platform includes collaboration tools for sharing datasets, analyses, and reports. You can create project teams, share workspace access, and co-author research outputs. Contact us for setting up collaborative projects.'
    },
    {
      question: 'What are the data usage and citation policies?',
      answer: 'All public datasets are available under Creative Commons licenses. When using CMLRE data in publications, please cite the specific dataset and the platform. Detailed citation formats are provided with each dataset download.'
    },
    {
      question: 'How can I contribute my research data to the platform?',
      answer: 'Researchers can contribute data through the upload modules in each section. All contributions undergo quality review and metadata validation. Contributors retain ownership while making data accessible to the research community.'
    },
    {
      question: 'Is technical support available?',
      answer: 'Yes, we provide technical support through multiple channels including email, documentation, and video tutorials. Premium support is available for institutional users. Check our support section for contact details and response times.'
    }
  ];

  const teamMembers = [
    {
      name: 'Dr. Rajesh Kumar',
      position: 'Director, CMLRE',
      expertise: 'Marine Ecology, Fisheries Science',
      image: null
    },
    {
      name: 'Prof. Priya Sharma',
      position: 'Head of Data Sciences',
      expertise: 'Oceanography, Data Analytics',
      image: null
    },
    {
      name: 'Dr. Mohammed Ali',
      position: 'Lead Bioinformatician',
      expertise: 'Molecular Biology, eDNA Analysis',
      image: null
    },
    {
      name: 'Dr. Sarah Johnson',
      position: 'International Collaborations',
      expertise: 'Global Marine Research Networks',
      image: null
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission
  };

  const getMilestoneColor = (type: string) => {
    switch (type) {
      case 'foundation': return 'bg-blue-500';
      case 'research': return 'bg-green-500';
      case 'collaboration': return 'bg-purple-500';
      case 'technology': return 'bg-cyan-500';
      case 'innovation': return 'bg-orange-500';
      case 'milestone': return 'bg-red-500';
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
          <h1 className="mb-4 text-4xl font-bold text-white">About CMLRE & Support</h1>
          <p className="text-xl text-blue-200">
            Learn about our mission, explore our timeline, and get the support you need
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Tabs defaultValue="about" className="space-y-6">
            <TabsList className="bg-blue-900/50 border border-blue-700/50">
              <TabsTrigger value="about" className="data-[state=active]:bg-cyan-500 data-[state=active]:text-white">
                <BookOpen className="w-4 h-4 mr-2" />
                About CMLRE
              </TabsTrigger>
              <TabsTrigger value="timeline" className="data-[state=active]:bg-cyan-500 data-[state=active]:text-white">
                <Calendar className="w-4 h-4 mr-2" />
                Timeline
              </TabsTrigger>
              <TabsTrigger value="team" className="data-[state=active]:bg-cyan-500 data-[state=active]:text-white">
                <Users className="w-4 h-4 mr-2" />
                Team
              </TabsTrigger>
              <TabsTrigger value="faq" className="data-[state=active]:bg-cyan-500 data-[state=active]:text-white">
                <HelpCircle className="w-4 h-4 mr-2" />
                FAQ
              </TabsTrigger>
              <TabsTrigger value="contact" className="data-[state=active]:bg-cyan-500 data-[state=active]:text-white">
                <Mail className="w-4 h-4 mr-2" />
                Contact
              </TabsTrigger>
            </TabsList>

            <TabsContent value="about">
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                <div className="xl:col-span-2">
                  <Card className="bg-blue-900/30 border-blue-700/50 mb-6">
                    <CardHeader>
                      <CardTitle className="text-white">About CMLRE</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="relative h-64 rounded-lg overflow-hidden">
                        <ImageWithFallback
                          src="https://images.unsplash.com/photo-1708864163871-311332fb9d5e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvY2VhbiUyMHVuZGVyd2F0ZXIlMjBibHVlJTIwbWFyaW5lfGVufDF8fHx8MTc1ODczMDM1MHww&ixlib=rb-4.1.0&q=80&w=1080"
                          alt="Marine research"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 to-transparent" />
                        <div className="absolute bottom-4 left-4 text-white">
                          <h3 className="text-xl font-semibold">Marine Research Excellence</h3>
                          <p className="text-blue-200">Advancing ocean science since 1995</p>
                        </div>
                      </div>

                      <div className="space-y-4 text-blue-200 leading-relaxed">
                        <p>
                          The Centre for Marine Living Resources and Ecology (CMLRE) is a premier research 
                          institute under the Ministry of Earth Sciences, Government of India. Established in 1995, 
                          CMLRE focuses on understanding marine ecosystems, biodiversity, and sustainable resource management 
                          in the Indian Ocean region.
                        </p>
                        <p>
                          Our research encompasses oceanography, marine biology, fisheries science, and ecosystem modeling. 
                          We conduct extensive field research using state-of-the-art research vessels and advanced 
                          analytical techniques including molecular biology, remote sensing, and artificial intelligence.
                        </p>
                        <p>
                          This unified data platform represents our commitment to open science and global collaboration. 
                          By integrating decades of research data with modern analysis tools, we aim to accelerate 
                          marine research and contribute to evidence-based ocean management policies.
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-blue-900/30 border-blue-700/50">
                    <CardHeader>
                      <CardTitle className="text-white">Research Focus Areas</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[
                          { title: 'Oceanography', desc: 'Physical and chemical ocean properties' },
                          { title: 'Marine Biodiversity', desc: 'Species distribution and ecosystem health' },
                          { title: 'Fisheries Science', desc: 'Stock assessment and sustainable fishing' },
                          { title: 'Climate Change', desc: 'Ocean response to global warming' },
                          { title: 'Molecular Biology', desc: 'eDNA and genetic analysis' },
                          { title: 'Data Science', desc: 'AI and machine learning applications' }
                        ].map((area, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                            className="p-4 bg-blue-800/30 rounded-lg"
                          >
                            <h3 className="font-semibold text-white mb-2">{area.title}</h3>
                            <p className="text-sm text-blue-300">{area.desc}</p>
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="xl:col-span-1">
                  <Card className="bg-blue-900/30 border-blue-700/50 mb-6">
                    <CardHeader>
                      <CardTitle className="text-white">Quick Facts</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-blue-200">Established</span>
                          <span className="text-white font-semibold">1995</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-blue-200">Research Vessels</span>
                          <span className="text-white font-semibold">3</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-blue-200">Scientists</span>
                          <span className="text-white font-semibold">150+</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-blue-200">Publications</span>
                          <span className="text-white font-semibold">2,500+</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-blue-200">Data Records</span>
                          <span className="text-cyan-400 font-semibold">1.2M+</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-blue-900/30 border-blue-700/50">
                    <CardHeader>
                      <CardTitle className="text-white">Recognition</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center">
                          <Award className="w-5 h-5 text-yellow-400 mr-3" />
                          <div>
                            <div className="text-white font-medium">Excellence in Marine Research</div>
                            <div className="text-xs text-blue-300">Ministry of Earth Sciences, 2023</div>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <Award className="w-5 h-5 text-yellow-400 mr-3" />
                          <div>
                            <div className="text-white font-medium">Best Data Platform</div>
                            <div className="text-xs text-blue-300">Indian Ocean Research Council, 2024</div>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <Award className="w-5 h-5 text-yellow-400 mr-3" />
                          <div>
                            <div className="text-white font-medium">Innovation in Ocean Science</div>
                            <div className="text-xs text-blue-300">UNESCO, 2022</div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="timeline">
              <Card className="bg-blue-900/30 border-blue-700/50">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Calendar className="w-5 h-5 mr-2" />
                    CMLRE Timeline
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="relative">
                    <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-cyan-400/30" />
                    <div className="space-y-8">
                      {milestones.map((milestone, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          className="relative flex items-start ml-8"
                        >
                          <div 
                            className={`absolute -left-6 w-3 h-3 rounded-full ${getMilestoneColor(milestone.type)} border-2 border-blue-900`}
                          />
                          <div className="flex-1">
                            <div className="flex items-center mb-2">
                              <Badge className={getMilestoneColor(milestone.type)}>
                                {milestone.year}
                              </Badge>
                              <span className="ml-3 text-lg font-semibold text-white">
                                {milestone.title}
                              </span>
                            </div>
                            <p className="text-blue-200 leading-relaxed">
                              {milestone.description}
                            </p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="team">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {teamMembers.map((member, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <Card className="bg-blue-900/30 border-blue-700/50 text-center">
                      <CardContent className="p-6">
                        <div className="w-20 h-20 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center text-white text-xl font-semibold mx-auto mb-4">
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <h3 className="font-semibold text-white mb-1">{member.name}</h3>
                        <p className="text-sm text-cyan-400 mb-2">{member.position}</p>
                        <p className="text-xs text-blue-300">{member.expertise}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="faq">
              <Card className="bg-blue-900/30 border-blue-700/50">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <HelpCircle className="w-5 h-5 mr-2" />
                    Frequently Asked Questions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="space-y-2">
                    {faqs.map((faq, index) => (
                      <AccordionItem 
                        key={index} 
                        value={`item-${index}`} 
                        className="border-blue-700/50 bg-blue-800/20 rounded-lg px-4"
                      >
                        <AccordionTrigger className="text-white hover:text-cyan-400 text-left">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-blue-200 leading-relaxed">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="contact">
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                <div className="xl:col-span-2">
                  <Card className="bg-blue-900/30 border-blue-700/50">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center">
                        <Mail className="w-5 h-5 mr-2" />
                        Contact Us
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-blue-200 mb-2">
                              Name *
                            </label>
                            <Input
                              type="text"
                              name="name"
                              value={formData.name}
                              onChange={handleInputChange}
                              required
                              className="bg-blue-800/50 border-blue-600 text-white placeholder:text-blue-300"
                              placeholder="Your full name"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-blue-200 mb-2">
                              Email *
                            </label>
                            <Input
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleInputChange}
                              required
                              className="bg-blue-800/50 border-blue-600 text-white placeholder:text-blue-300"
                              placeholder="your.email@example.com"
                            />
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-blue-200 mb-2">
                            Subject *
                          </label>
                          <Input
                            type="text"
                            name="subject"
                            value={formData.subject}
                            onChange={handleInputChange}
                            required
                            className="bg-blue-800/50 border-blue-600 text-white placeholder:text-blue-300"
                            placeholder="Brief description of your inquiry"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-blue-200 mb-2">
                            Message *
                          </label>
                          <Textarea
                            name="message"
                            value={formData.message}
                            onChange={handleInputChange}
                            required
                            rows={6}
                            className="bg-blue-800/50 border-blue-600 text-white placeholder:text-blue-300"
                            placeholder="Please provide details about your inquiry, research interests, or technical issues..."
                          />
                        </div>
                        
                        <Button 
                          type="submit"
                          className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white"
                        >
                          <Send className="w-4 h-4 mr-2" />
                          Send Message
                        </Button>
                      </form>
                    </CardContent>
                  </Card>
                </div>

                <div className="xl:col-span-1 space-y-6">
                  <Card className="bg-blue-900/30 border-blue-700/50">
                    <CardHeader>
                      <CardTitle className="text-white">Contact Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-start">
                        <MapPin className="w-5 h-5 text-cyan-400 mr-3 mt-1" />
                        <div>
                          <div className="text-white font-medium">Address</div>
                          <div className="text-sm text-blue-200">
                            Centre for Marine Living Resources and Ecology<br />
                            Ministry of Earth Sciences<br />
                            Kochi, Kerala 682037, India
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <Phone className="w-5 h-5 text-cyan-400 mr-3" />
                        <div>
                          <div className="text-white font-medium">Phone</div>
                          <div className="text-sm text-blue-200">+91-484-239-6418</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <Mail className="w-5 h-5 text-cyan-400 mr-3" />
                        <div>
                          <div className="text-white font-medium">Email</div>
                          <div className="text-sm text-blue-200">info@cmlre.gov.in</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-blue-900/30 border-blue-700/50">
                    <CardHeader>
                      <CardTitle className="text-white">Follow Us</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex space-x-3">
                        <Button size="sm" variant="outline" className="border-blue-600 text-blue-200">
                          <Globe className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline" className="border-blue-600 text-blue-200">
                          <Twitter className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline" className="border-blue-600 text-blue-200">
                          <Linkedin className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline" className="border-blue-600 text-blue-200">
                          <Github className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-blue-900/30 border-blue-700/50">
                    <CardHeader>
                      <CardTitle className="text-white">Resources</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="w-full justify-start border-blue-600 text-blue-200"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        User Manual PDF
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="w-full justify-start border-blue-600 text-blue-200"
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Video Tutorials
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="w-full justify-start border-blue-600 text-blue-200"
                      >
                        <BookOpen className="w-4 h-4 mr-2" />
                        API Documentation
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
}