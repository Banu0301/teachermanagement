import React, { useState, useEffect } from 'react';
import { Teacher, TeacherFormData } from '@/types/teacher';
import { Button } from './ui/Button';

interface TeacherModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: TeacherFormData) => void;
  teacher?: Teacher;
  mode: 'add' | 'edit';
}

export const TeacherModal: React.FC<TeacherModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  teacher,
  mode
}) => {
  const [formData, setFormData] = useState<TeacherFormData>({
    name: '',
    email: '',
    phone: '',
    department: '',
    subject: '',
    experience: 0,
    joinDate: '',
    qualifications: [],
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: ''
    }
  });

  const [newQualification, setNewQualification] = useState('');

  useEffect(() => {
    if (teacher && mode === 'edit') {
      setFormData({
        name: teacher.name,
        email: teacher.email,
        phone: teacher.phone,
        department: teacher.department,
        subject: teacher.subject,
        experience: teacher.experience,
        joinDate: teacher.joinDate,
        qualifications: teacher.qualifications,
        address: teacher.address
      });
    } else {
      // Reset form for add mode
      setFormData({
        name: '',
        email: '',
        phone: '',
        department: '',
        subject: '',
        experience: 0,
        joinDate: '',
        qualifications: [],
        address: {
          street: '',
          city: '',
          state: '',
          zipCode: ''
        }
      });
    }
  }, [teacher, mode, isOpen]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof TeacherFormData] as any,
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: name === 'experience' ? parseInt(value) || 0 : value
      }));
    }
  };

  const handleAddQualification = () => {
    if (newQualification.trim()) {
      setFormData(prev => ({
        ...prev,
        qualifications: [...prev.qualifications, newQualification.trim()]
      }));
      setNewQualification('');
    }
  };

  const handleRemoveQualification = (index: number) => {
    setFormData(prev => ({
      ...prev,
      qualifications: prev.qualifications.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        {/* Blurred, gradient backdrop */}
        <div
          className="fixed inset-0 modal-backdrop bg-gradient-to-br from-[#667eea]/70 via-[#764ba2]/60 to-[#0a0a0a]/70 backdrop-blur-sm transition-opacity"
          onClick={onClose}
        ></div>

        <div className="inline-block align-bottom bg-white rounded-2xl text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full lg:max-w-2xl relative">
          {/* Floating close button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 z-10 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition"
            aria-label="Close"
          >
            <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          {/* Gradient header */}
          <div className="gradient-bg px-6 py-4">
            <h3 className="text-xl font-extrabold gradient-text drop-shadow text-center">
              {mode === 'add' ? 'Add New Teacher' : 'Edit Teacher'}
            </h3>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="bg-white px-6 pt-6 pb-4 sm:p-8 sm:pb-4">

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#764ba2] text-base"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#764ba2] text-base"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#764ba2] text-base"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Department *
                  </label>
                  <select
                    name="department"
                    value={formData.department}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#764ba2] text-base"
                  >
                    <option value="">Select Department</option>
                    <option value="Mathematics">Mathematics</option>
                    <option value="Computer Science">Computer Science</option>
                    <option value="Physics">Physics</option>
                    <option value="Chemistry">Chemistry</option>
                    <option value="Biology">Biology</option>
                    <option value="English Literature">English Literature</option>
                    <option value="History">History</option>
                    <option value="Geography">Geography</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Subject *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#764ba2] text-base"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Experience (years) *
                  </label>
                  <input
                    type="number"
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                    min="0"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#764ba2] text-base"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Join Date *
                  </label>
                  <input
                    type="date"
                    name="joinDate"
                    value={formData.joinDate}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#764ba2] text-base"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Street Address
                  </label>
                  <input
                    type="text"
                    name="address.street"
                    value={formData.address.street}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#764ba2] text-base"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    name="address.city"
                    value={formData.address.city}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#764ba2] text-base"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    State
                  </label>
                  <input
                    type="text"
                    name="address.state"
                    value={formData.address.state}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#764ba2] text-base"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Zip Code
                  </label>
                  <input
                    type="text"
                    name="address.zipCode"
                    value={formData.address.zipCode}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#764ba2] text-base"
                  />
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Qualifications
                </label>
                <div className="flex space-x-2 mb-2">
                  <input
                    type="text"
                    value={newQualification}
                    onChange={(e) => setNewQualification(e.target.value)}
                    placeholder="Add qualification"
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#764ba2] text-base"
                  />
                  <Button type="button" onClick={handleAddQualification} size="sm" className="bg-[#764ba2] text-white rounded-lg px-4 py-2 hover:bg-[#5a357a] transition">
                    Add
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.qualifications.map((qual, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 shadow-sm"
                    >
                      {qual}
                      <button
                        type="button"
                        onClick={() => handleRemoveQualification(index)}
                        className="ml-2 text-blue-600 hover:text-blue-800 font-bold"
                        aria-label="Remove qualification"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-gray-50 px-6 py-4 sm:px-8 sm:flex sm:flex-row-reverse rounded-b-2xl">
              <Button
                type="submit"
                className="w-full sm:w-auto sm:ml-3 bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white font-bold px-6 py-2 rounded-lg shadow-md hover:from-[#5a6fdc] hover:to-[#5a357a] transition"
              >
                {mode === 'add' ? 'Add Teacher' : 'Update Teacher'}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="mt-3 sm:mt-0 w-full sm:w-auto border-gray-300 text-gray-700 font-semibold px-6 py-2 rounded-lg"
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
