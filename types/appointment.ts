export type PetType = 'dog' | 'cat' | 'other';

export interface Pet {
  id: string;
  name: string;
  type: PetType;
  breed?: string;
  age?: number;
}

export interface Appointment {
  id: string;
  date: string;
  time: string;
  reason: string;
  petId: string;
  address?: string;
  notes?: string;
  isHomeVisit: boolean;
}