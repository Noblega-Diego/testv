import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ShoppingCart } from 'lucide-react-native';
import { Colors } from '@/constants/colors';
import { useCartStore } from '@/store/cartStore';
import { useRouter } from 'expo-router';

export const CartIcon: React.FC = () => {
  const router = useRouter();
  const { getItemCount } = useCartStore();
  const itemCount = getItemCount();

  return (
    <TouchableOpacity 
      style={styles.container}
      onPress={() => router.push('/cart')}
      activeOpacity={0.8}
    >
      <ShoppingCart size={24} color={Colors.primary} />
      {itemCount > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{itemCount}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  badge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: Colors.error,
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  badgeText: {
    color: Colors.background,
    fontSize: 12,
    fontWeight: 'bold',
  },
});