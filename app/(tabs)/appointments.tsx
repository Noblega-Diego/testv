import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity,
  SafeAreaView
} from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/colors';
import { Typography } from '@/constants/typography';
import { Button } from '@/components/Button';
import { Calendar, Clock, MapPin, X } from 'lucide-react-native';
import { useAppointmentStore } from '@/store/appointmentStore';
import { Appointment } from '@/types/appointment';

export default function AppointmentsScreen() {
  const router = useRouter();
  const { appointments, pets, cancelAppointment } = useAppointmentStore();
  const [upcomingAppointments, setUpcomingAppointments] = useState<Appointment[]>([]);
  const [pastAppointments, setPastAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    const now = new Date();
    
    const upcoming = appointments.filter(app => {
      const appDate = new Date(`${app.date}T${app.time}`);
      return appDate > now;
    }).sort((a, b) => {
      const dateA = new Date(`${a.date}T${a.time}`);
      const dateB = new Date(`${b.date}T${b.time}`);
      return dateA.getTime() - dateB.getTime();
    });
    
    const past = appointments.filter(app => {
      const appDate = new Date(`${app.date}T${app.time}`);
      return appDate <= now;
    }).sort((a, b) => {
      const dateA = new Date(`${a.date}T${a.time}`);
      const dateB = new Date(`${b.date}T${b.time}`);
      return dateB.getTime() - dateA.getTime(); // Reverse sort for past
    });
    
    setUpcomingAppointments(upcoming);
    setPastAppointments(past);
  }, [appointments]);

  const getPetName = (petId: string): string => {
    const pet = pets.find(p => p.id === petId);
    return pet ? pet.name : 'Mascota';
  };

  const formatDate = (dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  };

  const formatTime = (timeString: string): string => {
    return timeString.replace(':', 'h ') + 'm';
  };

  const renderAppointmentItem = ({ item, upcoming = true }: { item: Appointment; upcoming?: boolean }) => (
    <View style={styles.appointmentCard}>
      <View style={styles.appointmentHeader}>
        <Text style={styles.petName}>{getPetName(item.petId)}</Text>
        {upcoming && (
          <TouchableOpacity 
            onPress={() => cancelAppointment(item.id)}
            style={styles.cancelButton}
          >
            <X size={18} color={Colors.error} />
          </TouchableOpacity>
        )}
      </View>
      
      <Text style={styles.reasonText}>{item.reason}</Text>
      
      <View style={styles.appointmentDetails}>
        <View style={styles.detailItem}>
          <Calendar size={16} color={Colors.primary} />
          <Text style={styles.detailText}>{formatDate(item.date)}</Text>
        </View>
        
        <View style={styles.detailItem}>
          <Clock size={16} color={Colors.primary} />
          <Text style={styles.detailText}>{formatTime(item.time)}</Text>
        </View>
        
        {item.isHomeVisit && item.address && (
          <View style={styles.detailItem}>
            <MapPin size={16} color={Colors.primary} />
            <Text style={styles.detailText}>{item.address}</Text>
          </View>
        )}
      </View>
      
      {item.notes && (
        <View style={styles.notesContainer}>
          <Text style={styles.notesLabel}>Notas:</Text>
          <Text style={styles.notesText}>{item.notes}</Text>
        </View>
      )}
      
      <View style={styles.appointmentTypeTag}>
        <Text style={styles.appointmentTypeText}>
          {item.isHomeVisit ? 'Visita a domicilio' : 'Consulta en clínica'}
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Mis Citas</Text>
        
        <Button
          title="Agendar nueva cita"
          onPress={() => router.push('/appointment/online')}
          style={styles.newAppointmentButton}
        />
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Próximas citas</Text>
          
          {upcomingAppointments.length > 0 ? (
            <FlatList
              data={upcomingAppointments}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => renderAppointmentItem({ item, upcoming: true })}
              showsVerticalScrollIndicator={false}
              scrollEnabled={false}
            />
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateText}>No tienes citas programadas</Text>
            </View>
          )}
        </View>
        
        {pastAppointments.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Historial de citas</Text>
            
            <FlatList
              data={pastAppointments.slice(0, 3)}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => renderAppointmentItem({ item, upcoming: false })}
              showsVerticalScrollIndicator={false}
              scrollEnabled={false}
            />
            
            {pastAppointments.length > 3 && (
              <TouchableOpacity style={styles.viewAllButton}>
                <Text style={styles.viewAllButtonText}>Ver historial completo</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      </View>
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
  title: {
    ...Typography.heading1,
    marginBottom: 16,
  },
  newAppointmentButton: {
    marginBottom: 24,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    ...Typography.heading3,
    marginBottom: 16,
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
  appointmentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  petName: {
    ...Typography.heading3,
  },
  cancelButton: {
    padding: 4,
  },
  reasonText: {
    ...Typography.body,
    marginBottom: 12,
  },
  appointmentDetails: {
    marginBottom: 12,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailText: {
    ...Typography.bodySmall,
    marginLeft: 8,
  },
  notesContainer: {
    backgroundColor: Colors.cardBackground,
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  notesLabel: {
    ...Typography.bodySmall,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  notesText: {
    ...Typography.bodySmall,
  },
  appointmentTypeTag: {
    alignSelf: 'flex-start',
    backgroundColor: Colors.primaryLight,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  appointmentTypeText: {
    ...Typography.caption,
    color: Colors.primary,
    fontWeight: 'bold',
  },
  emptyState: {
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.cardBackground,
    borderRadius: 12,
  },
  emptyStateText: {
    ...Typography.body,
    color: Colors.textLight,
  },
  viewAllButton: {
    alignSelf: 'center',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: Colors.primary,
    marginTop: 8,
  },
  viewAllButtonText: {
    ...Typography.body,
    color: Colors.primary,
    fontWeight: 'bold',
  },
});