import React from 'react';
import { User } from 'lucide-react';
import { NAV_ITEMS } from '../constants';

export const Sidebar: React.FC = () => {
  return (
    <div className="fixed lg:static inset-y-0 left-0 z-50 w-20 bg-[#15101a] border-r border-[#2b1d36] flex flex-col items-center py-6">
      <nav className="flex-1 flex flex-col items-center gap-4">
        {NAV_ITEMS.map(({ icon: Icon, label, active }) => (
          <button
            key={label}
            className={`w-12 h-12 rounded-xl flex items-center justify-center relative group transition-all duration-200 ${
              active 
                ? 'bg-[#4e18ac] text-[#d1d1d1] shadow-lg shadow-purple-900/30' 
                : 'text-[#7a6a8a] hover:bg-[#2b1d36] hover:text-[#d1d1d1]'
            }`}
          >
            <Icon className="w-5 h-5" />
            <span className="absolute left-full ml-3 px-2 py-1 bg-[#15101a] text-[#d1d1d1] text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-[#2b1d36]">
              {label}
            </span>
          </button>
        ))}
      </nav>
      {/* TODO: Add user profile menu with logout option or idk i feel like that should be universal not just the calendar screen*/}
      <button className="w-12 h-12 rounded-xl bg-[#2b1d36] flex items-center justify-center hover:bg-[#3d2a4a] transition-colors">
        <User className="w-5 h-5 text-[#7a6a8a]" />
      </button>
    </div>
  );
};