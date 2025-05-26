import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Colors } from '@/constants/colors';
import { Typography } from '@/constants/typography';

interface BlogCardProps {
  title: string;
  description: string;
  image: string;
  category: string;
  onPress: () => void;
}

export const BlogCard: React.FC<BlogCardProps> = ({
  title,
  description,
  image,
  category,
  onPress,
}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.8}>
      <Image source={{ uri: image }} style={styles.image} />
      <View style={styles.categoryContainer}>
        <Text style={styles.category}>{category}</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description} numberOfLines={2}>
          {description}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    width: '48%',
  },
  image: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
  },
  categoryContainer: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: 'rgba(255, 138, 158, 0.8)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  category: {
    ...Typography.caption,
    color: Colors.background,
    fontWeight: 'bold',
  },
  content: {
    padding: 12,
  },
  title: {
    ...Typography.heading3,
    fontSize: 16,
    marginBottom: 4,
  },
  description: {
    ...Typography.bodySmall,
  },
});