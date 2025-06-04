
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, Phone, Video, MoreHorizontal } from 'lucide-react';
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
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <h1 className="text-xl font-semibold text-gray-800">Messages</h1>
        </div>
        
        {/* Contacts List */}
        <ContactsList 
          onSelectContact={setSelectedContact}
          selectedContact={selectedContact}
        />
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="bg-white border-b border-gray-200 p-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className="w-10 h-10">
              <AvatarImage src={selectedContact.avatar} />
              <AvatarFallback>{selectedContact.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="font-medium text-gray-900">{selectedContact.name}</h2>
              <p className="text-sm text-gray-500">{selectedContact.lastSeen}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon">
              <Phone className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Video className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
          {messages.map((msg) => (
            <ChatMessage key={msg.id} message={msg} />
          ))}
          {isTyping && <TypingIndicator />}
        </div>

        {/* Message Input */}
        <div className="bg-white border-t border-gray-200 p-4">
          <div className="flex items-center space-x-2">
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type a message..."
              className="flex-1"
            />
            <Button onClick={handleSendMessage} disabled={!message.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
