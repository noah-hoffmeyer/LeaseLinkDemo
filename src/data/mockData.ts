import { User, Profile, Listing } from '../types';

export const mockUsers: User[] = [
  { id: 'u1', email: 'demo@student.edu', name: 'Alex Johnson', avatar: 'https://i.pravatar.cc/150?u=u1' },
  { id: 'u2', email: 'sarah@student.edu', name: 'Sarah Smith', avatar: 'https://i.pravatar.cc/150?u=u2' },
  { id: 'u3', email: 'mike@student.edu', name: 'Mike Davis', avatar: 'https://i.pravatar.cc/150?u=u3' },
  { id: 'u4', email: 'emily@student.edu', name: 'Emily Chen', avatar: 'https://i.pravatar.cc/150?u=u4' },
];

export const mockProfiles: Profile[] = [
  {
    id: 'p1',
    userId: 'u1',
    name: 'Alex Johnson',
    avatar: 'https://i.pravatar.cc/150?u=u1',
    bio: 'Computer Science major looking for a chill roommate. I study a lot but like to hang out on weekends.',
    budgetMin: 600,
    budgetMax: 1000,
    lifestyle: { cleanliness: 4, sleepSchedule: 'flexible', smoking: false, pets: false },
    major: 'Computer Science',
    year: 'Junior'
  },
  {
    id: 'p2',
    userId: 'u2',
    name: 'Sarah Smith',
    avatar: 'https://i.pravatar.cc/150?u=u2',
    bio: 'Nursing student. Very clean and quiet during the week. Love cooking!',
    budgetMin: 500,
    budgetMax: 900,
    lifestyle: { cleanliness: 5, sleepSchedule: 'early', smoking: false, pets: true },
    major: 'Nursing',
    year: 'Senior'
  },
  {
    id: 'p3',
    userId: 'u3',
    name: 'Mike Davis',
    avatar: 'https://i.pravatar.cc/150?u=u3',
    bio: 'Business major. I play guitar and love going to concerts.',
    budgetMin: 800,
    budgetMax: 1200,
    lifestyle: { cleanliness: 3, sleepSchedule: 'night', smoking: true, pets: false },
    major: 'Business',
    year: 'Sophomore'
  },
  {
    id: 'p4',
    userId: 'u4',
    name: 'Emily Chen',
    avatar: 'https://i.pravatar.cc/150?u=u4',
    bio: 'Art History major. Looking for a creative and respectful roommate.',
    budgetMin: 700,
    budgetMax: 1100,
    lifestyle: { cleanliness: 4, sleepSchedule: 'flexible', smoking: false, pets: true },
    major: 'Art History',
    year: 'Junior'
  }
];

export const mockListings: Listing[] = [
  {
    id: 'l1',
    userId: 'u2',
    title: 'Sunny Room in 2BR Apartment near Campus',
    description: 'Looking for someone to take the second bedroom in my apartment. 10 min walk to campus, in-unit laundry.',
    price: 850,
    location: 'Northside Apartments',
    bedrooms: 2,
    bathrooms: 1,
    availableDate: '2026-08-01',
    images: ['https://picsum.photos/seed/room1/600/400', 'https://picsum.photos/seed/room2/600/400'],
    amenities: ['In-unit Laundry', 'Furnished', 'WiFi Included']
  },
  {
    id: 'l2',
    userId: 'u3',
    title: 'Master Bedroom with Private Bath',
    description: 'Spacious master bedroom available in a 3BR house. Big backyard, driveway parking.',
    price: 950,
    location: 'West End',
    bedrooms: 3,
    bathrooms: 2,
    availableDate: '2026-09-01',
    images: ['https://picsum.photos/seed/room3/600/400'],
    amenities: ['Parking', 'Gym Access', 'Pool']
  }
];
