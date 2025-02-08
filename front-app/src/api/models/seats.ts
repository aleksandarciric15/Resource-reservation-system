// types.ts
export type Seat = {
  id: number;
  name: string;
  description: string;
  reserved: boolean;
  position: {
    x: number;
    y: number;
  };
};

const seats = [
  { id: 1, name: "Seat 1", description: "Near the window", reserved: false },
  { id: 2, name: "Seat 2", description: "Near the entrance", reserved: true },
  // Add more seats as needed
];
