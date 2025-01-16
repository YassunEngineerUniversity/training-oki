'use client';

import { TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const tabs = [
  { value: 'mine', label: 'チケットをお持ちの公演' },
  { value: 'sending', label: '譲渡' },
  { value: 'receive', label: 'チケット受け取り' },
]

interface TabTicketsProps {
  tab: string
}

const TabTickets = ({tab}:TabTicketsProps) => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(tab)

  const handleTabClick = (type: string) => {
    setActiveTab(type)
    switch (type) {
      case 'mine':
        router.push('/');
        break;
      case 'sending':
        router.push('/?tab=sending');
        break;
      case 'receive':
        router.push('/?tab=receive');
        break;
      default:
        break;
    }
  };
  return (
    <TabsList className="w-[560px] mx-auto h-full my-0 bg-white grid grid-cols-3 p-0 mb-[-3px]">
      {tabs.map((tab) => (
        <TabsTrigger
          className={`px-1 py-3 rounded-none text-base font-bold shadow-none data-[state=active]:shadow-none transition-all ${
                activeTab === tab.value
                  ? 'text-[#1eb98c] border-b-[3px] border-[#1eb98c] data-[state=active]:text-[#1eb98c]'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
          value={tab.value}
          onClick={() => handleTabClick(tab.value)}
          key={tab.value}
        >
          {tab.label}
        </TabsTrigger>
      ))}
    </TabsList>
  );
};

export default TabTickets;
