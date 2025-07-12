import React from 'react';
import { Button } from './ui/Button';

interface HeaderProps {
  onAddTeacher: () => void;
}

interface HeaderProps {
  onAddTeacher: () => void;
  onPaymentClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onAddTeacher, onPaymentClick }) => {
  return (
    <header className="bg-white shadow-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-7">
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0">
              {/* School/teacher icon */}
              <svg className="w-9 h-9 text-[#6366f1] drop-shadow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <rect x="3" y="10" width="18" height="8" rx="2" fill="#fff" stroke="#6366f1" strokeWidth="2"/>
                <path d="M12 3v7" stroke="#6366f1" strokeWidth="2" strokeLinecap="round"/>
                <circle cx="12" cy="3" r="2" fill="#2563eb"/>
              </svg>
            </div>
            <h1 className="text-3xl font-extrabold text-[#2563eb] drop-shadow">Teacher Management</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Button onClick={onAddTeacher} className="flex items-center space-x-2 bg-[#2563eb] text-white font-semibold px-5 py-2 rounded-lg shadow-md btn-hover hover:bg-[#1d4ed8] transition">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              <span>Add Teacher</span>
            </Button>
            {onPaymentClick && (
              <Button onClick={onPaymentClick} className="flex items-center space-x-2 bg-[#6366f1] text-white font-semibold px-5 py-2 rounded-lg shadow-md btn-hover hover:bg-[#4338ca] transition">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <rect x="2" y="7" width="20" height="10" rx="3" fill="#6366f1" stroke="#2563eb" strokeWidth="2"/>
                  <rect x="4" y="10" width="4" height="2" rx="1" fill="#fff"/>
                </svg>
                <span>Payment</span>
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
