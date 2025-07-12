export interface Teacher {
  id: string;
  name: string;
  email: string;
  phone: string;
  department: string;
  subject: string;
  experience: number;
  status: 'active' | 'inactive' | 'on-leave';
  joinDate: string;
  avatar?: string;
  qualifications: string[];
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
}

export interface TeacherFormData {
  name: string;
  email: string;
  phone: string;
  department: string;
  subject: string;
  experience: number;
  joinDate: string;
  qualifications: string[];
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
}

export interface TeacherStats {
  total: number;
  active: number;
  inactive: number;
  onLeave: number;
}
