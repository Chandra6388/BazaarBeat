
import React, { useState, useRef, useEffect } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import Header from "@/components/layout/Header";
import MainSidebar from "@/components/layout/Sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { useResponsiveSidebar } from "@/hooks/use-responsive-sidebar";
import MobileNavbar from "@/components/layout/MobileNavbar";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Send, HelpCircle, BookOpen, MessageCircle, Phone, Mail, Star, Clock, ChevronDown, ChevronRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";

// Message interface for chat
interface Message {
  id: string;
  content: string;
  sender: 'user' | 'support';
  timestamp: Date;
  isRead?: boolean;
}

// FAQ item interface
interface FAQItem {
  id: string;
  question: string;
  answer: string;
  isOpen: boolean;
}

const SupportPage = () => {
  const isMobile = useIsMobile();
  const { sidebarOpen, setSidebarOpen, sidebarCollapsed, setSidebarCollapsed } = useResponsiveSidebar();
  const { toast } = useToast();
  const navigate = useNavigate();

  // Chat state
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Hello! How can we help you today?',
      sender: 'support',
      timestamp: new Date(),
      isRead: true,
    }
  ]);
  const [messageInput, setMessageInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  // FAQ state
  const [faqItems, setFaqItems] = useState<FAQItem[]>([
    {
      id: '1',
      question: 'How do I create a new email signature?',
      answer: 'You can create a new signature by clicking the "Create Signature" button in the sidebar or on the dashboard. Follow the step-by-step wizard to customize your signature.',
      isOpen: false,
    },
    {
      id: '2',
      question: 'Can I use my own images in signatures?',
      answer: 'Yes! You can upload your own images, logos, or profile pictures to use in your signatures. Just click on the image placeholder when creating or editing a signature.',
      isOpen: false,
    },
    {
      id: '3',
      question: 'How do I install my signature in Gmail?',
      answer: 'To add your signature to Gmail, click the "Copy HTML" button on your signature, then go to Gmail Settings > Signatures, and paste the copied signature using Ctrl+V or Cmd+V.',
      isOpen: false,
    },
    {
      id: '4',
      question: 'Do you offer premium templates?',
      answer: 'Yes, premium subscribers get access to our full library of professional templates, advanced analytics, and priority support.',
      isOpen: false,
    },
    {
      id: '5',
      question: 'How do I track clicks on my signature?',
      answer: 'All links in your signatures are automatically tracked. You can view analytics on the dashboard to see how many clicks each signature and link receives.',
      isOpen: false,
    },
  ]);
  
  // Ref for auto-scrolling chat
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const handleMenuClick = () => {
    setSidebarOpen(true);
  };

  const handleCreateClick = () => {
    // Handle create signature click
  };

  const toggleFAQ = (id: string) => {
    setFaqItems(items => items.map(item => 
      item.id === id ? { ...item, isOpen: !item.isOpen } : item
    ));
  };

  // Auto-scroll chat to bottom when new messages arrive
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (messageInput.trim() === '') return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: messageInput,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setMessageInput('');
    
    // Simulate support agent typing
    setIsTyping(true);
    
    // Simulate support agent response after a delay
    setTimeout(() => {
      setIsTyping(false);
      
      const supportReplies = [
        "Thank you for your message! I'll look into that for you right away.",
        "That's a great question. Let me help you with that.",
        "I understand your concern. Here's what you can do...",
        "Thanks for reaching out! Is there anything else you'd like to know?",
        "I'm happy to assist with that. Let me guide you through the process."
      ];
      
      const randomReply = supportReplies[Math.floor(Math.random() * supportReplies.length)];
      
      const supportMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: randomReply,
        sender: 'support',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, supportMessage]);
      
      toast({
        title: "New message",
        description: "Support team has responded to your inquiry",
      });
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    }
  };

  return (
    <SidebarProvider defaultOpen={!isMobile}>
      <div className="flex w-full min-h-screen bg-gradient-to-br from-[#001430] to-[#002040] font-sans">
        <MainSidebar 
          open={sidebarOpen} 
          onOpenChange={setSidebarOpen}
          onCollapseChange={setSidebarCollapsed}
          onCreateSignature={handleCreateClick}
        />
        
        <div 
          className="flex flex-col flex-1 transition-all duration-300 ease-in-out"
          style={{ 
            width: "100%",
            marginLeft: isMobile ? 0 : sidebarCollapsed ? '70px' : '250px',
            paddingBottom: isMobile ? '80px' : '20px'
          }}
        >
          <Header 
            onMenuClick={handleMenuClick}
            username="Deepesh"
          />

          <div className="flex flex-col p-4 sm:p-6">
            <div className="flex items-center gap-2 mb-6">
              <HelpCircle className="text-[#01C8A9] w-6 h-6" />
              <h1 className="text-white text-xl font-semibold">Help & Support</h1>
            </div>
            
            <Tabs defaultValue="chat" className="w-full">
              <TabsList className="bg-[#031123]/80 border border-[#112F59] mb-6">
                <TabsTrigger value="chat" className="flex items-center gap-1">
                  <MessageCircle className="w-4 h-4" />
                  <span>Live Chat</span>
                </TabsTrigger>
                <TabsTrigger value="faq" className="flex items-center gap-1">
                  <BookOpen className="w-4 h-4" />
                  <span>FAQs</span>
                </TabsTrigger>
                <TabsTrigger value="contact" className="flex items-center gap-1">
                  <Mail className="w-4 h-4" />
                  <span>Contact</span>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="chat">
                <motion.div 
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="grid grid-cols-1 md:grid-cols-3 gap-6"
                >
                  {/* Chat Window */}
                  <motion.div variants={itemVariants} className="md:col-span-2">
                    <div className="bg-[#031123] border border-[#112F59] rounded-lg shadow-lg overflow-hidden h-[600px] flex flex-col">
                      {/* Chat Header */}
                      <div className="bg-gradient-to-r from-[#01C8A9]/30 to-[#3B82F6]/30 p-4 border-b border-[#112F59]">
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-full bg-[#01C8A9]/20 flex items-center justify-center mr-3">
                            <MessageCircle className="text-[#01C8A9] w-5 h-5" />
                          </div>
                          <div>
                            <h3 className="text-white font-medium">Support Chat</h3>
                            <p className="text-xs text-gray-400 flex items-center">
                              <span className="w-2 h-2 rounded-full bg-green-500 mr-1 animate-pulse"></span>
                              Support Agent Online
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      {/* Messages Container */}
                      <div 
                        ref={chatContainerRef}
                        className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#031123]"
                      >
                        {messages.map((message) => (
                          <div 
                            key={message.id}
                            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                          >
                            <div 
                              className={`max-w-[80%] p-3 rounded-lg ${
                                message.sender === 'user' 
                                  ? 'bg-[#01C8A9]/20 text-white ml-auto' 
                                  : 'bg-[#112F59]/50 text-white mr-auto'
                              }`}
                            >
                              <p>{message.content}</p>
                              <p className="text-xs text-gray-400 mt-1 text-right">
                                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              </p>
                            </div>
                          </div>
                        ))}
                        
                        {isTyping && (
                          <div className="flex justify-start">
                            <div className="bg-[#112F59]/50 px-4 py-2 rounded-lg text-white max-w-[80%]">
                              <div className="flex items-center space-x-1">
                                <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                                <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '150ms' }}></div>
                                <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '300ms' }}></div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                      
                      {/* Message Input */}
                      <div className="p-4 border-t border-[#112F59] bg-[#031123]">
                        <div className="flex items-center">
                          <Input 
                            type="text" 
                            placeholder="Type your message here..." 
                            className="flex-1 bg-[#001430] border-[#112F59] text-white"
                            value={messageInput}
                            onChange={(e) => setMessageInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                          />
                          <Button 
                            onClick={handleSendMessage} 
                            className="ml-2 bg-gradient-to-r from-[#01C8A9] to-[#01a088] text-white"
                          >
                            <Send className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                  
                  {/* Support Info */}
                  <motion.div variants={itemVariants} className="md:col-span-1 space-y-6">
                    {/* Response Time Card */}
                    <div className="bg-[#031123] border border-[#112F59] rounded-lg p-4 shadow-lg">
                      <div className="flex items-center mb-3">
                        <Clock className="text-[#01C8A9] w-5 h-5 mr-2" />
                        <h3 className="text-white font-medium">Response Time</h3>
                      </div>
                      <p className="text-sm text-gray-400">Current average response time</p>
                      <p className="text-2xl text-white font-bold mt-1">~5 minutes</p>
                    </div>
                    
                    {/* Support Hours Card */}
                    <div className="bg-[#031123] border border-[#112F59] rounded-lg p-4 shadow-lg">
                      <div className="flex items-center mb-3">
                        <Star className="text-yellow-500 w-5 h-5 mr-2" />
                        <h3 className="text-white font-medium">Support Hours</h3>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Weekdays:</span>
                          <span className="text-white">9:00 AM - 8:00 PM EST</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Weekends:</span>
                          <span className="text-white">10:00 AM - 6:00 PM EST</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Contact Methods Card */}
                    <div className="bg-[#031123] border border-[#112F59] rounded-lg p-4 shadow-lg">
                      <div className="flex items-center mb-3">
                        <Phone className="text-blue-500 w-5 h-5 mr-2" />
                        <h3 className="text-white font-medium">Other Contact Methods</h3>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center">
                          <Mail className="text-gray-400 w-4 h-4 mr-2" />
                          <a href="mailto:support@example.com" className="text-[#01C8A9] hover:underline">support@example.com</a>
                        </div>
                        <div className="flex items-center">
                          <Phone className="text-gray-400 w-4 h-4 mr-2" />
                          <span className="text-white">+1 (555) 123-4567</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              </TabsContent>
              
              <TabsContent value="faq">
                <motion.div 
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="space-y-6"
                >
                  <motion.div variants={itemVariants} className="bg-[#031123] border border-[#112F59] rounded-lg shadow-lg overflow-hidden">
                    <div className="bg-gradient-to-r from-[#01C8A9]/30 to-[#3B82F6]/30 p-4">
                      <h3 className="text-white font-medium text-lg flex items-center">
                        <BookOpen className="mr-2 text-[#01C8A9] w-5 h-5" />
                        Frequently Asked Questions
                      </h3>
                    </div>
                    
                    <div className="divide-y divide-[#112F59]">
                      {faqItems.map((item) => (
                        <div key={item.id} className="p-4">
                          <button 
                            onClick={() => toggleFAQ(item.id)}
                            className="flex justify-between items-center w-full text-left text-white font-medium hover:text-[#01C8A9] transition-colors"
                          >
                            <span>{item.question}</span>
                            {item.isOpen ? (
                              <ChevronDown className="w-5 h-5 text-[#01C8A9]" />
                            ) : (
                              <ChevronRight className="w-5 h-5" />
                            )}
                          </button>
                          
                          {item.isOpen && (
                            <motion.div 
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              transition={{ duration: 0.3 }}
                              className="mt-2 text-gray-400 pl-5 border-l-2 border-[#112F59]"
                            >
                              <p>{item.answer}</p>
                            </motion.div>
                          )}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                  
                  <motion.div variants={itemVariants} className="bg-gradient-to-br from-[#031123] to-[#051b36] border border-[#112F59] rounded-lg p-6 text-center">
                    <h4 className="text-white font-medium mb-2">Can't find what you're looking for?</h4>
                    <p className="text-gray-400 mb-4">Our support team is ready to assist you with any questions</p>
                    <Button 
                      onClick={() => {
                        const tabsElement = document.querySelector('[data-state="inactive"][data-value="chat"]');
                        if (tabsElement) {
                          (tabsElement as HTMLElement).click();
                        }
                      }}
                      className="bg-gradient-to-r from-[#01C8A9] to-[#01a088] text-white hover:opacity-90"
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Start a Chat
                    </Button>
                  </motion.div>
                </motion.div>
              </TabsContent>
              
              <TabsContent value="contact">
                <motion.div 
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                  <motion.div variants={itemVariants} className="bg-[#031123] border border-[#112F59] rounded-lg p-6 shadow-lg">
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 rounded-full bg-[#01C8A9]/20 flex items-center justify-center mr-3">
                        <Mail className="text-[#01C8A9] w-5 h-5" />
                      </div>
                      <h3 className="text-white font-medium text-lg">Send us a Message</h3>
                    </div>
                    
                    <form className="space-y-4">
                      <div>
                        <Label htmlFor="name" className="text-gray-400">Your Name</Label>
                        <Input id="name" className="bg-[#001430] border-[#112F59] text-white mt-1" />
                      </div>
                      <div>
                        <Label htmlFor="email" className="text-gray-400">Email Address</Label>
                        <Input id="email" type="email" className="bg-[#001430] border-[#112F59] text-white mt-1" />
                      </div>
                      <div>
                        <Label htmlFor="subject" className="text-gray-400">Subject</Label>
                        <Input id="subject" className="bg-[#001430] border-[#112F59] text-white mt-1" />
                      </div>
                      <div>
                        <Label htmlFor="message" className="text-gray-400">Message</Label>
                        <textarea 
                          id="message" 
                          rows={4} 
                          className="w-full bg-[#001430] border border-[#112F59] text-white rounded-md p-2 mt-1"
                        ></textarea>
                      </div>
                      <Button 
                        type="button"
                        className="w-full bg-gradient-to-r from-[#01C8A9] to-[#01a088] text-white"
                        onClick={() => {
                          toast({
                            title: "Message sent",
                            description: "We'll get back to you as soon as possible",
                          });
                        }}
                      >
                        Send Message
                      </Button>
                    </form>
                  </motion.div>
                  
                  <div className="space-y-6">
                    <motion.div variants={itemVariants} className="bg-[#031123] border border-[#112F59] rounded-lg p-6 shadow-lg">
                      <div className="flex items-center mb-4">
                        <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center mr-3">
                          <Mail className="text-blue-400 w-5 h-5" />
                        </div>
                        <h3 className="text-white font-medium text-lg">Email Support</h3>
                      </div>
                      <p className="text-gray-400 mb-2">For general inquiries and support:</p>
                      <a href="mailto:support@example.com" className="text-[#01C8A9] hover:underline text-lg">support@example.com</a>
                    </motion.div>
                    
                    <motion.div variants={itemVariants} className="bg-[#031123] border border-[#112F59] rounded-lg p-6 shadow-lg">
                      <div className="flex items-center mb-4">
                        <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center mr-3">
                          <Phone className="text-purple-400 w-5 h-5" />
                        </div>
                        <h3 className="text-white font-medium text-lg">Phone Support</h3>
                      </div>
                      <p className="text-gray-400 mb-2">Call us during business hours:</p>
                      <p className="text-white text-lg">+1 (555) 123-4567</p>
                      <p className="text-gray-400 mt-4 text-sm">
                        Monday - Friday: 9AM - 8PM EST<br />
                        Saturday - Sunday: 10AM - 6PM EST
                      </p>
                    </motion.div>
                    
                    <motion.div variants={itemVariants} className="bg-[#031123] border border-[#112F59] rounded-lg p-6 shadow-lg">
                      <div className="flex items-center mb-4">
                        <div className="w-10 h-10 rounded-full bg-yellow-500/20 flex items-center justify-center mr-3">
                          <Star className="text-yellow-400 w-5 h-5" />
                        </div>
                        <h3 className="text-white font-medium text-lg">Premium Support</h3>
                      </div>
                      <p className="text-gray-400 mb-4">Premium subscribers receive priority support with faster response times and dedicated account managers.</p>
                      <Button 
                        variant="outline"
                        className="w-full bg-gradient-to-r from-yellow-500/20 to-yellow-500/5 border-yellow-500/50 text-yellow-400 hover:bg-yellow-500/20"
                        onClick={() => navigate('/subscription')}
                      >
                        Upgrade to Premium
                      </Button>
                    </motion.div>
                  </div>
                </motion.div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
        
        {isMobile && <MobileNavbar onCreateClick={handleCreateClick} />}
      </div>
    </SidebarProvider>
  );
};

export default SupportPage;
