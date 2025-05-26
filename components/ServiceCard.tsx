import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '@/constants/colors';
import { Typography } from '@/constants/typography';
import { Heart, Stethoscope, Syringe, Shield, Scissors, Beaker } from 'lucide-react-native';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: string;
  price: string;
  onPress: () => void;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  description,
  icon,
  price,
  onPress,
}) => {
  const renderIcon = () => {
    const iconProps = { size: 24, color: Colors.primary };
    
    switch (icon) {
      case 'stethoscope':
        return <Stethoscope {...iconProps} />;
      case 'syringe':
        return <Syringe {...iconProps} />;
      case 'shield':
        return <Shield {...iconProps} />;
      case 'scissors':
        return <Scissors {...iconProps} />;
      case 'flask':
        return <Beaker {...iconProps} />;
      default:
        return <Heart {...iconProps} />;
    }
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.8}>
      <View style={styles.iconContainer}>
        {renderIcon()}
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
      <View style={styles.priceContainer}>
        <Text style={styles.price}>{price}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: Colors.background,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    alignItems: 'center',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  content: {
    flex: 1,
  },
  title: {
    ...Typography.heading3,
    fontSize: 16,
    marginBottom: 4,
  },
  description: {
    ...Typography.bodySmall,
  },
  priceContainer: {
    paddingLeft: 12,
  },
  price: {
    ...Typography.heading3,
    fontSize: 16,
    color: Colors.primary,
  },
});