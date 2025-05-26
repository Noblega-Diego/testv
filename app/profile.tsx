import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Alert
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Colors } from '@/constants/colors';
import { Typography } from '@/constants/typography';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { useAppointmentStore } from '@/store/appointmentStore';
import { User, Heart, Plus, Edit, Trash2 } from 'lucide-react-native';
import { PetType } from '@/types/appointment';

export default function ProfileScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { pets, addPet, removePet } = useAppointmentStore();
  
  const [activeTab, setActiveTab] = useState(params.tab || 'profile');
  const [showAddPet, setShowAddPet] = useState(params.action === 'add');
  
  // Profile form state
  const [name, setName] = useState('Usuario');
  const [email, setEmail] = useState('usuario@example.com');
  const [phone, setPhone] = useState('');
  
  // New pet form state
  const [petName, setPetName] = useState('');
  const [petType, setPetType] = useState<PetType>('dog');
  const [petBreed, setPetBreed] = useState('');
  const [petAge, setPetAge] = useState('');
  
  const handleSaveProfile = () => {
    Alert.alert('Perfil actualizado', 'Tus datos han sido actualizados correctamente.');
  };
  
  const handleAddPet = () => {
    if (!petName) {
      Alert.alert('Error', 'Por favor ingresa el nombre de tu mascota.');
      return;
    }
    
    addPet({
      name: petName,
      type: petType,
      breed: petBreed,
      age: petAge ? parseInt(petAge) : undefined,
    });
    
    setPetName('');
    setPetType('dog');
    setPetBreed('');
    setPetAge('');
    setShowAddPet(false);
    
    Alert.alert('Mascota agregada', `${petName} ha sido agregado a tu lista de mascotas.`);
  };
  
  const handleDeletePet = (id: string, name: string) => {
    Alert.alert(
      'Eliminar mascota',
      `¿Estás seguro de que deseas eliminar a ${name}?`,
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Eliminar',
          onPress: () => {
            removePet(id);
            Alert.alert('Mascota eliminada', `${name} ha sido eliminado de tu lista de mascotas.`);
          },
          style: 'destructive',
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.profileHeader}>
          <View style={styles.profileImageContainer}>
            <User size={40} color={Colors.primary} />
          </View>
          <Text style={styles.profileName}>{name}</Text>
        </View>
        
        <View style={styles.tabsContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'profile' && styles.activeTab]}
            onPress={() => setActiveTab('profile')}
            activeOpacity={0.8}
          >
            <Text
              style={[styles.tabText, activeTab === 'profile' && styles.activeTabText]}
            >
              Perfil
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.tab, activeTab === 'pets' && styles.activeTab]}
            onPress={() => setActiveTab('pets')}
            activeOpacity={0.8}
          >
            <Text
              style={[styles.tabText, activeTab === 'pets' && styles.activeTabText]}
            >
              Mis mascotas
            </Text>
          </TouchableOpacity>
        </View>
        
        {activeTab === 'profile' ? (
          <View style={styles.formContainer}>
            <Input
              label="Nombre completo"
              value={name}
              onChangeText={setName}
              placeholder="Tu nombre"
            />
            
            <Input
              label="Correo electrónico"
              value={email}
              onChangeText={setEmail}
              placeholder="tu@email.com"
            />
            
            <Input
              label="Teléfono"
              value={phone}
              onChangeText={setPhone}
              placeholder="Tu número de teléfono"
            />
            
            <Button
              title="Guardar cambios"
              onPress={handleSaveProfile}
              style={styles.saveButton}
            />
          </View>
        ) : (
          <View style={styles.petsContainer}>
            {showAddPet ? (
              <View style={styles.addPetForm}>
                <Text style={styles.formTitle}>Agregar mascota</Text>
                
                <Input
                  label="Nombre"
                  value={petName}
                  onChangeText={setPetName}
                  placeholder="Nombre de tu mascota"
                />
                
                <Text style={styles.inputLabel}>Tipo de mascota</Text>
                <View style={styles.petTypeContainer}>
                  <TouchableOpacity
                    style={[styles.petTypeOption, petType === 'dog' && styles.selectedPetType]}
                    onPress={() => setPetType('dog')}
                    activeOpacity={0.8}
                  >
                    <Text style={[styles.petTypeText, petType === 'dog' && styles.selectedPetTypeText]}>
                      🐶 Perro
                    </Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity
                    style={[styles.petTypeOption, petType === 'cat' && styles.selectedPetType]}
                    onPress={() => setPetType('cat')}
                    activeOpacity={0.8}
                  >
                    <Text style={[styles.petTypeText, petType === 'cat' && styles.selectedPetTypeText]}>
                      🐱 Gato
                    </Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity
                    style={[styles.petTypeOption, petType === 'other' && styles.selectedPetType]}
                    onPress={() => setPetType('other')}
                    activeOpacity={0.8}
                  >
                    <Text style={[styles.petTypeText, petType === 'other' && styles.selectedPetTypeText]}>
                      🐾 Otro
                    </Text>
                  </TouchableOpacity>
                </View>
                
                <Input
                  label="Raza (opcional)"
                  value={petBreed}
                  onChangeText={setPetBreed}
                  placeholder="Raza de tu mascota"
                />
                
                <Input
                  label="Edad (opcional)"
                  value={petAge}
                  onChangeText={(text) => setPetAge(text.replace(/[^0-9]/g, ''))}
                  placeholder="Edad en años"
                />
                
                <View style={styles.formButtons}>
                  <Button
                    title="Cancelar"
                    onPress={() => setShowAddPet(false)}
                    variant="outline"
                    style={styles.cancelButton}
                  />
                  <Button
                    title="Guardar"
                    onPress={handleAddPet}
                    style={styles.addButton}
                  />
                </View>
              </View>
            ) : (
              <>
                <TouchableOpacity
                  style={styles.addPetButton}
                  onPress={() => setShowAddPet(true)}
                  activeOpacity={0.8}
                >
                  <Plus size={20} color={Colors.background} />
                  <Text style={styles.addPetButtonText}>Agregar mascota</Text>
                </TouchableOpacity>
                
                {pets.length > 0 ? (
                  <View style={styles.petsList}>
                    {pets.map((pet) => (
                      <View key={pet.id} style={styles.petCard}>
                        <View style={styles.petIconContainer}>
                          <Text style={styles.petIcon}>
                            {pet.type === 'dog' ? '🐶' : pet.type === 'cat' ? '🐱' : '🐾'}
                          </Text>
                        </View>
                        
                        <View style={styles.petInfo}>
                          <Text style={styles.petName}>{pet.name}</Text>
                          {pet.breed && <Text style={styles.petBreed}>{pet.breed}</Text>}
                          {pet.age && <Text style={styles.petAge}>{pet.age} años</Text>}
                        </View>
                        
                        <View style={styles.petActions}>
                          <TouchableOpacity
                            style={styles.petAction}
                            onPress={() => {
                              // Edit pet functionality would go here
                              Alert.alert('Próximamente', 'Esta función estará disponible pronto.');
                            }}
                          >
                            <Edit size={18} color={Colors.textLight} />
                          </TouchableOpacity>
                          
                          <TouchableOpacity
                            style={styles.petAction}
                            onPress={() => handleDeletePet(pet.id, pet.name)}
                          >
                            <Trash2 size={18} color={Colors.error} />
                          </TouchableOpacity>
                        </View>
                      </View>
                    ))}
                  </View>
                ) : (
                  <View style={styles.noPetsContainer}>
                    <Heart size={48} color={Colors.primaryLight} />
                    <Text style={styles.noPetsText}>No tienes mascotas registradas</Text>
                    <Text style={styles.noPetsSubtext}>
                      Agrega a tus compañeros para gestionar sus citas y cuidados
                    </Text>
                  </View>
                )}
              </>
            )}
          </View>
        )}
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
  profileHeader: {
    alignItems: 'center',
    marginBottom: 24,
  },
  profileImageContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  profileName: {
    ...Typography.heading2,
  },
  tabsContainer: {
    flexDirection: 'row',
    marginBottom: 24,
    borderRadius: 12,
    backgroundColor: Colors.cardBackground,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: Colors.background,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  tabText: {
    ...Typography.body,
    color: Colors.textLight,
  },
  activeTabText: {
    color: Colors.text,
    fontWeight: 'bold',
  },
  formContainer: {
    marginBottom: 24,
  },
  saveButton: {
    marginTop: 16,
  },
  petsContainer: {
    marginBottom: 24,
  },
  addPetButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
    borderRadius: 25,
    paddingVertical: 12,
    marginBottom: 24,
  },
  addPetButtonText: {
    ...Typography.body,
    color: Colors.background,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  petsList: {
    marginBottom: 16,
  },
  petCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
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
    ...Typography.body,
    fontWeight: 'bold',
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
  petActions: {
    flexDirection: 'row',
  },
  petAction: {
    padding: 8,
    marginLeft: 8,
  },
  noPetsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.cardBackground,
    borderRadius: 12,
    padding: 32,
  },
  noPetsText: {
    ...Typography.body,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
  noPetsSubtext: {
    ...Typography.bodySmall,
    color: Colors.textLight,
    textAlign: 'center',
  },
  addPetForm: {
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
  formTitle: {
    ...Typography.heading3,
    marginBottom: 16,
  },
  inputLabel: {
    ...Typography.bodySmall,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  petTypeContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  petTypeOption: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 8,
    backgroundColor: Colors.cardBackground,
    marginRight: 8,
    alignItems: 'center',
  },
  selectedPetType: {
    backgroundColor: Colors.primary,
  },
  petTypeText: {
    ...Typography.bodySmall,
  },
  selectedPetTypeText: {
    color: Colors.background,
    fontWeight: 'bold',
  },
  formButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  cancelButton: {
    flex: 1,
    marginRight: 8,
  },
  addButton: {
    flex: 1,
    marginLeft: 8,
  },
});