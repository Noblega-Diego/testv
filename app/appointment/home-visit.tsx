import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Image
} from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/colors';
import { Typography } from '@/constants/typography';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { DateSelector } from '@/components/DateSelector';
import { AppointmentSlot } from '@/components/AppointmentSlot';
import { availableSlots, consultationReasons, regions } from '@/mocks/appointments';
import { useAppointmentStore } from '@/store/appointmentStore';
import { MapPin, Calendar, Clock } from 'lucide-react-native';

interface DateItem {
  date: string;
  day: string;
  dayOfMonth: string;
  month: string;
}

interface TimeSlot {
  id: string;
  date: string;
  time: string;
  available: boolean;
}

export default function HomeVisitScreen() {
  const router = useRouter();
  const { 
    pets, 
    setSelectedDate, 
    setSelectedTime, 
    setSelectedReason, 
    setSelectedPet,
    setAddress,
    setNotes,
    setIsHomeVisit,
    selectedDate,
    selectedTime,
    selectedReason,
    selectedPet,
    address,
    notes
  } = useAppointmentStore();
  
  const [dates, setDates] = useState<DateItem[]>([]);
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [step, setStep] = useState(1);
  const [selectedRegion, setSelectedRegion] = useState('');

  // Generate dates for the next 7 days
  useEffect(() => {
    const generateDates = () => {
      const result: DateItem[] = [];
      const days = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
      const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
      
      for (let i = 0; i < 7; i++) {
        const date = new Date();
        date.setDate(date.getDate() + i);
        
        result.push({
          date: date.toISOString().split('T')[0],
          day: days[date.getDay()],
          dayOfMonth: date.getDate().toString(),
          month: months[date.getMonth()],
        });
      }
      
      return result;
    };
    
    setDates(generateDates());
    
    // Set default date to today
    if (!selectedDate) {
      setSelectedDate(new Date().toISOString().split('T')[0]);
    }
    
    // Set home visit to true
    setIsHomeVisit(true);
  }, []);
  
  // Filter time slots based on selected date
  useEffect(() => {
    if (selectedDate) {
      const filtered = availableSlots.filter(slot => 
        slot.date === selectedDate
      );
      setTimeSlots(filtered);
    }
  }, [selectedDate]);
  
  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
    setSelectedTime(null);
  };
  
  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };
  
  const handleReasonSelect = (reason: string) => {
    setSelectedReason(reason);
  };
  
  const handlePetSelect = (petId: string) => {
    setSelectedPet(petId);
  };
  
  const handleRegionSelect = (region: string) => {
    setSelectedRegion(region);
    setAddress(`${region}, `);
  };
  
  const handleContinue = () => {
    if (step === 1) {
      if (!selectedDate || !selectedTime || !selectedReason) {
        // Show error or validation message
        return;
      }
      setStep(2);
    } else if (step === 2) {
      if (!selectedPet || !address) {
        // Show error or validation message
        return;
      }
      router.push('/appointment/confirmation');
    }
  };
  
  const handleBack = () => {
    if (step === 2) {
      setStep(1);
    } else {
      router.back();
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.stepsContainer}>
          <View style={[styles.stepIndicator, step >= 1 && styles.activeStep]}>
            <Text style={[styles.stepNumber, step >= 1 && styles.activeStepText]}>1</Text>
          </View>
          <View style={styles.stepConnector} />
          <View style={[styles.stepIndicator, step >= 2 && styles.activeStep]}>
            <Text style={[styles.stepNumber, step >= 2 && styles.activeStepText]}>2</Text>
          </View>
        </View>
        
        {step === 1 ? (
          <>
            <View style={styles.homeVisitCard}>
              <Image
                source={{ uri: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' }}
                style={styles.homeVisitImage}
              />
              <View style={styles.homeVisitContent}>
                <Text style={styles.homeVisitTitle}>Programa la visita a tu domicilio</Text>
                <Text style={styles.homeVisitDescription}>
                  Nuestros veterinarios irán a tu casa para atender a tu mascota en la comodidad de tu hogar.
                </Text>
              </View>
            </View>
            
            <Text style={styles.sectionTitle}>Selecciona una fecha</Text>
            <DateSelector
              dates={dates}
              selectedDate={selectedDate || ''}
              onSelectDate={handleDateSelect}
            />
            
            <Text style={styles.sectionTitle}>Horarios disponibles</Text>
            {timeSlots.length > 0 ? (
              <View style={styles.timeSlotsContainer}>
                {timeSlots.map((slot) => (
                  <AppointmentSlot
                    key={slot.id}
                    time={slot.time}
                    available={slot.available}
                    selected={selectedTime === slot.time}
                    onPress={() => slot.available && handleTimeSelect(slot.time)}
                  />
                ))}
              </View>
            ) : (
              <Text style={styles.noSlotsText}>No hay horarios disponibles para esta fecha</Text>
            )}
            
            <Text style={styles.sectionTitle}>Motivo de consulta</Text>
            <View style={styles.reasonsContainer}>
              {consultationReasons.map((reason) => (
                <TouchableOpacity
                  key={reason.id}
                  style={[
                    styles.reasonItem,
                    selectedReason === reason.name && styles.selectedReasonItem,
                  ]}
                  onPress={() => handleReasonSelect(reason.name)}
                  activeOpacity={0.8}
                >
                  <Text
                    style={[
                      styles.reasonText,
                      selectedReason === reason.name && styles.selectedReasonText,
                    ]}
                  >
                    {reason.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </>
        ) : (
          <>
            <Text style={styles.sectionTitle}>Selecciona tu mascota</Text>
            {pets.length > 0 ? (
              <View style={styles.petsContainer}>
                {pets.map((pet) => (
                  <TouchableOpacity
                    key={pet.id}
                    style={[
                      styles.petItem,
                      selectedPet === pet.id && styles.selectedPetItem,
                    ]}
                    onPress={() => handlePetSelect(pet.id)}
                    activeOpacity={0.8}
                  >
                    <View style={styles.petIconContainer}>
                      <Text style={styles.petIcon}>
                        {pet.type === 'dog' ? '🐶' : pet.type === 'cat' ? '🐱' : '🐾'}
                      </Text>
                    </View>
                    <Text style={styles.petName}>{pet.name}</Text>
                    {pet.breed && <Text style={styles.petBreed}>{pet.breed}</Text>}
                  </TouchableOpacity>
                ))}
              </View>
            ) : (
              <View style={styles.noPetsContainer}>
                <Text style={styles.noPetsText}>No tienes mascotas registradas</Text>
                <Button
                  title="Agregar mascota"
                  onPress={() => router.push('/profile?tab=pets&action=add')}
                  style={styles.addPetButton}
                />
              </View>
            )}
            
            <Text style={styles.sectionTitle}>Dirección</Text>
            <View style={styles.regionsContainer}>
              {regions.map((region, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.regionItem,
                    selectedRegion === region && styles.selectedRegionItem,
                  ]}
                  onPress={() => handleRegionSelect(region)}
                  activeOpacity={0.8}
                >
                  <Text
                    style={[
                      styles.regionText,
                      selectedRegion === region && styles.selectedRegionText,
                    ]}
                  >
                    {region}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            
            <Input
              label="Dirección completa"
              placeholder="Calle, número, piso, departamento..."
              value={address}
              onChangeText={setAddress}
            />
            
            <Text style={styles.sectionTitle}>Notas adicionales (opcional)</Text>
            <Input
              placeholder="Describe brevemente el motivo de tu consulta..."
              value={notes}
              onChangeText={setNotes}
              multiline
              numberOfLines={4}
            />
          </>
        )}
        
        <View style={styles.buttonsContainer}>
          <Button
            title="Atrás"
            onPress={handleBack}
            variant="outline"
            style={styles.backButton}
          />
          <Button
            title={step === 1 ? "Continuar" : "Confirmar cita"}
            onPress={handleContinue}
            style={styles.continueButton}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  container: {
    flex: 1,
    padding: 16,
  },
  stepsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  stepIndicator: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.cardBackground,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeStep: {
    backgroundColor: Colors.primary,
  },
  stepNumber: {
    ...Typography.body,
    fontWeight: 'bold',
    color: Colors.textLight,
  },
  activeStepText: {
    color: Colors.background,
  },
  stepConnector: {
    flex: 0.2,
    height: 2,
    backgroundColor: Colors.border,
  },
  homeVisitCard: {
    backgroundColor: Colors.background,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  homeVisitImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  homeVisitContent: {
    padding: 16,
  },
  homeVisitTitle: {
    ...Typography.heading3,
    marginBottom: 8,
  },
  homeVisitDescription: {
    ...Typography.bodySmall,
  },
  sectionTitle: {
    ...Typography.heading3,
    marginBottom: 16,
  },
  timeSlotsContainer: {
    marginBottom: 24,
  },
  noSlotsText: {
    ...Typography.body,
    color: Colors.textLight,
    textAlign: 'center',
    marginBottom: 24,
  },
  reasonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 24,
  },
  reasonItem: {
    backgroundColor: Colors.cardBackground,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    marginBottom: 8,
  },
  selectedReasonItem: {
    backgroundColor: Colors.primary,
  },
  reasonText: {
    ...Typography.bodySmall,
  },
  selectedReasonText: {
    color: Colors.background,
    fontWeight: 'bold',
  },
  petsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 24,
  },
  petItem: {
    width: '48%',
    backgroundColor: Colors.cardBackground,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    marginRight: '4%',
    alignItems: 'center',
  },
  selectedPetItem: {
    backgroundColor: Colors.primaryLight,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  petIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  petIcon: {
    fontSize: 24,
  },
  petName: {
    ...Typography.body,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  petBreed: {
    ...Typography.caption,
    color: Colors.textLight,
  },
  noPetsContainer: {
    backgroundColor: Colors.cardBackground,
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
    marginBottom: 24,
  },
  noPetsText: {
    ...Typography.body,
    color: Colors.textLight,
    marginBottom: 16,
  },
  addPetButton: {
    width: '100%',
  },
  regionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  regionItem: {
    backgroundColor: Colors.cardBackground,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    marginBottom: 8,
  },
  selectedRegionItem: {
    backgroundColor: Colors.primary,
  },
  regionText: {
    ...Typography.bodySmall,
  },
  selectedRegionText: {
    color: Colors.background,
    fontWeight: 'bold',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
    marginBottom: 32,
  },
  backButton: {
    flex: 1,
    marginRight: 8,
  },
  continueButton: {
    flex: 1,
    marginLeft: 8,
  },
});