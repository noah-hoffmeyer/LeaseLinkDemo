import { User, Profile, Listing } from '../types';

export const mockUsers: User[] = [
  { id: 'u1', email: 'demo@student.edu', name: 'Alex Johnson', avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80' },
  { id: 'u2', email: 'sarah@student.edu', name: 'Sarah Smith', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80' },
  { id: 'u3', email: 'mike@student.edu', name: 'Mike Davis', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80' },
  { id: 'u4', email: 'emily@student.edu', name: 'Emily Chen', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=400&q=80' },
  { id: 'u5', email: 'david@student.edu', name: 'David Kim', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80' },
  { id: 'u6', email: 'jessica@student.edu', name: 'Jessica Taylor', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80' },
  { id: 'u7', email: 'ryan@student.edu', name: 'Ryan Martinez', avatar: 'https://images.unsplash.com/photo-1488161628813-04466f872507?auto=format&fit=crop&w=400&q=80' },
  { id: 'u8', email: 'chloe@student.edu', name: 'Chloe Williams', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80' },
];

export const mockProfiles: Profile[] = [
  {
    id: 'p1',
    userId: 'u1',
    name: 'Alex Johnson',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80',
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
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
    bio: 'Nursing student. Very clean and quiet during the week. Love cooking and hosting occasional dinners!',
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
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    bio: 'Business major. I play guitar and love going to concerts. Pretty laid back about most things.',
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
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=400&q=80',
    bio: 'Art History major. Looking for a creative and respectful roommate. I paint in my free time.',
    budgetMin: 700,
    budgetMax: 1100,
    lifestyle: { cleanliness: 4, sleepSchedule: 'flexible', smoking: false, pets: true },
    major: 'Art History',
    year: 'Junior'
  },
  {
    id: 'p5',
    userId: 'u5',
    name: 'David Kim',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    bio: 'Engineering student. I spend most of my time at the library or gym. Looking for a quiet place to sleep.',
    budgetMin: 800,
    budgetMax: 1300,
    lifestyle: { cleanliness: 4, sleepSchedule: 'early', smoking: false, pets: false },
    major: 'Mechanical Engineering',
    year: 'Senior'
  },
  {
    id: 'p6',
    userId: 'u6',
    name: 'Jessica Taylor',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
    bio: 'Psychology major. I have a golden retriever named Max! Love movie nights and baking.',
    budgetMin: 600,
    budgetMax: 950,
    lifestyle: { cleanliness: 3, sleepSchedule: 'flexible', smoking: false, pets: true },
    major: 'Psychology',
    year: 'Sophomore'
  },
  {
    id: 'p7',
    userId: 'u7',
    name: 'Ryan Martinez',
    avatar: 'https://images.unsplash.com/photo-1488161628813-04466f872507?auto=format&fit=crop&w=400&q=80',
    bio: 'Kinesiology major. Very active, always outdoors. Keep common areas spotless.',
    budgetMin: 700,
    budgetMax: 1100,
    lifestyle: { cleanliness: 5, sleepSchedule: 'early', smoking: false, pets: false },
    major: 'Kinesiology',
    year: 'Junior'
  },
  {
    id: 'p8',
    userId: 'u8',
    name: 'Chloe Williams',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    bio: 'Graphic Design student. Night owl, usually working on projects late. Very easygoing.',
    budgetMin: 500,
    budgetMax: 850,
    lifestyle: { cleanliness: 2, sleepSchedule: 'night', smoking: true, pets: true },
    major: 'Graphic Design',
    year: 'Freshman'
  }
];

export const mockListings: Listing[] = [
  {
    id: 'l1',
    userId: 'u2',
    title: 'Sunny Room in 2BR Apartment near Campus',
    description: 'Looking for someone to take the second bedroom in my apartment. 10 min walk to campus, in-unit laundry. The living room gets great natural light!',
    price: 850,
    location: 'Northside Apartments',
    bedrooms: 2,
    bathrooms: 1,
    availableDate: '2026-08-01',
    images: ['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=600&q=80', 'https://images.unsplash.com/photo-1502672260266-1c1e52408437?auto=format&fit=crop&w=600&q=80'],
    amenities: ['In-unit Laundry', 'Furnished', 'WiFi Included']
  },
  {
    id: 'l2',
    userId: 'u3',
    title: 'Master Bedroom with Private Bath',
    description: 'Spacious master bedroom available in a 3BR house. Big backyard, driveway parking. Roommates are two chill guys.',
    price: 950,
    location: 'West End',
    bedrooms: 3,
    bathrooms: 2,
    availableDate: '2026-09-01',
    images: ['https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=600&q=80'],
    amenities: ['Parking', 'Gym Access', 'Pool']
  },
  {
    id: 'l3',
    userId: 'u5',
    title: 'Modern 4BR House - 1 Room Available',
    description: 'Brand new construction! We have one room left in our 4-bedroom house. Stainless steel appliances, hardwood floors, and a great patio.',
    price: 750,
    location: 'Campus Edge',
    bedrooms: 4,
    bathrooms: 3,
    availableDate: '2026-08-15',
    images: ['https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=600&q=80'],
    amenities: ['In-unit Laundry', 'Parking', 'WiFi Included']
  },
  {
    id: 'l4',
    userId: 'u6',
    title: 'Cozy Studio Downtown - Sublet',
    description: 'Subletting my studio apartment for the fall semester. Perfect for someone who wants their own space. Very pet friendly building!',
    price: 1100,
    location: 'Downtown',
    bedrooms: 1,
    bathrooms: 1,
    availableDate: '2026-08-01',
    images: ['https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=600&q=80'],
    amenities: ['Pet Friendly', 'Gym Access', 'Furnished']
  },
  {
    id: 'l5',
    userId: 'u7',
    title: 'Shared Room in Luxury Apartment',
    description: 'Looking for a roommate to share a large master bedroom. The apartment complex has amazing amenities including a resort-style pool and 24/7 gym.',
    price: 650,
    location: 'The Heights',
    bedrooms: 2,
    bathrooms: 2,
    availableDate: '2026-08-01',
    images: ['https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=600&q=80'],
    amenities: ['Pool', 'Gym Access', 'WiFi Included', 'Parking']
  }
];
