export type NextDeliveryMessage = {
  title: string;
  message: string;
  totalPrice: number;
  freeGift: boolean;
};

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  cats: Cat[];
};

export type Cat = {
  name: string;
  subscriptionActive: boolean;
  breed: string;
  pouchSize: 'A' | 'B' | 'C' | 'D' | 'E' | 'F';
};
