import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Colors } from '@/constants/colors';
import { Typography } from '@/constants/typography';
import { Product } from '@/mocks/products';
import { ShoppingCart, Heart } from 'lucide-react-native';
import { useCartStore } from '@/store/cartStore';

interface ProductCardProps {
  product: Product;
  onPress: () => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onPress,
}) => {
  const { addItem } = useCartStore();
  const [liked, setLiked] = React.useState(false);

  const handleAddToCart = (e: any) => {
    e.stopPropagation();
    addItem(product, 1);
  };

  const handleLike = (e: any) => {
    e.stopPropagation();
    setLiked(!liked);
  };

  const formatPrice = (price: number) => {
    return `$${price.toFixed(2)}`;
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.8}>
      <Image source={{ uri: product.image }} style={styles.image} />
      
      <View style={styles.content}>
        <Text style={styles.name} numberOfLines={1}>{product.name}</Text>
        <Text style={styles.price}>{formatPrice(product.price)}</Text>
        <Text style={styles.description} numberOfLines={2}>{product.description}</Text>
      </View>
      
      <View style={styles.actions}>
        <TouchableOpacity 
          style={styles.likeButton} 
          onPress={handleLike}
          activeOpacity={0.8}
        >
          <Heart 
            size={18} 
            color={liked ? Colors.error : Colors.textLight}
            fill={liked ? Colors.error : 'transparent'}
          />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.cartButton} 
          onPress={handleAddToCart}
          activeOpacity={0.8}
        >
          <ShoppingCart size={18} color={Colors.background} />
        </TouchableOpacity>
      </View>
      
      {product.featured && (
        <View style={styles.featuredBadge}>
          <Text style={styles.featuredText}>Destacado</Text>
        </View>
      )}
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
    height: 140,
    resizeMode: 'cover',
  },
  content: {
    padding: 12,
  },
  name: {
    ...Typography.body,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  price: {
    ...Typography.body,
    color: Colors.primary,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  description: {
    ...Typography.bodySmall,
    color: Colors.textLight,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  likeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.cardBackground,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  featuredBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(255, 138, 158, 0.8)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  featuredText: {
    ...Typography.caption,
    color: Colors.background,
    fontWeight: 'bold',
  },
});