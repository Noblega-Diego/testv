import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persist, createJSONStorage } from 'zustand/middleware';

interface Pet {
  id: string;
  name: string;
  type: 'dog' | 'cat' | 'other';
  breed?: string;
  age?: number;
}

interface Appointment {
  id: string;
  date: string;
  time: string;
  reason: string;
  petId: string;
  address?: string;
  notes?: string;
  isHomeVisit: boolean;
}

interface AppointmentState {
  appointments: Appointment[];
  pets: Pet[];
  selectedDate: string | null;
  selectedTime: string | null;
  selectedReason: string | null;
  selectedPet: string | null;
  address: string;
  notes: string;
  isHomeVisit: boolean;
  
  // Actions
  addAppointment: (appointment: Omit<Appointment, 'id'>) => void;
  cancelAppointment: (id: string) => void;
  addPet: (pet: Omit<Pet, 'id'>) => void;
  removePet: (id: string) => void;
  setSelectedDate: (date: string | null) => void;
  setSelectedTime: (time: string | null) => void;
  setSelectedReason: (reason: string | null) => void;
  setSelectedPet: (petId: string | null) => void;
  setAddress: (address: string) => void;
  setNotes: (notes: string) => void;
  setIsHomeVisit: (isHomeVisit: boolean) => void;
  resetAppointmentForm: () => void;
}

export const useAppointmentStore = create<AppointmentState>()(
  persist(
    (set) => ({
      appointments: [],
      pets: [],
      selectedDate: null,
      selectedTime: null,
      selectedReason: null,
      selectedPet: null,
      address: '',
      notes: '',
      isHomeVisit: false,
      
      addAppointment: (appointment) => 
        set((state) => ({
          appointments: [
            ...state.appointments,
            { ...appointment, id: Date.now().toString() },
          ],
        })),
      
      cancelAppointment: (id) =>
        set((state) => ({
          appointments: state.appointments.filter((app) => app.id !== id),
        })),
      
      addPet: (pet) =>
        set((state) => ({
          pets: [...state.pets, { ...pet, id: Date.now().toString() }],
        })),
      
      removePet: (id) =>
        set((state) => ({
          pets: state.pets.filter((pet) => pet.id !== id),
        })),
      
      setSelectedDate: (date) => set({ selectedDate: date }),
      setSelectedTime: (time) => set({ selectedTime: time }),
      setSelectedReason: (reason) => set({ selectedReason: reason }),
      setSelectedPet: (petId) => set({ selectedPet: petId }),
      setAddress: (address) => set({ address }),
      setNotes: (notes) => set({ notes }),
      setIsHomeVisit: (isHomeVisit) => set({ isHomeVisit }),
      
      resetAppointmentForm: () => set({
        selectedDate: null,
        selectedTime: null,
        selectedReason: null,
        selectedPet: null,
        address: '',
        notes: '',
        isHomeVisit: false,
      }),
    }),
    {
      name: 'appointment-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);