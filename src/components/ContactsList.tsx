
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
    <div className="flex-1 overflow-y-auto">
      {contacts.map((contact) => (
        <div
          key={contact.id}
          onClick={() => onSelectContact({
            name: contact.name,
            status: contact.status,
            avatar: contact.avatar,
            lastSeen: contact.status === 'online' ? 'Active now' : 'Last seen recently'
          })}
          className={cn(
            "p-4 hover:bg-gray-50 cursor-pointer border-b border-gray-100 transition-colors",
            selectedContact.name === contact.name && "bg-blue-50 border-blue-200"
          )}
        >
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Avatar className="w-12 h-12">
                <AvatarImage src={contact.avatar} />
                <AvatarFallback>{contact.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              {contact.status === 'online' && (
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-gray-900 truncate">{contact.name}</h3>
                <span className="text-xs text-gray-500">{contact.timestamp}</span>
              </div>
              <div className="flex items-center justify-between mt-1">
                <p className="text-sm text-gray-600 truncate flex-1">{contact.lastMessage}</p>
                {contact.unreadCount && (
                  <Badge className="ml-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
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
