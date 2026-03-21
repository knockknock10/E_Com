export interface Property {
  id: string;
  title: string;
  location: string;
  price: number;
  beds: number;
  baths: number;
  sqft: number;
  description: string;
  imageUrl: string;
}

export const mockProperties: Property[] = [
  {
    id: "prop-1",
    title: "Modern Glass Villa",
    location: "Beverly Hills, CA",
    price: 4500000,
    beds: 5,
    baths: 6,
    sqft: 6200,
    description: "An architectural masterpiece featuring floor-to-ceiling glass walls, an infinity pool, and panoramic city views.",
    imageUrl: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "prop-2",
    title: "Minimalist Desert Retreat",
    location: "Scottsdale, AZ",
    price: 2850000,
    beds: 4,
    baths: 4.5,
    sqft: 4100,
    description: "A serene desert oasis blending brutalist concrete aesthetics with warm wood accents.",
    imageUrl: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "prop-3",
    title: "Contemporary Oceanfront Elegance",
    location: "Malibu, CA",
    price: 8900000,
    beds: 6,
    baths: 7,
    sqft: 8500,
    description: "Unobstructed ocean views from every room in this sprawling luxury estate. Features private beach access.",
    imageUrl: "https://images.unsplash.com/photo-1613490908676-e41ebc96d3bb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "prop-4",
    title: "Alpine Modern Chalet",
    location: "Aspen, CO",
    price: 5200000,
    beds: 5,
    baths: 5,
    sqft: 5400,
    description: "A sophisticated take on mountain living. Features extensive use of natural stone and ski-in/ski-out access.",
    imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "prop-5",
    title: "Urban Luxury Penthouse",
    location: "Manhattan, NY",
    price: 12500000,
    beds: 3,
    baths: 3.5,
    sqft: 3800,
    description: "High above the city, this penthouse offers 360-degree skyline views and private elevator access.",
    imageUrl: "https://images.unsplash.com/photo-1600607687931-570a2fbd03ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "prop-6",
    title: "Zen Garden Estate",
    location: "Kyoto, Japan",
    price: 3400000,
    beds: 4,
    baths: 3,
    sqft: 3200,
    description: "Traditional Japanese architecture meets modern luxury. Enclosed by a tranquil bamboo forest.",
    imageUrl: "https://images.unsplash.com/photo-1600566753086-00f18efc2291?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
  }
];
