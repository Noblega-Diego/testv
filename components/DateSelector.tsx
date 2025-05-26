import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Colors } from '@/constants/colors';
import { Typography } from '@/constants/typography';

interface DateItem {
  date: string;
  day: string;
  dayOfMonth: string;
  month: string;
}

interface DateSelectorProps {
  dates: DateItem[];
  selectedDate: string;
  onSelectDate: (date: string) => void;
}

export const DateSelector: React.FC<DateSelectorProps> = ({
  dates,
  selectedDate,
  onSelectDate,
}) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {dates.map((item) => {
        const isSelected = item.date === selectedDate;
        return (
          <TouchableOpacity
            key={item.date}
            style={[styles.dateItem, isSelected && styles.selectedDateItem]}
            onPress={() => onSelectDate(item.date)}
            activeOpacity={0.8}
          >
            <Text style={[styles.day, isSelected && styles.selectedText]}>
              {item.day}
            </Text>
            <Text style={[styles.dayOfMonth, isSelected && styles.selectedText]}>
              {item.dayOfMonth}
            </Text>
            <Text style={[styles.month, isSelected && styles.selectedText]}>
              {item.month}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    paddingHorizontal: 8,
  },
  dateItem: {
    width: 60,
    height: 80,
    borderRadius: 12,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  selectedDateItem: {
    backgroundColor: Colors.primary,
  },
  day: {
    ...Typography.caption,
    textTransform: 'uppercase',
  },
  dayOfMonth: {
    ...Typography.heading2,
    marginVertical: 4,
  },
  month: {
    ...Typography.caption,
    textTransform: 'uppercase',
  },
  selectedText: {
    color: Colors.background,
  },
});