
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
      "flex items-end space-x-2 animate-fade-in mb-4 group",
      isMe ? "justify-end" : "justify-start"
    )}>
      {!isMe && (
        <Avatar className="w-8 h-8 mb-1 ring-2 ring-white shadow-sm">
          <AvatarImage src={message.avatar} />
          <AvatarFallback className="bg-gradient-to-br from-gray-100 to-gray-200 text-xs font-medium">
            {message.senderName?.split(' ').map(n => n[0]).join('') || 'U'}
          </AvatarFallback>
        </Avatar>
      )}
      
      <div className={cn(
        "max-w-xs lg:max-w-md px-4 py-3 rounded-2xl shadow-lg transform transition-all duration-200 hover:scale-[1.02] relative",
        isMe 
          ? "bg-gradient-to-br from-emerald-500 to-emerald-600 text-white rounded-br-md shadow-emerald-200" 
          : "bg-white text-gray-800 rounded-bl-md border border-gray-100 shadow-gray-200"
      )}>
        {/* Message tail */}
        <div className={cn(
          "absolute w-0 h-0 border-solid",
          isMe 
            ? "right-0 bottom-0 border-l-[8px] border-l-emerald-600 border-b-[8px] border-b-transparent transform translate-x-[8px]"
            : "left-0 bottom-0 border-r-[8px] border-r-white border-b-[8px] border-b-transparent transform -translate-x-[8px]"
        )} />
        
        <p className="text-sm leading-relaxed font-medium">{message.text}</p>
        <div className="flex items-center justify-end mt-2 space-x-1">
          <p className={cn(
            "text-xs",
            isMe ? "text-emerald-100" : "text-gray-500"
          )}>
            {message.timestamp}
          </p>
          {isMe && (
            <div className="flex space-x-1">
              <div className="w-1 h-1 bg-emerald-200 rounded-full"></div>
              <div className="w-1 h-1 bg-emerald-200 rounded-full"></div>
            </div>
          )}
        </div>
      </div>
      
      {isMe && (
        <div className="w-8 h-8 mb-1" />
      )}
    </div>
  );
};

export default ChatMessage;
