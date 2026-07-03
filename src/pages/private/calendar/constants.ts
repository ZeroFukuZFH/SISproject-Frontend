import { 
  Bell, 
  MessageSquare, 
  Users, 
  FileText, 
  Calendar 
} from 'lucide-react';
import type { Group } from './types';

// TODO: Add more navigation items if needed
export const NAV_ITEMS = [
  { icon: Bell, label: 'Notifications' },
  { icon: MessageSquare, label: 'Messages' },
  { icon: Users, label: 'Contacts' },
  { icon: FileText, label: 'Files' },
  { icon: Calendar, label: 'Calendar', active: true },
];

export const WEEK_DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
export const GROUPS: Group[] = ['ALL', 'Group 1', 'Group 2', 'Group 3'];