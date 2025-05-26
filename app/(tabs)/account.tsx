import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView,
  TouchableOpacity,
  SafeAreaView
} from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/colors';
import { Typography } from '@/constants/typography';
import { Button } from '@/components/Button';
import { 
  User, 
  Heart, 
  Calendar, 
  Settings, 
  HelpCircle, 
  LogOut,
  ChevronRight
} from 'lucide-react-native';
import { useAppointmentStore } from '@/store/appointmentStore';

export default function AccountScreen() {
  const router = useRouter();
  const { pets } = useAppointmentStore();

  const menuItems = [
    { 
      icon: <User size={24} color={Colors.primary} />,
      title: 'Mi perfil',
      onPress: () => router.push('/profile'),
    },
    { 
      icon: <Heart size={24} color={Colors.primary} />,
      title: 'Mis mascotas',
      subtitle: `${pets.length} mascotas registradas`,
      onPress: () => router.push('/profile?tab=pets'),
    },
    { 
      icon: <Calendar size={24} color={Colors.primary} />,
      title: 'Historial de citas',
      onPress: () => router.push('/appointments/history'),
    },
    { 
      icon: <Settings size={24} color={Colors.primary} />,
      title: 'Configuración',
      onPress: () => router.push('/settings'),
    },
    { 
      icon: <HelpCircle size={24} color={Colors.primary} />,
      title: 'Ayuda y soporte',
      onPress: () => router.push('/help'),
    },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Mi Cuenta</Text>
        
        <View style={styles.profileCard}>
          <View style={styles.profileImagePlaceholder}>
            <User size={40} color={Colors.primary} />
          </View>
          
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>Usuario</Text>
            <Text style={styles.profileEmail}>usuario@example.com</Text>
          </View>
          
          <Button
            title="Editar"
            onPress={() => router.push('/profile')}
            variant="outline"
            size="small"
            style={styles.editButton}
          />
        </View>
        
        <View style={styles.membershipCard}>
          <Text style={styles.membershipTitle}>Soy Afiliado</Text>
          <Text style={styles.membershipDescription}>
            Disfruta de beneficios exclusivos y descuentos en nuestros servicios.
          </Text>
          <Button
            title="Ver beneficios"
            onPress={() => {}}
            style={styles.membershipButton}
          />
        </View>
        
        <View style={styles.menuContainer}>
          {menuItems.map((item, index) => (
            <TouchableOpacity 
              key={index}
              style={styles.menuItem}
              onPress={item.onPress}
              activeOpacity={0.7}
            >
              <View style={styles.menuItemIcon}>
                {item.icon}
              </View>
              
              <View style={styles.menuItemContent}>
                <Text style={styles.menuItemTitle}>{item.title}</Text>
                {item.subtitle && (
                  <Text style={styles.menuItemSubtitle}>{item.subtitle}</Text>
                )}
              </View>
              
              <ChevronRight size={20} color={Colors.textLight} />
            </TouchableOpacity>
          ))}
        </View>
        
        <TouchableOpacity style={styles.logoutButton} activeOpacity={0.7}>
          <LogOut size={20} color={Colors.error} />
          <Text style={styles.logoutText}>Cerrar sesión</Text>
        </TouchableOpacity>
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
  title: {
    ...Typography.heading1,
    marginBottom: 24,
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background,
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  profileImagePlaceholder: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: Colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileInfo: {
    flex: 1,
    marginLeft: 16,
  },
  profileName: {
    ...Typography.heading3,
    marginBottom: 4,
  },
  profileEmail: {
    ...Typography.bodySmall,
    color: Colors.textLight,
  },
  editButton: {
    paddingHorizontal: 16,
  },
  membershipCard: {
    backgroundColor: Colors.primaryLight,
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  membershipTitle: {
    ...Typography.heading3,
    marginBottom: 8,
  },
  membershipDescription: {
    ...Typography.bodySmall,
    marginBottom: 16,
  },
  membershipButton: {
    alignSelf: 'flex-start',
  },
  menuContainer: {
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
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  menuItemIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  menuItemContent: {
    flex: 1,
  },
  menuItemTitle: {
    ...Typography.body,
    fontWeight: 'bold',
  },
  menuItemSubtitle: {
    ...Typography.bodySmall,
    color: Colors.textLight,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
  },
  logoutText: {
    ...Typography.body,
    color: Colors.error,
    fontWeight: 'bold',
    marginLeft: 8,
  },
});