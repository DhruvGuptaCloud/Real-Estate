export interface Property {
  id: string;
  address: string;
  beds: number;
  baths: number;
  sqft: number;
  currentRent: number;
  lastPriced: string;
  status: 'Ready' | 'In Review' | 'Completed';
  image: string;
}

export const properties: Property[] = [
  {
    id: 'p1',
    address: '1042 W Fulton Market, Unit 3B',
    beds: 2,
    baths: 2,
    sqft: 1100,
    currentRent: 3200,
    lastPriced: '2 days ago',
    status: 'Ready',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800&h=600',
  },
  {
    id: 'p2',
    address: '1631 N Milwaukee Ave, Unit 401',
    beds: 1,
    baths: 1,
    sqft: 750,
    currentRent: 2100,
    lastPriced: '1 week ago',
    status: 'Completed',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=800&h=600',
  },
  {
    id: 'p3',
    address: '2211 N Milwaukee Ave, Unit 2F',
    beds: 3,
    baths: 2,
    sqft: 1400,
    currentRent: 3800,
    lastPriced: 'Pending',
    status: 'In Review',
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=800&h=600',
  },
  {
    id: 'p4',
    address: '900 N Michigan Ave, Unit 12A',
    beds: 2,
    baths: 2.5,
    sqft: 1600,
    currentRent: 4500,
    lastPriced: '1 month ago',
    status: 'Completed',
    image: 'https://images.unsplash.com/photo-1493809842364-78817add7ff6?auto=format&fit=crop&q=80&w=800&h=600',
  },
];

export interface CompProperty extends Property {
  matchScore: number;
  differences: { type: 'positive' | 'negative' | 'neutral', label: string, detail: string }[];
}

export const mockComps: CompProperty[] = [
  {
    id: 'c1',
    address: '1050 W Fulton Market, Unit 2A',
    beds: 2,
    baths: 2,
    sqft: 1150,
    currentRent: 3350,
    lastPriced: '1 week ago',
    status: 'Completed',
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&q=80&w=400',
    matchScore: 92,
    differences: [
      { type: 'positive', label: 'Better View', detail: 'City skyline view +$50' },
      { type: 'negative', label: 'Noisy', detail: 'Closer to train tracks -$100' }
    ]
  },
  {
    id: 'c2',
    address: '1020 W Fulton Market, Unit 4C',
    beds: 2,
    baths: 2,
    sqft: 1050,
    currentRent: 3100,
    lastPriced: '3 weeks ago',
    status: 'Completed',
    image: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&q=80&w=400',
    matchScore: 88,
    differences: [
      { type: 'negative', label: 'Older Kitchen', detail: 'Unrenovated kitchen -$150' },
    ]
  },
  {
    id: 'c3',
    address: '1100 W Fulton Market, Unit 1B',
    beds: 2,
    baths: 1.5,
    sqft: 1100,
    currentRent: 3000,
    lastPriced: '2 months ago',
    status: 'Completed',
    image: 'https://images.unsplash.com/photo-1502672260266-1c1c24226133?auto=format&fit=crop&q=80&w=400',
    matchScore: 85,
    differences: [
      { type: 'negative', label: 'Half Bath Only', detail: 'Missing full second bath -$200' },
      { type: 'positive', label: 'Corner Unit', detail: 'Extra natural light +$75' }
    ]
  }
];

export interface ChatMessage {
  id: string;
  sender: 'user' | 'agent';
  text: string;
  timestamp: Date;
}
