
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

interface Message {
  id: number;
  text: string;
  sender: 'me' | 'other';
  timestamp: string;
  avatar?: string;
  senderName?: string;
}

interface ChatMessageProps {
  message: Message;
}

const ChatMessage = ({ message }: ChatMessageProps) => {
  const isMe = message.sender === 'me';
  
  return (
    <div className={cn(
      "flex items-end space-x-2 animate-fade-in",
      isMe ? "justify-end" : "justify-start"
    )}>
      {!isMe && (
        <Avatar className="w-8 h-8 mb-1">
          <AvatarImage src={message.avatar} />
          <AvatarFallback className="text-xs">
            {message.senderName?.split(' ').map(n => n[0]).join('') || 'U'}
          </AvatarFallback>
        </Avatar>
      )}
      
      <div className={cn(
        "max-w-xs lg:max-w-md px-4 py-2 rounded-2xl shadow-sm",
        isMe 
          ? "bg-blue-500 text-white rounded-br-md" 
          : "bg-white text-gray-800 rounded-bl-md border border-gray-200"
      )}>
        <p className="text-sm leading-relaxed">{message.text}</p>
        <p className={cn(
          "text-xs mt-1",
          isMe ? "text-blue-100" : "text-gray-500"
        )}>
          {message.timestamp}
        </p>
      </div>
      
      {isMe && (
        <div className="w-8 h-8 mb-1" /> // Spacer for alignment
      )}
    </div>
  );
};

export default ChatMessage;
