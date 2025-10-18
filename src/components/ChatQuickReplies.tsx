import { Button } from '@/components/ui/button';

interface ChatQuickRepliesProps {
  currentPage: string;
  onSelect: (text: string) => void;
  messagesCount: number;
}

const ChatQuickReplies = ({ currentPage, onSelect, messagesCount }: ChatQuickRepliesProps) => {
  // Only show quick replies on first message (welcome state)
  if (messagesCount > 1) return null;

  const getQuickReplies = () => {
    switch (currentPage) {
      case '/':
        return [
          '🏦 Show me loan products',
          '💼 How to become a partner?',
          '📄 Document checklists',
        ];
      case '/services':
        return [
          'Tell me about business loans',
          'What is LAP?',
          'Compare loan types',
        ];
      case '/about':
        return [
          'Tell me about MaxDSA',
          'Who are your banking partners?',
          'What services do you offer?',
        ];
      case '/why-partner':
        return [
          'Partnership benefits?',
          'How to start partnering?',
          'Commission structure?',
        ];
      case '/downloads':
        return [
          'Home loan documents?',
          'Business loan checklist?',
          'Personal loan requirements?',
        ];
      case '/partner-signup':
        return [
          'Help me fill this form',
          'What documents do I need?',
          'Explain PAN format',
        ];
      case '/contact':
        return [
          'Office locations?',
          'Contact details?',
          'How to reach support?',
        ];
      default:
        return [
          '🏦 Explore loan products',
          '💼 Become a partner',
          '📞 Contact us',
        ];
    }
  };

  const quickReplies = getQuickReplies();

  return (
    <div className="flex flex-wrap gap-2">
      {quickReplies.map((reply, idx) => (
        <Button
          key={idx}
          variant="outline"
          size="sm"
          onClick={() => onSelect(reply)}
          className="text-xs hover:bg-primary hover:text-primary-foreground transition-colors"
        >
          {reply}
        </Button>
      ))}
    </div>
  );
};

export default ChatQuickReplies;
