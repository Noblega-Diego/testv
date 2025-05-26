import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '@/constants/colors';
import { Typography } from '@/constants/typography';

interface AppointmentSlotProps {
  time: string;
  available: boolean;
  selected?: boolean;
  onPress: () => void;
}

export const AppointmentSlot: React.FC<AppointmentSlotProps> = ({
  time,
  available,
  selected = false,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        available ? styles.availableSlot : styles.takenSlot,
        selected && styles.selectedSlot,
      ]}
      onPress={onPress}
      disabled={!available}
      activeOpacity={0.8}
    >
      <Text
        style={[
          styles.time,
          !available && styles.takenText,
          selected && styles.selectedText,
        ]}
      >
        {time}
      </Text>
      <Text
        style={[
          styles.status,
          !available && styles.takenText,
          selected && styles.selectedText,
        ]}
      >
        {available ? 'Disponible' : 'Tomada'}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  availableSlot: {
    backgroundColor: Colors.available,
  },
  takenSlot: {
    backgroundColor: Colors.taken,
  },
  selectedSlot: {
    backgroundColor: Colors.primary,
    borderWidth: 1,
    borderColor: Colors.primaryDark,
  },
  time: {
    ...Typography.body,
    fontWeight: 'bold',
  },
  status: {
    ...Typography.bodySmall,
  },
  takenText: {
    color: Colors.textLight,
  },
  selectedText: {
    color: Colors.background,
  },
});