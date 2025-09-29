import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { 
  MessageCircle, 
  X, 
  Send, 
  Bot, 
  User, 
  Minimize2,
  Maximize2,
  HelpCircle,
  Database,
  BarChart3,
  FileText
} from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  suggestions?: string[];
}

export function BSBotChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm BSBot, your marine data assistant. I can help you navigate datasets, explain features, or answer questions about marine research. How can I assist you today?",
      sender: 'bot',
      timestamp: new Date(),
      suggestions: [
        "Show me available datasets",
        "How do I analyze fish populations?",
        "Explain eDNA analysis",
        "Help with visualization tools"
      ]
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const quickResponses = {
    "datasets": "I can help you find datasets! We have oceanographic data, biodiversity assessments, fisheries information, and eDNA sequences. What type of marine data are you looking for?",
    "fish populations": "To analyze fish populations, go to the Data Explorer and filter by species type. You can use the Visualization Studio to create population trend charts and the Reports module to generate comprehensive analyses.",
    "edna": "eDNA (environmental DNA) analysis helps identify species from water samples. Upload your sequence files in the eDNA module, and our AI will match them against our marine species database with confidence scores.",
    "visualization": "Our Visualization Studio lets you create interactive charts and maps. Drag variables from the panel to compare data, and use different chart types like scatter plots for correlation analysis.",
    "api": "You can access our data programmatically through our REST API. Generate API keys in User Management and check the documentation for endpoints and authentication methods.",
    "subscription": "We offer different subscription tiers: General Public ($1), Researcher ($5), Scientist ($10), and Policy Makers ($15). Each tier includes different features and data access levels.",
    "help": "I'm here to help! You can ask me about:\\n• Finding and using datasets\\n• Analysis tools and features\\n• Subscription plans\\n• Technical support\\n• API documentation\\n\\nWhat would you like to know more about?"
  };

  const getBotResponse = (userMessage: string): string => {
    const lowercaseMessage = userMessage.toLowerCase();
    
    if (lowercaseMessage.includes('dataset') || lowercaseMessage.includes('data')) {
      return quickResponses.datasets;
    } else if (lowercaseMessage.includes('fish') || lowercaseMessage.includes('population')) {
      return quickResponses["fish populations"];
    } else if (lowercaseMessage.includes('edna') || lowercaseMessage.includes('dna') || lowercaseMessage.includes('sequence')) {
      return quickResponses.edna;
    } else if (lowercaseMessage.includes('chart') || lowercaseMessage.includes('visualiz') || lowercaseMessage.includes('graph')) {
      return quickResponses.visualization;
    } else if (lowercaseMessage.includes('api') || lowercaseMessage.includes('programmatic')) {
      return quickResponses.api;
    } else if (lowercaseMessage.includes('subscription') || lowercaseMessage.includes('price') || lowercaseMessage.includes('plan')) {
      return quickResponses.subscription;
    } else if (lowercaseMessage.includes('help') || lowercaseMessage.includes('how')) {
      return quickResponses.help;
    } else {
      return "I understand you're asking about marine data. Could you be more specific? I can help with datasets, analysis tools, subscriptions, or technical questions. Try asking about specific features or use one of the suggested questions below.";
    }
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      const userMessage: Message = {
        id: Date.now().toString(),
        text: message.trim(),
        sender: 'user',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, userMessage]);
      setMessage('');
      setIsTyping(true);

      // Simulate bot typing delay
      setTimeout(() => {
        const botResponse: Message = {
          id: (Date.now() + 1).toString(),
          text: getBotResponse(message.trim()),
          sender: 'bot',
          timestamp: new Date(),
          suggestions: [
            "Tell me more about this",
            "Show me examples",
            "What else can you help with?",
            "How do I get started?"
          ]
        };
        setMessages(prev => [...prev, botResponse]);
        setIsTyping(false);
      }, 1500);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setMessage(suggestion);
    handleSendMessage();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isOpen) {
    return (
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="fixed bottom-6 right-6 z-50"
      >
        <Button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <MessageCircle className="w-6 h-6" />
        </Button>
        
        {/* Floating indicator */}
        <motion.div
          className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center"
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        >
          <div className="w-2 h-2 bg-white rounded-full" />
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      className="fixed bottom-6 right-6 z-50"
    >
      <Card className={`bg-blue-900/95 border-blue-700/50 backdrop-blur-md shadow-2xl ${
        isMinimized ? 'w-80 h-16' : 'w-80 h-96'
      } transition-all duration-300`}>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div>
                <CardTitle className="text-white text-sm">BSBot Assistant</CardTitle>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-1" />
                  <span className="text-xs text-green-400">Online</span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMinimized(!isMinimized)}
                className="text-blue-300 hover:text-white h-6 w-6 p-0"
              >
                {isMinimized ? <Maximize2 className="w-3 h-3" /> : <Minimize2 className="w-3 h-3" />}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="text-blue-300 hover:text-white h-6 w-6 p-0"
              >
                <X className="w-3 h-3" />
              </Button>
            </div>
          </div>
        </CardHeader>

        <AnimatePresence>
          {!isMinimized && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <CardContent className="flex flex-col h-80">
                {/* Messages */}
                <div className="flex-1 overflow-y-auto space-y-3 mb-4 pr-2">
                  {messages.map((msg) => (
                    <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`flex items-start space-x-2 max-w-[80%] ${msg.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                        <Avatar className="w-6 h-6">
                          {msg.sender === 'bot' ? (
                            <AvatarFallback className="bg-cyan-500 text-white text-xs">
                              <Bot className="w-3 h-3" />
                            </AvatarFallback>
                          ) : (
                            <AvatarFallback className="bg-blue-500 text-white text-xs">
                              <User className="w-3 h-3" />
                            </AvatarFallback>
                          )}
                        </Avatar>
                        <div className={`px-3 py-2 rounded-lg text-sm ${
                          msg.sender === 'user' 
                            ? 'bg-cyan-500 text-white' 
                            : 'bg-blue-800/50 text-blue-100'
                        }`}>
                          <p className="whitespace-pre-wrap">{msg.text}</p>
                          {msg.suggestions && (
                            <div className="mt-2 space-y-1">
                              {msg.suggestions.map((suggestion, index) => (
                                <Button
                                  key={index}
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleSuggestionClick(suggestion)}
                                  className="text-xs h-6 border-blue-600 text-blue-200 hover:bg-blue-600 hover:text-white"
                                >
                                  {suggestion}
                                </Button>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="flex items-start space-x-2">
                        <Avatar className="w-6 h-6">
                          <AvatarFallback className="bg-cyan-500 text-white text-xs">
                            <Bot className="w-3 h-3" />
                          </AvatarFallback>
                        </Avatar>
                        <div className="bg-blue-800/50 text-blue-100 px-3 py-2 rounded-lg">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" />
                            <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                            <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div ref={messagesEndRef} />
                </div>

                {/* Quick Actions */}
                <div className="flex space-x-1 mb-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleSuggestionClick("Show me available datasets")}
                    className="flex-1 h-7 text-xs border-blue-600 text-blue-200"
                  >
                    <Database className="w-3 h-3 mr-1" />
                    Data
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleSuggestionClick("Help with visualization tools")}
                    className="flex-1 h-7 text-xs border-blue-600 text-blue-200"
                  >
                    <BarChart3 className="w-3 h-3 mr-1" />
                    Charts
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleSuggestionClick("What can you help with?")}
                    className="flex-1 h-7 text-xs border-blue-600 text-blue-200"
                  >
                    <HelpCircle className="w-3 h-3 mr-1" />
                    Help
                  </Button>
                </div>

                {/* Input */}
                <div className="flex space-x-2">
                  <Input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask me about marine data..."
                    className="flex-1 bg-blue-800/50 border-blue-600 text-white placeholder:text-blue-300 text-sm h-8"
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={!message.trim() || isTyping}
                    className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white h-8 w-8 p-0"
                  >
                    <Send className="w-3 h-3" />
                  </Button>
                </div>
              </CardContent>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </motion.div>
  );
}