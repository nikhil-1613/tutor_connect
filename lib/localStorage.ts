export type UserRole = 'tutor' | 'parent' | 'admin';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  createdAt: string;
}

export interface TutorProfile {
  userId: string;
  name: string;
  age: string;
  gender: string;
  qualification: string;
  hasExperience: boolean;
  yearsOfExperience?: string;
  address: string;
  location?: { lat: number; lng: number };
  availableTimings: string;
  expectedSalary: string;
  phoneNumber: string;
  aadhaarUrl?: string;
  panUrl?: string;
  profilePhotoUrl?: string;
  referredBy?: string;
  assigned: boolean;
  createdAt: string;
}

export interface ParentRequest {
  id: string;
  userId: string;
  fatherName: string;
  motherName: string;
  numberOfChildren: string;
  syllabus: string;
  subjects: string[];
  preferredGender: string;
  address: string;
  location?: { lat: number; lng: number };
  preferredTimings: string;
  paymentRange: string;
  phoneNumber: string;
  additionalRequirements?: string;
  status: 'pending' | 'assigned' | 'completed';
  assignedTutorId?: string;
  createdAt: string;
}

export const getFromLocalStorage = <T>(key: string): T | null => {
  if (typeof window === 'undefined') return null;

  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    console.error(`Error reading ${key} from localStorage:`, error);
    return null;
  }
};

export const setToLocalStorage = <T>(key: string, value: T): void => {
  if (typeof window === 'undefined') return;

  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error writing ${key} to localStorage:`, error);
  }
};

export const removeFromLocalStorage = (key: string): void => {
  if (typeof window === 'undefined') return;

  try {
    window.localStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing ${key} from localStorage:`, error);
  }
};

export const getCurrentUser = (): User | null => {
  return getFromLocalStorage<User>('currentUser');
};

export const setCurrentUser = (user: User | null): void => {
  if (user) {
    setToLocalStorage('currentUser', user);
  } else {
    removeFromLocalStorage('currentUser');
  }
};

export const getAllUsers = (): User[] => {
  return getFromLocalStorage<User[]>('users') || [];
};

export const addUser = (user: User): void => {
  const users = getAllUsers();
  users.push(user);
  setToLocalStorage('users', users);
};

export const getTutorProfiles = (): TutorProfile[] => {
  return getFromLocalStorage<TutorProfile[]>('tutorProfiles') || [];
};

export const addTutorProfile = (profile: TutorProfile): void => {
  const profiles = getTutorProfiles();
  profiles.push(profile);
  setToLocalStorage('tutorProfiles', profiles);
};

export const updateTutorProfile = (userId: string, updates: Partial<TutorProfile>): void => {
  const profiles = getTutorProfiles();
  const index = profiles.findIndex(p => p.userId === userId);
  if (index !== -1) {
    profiles[index] = { ...profiles[index], ...updates };
    setToLocalStorage('tutorProfiles', profiles);
  }
};

export const getParentRequests = (): ParentRequest[] => {
  return getFromLocalStorage<ParentRequest[]>('parentRequests') || [];
};

export const addParentRequest = (request: ParentRequest): void => {
  const requests = getParentRequests();
  requests.push(request);
  setToLocalStorage('parentRequests', requests);
};

export const updateParentRequest = (id: string, updates: Partial<ParentRequest>): void => {
  const requests = getParentRequests();
  const index = requests.findIndex(r => r.id === id);
  if (index !== -1) {
    requests[index] = { ...requests[index], ...updates };
    setToLocalStorage('parentRequests', requests);
  }
};

export const initializeDemoData = (): void => {
  if (typeof window === 'undefined') return;

  const users = getAllUsers();
  if (users.length === 0) {
    const adminUser: User = {
      id: 'admin-1',
      email: 'admin@tutor.com',
      name: 'Admin User',
      role: 'admin',
      createdAt: new Date().toISOString(),
    };
    addUser(adminUser);
  }
};
