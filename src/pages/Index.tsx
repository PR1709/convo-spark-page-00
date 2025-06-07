
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, Phone, Video, MoreHorizontal, ArrowLeft, Search } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import ChatMessage from '@/components/ChatMessage';
import ContactsList from '@/components/ContactsList';
import TypingIndicator from '@/components/TypingIndicator';

const Index = () => {
  const [selectedContact, setSelectedContact] = useState({
    name: 'Sarah Johnson',
    status: 'online',
    avatar: '/placeholder.svg',
    lastSeen: 'Active now'
  });
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showContacts, setShowContacts] = useState(true);

  const messages = [
    {
      id: 1,
      text: "Hey! How are you doing today?",
      sender: "other" as const,
      timestamp: "10:30 AM",
      avatar: "/placeholder.svg",
      senderName: "Sarah Johnson"
    },
    {
      id: 2,
      text: "I'm doing great, thanks for asking! Just finished a really interesting project.",
      sender: "me" as const,
      timestamp: "10:32 AM"
    },
    {
      id: 3,
      text: "That sounds amazing! I'd love to hear more about it. What kind of project was it?",
      sender: "other" as const,
      timestamp: "10:33 AM",
      avatar: "/placeholder.svg",
      senderName: "Sarah Johnson"
    },
    {
      id: 4,
      text: "It was a web application for a local business. Really enjoyed working with the latest technologies!",
      sender: "me" as const,
      timestamp: "10:35 AM"
    }
  ];

  const handleSendMessage = () => {
    if (message.trim()) {
      console.log('Sending message:', message);
      setMessage('');
      setIsTyping(true);
      setTimeout(() => setIsTyping(false), 2000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23059669' fill-opacity='0.1'%3E%3Ccircle cx='7' cy='7' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>

      {/* Mobile Layout */}
      <div className="flex w-full relative">
        {/* Contacts Sidebar - Mobile responsive */}
        <div className={`${showContacts ? 'flex' : 'hidden'} lg:flex w-full lg:w-80 bg-white/80 backdrop-blur-xl border-r border-white/20 flex-col shadow-xl`}>
          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-4 text-white">
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-semibold">Messages</h1>
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                <Search className="h-5 w-5" />
              </Button>
            </div>
          </div>
          
          {/* Contacts List */}
          <ContactsList 
            onSelectContact={(contact) => {
              setSelectedContact(contact);
              setShowContacts(false); // Hide contacts on mobile when selecting
            }}
            selectedContact={selectedContact}
          />
        </div>

        {/* Main Chat Area */}
        <div className={`${!showContacts ? 'flex' : 'hidden'} lg:flex flex-1 flex-col relative`}>
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-4 flex items-center justify-between text-white shadow-lg">
            <div className="flex items-center space-x-3">
              <Button 
                variant="ghost" 
                size="icon" 
                className="lg:hidden text-white hover:bg-white/20"
                onClick={() => setShowContacts(true)}
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <Avatar className="w-10 h-10 ring-2 ring-white/30">
                <AvatarImage src={selectedContact.avatar} />
                <AvatarFallback className="bg-white/20 text-white">
                  {selectedContact.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="font-semibold text-white">{selectedContact.name}</h2>
                <p className="text-sm text-emerald-100">{selectedContact.lastSeen}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                <Video className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                <Phone className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                <MoreHorizontal className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-green-50/50 to-emerald-50/50 relative">
            {/* WhatsApp-like background pattern */}
            <div className="absolute inset-0 opacity-5 bg-repeat" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cpath d='M20 20h60v60H20z' fill='none' stroke='%23059669' stroke-width='0.5'/%3E%3C/svg%3E")`
            }}></div>
            
            <div className="relative z-10">
              {messages.map((msg) => (
                <ChatMessage key={msg.id} message={msg} />
              ))}
              {isTyping && <TypingIndicator />}
            </div>
          </div>

          {/* Message Input */}
          <div className="bg-white/90 backdrop-blur-xl border-t border-white/20 p-4 shadow-lg">
            <div className="flex items-center space-x-3">
              <div className="flex-1 relative">
                <Input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type a message..."
                  className="bg-white/80 border-0 rounded-full px-4 py-3 shadow-sm focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all duration-200"
                />
              </div>
              <Button 
                onClick={handleSendMessage} 
                disabled={!message.trim()}
                className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white rounded-full w-12 h-12 p-0 shadow-lg transform transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:transform-none"
              >
                <Send className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
