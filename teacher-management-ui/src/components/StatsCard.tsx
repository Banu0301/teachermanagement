import React from 'react';
import { Card, CardContent } from './ui/Card';
import { TeacherStats } from '@/types/teacher';

interface StatsCardProps {
  stats: TeacherStats;
}

export const StatsCard: React.FC<StatsCardProps> = ({ stats }) => {
  const statItems = [
    {
      label: 'Total Teachers',
      value: stats.total,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-.5a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      )
    },
    {
      label: 'Active',
      value: stats.active,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      label: 'On Leave',
      value: stats.onLeave,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      label: 'Inactive',
      value: stats.inactive,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {statItems.map((item, index) => (
<Card
  key={index}
  className="gradient-bg hover:scale-[1.03] hover:shadow-2xl transition-transform duration-200 rounded-xl shadow-md"
>
  <CardContent className="p-6">
    <div className="flex items-center">
      <div className="bg-white rounded-full p-1 shadow-md">
        <div
          className={`p-3 rounded-full ring-2 ring-[#764ba2] ring-offset-2 ${item.bgColor} ${item.color} flex items-center justify-center`}
        >
          {item.icon}
        </div>
      </div>
      <div className="ml-4">
        <p className="text-sm font-semibold text-white opacity-90">{item.label}</p>
        <p className={`text-3xl font-extrabold text-white drop-shadow`}>{item.value}</p>
      </div>
    </div>
  </CardContent>
</Card>
      ))}
    </div>
  );
};
