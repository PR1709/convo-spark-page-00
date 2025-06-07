
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface Contact {
  id: number;
  name: string;
  lastMessage: string;
  timestamp: string;
  avatar: string;
  status: 'online' | 'offline';
  unreadCount?: number;
}

interface ContactsListProps {
  onSelectContact: (contact: any) => void;
  selectedContact: any;
}

const contacts: Contact[] = [
  {
    id: 1,
    name: 'Sarah Johnson',
    lastMessage: "That sounds amazing! I'd love to hear more...",
    timestamp: '10:33 AM',
    avatar: '/placeholder.svg',
    status: 'online',
    unreadCount: 2
  },
  {
    id: 2,
    name: 'Alex Chen',
    lastMessage: 'Perfect! See you tomorrow then.',
    timestamp: 'Yesterday',
    avatar: '/placeholder.svg',
    status: 'offline'
  },
  {
    id: 3,
    name: 'Emily Davis',
    lastMessage: 'Thanks for the help with the project!',
    timestamp: 'Tuesday',
    avatar: '/placeholder.svg',
    status: 'online'
  },
  {
    id: 4,
    name: 'Michael Brown',
    lastMessage: 'Let me know when you have time to chat.',
    timestamp: 'Monday',
    avatar: '/placeholder.svg',
    status: 'offline'
  },
  {
    id: 5,
    name: 'Jessica Wilson',
    lastMessage: 'The meeting went really well!',
    timestamp: 'Sunday',
    avatar: '/placeholder.svg',
    status: 'online',
    unreadCount: 1
  }
];

const ContactsList = ({ onSelectContact, selectedContact }: ContactsListProps) => {
  return (
    <div className="flex-1 overflow-y-auto bg-gradient-to-b from-white/90 to-gray-50/90 backdrop-blur-sm">
      {contacts.map((contact, index) => (
        <div
          key={contact.id}
          onClick={() => onSelectContact({
            name: contact.name,
            status: contact.status,
            avatar: contact.avatar,
            lastSeen: contact.status === 'online' ? 'Active now' : 'Last seen recently'
          })}
          className={cn(
            "p-4 hover:bg-white/60 cursor-pointer border-b border-gray-100/50 transition-all duration-200 transform hover:scale-[1.02] animate-fade-in relative overflow-hidden",
            selectedContact.name === contact.name && "bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-200/50 shadow-sm"
          )}
          style={{ animationDelay: `${index * 50}ms` }}
        >
          {/* Hover gradient effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-teal-500/5 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
          
          <div className="flex items-center space-x-3 relative z-10">
            <div className="relative">
              <Avatar className="w-12 h-12 ring-2 ring-white shadow-sm">
                <AvatarImage src={contact.avatar} />
                <AvatarFallback className="bg-gradient-to-br from-gray-100 to-gray-200 font-medium">
                  {contact.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              {contact.status === 'online' && (
                <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full shadow-sm animate-pulse"></div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-900 truncate">{contact.name}</h3>
                <span className="text-xs text-gray-500 font-medium">{contact.timestamp}</span>
              </div>
              <div className="flex items-center justify-between mt-1">
                <p className="text-sm text-gray-600 truncate flex-1">{contact.lastMessage}</p>
                {contact.unreadCount && (
                  <Badge className="ml-2 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white text-xs px-2 py-1 rounded-full shadow-sm min-w-[20px] h-5 flex items-center justify-center">
                    {contact.unreadCount}
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ContactsList;
