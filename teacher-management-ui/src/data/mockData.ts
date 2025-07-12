import { Teacher, TeacherStats } from '@/types/teacher';

export const mockTeachers: Teacher[] = [
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    email: 'sarah.johnson@school.edu',
    phone: '+1 (555) 123-4567',
    department: 'Mathematics',
    subject: 'Advanced Calculus',
    experience: 12,
    status: 'active',
    joinDate: '2012-08-15',
    avatar: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=150&h=150&fit=crop&crop=face&auto=format',
    qualifications: ['PhD in Mathematics', 'Masters in Education', 'Teaching Certificate'],
    address: {
      street: '123 Oak Street',
      city: 'Springfield',
      state: 'IL',
      zipCode: '62701'
    }
  },
  {
    id: '2',
    name: 'Prof. Michael Chen',
    email: 'michael.chen@school.edu',
    phone: '+1 (555) 234-5678',
    department: 'Computer Science',
    subject: 'Data Structures',
    experience: 8,
    status: 'active',
    joinDate: '2016-01-20',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    qualifications: ['Masters in Computer Science', 'Software Engineering Certificate'],
    address: {
      street: '456 Elm Avenue',
      city: 'Springfield',
      state: 'IL',
      zipCode: '62702'
    }
  },
  {
    id: '3',
    name: 'Ms. Emily Davis',
    email: 'emily.davis@school.edu',
    phone: '+1 (555) 345-6789',
    department: 'English Literature',
    subject: 'Creative Writing',
    experience: 6,
    status: 'on-leave',
    joinDate: '2018-09-10',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    qualifications: ['Masters in English Literature', 'Creative Writing Certificate'],
    address: {
      street: '789 Pine Road',
      city: 'Springfield',
      state: 'IL',
      zipCode: '62703'
    }
  },
  {
    id: '4',
    name: 'Dr. Robert Wilson',
    email: 'robert.wilson@school.edu',
    phone: '+1 (555) 456-7890',
    department: 'Physics',
    subject: 'Quantum Mechanics',
    experience: 15,
    status: 'active',
    joinDate: '2009-03-12',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    qualifications: ['PhD in Physics', 'Research Fellowship', 'Teaching Excellence Award'],
    address: {
      street: '321 Maple Lane',
      city: 'Springfield',
      state: 'IL',
      zipCode: '62704'
    }
  },
  {
    id: '5',
    name: 'Ms. Lisa Rodriguez',
    email: 'lisa.rodriguez@school.edu',
    phone: '+1 (555) 567-8901',
    department: 'Chemistry',
    subject: 'Organic Chemistry',
    experience: 4,
    status: 'inactive',
    joinDate: '2020-07-01',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
    qualifications: ['Masters in Chemistry', 'Laboratory Safety Certificate'],
    address: {
      street: '654 Cedar Street',
      city: 'Springfield',
      state: 'IL',
      zipCode: '62705'
    }
  }
];

export const mockStats: TeacherStats = {
  total: mockTeachers.length,
  active: mockTeachers.filter(t => t.status === 'active').length,
  inactive: mockTeachers.filter(t => t.status === 'inactive').length,
  onLeave: mockTeachers.filter(t => t.status === 'on-leave').length
};
