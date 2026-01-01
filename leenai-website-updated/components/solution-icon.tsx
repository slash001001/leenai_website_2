import {FileText, MessageCircle, Search, Database, Camera} from 'lucide-react';
import type {SolutionIcon} from '@/content/solutions';

export function SolutionIcon({name, className}: {name: SolutionIcon; className?: string}) {
  const props = {className};
  switch (name) {
    case 'file-text':
      return <FileText {...props} />;
    case 'message-circle':
      return <MessageCircle {...props} />;
    case 'search':
      return <Search {...props} />;
    case 'database':
      return <Database {...props} />;
    case 'camera':
      return <Camera {...props} />;
    default:
      return null;
  }
}
