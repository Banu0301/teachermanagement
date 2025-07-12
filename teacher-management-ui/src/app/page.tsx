'use client';

import React, { useState } from 'react';
import { Teacher, TeacherFormData } from '@/types/teacher';
import { mockTeachers, mockStats } from '@/data/mockData';
import { Header } from '@/components/Header';
import { StatsCard } from '@/components/StatsCard';
import { TeacherTable } from '@/components/TeacherTable';
import { TeacherModal } from '@/components/TeacherModal';
import { PaymentCard } from '@/components/PaymentCard';

export default function Home() {
  const [teachers, setTeachers] = useState<Teacher[]>(mockTeachers);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | undefined>();
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');

  // Calculate stats dynamically
  const stats = {
    total: teachers.length,
    active: teachers.filter(t => t.status === 'active').length,
    inactive: teachers.filter(t => t.status === 'inactive').length,
    onLeave: teachers.filter(t => t.status === 'on-leave').length
  };

  const handleAddTeacher = () => {
    setModalMode('add');
    setSelectedTeacher(undefined);
    setIsModalOpen(true);
  };

  const handleEditTeacher = (teacher: Teacher) => {
    setModalMode('edit');
    setSelectedTeacher(teacher);
    setIsModalOpen(true);
  };

  const handleDeleteTeacher = (teacherId: string) => {
    if (window.confirm('Are you sure you want to delete this teacher?')) {
      setTeachers(prev => prev.filter(t => t.id !== teacherId));
    }
  };

  const handleSubmitTeacher = (formData: TeacherFormData) => {
    if (modalMode === 'add') {
      const newTeacher: Teacher = {
        id: Date.now().toString(),
        ...formData,
        status: 'active'
      };
      setTeachers(prev => [...prev, newTeacher]);
    } else if (modalMode === 'edit' && selectedTeacher) {
      setTeachers(prev => 
        prev.map(t => 
          t.id === selectedTeacher.id 
            ? { ...t, ...formData }
            : t
        )
      );
    }
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        onAddTeacher={handleAddTeacher}
        onPaymentClick={() => setIsPaymentOpen(true)}
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <StatsCard stats={stats} />
        
        <TeacherTable
          teachers={teachers}
          onEditTeacher={handleEditTeacher}
          onDeleteTeacher={handleDeleteTeacher}
        />
      </main>

      {/* Teacher Modal */}
      <TeacherModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmitTeacher}
        teacher={selectedTeacher}
        mode={modalMode}
      />

      {/* Payment Modal */}
      {isPaymentOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            {/* Blurred, gradient backdrop */}
            <div
              className="fixed inset-0 modal-backdrop bg-gradient-to-br from-[#2563eb]/70 via-[#6366f1]/60 to-[#0a0a0a]/70 backdrop-blur-sm transition-opacity"
              onClick={() => setIsPaymentOpen(false)}
            ></div>
            <div className="inline-block align-bottom bg-white rounded-2xl text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full relative">
              {/* Floating close button */}
              <button
                type="button"
                onClick={() => setIsPaymentOpen(false)}
                className="absolute top-4 right-4 z-10 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition"
                aria-label="Close"
              >
                <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <PaymentCard />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
