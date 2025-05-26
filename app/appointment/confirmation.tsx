import React, { useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView,
  SafeAreaView,
  Image
} from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/colors';
import { Typography } from '@/constants/typography';
import { Button } from '@/components/Button';
import { useAppointmentStore } from '@/store/appointmentStore';
import { Calendar, Clock, MapPin, FileText, Check } from 'lucide-react-native';

export default function ConfirmationScreen() {
  const router = useRouter();
  const { 
    addAppointment,
    resetAppointmentForm,
    selectedDate,
    selectedTime,
    selectedReason,
    selectedPet,
    address,
    notes,
    isHomeVisit,
    pets
  } = useAppointmentStore();
  
  const selectedPetData = pets.find(pet => pet.id === selectedPet);
  
  const formatDate = (dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  };
  
  const handleConfirm = () => {
    if (selectedDate && selectedTime && selectedReason && selectedPet) {
      addAppointment({
        date: selectedDate,
        time: selectedTime,
        reason: selectedReason,
        petId: selectedPet,
        address: isHomeVisit ? address : '',
        notes: notes,
        isHomeVisit: isHomeVisit,
      });
      
      resetAppointmentForm();
      router.push('/(tabs)/appointments');
    }
  };
  
  const handleCancel = () => {
    router.back();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.successContainer}>
          <View style={styles.successIconContainer}>
            <Check size={40} color={Colors.background} />
          </View>
          <Text style={styles.successTitle}>¡Casi listo!</Text>
          <Text style={styles.successDescription}>
            Revisa los detalles de tu cita antes de confirmar
          </Text>
        </View>
        
        <View style={styles.appointmentCard}>
          <Text style={styles.cardTitle}>Detalles de la cita</Text>
          
          <View style={styles.detailItem}>
            <Calendar size={20} color={Colors.primary} style={styles.detailIcon} />
            <View>
              <Text style={styles.detailLabel}>Fecha</Text>
              <Text style={styles.detailValue}>{selectedDate ? formatDate(selectedDate) : ''}</Text>
            </View>
          </View>
          
          <View style={styles.detailItem}>
            <Clock size={20} color={Colors.primary} style={styles.detailIcon} />
            <View>
              <Text style={styles.detailLabel}>Hora</Text>
              <Text style={styles.detailValue}>{selectedTime}</Text>
            </View>
          </View>
          
          <View style={styles.detailItem}>
            <FileText size={20} color={Colors.primary} style={styles.detailIcon} />
            <View>
              <Text style={styles.detailLabel}>Motivo</Text>
              <Text style={styles.detailValue}>{selectedReason}</Text>
            </View>
          </View>
          
          {isHomeVisit && address && (
            <View style={styles.detailItem}>
              <MapPin size={20} color={Colors.primary} style={styles.detailIcon} />
              <View>
                <Text style={styles.detailLabel}>Dirección</Text>
                <Text style={styles.detailValue}>{address}</Text>
              </View>
            </View>
          )}
          
          {notes && (
            <View style={styles.notesContainer}>
              <Text style={styles.notesLabel}>Notas adicionales:</Text>
              <Text style={styles.notesValue}>{notes}</Text>
            </View>
          )}
          
          <View style={styles.typeTag}>
            <Text style={styles.typeTagText}>
              {isHomeVisit ? 'Visita a domicilio' : 'Consulta en clínica'}
            </Text>
          </View>
        </View>
        
        <View style={styles.petCard}>
          <Text style={styles.cardTitle}>Mascota</Text>
          
          {selectedPetData && (
            <View style={styles.petDetails}>
              <View style={styles.petIconContainer}>
                <Text style={styles.petIcon}>
                  {selectedPetData.type === 'dog' ? '🐶' : selectedPetData.type === 'cat' ? '🐱' : '🐾'}
                </Text>
              </View>
              
              <View style={styles.petInfo}>
                <Text style={styles.petName}>{selectedPetData.name}</Text>
                {selectedPetData.breed && (
                  <Text style={styles.petBreed}>{selectedPetData.breed}</Text>
                )}
                {selectedPetData.age && (
                  <Text style={styles.petAge}>{selectedPetData.age} años</Text>
                )}
              </View>
            </View>
          )}
        </View>
        
        <View style={styles.paymentInfo}>
          <Text style={styles.paymentTitle}>Información de pago</Text>
          <Text style={styles.paymentDescription}>
            El pago se realizará en el momento de la consulta. Aceptamos efectivo y tarjetas.
          </Text>
        </View>
        
        <View style={styles.buttonsContainer}>
          <Button
            title="Cancelar"
            onPress={handleCancel}
            variant="outline"
            style={styles.cancelButton}
          />
          <Button
            title="Confirmar cita"
            onPress={handleConfirm}
            style={styles.confirmButton}
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
  successContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  successIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  successTitle: {
    ...Typography.heading2,
    marginBottom: 8,
  },
  successDescription: {
    ...Typography.body,
    textAlign: 'center',
    color: Colors.textLight,
  },
  appointmentCard: {
    backgroundColor: Colors.background,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  cardTitle: {
    ...Typography.heading3,
    marginBottom: 16,
  },
  detailItem: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  detailIcon: {
    marginRight: 12,
    marginTop: 2,
  },
  detailLabel: {
    ...Typography.bodySmall,
    color: Colors.textLight,
    marginBottom: 4,
  },
  detailValue: {
    ...Typography.body,
    fontWeight: 'bold',
  },
  notesContainer: {
    backgroundColor: Colors.cardBackground,
    padding: 12,
    borderRadius: 8,
    marginTop: 8,
    marginBottom: 16,
  },
  notesLabel: {
    ...Typography.bodySmall,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  notesValue: {
    ...Typography.bodySmall,
  },
  typeTag: {
    alignSelf: 'flex-start',
    backgroundColor: Colors.primaryLight,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  typeTagText: {
    ...Typography.caption,
    color: Colors.primary,
    fontWeight: 'bold',
  },
  petCard: {
    backgroundColor: Colors.background,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  petDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  petIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  petIcon: {
    fontSize: 24,
  },
  petInfo: {
    flex: 1,
  },
  petName: {
    ...Typography.heading3,
    fontSize: 18,
    marginBottom: 4,
  },
  petBreed: {
    ...Typography.bodySmall,
    marginBottom: 2,
  },
  petAge: {
    ...Typography.bodySmall,
    color: Colors.textLight,
  },
  paymentInfo: {
    backgroundColor: Colors.cardBackground,
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  paymentTitle: {
    ...Typography.body,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  paymentDescription: {
    ...Typography.bodySmall,
    color: Colors.textLight,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  cancelButton: {
    flex: 1,
    marginRight: 8,
  },
  confirmButton: {
    flex: 1,
    marginLeft: 8,
  },
});