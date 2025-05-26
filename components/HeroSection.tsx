import React from 'react';
import { View, Text, StyleSheet, ImageBackground, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '@/constants/colors';
import { Typography } from '@/constants/typography';
import { Button } from './Button';
import { useRouter } from 'expo-router';

interface HeroSectionProps {
  title: string;
  subtitle?: string;
  buttonText: string;
  buttonAction: () => void;
  imageUrl: string;
}

const { width } = Dimensions.get('window');

export const HeroSection: React.FC<HeroSectionProps> = ({
  title,
  subtitle,
  buttonText,
  buttonAction,
  imageUrl,
}) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={{ uri: imageUrl }}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <LinearGradient
          colors={['rgba(255, 138, 158, 0.8)', 'rgba(255, 138, 158, 0.6)']}
          style={styles.gradient}
        >
          <View style={styles.content}>
            <Text style={styles.title}>{title}</Text>
            {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
            <Button
              title={buttonText}
              onPress={buttonAction}
              style={styles.button}
            />
          </View>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 220,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 24,
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
  },
  gradient: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    padding: 20,
  },
  content: {
    width: '60%',
  },
  title: {
    ...Typography.heading1,
    color: Colors.background,
    marginBottom: 8,
  },
  subtitle: {
    ...Typography.body,
    color: Colors.background,
    marginBottom: 16,
  },
  button: {
    alignSelf: 'flex-start',
  },
});