import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { X, SendHorizontal, Circle, CheckCircle2, BanIcon, Clock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface Message {
  text: string;
  isUser: boolean;
  time: string;
}

interface Ticket {
  id: string;
  title: string;
  description: string;
  status: "open" | "in-progress" | "resolved" | "closed";
  priority: "low" | "medium" | "high";
  category: string;
  createdAt: string;
  messages?: Message[];
  assignee?: string;
}

interface TicketDetailModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  ticket: Ticket;
  onSendMessage: (ticketId: string, message: string) => void;
  onStatusChange?: (ticketId: string, status: Ticket["status"]) => void;
}

const TicketDetailModal: React.FC<TicketDetailModalProps> = ({
  open,
  onOpenChange,
  ticket,
  onSendMessage,
  onStatusChange
}) => {
  const [newMessage, setNewMessage] = useState("");
  
  const handleSendMessage = () => {
    if (newMessage.trim()) {
      onSendMessage(ticket.id, newMessage);
      setNewMessage("");
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  const handleStatusChange = (status: Ticket["status"]) => {
    if (onStatusChange) {
      onStatusChange(ticket.id, status);
    }
  };
  
  // Format date to readable format
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'open':
        return <Circle className="h-4 w-4 text-blue-400" />;
      case 'in-progress':
        return <Clock className="h-4 w-4 text-amber-400" />;
      case 'resolved':
        return <CheckCircle2 className="h-4 w-4 text-green-400" />;
      case 'closed':
        return <BanIcon className="h-4 w-4 text-gray-400" />;
      default:
        return <Circle className="h-4 w-4 text-blue-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open':
        return "bg-blue-500/20 text-blue-300";
      case 'in-progress':
        return "bg-amber-500/20 text-amber-300";
      case 'resolved':
        return "bg-green-500/20 text-green-300";
      case 'closed':
        return "bg-gray-500/20 text-gray-300";
      default:
        return "bg-blue-500/20 text-blue-300";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'low':
        return "text-green-400";
      case 'medium':
        return "text-yellow-400";
      case 'high':
        return "text-red-400";
      default:
        return "text-gray-400";
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#001430] border-[#112F59] p-0 overflow-hidden sm:max-w-xl">
        <DialogHeader className="p-0">
          <div className="flex items-center justify-between w-full bg-[#001430] p-6 border-b border-[#112F59]">
            <div>
              <h2 className="text-white text-xl font-medium flex items-center gap-2">
                {getStatusIcon(ticket.status)}
                <span>
                  Ticket #{ticket.id.slice(0, 5)}
                </span>
              </h2>
              <p className="text-[#8B8B8B] text-sm mt-0.5">{ticket.title}</p>
            </div>
            <button
              onClick={() => onOpenChange(false)}
              className="text-white hover:text-gray-300"
            >
              <X size={20} />
            </button>
          </div>
        </DialogHeader>
        
        <div className="flex flex-col h-[500px]">
          <div className="p-6 border-b border-[#112F59]">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-[#8B8B8B]">Status</p>
                <div className="flex items-center gap-2 mt-1">
                  <Badge className={getStatusColor(ticket.status)}>
                    {ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}
                  </Badge>
                  {onStatusChange && ticket.status !== 'closed' && (
                    <div className="dropdown relative">
                      <Button 
                        variant="darkOutline" 
                        size="sm" 
                        className="h-6 text-xs py-0"
                      >
                        Change
                      </Button>
                      <div className="dropdown-content absolute hidden bg-[#031123] border border-[#112F59] rounded-md p-1 z-10">
                        {ticket.status !== 'open' && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="w-full justify-start text-xs text-blue-400"
                            onClick={() => handleStatusChange('open')}
                          >
                            <Circle className="h-3 w-3 mr-1" />
                            Open
                          </Button>
                        )}
                        {ticket.status !== 'in-progress' && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="w-full justify-start text-xs text-amber-400"
                            onClick={() => handleStatusChange('in-progress')}
                          >
                            <Clock className="h-3 w-3 mr-1" />
                            In Progress
                          </Button>
                        )}
                        {ticket.status !== 'resolved' && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="w-full justify-start text-xs text-green-400"
                            onClick={() => handleStatusChange('resolved')}
                          >
                            <CheckCircle2 className="h-3 w-3 mr-1" />
                            Resolved
                          </Button>
                        )}
                        {/* Fix: Use a type guard to ensure TypeScript understands this comparison */}
                        {(ticket.status as string) !== 'closed' && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="w-full justify-start text-xs text-gray-400"
                            onClick={() => handleStatusChange('closed')}
                          >
                            <BanIcon className="h-3 w-3 mr-1" />
                            Closed
                          </Button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              <div>
                <p className="text-[#8B8B8B]">Priority</p>
                <p className={`font-medium ${getPriorityColor(ticket.priority)}`}>
                  {ticket.priority.charAt(0).toUpperCase() + ticket.priority.slice(1)}
                </p>
              </div>
              <div>
                <p className="text-[#8B8B8B]">Category</p>
                <p className="text-white">{ticket.category}</p>
              </div>
              <div>
                <p className="text-[#8B8B8B]">Created</p>
                <p className="text-white">{formatDate(ticket.createdAt)}</p>
              </div>
              {ticket.assignee && (
                <div className="col-span-2">
                  <p className="text-[#8B8B8B]">Assigned To</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Avatar className="h-6 w-6">
                      <AvatarFallback className="text-xs bg-blue-600">{ticket.assignee.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <p className="text-white">{ticket.assignee}</p>
                  </div>
                </div>
              )}
            </div>
            
            <div className="mt-4">
              <p className="text-[#8B8B8B] mb-1">Description</p>
              <p className="text-white text-sm">{ticket.description}</p>
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto p-6 space-y-4" style={{ maxHeight: "250px" }}>
            {ticket.messages && ticket.messages.length > 0 ? (
              ticket.messages.map((message, index) => (
                <div key={index} className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}>
                  <div className={`flex gap-2 max-w-[80%] ${message.isUser ? 'flex-row-reverse' : ''}`}>
                    <Avatar className="w-8 h-8">
                      {message.isUser ? (
                        <AvatarFallback className="bg-[#01C8A9] text-white">U</AvatarFallback>
                      ) : (
                        <AvatarFallback className="bg-blue-500 text-white">S</AvatarFallback>
                      )}
                    </Avatar>
                    <div className={`p-3 rounded-lg ${
                      message.isUser 
                        ? 'bg-[#01C8A9] text-white' 
                        : 'bg-[#07234A] text-white border border-[#112F59]'
                    }`}>
                      <p className="text-sm">{message.text}</p>
                      <span className={`text-xs block mt-1 ${message.isUser ? 'text-white/70' : 'text-gray-400'}`}>
                        {message.time}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-400">No messages yet. Start the conversation by sending a message.</p>
              </div>
            )}
          </div>
          
          <div className="p-4 border-t border-[#112F59]">
            <div className="flex gap-2">
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your message..."
                className="flex-1 bg-[#07234A] border-[#112F59] text-white"
              />
              <Button 
                type="button" 
                variant="teal"
                onClick={handleSendMessage}
                size="icon"
                disabled={ticket.status === 'closed'}
              >
                <SendHorizontal size={18} />
              </Button>
            </div>
            {ticket.status === 'closed' && (
              <p className="text-amber-400 text-xs mt-2">This ticket is closed. You cannot send new messages.</p>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TicketDetailModal;
